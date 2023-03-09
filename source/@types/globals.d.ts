import { Dotenv } from '@/schemas/dotenv';

declare global {
  /** Utility type to add a logger to an object (e.g. an interaction) */
  type Loggable<T extends object> = T & {
    logger: Logger;
  };

  namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv, Dotenv {}
  }
}

export {};
