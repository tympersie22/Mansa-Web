export type OperationResource =
  | 'customers'
  | 'inquiries'
  | 'suppliers'
  | 'hotels'
  | 'room-types'
  | 'trips'
  | 'trip-days'
  | 'itinerary-items'
  | 'quotations'
  | 'quotation-items';

type ResourceDefinition = {
  table: string;
  entityType:
    | 'customer'
    | 'planning_inquiry'
    | 'supplier'
    | 'hotel'
    | 'room'
    | 'trip'
    | 'trip_day'
    | 'itinerary_item'
    | 'quotation'
    | 'quotation_item';
  orderBy: string;
  ascending?: boolean;
  required: string[];
  writable: string[];
  numeric?: string[];
  arrays?: string[];
  json?: string[];
  recordsCreator?: boolean;
};

export const operationResources: Record<OperationResource, ResourceDefinition> = {
  customers: {
    table: 'customers',
    entityType: 'customer',
    orderBy: 'created_at',
    ascending: false,
    required: ['full_name'],
    writable: [
      'full_name',
      'email',
      'phone_whatsapp',
      'nationality',
      'source',
      'status',
      'tags',
      'preferences',
      'notes',
      'last_contact_at',
    ],
    arrays: ['tags'],
    json: ['preferences'],
    recordsCreator: true,
  },
  inquiries: {
    table: 'planning_inquiries',
    entityType: 'planning_inquiry',
    orderBy: 'created_at',
    ascending: false,
    required: ['full_name', 'email'],
    writable: [
      'customer_id',
      'full_name',
      'email',
      'phone_whatsapp',
      'travel_start_date',
      'travel_end_date',
      'is_date_flexible',
      'guest_count',
      'message',
      'status',
      'priority',
      'budget_min',
      'budget_max',
      'currency',
      'destinations',
      'travel_style',
      'source_detail',
      'internal_notes',
      'next_follow_up_at',
      'converted_at',
    ],
    numeric: ['guest_count', 'budget_min', 'budget_max'],
    arrays: ['destinations'],
  },
  suppliers: {
    table: 'suppliers',
    entityType: 'supplier',
    orderBy: 'name',
    required: ['name', 'supplier_type'],
    writable: [
      'name',
      'supplier_type',
      'contact_name',
      'email',
      'phone_whatsapp',
      'location',
      'website',
      'payment_terms',
      'notes',
      'status',
    ],
    recordsCreator: true,
  },
  hotels: {
    table: 'hotels',
    entityType: 'hotel',
    orderBy: 'name',
    required: ['name', 'location'],
    writable: [
      'supplier_id',
      'name',
      'location',
      'address',
      'star_rating',
      'contact_name',
      'email',
      'phone_whatsapp',
      'website',
      'check_in_time',
      'check_out_time',
      'amenities',
      'notes',
      'status',
    ],
    numeric: ['star_rating'],
    arrays: ['amenities'],
    recordsCreator: true,
  },
  'room-types': {
    table: 'room_types',
    entityType: 'room',
    orderBy: 'name',
    required: ['hotel_id', 'name'],
    writable: [
      'hotel_id',
      'name',
      'description',
      'max_adults',
      'max_children',
      'bed_configuration',
      'meal_plan',
      'currency',
      'default_cost',
      'default_sell_price',
      'status',
    ],
    numeric: ['max_adults', 'max_children', 'default_cost', 'default_sell_price'],
  },
  trips: {
    table: 'trips',
    entityType: 'trip',
    orderBy: 'created_at',
    ascending: false,
    required: ['customer_id', 'title'],
    writable: [
      'inquiry_id',
      'customer_id',
      'title',
      'status',
      'start_date',
      'end_date',
      'guest_count',
      'currency',
      'internal_notes',
    ],
    numeric: ['guest_count'],
    recordsCreator: true,
  },
  'trip-days': {
    table: 'trip_days',
    entityType: 'trip_day',
    orderBy: 'day_number',
    required: ['trip_id', 'day_number', 'title'],
    writable: ['trip_id', 'day_number', 'trip_date', 'title', 'location', 'summary', 'notes'],
    numeric: ['day_number'],
  },
  'itinerary-items': {
    table: 'itinerary_items',
    entityType: 'itinerary_item',
    orderBy: 'sort_order',
    required: ['trip_day_id', 'item_type', 'title'],
    writable: [
      'trip_day_id',
      'supplier_id',
      'hotel_id',
      'room_type_id',
      'item_type',
      'start_time',
      'end_time',
      'title',
      'description',
      'location',
      'confirmation_reference',
      'status',
      'sort_order',
      'quantity',
      'cost_amount',
      'sell_amount',
      'currency',
      'notes',
    ],
    numeric: ['sort_order', 'quantity', 'cost_amount', 'sell_amount'],
  },
  quotations: {
    table: 'quotations',
    entityType: 'quotation',
    orderBy: 'created_at',
    ascending: false,
    required: ['trip_id', 'customer_id'],
    writable: [
      'trip_id',
      'customer_id',
      'revision',
      'status',
      'currency',
      'subtotal',
      'tax_amount',
      'total_amount',
      'valid_until',
      'terms',
      'issued_at',
      'accepted_at',
    ],
    numeric: ['revision', 'subtotal', 'tax_amount', 'total_amount'],
    recordsCreator: true,
  },
  'quotation-items': {
    table: 'quotation_items',
    entityType: 'quotation_item',
    orderBy: 'sort_order',
    required: ['quotation_id', 'category', 'description'],
    writable: [
      'quotation_id',
      'trip_day_id',
      'itinerary_item_id',
      'category',
      'description',
      'quantity',
      'unit_price',
      'sort_order',
    ],
    numeric: ['quantity', 'unit_price', 'sort_order'],
  },
};

export function isOperationResource(value: string): value is OperationResource {
  return Object.prototype.hasOwnProperty.call(operationResources, value);
}

export function sanitizeOperationPayload(
  resource: OperationResource,
  input: Record<string, unknown>,
) {
  const config = operationResources[resource];
  const output: Record<string, unknown> = {};

  for (const field of config.writable) {
    if (!(field in input)) continue;
    const value = input[field];

    if (config.numeric?.includes(field)) {
      if (value === '' || value === null || typeof value === 'undefined') {
        output[field] = null;
      } else {
        const numericValue = Number(value);
        if (!Number.isFinite(numericValue)) throw new Error(`${field} must be a number`);
        output[field] = numericValue;
      }
      continue;
    }

    if (config.arrays?.includes(field)) {
      output[field] = Array.isArray(value)
        ? value.map(String).map((item) => item.trim()).filter(Boolean)
        : String(value || '')
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);
      continue;
    }

    if (config.json?.includes(field)) {
      if (value && typeof value === 'object') {
        output[field] = value;
      } else {
        try {
          output[field] = JSON.parse(String(value || '{}'));
        } catch {
          throw new Error(`${field} must be valid JSON`);
        }
      }
      continue;
    }

    output[field] = value === '' ? null : value;
  }

  return output;
}

export function validateRequiredFields(resource: OperationResource, payload: Record<string, unknown>) {
  const missing = operationResources[resource].required.filter((field) => {
    const value = payload[field];
    return value === null || typeof value === 'undefined' || value === '';
  });
  if (missing.length) throw new Error(`Missing required fields: ${missing.join(', ')}`);
}
