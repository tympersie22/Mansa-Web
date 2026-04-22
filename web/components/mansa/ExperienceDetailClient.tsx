'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Compass, MapPin, Sparkles, SunMedium, Users } from 'lucide-react';
import type { ExperienceEntry } from '@/lib/experience-data';
import { getJourneyItem } from '@/lib/experience-data';
import { contactHref } from '@/lib/site-config';
import AddToJourneyButton from '@/components/mansa/AddToJourneyButton';
import Reveal from '@/components/mansa/Reveal';
import ExperienceBrochureDrawer from '@/components/mansa/ExperienceBrochureDrawer';

interface ExperienceDetailClientProps {
  experience: ExperienceEntry;
  categoryTitle: string;
}

export default function ExperienceDetailClient({
  experience,
  categoryTitle,
}: ExperienceDetailClientProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="bg-surface">
        <section className="relative flex min-h-[68vh] items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              sizes="100vw"
              className="object-cover"
              style={experience.imagePosition ? { objectPosition: experience.imagePosition } : undefined}
              priority
            />
          </div>
          {experience.imageFit === 'contain' ? (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,236,220,0.18),rgba(18,18,17,0.14)_46%,rgba(18,18,17,0.5)_100%)]">
              <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center px-6 py-16 lg:px-8">
                <div className="relative h-full max-h-[34rem] w-full rounded-[2rem] border border-white/12 bg-[#efe2ca]/10 p-4 shadow-[0_18px_60px_rgba(13,19,15,0.22)] backdrop-blur-[1px]">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    style={experience.imagePosition ? { objectPosition: experience.imagePosition } : undefined}
                    priority
                  />
                </div>
              </div>
            </div>
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.22),rgba(18,18,17,0.82))]" />
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-36 text-white lg:px-8 lg:pb-20">
            <div className="mb-6 flex flex-wrap gap-3">
              {[experience.duration, experience.experienceType, categoryTitle].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/82"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl font-heading text-5xl leading-[1.05] md:text-7xl">
              {experience.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/76 md:text-lg">
              {experience.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <AddToJourneyButton item={getJourneyItem(experience)} />
              <Link href="/plan-your-trip" className="btn-primary">
                Start Planning
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-surface-lighter py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <Reveal>
                <div className="rounded-[2rem] bg-white p-7 shadow-[0_18px_50px_rgba(31,40,34,0.08)] md:p-9">
                  <p className="section-kicker mb-5">At a Glance</p>
                  <h2 className="font-heading text-3xl text-text-primary md:text-4xl">
                    A cleaner overview before the deeper detail
                  </h2>
                  <p className="mt-5 text-base leading-8 text-text-secondary md:text-lg">
                    {experience.summary}
                  </p>
                  <p className="mt-5 text-base leading-8 text-text-secondary md:text-lg">
                    {experience.brochure.overview}
                  </p>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(true)}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#24352a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2d23]"
                  >
                    View Full Experience
                    <Sparkles className="h-4 w-4" />
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: 'Duration', value: experience.duration, icon: Compass },
                    { label: 'Departure', value: experience.departure, icon: MapPin },
                    { label: 'Best Time', value: experience.bestTime, icon: SunMedium },
                    { label: 'Ideal For', value: experience.idealFor, icon: Users },
                  ].map((detail) => (
                    <div key={detail.label} className="card-panel p-6">
                      <detail.icon className="h-5 w-5 text-accent" />
                      <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-accent">
                        {detail.label}
                      </p>
                      <p className="mt-3 text-base leading-7 text-text-secondary">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <Reveal>
              <p className="section-kicker mb-5">Key Highlights</p>
            </Reveal>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {experience.highlights.slice(0, 4).map((highlight, index) => (
                <Reveal key={highlight} delay={index * 0.05}>
                  <div className="card-panel flex items-start gap-4 p-6">
                    <Sparkles className="mt-1 h-5 w-5 text-accent" />
                    <p className="text-base leading-8 text-text-secondary">{highlight}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-dark py-20 text-center text-white">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2 className="font-heading text-3xl md:text-5xl">Ready To Start Planning?</h2>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              When the experience direction feels right, we can help shape it into a well-paced plan around your timing, style, and wider journey.
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
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </div>

      <ExperienceBrochureDrawer
        experience={experience}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
