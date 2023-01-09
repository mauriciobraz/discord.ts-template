import 'reflect-metadata';

import { Client } from 'discordx';
import { resolve } from 'path';

import { DISCORD_TOKEN, NODE_ENV } from '@helpers/environmentVariables';
import importFolderRecursively from '@helpers/importFolderRecursively';

async function main() {
  await initializeClient();
}

/** @internal Initialize the client and login to Discord. */
async function initializeClient() {
  const client = new Client({
    botGuilds: NODE_ENV === 'DEVELOPMENT' ? [getAllGuildsId] : undefined,
    intents: [],
  });

  await importFolderRecursively(resolve(__dirname, 'modules'));
  await client.login(DISCORD_TOKEN);
}

/** @internal Get all guilds and returns their IDs. */
async function getAllGuildsId(client: Client) {
  const guilds = await client.guilds.fetch();
  return guilds.map((guild) => guild.id);
}

if (require.main === module) {
  main();
}
