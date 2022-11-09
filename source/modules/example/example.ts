import { ChatInputCommandInteraction } from 'discord.js';
import { Discord } from 'discordx';

import L from '@source/locales/i18n-node';
import { Command, getPreferredLocale } from '@libraries/localization';

@Discord()
class Example {
  @Command()
  async example(interaction: ChatInputCommandInteraction) {
    const LL = L[getPreferredLocale(interaction)];
    await interaction.reply(LL.HI({ name: interaction.user.username }));
  }
}

export default Example;
