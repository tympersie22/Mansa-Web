import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  isOperationResource,
  operationResources,
  sanitizeOperationPayload,
  validateRequiredFields,
} from '@/lib/operations-config';
import { COMPANY_ID, logAdminAction, requirePrismaAdminContext } from '../../_lib';

const delegates: Record<string, string> = {
  customers: 'customer',
  inquiries: 'planningInquiry',
  suppliers: 'supplier',
  hotels: 'hotel',
  'room-types': 'roomType',
  trips: 'trip',
  'trip-days': 'tripDay',
  'itinerary-items': 'itineraryItem',
  quotations: 'quotation',
  'quotation-items': 'quotationItem',
};

const fieldMap: Record<string, string> = {
  company_id: 'companyId',
  customer_id: 'customerId',
  inquiry_id: 'inquiryId',
  supplier_id: 'supplierId',
  hotel_id: 'hotelId',
  trip_id: 'tripId',
  trip_day_id: 'tripDayId',
  room_type_id: 'roomTypeId',
  quotation_id: 'quotationId',
  itinerary_item_id: 'itineraryItemId',
  full_name: 'fullName',
  phone_whatsapp: 'phoneWhatsapp',
  supplier_type: 'supplierType',
  contact_name: 'contactName',
  payment_terms: 'paymentTerms',
  star_rating: 'starRating',
  check_in_time: 'checkInTime',
  check_out_time: 'checkOutTime',
  max_adults: 'maxAdults',
  max_children: 'maxChildren',
  bed_configuration: 'bedConfiguration',
  meal_plan: 'mealPlan',
  default_cost: 'defaultCost',
  default_sell_price: 'defaultSellPrice',
  guest_count: 'guestCount',
  start_date: 'startDate',
  end_date: 'endDate',
  internal_notes: 'internalNotes',
  day_number: 'dayNumber',
  trip_date: 'tripDate',
  item_type: 'itemType',
  start_time: 'startTime',
  end_time: 'endTime',
  confirmation_reference: 'confirmationReference',
  sort_order: 'sortOrder',
  cost_amount: 'costAmount',
  sell_amount: 'sellAmount',
  unit_price: 'unitPrice',
  total_amount: 'totalAmount',
  valid_until: 'validUntil',
  tax_amount: 'taxAmount',
  issued_at: 'issuedAt',
  accepted_at: 'acceptedAt',
  next_follow_up_at: 'nextFollowUpAt',
  converted_at: 'convertedAt',
  is_date_flexible: 'isDateFlexible',
  source_detail: 'sourceDetail',
  travel_start_date: 'travelStartDate',
  travel_end_date: 'travelEndDate',
};

const dateFields = new Set([
  'startDate', 'endDate', 'tripDate', 'validUntil', 'issuedAt', 'acceptedAt',
  'nextFollowUpAt', 'convertedAt', 'lastContactAt', 'travelStartDate', 'travelEndDate',
]);

function toPrismaPayload(input: Record<string, unknown>) {
  const output: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    const mapped = fieldMap[key] || key;
    if (value === '' || value === null || typeof value === 'undefined') {
      output[mapped] = null;
    } else if (dateFields.has(mapped)) {
      output[mapped] = new Date(String(value));
    } else {
      output[mapped] = value;
    }
  }
  return output;
}

function jsonSafe<T>(value: T): T {
  return JSON.parse(JSON.stringify(value, (_, current) =>
    typeof current === 'bigint' || current?.constructor?.name === 'Decimal'
      ? String(current)
      : current,
  ));
}

function searchWhere(resource: string, query: string) {
  if (!query) return undefined;
  const fields: Record<string, string[]> = {
    customers: ['fullName', 'email', 'phoneWhatsapp'],
    inquiries: ['fullName', 'email', 'travelStyle'],
    suppliers: ['name', 'contactName', 'location'],
    hotels: ['name', 'location', 'contactName'],
    'room-types': ['name', 'description', 'mealPlan'],
    trips: ['title', 'currency'],
    'trip-days': ['title', 'location', 'summary'],
    'itinerary-items': ['title', 'description', 'location'],
    quotations: ['quotationNumber', 'currency', 'terms'],
    'quotation-items': ['category', 'description'],
  };
  return { OR: (fields[resource] || ['id']).map((field) => ({ [field]: { contains: query, mode: 'insensitive' } })) };
}

