import { EnvironmentVariables } from '@helpers/environmentVariables';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv, EnvironmentVariables {}
  }
}

export {};
