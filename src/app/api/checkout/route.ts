import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { getProductById } from "@/lib/products";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();

    if (!productId || typeof productId !== "string") {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const product = await getProductById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (!product.stripe_price_id) {
      return NextResponse.json(
        { error: "Product is not configured for purchase" },
        { status: 400 }
      );
    }

    // Get current user if logged in (optional — guest checkout is allowed)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: product.stripe_price_id,
          quantity: 1,
        },
      ],
      metadata: {
        productId: product.id,
      },
      // Pass user ID if logged in — webhook uses this to link the purchase
      client_reference_id: user?.id ?? undefined,
      // Pre-fill email if logged in
      customer_email: user?.email ?? undefined,
      success_url: `${origin}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout] Error creating checkout session:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
