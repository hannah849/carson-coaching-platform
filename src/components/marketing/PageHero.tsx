interface PageHeroProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function PageHero({ title, subtitle, centered = false }: PageHeroProps) {
  return (
    <section className="border-b border-[var(--border)] py-24 md:py-32">
      <div className={`max-w-7xl mx-auto px-6 ${centered ? "text-center" : ""}`}>
        <h1 className="font-serif text-5xl md:text-7xl text-[var(--foreground)] leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-base text-[var(--foreground)] max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
