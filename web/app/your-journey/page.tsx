'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PageHero from '@/components/mansa/PageHero';
import type { JourneyItem } from '@/lib/experience-data';
import { clearJourney, readJourney, removeJourneyItem, subscribeJourney } from '@/lib/journey-storage';

export default function YourJourneyPage() {
  const [items, setItems] = useState<JourneyItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(readJourney());
    sync();
    return subscribeJourney(sync);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Your Journey"
        title="A working overview of the experiences you’re considering."
        description="This is not a cart. It’s simply a way to hold the experiences that feel right so they can shape the wider journey."
        primaryHref="/plan-your-trip"
        primaryLabel="Start Planning"
      />

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="card-panel p-10 text-center">
              <h2 className="font-heading text-3xl text-text-primary">No experiences saved yet.</h2>
              <p className="mt-4 text-base leading-8 text-text-secondary">
                Explore the experience categories and add anything that feels relevant to your journey.
              </p>
              <Link href="/experiences" className="btn-primary mt-8">
                Explore Experiences
              </Link>
            </div>
          ) : (
            <div className="grid gap-5">
              {items.map((item) => (
                <article key={item.slug} className="card-panel flex flex-col gap-5 p-8 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-accent">{item.category}</p>
                    <h2 className="mt-2 font-heading text-3xl text-text-primary">{item.title}</h2>
                    <p className="mt-2 text-sm uppercase tracking-[0.14em] text-text-muted">{item.duration}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link href={`/experiences/${item.slug}`} className="btn-secondary">
                      View Experience
                    </Link>
                    <button type="button" onClick={() => removeJourneyItem(item.slug)} className="btn-secondary">
                      Remove
                    </button>
                  </div>
                </article>
              ))}

              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/plan-your-trip" className="btn-primary">
                  Start Planning
                </Link>
                <button type="button" onClick={() => clearJourney()} className="btn-secondary">
                  Clear Journey
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
