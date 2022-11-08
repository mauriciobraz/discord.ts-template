import loadEnv from '@helpers/loadEnv';

function main() {
  console.log('Hello World!');
}

if (require.main === module) {
  loadEnv();
  main();
}
