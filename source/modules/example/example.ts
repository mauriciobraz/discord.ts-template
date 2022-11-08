import { ChatInputCommandInteraction } from 'discord.js';
import { Discord, Slash } from 'discordx';

@Discord()
class Example {
  @Slash({ name: 'ping', description: 'Ping Pong!' })
  async ping(interaction: ChatInputCommandInteraction) {
    await interaction.reply('Pong!');
  }
}

export default Example;
