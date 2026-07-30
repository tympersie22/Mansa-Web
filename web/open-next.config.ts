import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// Keep the first Workers deployment independent of R2 cache setup.
export default defineCloudflareConfig({});
