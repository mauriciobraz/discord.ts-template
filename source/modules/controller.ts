import { Discord, On } from 'discordx';
import { Logger } from 'tslog';

import type { Interaction } from 'discord.js';
import type { ArgsOf, Client } from 'discordx';

@Discord()
class Controller {
  constructor(private readonly logger: Logger<unknown>) {}

  @On({ event: 'ready' })
  async onReady(_: ArgsOf<'ready'>, client: Client) {
    await client.initApplicationCommands();

    this.logger.info(
      'Successfully initialized application commands and started listening for events.'
    );
  }

  @On({ event: 'interactionCreate' })
  async onInteractionCreate(
    [interaction]: ArgsOf<'interactionCreate'>,
    client: Client
  ) {
    (interaction as Loggable<Interaction>).logger = this.logger.getSubLogger({
      name: 'InteractionCreate',
      prefix: [interaction.id, interaction.user.id, interaction.guild?.id],
    });

    await client.executeInteraction(interaction);
  }
}

export default Controller;
