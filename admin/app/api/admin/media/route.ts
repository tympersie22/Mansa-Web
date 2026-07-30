import { NextResponse } from 'next/server';
import { COMPANY_ID, hasElevatedAdminRole, requireAdminMembership } from '@/app/api/admin/_lib';
import { prisma } from '@/lib/prisma';
import {
  createMediaUploadUrl,
  createObjectKey,
  createPublicMediaUrl,
  deleteMediaObject,
  normalizeMediaScope,
  validateMediaInput,
  verifyMediaObject,
} from '@/lib/r2';

export const runtime = 'nodejs';

export async function GET() {
  const membership = await requireAdminMembership();
  if ('error' in membership) return membership.error;
  const configured = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_PUBLIC_BASE_URL']
    .every((name) => Boolean(process.env[name]?.trim()));
  return NextResponse.json({ ok: true, configured });
}

function optionalUuid(value: unknown) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const normalized = value.trim();
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(normalized)) {
    throw new Error('Invalid entity ID');
  }
  return normalized;
}

export async function POST(request: Request) {
  const membership = await requireAdminMembership();
  if ('error' in membership) return membership.error;

  try {
    const body = (await request.json()) as {
      fileName?: string;
      contentType?: string;
      byteSize?: number;
      scope?: string;
      entityType?: string;
      entityId?: string;
    };
    if (
      !body.fileName ||
      !body.contentType ||
      !Number.isInteger(body.byteSize) ||
      Number(body.byteSize) <= 0
    ) {
      return NextResponse.json({ ok: false, error: 'Valid file metadata is required' }, { status: 400 });
    }

    const scope = normalizeMediaScope(body.scope || null);
    const media = validateMediaInput(body.contentType, Number(body.byteSize));
    const entityId = optionalUuid(body.entityId);
    const entityType = body.entityType?.trim().slice(0, 80) || null;
    const objectKey = createObjectKey(body.fileName, scope, media.extension);
    const publicUrl = createPublicMediaUrl(objectKey);
    const uploadUrl = await createMediaUploadUrl({
      key: objectKey,
      contentType: body.contentType,
    });

    const asset = await prisma.mediaAsset.create({
      data: {
        companyId: membership.profile.companyId,
        objectKey,
        publicUrl,
        fileName: body.fileName.slice(0, 255),
        contentType: body.contentType,
        byteSize: Number(body.byteSize),
        kind: media.kind,
        scope,
        entityType,
        entityId,
        uploadedBy: membership.user.id,
      },
    });

    return NextResponse.json({
      ok: true,
      uploadUrl,
      expiresAt: new Date(Date.now() + 300_000).toISOString(),
      asset: {
        id: asset.id,
        key: asset.objectKey,
        url: asset.publicUrl,
        fileName: asset.fileName,
        contentType: asset.contentType,
        byteSize: asset.byteSize,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to upload media';
    const configurationError = message.startsWith('Missing required R2 configuration');
    return NextResponse.json(
      { ok: false, error: configurationError ? 'Media storage is not configured' : message },
      { status: configurationError ? 503 : 400 },
    );
  }
}

export async function PATCH(request: Request) {
  const membership = await requireAdminMembership();
  if ('error' in membership) return membership.error;

  try {
    const body = (await request.json()) as { assetId?: string };
    if (!body.assetId) {
      return NextResponse.json({ ok: false, error: 'Asset ID is required' }, { status: 400 });
    }
    const asset = await prisma.mediaAsset.findFirst({
      where: {
        id: body.assetId,
        companyId: membership.profile.companyId,
        uploadedBy: membership.user.id,
        status: 'pending',
      },
    });
    if (!asset) {
      return NextResponse.json({ ok: false, error: 'Pending media asset not found' }, { status: 404 });
    }

    await verifyMediaObject({
      key: asset.objectKey,
      contentType: asset.contentType,
      byteSize: asset.byteSize,
    });
    const readyAsset = await prisma.$transaction(async (transaction) => {
      const updated = await transaction.mediaAsset.update({
        where: { id: asset.id },
        data: { status: 'ready' },
      });
      await transaction.adminLog.create({
        data: {
          companyId: COMPANY_ID,
          action: 'media.uploaded',
          entityType: 'media_asset',
          entityId: asset.id,
          actor: membership.actor,
          metadata: {
            objectKey: asset.objectKey,
            scope: asset.scope,
            contentType: asset.contentType,
            byteSize: asset.byteSize,
          },
        },
      });
      return updated;
    });

    return NextResponse.json({
      ok: true,
      asset: { id: readyAsset.id, url: readyAsset.publicUrl },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to verify media';
    const configurationError = message.startsWith('Missing required R2 configuration');
    return NextResponse.json(
      { ok: false, error: configurationError ? 'Media storage is not configured' : message },
      { status: configurationError ? 503 : 400 },
    );
  }
}

export async function DELETE(request: Request) {
  const membership = await requireAdminMembership();
  if ('error' in membership) return membership.error;
  try {
    const body = (await request.json()) as { assetId?: string };
    if (!body.assetId) {
      return NextResponse.json({ ok: false, error: 'Asset ID is required' }, { status: 400 });
    }

    const asset = await prisma.mediaAsset.findFirst({
      where: { id: body.assetId, companyId: membership.profile.companyId },
    });
    if (!asset) {
      return NextResponse.json({ ok: false, error: 'Media asset not found' }, { status: 404 });
    }
    const canDelete =
      hasElevatedAdminRole(membership.role) ||
      (asset.status === 'pending' && asset.uploadedBy === membership.user.id);
    if (!canDelete) {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
    }

    await deleteMediaObject(asset.objectKey);
    await prisma.$transaction([
      prisma.mediaAsset.delete({ where: { id: asset.id } }),
      prisma.adminLog.create({
        data: {
          companyId: COMPANY_ID,
          action: 'media.deleted',
          entityType: 'media_asset',
          entityId: asset.id,
          actor: membership.actor,
          metadata: { objectKey: asset.objectKey, scope: asset.scope },
        },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to delete media';
    const configurationError = message.startsWith('Missing required R2 configuration');
    return NextResponse.json(
      { ok: false, error: configurationError ? 'Media storage is not configured' : message },
      { status: configurationError ? 503 : 400 },
    );
  }
}
