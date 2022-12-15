import { ChatInputCommandInteraction } from 'discord.js';
import { Discord } from 'discordx';

import { Command, getPreferredLocale } from '@libraries/localization';
import { WithLogger } from '@libraries/logger';
import L from '@locales/i18n-node';

@Discord()
class Example {
  @Command()
  async example(interaction: WithLogger<ChatInputCommandInteraction>) {
    const LL = L[getPreferredLocale(interaction)];
    await interaction.reply(LL.HI({ name: interaction.user.username }));

    interaction.logger.debug('This is an example of a log message.');
  }
}

export default Example;
