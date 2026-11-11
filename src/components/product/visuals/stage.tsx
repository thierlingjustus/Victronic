import { createContext, useContext, useEffect, useId, type ReactNode, type SVGProps } from 'react';
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
  /**
   * Index der gerade aktiven Faktenkarte, -1 wenn keine aktiv ist. Jedes Visual
   * bildet ihn über eine eigene SPEC_LAYERS-Tabelle auf eine seiner Schichten
   * ab und hebt sie hervor.
   */
  activeFact?: number;
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
 * Band, über das sich die Schichten einer Explosionsdarstellung verteilen.
 * Vorher waren alle Schichten bei 0.44 fertig, die Synergie-Karte kam erst bei
 * 0.78 – dazwischen lagen gut 1,2 Bildschirmhöhen ohne sichtbare Veränderung.
 */
export const LAYER_BAND: [number, number] = [0.05, 0.72];

/** Gleichmäßig gestaffeltes Fenster für Schicht i von n innerhalb LAYER_BAND. */
export function layerWindow(i: number, n: number, width = 0.26): [number, number] {
  const [a, b] = LAYER_BAND;
  const step = n > 1 ? (b - a - width) / (n - 1) : 0;
  const from = a + i * step;
  return [from, from + width];
}

/* -------------------------------------------------------------------------- */
/* Kompakte Beschriftung (Handy)                                              */
/* -------------------------------------------------------------------------- */

/**
 * Auf dem Handy wird die 800 Einheiten breite Zeichnung auf rund 340 px
 * gestaucht – eine Beschriftung mit Schriftgröße 15 ist dann gut 6 px hoch und
 * nicht mehr lesbar. In der kompakten Darstellung schreiben LayerLabel, Chip
 * und CompactNote ihren Text deshalb nicht in die Zeichnung, sondern melden ihn
 * hier an. ProductVisual zeigt die jeweils aktuelle Beschriftung als normale
 * Textzeile unter der Grafik, und die Zeichnung selbst darf den frei
 * gewordenen Platz nutzen (useStageViewBox).
 *
 * Quelle der Texte bleibt damit die Zeichnung – es gibt keine zweite Liste,
 * die man parallel pflegen müsste.
 */
export type CaptionEntry = {
  /** scrollYProgress, ab dem der Text gilt. */
  start: number;
  text: string;
  sub?: string;
  /** Chips mit gleichem Startpunkt werden zu einer Zeile zusammengezogen. */
  kind: 'label' | 'chip';
};

export type CaptionRegistry = {
  register: (id: string, entry: CaptionEntry) => void;
  unregister: (id: string) => void;
};

/** null = normale Darstellung mit Beschriftung in der Zeichnung. */
export const CaptionRegistryContext = createContext<CaptionRegistry | null>(null);

const NO_ACTIVE: ReadonlySet<string> = new Set();
/** IDs der Beschriftungen, die gerade in der Textzeile stehen. */
export const ActiveCaptionContext = createContext<ReadonlySet<string>>(NO_ACTIVE);

/** Fortschritt, ab dem der umgebende Block (Layer, FadeIn) als sichtbar gilt. */
const AppearContext = createContext(0);

/**
 * Meldet einen Text für die kompakte Darstellung an. `compact` sagt dem
 * Aufrufer, dass er ihn nicht selbst zeichnen soll; `active`, dass er gerade
 * in der Textzeile steht.
 */
export function useStageCaption(text: string, sub?: string, kind: CaptionEntry['kind'] = 'label') {
  const registry = useContext(CaptionRegistryContext);
  const activeIds = useContext(ActiveCaptionContext);
  const start = useContext(AppearContext);
  const id = useId();

  useEffect(() => {
    if (!registry) return;
    registry.register(id, { start, text, sub, kind });
    return () => registry.unregister(id);
  }, [registry, id, start, text, sub, kind]);

  return { compact: registry !== null, active: registry !== null && activeIds.has(id) };
}

/**
 * viewBox der Zeichnung. Kompakt ein engerer Ausschnitt ohne die Ränder, die
 * sonst die Beschriftungen brauchen – das Produkt wird dadurch größer.
 */
export function useStageViewBox(compactViewBox: string) {
  return useContext(CaptionRegistryContext) ? compactViewBox : VIEWBOX;
}

/** Freier Text in der Zeichnung – kompakt ausgeblendet, weil dort unlesbar klein. */
export function StageText(props: SVGProps<SVGTextElement>) {
  const compact = useContext(CaptionRegistryContext) !== null;
  if (compact) return null;
  return <text fontFamily="inherit" {...props} />;
}

