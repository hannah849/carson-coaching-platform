import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/motion/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";
import TestimonialCarousel from "@/components/marketing/TestimonialCarousel";

const offerings = [
  {
    title: "Single Session",
    duration: "90 minutes",
    price: "$XXX",
    description:
      "A focused one-time session for a specific challenge, decision, or pattern you want to look at directly. A good entry point if you want to experience the work before committing to a package.",
    includes: [
      "90-minute 1:1 video call",
      "Pre-session intake form",
      "Follow-up notes and resources",
    ],
    cta: "Reserve a Single Session",
    href: "/book-a-session",
  },
  {
    title: "3-Session Package",
    duration: "3 × 90 minutes",
    price: "$XXX",
    description:
      "Three sessions create enough continuity to actually move through something — not just identify it. Right for a pattern with defined edges that you are ready to address directly.",
    includes: [
      "3 × 90-minute 1:1 video calls",
      "Flexible scheduling within 60 days",
      "Between-session support via email",
      "Personalized resources and practices",
    ],
    cta: "Reserve the 3-Session Package",
    href: "/book-a-session",
    featured: true,
  },
  {
    title: "6-Session Package",
    duration: "6 × 90 minutes",
    price: "$XXX",
    description:
      "For layered, integrated work over time. Six sessions across 3–4 months allow for depth that a shorter container cannot hold — particularly useful for patterns with long roots.",
    includes: [
      "6 × 90-minute 1:1 video calls",
      "Flexible scheduling within 120 days",
      "Between-session support via email",
      "Personalized resources and practices",
      "Audio recording of each session",
    ],
    cta: "Reserve the 6-Session Package",
    href: "/book-a-session",
  },
];

