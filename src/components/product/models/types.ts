import type { MotionValue } from 'motion/react';

/**
 * Alle Produktmodelle bekommen denselben Scroll-Fortschritt (0..1) der Bühne.
 * Die Grunddrehung übernimmt das Rig in ProductModel3D – `progress` nutzen die
 * Modelle nur für eigene Details (Display schaltet sich ein, Deckel öffnet …).
 */
export type ModelProps = {
  progress: MotionValue<number>;
};
