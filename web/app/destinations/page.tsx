'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/mansa/Reveal';
import {
  getDestinationHref,
  mainlandDestinations,
  mainlandMapZones,
  type MapZone,
  zanzibarDestinations,
  zanzibarMapZones,
} from '@/lib/destination-data';
import { contactHref } from '@/lib/site-config';

type MapMode = 'zanzibar' | 'mainland';

type ZoneGroup = {
  key: string;
  title: string;
  href: string;
  items: {
    label: string;
    tooltip: string;
  }[];
};

function groupZones(mode: MapMode, zones: MapZone[]): ZoneGroup[] {
  const destinationList = mode === 'zanzibar' ? zanzibarDestinations : mainlandDestinations;
  const grouped = new Map<string, ZoneGroup>();

  for (const zone of zones) {
    const key = zone.group || zone.slug;
    const title = zone.group || zone.label;
    const destination = destinationList.find((item) => item.slug === zone.slug);
    if (!destination) continue;

    if (!grouped.has(key)) {
      grouped.set(key, {
        key,
        title,
        href: getDestinationHref(destination),
        items: [],
      });
    }

    grouped.get(key)!.items.push({
      label: zone.label,
      tooltip: zone.tooltip,
    });
  }

  return Array.from(grouped.values());
}

function DestinationMap({
  mode,
  zones,
}: {
  mode: MapMode;
  zones: MapZone[];
}) {
  const destinationList = mode === 'zanzibar' ? zanzibarDestinations : mainlandDestinations;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-surface-border bg-white/70 p-4 shadow-[0_14px_36px_rgba(56,56,54,0.06)] md:p-6">
      {mode === 'zanzibar' ? (
        <div className="relative mx-auto aspect-[542/774] w-full max-w-[542px] overflow-hidden rounded-[1.7rem] bg-[#2f302d]">
          <Image
            src="/maps/zanzibar-map-reference.png"
            alt="Mansa branded Zanzibar destination map"
            fill
            sizes="(max-width: 768px) 100vw, 542px"
            className="object-contain"
          />
          {zones.map((zone) => (
            <Link
              key={`${mode}-${zone.label}`}
              href={getDestinationHref(destinationList.find((destination) => destination.slug === zone.slug)!)}
              title={zone.tooltip}
              className="absolute flex items-center justify-center rounded-[1rem] border border-[#fbb040] bg-[rgba(251,176,64,0.18)] text-center text-[10px] font-bold uppercase tracking-[0.12em] text-[#383836] transition duration-200 hover:bg-[rgba(251,176,64,0.32)]"
              style={{
                left: `${(zone.x / 360) * 100}%`,
                top: `${(zone.y / 360) * 100}%`,
                width: `${(zone.w / 360) * 100}%`,
                height: `${(zone.h / 360) * 100}%`,
              }}
            >
              <span className="px-1">{zone.label}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="relative mx-auto aspect-[1.08] w-full max-w-[720px] rounded-[1.7rem] bg-[#efe7d7]">
          <svg viewBox="0 0 360 360" className="h-full w-full">
            <g>
              <path
                d="M114 16C173 8 232 28 267 68C298 103 307 151 293 201C280 248 249 289 198 322C154 350 101 354 63 324C26 295 13 243 19 193C25 149 37 108 61 74C77 51 91 27 114 16Z"
                fill="#d8cdb7"
                stroke="#8e836d"
                strokeWidth="3"
              />
              <path
                d="M310 256C325 255 337 262 344 276C350 289 349 305 341 317C333 328 320 333 306 330C292 327 282 318 278 305C274 291 278 277 289 267C295 261 302 257 310 256Z"
                fill="#d8cdb7"
                stroke="#8e836d"
                strokeWidth="3"
              />
            </g>

            {zones.map((zone) => {
              const destination = destinationList.find((item) => item.slug === zone.slug);
              if (!destination) return null;

              return (
              <Link key={`${mode}-${zone.label}`} href={getDestinationHref(destination)}>
                <g className="cursor-pointer">
                  <rect
                    x={zone.x}
                    y={zone.y}
                    width={zone.w}
                    height={zone.h}
                    rx="14"
                    fill="rgba(251,176,64,0.18)"
                    stroke="#fbb040"
                    strokeWidth="2"
                    className="transition duration-200 hover:fill-[rgba(251,176,64,0.32)]"
                  />
                  <text
                    x={zone.x + zone.w / 2}
                    y={zone.y + zone.h / 2 + 2}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#383836"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}
                  >
                    {zone.label}
                  </text>
                  <title>{zone.tooltip}</title>
                </g>
              </Link>
            );
            })}
          </svg>
        </div>
      )}
    </div>
  );
}

export default function DestinationsPage() {
  const [activeMap, setActiveMap] = useState<MapMode>('zanzibar');

  const activeZones = useMemo(
    () => (activeMap === 'zanzibar' ? zanzibarMapZones : mainlandMapZones),
    [activeMap]
  );
  const activeZoneGroups = useMemo(() => groupZones(activeMap, activeZones), [activeMap, activeZones]);

  return (
    <div className="bg-surface">
      <section className="relative flex min-h-[68vh] items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80"
          alt="Zanzibar and Tanzania destination planning"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.24),rgba(18,18,17,0.84))]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-36 text-white lg:px-8 lg:pb-20">
          <p className="section-kicker mb-6 text-accent">Destinations</p>
          <h1 className="max-w-4xl font-heading text-5xl leading-[1.05] md:text-7xl">
            Destinations
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
            Explore Zanzibar and mainland Tanzania through regions that shape how your journey is
            experienced.
          </p>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <a
                href="#zanzibar-section"
                onMouseEnter={() => setActiveMap('zanzibar')}
                className="group block overflow-hidden rounded-[1.9rem]"
              >
                <div className="relative min-h-[360px]">
                  <Image
                    src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80"
                    alt="Zanzibar coastline"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.18),rgba(18,18,17,0.82))]" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-10">
                    <p className="mb-4 h-px w-16 bg-accent transition-all duration-300 group-hover:w-24" />
                    <h2 className="font-heading text-4xl">Zanzibar</h2>
                    <p className="mt-4 max-w-md text-base leading-8 text-white/76">
                      Island-based journeys shaped by coastline, culture, and pace.
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href="#mainland-section"
                onMouseEnter={() => setActiveMap('mainland')}
                className="group block overflow-hidden rounded-[1.9rem]"
              >
                <div className="relative min-h-[360px]">
                  <Image
                    src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=80"
                    alt="Mainland Tanzania landscape"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,17,0.18),rgba(18,18,17,0.82))]" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-10">
                    <p className="mb-4 h-px w-16 bg-accent transition-all duration-300 group-hover:w-24" />
                    <h2 className="font-heading text-4xl">Mainland Tanzania</h2>
                    <p className="mt-4 max-w-md text-base leading-8 text-white/76">
                      Wildlife, landscapes, and safari experiences across national parks.
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-5 text-center">
              <p className="section-kicker mx-auto mb-1">Interactive Map</p>
              <h2 className="font-heading text-3xl text-text-primary md:text-5xl">
                Explore regions by how they shape the journey
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 flex justify-center">
            <div className="inline-flex rounded-full border border-surface-dark/12 bg-white/70 p-1">
              {(['zanzibar', 'mainland'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setActiveMap(mode)}
                  className={`rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] transition ${
                    activeMap === mode
                      ? 'bg-surface-dark text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {mode === 'zanzibar' ? 'Zanzibar' : 'Mainland Tanzania'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Reveal delay={0.08}>
              <DestinationMap mode={activeMap} zones={activeZones} />
            </Reveal>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {activeZoneGroups.map((group, index) => (
              <Reveal key={group.key} delay={0.12 + index * 0.04}>
                <Link
                  href={group.href}
                  className="rounded-[1.5rem] border border-surface-border bg-white/80 p-5 shadow-[0_12px_28px_rgba(56,56,54,0.05)] transition hover:-translate-y-0.5 hover:border-accent/50"
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
                    {activeMap === 'zanzibar' && group.title === 'North Coast' ? 'Region' : 'Destination'}
                  </p>
                  <h3 className="mt-3 font-heading text-2xl text-text-primary">{group.title}</h3>
                  <div className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <div key={`${group.key}-${item.label}`} className="rounded-[1rem] bg-surface-lighter px-4 py-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-text-primary">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-text-secondary">{item.tooltip}</p>
                      </div>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="zanzibar-section" className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="section-kicker mb-5">Zanzibar</p>
              <h2 className="font-heading text-3xl text-text-primary md:text-5xl">Zanzibar</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {zanzibarDestinations.map((destination, index) => (
              <Reveal key={destination.slug} delay={index * 0.05}>
                <Link href={getDestinationHref(destination)} className="card-panel block overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={destination.heroImage}
                      alt={destination.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-2xl text-text-primary">{destination.title}</h3>
                    <p className="mt-4 text-base leading-8 text-text-secondary">
                      {destination.shortDescription}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="mainland-section" className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="section-kicker mb-5">Mainland Tanzania</p>
              <h2 className="font-heading text-3xl text-text-primary md:text-5xl">
                Mainland Tanzania
              </h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mainlandDestinations.map((destination, index) => (
              <Reveal key={destination.slug} delay={index * 0.05}>
                <Link href={getDestinationHref(destination)} className="card-panel block overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={destination.heroImage}
                      alt={destination.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-2xl text-text-primary">{destination.title}</h3>
                    <p className="mt-4 text-base leading-8 text-text-secondary">
                      {destination.shortDescription}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <p className="font-heading text-2xl leading-relaxed text-text-primary md:text-3xl">
              Each destination offers a different pace, setting, and experience. Your journey can
              be shaped around a single area or combine multiple regions, depending on how you want
              to travel.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-dark py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-5xl">Start Planning Your Journey</h2>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              We’ll help you choose the right locations and bring everything together into a
              seamless plan.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/plan-your-trip" className="btn-primary">
                Plan Your Trip
              </Link>
              <a
                href={contactHref.whatsapp}
                className="btn-secondary btn-secondary-inverse"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
