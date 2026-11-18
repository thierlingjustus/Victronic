import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer, type Plugin } from 'vite';
import type { PageSeo } from '../src/data/seo';

/**
 * Build-Schritt für Suchmaschinen und Link-Vorschauen (LinkedIn, Teams, Slack …).
 *
 * Die Seite ist eine Single-Page-App: ohne diesen Schritt liefert der Server für
 * jede Adresse dieselbe index.html aus. Google rendert JavaScript zwar, LinkedIn
 * & Co. aber nicht – die sähen überall nur die Startseite. Deshalb wird nach dem
 * Build je Seite eine Kopie der index.html mit eigenem Titel, eigener
 * Beschreibung und Open-Graph-Tags geschrieben (z. B. dist/products/luefter.html).
 * Vercel liefert sie dank "cleanUrls" unter /products/luefter aus; React
 * übernimmt danach wie gewohnt.
 *
 * Außerdem entstehen dist/sitemap.xml und dist/robots.txt.
 * Quelle aller Texte: src/data/seo.ts (+ products.ts / systems.ts).
 */

// Gemeinsames Vorschaubild aller Seiten (liegt in public/).
const OG_IMAGE = {
  path: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Victronic GmbH – Displays, Touch und Elektronik für die Industrie',
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const pageUrl = (siteUrl: string, p: PageSeo) => siteUrl + p.path;

// Die Daten-Dateien importieren Bilder und Icons – deshalb lädt sie ein kurzer
// Vite-Server statt Node direkt (Bild-Importe werden dabei zu einfachen Pfaden).
async function loadPages(root: string): Promise<{ siteUrl: string; pages: PageSeo[] }> {
  const server = await createServer({
    root,
    configFile: false,
    logLevel: 'error',
    appType: 'custom',
    server: { middlewareMode: true, hmr: false, ws: false },
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  try {
    const seo = (await server.ssrLoadModule('/src/data/seo.ts')) as typeof import('../src/data/seo');
    const { products } = (await server.ssrLoadModule('/src/data/products.ts')) as typeof import('../src/data/products');
    const { systems } = (await server.ssrLoadModule('/src/data/systems.ts')) as typeof import('../src/data/systems');
    return {
      siteUrl: seo.SITE_URL,
      pages: [
        ...seo.staticPagesBefore,
        ...products.map(seo.productSeo),
        ...systems.map(seo.systemSeo),
        ...seo.staticPagesAfter,
      ],
    };
  } finally {
    await server.close();
  }
}

function renderPage(template: string, page: PageSeo, siteUrl: string): string {
  const url = pageUrl(siteUrl, page);
  const title = esc(page.title);
  const description = esc(page.description);

  const titleRe = /<title>[\s\S]*?<\/title>/;
  const descRe = /<meta name="description" content="[^"]*"\s*\/?>/;
  if (!titleRe.test(template) || !descRe.test(template)) {
    throw new Error('[seo-pages] index.html braucht <title> und <meta name="description"> als Vorlage.');
  }

  const tags = [
    // Kein canonical auf der Startseite: index.html ist zugleich die Rückfall-
    // Seite für unbekannte Adressen, die sonst alle auf "/" zeigen würden.
    page.path !== '/' && `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Victronic GmbH" />`,
    `<meta property="og:locale" content="de_DE" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${siteUrl}${OG_IMAGE.path}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].filter(Boolean);

  return template
    .replace(titleRe, `<title>${title}</title>`)
    .replace(descRe, `<meta name="description" content="${description}" />`)
    .replace(/\s*<\/head>/, `\n    ${tags.join('\n    ')}\n  </head>`);
}

function renderSitemap(pages: PageSeo[], siteUrl: string): string {
  const urls = pages.map((p) => `  <url><loc>${esc(pageUrl(siteUrl, p))}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export default function seoPages(): Plugin {
  let root = '';
  let outDir = '';
  return {
    name: 'victronic-seo-pages',
    apply: 'build',
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async writeBundle() {
      const { siteUrl, pages } = await loadPages(root);
      const template = await fs.readFile(path.join(outDir, 'index.html'), 'utf8');

      for (const page of pages) {
        const file = path.join(outDir, page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`);
        await fs.mkdir(path.dirname(file), { recursive: true });
        await fs.writeFile(file, renderPage(template, page, siteUrl));
      }
      await fs.writeFile(path.join(outDir, 'sitemap.xml'), renderSitemap(pages, siteUrl));
      await fs.writeFile(
        path.join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      );
    },
  };
}
