import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../assets/email-icons');

const icons = {
  'logo-check': `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'check-large': `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'shield': `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'monitor': `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#6c63ff" stroke-width="2"/><path d="M8 21h8M12 17v4" stroke="#6c63ff" stroke-width="2" stroke-linecap="round"/></svg>`,
  'bell': `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'email': `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#6c63ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'lock': `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke="#f59e0b" stroke-width="2"/><path d="M8 11V7a4 4 0 118 0v4" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="16" r="1.5" fill="#f59e0b"/></svg>`,
  'clock': `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#6c63ff" stroke-width="2"/><path d="M12 7v5l3 3" stroke="#6c63ff" stroke-width="2" stroke-linecap="round"/></svg>`,
  'warning': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#ffba49" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke="#ffba49" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="#ffba49" stroke-width="2" stroke-linecap="round"/></svg>`,
};

fs.mkdirSync(outDir, { recursive: true });

await Promise.all(
  Object.entries(icons).map(async ([name, svg]) => {
    const filePath = path.join(outDir, `${name}.png`);
    await sharp(Buffer.from(svg)).png().toFile(filePath);
    console.log(`Created ${filePath}`);
  })
);
