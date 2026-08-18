import { useEffect, useRef } from 'react';
import type { MotionValue } from 'motion/react';

/**
 * Scrollgesteuerte Styles direkt aufs Element schreiben.
 *
 * Warum nicht `motion.div` mit `style={{ opacity: useTransform(...) }}`?
 * motion reicht kompositfähige Eigenschaften wie opacity an die Web Animations
 * API weiter und hört danach auf, den Wert pro Frame nachzuführen. Bei
 * scrollgebundenen Werten friert die Darstellung dadurch mitten im Übergang
 * ein – auf den Produktseiten blieb z.B. das Intro dauerhaft als Geisterbild
 * über dem Modell stehen. Ein direkter Schreibzugriff auf `element.style` ist
 * hier verlässlich, günstig (ein Write pro Frame) und leicht nachvollziehbar.
 */

/**
 * Fenster des Bühnen-Fortschritts, in dem sich das Produktvisual bewegt: etwas
 * eingerückt, damit die Drehung nicht schon im Intro losgeht und am Ende
 * ausläuft. Bewusst eine reine Funktion statt useTransform – abgeleitete
 * MotionValues ziehen aus demselben Grund wie oben nicht zuverlässig nach.
 * Liegt hier statt in models/geometry.ts, damit die Lüfter-Bildsequenz nicht
 * three.js mit in ihren Chunk zieht.
 */
export const MODEL_WINDOW: [number, number] = [0.06, 0.92];

export function stageProgress(v: number): number {
  const [a, b] = MODEL_WINDOW;
  return Math.min(1, Math.max(0, (v - a) / (b - a)));
}

/**
 * Weiche 0..1-Rampe zwischen a und b (Smoothstep). Lag früher als `smooth` in
 * models/geometry.ts und war dort nur eine Hülle um THREE.MathUtils.smoothstep –
 * mit dem Wegfall von three.js steht die reine Rechnung jetzt hier.
 */
export function smoothstep(p: number, a: number, b: number): number {
  if (b === a) return p < a ? 0 : 1;
  const t = Math.min(1, Math.max(0, (p - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** Geklammerte, stückweise lineare Interpolation – gleiche Semantik wie useTransform. */
export function interpolate(p: number, input: number[], output: number[]): number {
  if (p <= input[0]) return output[0];
  const last = input.length - 1;
  if (p >= input[last]) return output[last];
  for (let i = 0; i < last; i++) {
    const a = input[i];
    const b = input[i + 1];
    if (p <= b) {
      const t = b === a ? 0 : (p - a) / (b - a);
      return output[i] + (output[i + 1] - output[i]) * t;
    }
  }
  return output[last];
}

type ScrollStyleSpec = {
  /** Stützstellen des Scroll-Fortschritts (0..1), aufsteigend. */
  input: number[];
  opacity?: number[];
  /** Verschiebung in Pixeln, wird zu translate3d zusammengefasst. */
  x?: number[];
  y?: number[];
  /** Skalierung (1 = Originalgröße), wird an dieselbe transform-Kette gehängt. */
  scale?: number[];
  /** Drehung in Grad, ebenfalls Teil der transform-Kette. */
  rotate?: number[];
  /** Ab diesem Fortschritt wird das Element für Klicks transparent. */
  pointerEventsOffAfter?: number;
};

// SVG-Knoten haben ebenfalls `.style`, sind aber kein HTMLElement – beide
// zulassen, damit dieselbe Mechanik in Inline-SVGs funktioniert.
export function useScrollStyle<T extends HTMLElement | SVGElement>(
  progress: MotionValue<number>,
  spec: ScrollStyleSpec,
  /** true: Styles einmalig auf den Endzustand setzen (prefers-reduced-motion). */
  staticEnd = false
) {
  const ref = useRef<T>(null);
  // Über ein Ref gehalten, damit die Spec inline geschrieben werden kann,
  // ohne bei jedem Render neu zu abonnieren.
  const specRef = useRef(spec);
  specRef.current = spec;

  useEffect(() => {
    const apply = (p: number) => {
      const el = ref.current;
      if (!el) return;
      const s = specRef.current;
      if (s.opacity) el.style.opacity = String(interpolate(p, s.input, s.opacity));
      if (s.x || s.y || s.scale || s.rotate) {
        const tx = s.x ? interpolate(p, s.input, s.x) : 0;
        const ty = s.y ? interpolate(p, s.input, s.y) : 0;
        let t = `translate3d(${tx}px, ${ty}px, 0)`;
        if (s.rotate) t += ` rotate(${interpolate(p, s.input, s.rotate)}deg)`;
        if (s.scale) t += ` scale(${interpolate(p, s.input, s.scale)})`;
        el.style.transform = t;
      }
      if (s.pointerEventsOffAfter !== undefined) {
        el.style.pointerEvents = p > s.pointerEventsOffAfter ? 'none' : 'auto';
      }
    };

    if (staticEnd) {
      const el = ref.current;
      if (el) {
        const s = specRef.current;
        if (s.opacity) el.style.opacity = String(s.opacity[s.opacity.length - 1]);
        el.style.transform = '';
        if (s.pointerEventsOffAfter !== undefined) el.style.pointerEvents = 'auto';
      }
      return;
    }

    apply(progress.get());
    return progress.on('change', apply);
  }, [progress, staticEnd]);

  return ref;
}
