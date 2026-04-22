import { Clock3 } from 'lucide-react';
import type { ExperienceTimelineItem as ExperienceTimelineItemType } from '@/lib/experience-data';

interface ExperienceTimelineItemProps {
  item: ExperienceTimelineItemType;
  index: number;
}

export default function ExperienceTimelineItem({ item, index }: ExperienceTimelineItemProps) {
  return (
    <div className="grid gap-4 rounded-[1.35rem] border border-[#e7e1d2] bg-[#fcfaf4] p-5 md:grid-cols-[120px_minmax(0,1fr)] md:p-6">
      <div className="flex items-center gap-3 md:block">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e3b6] text-[#7f6322] md:mb-3">
          <Clock3 className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#8f7a4c]">Stop {index + 1}</p>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-[#7f6322]">
            {item.label}
          </p>
        </div>
      </div>
      <div className="min-w-0">
        <h4 className="text-lg font-semibold text-[#20352c]">{item.title}</h4>
        <p className="mt-2 text-sm leading-7 text-[#55675e] md:text-base">{item.description}</p>
      </div>
    </div>
  );
}
