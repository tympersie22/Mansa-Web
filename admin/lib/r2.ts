import 'server-only';

import { DeleteObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'node:crypto';

const IMAGE_TYPES = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/avif', 'avif'],
]);
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const KEY_PREFIX = 'mansa/';
const ALLOWED_SCOPES = new Set(['itineraries', 'hotels', 'suppliers', 'customers']);

type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicBaseUrl: string;
};

export type ValidatedMedia = {
  kind: 'image' | 'document';
  extension: string;
  maxBytes: number;
};

let client: S3Client | undefined;

function required(name: keyof NodeJS.ProcessEnv) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required R2 configuration: ${name}`);
  return value;
}

function getConfig(): R2Config {
  return {
    accountId: required('R2_ACCOUNT_ID'),
    accessKeyId: required('R2_ACCESS_KEY_ID'),
    secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
    bucketName: required('R2_BUCKET_NAME'),
    publicBaseUrl: required('R2_PUBLIC_BASE_URL').replace(/\/+$/, ''),
  };
}

function getClient() {
  const config = getConfig();
  client ??= new S3Client({
    region: 'auto',
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
  return { client, config };
}

function safeFileStem(fileName: string) {
  const stem = fileName.replace(/\.[^.]+$/, '');
  const normalized = stem
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
  return (normalized || 'asset').slice(0, 72);
}

export function validateMediaInput(contentType: string, byteSize: number): ValidatedMedia {
  const imageExtension = IMAGE_TYPES.get(contentType);
  if (imageExtension) {
    if (byteSize > MAX_IMAGE_BYTES) {
      throw new Error('Images must be 10 MB or smaller');
    }
    return { kind: 'image', extension: imageExtension, maxBytes: MAX_IMAGE_BYTES };
  }

  throw new Error('Unsupported file type. Use JPG, PNG, WebP, or AVIF');
}

export function validateMediaFile(file: File) {
  return validateMediaInput(file.type, file.size);
}

export function normalizeMediaScope(value: FormDataEntryValue | null) {
  const scope = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (!ALLOWED_SCOPES.has(scope)) throw new Error('Invalid media scope');
  return scope;
}

export function createObjectKey(fileName: string, scope: string, extension: string) {
  if (!ALLOWED_SCOPES.has(scope)) throw new Error('Invalid media scope');
  const date = new Date();
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${KEY_PREFIX}${scope}/${year}/${month}/${randomUUID()}-${safeFileStem(fileName)}.${extension}`;
}

export function assertManagedObjectKey(key: string) {
  if (!key.startsWith(KEY_PREFIX) || key.includes('..') || key.startsWith('/')) {
    throw new Error('Invalid media object key');
  }
}

export function createPublicMediaUrl(key: string) {
  assertManagedObjectKey(key);
  const { config } = getClient();
  return `${config.publicBaseUrl}/${key.split('/').map(encodeURIComponent).join('/')}`;
}

export async function createMediaUploadUrl(input: {
  key: string;
  contentType: string;
}) {
  assertManagedObjectKey(input.key);
  const { client: r2, config } = getClient();
  return getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: config.bucketName,
      Key: input.key,
      ContentType: input.contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
    { expiresIn: 300 },
  );
}

export async function verifyMediaObject(input: {
  key: string;
  contentType: string;
  byteSize: number;
}) {
  assertManagedObjectKey(input.key);
  const { client: r2, config } = getClient();
  const object = await r2.send(
    new HeadObjectCommand({
      Bucket: config.bucketName,
      Key: input.key,
    }),
  );
  if (object.ContentType !== input.contentType || object.ContentLength !== input.byteSize) {
    throw new Error('Uploaded media did not match the approved file');
  }
}

export async function deleteMediaObject(key: string) {
  assertManagedObjectKey(key);
  const { client: r2, config } = getClient();
  await r2.send(new DeleteObjectCommand({ Bucket: config.bucketName, Key: key }));
}
