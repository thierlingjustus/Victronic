/**
 * Erzeugt public/og-image.jpg – das Vorschaubild, das LinkedIn, Teams, Slack &
 * Co. beim Teilen eines Links anzeigen (eingebunden über scripts/vite-seo-pages.ts).
 * 1200 × 630 px: Hero-Foto „touchscreen“, mittig beschnitten, Logo oben links.
 *
 * Aufruf aus dem Repo-Stamm (sharp ist keine Projekt-Abhängigkeit):
 *   npm i --no-save sharp
 *   node scripts/og-image.mjs
 */
import sharp from 'sharp';

const W = 1200;
const H = 630;
const OUT = 'public/og-image.jpg';

const photo = await sharp('src/assets/hero/touchscreen.webp').resize({ height: H }).toBuffer();
const { width } = await sharp(photo).metadata();
const logo = await sharp('src/logo.png').resize({ width: 440 }).png().toBuffer();

await sharp(photo)
  .extract({ left: Math.round((width - W) / 2), top: 0, width: W, height: H })
  .composite([{ input: logo, left: 56, top: 44 }])
  .flatten({ background: '#ffffff' })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(OUT);

console.log(`${OUT} geschrieben`);
