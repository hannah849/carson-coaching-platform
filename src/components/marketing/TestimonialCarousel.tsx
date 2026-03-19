"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    quote:
      "Working with Carson felt like finally being given permission to trust myself. I left every session lighter, clearer, and more certain of who I am.",
    attribution: "Client name, Placeholder",
  },
  {
    quote:
      "I came to Carson feeling stuck in the same patterns for years. Within a few sessions, I started to understand why — and actually change.",
    attribution: "Client name, Placeholder",
  },
  {
    quote:
      "Carson has a rare ability to see what you can't see in yourself — and to hold space for you to find your own way there.",
    attribution: "Client name, Placeholder",
  },
  {
    quote:
      "Every session I left with more clarity. Not just about what I was doing, but about who I actually am and what I want.",
    attribution: "Client name, Placeholder",
  },
  {
    quote:
      "This was the first time I'd ever done inner work that felt precise rather than vague. Carson goes to the root of things.",
    attribution: "Client name, Placeholder",
  },
];

export default function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  // Calculate how many cards are visible and what the max scroll index is
  const recalc = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards.length) return;
    const cardWidth = cards[0].offsetWidth;
    const gap = 20; // gap-5
    const trackWidth = track.clientWidth;
    const visibleCount = Math.floor((trackWidth + gap) / (cardWidth + gap));
    setMaxIndex(Math.max(0, testimonials.length - visibleCount));
  }, []);

  useEffect(() => {
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [recalc]);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-card]");
    const card = cards[index];
    if (!card) return;
    // Scroll so this card aligns with the track's left padding edge
    const paddingLeft = parseInt(getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({
      left: card.offsetLeft - paddingLeft,
      behavior: "smooth",
    });
    setCurrent(index);
  }, []);

  // Sync current on manual swipe
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const paddingLeft = parseInt(getComputedStyle(track).paddingLeft) || 0;
        const scrollPos = track.scrollLeft + paddingLeft;
        const cards = track.querySelectorAll<HTMLElement>("[data-card]");
        let closest = 0;
        let minDist = Infinity;
        cards.forEach((card, i) => {
          const dist = Math.abs(card.offsetLeft - paddingLeft - scrollPos + paddingLeft);
          if (dist < minDist) { minDist = dist; closest = i; }
        });
        setCurrent(Math.min(closest, maxIndex));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [maxIndex]);

  const prev = () => goTo(Math.max(0, current - 1));
  const next = () => goTo(Math.min(maxIndex, current + 1));

  return (
    <div>
      {/*
        Track spans full width with left padding so first card aligns
        with page content. scroll-padding-left mirrors that padding for
        correct snap alignment. Cards: 80% on mobile, ~30% on desktop.
      */}
      <div
        ref={trackRef}
        className="
          flex gap-5 overflow-x-auto
          snap-x snap-mandatory
          px-6 md:px-8 lg:px-12
          [scroll-padding-left:24px] md:[scroll-padding-left:32px] lg:[scroll-padding-left:48px]
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          pb-1
        "
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            data-card
            className="
              snap-start flex-shrink-0
              w-[80%] md:w-[30%]
              bg-white rounded-2xl
              px-8 py-9
              [box-shadow:var(--shadow-sm)]
              flex flex-col
            "
          >
            {/* Quote mark */}
            <span
              className="block font-serif text-5xl leading-none mb-4 text-[var(--accent)]"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <blockquote className="font-serif text-lg text-[var(--foreground)] leading-relaxed flex-1 mb-6">
              {t.quote}
            </blockquote>

            <figcaption className="text-sm font-semibold text-[var(--foreground)] tracking-wide">
              {t.attribution}
            </figcaption>
          </div>
        ))}

        {/* Right spacer so last card doesn't hug the edge */}
        <div className="flex-shrink-0 w-4 md:w-6" aria-hidden="true" />
      </div>

      {/* Navigation — aligned to content left */}
      <div className="flex items-center gap-3 mt-8 px-6 md:px-8 lg:px-12">
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous testimonial"
          className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-sm text-[var(--foreground)] hover:border-[var(--heading)] hover:text-[var(--heading)] transition-colors disabled:opacity-25"
        >
          ‹
        </button>
        <button
          onClick={next}
          disabled={current >= maxIndex}
          aria-label="Next testimonial"
          className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-sm text-[var(--foreground)] hover:border-[var(--heading)] hover:text-[var(--heading)] transition-colors disabled:opacity-25"
        >
          ›
        </button>

        {/* Dots */}
        <div className="flex gap-1.5 ml-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === current ? "bg-[var(--heading)]" : "bg-[var(--border)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
