import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Reveal from '@/components/mansa/Reveal';
import {
  allDestinations,
  getDestinationByRegionAndSlug,
  getDestinationBySlug,
} from '@/lib/destination-data';
import { contactHref } from '@/lib/site-config';

export function generateStaticParams() {
  return allDestinations.map((destination) => ({
    region: destination.routeSegment || destination.region,
    slug: destination.slug,
  }));
}

export default function DestinationRegionSlugPage({
  params,
}: {
  params: { region: string; slug: string };
}) {
  const destination = getDestinationByRegionAndSlug(params.region, params.slug);

  if (!destination) {
    const fallback = getDestinationBySlug(params.slug);
    if (fallback) {
      redirect(`/destinations/${fallback.routeSegment || fallback.region}/${fallback.slug}`);
    }
    notFound();
  }

  if (destination.slug === 'north-coast' && destination.region === 'zanzibar') {
    return (
      <div className="bg-surface">
        <section className="relative flex min-h-[68vh] items-end overflow-hidden">
          <Image
            src={destination.heroImage}
            alt={destination.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.24),rgba(18,18,17,0.84))]" />
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-36 text-white lg:px-8 lg:pb-20">
            <p className="section-kicker mb-6 text-accent">Zanzibar</p>
            <h1 className="max-w-4xl font-heading text-5xl leading-[1.05] md:text-7xl">
              {destination.heroTitle || destination.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
              {destination.heroSubtitle || destination.shortDescription}
            </p>
          </div>
        </section>

        <section className="bg-surface-lighter py-20">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <Reveal>
              <div className="space-y-5 text-base leading-8 text-text-secondary md:text-lg">
                {(destination.introParagraphs || [destination.intro]).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <Reveal>
              <p className="section-kicker mb-5">Areas Within The North Coast</p>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {destination.areaCards?.map((area, index) => (
                <Reveal key={area.title} delay={index * 0.05}>
                  <article className="card-panel h-full p-8">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-accent">{area.title}</p>
                    <p className="mt-5 text-base leading-8 text-text-secondary">{area.description}</p>
                    <div className="mt-8">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-text-primary">
                        What It’s Like
                      </p>
                      <ul className="mt-4 space-y-2">
                        {area.traits.map((trait) => (
                          <li key={trait} className="flex items-start gap-3 text-base leading-8 text-text-secondary">
                            <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                            <span>{trait}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-text-primary">
                        Best For
                      </p>
                      <ul className="mt-4 space-y-2">
                        {area.bestFor.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-base leading-8 text-text-secondary">
                            <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-lighter py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <Reveal>
              <p className="section-kicker mb-5">What You Can Do</p>
            </Reveal>
            <div className="mt-8 grid gap-4">
              {destination.activityLinks?.map((activity, index) => (
                <Reveal key={activity.label} delay={index * 0.04}>
                  <Link
                    href={activity.href}
                    className="flex items-center justify-between rounded-[1.4rem] border border-surface-border bg-white/60 px-6 py-5 text-base text-text-primary transition hover:border-accent hover:text-accent"
                  >
                    <span>{activity.label}</span>
                    <span className="text-accent">View</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <p className="section-kicker mb-5">Where To Stay</p>
                <p className="text-base leading-8 text-text-secondary md:text-lg">
                  {destination.staysIntro}
                </p>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {destination.hotels?.map((hotel, index) => (
                <Reveal key={hotel.name} delay={index * 0.04}>
                  <article className="card-panel overflow-hidden">
                    <div className="relative h-64">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="font-heading text-2xl text-text-primary">{hotel.name}</h2>
                      <p className="mt-4 text-base leading-8 text-text-secondary">
                        {hotel.descriptor}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-dark py-20 text-center text-white">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-5xl">Start Planning Your Stay</h2>
              <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
                We’ll help you choose the right area and bring everything together into a seamless
                journey.
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
                  WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-surface">
      <section className="relative flex min-h-[68vh] items-end overflow-hidden">
        <Image
          src={destination.heroImage}
          alt={destination.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.22),rgba(18,18,17,0.82))]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-36 text-white lg:px-8 lg:pb-20">
          <p className="section-kicker mb-6 text-accent">
            {destination.region === 'zanzibar' ? 'Zanzibar' : 'Mainland Tanzania'}
          </p>
          <h1 className="max-w-4xl font-heading text-5xl leading-[1.05] md:text-7xl">
            {destination.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
            {destination.shortDescription}
          </p>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <p className="text-base leading-8 text-text-secondary md:text-lg">
              {destination.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="card-panel p-8">
              <p className="section-kicker mb-5">Pace</p>
              <p className="text-base leading-8 text-text-secondary">{destination.pace}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card-panel p-8">
              <p className="section-kicker mb-5">Best For</p>
              <p className="text-base leading-8 text-text-secondary">{destination.bestFor}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-dark py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-5xl">Start Planning Your Journey</h2>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              We’ll help you decide how this destination fits into the wider journey and shape the
              right flow around it.
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
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
