import { Interaction } from 'discord.js';
import { ArgsOf, Client, Discord, On } from 'discordx';

import { logger, WithLogger } from '@libraries/logger';

@Discord()
class Controller {
  @On({ event: 'ready' })
  async onReady(_: ArgsOf<'ready'>, client: Client) {
    await client.initApplicationCommands();

    logger.info(
      'Successfully initialized application commands and started listening for events.'
    );
  }

  @On({ event: 'interactionCreate' })
  async onInteractionCreate(
    [interaction]: ArgsOf<'interactionCreate'>,
    client: Client
  ) {
    // Inject a logger into the interaction object with some useful context.
    (interaction as WithLogger<Interaction>).logger = logger.getSubLogger({
      prefix: [interaction.id, interaction.user.id, interaction.guild?.id],
    });

    await client.executeInteraction(interaction);
  }
}

export default Controller;
