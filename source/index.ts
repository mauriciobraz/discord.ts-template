import 'dotenv/config';

import { createClient } from './client';
import type { SemVer } from './types';

const MIN_VERSION: SemVer = [16, 10, 0];

async function main(): Promise<void> {
  const client = await createClient({
    useGuildedSlashCommands: process.env.NODE_ENV === 'development',
  });

  if (!process.env.DISCORD_TOKEN) {
    console.error(
      'Please provide a Discord token in the environment variable DISCORD_TOKEN.'
    );
    process.exit(1);
  }

  await client.login(process.env.DISCORD_TOKEN);
}

if (require.main === module) {
  const currentVersion = process.version
    .replace(/^v/, '')
    .split('.')
    .map((v: string): number => parseInt(v, 10)) as SemVer;

  if (currentVersion < MIN_VERSION) {
    console.error(
      `Node.js version ${process.version} is too old. Please upgrade to ${MIN_VERSION} or later.`
    );
    process.exit(1);
  }

  main();
}
