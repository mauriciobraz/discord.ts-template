import { ArgsOf, Client, Discord, On } from 'discordx';

@Discord()
class Controller {
  @On({ event: 'ready' })
  async onReady(_: ArgsOf<'ready'>, client: Client) {
    console.log('Ready!');
    await client.initApplicationCommands();
  }

  @On({ event: 'interactionCreate' })
  async onInteractionCreate([i]: ArgsOf<'interactionCreate'>, client: Client) {
    await client.executeInteraction(i);
  }
}

export default Controller;