/**
 * Text, der nur in der kompakten Darstellung erscheint: der Ersatz für mit
 * StageText ausgeblendete Beschriftungen. Zeichnet selbst nichts.
 */
export function CompactNote({ text, sub }: { text: string; sub?: string }) {
  useStageCaption(text, sub);
  return null;
}

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
 * Hervorhebung der aktiven Schicht. Läuft über einen Context, damit die
 * Aufrufer den Zustand nicht durch jede Zeichnung durchfädeln müssen –
 * IsoPlate liest ihn direkt und zieht seine Kontur in der Markenfarbe nach.
 */
const HighlightContext = createContext(false);

/** Übergangsdauer der Hervorhebung, einheitlich für Kontur und Abdunklung. */
const HIGHLIGHT_MS = 300;

/**
 * Eine Ebene der Explosions-/Stapeldarstellung: blendet ein und fährt aus der
 * Ruhelage in ihre Endposition. `spread` ist der vertikale Endversatz in
 * viewBox-Einheiten – deshalb sitzt das hier auf einem <g>, nicht auf einem div.
 *
 * Die Abdunklung nicht-aktiver Schichten liegt bewusst auf einem inneren <g>:
 * useScrollStyle schreibt auf dem äußeren pro Frame die Deckkraft, beide würden
 * sich sonst gegenseitig überschreiben. So multiplizieren sie sich stattdessen.
 */
export function Layer({
  progress,
  reducedMotion,
  from,
  to,
  spread,
  index,
  activeIndex,
  collapse,
  children,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  /** Lokales Fenster 0..1 der Bühne. */
  from: number;
  to: number;
  /** Endversatz in Pixeln (negativ = nach oben). */
  spread: number;
  /** Eigener Schichtindex – nur nötig, wenn die Kopplung an die Karten greift. */
  index?: number;
  /** Hervorzuhebende Schicht, -1 = keine. */
  activeIndex?: number;
  /**
   * Fenster, in dem der Versatz wieder auf 0 zurückläuft – die Explosion
   * setzt sich also am Ende wieder zusammen. Ohne Angabe bleibt sie offen.
   */
  collapse?: [number, number];
  children: ReactNode;
}) {
  const start = at(from);
  const end = at(to);
  const ref = useScrollStyle<SVGGElement>(
    progress,
    collapse
      ? {
          input: [start, end, at(collapse[0]), at(collapse[1])],
          opacity: [0, 1, 1, 1],
          y: [0, spread, spread, 0],
        }
      : { input: [start, end], opacity: [0, 1], y: [0, spread] },
    reducedMotion
  );

  // Bei prefers-reduced-motion bleibt alles wie bisher: keine Hervorhebung.
  const coupled =
    !reducedMotion && index !== undefined && activeIndex !== undefined && activeIndex >= 0;
  const isActive = coupled && index === activeIndex;

  return (
    <g ref={ref} style={{ opacity: 0 }}>
      <HighlightContext.Provider value={isActive}>
        {/* Beschriftungen in dieser Ebene gelten, sobald sie gut zu sehen ist. */}
        <AppearContext.Provider value={at(from + (to - from) * 0.7)}>
          <g
            style={{
              opacity: coupled && !isActive ? 0.35 : 1,
              transition: `opacity ${HIGHLIGHT_MS}ms ease`,
            }}
          >
            {children}
          </g>
        </AppearContext.Provider>
      </HighlightContext.Provider>
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
      <AppearContext.Provider value={at(from + (to - from) * 0.35)}>{children}</AppearContext.Provider>
    </g>
  );
}

/**
 * Nur ausblenden – Gegenstück zu FadeIn. Für Teile, die nur in einer der beiden
 * Ansichten Sinn ergeben: die Materialstärke eines Rahmens etwa ist in der
 * Draufsicht sichtbar, in der Frontalansicht nicht mehr.
 */
export function FadeOut({
  progress,
  reducedMotion,
  from,
  to,
  children,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  from: number;
  to: number;
  children: ReactNode;
}) {
  const ref = useScrollStyle<SVGGElement>(
    progress,
    { input: [at(from), at(to)], opacity: [1, 0] },
    reducedMotion
  );
  return <g ref={ref}>{children}</g>;
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
  const highlighted = useContext(HighlightContext);

  return (
    <g opacity={opacity}>
      <polygon points={left} fill={sideFill} />
      <polygon points={right} fill={sideFill} opacity="0.75" />
      <polygon
        points={top}
        fill={fill}
        stroke={highlighted ? C.brand500 : stroke}
        strokeWidth={highlighted ? 2.5 : stroke ? 1.5 : 0}
        style={{ transition: `stroke ${HIGHLIGHT_MS}ms ease, stroke-width ${HIGHLIGHT_MS}ms ease` }}
      />
      {children}
    </g>
  );
}

