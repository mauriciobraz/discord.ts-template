# Template for Discord.js w/ Localization

This is a template for creating a Discord bot with localization support. It uses the following packages to achieve this: [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n), [discord.js](https://github.com/discordjs/discord.js) and [discordx](https://github.com/discordx-ts/discordx).

## Getting Started

Clone the repository and install the dependencies using [PnPM](https://pnpm.io/):

```bash
git clone https://github.com/mauriciobraz/discord.ts-template.git
cd discord.ts-template
pnpm install
```

### Configuration

Clone the `.env.example` file and rename it to `.env.development.local`. Then, fill in the required fields:

```bash
cp .env.example .env.development.local
```

- `DISCORD_TOKEN`: Your Discord bot token (see [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) for more information)

### How Localization Works

The localization is done using the [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n), read the documentation for more information. Basically, you can create a folder for each language you want to support, and then execute the following command to generate the types:

```bash
pnpm run typesafe-i18n
```

Don't forget to always use the [Discord's locales names](https://discord.com/developers/docs/reference#locales) for the language folders, otherwise the bot won't be able to organize the translations.

#### Translating Commands

Since `typesafe-i18n` serves the translations as an object, you can use the `mergeTranslations` helper function to merge the translations with the default ones. This function is located in the [`@locales/localization`](source/locales/helpers.ts#L15) file.

> If you want to use on the main file (eg. `en-US/index.ts`), you can use `*` as the namespace parameter, otherwise, you must use the namespace.

```ts
// source/locales/$LANGUAGE/SLASH/index.ts
import { mergeTranslations } from '@locales/localization';

export default mergeTranslations('SLASH', {
  EXAMPLE_EXAMPLE_NAME: 'example',
  EXAMPLE_EXAMPLE_DESCRIPTION: 'This is useless example command.',

  PATH_TO_ANOTHER_NAME: 'another',
  PATH_TO_ANOTHER_DESCRIPTION: 'This is another useless example command.',
});
```

### Adding Commands

The commands are located in the [`source/modules`](source/modules) folder. The way to create a command is pretty much the same as in the [discordx](https://github.com/discordx-ts/discordx), the uniques differences are the naming and the `name`/`description` fields, which are now localized.

| discord.ts-template | discordx      |
| ------------------- | ------------- |
| `Command`           | `Slash`       |
| `Option`            | `SlashOption` |
| `Group`             | `SlashGroup`  |

**Example**

```ts
import { ChatInputCommandInteraction } from 'discord.js';
import { Discord } from 'discordx';

import { Command } from '@libraries/localization';

@Discord()
class Moderation {
  // Implicitly the prefix for name and description translation
  // paths will be `MODERATION_BAN_`.
  @Command()
  ban(interaction: ChatInputCommandInteraction) {
    /** ... */
  }

  // Explicitly set the paths for name and description translations.
  @Command({
    name: 'PATH_TO_ANOTHER_NAME',
    description: 'PATH_TO_ANOTHER_DESCRIPTION',
  })
  kick(interaction: ChatInputCommandInteraction) {
    /** ... */
  }
}

export default Moderation;
```

## Docker Support

This template is also configured to run in a Docker container using [Docker Compose](https://docs.docker.com/compose/). To run the bot in a container, run the following command:

```bash
# The `-d` flag runs the container in detached (background) mode.
set APP_ENV=development
docker-compose up -d
```
