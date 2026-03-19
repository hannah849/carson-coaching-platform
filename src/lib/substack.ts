// Substack RSS utility
//
// To wire in a live feed: add SUBSTACK_RSS_URL to .env.local.
// Example: SUBSTACK_RSS_URL=https://carsondougherty.substack.com/feed
//
// When the env var is not set (or the fetch fails), the static fallback
// posts below are used automatically. No other changes needed.

export type SubstackPost = {
  title: string;
  href: string;
  date: string;
  excerpt: string;
};

// Static fallback posts — displayed until a live Substack RSS URL is configured.
const FALLBACK_POSTS: SubstackPost[] = [
  {
    title: "Why your logical mind can't solve a subconscious problem",
    date: "March 2026",
    href: "#",
    excerpt:
      "The patterns we want to change were not created by conscious thought — which is why thinking harder about them rarely works. On what actually needs to happen instead.",
  },
  {
    title: "On trusting what you already know",
    date: "February 2026",
    href: "#",
    excerpt:
      "Intuition is not a special faculty that some people have and others lack. It is a form of pattern recognition — one that becomes more reliable the more you practice listening to it.",
  },
  {
    title: "The body keeps the pattern",
    date: "January 2026",
    href: "#",
    excerpt:
      "Somatic work is not about processing the past. It is about noticing what the nervous system is still doing in the present — and creating the conditions for it to do something different.",
  },
  {
    title: "What 'doing the work' actually means",
    date: "December 2025",
    href: "#",
    excerpt:
      "The phrase has been used so often it has lost its edges. Here is what I mean when I use it — and what I have found to be the difference between work that changes something and work that keeps you busy.",
  },
];

function parseText(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function parseTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? parseText(match[1]) : "";
}

function formatPubDate(raw: string): string {
  try {
    const date = new Date(raw);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  } catch {
    return raw;
  }
}

function parseItems(xml: string): SubstackPost[] {
  const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/gi) ?? [];
  return itemMatches
    .map((item) => {
      const title = parseTag(item, "title");
      const href = parseTag(item, "link") || "#";
      const date = formatPubDate(parseTag(item, "pubDate"));
      // Substack puts a full HTML body in <content:encoded>; use <description> for excerpt
      const rawExcerpt = parseTag(item, "description");
      const excerpt = rawExcerpt.slice(0, 200).replace(/\s+\S*$/, "") + (rawExcerpt.length > 200 ? "…" : "");
      return { title, href, date, excerpt };
    })
    .filter((p) => p.title);
}

export async function getSubstackPosts(limit = 6): Promise<{
  posts: SubstackPost[];
  isLive: boolean;
}> {
  const feedUrl = process.env.SUBSTACK_RSS_URL;

  if (!feedUrl) {
    return { posts: FALLBACK_POSTS.slice(0, limit), isLive: false };
  }

  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);

    const xml = await res.text();
    const posts = parseItems(xml).slice(0, limit);

    if (posts.length === 0) throw new Error("No posts parsed from feed");

    return { posts, isLive: true };
  } catch (err) {
    console.warn("[substack] Falling back to static posts:", err);
    return { posts: FALLBACK_POSTS.slice(0, limit), isLive: false };
  }
}
