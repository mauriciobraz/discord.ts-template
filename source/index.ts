import { Client } from 'discordx';
import { resolve } from 'path';

import loadEnv from '@helpers/loadEnv';
import importFolderRecursively from '@helpers/importFolderRecursively';

async function main() {
  await initializeClient();
}

/** @internal Initialize the client and login to Discord. */
async function initializeClient() {
  if (!process.env.DISCORD_TOKEN) {
    throw new Error('DISCORD_TOKEN is not set');
  }

  const client = new Client({
    botGuilds: __DEV__ ? [getAllGuildsId] : undefined,
    intents: [],
  });

  await importFolderRecursively(resolve(__dirname, 'modules'));
  await client.login(process.env.DISCORD_TOKEN);
}

/** @internal Get all guilds and returns their IDs. */
async function getAllGuildsId(client: Client) {
  const guilds = await client.guilds.fetch();
  return guilds.map((guild) => guild.id);
}

if (require.main === module) {
  loadEnv();
  main();
}
