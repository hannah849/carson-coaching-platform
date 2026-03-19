import Link from "next/link";
import Image from "next/image";
import TestimonialCarousel from "@/components/marketing/TestimonialCarousel";
import FloatingSparkles from "@/components/marketing/FloatingSparkles";
import FadeIn from "@/components/motion/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";

const substackUrl = process.env.NEXT_PUBLIC_SUBSTACK_URL ?? "#";

export default function HomePage() {
  return (
    <>
      {/* Hero — split layout: photo left, text right (Gabby-style) */}
      <section className="flex flex-col md:flex-row min-h-screen border-b border-[var(--border)]">
        {/* Photo — stacks on top on mobile, left panel on desktop */}
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:w-1/2 md:min-h-screen shrink-0">
          <Image
            src="/images/carson-headshot-1.jpg"
            alt="Carson Dougherty"
            fill
            className="object-cover object-[50%_15%]"
            priority
          />
        </div>

        {/* Text — below photo on mobile, right panel on desktop */}
        <div className="flex-1 flex items-center bg-white">
          <div className="w-full max-w-xl mx-auto px-8 md:px-12 lg:px-16 py-16 md:py-0">
            <FadeIn>
              <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-5">
                Unlock Your Power
              </p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[var(--foreground)] leading-tight mb-5 [text-wrap:balance]">
                Holistic Coaching for Real Growth
              </h1>
            </FadeIn>
            <FadeIn delay={0.22}>
              <p className="text-xl text-[var(--foreground)] leading-relaxed mb-8 max-w-md">
                Learn to trust your intuition, shift the beliefs holding you back, and build a life that feels aligned, grounded, and fully your own.
              </p>
            </FadeIn>
            <FadeIn delay={0.32}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/work-with-me"
                  className="px-8 py-3 bg-accent text-white text-base font-medium rounded-md hover:opacity-90 transition-opacity"
                >
                  Work With Me
                </Link>
                <Link
                  href="/substack"
                  className="px-8 py-3 border border-[var(--heading)] text-[var(--foreground)] text-base font-medium rounded-md hover:bg-[var(--heading)] hover:text-white transition-colors"
                >
                  Read the Writing
                </Link>
                <Link
                  href="/free-resource"
                  className="px-4 py-3 text-sm text-[var(--foreground)] hover:text-[var(--heading)] transition-colors"
                >
                  Free Meditation →
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="relative py-24 md:py-32 border-b border-[var(--border)] overflow-hidden">
        <FloatingSparkles count={18} edgesOnly />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-4">About Carson</p>
            <h2 className="font-serif text-4xl text-[var(--foreground)] mb-6 leading-snug">
              Everything You Need Is Already Within You
            </h2>
            <div className="space-y-6 text-[var(--foreground)] leading-prose max-w-2xl mx-auto">
              <p>
                Carson Dougherty is an intuitive guide and holistic coach who helps women reconnect with themselves and navigate meaningful personal transformation.
              </p>
              <p>
                Her work is rooted in the belief that everything you need is already within you. Through a holistic approach that combines intuitive insight, energy work, and subconscious reprogramming, she supports you in releasing limiting beliefs, trusting your inner voice, and creating a life rooted in clarity, connection, and purpose.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-block text-sm text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--heading)] transition-colors"
            >
              More About Carson →
            </Link>
          </FadeIn>

          <FadeIn delay={0.1} className="relative aspect-[16/9] w-full mt-14 overflow-hidden rounded-lg [box-shadow:var(--shadow-md)]">
            <Image
              src="/images/carson-stirling.jpg"
              alt="Carson Dougherty"
              fill
              className="object-cover object-center"
            />
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-4">Ways to Work Together</p>
            <h2 className="font-serif text-4xl text-[var(--foreground)] mb-12 max-w-xl leading-snug">
              Choose the Depth of Support That Fits Where You Are
            </h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1:1 Coaching",
                description:
                  "Private sessions to identify and shift the specific patterns affecting your relationships, decisions, and sense of self.",
                href: "/work-with-me",
                cta: "Explore Sessions",
              },
              {
                title: "Coaching Packages",
                description:
                  "Multi-session containers for sustained work. Enough continuity to move through something at its root, not just manage it.",
                href: "/work-with-me",
                cta: "Explore Packages",
              },
              {
                title: "Meditations & Tools",
                description:
                  "Self-guided audio practices for between sessions or on your own. A starting point, or an ongoing support.",
                href: "/store",
                cta: "Explore the Store",
              },
            ].map((item) => (
              <StaggerItem
                key={item.title}
                className="p-8 bg-[var(--surface)] rounded-lg [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)] transition-shadow"
              >
                <h3 className="font-serif text-2xl text-[var(--foreground)] mb-3">{item.title}</h3>
                <p className="text-[var(--foreground)] text-base leading-relaxed mb-6">{item.description}</p>
                <Link
                  href={item.href}
                  className="text-sm text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--heading)] transition-colors"
                >
                  {item.cta} →
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 border-b border-[var(--border)] bg-[var(--surface-sage)]">
        <FadeIn className="max-w-7xl mx-auto px-6 mb-12">
          <p className="text-sm uppercase tracking-widest text-[var(--foreground)]">
            What Clients Say
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <TestimonialCarousel />
        </FadeIn>
      </section>

      {/* Digital Resources */}
      <section className="py-24 md:py-32 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-4">Digital Resources</p>
            <h2 className="font-serif text-4xl text-[var(--foreground)] mb-6 leading-snug">
              Self-Guided Support, On Your Time
            </h2>
            <div className="space-y-6 text-[var(--foreground)] leading-prose max-w-lg">
              <p>
                Self-guided audio recordings designed to stand alone or complement 1:1 work. Use them whenever you need grounding, clarity, or a moment of intentional stillness.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/store"
                className="px-8 py-3 bg-accent text-white text-base font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                Browse Digital Resources
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="rounded-lg overflow-hidden border border-[var(--border)] [box-shadow:var(--shadow-sm)]">
            <div className="flex p-6 gap-6">
              <div className="relative w-32 shrink-0 rounded-lg overflow-hidden">
                <Image
                  src="/images/morning-grounding-thumb.svg"
                  alt="Morning Grounding Practice"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-3">Audio Meditation &middot; 18 Min</p>
                <h3 className="font-serif text-xl text-[var(--foreground)] mb-2 leading-snug">
                  Morning Grounding Practice
                </h3>
                <p className="text-base text-[var(--foreground)] leading-relaxed mb-4">
                  Start your day grounded, clear, and steady. This guided practice helps regulate your nervous system and set a calm, intentional tone.
                </p>
                <p className="font-serif text-lg text-[var(--foreground)] mb-4">$27</p>
                <Link
                  href="/store"
                  className="text-sm text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--heading)] transition-colors"
                >
                  View →
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Substack subscribe CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-4">Free Resources</p>
            <h2 className="font-serif text-4xl text-[var(--foreground)] mb-4 leading-snug">
              Get Free Meditations When You Subscribe
            </h2>
            <p className="text-[var(--foreground)] leading-prose max-w-sm">
              Carson's Substack subscribers receive her free grounding meditation series
              alongside the weekly writing. No purchase required — just subscribe.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="border border-[var(--border)] p-8 bg-white rounded-lg [box-shadow:var(--shadow-md)]">
            <p className="font-serif text-2xl font-semibold text-[var(--foreground)] mb-2 leading-snug">
              Ongoing Support, In Your Inbox
            </p>
            <p className="text-base text-[var(--foreground)] mb-6 leading-relaxed">
              Weekly writing, thoughtful insight, and a welcome meditation series, delivered to your inbox. A simple way to stay connected and supported.
            </p>
            <a
              href={substackUrl}
              className="block w-full text-center px-8 py-4 bg-accent text-white text-base font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              Subscribe Now
            </a>
            <p className="text-xs text-[var(--muted)] mt-3">No spam. Unsubscribe anytime.</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
