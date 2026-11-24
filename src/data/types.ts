/**
 * Gemeinsame Datentypen für die Inhalts-Arrays (products.ts, systems.ts).
 * InfoSlot lag früher in systems.ts – die Produktseiten nutzen dieselbe Form
 * für ihre Fakten-Karten, deshalb liegt der Typ jetzt neutral hier.
 */
export interface InfoSlot {
  title: string;
  desc: string;
  align: string;
}

/**
 * Ein Modell bzw. eine Bauart innerhalb einer Produktkategorie (z. B. die
 * Lüfter-Arten). Hat eine Kategorie `models`, zeigt die Produktseite direkt
 * unter der Scroll-Bühne eine Modellübersicht (components/product/ProductModels.tsx).
 */
export interface ProductModel {
  name: string;
  /** Bauart in Kurzform, steht als Kennzeile über dem Namen. */
  kind: string;
  /** Produktfoto auf reinem Weiß – wird per mix-blend-multiply auf den Kachelton gelegt. */
  image?: string;
  /** Kürzel auf der Kachel, solange kein Foto vorliegt (z. B. „Al · Mg"). */
  badge?: string;
  summary: string;
  /** Leer lassen, wenn es (noch) keine Eckdaten gibt – dann steht dort „Details auf Anfrage". */
  specs: { label: string; value: string }[];
}

/** Zubehör, das klein unter der Modellübersicht steht. */
export interface ProductAccessory {
  name: string;
  detail: string;
  image: string;
}

/**
 * Prüfzeichen/Zertifizierungen als Bildleiste am Ende der Modellübersicht
 * (Stromversorgungen). Die Leiste ist sehr breit – auf dem Handy wären die
 * Zeichen darin nur gut 15 px hoch. Dort stehen deshalb zwei Hälften
 * untereinander (`mobileImages`).
 */
/**
 * Bildergalerie mit Anwendungsbeispielen unter der Modellübersicht
 * (components/product/ProductExamples.tsx), z. B. die Glastouch-Blenden auf
 * der Touchscreen-Seite. Der Alt-Text ergibt sich aus „<title>: <caption>".
 */
export interface ProductExampleGallery {
  title: string;
  intro?: string;
  link?: { to: string; label: string };
  items: { image: string; caption: string }[];
  /**
   * Für sehr kleine Originale (Kunststoff: 150 px): kleinere Kacheln, und die
   * Bilder werden nie über ihre echte Größe hinaus gezogen – sonst unscharf.
   */
  compact?: boolean;
}

/**
 * Werkstoff-Übersicht als Tabelle (components/product/ProductMaterials.tsx),
 * z. B. „Welcher Kunststoff wofür?". Allgemeine Eigenschaften der
 * Werkstoffgruppe mit Quelle je Aussage in products.ts.
 */
export interface ProductMaterialOverview {
  title: string;
  intro?: string;
  /** Kleingedrucktes unter der Tabelle. */
  note?: string;
  items: {
    /** Kurzzeichen, z. B. „PA66+GF". */
    code: string;
    name: string;
    /** Markiert die Standardmaterialien. */
    standard?: boolean;
    properties: string;
    uses: string;
    caveats?: string;
  }[];
}

/**
 * Projektablauf als Zeitstrahl (components/product/ProductProcess.tsx), z. B.
 * der feste Ablauf für kundenspezifische Entwicklungen (Montage & Gehäuse).
 */
export interface ProductProcess {
  title: string;
  intro?: string;
  /** In Reihenfolge; `approval` markiert Freigaben (Raute statt Nummer). */
  steps: { title: string; approval?: boolean }[];
  /** Zusagen unter dem Ablauf, je mit kurzer Überschrift. */
  promises?: { title: string; text: string }[];
}

export interface ProductCertifications {
  title: string;
  image: string;
  mobileImages: [string, string];
  alt: string;
  caption: string;
}

/**
 * Gegenüberstellung zweier Varianten mit Bild (z. B. Lüfter: einfach vs.
 * doppelt kugelgelagert). Steht in der Galerie „Aufbau und Technologie"
 * (components/product/ProductComparison.tsx). Alle Spalten nutzen dieselben
 * Zeilen-Labels, damit die Zeilen am Desktop nebeneinander auf einer Höhe stehen.
 */
export interface ComparisonColumn {
  title: string;
  /** Kurzbezeichnung, wie sie in Datenblättern steht (z. B. „Ball“). */
  tag: string;
  /** Foto der Variante – oder stattdessen `diagram`. */
  image?: string;
  imageAlt?: string;
  /**
   * Schematische Zeichnung statt Foto, Schlüssel aus COMPARISON_DIAGRAMS
   * (components/product/ComparisonDiagrams.tsx), z. B. „touch-resistiv".
   */
  diagram?: string;
  /** Markierung im Bild, Angaben in Prozent der Bildbreite/-höhe. */
  highlight?: { label: string; x: number; y: number; w: number; h: number };
  rows: { label: string; text?: string; items?: string[] }[];
}

/** Ein Paar (oder mehr) Varianten mit eigener Zwischenüberschrift. */
export interface ComparisonGroup {
  title: string;
  intro?: string;
  columns: ComparisonColumn[];
}

export interface ProductComparison {
  title: string;
  intro?: string;
  /** Ein einziger Vergleich (Lüfter, Touchscreens) … */
  columns?: ComparisonColumn[];
  /** … oder mehrere Paare untereinander (Glaslösungen: Härtung, Spiegelung, Hygiene). */
  groups?: ComparisonGroup[];
}
