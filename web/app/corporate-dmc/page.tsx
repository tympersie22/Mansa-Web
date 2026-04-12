import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, CalendarDays, Map, Users } from 'lucide-react';
import Reveal from '@/components/mansa/Reveal';
import { contactHref } from '@/lib/site-config';

const offeringItems = [
  {
    title: 'Group Travel Coordination',
    text: 'Structured planning and management for group travel, ensuring smooth movement across all parts of the journey.',
    icon: Users,
  },
  {
    title: 'Corporate Retreats',
    text: 'Well-balanced programs combining meetings, downtime, and curated experiences.',
    icon: Briefcase,
  },
  {
    title: 'MICE & Events',
    text: 'Support for conferences, incentives, and events — with a focus on logistics, timing, and coordination.',
    icon: CalendarDays,
  },
  {
    title: 'Travel Planning & Logistics',
    text: 'Accommodation, transfers, and scheduling managed as one complete plan.',
    icon: Map,
  },
];

const processSteps = [
  {
    step: '1. Understanding Requirements',
    text: 'We start by understanding your group, objectives, and expectations.',
  },
  {
    step: '2. Planning & Structuring',
    text: 'We design a clear and realistic plan — focusing on flow, timing, and practicality.',
  },
  {
    step: '3. Coordination',
    text: 'All elements are aligned with our network of trusted partners on the ground.',
  },
  {
    step: '4. Execution',
    text: 'Our team remains actively involved throughout, ensuring everything runs as planned.',
  },
];

const reasonsToWorkWithUs = [
  'Strong planning logic and structured approach',
  'Reliable on-ground coordination',
  'Ability to adapt and problem-solve quickly',
  'Zanzibar-based team with a trusted network',
  'Direct and responsive communication',
];

const networkLogos = [
  'Hotels',
  'Transport',
  'Experiences',
  'Conference Venues',
  'Marine Operators',
  'Safari Partners',
  'Event Support',
  'Guest Services',
];

export default function CorporateDmcPage() {
  const repeatedLogos = [...networkLogos, ...networkLogos];

  return (
    <div className="bg-surface">
      <section className="relative flex min-h-[68vh] items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80"
          alt="Corporate group travel in Tanzania"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.22),rgba(18,18,17,0.84))]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-36 text-white lg:px-8 lg:pb-20">
          <Reveal>
            <p className="section-kicker mb-6 text-accent">Corporate &amp; DMC</p>
            <h1 className="max-w-4xl font-heading text-5xl leading-[1.05] md:text-7xl">
              Corporate &amp; DMC
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
              Well-structured group travel and corporate experiences across Zanzibar and mainland
              Tanzania — planned properly, and executed with care on the ground.
            </p>
            <Link href="/plan-your-trip" className="btn-primary mt-10">
              Start Planning
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <div className="space-y-5 text-base leading-8 text-text-secondary md:text-lg">
              <p>
                We work with corporate teams, international groups, and travel partners to design
                and manage structured travel experiences across Zanzibar and mainland Tanzania.
              </p>
              <p>
                From high-end incentive groups to large corporate movements hosting international
                conferences, our focus is on ensuring that everything — from planning to execution
                — runs clearly, smoothly, and as expected.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <Reveal>
            <p className="section-kicker mb-5">What We Handle</p>
            <div className="space-y-5 text-base leading-8 text-text-secondary md:text-lg">
              <p>
                We manage group and corporate travel by bringing together accommodation, logistics,
                and experiences into one connected plan.
              </p>
              <p>
                Our role is to ensure that every part of the journey works together — so that
                you&apos;re not managing separate pieces, but moving through one coordinated
                experience.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="section-kicker mb-5">What We Offer</p>
              <h2 className="font-heading text-3xl text-text-primary md:text-5xl">
                Structured support across the full group journey
              </h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {offeringItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="card-panel h-full p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(56,56,54,0.08)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/12 text-accent">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-heading text-2xl text-text-primary">{item.title}</h3>
                  <p className="mt-4 text-base leading-8 text-text-secondary">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="section-kicker mb-5">Our Process</p>
              <h2 className="font-heading text-3xl text-text-primary md:text-5xl">
                A clear process from first brief to on-the-ground execution
              </h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.05}>
                <article className="flex h-full flex-col rounded-[1.6rem] border border-surface-border bg-white/70 p-8">
                  <p className="section-kicker mb-6">{item.step}</p>
                  <p className="text-base leading-8 text-text-secondary">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[rgba(251,176,64,0.08)] py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <p className="section-kicker mb-5">Reality Of Group Travel</p>
            <div className="rounded-[1.8rem] border border-accent/20 bg-white/72 p-8 md:p-10">
              <div className="space-y-5 text-base leading-8 text-text-secondary md:text-lg">
                <p>Group travel in Zanzibar requires more than just planning.</p>
                <p>
                  Managing multiple guests, changing preferences, and maintaining structure —
                  especially with high-end or international groups — requires constant coordination
                  and attention.
                </p>
                <p>
                  Guests may adjust plans, move at different paces, or require last-minute
                  changes.
                </p>
                <p>
                  Our role is to manage this without disrupting the overall flow — ensuring that
                  the group experience remains smooth, while still allowing flexibility where
                  needed.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <p className="section-kicker mb-5">Why Work With Us</p>
          </Reveal>
          <div className="mt-8 grid gap-4">
            {reasonsToWorkWithUs.map((point, index) => (
              <Reveal key={point} delay={index * 0.04}>
                <div className="flex items-start gap-4 rounded-[1.4rem] border border-surface-border bg-white/55 px-6 py-5">
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                  <p className="text-base leading-8 text-text-secondary">{point}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-surface-lighter py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className="section-kicker mb-5">Our Network</p>
              <p className="mx-auto max-w-3xl text-base leading-8 text-text-secondary md:text-lg">
                We work with a carefully selected network of hotels, transport providers, and
                experience partners across Zanzibar and mainland Tanzania.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 overflow-hidden rounded-[1.8rem] border border-surface-border bg-white/72 py-6">
            <div className="marquee-track flex min-w-max items-center gap-4 px-4">
              {repeatedLogos.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex min-w-[170px] items-center justify-center rounded-[1.1rem] border border-surface-border bg-surface px-6 py-5 text-center text-sm uppercase tracking-[0.18em] text-text-secondary grayscale transition duration-300 hover:text-text-primary hover:grayscale-0"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <p className="font-heading text-2xl leading-relaxed text-text-primary md:text-3xl">
              Each program is built around your requirements and can be adjusted based on group
              size, timing, and objectives.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-dark py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-5xl">
              Plan Your Group or Corporate Travel
            </h2>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              Share your requirements with us, and we&apos;ll design a structured plan tailored to
              your group.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/plan-your-trip" className="btn-primary">
                Start Planning
              </Link>
              <a
                href={contactHref.whatsapp}
                className="btn-secondary btn-secondary-inverse"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
