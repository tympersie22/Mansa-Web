'use client';

import { useEffect, useState } from 'react';
import PageHero from '@/components/mansa/PageHero';
import type { JourneyItem } from '@/lib/experience-data';
import { readJourney, subscribeJourney } from '@/lib/journey-storage';
import { submitContactInquiry } from '@/lib/contact-service';
import { contactHref, siteConfig } from '@/lib/site-config';

export default function PlanYourTripPage() {
  const [selectedExperiences, setSelectedExperiences] = useState<JourneyItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    travelWindow: '',
    guests: '',
    interests: '',
    notes: '',
  });

  useEffect(() => {
    const sync = () => {
      const items = readJourney();
      setSelectedExperiences(items);
      setFormData((current) => {
        if (current.notes.trim()) return current;

        return {
          ...current,
          notes: items.length
            ? `Selected experiences:\n${items.map((item) => `- ${item.title}`).join('\n')}\n`
            : current.notes,
        };
      });
    };

    sync();
    return subscribeJourney(sync);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await submitContactInquiry({
        name: formData.name,
        email: formData.email,
        subject: 'Plan Your Trip Inquiry',
        message: [
          `Travel window: ${formData.travelWindow || 'Not provided'}`,
          `Guests: ${formData.guests || 'Not provided'}`,
          `Interests: ${formData.interests || 'Not provided'}`,
          `Selected experiences: ${
            selectedExperiences.length
              ? selectedExperiences.map((item) => item.title).join(', ')
              : 'None selected'
          }`,
          `Notes: ${formData.notes || 'Not provided'}`,
        ].join('\n'),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Plan Your Trip"
        title="Start with a few details. We’ll shape the journey from there."
        description="Tell us what kind of travel you’re considering, what matters most, and any timing or pace preferences you already know."
        primaryHref={contactHref.whatsapp}
        primaryLabel="WhatsApp Us"
      />

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="card-panel p-8 md:p-10">
            {submitted ? (
              <div>
                <p className="section-kicker mb-5">Inquiry Sent</p>
                <h2 className="font-heading text-3xl text-text-primary">We’ve received your request.</h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-text-secondary">
                  A member of the MANSA TOURS AND TRAVEL team will follow up shortly to refine
                  the direction, timing, and experience mix for your journey.
                </p>
              </div>
            ) : (
              <form className="grid gap-5" onSubmit={handleSubmit}>
                {selectedExperiences.length ? (
                  <div className="rounded-[1.25rem] border border-accent/20 bg-accent/10 p-5">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
                      Selected Experiences
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedExperiences.map((item) => (
                        <span
                          key={item.slug}
                          className="rounded-full border border-accent/25 px-3 py-1 text-xs uppercase tracking-[0.14em] text-text-primary"
                        >
                          {item.title}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2 text-sm text-text-secondary">
                    Full Name
                    <input
                      className="input-dark"
                      value={formData.name}
                      onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-text-secondary">
                    Email Address
                    <input
                      className="input-dark"
                      type="email"
                      value={formData.email}
                      onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                      required
                    />
                  </label>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2 text-sm text-text-secondary">
                    Travel Window
                    <input
                      className="input-dark"
                      placeholder="Month, season, or exact dates"
                      value={formData.travelWindow}
                      onChange={(event) =>
                        setFormData({ ...formData, travelWindow: event.target.value })
                      }
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-text-secondary">
                    Number of Guests
                    <input
                      className="input-dark"
                      placeholder="2 adults, family of 4, etc."
                      value={formData.guests}
                      onChange={(event) => setFormData({ ...formData, guests: event.target.value })}
                    />
                  </label>
                </div>
                <label className="grid gap-2 text-sm text-text-secondary">
                  Interests
                  <input
                    className="input-dark"
                    placeholder="Ocean days, Stone Town, safari, slow living..."
                    value={formData.interests}
                    onChange={(event) => setFormData({ ...formData, interests: event.target.value })}
                  />
                </label>
                <label className="grid gap-2 text-sm text-text-secondary">
                  Notes
                  <textarea
                    className="input-dark min-h-[180px] resize-y"
                    placeholder="Share your pace, style, must-haves, or anything else we should know."
                    value={formData.notes}
                    onChange={(event) => setFormData({ ...formData, notes: event.target.value })}
                  />
                </label>
                <button className="btn-primary w-fit" disabled={submitting} type="submit">
                  {submitting ? 'Sending...' : 'Submit Inquiry'}
                </button>
                {error ? <p className="text-sm text-red-600">{error}</p> : null}
              </form>
            )}
          </div>

          <aside className="grid gap-6">
            <div className="card-panel p-8">
              <p className="section-kicker mb-5">Direct Contact</p>
              <div className="space-y-4 text-sm text-text-secondary">
                <p>{siteConfig.contact.email}</p>
                <p>{siteConfig.contact.phone}</p>
                <p>{siteConfig.contact.address}</p>
              </div>
            </div>
            <div className="card-panel p-8">
              <p className="section-kicker mb-5">WhatsApp</p>
              <a href={contactHref.whatsapp} className="btn-secondary" target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
