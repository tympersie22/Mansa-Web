'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Plus, Wand2 } from 'lucide-react';
import { supabaseAdminApi } from '@/lib/supabase-admin-api';
import {
  cloneItinerary,
  fetchPrimaryItinerary,
  type ItineraryDay,
  type ItineraryDocument,
  sampleItinerary,
} from '@/lib/itinerary-data';

function updateDay(days: ItineraryDay[], dayId: string, patch: Partial<ItineraryDay>) {
  return days.map((day) => (day.id === dayId ? { ...day, ...patch } : day));
}

function updateListAtIndex(items: string[], index: number, value: string) {
  return items.map((item, itemIndex) => (itemIndex === index ? value : item));
}

function updateInclusionGroupTitle(
  groups: ItineraryDocument['inclusions'],
  index: number,
  title: string
) {
  return groups.map((group, groupIndex) => (groupIndex === index ? { ...group, title } : group));
}

function parseList(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function serializeList(items?: string[]) {
  return (items || []).join('\n');
}

function updateLineBlock(
  setter: React.Dispatch<React.SetStateAction<ItineraryDocument>>,
  key: 'travelersSummary' | 'exclusions' | 'importantNotes',
  value: string
) {
  setter((current) => ({
    ...current,
    [key]: parseList(value),
  }));
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#7d907f]">{eyebrow}</p>
      <h2 className="mt-2 text-xl font-semibold text-[#243226]">{title}</h2>
      {description ? <p className="mt-2 text-sm leading-7 text-[#708072]">{description}</p> : null}
    </div>
  );
}

function FieldLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm text-[#5a6b5d]">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`rounded-xl border border-[#d6e0d5] bg-[#fafcf9] px-4 py-3 text-sm outline-none focus:border-[#b9cdb7] ${
        props.className || ''
      }`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-[120px] rounded-xl border border-[#d6e0d5] bg-[#fafcf9] px-4 py-3 text-sm leading-7 outline-none focus:border-[#b9cdb7] ${
        props.className || ''
      }`}
    />
  );
}

