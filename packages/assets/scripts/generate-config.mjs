import { writeFileSync } from 'fs';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PROD_DOMAIN: z.string(),
  ZONE_NAME: z.string(),
});

const env = envSchema.parse(process.env);

const config = {
  $schema: '../../node_modules/wrangler/config-schema.json',
  name: 'simple-assets',
  main: 'src/index.ts',
  compatibility_date: '2025-08-12',
  observability: { enabled: true },
  assets: {
    directory: './assets',
    binding: 'ASSETS',
  },
};

writeFileSync('wrangler.jsonc', JSON.stringify(config, null, 2));
console.log('Generated wrangler.jsonc');
