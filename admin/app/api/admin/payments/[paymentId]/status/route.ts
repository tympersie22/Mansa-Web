import { NextResponse } from 'next/server';
import {
  COMPANY_ID,
  PROPERTY_ID,
  hasElevatedAdminRole,
  logAdminAction,
  requireAdminContext,
} from '../../../_lib';
import type { BookingStatus, PaymentStatus } from '@/lib/shared/types';

export async function PATCH(req: Request, context: { params: Promise<{ paymentId: string }> }) {
  const admin = await requireAdminContext(req);
  if ('error' in admin) return admin.error;

  const { paymentId } = await context.params;
  const body = (await req.json()) as { bookingId?: string; status?: PaymentStatus; reason?: string };
  const bookingId = body.bookingId;
  const status = body.status;
  const reason = body.reason;
  if (!paymentId || !bookingId || !status) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }
  if ((status === 'failed' || status === 'refunded') && !hasElevatedAdminRole(admin.role)) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  const now = Date.now();
  const paymentUpdate: Record<string, unknown> = { status, updated_at: now, updatedAt: now };
  if (status === 'confirmed') {
    paymentUpdate.confirmed_at = now;
    paymentUpdate.confirmedAt = now;
    paymentUpdate.webhook_received = true;
    paymentUpdate.webhookReceived = true;
    paymentUpdate.webhook_at = now;
    paymentUpdate.webhookAt = now;
  }
  if (status === 'failed' || status === 'refunded') {
    paymentUpdate.failure_reason = reason || `Marked as ${status} by admin`;
    paymentUpdate.failureReason = reason || `Marked as ${status} by admin`;
  }

  const { error: paymentError } = await admin.service
    .from('payments')
    .update(paymentUpdate)
    .eq('company_id', COMPANY_ID)
    .or(`property_id.eq.${PROPERTY_ID},property_slug.eq.${PROPERTY_ID}`)
    .eq('id', paymentId);
  if (paymentError) return NextResponse.json({ ok: false, error: paymentError.message }, { status: 500 });

  let bookingStatus: BookingStatus | undefined;
  if (status === 'confirmed') bookingStatus = 'confirmed';
  else if (status === 'failed' || status === 'refunded') bookingStatus = 'cancelled';
  else if (status === 'processing' || status === 'initiated') bookingStatus = 'pending_payment';

  if (bookingStatus) {
    const bookingUpdate: Record<string, unknown> = { status: bookingStatus, updated_at: now, updatedAt: now };
    if (bookingStatus === 'cancelled') {
      const cancelReason = reason || (status === 'failed' ? 'Payment failed' : 'Payment refunded by admin');
      bookingUpdate.cancel_reason = cancelReason;
      bookingUpdate.cancelReason = cancelReason;
      bookingUpdate.cancelled_at = now;
      bookingUpdate.cancelledAt = now;
    }
    const { error: bookingError } = await admin.service
      .from('bookings')
      .update(bookingUpdate)
      .eq('company_id', COMPANY_ID)
      .or(`property_id.eq.${PROPERTY_ID},property_slug.eq.${PROPERTY_ID}`)
      .eq('id', bookingId);
    if (bookingError) return NextResponse.json({ ok: false, error: bookingError.message }, { status: 500 });
  }

  await logAdminAction(admin.service, 'payment.status.update', 'payment', paymentId, admin.actor, {
    bookingId,
    paymentStatus: status,
    bookingStatus: bookingStatus || null,
    reason: reason || null,
    role: admin.role,
  });

  return NextResponse.json({ ok: true, bookingStatus: bookingStatus || null });
}
