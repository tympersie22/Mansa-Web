import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Compass, MapPin, SunMedium, Users } from 'lucide-react';
import AddToJourneyButton from '@/components/mansa/AddToJourneyButton';
import Reveal from '@/components/mansa/Reveal';
import {
  getCategoryBySlug,
  getExperienceBySlug,
  getExperiencesByCategory,
  getJourneyItem,
} from '@/lib/experience-data';
import { contactHref } from '@/lib/site-config';

export default function ExperienceSlugPage({ params }: { params: { slug: string[] } }) {
  const segments = params.slug || [];
  if (segments.length !== 1) notFound();

  const slug = segments[0];
  const category = getCategoryBySlug(slug);

  if (category) {
    const categoryExperiences = getExperiencesByCategory(slug);

    return (
      <div className="bg-surface">
        <section className="relative flex min-h-[65vh] items-end overflow-hidden">
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.24),rgba(18,18,17,0.8))]" />
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-36 text-white lg:px-8 lg:pb-20">
            <p className="section-kicker mb-6 text-accent">Experience Category</p>
            <h1 className="max-w-3xl font-heading text-5xl leading-[1.05] md:text-7xl">
              {category.title}
            </h1>
          </div>
        </section>

        <section className="bg-surface-lighter py-20">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <p className="text-base leading-8 text-text-secondary md:text-lg">{category.intro}</p>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {categoryExperiences.map((experience, index) => (
                <Reveal key={experience.slug} delay={index * 0.06}>
                  <Link href={`/experiences/${experience.slug}`} className="card-panel block overflow-hidden">
                    <div className="relative h-72">
                      <Image
                        src={experience.image}
                        alt={experience.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="font-heading text-3xl text-text-primary">{experience.title}</h2>
                      <p className="mt-3 text-base leading-8 text-text-secondary">{experience.cardLine}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-lighter py-20">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <p className="font-heading text-2xl leading-relaxed text-text-primary md:text-3xl">
              {category.curationLine}
            </p>
          </div>
        </section>

        <section className="bg-surface-dark py-20 text-center text-white">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="font-heading text-3xl md:text-5xl">Plan This Part of the Journey</h2>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              We can build this category on its own or weave it into a broader Zanzibar itinerary.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/plan-your-trip" className="btn-primary">
                Plan Your Trip
              </Link>
              <a href={contactHref.whatsapp} className="btn-secondary btn-secondary-inverse" target="_blank" rel="noreferrer">
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const experience = getExperienceBySlug(slug);
  if (!experience) notFound();
  const experienceCategory = getCategoryBySlug(experience.categorySlug);

  return (
    <div className="bg-surface">
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.22),rgba(18,18,17,0.82))]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-36 text-white lg:px-8 lg:pb-20">
          <div className="mb-6 flex flex-wrap gap-3">
            {[experience.duration, experience.experienceType, experienceCategory?.title || experience.categorySlug].map((tag) => (
              <span key={tag} className="rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/82">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="max-w-4xl font-heading text-5xl leading-[1.05] md:text-7xl">{experience.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/76 md:text-lg">{experience.subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <AddToJourneyButton item={getJourneyItem(experience)} />
            <Link href="/plan-your-trip" className="btn-secondary btn-secondary-inverse">
              Plan Your Trip
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-5 text-base leading-8 text-text-secondary md:text-lg">
            {experience.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <p className="section-kicker mb-5">Highlights</p>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {experience.highlights.map((highlight, index) => (
              <Reveal key={highlight} delay={index * 0.05}>
                <div className="card-panel flex items-start gap-4 p-6">
                  <Check className="mt-1 h-5 w-5 text-accent" />
                  <p className="text-base leading-8 text-text-secondary">{highlight}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="section-kicker mb-5">The Experience</p>
            <div className="space-y-5 text-base leading-8 text-text-secondary">
              {experience.narrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative min-h-[340px] overflow-hidden rounded-[1.75rem]">
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="section-kicker mb-5">Experience Options</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {experience.options.map((option) => (
              <div key={option.title} className="card-panel p-8">
                <h2 className="font-heading text-3xl text-text-primary">{option.title}</h2>
                <p className="mt-4 text-base leading-8 text-text-secondary">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="section-kicker mb-5">Key Details</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              { label: 'Duration', value: experience.duration, icon: Compass },
              { label: 'Departure Location', value: experience.departure, icon: MapPin },
              { label: 'Start Time', value: experience.startTime, icon: SunMedium },
              { label: 'Best Time', value: experience.bestTime, icon: SunMedium },
              { label: 'Ideal For', value: experience.idealFor, icon: Users },
            ].map((detail) => (
              <div key={detail.label} className="card-panel flex items-start gap-4 p-6">
                <detail.icon className="mt-1 h-5 w-5 text-accent" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent">{detail.label}</p>
                  <p className="mt-2 text-base leading-8 text-text-secondary">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2 lg:px-8">
          <div className="card-panel p-8">
            <p className="section-kicker mb-5">What’s Included</p>
            <ul className="space-y-3">
              {experience.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-8 text-text-secondary">
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-panel p-8">
            <p className="section-kicker mb-5">What To Bring</p>
            <ul className="space-y-3">
              {experience.bring.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-8 text-text-secondary">
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {experience.notes.length ? (
        <section className="bg-surface-lighter py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="card-panel p-8">
              <p className="section-kicker mb-5">Important Notes</p>
              <ul className="space-y-3">
                {experience.notes.map((note) => (
                  <li key={note} className="flex items-start gap-3 text-base leading-8 text-text-secondary">
                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-surface-dark py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-5xl">Plan This Experience</h2>
          <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
            This experience can be arranged on its own or as part of a wider journey across Zanzibar.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <AddToJourneyButton item={getJourneyItem(experience)} />
            <Link href="/plan-your-trip" className="btn-primary">
              Start Planning
            </Link>
            <a href={contactHref.whatsapp} className="btn-secondary btn-secondary-inverse" target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
