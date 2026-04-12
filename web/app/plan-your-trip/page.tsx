'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Reveal from '@/components/mansa/Reveal';
import type { JourneyItem } from '@/lib/experience-data';
import {
  getJourneySessionId,
  getJourneyVisitorToken,
  readJourney,
  subscribeJourney,
} from '@/lib/journey-storage';
import { submitPlanningInquiry } from '@/lib/mansa-backend';

const whatsappHref =
  'https://wa.me/255779451655?text=' +
  encodeURIComponent("Hi, I'd like to start planning a trip to Zanzibar.");

const tripExamples = ['Zanzibar + Safari', 'Beach & relaxation', 'Honeymoon', 'Group trip'];

export default function PlanYourTripPage() {
  const [selectedExperiences, setSelectedExperiences] = useState<JourneyItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showTripExamples, setShowTripExamples] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneWhatsapp: '',
    travelStartDate: '',
    travelEndDate: '',
    isDateFlexible: false,
    guests: '2',
    trip: '',
    additionalDetails: '',
  });

  useEffect(() => {
    const sync = () => {
      setSelectedExperiences(readJourney());
    };

    sync();
    return subscribeJourney(sync);
  }, []);

  const travelWindow = useMemo(() => {
    if (formData.travelStartDate && formData.travelEndDate) {
      return `${formData.travelStartDate} to ${formData.travelEndDate}`;
    }
    return formData.travelStartDate || formData.travelEndDate || '';
  }, [formData.travelEndDate, formData.travelStartDate]);

  const combinedMessage = useMemo(() => {
    const parts = [formData.trip.trim(), formData.additionalDetails.trim()].filter(Boolean);
    return parts.join('\n\n');
  }, [formData.additionalDetails, formData.trip]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await submitPlanningInquiry({
        fullName: formData.fullName,
        email: formData.email,
        phoneWhatsapp: formData.phoneWhatsapp,
        travelWindow,
        isDateFlexible: formData.isDateFlexible,
        guestCount: Number.parseInt(formData.guests, 10) || 1,
        interests: formData.trip,
        message: combinedMessage,
        sourcePage: '/plan-your-trip',
        selectedExperiences,
        sessionId: getJourneySessionId(),
        visitorToken: getJourneyVisitorToken(),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface">
      <section className="relative flex min-h-[68vh] items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80"
          alt="Planning a Zanzibar journey"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.24),rgba(18,18,17,0.84))]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-36 text-white lg:px-8 lg:pb-20">
          <Reveal>
            <p className="section-kicker mb-6 text-accent">Plan Your Trip</p>
            <h1 className="max-w-4xl font-heading text-5xl leading-[1.05] md:text-7xl">
              Plan Your Trip
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
              Share a few details with us, and we&apos;ll design a journey that fits —
              structured around your time, preferences, and how you want to experience Zanzibar.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <div className="space-y-5 text-base leading-8 text-text-secondary md:text-lg">
              <p>Every journey is different.</p>
              <p>
                This form helps us understand your plans so we can put together a well-structured
                and considered proposal for you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div className="card-panel p-8 md:p-10">
            {submitted ? (
              <div>
                <p className="section-kicker mb-5">Request Received</p>
                <h2 className="font-heading text-3xl text-text-primary">
                  Thank you. We&apos;ve received your request and will be in touch shortly.
                </h2>
              </div>
            ) : (
              <form className="grid gap-8" onSubmit={handleSubmit}>
                <div className="grid gap-5">
                  <div>
                    <p className="section-kicker mb-4">Personal Details</p>
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="grid gap-2 text-sm text-text-secondary">
                        Full Name
                        <input
                          className="input-dark"
                          value={formData.fullName}
                          onChange={(event) =>
                            setFormData({ ...formData, fullName: event.target.value })
                          }
                          required
                        />
                      </label>
                      <label className="grid gap-2 text-sm text-text-secondary">
                        Email Address
                        <input
                          className="input-dark"
                          type="email"
                          value={formData.email}
                          onChange={(event) =>
                            setFormData({ ...formData, email: event.target.value })
                          }
                          required
                        />
                      </label>
                      <label className="grid gap-2 text-sm text-text-secondary md:col-span-2">
                        Phone / WhatsApp
                        <input
                          className="input-dark"
                          placeholder="+255..."
                          value={formData.phoneWhatsapp}
                          onChange={(event) =>
                            setFormData({ ...formData, phoneWhatsapp: event.target.value })
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="section-kicker mb-4">Travel Details</p>
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="grid gap-2 text-sm text-text-secondary">
                        Start Date
                        <input
                          className="input-dark"
                          type="date"
                          value={formData.travelStartDate}
                          onChange={(event) =>
                            setFormData({ ...formData, travelStartDate: event.target.value })
                          }
                          required
                        />
                      </label>
                      <label className="grid gap-2 text-sm text-text-secondary">
                        End Date
                        <input
                          className="input-dark"
                          type="date"
                          value={formData.travelEndDate}
                          onChange={(event) =>
                            setFormData({ ...formData, travelEndDate: event.target.value })
                          }
                          required
                        />
                      </label>
                      <label className="flex items-center gap-3 text-sm text-text-secondary md:col-span-2">
                        <input
                          type="checkbox"
                          checked={formData.isDateFlexible}
                          onChange={(event) =>
                            setFormData({ ...formData, isDateFlexible: event.target.checked })
                          }
                        />
                        <span>My travel dates are flexible</span>
                      </label>
                      <label className="grid gap-2 text-sm text-text-secondary md:max-w-[220px]">
                        Number of Guests
                        <input
                          className="input-dark"
                          type="number"
                          min={1}
                          value={formData.guests}
                          onChange={(event) =>
                            setFormData({ ...formData, guests: event.target.value })
                          }
                          required
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="section-kicker mb-4">Trip Details</p>
                    <label className="grid gap-2 text-sm text-text-secondary">
                      Your Trip
                      <textarea
                        className="input-dark min-h-[120px] resize-y"
                        placeholder="Briefly describe your trip — destinations, experiences, or what you’d like to include"
                        value={formData.trip}
                        onFocus={() => setShowTripExamples(true)}
                        onBlur={() => setTimeout(() => setShowTripExamples(false), 120)}
                        onChange={(event) =>
                          setFormData({ ...formData, trip: event.target.value })
                        }
                        required
                      />
                    </label>
                    {showTripExamples ? (
                      <div className="mt-4 rounded-[1.2rem] border border-accent/20 bg-accent/10 p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-accent">
                          Examples
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {tripExamples.map((example) => (
                            <button
                              key={example}
                              type="button"
                              className="rounded-full border border-accent/30 px-3 py-1 text-xs uppercase tracking-[0.14em] text-text-primary transition hover:border-accent hover:bg-white/70"
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() =>
                                setFormData((current) => ({
                                  ...current,
                                  trip: current.trip.trim() ? current.trip : example,
                                }))
                              }
                            >
                              {example}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <p className="section-kicker mb-4">Additional Details</p>
                    <label className="grid gap-2 text-sm text-text-secondary">
                      Additional Details
                      <textarea
                        className="input-dark min-h-[180px] resize-y"
                        placeholder="Tell us about your pace, style, preferences, or anything important we should know"
                        value={formData.additionalDetails}
                        onChange={(event) =>
                          setFormData({ ...formData, additionalDetails: event.target.value })
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3">
                  <button className="btn-primary" disabled={submitting} type="submit">
                    {submitting ? 'Sending...' : 'Start Planning'}
                  </button>
                  <p className="text-sm leading-7 text-text-muted">
                    We&apos;ll review your request and come back with a structured plan.
                  </p>
                  {error ? <p className="text-sm text-red-600">{error}</p> : null}
                </div>
              </form>
            )}
          </div>

          <aside className="grid gap-6 self-start">
            <div className="card-panel p-8">
              <p className="section-kicker mb-5">Direct Contact</p>
              <div className="space-y-4 text-base leading-8 text-text-secondary">
                <p>
                  <a href="mailto:info@mansa.travel" className="transition hover:text-text-primary">
                    info@mansa.travel
                  </a>
                </p>
                <p>
                  <a href="tel:+255779451655" className="transition hover:text-text-primary">
                    +255 779 451 655
                  </a>
                </p>
                <p>Zanzibar, Tanzania</p>
              </div>
            </div>

            <div className="card-panel p-8">
              <p className="section-kicker mb-5">WhatsApp</p>
              <p className="mb-6 text-base leading-8 text-text-secondary">
                Prefer a quicker conversation? Reach out directly.
              </p>
              <a href={whatsappHref} className="btn-secondary" target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
