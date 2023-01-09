import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

/** Searches for a `.env` file matching the current `NODE_ENV` and loads it. */
function loadEnv() {
  const possibleEnvFiles = [
    `.env.${process.env.NODE_ENV.toLowerCase()}.local`,
    `.env.${process.env.NODE_ENV.toLowerCase()}`,
    '.env.local',
    '.env',
  ].map((f) => resolve(process.cwd(), f));

  for (const envFile of possibleEnvFiles) {
    if (existsSync(envFile)) {
      config({ path: envFile });
      break;
    }
  }
}

loadEnv();
