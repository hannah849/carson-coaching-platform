import Link from "next/link";
import Image from "next/image";
import { getSubstackPosts } from "@/lib/substack";
import FadeIn from "@/components/motion/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";

export default async function SubstackPage() {
  const { posts } = await getSubstackPosts(8);

  // Substack URL — update NEXT_PUBLIC_SUBSTACK_URL in .env.local when confirmed
  const substackUrl = process.env.NEXT_PUBLIC_SUBSTACK_URL ?? "#";

  return (
    <>
      {/* Hero — split layout matching Work With Me */}
      <section className="flex flex-col md:flex-row min-h-[85vh] border-b border-[var(--border)]">
        {/* Photo left */}
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:w-1/2 md:min-h-[85vh] shrink-0">
          <Image
            src="/images/carson-sitting.jpg"
            alt="Carson Dougherty"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Text right */}
        <div className="flex-1 flex items-center bg-white">
          <div className="w-full max-w-xl mx-auto px-8 md:px-12 lg:px-16 py-16 md:py-0">
            <FadeIn>
              <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-5">
                Essays &amp; Reflections
              </p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[var(--foreground)] leading-tight mb-5 [text-wrap:balance]">
                Weekly Writing
              </h1>
            </FadeIn>
            <FadeIn delay={0.22}>
              <p className="text-xl text-[var(--foreground)] leading-relaxed mb-8 max-w-md">
                Essays on subconscious patterns, nervous system regulation, and what it actually takes to change.
              </p>
            </FadeIn>
            <FadeIn delay={0.32}>
              <a
                href={substackUrl}
                className="inline-block px-8 py-3 bg-accent text-white text-base font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                Subscribe on Substack
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Essay list */}
      <section className="pt-16 md:pt-20 pb-20 md:pb-28 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-8">Recent Essays</p>
          </FadeIn>
          <StaggerChildren className="divide-y divide-[var(--border)]">
            {posts.map((post) => (
              <StaggerItem key={post.title}>
                <a
                  href={post.href}
                  className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-10 hover:opacity-80 transition-opacity"
                >
                  <span className="text-sm text-[var(--muted)] shrink-0 md:pt-1 md:w-32">
                    {post.date}
                  </span>
                  <div className="max-w-2xl">
                    <h2 className="font-serif text-2xl text-[var(--foreground)] mb-2 leading-snug">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-[var(--foreground)] text-base leading-prose">{post.excerpt}</p>
                    )}
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeIn>
            <h2 className="font-serif text-3xl text-[var(--foreground)] mb-2">
              Ready to Go Deeper?
            </h2>
            <p className="text-[var(--foreground)] max-w-sm">
              The writing is a starting point. 1:1 work is where the real shift happens.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-wrap gap-4">
            <Link
              href="/work-with-me"
              className="px-8 py-3 bg-accent text-white text-base font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              Work With Me
            </Link>
            <Link
              href="/free-resource"
              className="px-8 py-3 border border-[var(--heading)] text-[var(--foreground)] text-base rounded-md hover:bg-[var(--heading)] hover:text-white transition-colors"
            >
              Free Meditation
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
