import './loadEnv';

import { z } from 'zod';

const envSchema = z.object({
  DISCORD_TOKEN: z.string().regex(/(^[\w-]*\.[\w-]*\.[\w-]*$)/),

  // https://tslog.js.org/#/?id=minlevel
  LOG_LEVEL: z
    .enum(['SILLY', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'])
    .default('INFO')
    .transform(
      (value) =>
        ((
          {
            SILLY: 0,
            TRACE: 1,
            DEBUG: 2,
            INFO: 3,
            WARN: 4,
            ERROR: 5,
            FATAL: 6,
          } as Record<typeof value, number>
        )[value])
    ),

  NODE_ENV: z.enum(['DEVELOPMENT', 'PRODUCTION']).default('DEVELOPMENT'),

  SAVE_LOGS_TO_FILE: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
});

export type EnvironmentVariables = z.infer<typeof envSchema>;

export const { DISCORD_TOKEN, LOG_LEVEL, NODE_ENV, SAVE_LOGS_TO_FILE } =
  envSchema.parse(process.env);
