import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

const isNodeEnvRegex = /^(development|production|test)$/i;

/** Searches for a `.env` file matching the current `NODE_ENV` and loads it. */
function loadEnv() {
  process.env.NODE_ENV ||= 'development';

  if (!isNodeEnvRegex.test(process.env.NODE_ENV)) {
    throw new Error(
      `NODE_ENV should be one of "development", "production" or "test", but was "${process.env.NODE_ENV}"`
    );
  }

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

  // @ts-expect-error
  global.__DEV__ = process.env.NODE_ENV === 'development';

  // @ts-expect-error
  global.__PROD__ = process.env.NODE_ENV === 'production';
}

export default loadEnv;