export default function ItinerariesPage() {
  const [itinerary, setItinerary] = useState<ItineraryDocument>(() => cloneItinerary(sampleItinerary));
  const [activeDayId, setActiveDayId] = useState(sampleItinerary.days[0]?.id || '');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    let active = true;

    fetchPrimaryItinerary()
      .then((data) => {
        if (!active || !data) return;
        setItinerary(cloneItinerary(data));
        setActiveDayId(data.days[0]?.id || '');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const activeDay = useMemo(
    () => itinerary.days.find((day) => day.id === activeDayId) || itinerary.days[0],
    [activeDayId, itinerary.days]
  );
  const sortedDays = useMemo(
    () => itinerary.days.slice().sort((a, b) => a.dayNumber - b.dayNumber),
    [itinerary.days]
  );
  const guestSiteUrl = useMemo(
    () =>
      (itinerary.contact.website || process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://mansa.travel').replace(
        /\/$/,
        ''
      ),
    [itinerary.contact.website]
  );

  const updateTripField = (field: keyof ItineraryDocument, value: string | boolean) => {
    setItinerary((current) => ({ ...current, [field]: value }));
  };

  const updateContactField = (field: keyof ItineraryDocument['contact'], value: string | string[]) => {
    setItinerary((current) => ({
      ...current,
      contact: {
        ...current.contact,
        [field]: value,
      },
    }));
  };

  const updateActiveDay = (patch: Partial<ItineraryDay>) => {
    if (!activeDay) return;
    setItinerary((current) => ({ ...current, days: updateDay(current.days, activeDay.id, patch) }));
  };

  const addDay = () => {
    const dayNumber = itinerary.days.length + 1;
    const newDay: ItineraryDay = {
      id: `day-${dayNumber}`,
      dayNumber,
      dateLabel: `Day ${dayNumber}`,
      title: 'New Itinerary Day',
      location: 'Zanzibar',
      summary: 'Add the core story of this day here.',
      heroImage: itinerary.heroImage,
      activities: [
        {
          title: 'New Activity',
          description: 'Describe the main experience, timing, or guest flow for this part of the day.',
        },
      ],
      stays: [],
      notes: [],
      meals: [],
      transfers: [],
    };

    setItinerary((current) => ({ ...current, days: [...current.days, newDay] }));
    setActiveDayId(newDay.id);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage('');

    const response = await supabaseAdminApi.saveItinerary(
      itinerary.slug,
      itinerary as unknown as Record<string, unknown>
    );
    if (response?.ok) {
      setSaveMessage(
        response.published
          ? 'Saved and available for the guest-facing itinerary page.'
          : 'Saved.'
      );
    } else {
      setSaveMessage(
        'Unable to save itinerary. Check Supabase service role configuration and admin auth.'
      );
    }

    setSaving(false);
  };

  return (
    <div className="mx-auto max-w-[1560px]">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#7d907f]">Travel Design</p>
          <h1 className="mt-2 text-[38px] font-semibold leading-none text-[#1f2d23]">
            Itinerary Builder
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#708072]">
            Build the guest-facing itinerary from one structured workspace: trip setup, highlights,
            inclusions, day flow, and live preview.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#8b9a8d]">
            {loading
              ? 'Loading itinerary data...'
              : 'Loaded from Supabase when available, with local fallback.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#24352a] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save to Supabase'}
          </button>
          <button
            type="button"
            onClick={addDay}
            className="inline-flex items-center gap-2 rounded-xl border border-[#d9e3d8] bg-white px-4 py-2.5 text-sm font-medium text-[#2f4232]"
          >
            <Plus className="h-4 w-4" />
            Add Day
          </button>
          <Link
            href={`${guestSiteUrl}/itineraries/${itinerary.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl bg-[#fbb040] px-4 py-2.5 text-sm font-semibold text-[#2b271f]"
          >
            View Guest Version
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {saveMessage ? (
        <div className="mb-4 rounded-2xl border border-[#dfe6dd] bg-[#f9fbf8] px-4 py-3 text-sm text-[#556559]">
          {saveMessage}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[520px_minmax(0,1fr)]">
        <section className="space-y-5">
          <div className="rounded-[24px] border border-[#dfe6dd] bg-white p-5 shadow-[0_8px_22px_rgba(39,53,43,0.06)]">
            <div className="mb-4 flex items-center gap-2 text-[#648067]">
              <Wand2 className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.18em]">Trip Setup</p>
            </div>
            <div className="grid gap-4">
              <FieldLabel label="Trip Title">
                <Input
                  value={itinerary.title}
                  onChange={(event) => updateTripField('title', event.target.value)}
                />
              </FieldLabel>
              <div className="grid gap-4 md:grid-cols-2">
                <FieldLabel label="Travel Dates">
                  <Input
                    value={itinerary.travelDates}
                    onChange={(event) => updateTripField('travelDates', event.target.value)}
                  />
                </FieldLabel>
                <FieldLabel label="Duration Label">
                  <Input
                    value={itinerary.durationLabel}
                    onChange={(event) => updateTripField('durationLabel', event.target.value)}
                  />
                </FieldLabel>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FieldLabel label="Group Label">
                  <Input
                    value={itinerary.groupLabel}
                    onChange={(event) => updateTripField('groupLabel', event.target.value)}
                  />
                </FieldLabel>
                <FieldLabel label="Itinerary Slug">
                  <Input
                    value={itinerary.slug}
                    onChange={(event) =>
                      updateTripField('slug', event.target.value.trim().toLowerCase())
                    }
                  />
                </FieldLabel>
              </div>
              <FieldLabel label="Hero Image URL">
                <Input
                  value={itinerary.heroImage}
                  onChange={(event) => updateTripField('heroImage', event.target.value)}
                />
              </FieldLabel>
              <FieldLabel label="Overview">
                <Textarea
                  className="min-h-[150px]"
                  value={itinerary.overview}
                  onChange={(event) => updateTripField('overview', event.target.value)}
                />
              </FieldLabel>
              <label className="flex items-center gap-3 text-sm text-[#5a6b5d]">
                <input
                  type="checkbox"
                  checked={!!itinerary.published}
                  onChange={(event) => updateTripField('published', event.target.checked)}
                />
                <span>Published on the guest-facing site</span>
              </label>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#dfe6dd] bg-white p-5 shadow-[0_8px_22px_rgba(39,53,43,0.06)]">
            <SectionTitle
              eyebrow="Contact"
              title="Guest-facing contact block"
              description="These details appear on the itinerary page and exported guest view."
            />
            <div className="mt-5 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FieldLabel label="Phone">
                  <Input
                    value={itinerary.contact.phone}
                    onChange={(event) => updateContactField('phone', event.target.value)}
                  />
                </FieldLabel>
                <FieldLabel label="Email">
                  <Input
                    value={itinerary.contact.email}
                    onChange={(event) => updateContactField('email', event.target.value)}
                  />
                </FieldLabel>
              </div>
              <FieldLabel label="Website">
                <Input
                  value={itinerary.contact.website}
                  onChange={(event) => updateContactField('website', event.target.value)}
                />
              </FieldLabel>
              <FieldLabel label="Address Lines">
                <Textarea
                  className="min-h-[110px]"
                  value={serializeList(itinerary.contact.address)}
                  onChange={(event) => updateContactField('address', parseList(event.target.value))}
                />
              </FieldLabel>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#dfe6dd] bg-white p-5 shadow-[0_8px_22px_rgba(39,53,43,0.06)]">
            <SectionTitle
              eyebrow="Highlights"
              title="Journey summary blocks"
              description="One line per entry. These populate the guest-facing highlight and notes areas."
            />
            <div className="mt-5 grid gap-4">
              <FieldLabel label="Journey Highlights">
                <Textarea
                  className="min-h-[140px]"
                  value={serializeList(itinerary.travelersSummary)}
                  onChange={(event) =>
                    updateLineBlock(setItinerary, 'travelersSummary', event.target.value)
                  }
                />
              </FieldLabel>
              <FieldLabel label="Important Notes">
                <Textarea
                  className="min-h-[140px]"
                  value={serializeList(itinerary.importantNotes)}
                  onChange={(event) =>
                    updateLineBlock(setItinerary, 'importantNotes', event.target.value)
                  }
                />
              </FieldLabel>
              <FieldLabel label="Exclusions">
                <Textarea
                  className="min-h-[120px]"
                  value={serializeList(itinerary.exclusions)}
                  onChange={(event) =>
                    updateLineBlock(setItinerary, 'exclusions', event.target.value)
                  }
                />
              </FieldLabel>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#dfe6dd] bg-white p-5 shadow-[0_8px_22px_rgba(39,53,43,0.06)]">
            <SectionTitle
              eyebrow="Inclusions"
              title="Inclusion groups"
              description="Use one line per inclusion item. Group titles stay editable."
            />
            <div className="mt-5 space-y-4">
              {itinerary.inclusions.map((group, groupIndex) => (
                <div key={`${group.title}-${groupIndex}`} className="rounded-2xl border border-[#e3e9e1] bg-[#fafcf9] p-4">
                  <FieldLabel label="Group Title">
                    <Input
                      value={group.title}
                      onChange={(event) =>
                        setItinerary((current) => ({
                          ...current,
                          inclusions: updateInclusionGroupTitle(
                            current.inclusions,
                            groupIndex,
                            event.target.value
                          ),
                        }))
                      }
                    />
                  </FieldLabel>
                  <div className="mt-4">
                    <FieldLabel label="Items">
                      <Textarea
                        className="min-h-[120px]"
                        value={serializeList(group.items)}
                        onChange={(event) =>
                          setItinerary((current) => ({
                            ...current,
                            inclusions: current.inclusions.map((entry, entryIndex) =>
                              entryIndex === groupIndex
                                ? { ...entry, items: parseList(event.target.value) }
                                : entry
                            ),
                          }))
                        }
                      />
                    </FieldLabel>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-[#dfe6dd] bg-white p-5 shadow-[0_8px_22px_rgba(39,53,43,0.06)]">
            <SectionTitle
              eyebrow="Day Structure"
              title="Day navigator"
              description="Choose the active day to edit its story, activities, stay, meals, and notes."
            />
            <div className="mt-5 space-y-2">
              {itinerary.days.map((day) => (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => setActiveDayId(day.id)}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                    day.id === activeDay?.id
                      ? 'border-[#f1c167] bg-[#fff8e8]'
                      : 'border-[#dfe6dd] bg-[#fafcf9]'
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8d7a43]">
                    Day {day.dayNumber}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[#243226]">{day.title}</h3>
                  <p className="mt-1 text-sm text-[#66776a]">
                    {day.dateLabel} • {day.location}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {activeDay ? (
            <div className="rounded-[24px] border border-[#dfe6dd] bg-white p-5 shadow-[0_8px_22px_rgba(39,53,43,0.06)]">
              <SectionTitle
                eyebrow={`Day ${activeDay.dayNumber}`}
                title="Active day editor"
                description="Edit the current day as it will appear to the guest."
              />
              <div className="mt-5 grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldLabel label="Day Title">
                    <Input
                      value={activeDay.title}
                      onChange={(event) => updateActiveDay({ title: event.target.value })}
                    />
                  </FieldLabel>
                  <FieldLabel label="Location">
                    <Input
                      value={activeDay.location}
                      onChange={(event) => updateActiveDay({ location: event.target.value })}
                    />
                  </FieldLabel>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldLabel label="Date Label">
                    <Input
                      value={activeDay.dateLabel}
                      onChange={(event) => updateActiveDay({ dateLabel: event.target.value })}
                    />
                  </FieldLabel>
                  <FieldLabel label="Hero Image URL">
                    <Input
                      value={activeDay.heroImage}
                      onChange={(event) => updateActiveDay({ heroImage: event.target.value })}
                    />
                  </FieldLabel>
                </div>
                <FieldLabel label="Day Summary">
                  <Textarea
                    className="min-h-[140px]"
                    value={activeDay.summary}
                    onChange={(event) => updateActiveDay({ summary: event.target.value })}
                  />
                </FieldLabel>
                <FieldLabel label="Activities">
                  <Textarea
                    className="min-h-[220px]"
                    value={activeDay.activities
                      .map(
                        (activity) =>
                          `${activity.timeLabel || 'Planned'} | ${activity.title} | ${activity.description}`
                      )
                      .join('\n')}
                    onChange={(event) =>
                      updateActiveDay({
                        activities: parseList(event.target.value).map((line) => {
                          const [timeLabel, title, ...descriptionParts] = line.split('|');
                          return {
                            timeLabel: timeLabel?.trim() || undefined,
                            title: title?.trim() || 'Activity',
                            description: descriptionParts.join('|').trim() || 'Add activity details.',
                          };
                        }),
                      })
                    }
                  />
                </FieldLabel>
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldLabel label="Meals">
                    <Textarea
                      className="min-h-[120px]"
                      value={serializeList(activeDay.meals)}
                      onChange={(event) => updateActiveDay({ meals: parseList(event.target.value) })}
                    />
                  </FieldLabel>
                  <FieldLabel label="Transfers">
                    <Textarea
                      className="min-h-[120px]"
                      value={serializeList(activeDay.transfers)}
                      onChange={(event) =>
                        updateActiveDay({ transfers: parseList(event.target.value) })
                      }
                    />
                  </FieldLabel>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldLabel label="Notes">
                    <Textarea
                      className="min-h-[120px]"
                      value={serializeList(activeDay.notes)}
                      onChange={(event) => updateActiveDay({ notes: parseList(event.target.value) })}
                    />
                  </FieldLabel>
                  <FieldLabel label="Stays">
                    <Textarea
                      className="min-h-[120px]"
                      value={(activeDay.stays || [])
                        .map(
                          (stay) =>
                            `${stay.name} | ${stay.location} | ${stay.nights} | ${stay.roomType || ''}`
                        )
                        .join('\n')}
                      onChange={(event) =>
                        updateActiveDay({
                          stays: parseList(event.target.value).map((line) => {
                            const [name, location, nights, roomType] = line.split('|');
                            return {
                              name: name?.trim() || 'Stay',
                              location: location?.trim() || '',
                              nights: Number.parseInt((nights || '1').trim(), 10) || 1,
                              roomType: roomType?.trim() || undefined,
                            };
                          }),
                        })
                      }
                    />
                  </FieldLabel>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className="rounded-[32px] border border-[#dfe6dd] bg-white p-5 shadow-[0_10px_28px_rgba(39,53,43,0.08)] md:p-8">
          <div className="overflow-hidden rounded-[28px] border border-[#e3e8df] bg-[#fcfcfa]">
            <div className="grid gap-6 p-6 md:p-8">
              <div className="flex items-start justify-between gap-6 text-[#34484b]">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#dfe4df] bg-white text-sm font-semibold">
                    MANSA
                  </div>
                  <div className="space-y-1 text-sm leading-6">
                    {itinerary.contact.address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
                <div className="text-right text-sm leading-6">
                  <p>{itinerary.contact.phone}</p>
                  <p>{itinerary.contact.email}</p>
                  <p>{itinerary.contact.website}</p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[24px]">
                <Image
                  src={itinerary.heroImage}
                  alt={itinerary.title}
                  width={1600}
                  height={900}
                  className="h-[340px] w-full object-cover"
                />
              </div>

              <div className="text-center text-[#26404a]">
                <h2 className="font-heading text-5xl">{itinerary.title}</h2>
                <p className="mt-3 text-2xl font-semibold">{itinerary.travelDates}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.22em] text-[#84764d]">
                  {itinerary.durationLabel} • {itinerary.groupLabel}
                </p>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[24px] bg-[#f6f4ee] p-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8d7a43]">Overview</p>
                  <p className="mt-4 text-sm leading-7 text-[#4f5c54]">{itinerary.overview}</p>
                </div>
                <div className="rounded-[24px] bg-[#f8faf7] p-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#7d907f]">
                    Journey Highlights
                  </p>
                  <ul className="mt-4 space-y-3">
                    {itinerary.travelersSummary.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-7 text-[#4f5c54]"
                      >
                        <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#fbb040]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-5 xl:grid-cols-3">
                {itinerary.inclusions.map((group) => (
                  <div key={group.title} className="rounded-[22px] bg-[#f8faf7] p-5">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#7d907f]">
                      {group.title}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm leading-7 text-[#4f5c54]">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                {itinerary.exclusions.length ? (
                  <div className="rounded-[22px] bg-[#f6f4ee] p-5">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#8d7a43]">
                      Exclusions
                    </p>
                    <ul className="mt-4 space-y-2 text-sm leading-7 text-[#4f5c54]">
                      {itinerary.exclusions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="space-y-5">
                {sortedDays.map((day) => (
                  <article
                    key={day.id}
                    className="grid gap-5 rounded-[28px] border border-[#e3e8df] p-5 xl:grid-cols-[220px_minmax(0,1fr)] xl:p-6"
                  >
                    <div className="space-y-4 self-start">
                      <div className="relative overflow-hidden rounded-[20px]">
                        <Image
                          src={day.heroImage}
                          alt={day.title}
                          width={900}
                          height={1100}
                          className="h-[170px] w-full object-cover lg:h-[200px]"
                        />
                      </div>

                      {day.stays?.length ? (
                        <div className="rounded-[22px] bg-[#f6f4ee] p-5">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8d7a43]">
                            Stay
                          </p>
                          <div className="mt-3 space-y-3">
                            {day.stays.map((stay) => (
                              <div
                                key={`${stay.name}-${stay.location}`}
                                className="text-sm leading-7 text-[#4f5c54]"
                              >
                                <p className="font-semibold text-[#25362a]">{stay.name}</p>
                                <p>{stay.location}</p>
                                <p>
                                  {stay.nights} night{stay.nights > 1 ? 's' : ''}
                                  {stay.roomType ? ` • ${stay.roomType}` : ''}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {day.transfers?.length ? (
                        <div className="rounded-[22px] bg-[#f8faf7] p-5">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#7d907f]">
                            Transfers
                          </p>
                          <ul className="mt-3 space-y-2 text-sm leading-7 text-[#4f5c54]">
                            {day.transfers.map((transfer) => (
                              <li key={transfer}>{transfer}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {day.meals?.length ? (
                        <div className="rounded-[22px] bg-[#f8faf7] p-5">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#7d907f]">
                            Meals
                          </p>
                          <ul className="mt-3 space-y-2 text-sm leading-7 text-[#4f5c54]">
                            {day.meals.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {day.notes?.length ? (
                        <div className="rounded-[22px] bg-[#f6f4ee] p-5">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8d7a43]">
                            Notes
                          </p>
                          <ul className="mt-3 space-y-2 text-sm leading-7 text-[#4f5c54]">
                            {day.notes.map((note) => (
                              <li key={note} className="flex items-start gap-3">
                                <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#8d7a43]" />
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                    <div className="space-y-5">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#8d7a43]">
                          Day {day.dayNumber}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-[#223329] lg:text-[2rem]">
                          {day.title}
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-[#6d7d71]">
                          <span className="rounded-full bg-[#f6f4ee] px-3 py-1">{day.dateLabel}</span>
                          <span className="rounded-full bg-[#f8faf7] px-3 py-1">{day.location}</span>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-[#526157]">{day.summary}</p>
                      </div>

                      <div className="rounded-[22px] bg-[#f8faf7] p-5">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#7d907f]">
                          Experience Flow
                        </p>
                        <div className="mt-4 space-y-4">
                          {day.activities.map((activity) => (
                            <div
                              key={`${activity.timeLabel}-${activity.title}`}
                              className="rounded-[18px] border border-[#dfe6dd] bg-white/70 p-4"
                            >
                              <div className="inline-flex rounded-full bg-[#f6f4ee] px-3 py-1.5">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8d7a43]">
                                  {activity.timeLabel || 'Planned'}
                                </p>
                              </div>
                              <div className="min-w-0">
                                <p className="mt-3 break-words text-base font-semibold leading-6 text-[#25362a]">
                                  {activity.title}
                                </p>
                                <p className="mt-2 break-words text-sm leading-7 text-[#526157]">
                                  {activity.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
