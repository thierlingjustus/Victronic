import { useEffect, useState } from 'react';
import type { MotionValue } from 'motion/react';

/**
 * Textkarte am unteren Rand der System-Bühne für schmale Bildschirme.
 *
 * Am Desktop schweben die Infos als kleine Karten neben der Grafik. Auf dem
 * Handy ist dafür kein Platz – die Karten ragten aus dem Bild oder lagen
 * übereinander. Hier erscheint deshalb immer genau eine Karte in lesbarer
 * Größe, die beim Scrollen zur nächsten wechselt. Gleiches Prinzip wie die
 * kompakte Faktenkarte der Produktseiten (ProductStage).
 */

export type StageCaption = {
  title: string;
  desc: string;
  /** scrollYProgress, ab dem diese Karte gilt. Aufsteigend sortiert übergeben. */
  at: number;
};

/** Index der Karte, deren Startpunkt zuletzt überschritten wurde; -1 = noch keine. */
export function useActiveCaption(
  progress: MotionValue<number>,
  captions: StageCaption[],
  enabled = true
): number {
  const [active, setActive] = useState(-1);
  // Als Text, damit ein neu erzeugtes Array mit gleichen Werten nicht neu abonniert.
  const starts = captions.map((c) => c.at).join(',');

  useEffect(() => {
    if (!enabled) {
      setActive(-1);
      return;
    }
    const points = starts.split(',').map(Number);
    const pick = (p: number) => {
      let next = -1;
      for (let i = 0; i < points.length; i++) {
        if (p >= points[i]) next = i;
      }
      // Nur bei echtem Wechsel neu rendern – nicht bei jedem Scroll-Frame.
      setActive((prev) => (prev === next ? prev : next));
    };
    pick(progress.get());
    return progress.on('change', pick);
  }, [progress, starts, enabled]);

  return active;
}

export default function StageCaptions({
  captions,
  active,
}: {
  captions: StageCaption[];
  active: number;
}) {
  return (
    // Ab lg sitzt unten die Prozessleiste – die Karte rückt dann darüber.
    <div className="absolute inset-x-0 bottom-5 lg:bottom-32 z-[60] px-4 pointer-events-none">
      <div className="relative mx-auto flex min-h-[7.5rem] max-w-md flex-col justify-end">
        {captions.map((caption, i) => (
          <div
            key={i}
            aria-hidden={active !== i}
            className={`rounded-xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm transition-opacity duration-300 ${
              active === i ? 'relative opacity-100' : 'absolute inset-x-0 bottom-0 opacity-0'
            }`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-700">{caption.title}</h3>
              <span className="shrink-0 text-[11px] tabular-nums text-gray-400">
                {i + 1}/{captions.length}
              </span>
            </div>
            <p className="mt-1.5 text-[13px] leading-snug text-gray-600">{caption.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
