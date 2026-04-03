import { submitContactInquiry } from '@/lib/contact-service';
import type { JourneyItem } from '@/lib/experience-data';
import { getJourneySessionId, getJourneyVisitorToken } from '@/lib/journey-storage';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

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
}

function buildInquiryMessage(input: PlanningInquiryInput) {
  return [
    input.travelWindow ? `Travel window: ${input.travelWindow}` : null,
    input.interests ? `Interests: ${input.interests}` : null,
    input.selectedExperiences.length
      ? `Selected experiences: ${input.selectedExperiences.map((item) => item.title).join(', ')}`
      : 'Selected experiences: None selected',
    input.message ? `Notes: ${input.message}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

async function createJourneySnapshot(selectedExperiences: JourneyItem[]) {
  if (!supabase) return null;

  const { data: journey, error: journeyError } = await supabase
    .from('journeys')
    .insert({
      session_id: getJourneySessionId(),
      visitor_token: getJourneyVisitorToken(),
      notes: selectedExperiences.length
        ? `Selected experiences: ${selectedExperiences.map((item) => item.title).join(', ')}`
        : null,
    })
    .select('id')
    .single();

  if (journeyError || !journey) {
    throw new Error(journeyError?.message || 'Unable to create journey.');
  }

  if (selectedExperiences.length) {
    const { data: experiences, error: experiencesError } = await supabase
      .from('experiences')
      .select('id, slug')
      .in(
        'slug',
        selectedExperiences.map((item) => item.slug)
      );

    if (experiencesError) {
      throw new Error(experiencesError.message);
    }

    const slugToId = new Map((experiences || []).map((item) => [item.slug as string, item.id as string]));
    const journeyItems = selectedExperiences
      .map((item) => {
        const experienceId = slugToId.get(item.slug);
        if (!experienceId) return null;
        return {
          journey_id: journey.id as string,
          experience_id: experienceId,
        };
      })
      .filter(Boolean);

    if (journeyItems.length) {
      const { error: itemsError } = await supabase.from('journey_items').insert(journeyItems);
      if (itemsError) {
        throw new Error(itemsError.message);
      }
    }
  }

  return journey.id as string;
}

export async function submitPlanningInquiry(input: PlanningInquiryInput) {
  if (isSupabaseConfigured && supabase) {
    const journeyId = await createJourneySnapshot(input.selectedExperiences);
    const { error } = await supabase.from('planning_inquiries').insert({
      journey_id: journeyId,
      full_name: input.fullName,
      email: input.email,
      phone_whatsapp: input.phoneWhatsapp || null,
      is_date_flexible: !!input.isDateFlexible,
      guest_count: input.guestCount || 1,
      message: buildInquiryMessage(input),
      source_page: input.sourcePage || '/plan-your-trip',
      status: 'new',
    });

    if (error) {
      throw new Error(error.message);
    }

    return { saved: true, mode: 'supabase' as const };
  }

  return submitContactInquiry({
    name: input.fullName,
    email: input.email,
    subject: 'Plan Your Trip Inquiry',
    message: buildInquiryMessage(input),
  });
}
