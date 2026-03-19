import Image from "next/image";
import ContactForm from "@/components/forms/ContactForm";
import FadeIn from "@/components/motion/FadeIn";

export default function ContactPage() {
  return (
    <>
      {/* Hero — full-bleed image with overlay */}
      <section className="relative min-h-[68vh] flex items-end border-b border-[var(--border)]">
        <Image
          src="/images/Carson-on-rocks.jpg"
          alt="Contact"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="text-on-dark relative z-10 w-full max-w-7xl mx-auto px-6 pt-12 pb-16 md:pt-14 md:pb-20">
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-4 [text-wrap:balance]">
            Contact
          </h1>
          <p className="text-base text-white/90 max-w-xl leading-relaxed">
            Get in touch with a question, or just to say hello.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          {/* Contact info */}
          <FadeIn>
            <h2 className="font-serif text-3xl text-[var(--foreground)] mb-6 leading-snug">
              Carson reads every message.
            </h2>
            <div className="space-y-6 text-[var(--foreground)] text-base leading-prose max-w-sm mb-10">
              <p>
                Whether you have a question about working together, want to know if
                coaching is right for you, or just want to reach out.
              </p>
            </div>

            <div className="space-y-4 border-t border-[var(--border)] pt-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--foreground)] mb-1">Email</p>
                <p className="text-[var(--foreground)] text-sm">hello@carsondougherty.com</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--foreground)] mb-1">Instagram</p>
                <p className="text-[var(--foreground)] text-sm">@carsondougherty</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--foreground)] mb-1">Substack</p>
                <p className="text-[var(--foreground)] text-sm">carsondougherty.substack.com</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
