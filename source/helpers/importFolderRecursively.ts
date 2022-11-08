import { readdir } from 'fs/promises';
import { resolve } from 'path';

/** Recursively imports all files from a folder and its subfolders. */
async function importFolderRecursively(path: string) {
  const entries = await readdir(path, { withFileTypes: true });

  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => ({ ...file, path: resolve(path, file.name) }));

  for await (const folder of entries.filter((folder) => folder.isDirectory())) {
    await importFolderRecursively(resolve(path, folder.name));
  }

  return await Promise.all(
    files.map(async (file) => (await import(file.path)) as unknown)
  );
}

export default importFolderRecursively;
