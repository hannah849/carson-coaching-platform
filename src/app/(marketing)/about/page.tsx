import Link from "next/link";
import Image from "next/image";
import TestimonialBlock from "@/components/marketing/TestimonialBlock";
import FadeIn from "@/components/motion/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";

export default function AboutPage() {
  return (
    <>
      {/* Bio — compact header + image above the fold */}
      <section className="pt-12 pb-24 md:pt-14 md:pb-32 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Compact page header */}
          <FadeIn className="mb-10">
            <h1 className="font-serif text-5xl md:text-7xl text-[var(--foreground)] leading-tight mb-4">
              Meet Carson
            </h1>
            <p className="text-base text-[var(--foreground)] max-w-xl leading-relaxed">
              Carson Dougherty, C.Ht., is a certified hypnotherapist trained in Neuro-Linguistic Programming, energy work, and human design, integrating intuitive and subconscious approaches to support meaningful, lasting change.
            </p>
          </FadeIn>
          {/* Image + bio text — image is above the fold */}
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <FadeIn className="relative aspect-[3/4] w-full overflow-hidden rounded-lg [box-shadow:var(--shadow-md)]">
              <Image
                src="/images/carson-headshot-2.jpg"
                alt="Carson Dougherty"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </FadeIn>
            <FadeIn delay={0.1} className="pt-2">
              <h2 className="font-serif text-3xl text-[var(--foreground)] mb-6 leading-snug">
                A Practice Rooted in Intuition, Creativity, and Deep Personal Work
              </h2>
              <div className="space-y-6 text-[var(--foreground)] leading-prose max-w-lg">
                <p>
                  Carson&apos;s work is shaped by a lifelong connection to creativity, intuition, and emotional depth.
                </p>
                <p>
                  From an early age, she was drawn to creative expression: writing, performing, and making. These experiences shaped her ability to feel, interpret, and connect with both herself and others. What she would later understand as intuitive and energetic sensitivity first showed up through her work as an artist.
                </p>
                <p>
                  As she moved into adulthood, that sensitivity became something she needed to understand more deeply. Like many, she found herself doing all the &ldquo;right&rdquo; things while still feeling a disconnect between how she was living and what she knew was possible for her. That realization led her into years of self-directed exploration across spiritual, emotional, and somatic practices.
                </p>
                <p>
                  Her path included training in Reiki energy healing, hypnotherapy, NLP, and human design, alongside continued study of creative and body-based practices. Through this work, she began to understand how deeply held patterns, especially those formed early in life, shape the way we think, feel, and move through the world.
                </p>
                <p>
                  A major turning point came after becoming a mother, when unaddressed patterns surfaced in a way that impacted both her health and daily life. That experience led her deeper into subconscious and nervous system work, where she experienced firsthand how lasting change happens, not through force or willpower, but through deeper internal alignment.
                </p>
                <p>
                  Today, Carson brings together intuitive guidance with structured, evidence-informed modalities to support meaningful transformation. Her work is designed to help you reconnect with your intuition, understand the patterns shaping your life, and create change that feels grounded, sustainable, and fully your own.
                </p>
                <p>
                  At its core, her approach is rooted in a simple belief: that what you&apos;re looking for isn&apos;t outside of you. It&apos;s something you learn to access, trust, and live from.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 md:py-32 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-4">The Approach</p>
            <h2 className="font-serif text-4xl text-[var(--foreground)] mb-12 max-w-xl leading-snug">
              Precise, Personal, and Grounded in What Is Actually Happening
            </h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Subconscious Reprogramming",
                body: "Most of what drives our behavior was decided before we had language for it. Carson's work surfaces those early decisions and creates the conditions to revise them — not through willpower, but through direct work with the subconscious.",
              },
              {
                title: "Somatic Awareness",
                body: "The body registers patterns before the mind names them. Sessions include attention to physical sensation and nervous system state — not as a detour, but as one of the most direct routes to the pattern itself.",
              },
              {
                title: "Intuitive Guidance",
                body: "Carson brings strong intuitive perception to her work — the ability to track what is unsaid, notice what is being avoided, and reflect it back in a way that is useful rather than overwhelming.",
              },
            ].map((item) => (
              <StaggerItem
                key={item.title}
                className="p-8 bg-[var(--surface)] rounded-lg [box-shadow:var(--shadow-sm)]"
              >
                <h3 className="font-serif text-xl text-[var(--foreground)] mb-3">{item.title}</h3>
                <p className="text-[var(--foreground)] text-base leading-prose">{item.body}</p>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 md:py-32 border-b border-[var(--border)] bg-[var(--surface-sage)]">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <TestimonialBlock
              quote="You don't need more information about yourself. You need a different relationship with what you already know."
              attribution="Carson Dougherty"
            />
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeIn>
            <h2 className="font-serif text-3xl text-[var(--foreground)] mb-2">Ready to Begin?</h2>
            <p className="text-[var(--foreground)] leading-prose max-w-sm">
              Explore ways to work together, read the writing, or start with the free meditation.
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
          </FadeIn>
        </div>
      </section>
    </>
  );
}
