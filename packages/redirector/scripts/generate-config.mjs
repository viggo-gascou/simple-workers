import { writeFileSync } from 'fs';
import { z } from 'zod';

const envSchema = z.object({
  DEV_KV_ID: z.string(),
  PROD_KV_ID: z.string(),
  DEV_ROOT_URL: z.url(),
  PROD_ROOT_URL: z.url(),
  PROD_DOMAIN: z.string(),
});

const env = envSchema.parse(process.env);

const config = {
  $schema: '../../node_modules/wrangler/config-schema.json',
  name: 'simple-redirector',
  main: 'src/index.ts',
  compatibility_date: '2025-07-09',
  observability: { enabled: true },
  vars: {
    ROOT_URL: process.env.DEV_ROOT_URL ?? 'https://simple-redirector.workers.dev',
    ENVIRONMENT: 'dev',
  },
  kv_namespaces: [
    {
      binding: 'redirects',
      id: process.env.DEV_KV_ID,
    },
  ],
  env: {
    production: {
      workers_dev: false,
      vars: {
        ROOT_URL: process.env.PROD_ROOT_URL,
        ENVIRONMENT: 'production',
      },
      kv_namespaces: [
        {
          binding: 'redirects',
          id: process.env.PROD_KV_ID,
        },
      ],
      routes: [
        {
          pattern: process.env.PROD_DOMAIN,
          zone_name: process.env.PROD_DOMAIN,
          custom_domain: true,
        },
      ],
    },
  },
};

writeFileSync('wrangler.jsonc', JSON.stringify(config, null, 2));
console.log('Generated wrangler.jsonc');
