declare global {
  const __DEV__: boolean;
  const __PROD__: boolean;

  namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
      NODE_ENV: 'development' | 'production';

      DISCORD_TOKEN: string;
      LOG_LEVEL: 1 | 2 | 3 | 4 | 5 | 6;
    }
  }
}

export {};
