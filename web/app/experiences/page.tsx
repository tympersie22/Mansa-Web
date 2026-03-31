import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/mansa/Reveal';
import { contactHref } from '@/lib/site-config';
import {
  experienceCategories,
  experiences,
  featuredExperienceSlugs,
  getExperienceBySlug,
} from '@/lib/experience-data';

export default function ExperiencesPage() {
  const featuredExperiences = featuredExperienceSlugs
    .map((slug) => getExperienceBySlug(slug))
    .filter(Boolean);

  return (
    <div className="bg-surface">
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
          alt="Zanzibar ocean experience"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.24),rgba(18,18,17,0.78))]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-36 text-white lg:px-8 lg:pb-20">
          <p className="section-kicker mb-6 text-accent">Experiences</p>
          <h1 className="max-w-3xl font-heading text-5xl leading-[1.05] md:text-7xl">
            Ways to Experience Zanzibar
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
            Each journey is shaped individually — these are simply the starting points.
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
              Zanzibar offers more than one way to experience it. From ocean-based exploration and
              cultural immersion to slower, more private moments, each experience can be shaped
              around how you want to travel.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {experienceCategories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 0.06}>
                <Link href={`/experiences/${category.slug}`} className="group block overflow-hidden rounded-[1.9rem]">
                  <div className="relative min-h-[380px]">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.18),rgba(18,18,17,0.78))]" />
                    <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-10">
                      <p className="mb-4 h-px w-16 bg-accent transition-all duration-300 group-hover:w-24" />
                      <h2 className="font-heading text-3xl md:text-4xl">{category.title}</h2>
                      <p className="mt-4 max-w-md text-base leading-8 text-white/76">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-kicker mb-5">Featured Experiences</p>
                <h2 className="font-heading text-3xl text-text-primary md:text-5xl">
                  A small selection to begin with
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 flex snap-x gap-6 overflow-x-auto pb-4">
            {featuredExperiences.map((experience) => (
              <Link
                key={experience!.slug}
                href={`/experiences/${experience!.slug}`}
                className="card-panel min-w-[300px] snap-start overflow-hidden md:min-w-[340px]"
              >
                <div className="relative h-64">
                  <Image
                    src={experience!.image}
                    alt={experience!.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 340px"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-text-primary">{experience!.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{experience!.cardLine}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <p className="font-heading text-2xl leading-relaxed text-text-primary md:text-3xl">
              Each experience can be adapted in pace, level of privacy, and overall flow —
              depending on how you prefer to travel.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-dark py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-5xl">Start Planning Your Journey</h2>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              Whether you’re selecting a single experience or building a wider itinerary, we’ll
              help you bring everything together seamlessly.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/plan-your-trip" className="btn-primary">
                Plan Your Trip
              </Link>
              <a href={contactHref.whatsapp} className="btn-secondary btn-secondary-inverse" target="_blank" rel="noreferrer">
                WhatsApp Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
