"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  // Real Supabase product UUID — null when showing static/preview data
  productId: string | null;
  label?: string;
};

export default function BuyButton({ productId, label = "Buy Now" }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stripeConfigured = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const ready = stripeConfigured && !!productId;

  if (!ready) {
    return (
      <div className="space-y-3">
        <div className="w-full text-center px-8 py-4 border border-[var(--border)] text-[var(--foreground)] text-sm cursor-default select-none">
          Available soon
        </div>
        <p className="text-xs text-[var(--foreground)] text-center">
          Join the email list to be notified when this is available.{" "}
          <Link
            href="/free-resource"
            className="underline underline-offset-4 hover:text-[var(--heading)] transition-colors"
          >
            Get the free meditation →
          </Link>
        </p>
      </div>
    );
  }

  async function handlePurchase() {
    if (!productId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="w-full px-8 py-4 bg-accent text-white text-base rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Redirecting to checkout…" : label}
      </button>
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
