import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/", // TODO: update with Carson's handle
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@", // TODO: update with Carson's handle
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.95a8.16 8.16 0 0 0 4.77 1.52V7.04a4.85 4.85 0 0 1-1-.35z" />
      </svg>
    ),
  },
  {
    label: "Substack",
    href: "https://substack.com/@", // TODO: update with Carson's handle
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
        <path d="M22 6.5H2V10h20V6.5zM2 12.5v9l10-5.25L22 21.5v-9H2zM22 2H2v3h20V2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/", // TODO: update with Carson's profile
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top row: logo + nav */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <Link href="/">
            <Image
              src="/images/Carson-Dougherty-logo-2.png"
              alt="Carson Dougherty"
              width={240}
              height={42}
              className="h-16 w-auto"
            />
          </Link>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-[var(--foreground)]">
            <Link href="/about" className="hover:text-[var(--heading)] transition-colors">About</Link>
            <Link href="/work-with-me" className="hover:text-[var(--heading)] transition-colors">Work With Me</Link>
            <Link href="/store" className="hover:text-[var(--heading)] transition-colors">Meditations & Tools</Link>
            <Link href="/substack" className="hover:text-[var(--heading)] transition-colors">Writing</Link>
            <Link href="/contact" className="hover:text-[var(--heading)] transition-colors">Contact</Link>
          </nav>
        </div>

        {/* Bottom row: social + copyright + site credit */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--foreground)]">
          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-[var(--foreground)] hover:text-[var(--heading)] transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <p>© {new Date().getFullYear()} Carson Dougherty. All rights reserved.</p>

          <a
            href="https://hannaheleanor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--heading)] transition-colors"
          >
            Site by Hannah Eleanor
          </a>
        </div>
      </div>
    </footer>
  );
}
