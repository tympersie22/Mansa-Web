import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchPublishedItineraryBySlug } from '@/lib/itinerary-data';

export default async function ItineraryPage({ params }: { params: { slug: string } }) {
  const itinerary = await fetchPublishedItineraryBySlug(params.slug);
  if (!itinerary) notFound();
  const sortedDays = itinerary.days.slice().sort((a, b) => a.dayNumber - b.dayNumber);

  return (
    <div className="bg-[#f3f1ea]">
      <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_70px_rgba(38,56,51,0.12)]">
          <div className="grid gap-8 p-6 md:p-10">
            <div className="flex flex-col gap-6 text-[#2f4346] md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#dfe4df] bg-white text-xs font-semibold">
                  MANSA
                </div>
                <div className="space-y-1 text-sm leading-6">
                  {itinerary.contact.address.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="text-sm leading-6 md:text-right">
                <p>{itinerary.contact.phone}</p>
                <p>{itinerary.contact.email}</p>
                <p>{itinerary.contact.website}</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px]">
              <Image
                src={itinerary.heroImage}
                alt={itinerary.title}
                width={1600}
                height={900}
                className="h-[320px] w-full object-cover md:h-[430px]"
                priority
              />
            </div>

            <div className="text-center text-[#26404a]">
              <h1 className="font-heading text-4xl md:text-6xl">{itinerary.title}</h1>
              <p className="mt-3 text-xl font-semibold md:text-3xl">{itinerary.travelDates}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#8d7a43]">
                {itinerary.durationLabel} • {itinerary.groupLabel}
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[28px] bg-[#f6f4ee] p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8d7a43]">Trip Overview</p>
                <p className="mt-5 text-base leading-8 text-[#4f5c54]">{itinerary.overview}</p>
              </div>
              <div className="rounded-[28px] bg-[#f8faf7] p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#7d907f]">At a Glance</p>
                <ul className="mt-5 space-y-3">
                  {itinerary.travelersSummary.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#4f5c54]">
                      <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#fbb040]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              {sortedDays.map((day) => (
                <article key={day.id} className="grid gap-6 rounded-[30px] border border-[#e3e8df] p-5 md:p-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-[22px]">
                      <Image
                        src={day.heroImage}
                        alt={day.title}
                        width={1000}
                        height={1200}
                        className="h-[220px] w-full object-cover"
                      />
                    </div>

                    {day.stays?.length ? (
                      <div className="rounded-[24px] bg-[#f6f4ee] p-5 md:p-6">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#8d7a43]">Stay</p>
                        <div className="mt-4 space-y-3">
                          {day.stays.map((stay) => (
                            <div key={`${stay.name}-${stay.location}`} className="text-sm leading-7 text-[#4f5c54]">
                              <p className="font-semibold text-[#25362a]">{stay.name}</p>
                              <p>{stay.location}</p>
                              <p>{stay.nights} night{stay.nights > 1 ? 's' : ''}{stay.roomType ? ` • ${stay.roomType}` : ''}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {day.transfers?.length ? (
                      <div className="rounded-[24px] bg-[#f8faf7] p-5 md:p-6">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#7d907f]">Transfers</p>
                        <ul className="mt-4 space-y-2 text-sm leading-7 text-[#4f5c54]">
                          {day.transfers.map((transfer) => (
                            <li key={transfer}>{transfer}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {day.meals?.length ? (
                      <div className="rounded-[24px] bg-[#f8faf7] p-5 md:p-6">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#7d907f]">Meals</p>
                        <ul className="mt-4 space-y-2 text-sm leading-7 text-[#4f5c54]">
                          {day.meals.map((meal) => (
                            <li key={meal}>{meal}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {day.notes?.length ? (
                      <div className="rounded-[24px] bg-[#f6f4ee] p-5 md:p-6">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#8d7a43]">Notes</p>
                        <ul className="mt-4 space-y-3">
                          {day.notes.map((note) => (
                            <li key={note} className="flex items-start gap-3 text-sm leading-7 text-[#4f5c54]">
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
                      <h2 className="mt-2 text-3xl font-semibold text-[#223329] md:text-4xl">{day.title}</h2>
                      <div className="mt-3 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-[#728375]">
                        <span className="rounded-full bg-[#f6f4ee] px-3 py-1">{day.dateLabel}</span>
                        <span className="rounded-full bg-[#f8faf7] px-3 py-1">{day.location}</span>
                      </div>
                      <p className="mt-4 text-sm leading-8 text-[#526157] md:text-base">{day.summary}</p>
                    </div>

                    <div className="rounded-[24px] bg-[#f8faf7] p-5 md:p-6">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#7d907f]">Experience Flow</p>
                      <div className="mt-5 space-y-4">
                        {day.activities.map((activity) => (
                          <div key={`${activity.timeLabel}-${activity.title}`} className="grid gap-2 rounded-[18px] border border-[#dfe6dd] bg-white/70 p-4 md:grid-cols-[130px_minmax(0,1fr)]">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8d7a43]">
                              {activity.timeLabel || 'Planned'}
                            </p>
                            <div>
                              <p className="text-base font-semibold text-[#25362a]">{activity.title}</p>
                              <p className="mt-1 text-sm leading-7 text-[#526157]">{activity.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {itinerary.inclusions.map((group) => (
                <div key={group.title} className="rounded-[26px] bg-[#f8faf7] p-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#7d907f]">{group.title}</p>
                  <ul className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#4f5c54]">
                        <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#fbb040]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="rounded-[26px] bg-[#f6f4ee] p-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8d7a43]">Not Included</p>
                <ul className="mt-4 space-y-3">
                  {itinerary.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#4f5c54]">
                      <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#6d7d71]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-[28px] bg-[#23302b] p-6 text-white md:p-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#fbb040]">Important Notes</p>
              <ul className="mt-5 space-y-3">
                {itinerary.importantNotes.map((note) => (
                  <li key={note} className="flex items-start gap-3 text-sm leading-7 text-white/76">
                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#fbb040]" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/plan-your-trip" className="btn-primary">
                  Start Planning
                </Link>
                <a href={itinerary.contact.website} className="btn-secondary btn-secondary-inverse">
                  Contact MANSA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
