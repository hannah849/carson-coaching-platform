/**
 * TestimonialBlock
 *
 * Uses Playfair Display italic (font-quote) for the quote text only.
 * Attribution remains in DM Sans (font-sans) — smaller, lighter, muted.
 * Do not use font-quote anywhere else in the codebase.
 */

interface TestimonialBlockProps {
  quote: string;
  attribution: string;
}

export default function TestimonialBlock({
  quote,
  attribution,
}: TestimonialBlockProps) {
  return (
    <figure className="text-center">
      <blockquote>
        <p className="font-quote italic text-2xl md:text-3xl text-[var(--foreground)] leading-[1.6]">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>
      <figcaption className="mt-6 text-sm font-light text-[var(--foreground)] tracking-wide">
        — {attribution}
      </figcaption>
    </figure>
  );
}
