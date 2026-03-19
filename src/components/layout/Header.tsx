import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/work-with-me", label: "Work With Me" },
  { href: "/substack", label: "Writing" },
  { href: "/store", label: "Meditations & Tools" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="w-full border-b border-[var(--border)] bg-[var(--background)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/Carson-Dougherty-logo-2.png"
            alt="Carson Dougherty"
            width={280}
            height={48}
            className="h-20 w-auto"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--foreground)] hover:text-[var(--heading)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/book-a-session"
            className="hidden md:inline-block text-base font-medium px-5 py-2 bg-accent text-white rounded-md hover:opacity-90 transition-opacity"
          >
            Book a Session
          </Link>
          <Link
            href="/login"
            className="text-sm text-[var(--foreground)] hover:text-[var(--heading)] transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
