import { CommandInteraction } from 'discord.js';
import { Discord, Slash } from 'discordx';

@Discord()
export class Example {
  @Slash('example', { description: 'This is an example command.' })
  async handleExample(interaction: CommandInteraction) {
    if (!interaction.deferred)
      await interaction.deferReply({ ephemeral: true });

    await interaction.editReply('This is an example command.');
  }
}
