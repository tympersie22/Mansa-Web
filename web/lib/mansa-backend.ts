import type { PlanningInquiryInput } from '@/lib/planning-inquiry';

export async function submitPlanningInquiry(input: PlanningInquiryInput) {
  const response = await fetch('/api/planning-inquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const payload = (await response.json().catch(() => null)) as { error?: string } | null;

  if (!response.ok) {
    throw new Error(payload?.error || 'Unable to submit inquiry.');
  }

  return { saved: true, mode: 'server' as const };
}
