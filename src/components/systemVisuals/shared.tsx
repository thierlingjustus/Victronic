import type { MotionValue } from 'motion/react';
import type { InfoSlot } from '../../data/types';

/**
 * Gemeinsame Taktung und Bausteine der vier System-Visualisierungen.
 *
 * Alle Bewegungen laufen über useScrollStyle – nicht über motion.div mit
 * useTransform. Werte, die direkt an scrollYProgress hängen, bindet motion an
 * eine native ScrollTimeline der ganzen Seite statt an die Bühne: das Visual
 * blendete dadurch nie aus und das Schluss-Panel erschien in Chrome gar nicht.
 */

/** Fenster des Bühnen-Fortschritts, in dem sich ein Visual aufbaut. */
export const VISUAL_START = 0.15;
export const VISUAL_END = 0.8;

/** Rechnet ein lesbares lokales 0..1-Fenster in scrollYProgress-Koordinaten um. */
export const at = (local: number) => VISUAL_START + local * (VISUAL_END - VISUAL_START);

/** Das Intro der Bühne blendet über dieses Fenster aus (SystemDetail.tsx). */
export const INTRO_FADE_OUT: [number, number] = [0, 0.13];

/**
 * Einblenden des ganzen Visuals. Beginnt erst, wenn das Intro fast weg ist –
 * vorher lagen Überschrift und Grafik sichtbar übereinander. Ein Ausblenden
 * gibt es nicht mehr: das Visual bleibt bis zum Ende der Bühne stehen und
 * scrollt dann mit ihr aus dem Bild.
 */
export const VISUAL_FADE_IN = { input: [0.1, 0.16], opacity: [0, 1] };

export type SystemVisualProps = {
  scrollYProgress: MotionValue<number>;
  infoSlots: InfoSlot[];
  /**
   * Kompakte Darstellung für schmale Bildschirme: die Infos laufen nacheinander
   * durch eine lesbare Textkarte am unteren Rand (StageCaptions). Breit stehen
   * sie stattdessen als Legende rechts neben der Grafik (SystemDetail.tsx) –
   * schwebende Karten neben der Grafik gibt es nicht mehr.
   */
  compact: boolean;
};

/** Der Qualifizierungs-Hinweis – breit am Ende der Legende, kompakt als letzte Textkarte. */
export const QUALIFICATION = {
  title: 'Kundenspezifische Qualifizierung',
  desc: 'Jedes Display-System durchläuft strenge, kundenspezifische Testverfahren. Von optischer Performance bis hin zu extremen Umweltbedingungen garantieren wir höchste Zuverlässigkeit für industrielle Anwendungen.',
};

/** Ab hier gilt in der kompakten Darstellung die Qualifizierungs-Karte. */
export const QUALIFICATION_AT = 0.74;
