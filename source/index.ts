import 'dotenv/config';
import 'reflect-metadata';

import { readdir } from 'fs/promises';
import { resolve } from 'path';

import { Client, DIService, typeDiDependencyRegistryEngine } from 'discordx';
import { Logger } from 'tslog';
import Container, { Service } from 'typedi';

import { DISCORD_TOKEN, LOG_LEVEL, NODE_ENV } from '@/schemas/dotenv';

async function main() {
  const logger = new Logger({
    name: 'Main',
    prettyLogTemplate: '{{dateIsoStr}} {{logLevelName}}',
    minLevel: LOG_LEVEL,
  });

  Container.set(Logger, logger);

  await startDiscordClient();
}

const MODULES_PATH = resolve(__dirname, 'modules');

/** @internal Initialize the client and login to Discord. */
async function startDiscordClient() {
  const client = new Client({
    botGuilds: NODE_ENV === 'DEVELOPMENT' ? [getAllGuildsId] : undefined,
    intents: [],
  });

  await loadModules(MODULES_PATH);
  await client.login(DISCORD_TOKEN);
}

/** @internal Get all guilds and returns their IDs. */
async function getAllGuildsId(client: Client) {
  const guilds = await client.guilds.fetch();
  return guilds.map((guild) => guild.id);
}

/** @internal Recursively load all modules from a folder and its subfolders. */
async function loadModules(path: string): Promise<void> {
  const entries = await readdir(path, { withFileTypes: true });

  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => ({
      ...file,
      path: resolve(path, file.name),
    }));

  const folders = entries.filter((folder) => folder.isDirectory());

  for await (const folder of folders) {
    await loadModules(resolve(path, folder.name));
  }

  await Promise.all(
    files.map(async (file) => {
      await import(file.path);
    })
  );
}

if (require.main === module) {
  // Provides TypeDI support for DiscordX. This is required for the `@Inject`
  // decorator to work (https://discordx.js.org/docs/discordx/basics/dependencyInjection/#configuration).
  DIService.engine = typeDiDependencyRegistryEngine
    .setInjector(Container)
    .setService(Service);

  main();
}