function includeFor(resource: string) {
  if (resource === 'inquiries') return { customer: { select: { id: true, fullName: true } } };
  if (resource === 'hotels') return { supplier: { select: { id: true, name: true } } };
  if (resource === 'room-types') return { hotel: { select: { id: true, name: true } } };
  if (resource === 'trips') return { customer: { select: { id: true, fullName: true } }, inquiry: { select: { id: true, fullName: true } } };
  if (resource === 'trip-days') return { trip: { select: { id: true, title: true } } };
  if (resource === 'itinerary-items') return { tripDay: { select: { id: true, dayNumber: true, title: true } }, supplier: { select: { id: true, name: true } }, hotel: { select: { id: true, name: true } }, roomType: { select: { id: true, name: true } } };
  if (resource === 'quotations') return { trip: { select: { id: true, title: true } }, customer: { select: { id: true, fullName: true } } };
  if (resource === 'quotation-items') return { quotation: { select: { id: true, quotationNumber: true } }, tripDay: { select: { id: true, dayNumber: true } } };
  return undefined;
}

export async function GET(req: Request, context: { params: Promise<{ resource: string }> }) {
  const admin = await requirePrismaAdminContext();
  if ('error' in admin) return admin.error;
  const { resource } = await context.params;
  if (!isOperationResource(resource)) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get('page') || 1));
  const pageSize = Math.min(100, Math.max(10, Number(url.searchParams.get('pageSize') || 25)));
  const query = url.searchParams.get('q')?.trim() || '';
  const delegate = (prisma as unknown as Record<string, { count: Function; findMany: Function }>)[delegates[resource]];
  const where = { companyId: COMPANY_ID, ...(searchWhere(resource, query) || {}) };
  const config = operationResources[resource];
  const [total, records] = await Promise.all([
    delegate.count({ where }),
    delegate.findMany({ where, include: includeFor(resource), orderBy: { [fieldMap[config.orderBy] || config.orderBy]: config.ascending === false ? 'desc' : 'asc' }, skip: (page - 1) * pageSize, take: pageSize }),
  ]);
  return NextResponse.json({ ok: true, records: jsonSafe(records), pagination: { page, pageSize, total, pages: Math.max(1, Math.ceil(total / pageSize)) } });
}

export async function POST(req: Request, context: { params: Promise<{ resource: string }> }) {
  const admin = await requirePrismaAdminContext();
  if ('error' in admin) return admin.error;
  const { resource } = await context.params;
  if (!isOperationResource(resource)) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  try {
    const input = (await req.json()) as Record<string, unknown>;
    const sanitized = sanitizeOperationPayload(resource, input);
    validateRequiredFields(resource, sanitized);
    const data = toPrismaPayload(sanitized);
    data.companyId = COMPANY_ID;
    const config = operationResources[resource];
    if (config.recordsCreator) data.createdBy = admin.user.id;
    const delegate = (prisma as unknown as Record<string, { create: Function }>)[delegates[resource]];

    if (resource === 'trips') {
      const customer = await prisma.customer.findFirst({ where: { id: String(data.customerId), companyId: COMPANY_ID } });
      if (!customer) throw new Error('Customer not found');
      data.customerSnapshot = customer;
      if (data.inquiryId) data.inquirySnapshot = await prisma.planningInquiry.findFirst({ where: { id: String(data.inquiryId), companyId: COMPANY_ID } }) || {};
    }
    if (resource === 'quotations') {
      const [customer, trip] = await Promise.all([
        prisma.customer.findFirst({ where: { id: String(data.customerId), companyId: COMPANY_ID } }),
        prisma.trip.findFirst({ where: { id: String(data.tripId), companyId: COMPANY_ID } }),
      ]);
      if (!customer || !trip) throw new Error('Trip or customer not found');
      data.customerSnapshot = customer;
      data.tripSnapshot = trip;
    }
    if (resource === 'itinerary-items' && data.supplierId) {
      data.supplierSnapshot = await prisma.supplier.findFirst({ where: { id: String(data.supplierId), companyId: COMPANY_ID } }) || {};
    }
    if (resource === 'quotation-items' && data.itineraryItemId) {
      const item = await prisma.itineraryItem.findFirst({ where: { id: String(data.itineraryItemId), companyId: COMPANY_ID } });
      data.itemSnapshot = item || {};
      data.supplierSnapshot = item?.supplierSnapshot || {};
      data.totalAmount = Number(data.quantity || 1) * Number(data.unitPrice || 0);
    }

    const record = await delegate.create({ data });
    await logAdminAction(null, `${config.entityType}.create`, config.entityType, String(record.id), admin.actor, { role: admin.role });
    return NextResponse.json({ ok: true, record: jsonSafe(record) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to create record' }, { status: 400 });
  }
}
