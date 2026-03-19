import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type EntitlementRow = {
  id: string;
  created_at: string;
  products: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    file_path: string | null;
  } | null;
};

export default async function DashboardPage() {
  let entitlements: EntitlementRow[] = [];
  let userEmail = "";

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    userEmail = user?.email ?? "";

    if (user) {
      const { data } = await supabase
        .from("user_entitlements")
        .select(
          `id, created_at, products(id, title, slug, description, file_path)`
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      entitlements = (data as unknown as EntitlementRow[]) ?? [];
    }
  } catch {
    // Supabase error — show empty state
  }

  const purchases = entitlements.filter((e) => e.products !== null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      {/* Greeting */}
      <div className="mb-16">
        <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-3">Your Account</p>
        <h1 className="font-serif text-4xl md:text-5xl text-[var(--foreground)]">
          Welcome back{userEmail ? `, ${userEmail.split("@")[0]}` : ""}.
        </h1>
      </div>

      {/* Library */}
      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-8 border-b border-[var(--border)] pb-4">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Your Library</h2>
          <Link
            href="/store"
            className="text-sm text-[var(--foreground)] hover:text-[var(--heading)] transition-colors"
          >
            Browse store →
          </Link>
        </div>

        {purchases.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases.map((entry) => {
              const product = entry.products!;
              return (
                <div
                  key={entry.id}
                  className="border border-[var(--border)] p-6 flex flex-col gap-4"
                >
                  <div className="bg-[var(--border)] aspect-square w-full max-w-[80px]" aria-label="Product art" />
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-[var(--foreground)] mb-1 leading-snug">
                      {product.title}
                    </h3>
                    {product.description && (
                      <p className="text-[var(--muted)] text-xs leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>
                  {product.file_path ? (
                    <a
                      href={`/api/download/${product.id}`}
                      className="text-sm text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--muted)] transition-colors"
                    >
                      Download →
                    </a>
                  ) : (
                    <p className="text-xs text-[var(--foreground)]">
                      Download link coming soon.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border border-[var(--border)] p-12 text-center max-w-lg">
            <p className="font-serif text-xl text-[var(--foreground)] mb-3">
              Your library is empty.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
              Purchased meditations and digital tools will appear here after checkout.
            </p>
            <Link
              href="/store"
              className="px-6 py-3 border border-[var(--heading)] text-[var(--foreground)] text-base rounded-md hover:bg-[var(--heading)] hover:text-white transition-colors"
            >
              Browse the store
            </Link>
          </div>
        )}
      </section>

      {/* Sessions */}
      <section>
        <div className="flex items-baseline justify-between mb-8 border-b border-[var(--border)] pb-4">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Your Sessions</h2>
          <Link
            href="/book-a-session"
            className="text-sm text-[var(--foreground)] hover:text-[var(--heading)] transition-colors"
          >
            Book a session →
          </Link>
        </div>

        <div className="border border-[var(--border)] p-12 text-center max-w-lg">
          <p className="font-serif text-xl text-[var(--foreground)] mb-3">
            No sessions booked yet.
          </p>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
            Coaching packages and session history will appear here once you book.
          </p>
          <Link
            href="/book-a-session"
            className="px-6 py-3 border border-[var(--heading)] text-[var(--foreground)] text-base rounded-md hover:bg-[var(--heading)] hover:text-white transition-colors"
          >
            Book a session
          </Link>
        </div>
      </section>
    </div>
  );
}
