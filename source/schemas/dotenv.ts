import { z } from 'zod';

const NodeEnv = z.enum(['DEVELOPMENT', 'PRODUCTION']).default('DEVELOPMENT');

const DiscordToken = z
  .string()
  .regex(/^[\w-]+\.[\w-]+\.[\w-]+$/, 'Token must be in the format of a JWT');

const LogLevel = z
  .string()
  .regex(/^[0-6]$/, 'Log level must be a number between 0 and 6')
  .transform((value) => parseInt(value ?? '3', 10));

const DotenvSchema = z.object({
  NODE_ENV: NodeEnv,
  LOG_LEVEL: LogLevel,
  DISCORD_TOKEN: DiscordToken,
});

export const { NODE_ENV, LOG_LEVEL, DISCORD_TOKEN } = DotenvSchema.parse(
  process.env
);

export type Dotenv = z.infer<typeof DotenvSchema>;
export default DotenvSchema;
