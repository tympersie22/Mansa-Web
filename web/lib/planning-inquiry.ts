import type { JourneyItem } from '@/lib/experience-data';

export interface PlanningInquiryInput {
  fullName: string;
  email: string;
  phoneWhatsapp?: string;
  travelWindow?: string;
  isDateFlexible?: boolean;
  guestCount?: number;
  interests?: string;
  message?: string;
  sourcePage?: string;
  selectedExperiences: JourneyItem[];
  sessionId?: string;
  visitorToken?: string;
}

export function buildInquiryMessage(input: PlanningInquiryInput) {
  return [
    input.travelWindow ? `Travel window: ${input.travelWindow}` : null,
    input.isDateFlexible ? 'Travel dates are flexible' : null,
    input.guestCount ? `Guests: ${input.guestCount}` : null,
    input.interests ? `Your trip: ${input.interests}` : null,
    input.selectedExperiences.length
      ? `Selected experiences: ${input.selectedExperiences.map((item) => item.title).join(', ')}`
      : 'Selected experiences: None selected',
    input.message ? `Additional details: ${input.message}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildPlanningInquiryEmailText(input: PlanningInquiryInput) {
  return [
    'New Plan Your Trip inquiry',
    '',
    `Full Name: ${input.fullName}`,
    `Email Address: ${input.email}`,
    `Phone / WhatsApp: ${input.phoneWhatsapp || 'Not provided'}`,
    buildInquiryMessage(input),
    '',
    `Source Page: ${input.sourcePage || '/plan-your-trip'}`,
  ].join('\n');
}
