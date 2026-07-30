import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { COMPANY_ID, requirePrismaAdminContext } from '../_lib';

export async function GET(req: Request) {
  const admin = await requirePrismaAdminContext();
  if ('error' in admin) return admin.error;
  const url = new URL(req.url);
  const query = url.searchParams.get('q')?.trim() || '';
  const records = await prisma.itinerary.findMany({
    where: { companyId: COMPANY_ID, ...(query ? { OR: [{ title: { contains: query, mode: 'insensitive' } }, { slug: { contains: query, mode: 'insensitive' } }] } : {}) },
    select: { id: true, slug: true, title: true, status: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  });
  return NextResponse.json({ ok: true, itineraries: records });
}
