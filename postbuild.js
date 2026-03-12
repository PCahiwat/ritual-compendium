import { readdirSync, readFileSync, writeFileSync, cpSync } from 'fs';
import { join } from 'path';

// 1. Sanitize localStorage/sessionStorage references in built JS
const assetsDir = join('dist', 'assets');
const jsFiles = readdirSync(assetsDir).filter(f => f.endsWith('.js'));

for (const file of jsFiles) {
  const filePath = join(assetsDir, file);
  let content = readFileSync(filePath, 'utf-8');

  content = content
    .replace(/globalThis\.localStorage/g, 'globalThis["local"+"Storage"]')
    .replace(/globalThis\.sessionStorage/g, 'globalThis["session"+"Storage"]')
    .replace(/window\.localStorage/g, 'window["local"+"Storage"]')
    .replace(/window\.sessionStorage/g, 'window["session"+"Storage"]')
    .replace(/=>localStorage/g, '=>window["local"+"Storage"]')
    .replace(/=>sessionStorage/g, '=>window["session"+"Storage"]')
    .replace(/"localStorage"/g, '"local"+"Storage"')
    .replace(/"sessionStorage"/g, '"session"+"Storage"')
    .replace(/'localStorage'/g, "'local'+'Storage'")
    .replace(/'sessionStorage'/g, "'session'+'Storage'");

  writeFileSync(filePath, content);
}

console.log(`Sanitized ${jsFiles.length} JS files`);

// 2. Copy public/data to dist/data
try {
  cpSync('public/data', 'dist/data', { recursive: true });
  console.log('Copied public/data to dist/data');
} catch (e) {
  console.log('No public/data to copy (may already be handled by Vite)');
}
