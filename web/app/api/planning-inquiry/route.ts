import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { JourneyItem } from '@/lib/experience-data';
import {
  buildInquiryMessage,
  buildPlanningInquiryEmailText,
  type PlanningInquiryInput,
} from '@/lib/planning-inquiry';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail =
  process.env.RESEND_FROM_EMAIL || 'Mansa Travel <onboarding@resend.dev>';
const planningRecipient = 'info@mansa.travel';

const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

function normalizeJourneyItems(value: unknown): JourneyItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is JourneyItem =>
      !!item &&
      typeof item === 'object' &&
      typeof (item as JourneyItem).slug === 'string' &&
      typeof (item as JourneyItem).title === 'string' &&
      typeof (item as JourneyItem).category === 'string' &&
      typeof (item as JourneyItem).duration === 'string'
  );
}

async function createJourneySnapshot(input: PlanningInquiryInput) {
  if (!supabase || !input.sessionId || !input.visitorToken) return null;

  const { data: journey, error: journeyError } = await supabase
    .from('journeys')
    .insert({
      session_id: input.sessionId,
      visitor_token: input.visitorToken,
      notes: input.selectedExperiences.length
        ? `Selected experiences: ${input.selectedExperiences.map((item) => item.title).join(', ')}`
        : null,
    })
    .select('id')
    .single();

  if (journeyError || !journey) {
    throw new Error(journeyError?.message || 'Unable to create journey.');
  }

  if (input.selectedExperiences.length) {
    const { data: experiences, error: experiencesError } = await supabase
      .from('experiences')
      .select('id, slug')
      .in(
        'slug',
        input.selectedExperiences.map((item) => item.slug)
      );

    if (experiencesError) {
      throw new Error(experiencesError.message);
    }

    const slugToId = new Map(
      (experiences || []).map((item) => [item.slug as string, item.id as string])
    );
    const journeyItems = input.selectedExperiences
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

async function storeInquiry(input: PlanningInquiryInput) {
  if (!supabase) return;

  const journeyId = await createJourneySnapshot(input);
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
}

async function sendInquiryEmail(input: PlanningInquiryInput) {
  if (!resendApiKey) {
    throw new Error('Email sending is not configured. Add RESEND_API_KEY to Vercel.');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: resendFromEmail,
      to: [planningRecipient],
      reply_to: input.email,
      subject: `Plan Your Trip inquiry from ${input.fullName}`,
      text: buildPlanningInquiryEmailText(input),
    }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { message?: string; error?: string }
      | null;
    throw new Error(payload?.message || payload?.error || 'Unable to send inquiry email.');
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<PlanningInquiryInput>;

    const input: PlanningInquiryInput = {
      fullName: typeof body.fullName === 'string' ? body.fullName.trim() : '',
      email: typeof body.email === 'string' ? body.email.trim() : '',
      phoneWhatsapp:
        typeof body.phoneWhatsapp === 'string' ? body.phoneWhatsapp.trim() : undefined,
      travelWindow: typeof body.travelWindow === 'string' ? body.travelWindow.trim() : undefined,
      isDateFlexible: !!body.isDateFlexible,
      guestCount:
        typeof body.guestCount === 'number'
          ? body.guestCount
          : Number.parseInt(String(body.guestCount || '1'), 10) || 1,
      interests: typeof body.interests === 'string' ? body.interests.trim() : undefined,
      message: typeof body.message === 'string' ? body.message.trim() : undefined,
      sourcePage: typeof body.sourcePage === 'string' ? body.sourcePage : '/plan-your-trip',
      selectedExperiences: normalizeJourneyItems(body.selectedExperiences),
      sessionId: typeof body.sessionId === 'string' ? body.sessionId : undefined,
      visitorToken: typeof body.visitorToken === 'string' ? body.visitorToken : undefined,
    };

    if (!input.fullName || !input.email || !input.travelWindow) {
      return NextResponse.json(
        { error: 'Full name, email address, and travel dates are required.' },
        { status: 400 }
      );
    }

    await storeInquiry(input);
    await sendInquiryEmail(input);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Unable to process planning inquiry right now.',
      },
      { status: 500 }
    );
  }
}
