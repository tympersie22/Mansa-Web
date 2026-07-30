import { NextResponse } from 'next/server';
import {
  COMPANY_ID,
  PROPERTY_ID,
  hasElevatedAdminRole,
  logAdminAction,
  requireAdminContext,
} from '../../../_lib';

export async function PATCH(req: Request, context: { params: Promise<{ roomId: string }> }) {
  const admin = await requireAdminContext(req);
  if ('error' in admin) return admin.error;
  if (!hasElevatedAdminRole(admin.role)) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  const { roomId } = await context.params;
  const body = (await req.json()) as { basePrice?: number };
  const basePrice = Number(body.basePrice ?? 0);
  if (!roomId || !Number.isFinite(basePrice) || basePrice <= 0) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }

  const { error } = await admin.service
    .from('rooms')
    .update({ base_price: basePrice, basePrice, updated_at: Date.now() })
    .eq('company_id', COMPANY_ID)
    .or(`property_id.eq.${PROPERTY_ID},property_slug.eq.${PROPERTY_ID}`)
    .eq('id', roomId);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  await logAdminAction(admin.service, 'room.price.update', 'room', roomId, admin.actor, {
    basePrice,
    role: admin.role,
  });
  return NextResponse.json({ ok: true });
}
