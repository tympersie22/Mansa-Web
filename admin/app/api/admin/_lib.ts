import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import { evaluateAdminProfile } from '@/lib/admin-authorization.mjs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const COMPANY_ID = 'mansa';
export const PROPERTY_ID = 'mansa-itineraries';
export type AdminRole = 'admin' | 'manager' | 'super_admin';
export type AdminUser = {
  id: string;
  email: string | null;
  name: string | null;
};
export type AdminLogEntityType =
  | 'itinerary'
  | 'booking'
  | 'payment'
  | 'room'
  | 'customer'
  | 'planning_inquiry'
  | 'supplier'
  | 'hotel'
  | 'trip'
  | 'trip_day'
  | 'itinerary_item'
  | 'quotation'
  | 'quotation_item'
  | 'media_asset'
  | 'admin_profile'
  | 'system'
  | 'legacy';

// Legacy integrations are isolated here while the Mansa OS operations domain
// runs through Prisma. New admin routes must use requirePrismaAdminContext.
export function getServiceClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function getActor(user: AdminUser, displayName?: string) {
  return {
    uid: user.id,
    email: user.email,
    displayName: displayName || user.name || user.email || 'Admin',
  };
}

export function hasElevatedAdminRole(role: AdminRole) {
  return role === 'admin' || role === 'super_admin';
}

export async function requireAdminMembership(): Promise<
  | {
      user: AdminUser;
      profile: {
        id: string;
        companyId: string;
        role: AdminRole;
        displayName: string;
        phone: string | null;
      };
      role: AdminRole;
      actor: ReturnType<typeof getActor>;
    }
  | { error: NextResponse }
> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 }) };
  }

  const profile = await prisma.adminProfile.findUnique({
    where: { userId: session.user.id },
    include: { user: true },
  });

  const authorization = evaluateAdminProfile(
    profile
      ? {
          company_id: profile.companyId,
          role: profile.role,
        }
      : null,
    null,
  );

  if (!profile?.user.active || !authorization.authorized) {
    return { error: NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 }) };
  }

  const user: AdminUser = {
    id: profile.user.id,
    email: profile.user.email,
    name: profile.user.name,
  };
  const role = authorization.role as AdminRole;

  return {
    user,
    profile: {
      id: profile.id,
      companyId: profile.companyId,
      role,
      displayName: profile.displayName,
      phone: profile.phone,
    },
    role,
    actor: getActor(user, profile.displayName),
  };
}

export async function requireAdminContext(
  _req?: Request,
): Promise<
  | {
      user: AdminUser;
      role: AdminRole;
      actor: ReturnType<typeof getActor>;
      service: NonNullable<ReturnType<typeof getServiceClient>>;
    }
  | { error: NextResponse }
> {
  const membership = await requireAdminMembership();
  if ('error' in membership) return membership;

  const service = getServiceClient();
  if (!service) {
    return {
      error: NextResponse.json(
        { ok: false, error: 'This legacy integration is unavailable. Use the Mansa OS Prisma route.' },
        { status: 503 },
      ),
    };
  }

  return { ...membership, service };
}

/** Server-only authorization for Prisma-backed Mansa OS routes. */
export async function requirePrismaAdminContext() {
  const membership = await requireAdminMembership();
  if ('error' in membership) return membership;
  return membership;
}

export async function logAdminAction(
  service: ReturnType<typeof getServiceClient> | null,
  action: string,
  entityType: AdminLogEntityType,
  entityId: string,
  actor: ReturnType<typeof getActor>,
  metadata?: Record<string, unknown>,
) {
  if (service) {
    await service.from('admin_logs').insert({
      company_id: COMPANY_ID,
      property_id: PROPERTY_ID,
      action,
      entity_type: entityType,
      entity_id: entityId,
      actor,
      metadata: (metadata || {}) as Prisma.InputJsonValue,
    });
    return;
  }

  await prisma.adminLog.create({
    data: {
      companyId: COMPANY_ID,
      propertyId: PROPERTY_ID,
      action,
      entityType,
      entityId,
      actor,
      metadata: (metadata || {}) as Prisma.InputJsonValue,
    },
  });
}
