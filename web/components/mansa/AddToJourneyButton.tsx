'use client';

import { useEffect, useState } from 'react';
import type { JourneyItem } from '@/lib/experience-data';
import { addJourneyItem, readJourney, subscribeJourney } from '@/lib/journey-storage';

interface AddToJourneyButtonProps {
  item: JourneyItem;
}

export default function AddToJourneyButton({ item }: AddToJourneyButtonProps) {
  const [added, setAdded] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    const sync = () => setAdded(readJourney().some((entry) => entry.slug === item.slug));
    sync();
    return subscribeJourney(sync);
  }, [item.slug]);

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={() => {
          const inserted = addJourneyItem(item);
          if (inserted) {
            setJustAdded(true);
            window.setTimeout(() => setJustAdded(false), 2200);
          }
        }}
        className="btn-primary"
      >
        {added ? 'Added to Your Journey' : 'Add to Your Journey'}
      </button>
      {justAdded ? <p className="text-sm text-white/76">Added to your journey.</p> : null}
    </div>
  );
}
