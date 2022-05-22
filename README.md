# discord.ts-template

This is an template for Discord bots using TypeScript, discord.js and discord.ts libraries.

## Running the bot

This template requires Node.js v16.10.0 or higher, you can change the version in `index.ts#MIN_VERSION`, but that might break the bot.

```bash
set DISCORD_TOKEN=<your-token>
pnpm run dev
```

## How it works?

This project uses [pnpm](https://pnpm.js.org/) to manage dependencies and [discord.ts](https://github.com/oceanroleplay/discord.ts) for handling slash commands registerings.

```
├── build
│   └──...
├── source
│   ├── commands
│   │   └── ...
│   ├── client.ts
│   └── index.ts
```

- `build/` is the directory where the compiled files will be stored. **Do not change it.**

- `source/commands` is where you should put your commands, see the [discord.ts docs](https://discord-ts.js.org/docs/decorators/commands/slash) for more info.

- `source/index.ts` is for things that should be run on startup, eg. the bot or database connection.

- `source/client.ts` all things related to the bot, like slash commands registering, etc.

> You can use folders alises to organize your imports adding them to `tsconfig.json#compilerOptions.paths`, it's already resolves the imports to relative paths.
