import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { COMPANY_ID, requirePrismaAdminContext } from '../_lib';

export async function GET(req: Request) {
  const admin = await requirePrismaAdminContext();
  if ('error' in admin) return admin.error;
  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get('page') || 1));
  const pageSize = Math.min(100, Math.max(10, Number(url.searchParams.get('pageSize') || 25)));
  const query = url.searchParams.get('q')?.trim() || '';
  const where = { companyId: COMPANY_ID, ...(query ? { OR: [{ action: { contains: query, mode: 'insensitive' as const } }, { entityType: { contains: query, mode: 'insensitive' as const } }, { entityId: { contains: query, mode: 'insensitive' as const } }] } : {}) };
  const [total, records] = await Promise.all([
    prisma.adminLog.count({ where }),
    prisma.adminLog.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * pageSize, take: pageSize }),
  ]);
  return NextResponse.json({ ok: true, records, pagination: { page, pageSize, total, pages: Math.max(1, Math.ceil(total / pageSize)) } });
}
