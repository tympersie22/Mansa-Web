'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Eye, FileEdit, Plus, Search, Wand2 } from 'lucide-react';
import { MediaUploadField } from '@/components/MediaUploadField';
import { adminApi } from '@/lib/admin-api';
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

function validateItinerary(document: ItineraryDocument) {
  const errors: string[] = [];
  if (!document.title.trim()) errors.push('Trip title is required.');
  if (!document.slug.trim()) errors.push('Itinerary slug is required.');
  if (!document.travelDates.trim()) errors.push('Travel dates are required.');
  if (!document.overview.trim()) errors.push('Overview is required.');
  if (!document.days.length) errors.push('Add at least one itinerary day.');
  const dayNumbers = document.days.map((day) => day.dayNumber);
  if (new Set(dayNumbers).size !== dayNumbers.length) errors.push('Day numbers must be unique.');
  document.days.forEach((day, index) => {
    if (!day.title.trim()) errors.push(`Day ${index + 1} needs a title.`);
    if (!day.activities.length) errors.push(`Day ${index + 1} needs at least one activity.`);
  });
  return errors;
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
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#a56f1b]">{eyebrow}</p>
      <h2 className="mt-2 text-xl font-semibold text-[#383836]">{title}</h2>
      {description ? <p className="mt-2 text-sm leading-7 text-[#716e68]">{description}</p> : null}
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
    <label className="grid gap-2 text-sm text-[#6b6964]">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`rounded-xl border border-[#ded8cf] bg-[#faf7f2] px-4 py-3 text-sm outline-none focus:border-[#fbb040] ${
        props.className || ''
      }`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-[120px] rounded-xl border border-[#ded8cf] bg-[#faf7f2] px-4 py-3 text-sm leading-7 outline-none focus:border-[#fbb040] ${
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
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [dirty, setDirty] = useState(false);
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
  const [itineraryQuery, setItineraryQuery] = useState('');
  const [itineraryIndex, setItineraryIndex] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    let active = true;

    const requestedSlug = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('slug') : null;
    const loadItinerary = requestedSlug
      ? fetch(`/api/admin/itineraries/${encodeURIComponent(requestedSlug)}`).then(async (response) => {
          const payload = await response.json();
          if (!response.ok || !payload.itinerary) throw new Error('Itinerary not found');
          return payload.itinerary as ItineraryDocument;
        })
      : fetchPrimaryItinerary();

    loadItinerary
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

  useEffect(() => {
    void adminApi.listItineraries().then((result) => {
      if (result.data?.itineraries) setItineraryIndex(result.data.itineraries);
    });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [dirty]);

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
      (process.env.NEXT_PUBLIC_WEBSITE_URL || itinerary.contact.website || 'http://localhost:3000').replace(
        /\/$/,
        ''
      ),
    [itinerary.contact.website]
  );

  const updateTripField = (field: keyof ItineraryDocument, value: string | boolean) => {
    setDirty(true);
    setItinerary((current) => ({ ...current, [field]: value }));
  };

  const updateContactField = (field: keyof ItineraryDocument['contact'], value: string | string[]) => {
    setDirty(true);
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
    setDirty(true);
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
    setDirty(true);
  };

  const handleSave = async () => {
    const errors = validateItinerary(itinerary);
    setValidationErrors(errors);
    if (errors.length) {
      setSaveMessage('Resolve the validation issues before saving.');
      return;
    }
    setSaving(true);
    setSaveMessage('');

    const response = await adminApi.saveItinerary(
      itinerary.slug,
      itinerary as unknown as Record<string, unknown>
    );
    if (response.data?.ok) {
      setSaveMessage(
        response.data.published
        ? `Saved as ${response.data.status}.`
          : 'Saved as draft.'
      );
      setDirty(false);
      setValidationErrors([]);
    } else {
      setSaveMessage(
        response.error || 'Unable to save itinerary. Check Prisma database configuration and admin auth.'
      );
    }

    setSaving(false);
  };

  return (
    <div className="mx-auto max-w-[1560px]">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#a56f1b]">Travel Design</p>
          <h1 className="mt-2 text-[38px] font-semibold leading-none text-[#383836]">
            Itinerary Builder
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#716e68]">
            Build the guest-facing itinerary from one structured workspace: trip setup, highlights,
            inclusions, day flow, and live preview.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#88837b]">
            {loading ? 'Loading itinerary data...' : dirty ? 'Draft changes not saved' : 'Prisma workspace'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#383836] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving ? 'Saving...' : itinerary.published ? 'Save & publish' : 'Save draft'}
          </button>
          <button
            type="button"
            onClick={addDay}
            className="inline-flex items-center gap-2 rounded-xl border border-[#ded8cf] bg-white px-4 py-2.5 text-sm font-medium text-[#383836]"
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
        <div className="mb-4 rounded-2xl border border-[#ded8cf] bg-[#faf7f2] px-4 py-3 text-sm text-[#6b6964]">
          {saveMessage}
        </div>
      ) : null}

      {validationErrors.length ? (
        <div role="alert" className="mb-4 rounded-2xl border border-[#ebcbc5] bg-[#fff7f5] px-4 py-3 text-sm text-[#a84739]">
          {validationErrors.join(' ')}
        </div>
      ) : null}

      <section className="mb-6 rounded-[24px] border border-[#ded8cf] bg-white p-4 shadow-[0_8px_22px_rgba(39,53,43,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Search className="h-4 w-4 text-[#88837b]" />
            <input
              value={itineraryQuery}
              onChange={(event) => setItineraryQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') void adminApi.listItineraries(itineraryQuery).then((result) => result.data?.itineraries && setItineraryIndex(result.data.itineraries));
              }}
              placeholder="Search itineraries by title or slug"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-[#f6f4ee] p-1">
            <button type="button" onClick={() => setViewMode('editor')} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${viewMode === 'editor' ? 'bg-white text-[#383836] shadow-sm' : 'text-[#88837b]'}`}><FileEdit className="h-3.5 w-3.5" />Editor</button>
            <button type="button" onClick={() => setViewMode('preview')} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${viewMode === 'preview' ? 'bg-white text-[#383836] shadow-sm' : 'text-[#88837b]'}`}><Eye className="h-3.5 w-3.5" />Preview</button>
          </div>
        </div>
        {itineraryIndex.length ? (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {itineraryIndex.map((entry) => (
              <button key={String(entry.id)} type="button" onClick={() => { if (dirty && !window.confirm('Discard unsaved changes?')) return; window.location.assign(`/itineraries?slug=${encodeURIComponent(String(entry.slug))}`); }} className="min-w-[220px] rounded-2xl border border-[#e5dfd6] bg-[#faf7f2] px-4 py-3 text-left hover:border-[#f1c167]">
                <p className="truncate text-sm font-semibold text-[#383836]">{String(entry.title)}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8d7a43]">{String(entry.status)}</p>
              </button>
            ))}
          </div>
        ) : <p className="mt-3 text-xs text-[#88837b]">No saved itineraries yet. Save this document to create the first Mansa OS record.</p>}
      </section>

      <div className="grid gap-6">
        <section className={viewMode === 'preview' ? 'hidden' : 'space-y-5'}>
          <div className="rounded-[24px] border border-[#ded8cf] bg-white p-5 shadow-[0_8px_22px_rgba(39,53,43,0.06)]">
            <div className="mb-4 flex items-center gap-2 text-[#a56f1b]">
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
              <MediaUploadField
                label="Hero Image"
                value={itinerary.heroImage}
                onChange={(value) => updateTripField('heroImage', value)}
              />
              <FieldLabel label="Overview">
                <Textarea
                  className="min-h-[150px]"
                  value={itinerary.overview}
                  onChange={(event) => updateTripField('overview', event.target.value)}
                />
              </FieldLabel>
              <label className="flex items-center gap-3 text-sm text-[#6b6964]">
                <input
                  type="checkbox"
                  checked={!!itinerary.published}
                  onChange={(event) => updateTripField('published', event.target.checked)}
                />
                <span>Published on the guest-facing site</span>
              </label>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#ded8cf] bg-white p-5 shadow-[0_8px_22px_rgba(39,53,43,0.06)]">
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

          <div className="rounded-[24px] border border-[#ded8cf] bg-white p-5 shadow-[0_8px_22px_rgba(39,53,43,0.06)]">
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

          <div className="rounded-[24px] border border-[#ded8cf] bg-white p-5 shadow-[0_8px_22px_rgba(39,53,43,0.06)]">
            <SectionTitle
              eyebrow="Inclusions"
              title="Inclusion groups"
              description="Use one line per inclusion item. Group titles stay editable."
            />
            <div className="mt-5 space-y-4">
              {itinerary.inclusions.map((group, groupIndex) => (
                <div key={`${group.title}-${groupIndex}`} className="rounded-2xl border border-[#e5dfd6] bg-[#faf7f2] p-4">
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

          <div className="rounded-[24px] border border-[#ded8cf] bg-white p-5 shadow-[0_8px_22px_rgba(39,53,43,0.06)]">
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
                      : 'border-[#ded8cf] bg-[#faf7f2]'
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8d7a43]">
                    Day {day.dayNumber}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[#383836]">{day.title}</h3>
                  <p className="mt-1 text-sm text-[#716e68]">
                    {day.dateLabel} • {day.location}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {activeDay ? (
            <div className="rounded-[24px] border border-[#ded8cf] bg-white p-5 shadow-[0_8px_22px_rgba(39,53,43,0.06)]">
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
                  <MediaUploadField
                    label="Hero Image"
                    value={activeDay.heroImage}
                    onChange={(value) => updateActiveDay({ heroImage: value })}
                  />
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

        <section className={viewMode === 'editor' ? 'hidden' : 'rounded-[32px] border border-[#ded8cf] bg-white p-5 shadow-[0_10px_28px_rgba(39,53,43,0.08)] md:p-8'}>
          <div className="overflow-hidden rounded-[28px] border border-[#e5dfd6] bg-[#fcfcfa]">
            <div className="grid gap-6 p-6 md:p-8">
              <div className="flex items-start justify-between gap-6 text-[#4b4a47]">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#ded8cf] bg-white text-sm font-semibold">
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
                  priority
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

              <div className="grid min-w-0 gap-6 lg:grid-cols-1 2xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="rounded-[24px] bg-[#f6f4ee] p-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8d7a43]">Overview</p>
                  <p className="mt-4 text-sm leading-7 text-[#6b6964]">{itinerary.overview}</p>
                </div>
                <div className="rounded-[24px] bg-[#faf7f2] p-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#a56f1b]">
                    Journey Highlights
                  </p>
                  <ul className="mt-4 space-y-3">
                    {itinerary.travelersSummary.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-7 text-[#6b6964]"
                      >
                        <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#fbb040]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid min-w-0 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                {itinerary.inclusions.map((group) => (
                  <div key={group.title} className="rounded-[22px] bg-[#faf7f2] p-5">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#a56f1b]">
                      {group.title}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm leading-7 text-[#6b6964]">
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
                    <ul className="mt-4 space-y-2 text-sm leading-7 text-[#6b6964]">
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
                    className="grid min-w-0 gap-5 rounded-[28px] border border-[#e5dfd6] p-5 lg:grid-cols-1 2xl:grid-cols-[220px_minmax(0,1fr)] 2xl:p-6"
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
                                className="text-sm leading-7 text-[#6b6964]"
                              >
                                <p className="font-semibold text-[#383836]">{stay.name}</p>
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
                        <div className="rounded-[22px] bg-[#faf7f2] p-5">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#a56f1b]">
                            Transfers
                          </p>
                          <ul className="mt-3 space-y-2 text-sm leading-7 text-[#6b6964]">
                            {day.transfers.map((transfer) => (
                              <li key={transfer}>{transfer}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {day.meals?.length ? (
                        <div className="rounded-[22px] bg-[#faf7f2] p-5">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#a56f1b]">
                            Meals
                          </p>
                          <ul className="mt-3 space-y-2 text-sm leading-7 text-[#6b6964]">
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
                          <ul className="mt-3 space-y-2 text-sm leading-7 text-[#6b6964]">
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
                        <h3 className="mt-2 text-2xl font-semibold text-[#383836] lg:text-[2rem]">
                          {day.title}
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-[#716e68]">
                          <span className="rounded-full bg-[#f6f4ee] px-3 py-1">{day.dateLabel}</span>
                          <span className="rounded-full bg-[#faf7f2] px-3 py-1">{day.location}</span>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-[#6b6964]">{day.summary}</p>
                      </div>

                      <div className="rounded-[22px] bg-[#faf7f2] p-5">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#a56f1b]">
                          Experience Flow
                        </p>
                        <div className="mt-4 space-y-4">
                          {day.activities.map((activity) => (
                            <div
                              key={`${activity.timeLabel}-${activity.title}`}
                              className="rounded-[18px] border border-[#ded8cf] bg-white/70 p-4"
                            >
                              <div className="inline-flex rounded-full bg-[#f6f4ee] px-3 py-1.5">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8d7a43]">
                                  {activity.timeLabel || 'Planned'}
                                </p>
                              </div>
                              <div className="min-w-0">
                                <p className="mt-3 break-words text-base font-semibold leading-6 text-[#383836]">
                                  {activity.title}
                                </p>
                                <p className="mt-2 break-words text-sm leading-7 text-[#6b6964]">
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
