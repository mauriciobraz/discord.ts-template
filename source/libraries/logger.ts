import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { Logger } from 'tslog';

import { LOG_LEVEL, SAVE_LOGS_TO_FILE } from '@helpers/environmentVariables';

export type WithLogger<T extends object> = T & {
  logger: Logger<unknown>;
};

export const logger = new Logger({
  prettyLogTemplate: '{{dateIsoStr}} {{logLevelName}}',
  minLevel: LOG_LEVEL,
});

if (SAVE_LOGS_TO_FILE) {
  const LOGS_FOLDER = resolve(process.cwd(), 'logs');

  // If you want to the logs keep for a longer period of time, you can use a different file name.
  // E.g. `new Date().toISOString().split('T')[0]` to get the date in YYYY-MM-DD format.
  const LOGS_FILE = resolve(LOGS_FOLDER, `${new Date().toISOString()}.log`);

  if (!existsSync(LOGS_FOLDER)) {
    mkdirSync(LOGS_FOLDER, {
      recursive: true,
    });
  }

  logger.attachTransport((logObject) =>
    appendFileSync(LOGS_FILE, `${JSON.stringify(logObject)}\n`)
  );
}
