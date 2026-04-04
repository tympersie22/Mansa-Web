import Image from 'next/image';
import Link from 'next/link';
import { Compass, Network, PanelLeft, Settings2 } from 'lucide-react';
import Reveal from '@/components/mansa/Reveal';
import { contactHref } from '@/lib/site-config';

const workPrinciples = [
  {
    title: 'Curated, Not Pre-Built',
    text: 'We don’t approach travel as fixed packages. Each journey is shaped individually, using the right combination of elements.',
    icon: PanelLeft,
  },
  {
    title: 'Planning with Purpose',
    text: 'We focus on how each trip flows — how days connect, how locations work together, and how the experience unfolds.',
    icon: Compass,
  },
  {
    title: 'Strong Local Coordination',
    text: 'Our network on the island is carefully built, allowing us to work with trusted partners across every part of the journey.',
    icon: Network,
  },
  {
    title: 'Hands-On Execution',
    text: 'We stay closely involved throughout, ensuring everything runs as it should from start to finish.',
    icon: Settings2,
  },
];

const differencePoints = [
  'Zanzibar-based team with a strong local network',
  'Carefully selected partners and experiences',
  'A focus on structure, not just selection',
  'Strong problem-solving and on-ground coordination',
  'Direct, responsive communication throughout',
];

export default function AboutPage() {
  return (
    <div className="bg-surface">
      <section className="relative flex min-h-[68vh] items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80"
          alt="Zanzibar coastline at golden hour"
          fill
          sizes="100vw"
          priority
          className="scale-[1.04] object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.28),rgba(18,18,17,0.84))]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-36 text-white lg:px-8 lg:pb-20">
          <Reveal>
            <p className="section-kicker mb-6 text-accent">About Us</p>
            <h1 className="max-w-4xl font-heading text-5xl leading-[1.05] md:text-7xl">
              About Us
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
              A Zanzibar-based team shaping well-structured journeys across the island — with a
              focus on quality, coordination, and experience.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <div className="space-y-5 text-base leading-8 text-text-secondary md:text-lg">
              <p>
                We are a Zanzibar-based travel company built by a group of young Tanzanians with a
                shared connection to the island and a strong interest in how it is experienced by
                those visiting it.
              </p>
              <p>
                Having spent time living, studying, and working across different countries, we’ve
                seen how travel is delivered at different levels — and recognised the opportunity
                to bring a more considered and structured approach to Zanzibar.
              </p>
              <p>
                Our aim is simple: to shape journeys that feel well put together, easy to move
                through, and reflective of what the island has to offer.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <Reveal>
            <div className="flex items-center">
              <div>
                <p className="section-kicker mb-5">Why We Started</p>
                <div className="space-y-5 text-base leading-8 text-text-secondary md:text-lg">
                  <p>
                    As tourism in Zanzibar continues to grow, we saw both its potential and its
                    gaps.
                  </p>
                  <p>
                    Many experiences felt transactional — arranged quickly, delivered
                    inconsistently, and lacking the level of coordination that makes a trip feel
                    seamless.
                  </p>
                  <p>
                    At the same time, we saw the strength of the island itself — its people, its
                    pace, and the network of local operators already delivering great experiences.
                  </p>
                  <p>
                    We built this company to sit between the two: bringing structure, consistency,
                    and attention to detail — while working closely with the people who make
                    Zanzibar what it is.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08} x={24} y={0}>
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.9rem]">
              <Image
                src="https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1400&q=80"
                alt="Stone Town street scene"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.06),rgba(18,18,17,0.32))]" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="section-kicker mb-5">How We Work</p>
              <h2 className="font-heading text-3xl text-text-primary md:text-5xl">
                A more considered way of building journeys
              </h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {workPrinciples.map((item, index) => (
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
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <p className="section-kicker mb-5">What Makes Us Different</p>
          </Reveal>
          <div className="mt-8 grid gap-4">
            {differencePoints.map((point, index) => (
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

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <p className="section-kicker mb-5">Our Approach</p>
            <div className="space-y-5 text-base leading-8 text-text-secondary md:text-lg">
              <p>
                We see each journey as a whole — not a series of individual bookings.
              </p>
              <p>
                Zanzibar itself already offers a strong foundation. Our role is to bring out the
                best of it by connecting the right elements together and ensuring they are
                delivered consistently.
              </p>
              <p>
                The result is a travel experience that feels both organised and flexible — where
                guests can enjoy the island knowing that everything behind the scenes is being
                managed properly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-dark py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-5xl">Start Planning Your Journey</h2>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              Share a few details with us, and we’ll design something that fits — structured
              around your time, preferences, and how you want to experience Zanzibar.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/plan-your-trip" className="btn-primary">
                Plan Your Trip
              </Link>
              <a
                href={contactHref.whatsapp}
                className="btn-secondary btn-secondary-inverse"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
