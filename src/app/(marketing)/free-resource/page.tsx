import Link from "next/link";
import PageHero from "@/components/marketing/PageHero";

const substackUrl = process.env.NEXT_PUBLIC_SUBSTACK_URL ?? "https://carsondougherty.substack.com/";

export default function FreeResourcePage() {
  return (
    <>
      <PageHero
        title="A Free Grounding Meditation"
        subtitle="For when you need to come back to yourself."
        centered
      />

      {/* Meditation detail */}
      <section className="py-24 md:py-32 border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="bg-[var(--border)] aspect-square w-full" aria-label="Meditation cover art placeholder" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-4">What You Will Receive</p>
            <h2 className="font-serif text-3xl text-[var(--foreground)] mb-6 leading-snug">
              A Guided Audio Practice to Settle, Ground, and Return
            </h2>
            <div className="space-y-5 text-[var(--foreground)] text-base leading-prose mb-8">
              <p>
                This 15-minute guided meditation was created to help you drop out of
                your thinking mind and into the steadiness of your body — wherever you are.
              </p>
              <p>
                You will move through a somatic grounding sequence, a gentle breath
                practice, and a short visualization designed to reconnect you with your
                own sense of inner safety and clarity.
              </p>
            </div>
            <ul className="space-y-2 border-t border-[var(--border)] pt-5">
              {[
                "15-minute guided audio (MP3)",
                "Sent to your inbox when you subscribe",
                "Free — no purchase required",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-[var(--foreground)]">
                  <span className="text-[var(--foreground)]">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Substack CTA — replaces email capture */}
      <section className="py-24 md:py-32">
        <div className="max-w-lg mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-[var(--foreground)] mb-4 leading-snug">
            Get the Meditation on Substack
          </h2>
          <p className="text-[var(--muted)] text-sm mb-8 leading-relaxed max-w-sm mx-auto">
            Subscribe to Carson's free Substack and receive the grounding meditation
            series in your welcome email — alongside weekly essays on subconscious
            patterns and the interior life.
          </p>
          <a
            href={substackUrl}
            className="inline-block px-10 py-4 bg-accent text-white text-base font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            Subscribe on Substack — It's Free
          </a>
          <p className="text-xs text-[var(--muted)] mt-4">No spam. Unsubscribe anytime.</p>
          <p className="text-xs text-[var(--foreground)] mt-6">
            Already subscribed?{" "}
            <Link href="/store" className="underline underline-offset-4 hover:text-[var(--heading)] transition-colors">
              Browse the full store →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
