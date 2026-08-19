import type { ReactNode } from 'react';
import type { MotionValue } from 'motion/react';
import { MODEL_WINDOW, useScrollStyle } from '../useScrollStyle';

/**
 * Geteilte Bausteine der Produkt-Visualisierungen.
 *
 * Alle acht Visuals zeichnen in dieselbe Bühne (viewBox 800x600) und bewegen
 * sich über useScrollStyle – der Hook schreibt die Styles direkt aufs Element,
 * weil motion scrollgebundene Werte an die Web Animations API abgibt und danach
 * nicht mehr nachführt (ausführlich in useScrollStyle.ts).
 */

export type ProductVisualProps = {
  progress: MotionValue<number>;
  reducedMotion: boolean;
};

export const VIEWBOX = '0 0 800 600';

/**
 * Rechnet ein lesbares lokales 0..1-Fenster in scrollYProgress-Koordinaten um.
 * Bezugsgröße ist MODEL_WINDOW, also derselbe Ausschnitt, den stageProgress()
 * für die Bühne verwendet.
 */
export const at = (local: number) =>
  MODEL_WINDOW[0] + local * (MODEL_WINDOW[1] - MODEL_WINDOW[0]);

/**
 * Farben – ausschließlich die Markenpalette aus index.css plus die Neutral- und
 * Materialtöne, die im Projekt schon in Gebrauch sind. Keine neuen Hex-Werte.
 */
export const C = {
  brand50: '#f0f9fe',
  brand100: '#e0f2fc',
  brand200: '#b9e5f8',
  brand300: '#7dd0f2',
  brand400: '#38b9ec',
  brand500: '#00a0e8',
  brand600: '#0084c4',
  brand700: '#006da3',
  brand800: '#005580',
  brand900: '#054059',

  glass: '#d3e3ee',
  pcb: '#14532d',
  pcbTrace: '#1c6b3c',
  gold: '#935f11',
  silk: '#bcc2b7',
  ic: '#111827',
  icSoft: '#1f2937',
  metal: '#9aa0a8',
  metalDark: '#6b7683',
  steel: '#8b929a',
  plasticLight: '#d2d7dd',
  plasticMid: '#b9bfc7',
  plasticDark: '#191b1e',
  plasticRib: '#2a2f34',
  tpe: '#060608',
  fpc: '#d97706',
  fpcDark: '#a35a05',
  screenDark: '#0b1220',
  slate: '#1e293b',

  ink: '#475569',
  inkSoft: '#64748b',
  inkFaint: '#94a3b8',
  line: '#cbd5e1',
  lineSoft: '#e2e8f0',
  white: '#ffffff',
};

/**
 * Eine Ebene der Explosions-/Stapeldarstellung: blendet ein und fährt aus der
 * Ruhelage in ihre Endposition. `spread` ist der vertikale Endversatz in
 * viewBox-Einheiten – deshalb sitzt das hier auf einem <g>, nicht auf einem div.
 */
export function Layer({
  progress,
  reducedMotion,
  from,
  to,
  spread,
  children,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  /** Lokales Fenster 0..1 der Bühne. */
  from: number;
  to: number;
  /** Endversatz in Pixeln (negativ = nach oben). */
  spread: number;
  children: ReactNode;
}) {
  const start = at(from);
  const end = at(to);
  const ref = useScrollStyle<SVGGElement>(
    progress,
    { input: [start, end], opacity: [0, 1], y: [0, spread] },
    reducedMotion
  );
  return (
    <g ref={ref} style={{ opacity: 0 }}>
      {children}
    </g>
  );
}

/** Nur einblenden, ohne Bewegung – für Beschriftungen und Details. */
export function FadeIn({
  progress,
  reducedMotion,
  from,
  to,
  toOpacity = 1,
  children,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  from: number;
  to: number;
  toOpacity?: number;
  children: ReactNode;
}) {
  const ref = useScrollStyle<SVGGElement>(
    progress,
    { input: [at(from), at(to)], opacity: [0, toOpacity] },
    reducedMotion
  );
  return (
    <g ref={ref} style={{ opacity: 0 }}>
      {children}
    </g>
  );
}

/**
 * Isometrische Platte – das Grundelement aller Schichtdarstellungen.
 * Oberseite als Raute, dazu zwei Seitenflächen für die Materialstärke.
 */
export function IsoPlate({
  cx,
  cy,
  a,
  b,
  t = 10,
  fill,
  side,
  stroke,
  opacity = 1,
  children,
}: {
  cx: number;
  cy: number;
  /** Halbe Breite der Raute. */
  a: number;
  /** Halbe Tiefe der Raute. */
  b: number;
  /** Materialstärke. */
  t?: number;
  fill: string;
  /** Farbe der Seitenflächen; ohne Angabe wird die Fläche leicht abgedunkelt. */
  side?: string;
  stroke?: string;
  opacity?: number;
  /** Details auf der Oberseite – vom Aufrufer selbst zu positionieren. */
  children?: ReactNode;
}) {
  const top = `${cx - a},${cy} ${cx},${cy - b} ${cx + a},${cy} ${cx},${cy + b}`;
  const left = `${cx - a},${cy} ${cx},${cy + b} ${cx},${cy + b + t} ${cx - a},${cy + t}`;
  const right = `${cx + a},${cy} ${cx},${cy + b} ${cx},${cy + b + t} ${cx + a},${cy + t}`;
  const sideFill = side ?? fill;

  return (
    <g opacity={opacity}>
      <polygon points={left} fill={sideFill} />
      <polygon points={right} fill={sideFill} opacity="0.75" />
      <polygon points={top} fill={fill} stroke={stroke} strokeWidth={stroke ? 1.5 : 0} />
      {children}
    </g>
  );
}

/**
 * Beschriftung einer Ebene: Führungslinie nach rechts plus Text.
 * `side` steuert, auf welcher Seite die Linie herausgeführt wird.
 */
export function LayerLabel({
  x,
  y,
  text,
  sub,
  side = 'right',
  length = 90,
}: {
  x: number;
  y: number;
  text: string;
  sub?: string;
  side?: 'left' | 'right';
  length?: number;
}) {
  const dir = side === 'right' ? 1 : -1;
  const endX = x + dir * length;
  return (
    <g>
      <path d={`M${x} ${y} H${endX}`} stroke={C.line} strokeWidth="1.5" fill="none" />
      <circle cx={x} cy={y} r="2.5" fill={C.brand600} />
      <text
        x={endX + dir * 8}
        y={sub ? y - 2 : y + 4}
        fill={C.ink}
        fontSize="15"
        fontWeight="700"
        textAnchor={side === 'right' ? 'start' : 'end'}
        fontFamily="inherit"
      >
        {text}
      </text>
      {sub && (
        <text
          x={endX + dir * 8}
          y={y + 15}
          fill={C.inkSoft}
          fontSize="12.5"
          textAnchor={side === 'right' ? 'start' : 'end'}
          fontFamily="inherit"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/** Kleiner Fakten-Chip, z.B. für Normen und Schutzschaltungen. */
export function Chip({ x, y, label }: { x: number; y: number; label: string }) {
  const w = label.length * 7.6 + 20;
  return (
    <g>
      <rect x={x} y={y} width={w} height="26" rx="13" fill={C.brand50} stroke={C.brand100} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 17.5} fill={C.brand700} fontSize="12.5" fontWeight="700" textAnchor="middle" fontFamily="inherit">
        {label}
      </text>
    </g>
  );
}
