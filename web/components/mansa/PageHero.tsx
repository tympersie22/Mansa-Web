import Link from 'next/link';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  primaryHref = '/plan-your-trip',
  primaryLabel = 'Plan Your Trip',
  secondaryHref,
  secondaryLabel,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-surface-border bg-surface-light">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,176,64,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(56,56,54,0.08),transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32 lg:px-8 lg:pb-24 lg:pt-40">
        <p className="section-kicker mb-6">{eyebrow}</p>
        <h1 className="max-w-3xl font-heading text-4xl leading-tight text-text-primary md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={primaryHref} className="btn-primary">
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link href={secondaryHref} className="btn-secondary">
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
