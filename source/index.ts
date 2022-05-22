import { type SemVer } from './types';

const MIN_VERSION: SemVer = [16, 10, 0];

async function main(): Promise<void> {
  console.log('Hello World!');
}

if (require.main === module) {
  const currentVersion = process.version
    .replace(/^v/, '')
    .split('.')
    .map((v: string): number => parseInt(v, 10)) as SemVer;

  if (currentVersion < MIN_VERSION) {
    console.error(
      `Node.js version ${process.version} is too old. Please upgrade to ${MIN_VERSION} or later.`
    );
    process.exit(1);
  }

  main();
}
