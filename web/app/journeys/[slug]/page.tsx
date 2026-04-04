import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/mansa/Reveal';
import { getJourneyBySlug, journeys } from '@/lib/journey-data';
import { contactHref } from '@/lib/site-config';

export function generateStaticParams() {
  return journeys.map((journey) => ({ slug: journey.slug }));
}

export default function JourneyDetailPage({ params }: { params: { slug: string } }) {
  const journey = getJourneyBySlug(params.slug);

  if (!journey) notFound();

  return (
    <div className="bg-surface">
      <section className="relative flex min-h-[68vh] items-end overflow-hidden">
        <Image
          src={journey.heroImage}
          alt={journey.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.22),rgba(18,18,17,0.82))]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-36 text-white lg:px-8 lg:pb-20">
          <p className="section-kicker mb-6 text-accent">Curated Journey</p>
          <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-white/72">
            {journey.duration}
          </p>
          <h1 className="max-w-4xl font-heading text-5xl leading-[1.05] md:text-7xl">
            {journey.heroTitle || journey.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
            {journey.heroSubtitle}
          </p>
          <Link href="/plan-your-trip" className="btn-primary mt-10">
            Plan Your Trip
          </Link>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <div className="space-y-5 text-base leading-8 text-text-secondary md:text-lg">
            {journey.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <p className="section-kicker mb-5">Journey Flow</p>
          </Reveal>
          <div className="mt-10 space-y-8">
            {journey.flow.map((day, index) => (
              <Reveal key={day.dayLabel} delay={index * 0.05}>
                <div className="grid gap-6 overflow-hidden rounded-[1.9rem] bg-surface-lighter md:grid-cols-2">
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''} relative min-h-[320px]`}>
                    <Image
                      src={day.image}
                      alt={`${journey.title} ${day.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''} flex items-center p-8 md:p-10`}>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
                        {day.dayLabel} • {day.location}
                      </p>
                      <h2 className="mt-5 font-heading text-3xl text-text-primary md:text-4xl">
                        {day.title}
                      </h2>
                      <p className="mt-5 text-base leading-8 text-text-secondary">
                        {day.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="section-kicker mb-5">Where You’ll Stay</p>
              <p className="text-base leading-8 text-text-secondary md:text-lg">
                {journey.staysIntro}
              </p>
            </div>
          </Reveal>
          <div className="mt-10 space-y-10">
            {journey.stays.map((group, groupIndex) => (
              <div key={group.location}>
                <Reveal delay={groupIndex * 0.05}>
                  <div className="mb-5">
                    <h2 className="font-heading text-3xl text-text-primary">{group.location}</h2>
                  </div>
                </Reveal>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {group.hotels.map((hotel, hotelIndex) => (
                    <Reveal key={hotel.name} delay={hotelIndex * 0.05}>
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
                          <h3 className="font-heading text-2xl text-text-primary">{hotel.name}</h3>
                          <p className="mt-3 text-base leading-8 text-text-secondary">
                            {hotel.descriptor}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2 lg:px-8">
          <div className="card-panel p-8">
            <p className="section-kicker mb-5">Included Experiences</p>
            <ul className="space-y-3">
              {journey.includedExperiences.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-8 text-text-secondary">
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-panel p-8">
            <p className="section-kicker mb-5">What’s Included</p>
            <ul className="grid gap-x-8 gap-y-3 md:grid-cols-1">
              {journey.includedItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-8 text-text-secondary">
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <p className="font-heading text-2xl leading-relaxed text-text-primary md:text-3xl">
              {journey.flexibility}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-dark py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-5xl">Start Planning Your Journey</h2>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              Share a few details with us, and we’ll shape this journey around you.
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
