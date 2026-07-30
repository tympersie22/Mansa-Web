import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isOperationResource, operationResources, sanitizeOperationPayload } from '@/lib/operations-config';
import { COMPANY_ID, hasElevatedAdminRole, logAdminAction, requirePrismaAdminContext } from '../../../_lib';

const delegates: Record<string, string> = {
  customers: 'customer', inquiries: 'planningInquiry', suppliers: 'supplier', hotels: 'hotel',
  'room-types': 'roomType', trips: 'trip', 'trip-days': 'tripDay', 'itinerary-items': 'itineraryItem',
  quotations: 'quotation', 'quotation-items': 'quotationItem',
};
const fieldMap: Record<string, string> = {
  customer_id: 'customerId', inquiry_id: 'inquiryId', supplier_id: 'supplierId', hotel_id: 'hotelId',
  trip_id: 'tripId', trip_day_id: 'tripDayId', room_type_id: 'roomTypeId', quotation_id: 'quotationId',
  itinerary_item_id: 'itineraryItemId', full_name: 'fullName', phone_whatsapp: 'phoneWhatsapp',
  supplier_type: 'supplierType', contact_name: 'contactName', payment_terms: 'paymentTerms', star_rating: 'starRating',
  max_adults: 'maxAdults', max_children: 'maxChildren', bed_configuration: 'bedConfiguration', meal_plan: 'mealPlan',
  default_cost: 'defaultCost', default_sell_price: 'defaultSellPrice', guest_count: 'guestCount', start_date: 'startDate',
  end_date: 'endDate', internal_notes: 'internalNotes', day_number: 'dayNumber', trip_date: 'tripDate', item_type: 'itemType',
  start_time: 'startTime', end_time: 'endTime', confirmation_reference: 'confirmationReference', sort_order: 'sortOrder',
  cost_amount: 'costAmount', sell_amount: 'sellAmount', unit_price: 'unitPrice', total_amount: 'totalAmount',
  valid_until: 'validUntil', tax_amount: 'taxAmount', issued_at: 'issuedAt', accepted_at: 'acceptedAt',
  next_follow_up_at: 'nextFollowUpAt', converted_at: 'convertedAt', is_date_flexible: 'isDateFlexible',
  source_detail: 'sourceDetail', travel_start_date: 'travelStartDate', travel_end_date: 'travelEndDate', last_contact_at: 'lastContactAt',
};
const dateFields = new Set(['startDate', 'endDate', 'tripDate', 'validUntil', 'issuedAt', 'acceptedAt', 'nextFollowUpAt', 'convertedAt', 'lastContactAt', 'travelStartDate', 'travelEndDate']);

function mapPayload(input: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(input).map(([key, value]) => {
    const mapped = fieldMap[key] || key;
    if (value === '' || value === null || typeof value === 'undefined') return [mapped, null];
    return [mapped, dateFields.has(mapped) ? new Date(String(value)) : value];
  }));
}

function jsonSafe<T>(value: T): T {
  return JSON.parse(JSON.stringify(value, (_, current) => current?.constructor?.name === 'Decimal' ? String(current) : current));
}

export async function PATCH(req: Request, context: { params: Promise<{ resource: string; id: string }> }) {
  const admin = await requirePrismaAdminContext();
  if ('error' in admin) return admin.error;
  const { resource, id } = await context.params;
  if (!isOperationResource(resource) || !id) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  try {
    const payload = mapPayload(sanitizeOperationPayload(resource, (await req.json()) as Record<string, unknown>));
    if (!Object.keys(payload).length) return NextResponse.json({ ok: false, error: 'No changes supplied' }, { status: 400 });
    const delegate = (prisma as unknown as Record<string, { update: Function }>)[delegates[resource]];
    const record = await delegate.update({ where: { id }, data: payload });
    await logAdminAction(null, `${operationResources[resource].entityType}.update`, operationResources[resource].entityType, id, admin.actor, { fields: Object.keys(payload), role: admin.role });
    return NextResponse.json({ ok: true, record: jsonSafe(record) });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to update record' }, { status: 400 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ resource: string; id: string }> }) {
  const admin = await requirePrismaAdminContext();
  if ('error' in admin) return admin.error;
  if (!hasElevatedAdminRole(admin.role)) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  const { resource, id } = await context.params;
  if (!isOperationResource(resource) || !id) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  try {
    const delegate = (prisma as unknown as Record<string, { delete: Function }>)[delegates[resource]];
    await delegate.delete({ where: { id } });
    await logAdminAction(null, `${operationResources[resource].entityType}.delete`, operationResources[resource].entityType, id, admin.actor, { role: admin.role });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to delete record' }, { status: 400 });
  }
}
