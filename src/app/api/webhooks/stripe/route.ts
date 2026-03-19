import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import stripe from "@/lib/stripe";
import type { Stripe } from "@/lib/stripe";

// Webhook handler uses the service role key to bypass RLS
function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role credentials are not configured");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("[webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await fulfillPurchase(session);
  }

  return NextResponse.json({ received: true });
}

async function fulfillPurchase(session: Stripe.Checkout.Session) {
  const supabase = createServiceClient();

  const productId = session.metadata?.productId;
  if (!productId) {
    console.error("[webhook] No productId in session metadata", session.id);
    return;
  }

  // Resolve or create the user
  const userId = await resolveUserId(supabase, session);
  if (!userId) {
    console.error("[webhook] Could not resolve user for session", session.id);
    return;
  }

  // Look up the product
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id, price_cents")
    .eq("id", productId)
    .single();

  if (productError || !product) {
    console.error("[webhook] Product not found:", productId);
    return;
  }

  // Create the purchase record
  const { data: purchase, error: purchaseError } = await supabase
    .from("purchases")
    .insert({
      user_id: userId,
      stripe_session_id: session.id,
      amount_cents: session.amount_total ?? product.price_cents,
      status: "completed",
    })
    .select("id")
    .single();

  if (purchaseError || !purchase) {
    console.error("[webhook] Failed to create purchase:", purchaseError);
    return;
  }

  // Create the purchase item
  const { data: purchaseItem, error: itemError } = await supabase
    .from("purchase_items")
    .insert({
      purchase_id: purchase.id,
      product_id: product.id,
      price_cents: product.price_cents,
    })
    .select("id")
    .single();

  if (itemError || !purchaseItem) {
    console.error("[webhook] Failed to create purchase item:", itemError);
    return;
  }

  // Grant entitlement (upsert to handle retries safely)
  const { error: entitlementError } = await supabase
    .from("user_entitlements")
    .upsert(
      {
        user_id: userId,
        product_id: product.id,
        purchase_item_id: purchaseItem.id,
      },
      { onConflict: "user_id,product_id" }
    );

  if (entitlementError) {
    console.error("[webhook] Failed to create entitlement:", entitlementError);
    return;
  }

  console.log(`[webhook] Purchase fulfilled: user=${userId} product=${productId} session=${session.id}`);
}

async function resolveUserId(
  supabase: ReturnType<typeof createServiceClient>,
  session: Stripe.Checkout.Session
): Promise<string | null> {
  // Prefer the user ID passed at checkout time (logged-in purchase)
  if (session.client_reference_id) {
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", session.client_reference_id)
      .single();
    if (data) return data.id;
  }

  const email = session.customer_details?.email ?? session.customer_email;
  if (!email) return null;

  // Check if a profile already exists for this email
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) return existing.id;

  // Create a new auth user (passwordless — they'll set a password or use magic link later)
  const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
  });

  if (createError || !newUser.user) {
    console.error("[webhook] Failed to create auth user:", createError);
    return null;
  }

  // The handle_new_user trigger creates the profile row automatically
  return newUser.user.id;
}
