import G from 'glob';
import { Client as ClientX, ClientOptions as ClientXOptions } from 'discordx';
import { resolve } from 'path';

interface CreateClientOptions {
  /**
   * It's registers faster than globally. Recommended for development.
   */
  useGuildedSlashCommands?: boolean;
}

// DO NOT CHANGE. Path to the folder containing the commands.
const COMMANDS_DIR: string = resolve(__dirname, 'commands', '**', '*.{js,ts}');

const INTENTS: number[] = [
  // Populate with the intents that you're using in your bot.
  // See https://discordjs.guide/popular-topics/intents.html#gateway-intents
];

export async function createClient(
  options: CreateClientOptions
): Promise<ClientX> {
  const client = new ClientX({
    intents: INTENTS,
  });

  client.on('ready', async () => {
    if (options.useGuildedSlashCommands)
      (client.options as ClientXOptions).botGuilds = client.guilds.cache.map(
        guild => guild.id
      );

    await client.initApplicationCommands();
  });

  client.on('interactionCreate', async interaction => {
    await client.executeInteraction(interaction);
  });

  await importFolderRecursive(COMMANDS_DIR);

  return client;
}

async function importFolderRecursive(dir: string): Promise<unknown[]> {
  return await Promise.all(
    G.sync(dir).map((file: string): unknown => import(file))
  );
}
