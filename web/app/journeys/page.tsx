import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/mansa/Reveal';
import { journeys, journeyOrder, getJourneyBySlug } from '@/lib/journey-data';
import { contactHref } from '@/lib/site-config';

export default function JourneysPage() {
  const orderedJourneys = journeyOrder
    .map((slug) => getJourneyBySlug(slug))
    .filter(Boolean);

  return (
    <div className="bg-surface">
      <section className="relative flex min-h-[68vh] items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80"
          alt="Curated Zanzibar journey"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.24),rgba(18,18,17,0.82))]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-36 text-white lg:px-8 lg:pb-20">
          <p className="section-kicker mb-6 text-accent">Journeys</p>
          <h1 className="max-w-4xl font-heading text-5xl leading-[1.05] md:text-7xl">
            Curated Journeys
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
            A selection of journeys designed to show how Zanzibar can be experienced — each one
            shaped and adapted around you.
          </p>
          <Link href="/plan-your-trip" className="btn-primary mt-10">
            Plan Your Trip
          </Link>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <p className="text-base leading-8 text-text-secondary md:text-lg">
              No two journeys are the same. These examples are designed to give you a sense of how
              your time in Zanzibar can come together — balancing experiences, pace, and place.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {orderedJourneys.map((journey, index) => (
              <Reveal key={journey!.slug} delay={index * 0.05}>
                <Link
                  href={`/journeys/${journey!.slug}`}
                  className="group block overflow-hidden rounded-[1.9rem]"
                >
                  <article className="relative min-h-[430px]">
                    <Image
                      src={journey!.heroImage}
                      alt={journey!.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.2),rgba(18,18,17,0.84))] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(18,18,17,0.28),rgba(18,18,17,0.88))]" />
                    <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-9">
                      <p className="mb-4 h-px w-16 bg-accent transition-all duration-300 group-hover:w-24" />
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/72">
                        {journey!.duration}
                      </p>
                      <h2 className="mt-4 font-heading text-3xl transition duration-300 group-hover:text-accent">
                        {journey!.title}
                      </h2>
                      <p className="mt-4 max-w-md text-base leading-8 text-white/76">
                        {journey!.description}
                      </p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <p className="font-heading text-2xl leading-relaxed text-text-primary md:text-3xl">
              Each journey is fully customizable — durations, accommodation, and experiences can
              be adjusted based on your preferences.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-dark py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-5xl">Start Planning Your Journey</h2>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              Share a few details with us, and we’ll design a journey that fits.
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
