import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logAdminAction, requirePrismaAdminContext, COMPANY_ID } from '../../_lib';

function validateDocument(body: Record<string, unknown>) {
  const errors: string[] = [];
  if (!String(body.title || '').trim()) errors.push('Trip title is required');
  if (!String(body.slug || '').trim()) errors.push('Itinerary slug is required');
  if (!String(body.travelDates || '').trim()) errors.push('Travel dates are required');
  if (!String(body.overview || '').trim()) errors.push('Overview is required');
  if (!Array.isArray(body.days) || body.days.length === 0) errors.push('At least one itinerary day is required');
  const days = Array.isArray(body.days) ? body.days as Array<Record<string, unknown>> : [];
  const numbers = days.map((day) => Number(day.dayNumber));
  if (new Set(numbers).size !== numbers.length) errors.push('Day numbers must be unique');
  days.forEach((day, index) => {
    if (!String(day.title || '').trim()) errors.push(`Day ${index + 1} title is required`);
    if (!Array.isArray(day.activities) || day.activities.length === 0) errors.push(`Day ${index + 1} needs at least one activity`);
  });
  return errors;
}

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  const admin = await requirePrismaAdminContext();
  if ('error' in admin) return admin.error;
  const { slug } = await context.params;
  const record = await prisma.itinerary.findFirst({ where: { companyId: COMPANY_ID, slug } });
  if (!record) return NextResponse.json({ ok: false, error: 'Itinerary not found' }, { status: 404 });
  return NextResponse.json({ ok: true, itinerary: { ...(record.document as Record<string, unknown>), slug: record.slug, status: record.status, published: record.status === 'published', updatedAt: record.updatedAt } });
}

export async function PUT(req: Request, context: { params: Promise<{ slug: string }> }) {
  const admin = await requirePrismaAdminContext();
  if ('error' in admin) return admin.error;
  const { slug } = await context.params;
  const body = (await req.json()) as Record<string, unknown>;
  const errors = validateDocument(body);
  if (errors.length) return NextResponse.json({ ok: false, error: errors[0], errors }, { status: 400 });

  const normalizedSlug = String(slug || body.slug).trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '');
  const status = body.published === true ? 'published' : body.status === 'archived' ? 'archived' : 'draft';
  const document = { ...body, slug: normalizedSlug, published: status === 'published', status };
  const record = await prisma.itinerary.upsert({
    where: { companyId_slug: { companyId: COMPANY_ID, slug: normalizedSlug } },
    create: { companyId: COMPANY_ID, slug: normalizedSlug, title: String(body.title), status, document, createdBy: admin.user.id },
    update: { title: String(body.title), status, document },
  });
  await logAdminAction(null, 'itinerary.update', 'itinerary', record.id, admin.actor, { slug: normalizedSlug, status, dayCount: Array.isArray(body.days) ? body.days.length : 0, role: admin.role });
  return NextResponse.json({ ok: true, slug: normalizedSlug, published: status === 'published', status, updatedAt: record.updatedAt });
}