export default function WorkWithMePage() {
  return (
    <>
      {/* Hero — split layout matching homepage */}
      <section className="flex flex-col md:flex-row min-h-[85vh] border-b border-[var(--border)]">
        {/* Photo — right-aligned to sit close to the text column */}
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:w-1/2 md:min-h-[85vh] shrink-0">
          <Image
            src="/images/carson-full-shot-2.jpg"
            alt="Carson Dougherty"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[50%_15%]"
            priority
          />
        </div>

        {/* Text */}
        <div className="flex-1 flex items-center bg-white">
          <div className="w-full max-w-xl mx-auto px-8 md:px-12 lg:px-16 py-16 md:py-0">
            <FadeIn>
              <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-5">
                1:1 Coaching
              </p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[var(--foreground)] leading-tight mb-5 [text-wrap:balance]">
                Work With Me
              </h1>
            </FadeIn>
            <FadeIn delay={0.22}>
              <p className="text-xl text-[var(--foreground)] leading-relaxed mb-8 max-w-md">
                Private 1:1 coaching via video call. Choose the support that fits where you are.
              </p>
            </FadeIn>
            <FadeIn delay={0.32}>
              <Link
                href="#offerings"
                className="px-8 py-3 bg-accent text-white text-base font-medium rounded-md hover:opacity-90 transition-opacity inline-block"
              >
                View Offerings
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <div id="offerings" />
      <section className="py-24 md:py-32 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerChildren className="grid md:grid-cols-3 gap-8 items-stretch">
            {offerings.map((offering) => (
              <StaggerItem key={offering.title} className="h-full">
                <div
                  className={`h-full border p-8 flex flex-col gap-5 bg-white rounded-lg [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)] transition-shadow ${
                    offering.featured
                      ? "border-[var(--heading)]"
                      : "border-[var(--border)]"
                  }`}
                >
                  {offering.featured && (
                    <p className="text-xs uppercase tracking-widest text-[var(--foreground)]">
                      Most popular
                    </p>
                  )}
                  <div>
                    <h2 className="font-serif text-2xl text-[var(--foreground)]">{offering.title}</h2>
                    <p className="text-sm text-[var(--foreground)] mt-1">{offering.duration}</p>
                  </div>
                  <p className="font-serif text-3xl text-[var(--foreground)] font-normal">{offering.price}</p>
                  <p className="text-[var(--foreground)] text-base leading-relaxed">{offering.description}</p>
                  <ul className="space-y-2">
                    {offering.includes.map((item) => (
                      <li key={item} className="text-sm text-[var(--foreground)] flex gap-2">
                        <span className="text-[var(--foreground)]">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={offering.href}
                    className="mt-auto block text-center px-6 py-3 border border-[var(--heading)] text-[var(--foreground)] text-base font-medium rounded-md hover:bg-[var(--heading)] hover:text-white transition-colors"
                  >
                    {offering.cta}
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-4">What to Expect</p>
            <h2 className="font-serif text-4xl text-[var(--foreground)] mb-12 max-w-xl leading-snug">
              A Session Has a Shape. Here Is What It Looks Like.
            </h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-2 gap-12">
            {[
              {
                step: "01",
                title: "We Begin With What Is Present",
                body: "Each session starts with a brief grounding practice, then opens into wherever you actually are — what is up, what keeps coming back, what you have been avoiding saying out loud.",
              },
              {
                step: "02",
                title: "We Follow What Matters",
                body: "Carson listens for the pattern underneath the story — paying close attention to what is not quite being said, what tightens in the body, what the same situation keeps producing.",
              },
              {
                step: "03",
                title: "We Work at the Root",
                body: "Using subconscious reprogramming and somatic tools, we locate and begin to revise the belief or decision driving the pattern — not manage it from the outside, but change what is generating it.",
              },
              {
                step: "04",
                title: "You Leave With Something Concrete",
                body: "Every session closes with a specific practice, anchor, or piece of awareness to take forward — something you can use before the next session, not just think about.",
              },
            ].map((item) => (
              <StaggerItem key={item.step} className="flex gap-6">
                <span className="font-serif text-sm text-[var(--foreground)] pt-1 shrink-0">{item.step}</span>
                <div>
                  <h3 className="font-serif text-xl text-[var(--foreground)] mb-2">{item.title}</h3>
                  <p className="text-[var(--foreground)] text-base leading-prose">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-4">Common Questions</p>
          </FadeIn>
          <StaggerChildren className="space-y-4 mt-2">
            {[
              {
                q: "Do I need prior experience with this kind of work?",
                a: "No. Carson meets each client where they are. Some clients have done years of therapy or personal development; others are starting here. The sessions are adapted to you, not a fixed curriculum.",
              },
              {
                q: "How do sessions work logistically?",
                a: "All sessions are held via video call. After booking, you will receive a confirmation with scheduling details and a short intake form. You do not need to prepare anything — just show up.",
              },
              {
                q: "What is your cancellation policy?",
                a: "Placeholder — cancellation and refund terms will be added here before launch.",
              },
              {
                q: "Can I speak with Carson before committing to a package?",
                a: "Placeholder — discovery call or contact process will be described here before launch.",
              },
            ].map((item) => (
              <StaggerItem
                key={item.q}
                className="p-6 bg-white border border-[var(--border)] rounded-lg [box-shadow:var(--shadow-sm)]"
              >
                <h3 className="font-serif text-lg text-[var(--foreground)] mb-2">{item.q}</h3>
                <p className="text-[var(--foreground)] text-base leading-prose">{item.a}</p>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 border-b border-[var(--border)] bg-[var(--surface-sage)]">
        <FadeIn className="max-w-7xl mx-auto px-6 mb-12">
          <p className="text-sm uppercase tracking-widest text-[var(--foreground)]">What Clients Say</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <TestimonialCarousel />
        </FadeIn>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeIn>
            <h2 className="font-serif text-4xl text-[var(--foreground)] mb-2">Ready to Book?</h2>
            <p className="text-[var(--foreground)] max-w-md">
              Choose a session above and move to the booking page. If you have questions first, get in touch.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/book-a-session"
              className="px-8 py-3 bg-accent text-white text-base font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              Book a Session
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border border-[var(--heading)] text-[var(--foreground)] text-base font-medium rounded-md hover:bg-[var(--heading)] hover:text-white transition-colors"
            >
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
