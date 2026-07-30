import { hash } from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminMembership, type AdminRole } from '../_lib';

const PROVISIONABLE_ROLES = new Set<AdminRole>(['manager', 'admin', 'super_admin']);

export async function POST(req: Request) {
  const admin = await requireAdminMembership();
  if ('error' in admin) return admin.error;
  if (admin.role !== 'super_admin') {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  const body = (await req.json().catch(() => null)) as
    | { email?: unknown; fullName?: unknown; phone?: unknown; password?: unknown; role?: unknown }
    | null;
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const fullName = typeof body?.fullName === 'string' ? body.fullName.trim() : '';
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  const role = typeof body?.role === 'string' ? (body.role as AdminRole) : null;

  if (!email || !fullName || password.length < 12 || !role || !PROVISIONABLE_ROLES.has(role)) {
    return NextResponse.json(
      { ok: false, error: 'Email, full name, role, and a 12-character password are required' },
      { status: 400 },
    );
  }

  try {
    const profile = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          name: fullName,
          passwordHash: await hash(password, 12),
          active: true,
        },
      });
      const createdProfile = await tx.adminProfile.create({
        data: {
          userId: user.id,
          companyId: 'mansa',
          role,
          displayName: fullName,
          phone: phone || null,
        },
      });
      await tx.adminLog.create({
        data: {
          companyId: 'mansa',
          propertyId: 'mansa-admin',
          action: 'admin_profile.create',
          entityType: 'admin_profile',
          entityId: createdProfile.id,
          actor: admin.actor,
          metadata: { provisionedUserId: user.id, role },
        },
      });
      return { ...createdProfile, email: user.email };
    });

    return NextResponse.json({ ok: true, profile }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ ok: false, error: 'Admin account already exists' }, { status: 409 });
    }
    return NextResponse.json({ ok: false, error: 'Unable to provision admin account' }, { status: 500 });
  }
}
