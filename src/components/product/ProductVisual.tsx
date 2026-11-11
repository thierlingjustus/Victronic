import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import type { MotionValue } from 'motion/react';
import { ErrorBoundary } from '../ErrorBoundary';
import { useScrollStyle } from './useScrollStyle';
import {
  ActiveCaptionContext,
  CaptionRegistryContext,
  type CaptionEntry,
  type CaptionRegistry,
  type ProductVisualProps,
} from './visuals/stage';
import TftStack from './visuals/TftStack';
import LcmModule from './visuals/LcmModule';
import TouchPanel from './visuals/TouchPanel';
import PowerForms from './visuals/PowerForms';
import AxialFan from './visuals/AxialFan';
import PlasticShell from './visuals/PlasticShell';
import CoverGlass from './visuals/CoverGlass';
import BoxBuild from './visuals/BoxBuild';

/**
 * Bühne der Produktseiten. Früher ein three.js-Canvas mit gedrehtem Modell –
 * jetzt für jede Produktkategorie eine eigene DOM/SVG-Darstellung, die vom
 * Scroll-Fortschritt der Bühne angetrieben wird. Kein WebGL, keine externen
 * Assets, sofort sichtbar.
 */

const PRODUCT_VISUALS: Record<string, ComponentType<ProductVisualProps>> = {
  display: TftStack,
  lcd: LcmModule,
  touch: TouchPanel,
  power: PowerForms,
  fan: AxialFan,
  plastic: PlasticShell,
  glass: CoverGlass,
  assembly: BoxBuild,
};

const NO_ACTIVE: ReadonlySet<string> = new Set();

/**
 * Sammelt die Beschriftungen, die die Zeichnung in der kompakten Darstellung
 * anmeldet, und bestimmt, welche gerade gilt: die mit dem spätesten Startpunkt,
 * der schon überschritten ist. Teilen sich mehrere denselben Startpunkt (zwei
 * Beschriftungen einer Ebene, eine Chip-Reihe), gelten sie gemeinsam.
 */
function useCaptions(progress: MotionValue<number>, enabled: boolean) {
  const entries = useRef(new Map<string, CaptionEntry>());
  // Zählt An- und Abmeldungen, damit die Auswahl danach neu läuft.
  const [version, setVersion] = useState(0);
  const [activeIds, setActiveIds] = useState<ReadonlySet<string>>(NO_ACTIVE);

  const registry: CaptionRegistry = useMemo(
    () => ({
      register: (id, entry) => {
        entries.current.set(id, entry);
        setVersion((v) => v + 1);
      },
      unregister: (id) => {
        entries.current.delete(id);
        setVersion((v) => v + 1);
      },
    }),
    []
  );

  useEffect(() => {
    if (!enabled) {
      setActiveIds(NO_ACTIVE);
      return;
    }
    const pick = (p: number) => {
      let latest = -1;
      for (const entry of entries.current.values()) {
        if (entry.start <= p && entry.start > latest) latest = entry.start;
      }
      const ids: string[] = [];
      if (latest >= 0) {
        for (const [id, entry] of entries.current) {
          if (Math.abs(entry.start - latest) < 1e-6) ids.push(id);
        }
      }
      // Nur bei echtem Wechsel neu rendern – nicht bei jedem Scroll-Frame.
      setActiveIds((prev) =>
        prev.size === ids.length && ids.every((id) => prev.has(id)) ? prev : new Set(ids)
      );
    };
    pick(progress.get());
    return progress.on('change', pick);
  }, [progress, enabled, version]);

  const lines = useMemo(() => {
    const active = [...activeIds]
      .map((id) => entries.current.get(id))
      .filter((entry): entry is CaptionEntry => Boolean(entry));
    const labels = active.filter((entry) => entry.kind === 'label');
    const chips = active.filter((entry) => entry.kind === 'chip');
    return [
      ...labels.map((entry) => ({ text: entry.text, sub: entry.sub })),
      // Eine Chip-Reihe wird zu einer Zeile.
      ...(chips.length ? [{ text: chips.map((entry) => entry.text).join(' · '), sub: undefined }] : []),
    ];
  }, [activeIds]);

  return { registry, activeIds, lines };
}

export default function ProductVisual({
  modelType,
  progress,
  reducedMotion = false,
  activeFact = -1,
  compactLabels = false,
  fallbackSrc,
  fallbackAlt,
}: {
  modelType: string;
  progress: MotionValue<number>;
  reducedMotion?: boolean;
  /** Aktive Faktenkarte – hebt die zugehörige Schicht im Visual hervor. */
  activeFact?: number;
  /**
   * Handy: Beschriftungen als lesbare Textzeile unter der Grafik statt winzig
   * in der Zeichnung (siehe visuals/stage.tsx).
   */
  compactLabels?: boolean;
  fallbackSrc: string;
  fallbackAlt: string;
}) {
  const Visual = PRODUCT_VISUALS[modelType] ?? BoxBuild;
  const { registry, activeIds, lines } = useCaptions(progress, compactLabels);

  // Die Textzeile tritt zurück, sobald die Synergie-Karte der Bühne kommt –
  // die liegt auf dem Handy an derselben Stelle.
  const captionRef = useScrollStyle<HTMLDivElement>(progress, {
    input: [0.77, 0.84],
    opacity: [1, 0],
  });

  return (
    <ErrorBoundary
      fallback={
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <img src={fallbackSrc} alt={fallbackAlt} className="max-w-full max-h-full object-contain opacity-80" />
        </div>
      }
    >
      {/*
        Die Zeichnung selbst ist dekorativ (aria-hidden in den Visuals); die
        Bedeutung trägt das Label hier. Klicks gehen durch, damit das Scrollen
        nie blockiert wird.
      */}
      <div className="absolute inset-0 pointer-events-none" role="img" aria-label={fallbackAlt}>
        <CaptionRegistryContext.Provider value={compactLabels ? registry : null}>
          <ActiveCaptionContext.Provider value={activeIds}>
            <Visual progress={progress} reducedMotion={reducedMotion} activeFact={activeFact} />
          </ActiveCaptionContext.Provider>
        </CaptionRegistryContext.Provider>
      </div>

      {compactLabels && (
        <div
          ref={captionRef}
          className="absolute inset-x-0 bottom-0 flex min-h-[2.75rem] flex-col items-center justify-end text-center pointer-events-none"
        >
          {lines.map((line) => (
            <p key={line.text} className="text-[13px] leading-snug text-gray-500">
              <span className="font-semibold text-gray-800">{line.text}</span>
              {line.sub && <span> · {line.sub}</span>}
            </p>
          ))}
        </div>
      )}
    </ErrorBoundary>
  );
}
