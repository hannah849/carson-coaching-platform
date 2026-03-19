// Static product catalog — displayed until Supabase products are live.
// When Supabase is configured and a product with the matching slug exists,
// the product detail page uses the live data instead. The `available` flag
// controls whether the buy button is shown vs. a "coming soon" state.

export type StaticProduct = {
  slug: string;
  title: string;
  category: string;
  duration: string;
  price: string;
  available: boolean;
  description: string;
  longDescription: string;
  includes: string[];
};

export const staticProducts: StaticProduct[] = [
  {
    slug: "grounding-meditation",
    title: "Grounding Meditation",
    category: "Meditation",
    duration: "15 min",
    price: "$27",
    available: true,
    description:
      "A 15-minute guided practice to settle, ground, and return to yourself — wherever you are.",
    longDescription:
      "This recording moves through three phases: a somatic grounding sequence that draws attention back into the body, a gentle breath practice to regulate the nervous system, and a short visualization to reconnect you with your own sense of inner safety and clarity. It was designed for moments when the mind is loud, the body is braced, and you need a reliable way back to yourself. Fifteen minutes. No setup required. Works anywhere.",
    includes: [
      "15-minute guided audio (MP3)",
      "Instant delivery after purchase",
      "Lifetime access",
    ],
  },
  {
    slug: "morning-grounding-meditation",
    title: "Morning Grounding Practice",
    category: "Meditation",
    duration: "18 min",
    price: "$27",
    available: false,
    description:
      "Begin your day from a place of rootedness. This guided practice settles the nervous system and sets a calm, intentional tone.",
    longDescription:
      "A morning practice designed to be used before the day gets its hands on you — before the phone, before the to-do list, before the performing begins. This recording guides you through a brief somatic scan, a breath-based arrival practice, and a short intention-setting sequence. Not a productivity ritual. A grounding one.",
    includes: [
      "18-minute guided audio (MP3)",
      "Instant delivery after purchase",
      "Lifetime access",
    ],
  },
  {
    slug: "releasing-what-is-not-yours",
    title: "Releasing What Is Not Yours",
    category: "Meditation",
    duration: "22 min",
    price: "$27",
    available: false,
    description:
      "A somatic clearing practice for releasing the emotions, expectations, and stories that were never truly yours to carry.",
    longDescription:
      "Many of the things we carry — the worry, the guilt, the sense of responsibility for other people's states — were never ours to begin with. This recording offers a somatic process for identifying what you have taken on that belongs elsewhere, and gently returning it. The work is physical as much as conceptual: you will be guided to feel, locate, and release — not just think about it.",
    includes: [
      "22-minute guided audio (MP3)",
      "Instant delivery after purchase",
      "Lifetime access",
    ],
  },
  {
    slug: "inner-child-integration",
    title: "Inner Child Integration",
    category: "Meditation",
    duration: "30 min",
    price: "$37",
    available: false,
    description:
      "A gentle, compassionate practice for meeting and beginning to reparent the younger parts of yourself still seeking safety.",
    longDescription:
      "This is longer work, and slower work. The recording creates a safe internal container, guides you toward the younger parts of yourself that are still operating on old strategies, and offers a process for beginning to provide what those parts were originally looking for. It is not about revisiting pain for its own sake. It is about changing the relationship.",
    includes: [
      "30-minute guided audio (MP3)",
      "Instant delivery after purchase",
      "Lifetime access",
    ],
  },
];

export function getStaticProductBySlug(slug: string): StaticProduct | null {
  return staticProducts.find((p) => p.slug === slug) ?? null;
}
