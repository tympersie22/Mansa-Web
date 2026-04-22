'use client';

import { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Sparkles, X } from 'lucide-react';
import type { ExperienceEntry } from '@/lib/experience-data';
import { getJourneyItem } from '@/lib/experience-data';
import { contactHref } from '@/lib/site-config';
import AddToJourneyButton from '@/components/mansa/AddToJourneyButton';
import ExperienceDrawerSection from '@/components/mansa/ExperienceDrawerSection';
import ExperienceTimelineItem from '@/components/mansa/ExperienceTimelineItem';

interface ExperienceBrochureDrawerProps {
  experience: ExperienceEntry;
  open: boolean;
  onClose: () => void;
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return [] as HTMLElement[];

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute('disabled'));
}

export default function ExperienceBrochureDrawer({
  experience,
  open,
  onClose,
}: ExperienceBrochureDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const noteList = useMemo(
    () =>
      experience.brochure.notes
        .split(/(?<=\.)\s+/)
        .map((item) => item.trim())
        .filter(Boolean),
    [experience.brochure.notes]
  );

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timeout = window.setTimeout(() => closeButtonRef.current?.focus(), 20);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = getFocusableElements(panelRef.current);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80]">
          <motion.button
            type="button"
            aria-label="Close full experience"
            className="absolute inset-0 bg-[#101513]/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <div
            className="absolute inset-0 flex items-end justify-center"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="experience-brochure-title"
              className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] bg-[#f5f1e8] shadow-[0_-18px_60px_rgba(13,19,15,0.28)] md:mb-6 md:rounded-[2rem]"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              drag="y"
              dragDirectionLock
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.18 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 140 || info.velocity.y > 900) onClose();
              }}
            >
              <div className="flex justify-center py-3 md:hidden">
                <div className="h-1.5 w-14 rounded-full bg-[#d4cab5]" />
              </div>

              <div className="overflow-y-auto px-4 pb-5 md:px-6 md:pb-6">
                <div className="relative overflow-hidden rounded-[1.9rem] bg-[#23302b] text-white">
                  <div className="absolute inset-0">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      sizes="100vw"
                      className="object-cover opacity-28"
                      style={experience.imagePosition ? { objectPosition: experience.imagePosition } : undefined}
                    />
                  </div>
                  <div className="relative p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#f3d071]">
                          Full Experience
                        </p>
                        <h2
                          id="experience-brochure-title"
                          className="mt-3 max-w-3xl font-heading text-4xl leading-[1.04] md:text-6xl"
                        >
                          {experience.title}
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/78 md:text-base">
                          {experience.subtitle}
                        </p>
                      </div>
                      <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white transition hover:bg-white/18"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {[
                        experience.duration,
                        experience.experienceType,
                        `From ${experience.departure}`,
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/82"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-5">
                  <ExperienceDrawerSection eyebrow="Overview" title="What This Experience Feels Like">
                    <p className="max-w-3xl text-sm leading-8 text-[#526157] md:text-base">
                      {experience.brochure.overview}
                    </p>
                  </ExperienceDrawerSection>

                  <ExperienceDrawerSection eyebrow="Highlights" title="Why It Stands Out">
                    <div className="grid gap-4 md:grid-cols-2">
                      {experience.brochure.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-start gap-4 rounded-[1.25rem] border border-[#e6dcc8] bg-[#fbf8f1] p-4"
                        >
                          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e3b6] text-[#7f6322]">
                            <Sparkles className="h-4 w-4" />
                          </div>
                          <p className="text-sm leading-7 text-[#55675e]">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </ExperienceDrawerSection>

                  <ExperienceDrawerSection eyebrow="Timeline" title="How The Day Unfolds">
                    <div className="space-y-4">
                      {experience.brochure.fullItinerary.map((item, index) => (
                        <ExperienceTimelineItem key={`${item.label}-${item.title}`} item={item} index={index} />
                      ))}
                    </div>
                  </ExperienceDrawerSection>

                  <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
                    <ExperienceDrawerSection eyebrow="Included" title="What’s Included">
                      <ul className="space-y-3">
                        {experience.brochure.includes.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#55675e]">
                            <Check className="mt-1 h-4 w-4 text-[#d39427]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </ExperienceDrawerSection>

                    <ExperienceDrawerSection eyebrow="Excluded" title="What’s Not Included">
                      {experience.brochure.excludes.length ? (
                        <ul className="space-y-3">
                          {experience.brochure.excludes.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#55675e]">
                              <X className="mt-1 h-4 w-4 text-[#9b7c2f]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm leading-7 text-[#55675e]">
                          Final exclusions depend on whether the experience is arranged privately or as part of a wider journey.
                        </p>
                      )}
                    </ExperienceDrawerSection>
                  </div>

                  <ExperienceDrawerSection eyebrow="Notes" title="Important To Know">
                    <ul className="space-y-3">
                      {noteList.map((note) => (
                        <li key={note} className="flex items-start gap-3 text-sm leading-7 text-[#55675e]">
                          <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#9b7c2f]" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </ExperienceDrawerSection>

                  <section className="rounded-[1.75rem] bg-[#23302b] p-6 text-white md:p-8">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#f3d071]">Continue</p>
                    <h3 className="mt-3 font-heading text-3xl">Plan This Experience</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/74 md:text-base">
                      You can keep this as a standalone experience or fold it into a wider Zanzibar journey.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <AddToJourneyButton item={getJourneyItem(experience)} />
                      <Link href="/plan-your-trip" className="btn-primary">
                        Start Planning
                      </Link>
                      <a
                        href={contactHref.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary btn-secondary-inverse"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
