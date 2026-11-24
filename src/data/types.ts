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
  image: string;
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
  image: string;
  imageAlt: string;
  /** Markierung im Bild, Angaben in Prozent der Bildbreite/-höhe. */
  highlight?: { label: string; x: number; y: number; w: number; h: number };
  rows: { label: string; text?: string; items?: string[] }[];
}

export interface ProductComparison {
  title: string;
  intro?: string;
  columns: ComparisonColumn[];
}
