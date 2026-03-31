'use client';

import type { JourneyItem } from '@/lib/experience-data';

const STORAGE_KEY = 'mansa-journey';
const EVENT_NAME = 'mansa-journey-updated';

export function readJourney(): JourneyItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as JourneyItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeJourney(items: JourneyItem[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function addJourneyItem(item: JourneyItem) {
  const current = readJourney();
  if (current.some((entry) => entry.slug === item.slug)) return false;
  writeJourney([...current, item]);
  return true;
}

export function removeJourneyItem(slug: string) {
  writeJourney(readJourney().filter((item) => item.slug !== slug));
}

export function clearJourney() {
  writeJourney([]);
}

export function subscribeJourney(callback: () => void) {
  if (typeof window === 'undefined') return () => {};

  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener('storage', callback);
  };
}
