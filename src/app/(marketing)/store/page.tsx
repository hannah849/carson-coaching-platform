import Link from "next/link";
import { staticProducts } from "@/data/staticProducts";
import { getPublishedProducts, formatPrice } from "@/lib/products";
import FadeIn from "@/components/motion/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";

export default async function StorePage() {
  // Use live products from Supabase when available; fall back to static catalog
  const liveProducts = await getPublishedProducts();
  const hasLiveProducts = liveProducts.length > 0;

  return (
    <>
      {/* Product grid */}
      <section className="pt-12 pb-20 md:pt-14 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-12">
            <h1 className="font-serif text-5xl md:text-7xl text-[var(--foreground)] leading-tight mb-4">
              Meditations & Tools
            </h1>
            <p className="text-base text-[var(--foreground)] max-w-xl leading-relaxed">
              Self-guided audio recordings designed to stand alone or complement 1:1 work. Use them whenever you need grounding, clarity, or a moment of intentional stillness.
            </p>
          </FadeIn>
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hasLiveProducts
              ? liveProducts.map((product) => (
                  <StaggerItem key={product.slug}>
                    <Link
                      href={`/store/${product.slug}`}
                      className="group border border-[var(--border)] p-8 flex flex-col gap-4 bg-white rounded-lg [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)] hover:border-[var(--heading)] transition-all"
                    >
                      <div className="bg-[var(--surface)] aspect-square w-full rounded-md" aria-label="Product image" />
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[var(--foreground)] mb-1">
                          Meditation
                        </p>
                        <h2 className="font-serif text-xl text-[var(--foreground)] group-hover:opacity-80 transition-opacity">
                          {product.title}
                        </h2>
                      </div>
                      <p className="text-[var(--foreground)] text-base leading-relaxed flex-1">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-serif text-xl text-[var(--foreground)]">
                          {formatPrice(product.price_cents)}
                        </span>
                        <span className="text-sm text-[var(--foreground)] group-hover:text-[var(--heading)] transition-colors">
                          View →
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                ))
              : staticProducts.map((product) => (
                  <StaggerItem key={product.slug}>
                    <Link
                      href={`/store/${product.slug}`}
                      className="group border border-[var(--border)] p-8 flex flex-col gap-4 bg-white rounded-lg [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)] hover:border-[var(--heading)] transition-all"
                    >
                      <div className="bg-[var(--surface)] aspect-square w-full rounded-md" aria-label="Product image placeholder" />
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[var(--foreground)] mb-1">
                          {product.category} · {product.duration}
                        </p>
                        <h2 className="font-serif text-xl text-[var(--foreground)] group-hover:opacity-80 transition-opacity">
                          {product.title}
                        </h2>
                      </div>
                      <p className="text-[var(--foreground)] text-base leading-relaxed flex-1">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-serif text-xl text-[var(--foreground)]">
                          {product.price}
                        </span>
                        <span className="text-sm text-[var(--foreground)] group-hover:text-[var(--heading)] transition-colors">
                          View →
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <FadeIn>
            <h2 className="font-serif text-2xl text-[var(--foreground)] mb-1">Looking for More?</h2>
            <p className="text-[var(--foreground)] text-sm">
              Explore 1:1 coaching for deeper, personalized support.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/work-with-me"
              className="px-8 py-3 border border-[var(--heading)] text-[var(--foreground)] text-base rounded-md hover:bg-[var(--heading)] hover:text-white transition-colors shrink-0"
            >
              Work With Me
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
