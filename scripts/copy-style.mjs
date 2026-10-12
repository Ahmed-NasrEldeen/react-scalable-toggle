import { copyFile, mkdir, readdir } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
await copyFile('src/ScalableToggle.css', 'dist/style.css');

await mkdir('dist/themes', { recursive: true });

const themeFiles = await readdir('src/themes');

await Promise.all(
  themeFiles
    .filter((file) => file.endsWith('.css'))
    .map((file) => copyFile(`src/themes/${file}`, `dist/themes/${file}`)),
);
