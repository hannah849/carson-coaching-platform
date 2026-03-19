import Link from "next/link";

export default function PurchaseSuccessPage() {
  return (
    <section className="py-28 md:py-40">
      <div className="max-w-lg mx-auto px-6 text-center">
        <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-6">
          Purchase Complete
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-[var(--foreground)] leading-tight mb-6">
          You&rsquo;re all set.
        </h1>
        <div className="space-y-4 text-[var(--foreground)] leading-prose max-w-sm mx-auto mb-10">
          <p>
            Your purchase is confirmed. If you have an account, your download is
            available in your dashboard now.
          </p>
          <p>
            If you checked out as a guest, check your inbox — you&rsquo;ll
            receive an email with access instructions shortly.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-accent text-white text-base rounded-md hover:opacity-90 transition-opacity"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/store"
            className="px-8 py-3 border border-[var(--heading)] text-[var(--foreground)] text-base rounded-md hover:bg-[var(--heading)] hover:text-white transition-colors"
          >
            Back to Store
          </Link>
        </div>
      </div>
    </section>
  );
}
