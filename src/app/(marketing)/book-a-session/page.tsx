import Link from "next/link";
import Image from "next/image";

const sessionOptions = [
  {
    title: "Single Session",
    duration: "90 min",
    price: "$XXX",
    description:
      "A focused one-time session for a specific challenge, decision, or pattern you want to look at directly.",
  },
  {
    title: "3-Session Package",
    duration: "3 × 90 min",
    price: "$XXX",
    description:
      "Three sessions create enough continuity to actually move through something — not just identify it.",
    featured: true,
  },
  {
    title: "6-Session Package",
    duration: "6 × 90 min",
    price: "$XXX",
    description:
      "For layered, integrated work over time. Six sessions across 3–4 months allow for depth that a shorter container cannot hold.",
  },
];

export default function BookASessionPage() {
  return (
    <>
      {/* Hero — full-bleed image with overlay */}
      <section className="relative min-h-[68vh] flex items-end border-b border-[var(--border)]">
        <Image
          src="/images/carson-dougherty-book-a-session.jpg"
          alt="Book a Session"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Text over image — same scale and position as Weekly Writing header */}
        <div className="text-on-dark relative z-10 w-full max-w-7xl mx-auto px-6 pt-12 pb-16 md:pt-14 md:pb-20">
          <p className="text-sm uppercase tracking-widest text-white/70 mb-4">
            1:1 Coaching
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-4 [text-wrap:balance]">
            Book a Session
          </h1>
          <p className="text-base text-white/90 max-w-xl leading-relaxed">
            Private 1:1 coaching via video call. Choose a session or package and get in touch to reserve your spot.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                label: "Choose your session",
                body: "Select a session or package below based on where you are and what kind of support you are looking for.",
              },
              {
                step: "02",
                label: "Get in touch",
                body: "Send Carson a message with your session choice. She will confirm availability and send you a payment and scheduling link.",
              },
              {
                step: "03",
                label: "Show up and begin",
                body: "You will receive a video call link before your session. Come as you are — no preparation required.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <span className="font-serif text-sm text-[var(--foreground)] pt-1 shrink-0">{item.step}</span>
                <div>
                  <h3 className="font-serif text-lg text-[var(--foreground)] mb-1">{item.label}</h3>
                  <p className="text-[var(--foreground)] text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Session options */}
      <section className="py-24 md:py-32 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-8">Choose Your Session</p>
          <div className="grid md:grid-cols-3 gap-6">
            {sessionOptions.map((item) => (
              <div
                key={item.title}
                className={`border p-8 flex flex-col gap-4 rounded-lg bg-white [box-shadow:var(--shadow-sm)] ${
                  item.featured ? "border-[var(--heading)]" : "border-[var(--border)]"
                }`}
              >
                {item.featured && (
                  <p className="text-xs uppercase tracking-widest text-[var(--foreground)]">Most popular</p>
                )}
                <div>
                  <h2 className="font-serif text-2xl text-[var(--foreground)]">{item.title}</h2>
                  <p className="text-sm text-[var(--foreground)] mt-1">{item.duration}</p>
                </div>
                <p className="font-serif text-3xl text-[var(--foreground)]">{item.price}</p>
                <p className="text-[var(--foreground)] text-sm leading-relaxed flex-1">{item.description}</p>
                <Link
                  href={`/contact?session=${encodeURIComponent(item.title)}`}
                  className="mt-auto block text-center px-6 py-3 border border-[var(--heading)] text-[var(--foreground)] text-base font-medium rounded-md hover:bg-[var(--heading)] hover:text-white transition-colors"
                >
                  Reserve this session →
                </Link>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--foreground)] mt-6 max-w-lg leading-relaxed">
            Online payment and scheduling are coming soon. Use the contact form to reserve your
            spot and Carson will follow up with payment details and a direct booking link.{" "}
            <Link href="/work-with-me" className="underline underline-offset-4 hover:text-[var(--heading)] transition-colors">
              See full package details →
            </Link>
          </p>
        </div>
      </section>

      {/* Scheduling — Acuity embed when live */}
      <section className="py-24 md:py-32 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-[var(--foreground)] mb-4">Scheduling</p>
          <h2 className="font-serif text-3xl text-[var(--foreground)] mb-4 leading-snug max-w-lg">
            Already Confirmed? Schedule Your Appointment Here.
          </h2>
          <p className="text-[var(--foreground)] text-sm mb-10 max-w-md leading-relaxed">
            After your session is confirmed and payment is received, you will receive a direct
            scheduling link via email — or use the calendar below once it is live.
          </p>
          {/* TODO: Replace with Acuity embed when activated */}
          <div className="border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center gap-4 max-w-lg bg-[var(--background)]">
            <p className="font-serif text-xl text-[var(--foreground)]">Online scheduling coming soon.</p>
            <p className="text-sm text-[var(--foreground)] max-w-xs leading-relaxed">
              In the meantime, get in touch and Carson will send you a booking link directly.
            </p>
            <Link
              href="/contact"
              className="mt-2 px-6 py-3 border border-[var(--heading)] text-[var(--foreground)] text-base rounded-md hover:bg-[var(--heading)] hover:text-white transition-colors"
            >
              Contact Carson
            </Link>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-3xl text-[var(--foreground)] mb-2">
              Not Sure Which Option Is Right?
            </h2>
            <p className="text-[var(--foreground)] max-w-sm leading-relaxed">
              Read more about what sessions involve, or get in touch with a question.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/work-with-me"
              className="px-6 py-3 border border-[var(--heading)] text-[var(--foreground)] text-base font-medium rounded-md hover:bg-[var(--heading)] hover:text-white transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 text-sm text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--heading)] transition-colors"
            >
              Contact Carson
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
