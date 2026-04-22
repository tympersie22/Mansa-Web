import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ExperienceDetailClient from '@/components/mansa/ExperienceDetailClient';
import Reveal from '@/components/mansa/Reveal';
import {
  getCategoryBySlug,
  getExperienceBySlug,
  getExperiencesByCategory,
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
          <div className="absolute inset-0">
            <Image
              src={category.image}
              alt={category.title}
              fill
              sizes="100vw"
              className="object-cover"
              style={category.imagePosition ? { objectPosition: category.imagePosition } : undefined}
              priority
            />
          </div>
          {category.imageFit === 'contain' ? (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,236,220,0.16),rgba(18,18,17,0.14)_46%,rgba(18,18,17,0.5)_100%)]">
              <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center px-6 py-16 lg:px-8">
                <div className="relative h-full max-h-[32rem] w-full rounded-[2rem] border border-white/12 bg-[#efe2ca]/10 p-4 shadow-[0_18px_60px_rgba(13,19,15,0.22)] backdrop-blur-[1px]">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    style={category.imagePosition ? { objectPosition: category.imagePosition } : undefined}
                    priority
                  />
                </div>
              </div>
            </div>
          ) : null}
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
                    <div className={`relative h-72 ${experience.imageFit === 'contain' ? 'bg-[#f2e6d4]' : ''}`}>
                      <Image
                        src={experience.image}
                        alt={experience.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`${experience.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'} transition duration-700 hover:scale-105`}
                        style={experience.imagePosition ? { objectPosition: experience.imagePosition } : undefined}
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
    <ExperienceDetailClient
      experience={experience}
      categoryTitle={experienceCategory?.title || experience.categorySlug}
    />
  );
}
