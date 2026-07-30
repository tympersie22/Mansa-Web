import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminMembership } from '../_lib';

export async function GET() {
  const admin = await requireAdminMembership();
  if ('error' in admin) return admin.error;

  return NextResponse.json({
    ok: true,
    profile: {
      id: admin.user.id,
      email: admin.user.email,
      fullName: admin.profile.displayName,
      phone: admin.profile.phone,
      role: admin.role,
      companyId: admin.profile.companyId,
    },
  });
}

export async function PATCH(req: Request) {
  const admin = await requireAdminMembership();
  if ('error' in admin) return admin.error;

  const body = (await req.json().catch(() => null)) as
    | { fullName?: unknown; phone?: unknown }
    | null;
  const fullName = typeof body?.fullName === 'string' ? body.fullName.trim() : '';
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';

  if (!fullName) {
    return NextResponse.json({ ok: false, error: 'Full name is required' }, { status: 400 });
  }

  const profile = await prisma.$transaction(async (tx) => {
    const updated = await tx.adminProfile.update({
      where: { userId: admin.user.id },
      data: { displayName: fullName, phone: phone || null },
    });
    await tx.user.update({
      where: { id: admin.user.id },
      data: { name: fullName },
    });
    await tx.adminLog.create({
      data: {
        companyId: 'mansa',
        propertyId: 'mansa-admin',
        action: 'admin.profile.update',
        entityType: 'admin_profile',
        entityId: updated.id,
        actor: admin.actor,
        metadata: { fields: ['displayName', 'phone'] },
      },
    });
    return updated;
  });

  return NextResponse.json({
    ok: true,
    profile: {
      fullName: profile.displayName,
      phone: profile.phone,
      role: profile.role,
    },
  });
}
