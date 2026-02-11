import 'dotenv/config';
import { defineConfig } from 'prisma/config';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

export default defineConfig({
  migrations: {
    seed: 'node --loader ts-node/esm --experimental-specifier-resolution=node prisma/seed.ts',
  },
});
