import { Discord } from 'discordx';

import { Command, getPreferredLocale } from '@/libraries/localization';
import L from '@/locales/i18n-node';

import type { ChatInputCommandInteraction } from 'discord.js';

@Discord()
class Example {
  @Command()
  async example(interaction: Loggable<ChatInputCommandInteraction>) {
    interaction.logger.debug('This is an example of a log message.');

    const LL = L[getPreferredLocale(interaction)];

    await interaction.reply({
      content: LL.HI({ name: interaction.user.username }),
    });
  }
}

export default Example;
