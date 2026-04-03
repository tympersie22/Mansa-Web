'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/mansa/Reveal';
import {
  experiences,
  heroVideo,
  introImage,
  testimonials,
} from '@/lib/mansa-content';

export default function HomePageContent() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="bg-surface">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            key={heroVideo}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src={heroVideo}
          >
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.3),rgba(18,18,17,0.62)_50%,rgba(18,18,17,0.82))]" />
        </div>

        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-6 pt-28 text-center text-text-inverse lg:px-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-kicker mb-6 text-accent">MANSA Tours and Travel</p>
          <h1 className="font-heading text-5xl leading-[1.05] md:text-7xl">
            Zanzibar, Curated With Intention.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
            Private experiences, curated journeys, and seamless travel across Zanzibar and
            mainland Tanzania.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/plan-your-trip" className="btn-primary">
              Plan Your Trip
            </Link>
            <Link href="/experiences" className="btn-secondary btn-secondary-inverse">
              Explore Experiences
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="bg-surface-lighter py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <Reveal>
            <p className="section-kicker mb-5">Introduction</p>
            <h2 className="font-heading text-3xl leading-tight text-text-primary md:text-5xl">
              Beyond the obvious, Zanzibar reveals itself slowly.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-text-secondary">
              <p>
                Zanzibar is often defined by its beaches — but the island offers far more than
                what first appears.
              </p>
              <p>
                There is history in Stone Town, culture woven into everyday life, and a coastline
                that shifts with the tide. The way you experience it shapes everything.
              </p>
              <p>
                We design journeys that bring these elements together — thoughtfully, and without
                excess. From ocean experiences and cultural encounters to safari extensions on the
                mainland, every detail is considered from the outset.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} x={28} y={0}>
            <div className="relative overflow-hidden rounded-[2rem]">
              <Image
                src={introImage}
                alt="Warm toned Zanzibar scene"
                width={1200}
                height={1400}
                className="h-[520px] w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/30 to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-kicker mb-5">Signature Experiences</p>
                <h2 className="font-heading text-3xl text-text-primary md:text-5xl">
                  Ways to Experience Zanzibar
                </h2>
              </div>
              <Link
                href="/experiences"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent"
              >
                View All Experiences
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {experiences.map((experience, index) => (
              <Reveal key={experience.title} delay={index * 0.06}>
                <Link href="/experiences" className="group experience-card">
                  <div className="relative h-[340px] overflow-hidden rounded-[1.75rem]">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      width={900}
                      height={1100}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.04),rgba(18,18,17,0.78))]" />
                    <div className="absolute inset-x-0 bottom-0 p-7 text-text-inverse">
                      <p className="mb-3 h-px w-14 bg-accent transition-all duration-300 group-hover:w-20" />
                      <h3 className="font-heading text-2xl">{experience.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/76">
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-dark py-8 text-text-inverse">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-4">
            <p className="section-kicker text-accent">Testimonials</p>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="relative min-h-[148px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-5 py-6 md:px-8"
              >
                <p className="max-w-3xl text-base leading-8 text-white/78 md:text-lg">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </p>

                <div className="mt-5 flex flex-col gap-2 md:flex-row md:items-center">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
                    {testimonials[activeTestimonial].name} • {testimonials[activeTestimonial].origin}
                  </p>
                  <span className="hidden h-1 w-1 rounded-full bg-white/35 md:block" />
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/54">
                    {testimonials[activeTestimonial].journey}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2.5">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                aria-pressed={index === activeTestimonial}
                onClick={() => setActiveTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeTestimonial ? 'w-8 bg-accent' : 'w-2 bg-white/20 hover:bg-white/35'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-dark py-24 text-center text-text-inverse">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <p className="section-kicker mb-5 text-accent">Curated Approach</p>
            <h2 className="font-heading text-3xl md:text-5xl">A Considered Approach</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-white/74">
              <p>Every journey we design is built from the ground up.</p>
              <p>
                We don’t rely on fixed itineraries or pre-set packages. Instead, each trip is
                shaped around how you want to travel — with the flexibility to adjust pace,
                experiences, and flow along the way.
              </p>
              <p>
                Being closely involved on the ground allows us to ensure consistency, reliability,
                and attention to detail throughout your stay.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
