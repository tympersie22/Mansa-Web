import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { COMPANY_ID, requirePrismaAdminContext } from '../_lib';

export async function GET() {
  const admin = await requirePrismaAdminContext();
  if ('error' in admin) return admin.error;
  const [customers, inquiries, suppliers, hotels, roomTypes, trips, tripDays, quotations, items] = await Promise.all([
    prisma.customer.findMany({ where: { companyId: COMPANY_ID }, select: { id: true, fullName: true }, orderBy: { fullName: 'asc' } }),
    prisma.planningInquiry.findMany({ where: { companyId: COMPANY_ID }, select: { id: true, fullName: true }, orderBy: { createdAt: 'desc' }, take: 100 }),
    prisma.supplier.findMany({ where: { companyId: COMPANY_ID }, select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.hotel.findMany({ where: { companyId: COMPANY_ID }, select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.roomType.findMany({ where: { companyId: COMPANY_ID }, select: { id: true, name: true, hotel: { select: { name: true } } }, orderBy: { name: 'asc' } }),
    prisma.trip.findMany({ where: { companyId: COMPANY_ID }, select: { id: true, title: true }, orderBy: { updatedAt: 'desc' } }),
    prisma.tripDay.findMany({ where: { companyId: COMPANY_ID }, select: { id: true, dayNumber: true, title: true, trip: { select: { title: true } } }, orderBy: { dayNumber: 'asc' }, take: 500 }),
    prisma.quotation.findMany({ where: { companyId: COMPANY_ID }, select: { id: true, quotationNumber: true }, orderBy: { createdAt: 'desc' } }),
    prisma.itineraryItem.findMany({ where: { companyId: COMPANY_ID }, select: { id: true, title: true }, orderBy: { createdAt: 'desc' }, take: 500 }),
  ]);
  return NextResponse.json({ customers, inquiries, suppliers, hotels, roomTypes, trips, tripDays, quotations, itineraryItems: items });
}