/**
 * Beschriftung einer Ebene: Führungslinie nach rechts plus Text.
 * `side` steuert, auf welcher Seite die Linie herausgeführt wird.
 */
export type LayerLabelProps = {
  x: number;
  y: number;
  text: string;
  sub?: string;
  side?: 'left' | 'right';
  length?: number;
};

export function LayerLabel({ x, y, text, sub, side = 'right', length = 90 }: LayerLabelProps) {
  const { compact, active } = useStageCaption(text, sub);
  const dir = side === 'right' ? 1 : -1;
  const endX = x + dir * length;

  // Kompakt steht der Text lesbar unter der Grafik. In der Zeichnung bleibt nur
  // ein Punkt an der Stelle, auf die die Führungslinie gezeigt hätte – sichtbar,
  // solange genau dieser Text in der Zeile steht.
  if (compact) {
    return (
      <circle
        cx={x}
        cy={y}
        r="8"
        fill={C.brand500}
        stroke={C.white}
        strokeWidth="3"
        style={{ opacity: active ? 1 : 0, transition: `opacity ${HIGHLIGHT_MS}ms ease` }}
      />
    );
  }

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

/**
 * Beschriftung einer Schicht, aus dem <Layer>-<g> herausgelöst.
 *
 * Lag das Label mit im Layer, stapelten sich die Bezeichnungen während des
 * Ausfahrens übereinander. Hier startet es erst bei 70 % des Layer-Fensters und
 * fährt nur noch das letzte Stück mit – erst bewegt sich die Geometrie, danach
 * kommen die Namen.
 */
export function LayerCaption({
  progress,
  reducedMotion,
  from,
  to,
  spread,
  collapse,
  ...label
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  from: number;
  to: number;
  spread: number;
  /** Fährt die Schicht zusammen, verschwindet die Beschriftung mit ihr. */
  collapse?: [number, number];
} & LayerLabelProps) {
  const start = from + (to - from) * 0.7;
  const ref = useScrollStyle<SVGGElement>(
    progress,
    collapse
      ? {
          input: [at(start), at(to), at(collapse[0]), at(collapse[1])],
          opacity: [0, 1, 1, 0],
          y: [spread * 0.7, spread, spread, 0],
        }
      : { input: [at(start), at(to)], opacity: [0, 1], y: [spread * 0.7, spread] },
    reducedMotion
  );
  return (
    <g ref={ref} style={{ opacity: 0 }}>
      <AppearContext.Provider value={at(start + (to - start) * 0.5)}>
        <LayerLabel {...label} />
      </AppearContext.Provider>
    </g>
  );
}

/**
 * Eine Schicht samt Beschriftung, gestaffelt über LAYER_BAND. Nimmt den
 * Visuals die Fensterrechnerei ab und hält die Staffelung überall gleich.
 */
export function StackLayer({
  progress,
  reducedMotion,
  i,
  n,
  spread,
  activeIndex,
  width,
  collapse,
  label,
  children,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  /** Index dieser Schicht und Gesamtzahl – daraus folgt das Zeitfenster. */
  i: number;
  n: number;
  spread: number;
  activeIndex?: number;
  /** Fensterbreite, nur bei sehr wenigen Schichten anzupassen. */
  width?: number;
  /** Fenster, in dem sich die Darstellung wieder zusammensetzt. */
  collapse?: [number, number];
  label?: LayerLabelProps;
  children: ReactNode;
}) {
  const [from, to] = layerWindow(i, n, width);
  const common = { progress, reducedMotion };
  return (
    <>
      <Layer
        {...common}
        from={from}
        to={to}
        spread={spread}
        index={i}
        activeIndex={activeIndex}
        collapse={collapse}
      >
        {children}
      </Layer>
      {label && (
        <LayerCaption {...common} from={from} to={to} spread={spread} collapse={collapse} {...label} />
      )}
    </>
  );
}

/** Kleiner Fakten-Chip, z.B. für Normen und Schutzschaltungen. */
export function Chip({ x, y, label }: { x: number; y: number; label: string }) {
  const { compact } = useStageCaption(label, undefined, 'chip');
  const w = label.length * 7.6 + 20;
  // Kompakt wandert der Chip-Text in die Zeile unter der Grafik.
  if (compact) return null;
  return (
    <g>
      <rect x={x} y={y} width={w} height="26" rx="13" fill={C.brand50} stroke={C.brand100} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 17.5} fill={C.brand700} fontSize="12.5" fontWeight="700" textAnchor="middle" fontFamily="inherit">
        {label}
      </text>
    </g>
  );
}
