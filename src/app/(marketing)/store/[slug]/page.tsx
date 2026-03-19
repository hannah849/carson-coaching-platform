import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, formatPrice } from "@/lib/products";
import { getStaticProductBySlug } from "@/data/staticProducts";
import BuyButton from "@/components/store/BuyButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try live Supabase product first; fall back to static data
  const liveProduct = await getProductBySlug(slug);
  const staticProduct = getStaticProductBySlug(slug);

  if (!liveProduct && !staticProduct) notFound();

  // Merged view: live data takes precedence, static fills in the rest
  const product = {
    id: liveProduct?.id ?? null,
    title: liveProduct?.title ?? staticProduct!.title,
    slug,
    category: staticProduct?.category ?? "Meditation",
    duration: staticProduct?.duration ?? "",
    price: liveProduct ? formatPrice(liveProduct.price_cents) : (staticProduct?.price ?? "$—"),
    description: liveProduct?.description ?? staticProduct!.description,
    longDescription: staticProduct?.longDescription ?? liveProduct?.description ?? "",
    includes: staticProduct?.includes ?? [
      "High-quality audio download (MP3)",
      "Lifetime access",
      "Immediate delivery after purchase",
    ],
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)] py-4">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-2 text-sm text-[var(--foreground)]">
            <Link href="/store" className="hover:text-[var(--heading)] transition-colors">
              Meditations &amp; Tools
            </Link>
            <span>/</span>
            <span className="text-[var(--foreground)]">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product detail */}
      <section className="py-20 md:py-28 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div className="bg-[var(--border)] aspect-square w-full" aria-label="Product image placeholder" />

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--foreground)] mb-2">
                {product.category}{product.duration ? ` · ${product.duration}` : ""}
              </p>
              <h1 className="font-serif text-4xl text-[var(--foreground)] leading-tight">
                {product.title}
              </h1>
            </div>

            <p className="font-serif text-3xl text-[var(--foreground)]">{product.price}</p>

            <p className="text-[var(--muted)] leading-relaxed">{product.description}</p>

            <ul className="space-y-2 border-t border-b border-[var(--border)] py-5">
              {product.includes.map((item) => (
                <li key={item} className="text-sm text-[var(--foreground)] flex gap-2">
                  <span className="text-[var(--foreground)]">—</span>
                  {item}
                </li>
              ))}
            </ul>

            <BuyButton productId={product.id} />
          </div>
        </div>
      </section>

      {/* Long description */}
      {product.longDescription && (
        <section className="py-20 md:py-28 border-b border-[var(--border)]">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-serif text-3xl text-[var(--foreground)] mb-6">About This Recording</h2>
            <p className="text-[var(--muted)] leading-prose">{product.longDescription}</p>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-2xl text-[var(--foreground)] mb-1">
              Looking for Deeper Support?
            </h2>
            <p className="text-[var(--muted)] text-sm max-w-sm">
              1:1 coaching goes further. Explore private sessions with Carson.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/work-with-me"
              className="px-8 py-3 border border-[var(--heading)] text-[var(--foreground)] text-base rounded-md hover:bg-[var(--heading)] hover:text-white transition-colors"
            >
              Work With Me
            </Link>
            <Link
              href="/store"
              className="px-4 py-3 text-sm text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--heading)] transition-colors"
            >
              ← Back to store
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
