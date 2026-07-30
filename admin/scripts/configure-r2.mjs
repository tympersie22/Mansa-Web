import { PutBucketCorsCommand, S3Client } from '@aws-sdk/client-s3';

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const accountId = required('R2_ACCOUNT_ID');
const bucketName = required('R2_BUCKET_NAME');
const origins = required('R2_ALLOWED_ORIGINS')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: required('R2_ACCESS_KEY_ID'),
    secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
  },
});

await client.send(
  new PutBucketCorsCommand({
    Bucket: bucketName,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedOrigins: origins,
          AllowedMethods: ['PUT', 'HEAD'],
          AllowedHeaders: ['Content-Type', 'Cache-Control'],
          ExposeHeaders: ['ETag'],
          MaxAgeSeconds: 3600,
        },
      ],
    },
  }),
);

console.log(`Configured direct-upload CORS for ${bucketName}: ${origins.join(', ')}`);
