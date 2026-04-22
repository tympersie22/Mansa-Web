import type { ReactNode } from 'react';

interface ExperienceDrawerSectionProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ExperienceDrawerSection({
  eyebrow,
  title,
  children,
  className = '',
}: ExperienceDrawerSectionProps) {
  return (
    <section className={`rounded-[1.75rem] border border-black/5 bg-white/72 p-6 md:p-8 ${className}`.trim()}>
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#9b7c2f]">{eyebrow}</p>
      <h3 className="mt-3 font-heading text-2xl text-[#20352c] md:text-3xl">{title}</h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}
