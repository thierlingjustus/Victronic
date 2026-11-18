// Titel und Beschreibung jeder Seite an einer Stelle. Die Seiten lesen sie über
// <Seo>, und der Build (scripts/vite-seo-pages.ts) erzeugt daraus je Seite eine
// eigene HTML-Datei mit Link-Vorschau (Open Graph) sowie sitemap.xml und robots.txt.
// Neue statische Seite = Eintrag hier + Route in App.tsx + Eintrag in
// staticPages unten. Produkte und Systeme kommen automatisch aus den Daten-Arrays.

// Hauptadresse der Website (ohne Schrägstrich am Ende). Steht in Sitemap,
// robots.txt und Link-Vorschau – bei Domainwechsel nur hier ändern.
export const SITE_URL = 'https://victronic-gmbh.de';

export type PageSeo = { path: string; title: string; description: string };

export const pageSeo = {
  home: {
    path: '/',
    title: 'Victronic GmbH – Elektronische Komponenten und Baugruppen für die Industrie',
    description:
      'Victronic GmbH aus Bargteheide: Displays, elektronische Komponenten und kundenspezifische Baugruppen für Industriekunden – mit direkten Herstellerbeziehungen und transparenten Lieferketten.',
  },
  systems: {
    path: '/systems',
    title: 'Systeme – Victronic GmbH',
    description:
      'Einbaufertige Display- und Elektroniksysteme von Victronic: TFT mit Touch, LCM/LCD-Module und kundenspezifische Baugruppen für die Industrie.',
  },
  impressum: {
    path: '/impressum',
    title: 'Impressum – Victronic GmbH',
    description: 'Impressum der Victronic GmbH, Otto-Hahn-Straße 19, 22941 Bargteheide.',
  },
  datenschutz: {
    path: '/datenschutz',
    title: 'Datenschutzerklärung – Victronic GmbH',
    description:
      'Datenschutzerklärung der Victronic GmbH: welche Daten beim Besuch dieser Website und bei Kontaktanfragen verarbeitet werden.',
  },
  agb: {
    path: '/agb',
    title: 'Allgemeine Geschäftsbedingungen – Victronic GmbH',
    description: 'Allgemeine Liefer- und Zahlungsbedingungen der Victronic GmbH.',
  },
  inhaltRecht: {
    path: '/inhalt-recht',
    title: 'Inhalt & Recht – Victronic GmbH',
    description: 'Rechtliche Hinweise zur Nutzung des Onlineangebotes der Victronic GmbH.',
  },
} satisfies Record<string, PageSeo>;

// Reihenfolge der Sitemap: Startseite und Hub vorn, Rechtliches hinten.
export const staticPagesBefore: PageSeo[] = [pageSeo.home, pageSeo.systems];
export const staticPagesAfter: PageSeo[] = [pageSeo.impressum, pageSeo.datenschutz, pageSeo.agb, pageSeo.inhaltRecht];

export function productSeo(p: { id: string; name: string; strategicBenefit: string }): PageSeo {
  return { path: `/products/${p.id}`, title: `${p.name} – Victronic GmbH`, description: p.strategicBenefit };
}

export function systemSeo(s: { id: string; name: string; description: string }): PageSeo {
  return { path: `/systems/${s.id}`, title: `${s.name} – Victronic GmbH`, description: s.description };
}
