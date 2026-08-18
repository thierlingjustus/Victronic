import { useEffect, useState, type ReactNode } from 'react';
import type { MotionValue } from 'motion/react';
import type { InfoSlot } from '../../data/systems';
import { useScrollStyle } from '../product/useScrollStyle';
import VisualCallout from './VisualCallout';

/**
 * Scroll-Visualisierung für "Housing & Assembling": die Montage nach der
 * "+"-Logik aus den Victronic Key Facts (S. 2) – PCBA + Display + Gehäuse =
 * schlüsselfertiges Endgerät. Vier Baugruppen fahren beim Scrollen von oben
 * und unten zusammen, zum Schluss schaltet sich das Display ein.
 *
 * Vorher war das eine three.js-Szene. Jetzt reines DOM + Inline-SVG, gleiches
 * Muster wie LcmAssembly/GlassBondingStack – lädt sofort und läuft auf jedem
 * Gerät. Die Bewegung läuft über useScrollStyle statt über motion.div, weil
 * motion scrollgebundene Werte an die Web Animations API abgibt und sie dann
 * nicht mehr pro Frame nachführt (siehe Kommentar in useScrollStyle.ts).
 */

// Sichtbarkeitsfenster des Visuals – identisch zu den anderen Detailseiten,
// damit Intro/Outro überall gleich getaktet bleiben.
const VISUAL_START = 0.15;
const VISUAL_END = 0.8;

/** Rechnet ein lesbares lokales 0..1-Fenster in scrollYProgress-Koordinaten um. */
const at = (local: number) => VISUAL_START + local * (VISUAL_END - VISUAL_START);

// ---------------------------------------------------------------------------
// Baugruppen-Ebene: blendet ein, fährt in die Endlage und wächst dabei leicht.
// ---------------------------------------------------------------------------
function AssemblyLayer({
  progress,
  from,
  to,
  fromY,
  className,
  reducedMotion,
  children,
}: {
  progress: MotionValue<number>;
  /** Lokales Fenster 0..1 des Visuals. */
  from: number;
  to: number;
  /** Startversatz in Pixeln – negativ = von oben. */
  fromY: number;
  className: string;
  reducedMotion: boolean;
  children: ReactNode;
}) {
  const start = at(from);
  const end = at(to);
  // Deckkraft ist nach 40 % des Fensters voll da, die Fahrt läuft weiter.
  const mid = start + (end - start) * 0.4;

  const ref = useScrollStyle<HTMLDivElement>(
    progress,
    {
      input: [start, mid, end],
      opacity: [0, 1, 1],
      y: [fromY, fromY * 0.45, 0],
      scale: [0.94, 0.976, 1],
    },
    reducedMotion
  );

  return (
    <div ref={ref} style={{ opacity: 0 }} className={className}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Die vier Baugruppen als Inline-SVG (viewBox 400x300 = 4:3 wie der Container)
// ---------------------------------------------------------------------------

/** 1. Gehäuseunterschale: PA66+GF30, Schraubdome, Dichtlippe, Steckeraufnahme. */
function BottomShell() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* Schale und Boden */}
      <rect x="0" y="0" width="400" height="300" rx="26" fill="#191b1e" />
      <rect x="16" y="16" width="368" height="268" rx="16" fill="#15171a" />
      {/* Umlaufende TPE-Dichtlippe */}
      <rect x="9" y="9" width="382" height="282" rx="21" fill="none" stroke="#060608" strokeWidth="6" />

      {/* Rippenraster im Boden */}
      <g stroke="#22262a" strokeWidth="3">
        <path d="M110 40 V260 M200 40 V260 M290 40 V260" />
        <path d="M40 110 H360 M40 190 H360" />
        <path d="M40 40 L120 120 M360 260 L280 180" strokeWidth="2" />
      </g>

      {/* Platinenauflage */}
      <rect x="70" y="70" width="260" height="160" rx="6" fill="none" stroke="#2a2f34" strokeWidth="2" strokeDasharray="8 6" />

      {/* Vier Schraubdome mit Stahl-Gewindeeinsatz und je drei Domstegen */}
      {([[52, 52], [348, 52], [348, 248], [52, 248]] as [number, number][]).map(([cx, cy], i) => (
        <g key={i}>
          {[0, 120, 240].map((deg) => (
            <rect
              key={deg}
              x={cx - 2.5}
              y={cy}
              width="5"
              height="30"
              fill="#1f2225"
              transform={`rotate(${deg + (cx < 200 ? 20 : 200)} ${cx} ${cy})`}
            />
          ))}
          <circle cx={cx} cy={cy} r="19" fill="#1f2225" />
          <circle cx={cx} cy={cy} r="10.5" fill="#8b929a" />
          <circle cx={cx} cy={cy} r="6" fill="#0f1113" />
        </g>
      ))}

      {/* Steckeraufnahme mit Kragen in der rechten Wand */}
      <rect x="368" y="122" width="24" height="56" rx="5" fill="#6c7277" />
      <rect x="374" y="130" width="12" height="40" rx="3" fill="#0f1113" />

      {/* Schnapphaken an den Längsseiten */}
      {[[150, 4], [250, 4], [150, 288], [250, 288]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="34" height="8" rx="3" fill="#2a2f34" />
      ))}
    </svg>
  );
}

/** 2. Leiterplatte / Baugruppe: bestückte PCB mit FPC-Verbinder nach oben. */
function Pcba() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <rect x="30" y="25" width="340" height="250" rx="8" fill="#14532d" />

      {/* Leiterbahnen und Vias */}
      <g stroke="#1c6b3c" strokeWidth="2.5" fill="none">
        <path d="M70 70 H150 V120 H230" />
        <path d="M70 200 H140 V160 H210" />
        <path d="M300 80 V150 H250" />
        <path d="M330 210 H240 V240" />
      </g>
      <g fill="#935f11">
        {[[92, 70], [148, 120], [232, 120], [300, 150], [140, 160], [240, 240]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" />
        ))}
      </g>

      {/* Prozessor-IC */}
      <rect x="72" y="62" width="66" height="66" rx="4" fill="#111827" />
      <g stroke="#8b929a" strokeWidth="2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${78 + i * 11} 62 V54 M${78 + i * 11} 128 V136`} />
        ))}
      </g>

      {/* Länglicher Treiber-IC */}
      <rect x="216" y="182" width="88" height="42" rx="4" fill="#111827" />
      <circle cx="226" cy="192" r="3" fill="#3f4650" />

      {/* Metall-Shield */}
      <rect x="276" y="60" width="56" height="30" rx="3" fill="#9aa0a8" />
      <rect x="281" y="65" width="46" height="20" rx="2" fill="none" stroke="#7b828a" strokeWidth="1.5" />

      {/* Drei Elektrolytkondensatoren */}
      {[[92, 226], [130, 226], [168, 226]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="15" fill="#94a3b8" />
          <circle cx={cx} cy={cy} r="15" fill="none" stroke="#6b7683" strokeWidth="2" />
          <path d={`M${cx - 8} ${cy - 8} L${cx + 8} ${cy + 8}`} stroke="#6b7683" strokeWidth="2" />
        </g>
      ))}

      {/* Silkscreen-Beschriftung */}
      <g fill="#bcc2b7" fontSize="11" fontFamily="inherit">
        <text x="72" y="150">U1</text>
        <text x="216" y="176">U2</text>
        <text x="276" y="104">SHLD</text>
      </g>

      {/* FPC-Verbinder nach oben zum Display */}
      <rect x="172" y="14" width="56" height="24" rx="3" fill="#d97706" />
      <g stroke="#a35a05" strokeWidth="1.5">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={i} d={`M${180 + i * 7} 18 V34`} />
        ))}
      </g>
    </svg>
  );
}

/** 3. Display-Einheit: Modulrahmen mit Bildfläche, die zum Schluss aufleuchtet. */
function DisplayUnit({
  progress,
  reducedMotion,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  // "Einschalten" am Ende der Montage – wie beim End-of-Line-Funktionstest.
  const glowRef = useScrollStyle<SVGGElement>(
    progress,
    { input: [at(0.7), at(0.84)], opacity: [0.05, 1] },
    reducedMotion
  );

  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* Modulrahmen */}
      <rect x="22" y="22" width="356" height="256" rx="8" fill="#1e293b" />
      {/* Bildfläche, dunkel */}
      <rect x="50" y="46" width="300" height="200" rx="3" fill="#0b1220" />

      {/* Leuchtende Bildfläche – Verlauf statt Vollfläche, damit sie nach
          eingeschaltetem Display aussieht und nicht nach blauem Rechteck. */}
      <defs>
        <linearGradient id="ha-screen" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#7dd0f2" />
          <stop offset="45%" stopColor="#00a0e8" />
          <stop offset="100%" stopColor="#006da3" />
        </linearGradient>
      </defs>
      <g ref={glowRef} style={{ opacity: 0.05 }}>
        <rect x="50" y="46" width="300" height="200" rx="3" fill="url(#ha-screen)" />
        {/* Lichtkante oben links, wie sie eine Hintergrundbeleuchtung wirft */}
        <path d="M50 49 h300 v34 c-120 26 -210 12 -300 42 Z" fill="#ffffff" opacity="0.16" />
      </g>

      {/* FPC-Anbindung nach unten zur Leiterplatte */}
      <rect x="172" y="246" width="56" height="34" rx="3" fill="#d97706" />
      <rect x="184" y="278" width="32" height="10" rx="2" fill="#1f2937" />
    </svg>
  );
}

/** 4. Frontblende: Spritzguss-Rahmen mit Display-Ausschnitt und Bedientasten. */
function FrontBezel() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/*
        Rahmen mit echtem Loch: äußere und innere Kontur in einem Pfad,
        fillRule "evenodd" stanzt den Display-Ausschnitt aus.
      */}
      <path
        fillRule="evenodd"
        fill="#d2d7dd"
        d="M26 0 H374 A26 26 0 0 1 400 26 V274 A26 26 0 0 1 374 300 H26 A26 26 0 0 1 0 274 V26 A26 26 0 0 1 26 0 Z
           M56 34 H344 A10 10 0 0 1 354 44 V216 A10 10 0 0 1 344 226 H56 A10 10 0 0 1 46 216 V44 A10 10 0 0 1 56 34 Z"
      />
      {/* Fase am Ausschnitt */}
      <rect x="46" y="34" width="308" height="192" rx="10" fill="none" stroke="#b9bfc7" strokeWidth="3" />

      {/* Bedientasten-Reihe, rechts – links daneben bleibt Platz für den Druck */}
      {[176, 210, 244, 278].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="263" r="11" fill="#3f4650" />
          <circle cx={cx} cy="263" r="11" fill="none" stroke="#aeb5bd" strokeWidth="2" />
        </g>
      ))}

      {/* Siebdruck-Schriftzug */}
      <text x="46" y="268" fill="#6b7280" fontSize="13" fontWeight="700" letterSpacing="3" fontFamily="inherit">
        VICTRONIC
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// "+"-Zeile aus den Key Facts: Bauteile addieren sich zum Endgerät
// ---------------------------------------------------------------------------
const PLUS_STEPS: { label: string; window: [number, number]; highlight?: boolean }[] = [
  { label: 'PCBA', window: [0.2, 0.28] },
  { label: '+', window: [0.3, 0.34] },
  { label: 'Display', window: [0.36, 0.44] },
  { label: '+', window: [0.5, 0.54] },
  { label: 'Gehäuse', window: [0.56, 0.64] },
  { label: '=', window: [0.68, 0.72] },
  { label: 'Ihr Endgerät', window: [0.72, 0.8], highlight: true },
];

function PlusStep({
  step,
  progress,
  reducedMotion,
}: {
  step: (typeof PLUS_STEPS)[number];
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const ref = useScrollStyle<HTMLSpanElement>(
    progress,
    { input: [at(step.window[0]), at(step.window[1])], opacity: [0, 1] },
    reducedMotion
  );

  return (
    <span
      ref={ref}
      style={{ opacity: 0 }}
      className={
        step.highlight
          ? 'text-brand-700 font-bold'
          : step.label === '+' || step.label === '='
            ? 'text-gray-400'
            : 'text-gray-700 font-semibold'
      }
    >
      {step.label}
    </span>
  );
}

// ---------------------------------------------------------------------------

function Callout({
  slot,
  progress,
  from,
  to,
  className,
  reducedMotion,
}: {
  slot: InfoSlot;
  progress: MotionValue<number>;
  from: number;
  to: number;
  className: string;
  reducedMotion: boolean;
}) {
  const ref = useScrollStyle<HTMLDivElement>(
    progress,
    { input: [at(from), at(to)], opacity: [0, 1] },
    reducedMotion
  );
  return <VisualCallout ref={ref} slot={slot} className={className} />;
}

export default function HousingAssembly({
  scrollYProgress,
  infoSlots,
}: {
  scrollYProgress: MotionValue<number>;
  infoSlots: InfoSlot[];
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /*
   * Ein- und Ausblendung des ganzen Visuals. Bei reduzierter Bewegung darf hier
   * NICHT die normale Spec stehen: useScrollStyle setzt im statischen Modus den
   * letzten Opacity-Wert – das wäre 0 und das Visual bliebe unsichtbar.
   */
  const rootRef = useScrollStyle<HTMLDivElement>(
    scrollYProgress,
    reducedMotion
      ? { input: [0, 1], opacity: [1, 1] }
      : { input: [0, 0.05, 0.8, 0.9], opacity: [0, 1, 1, 0] },
    reducedMotion
  );

  const partBase = 'absolute w-72 md:w-[26rem] aspect-[4/3]';

  return (
    <div
      ref={rootRef}
      style={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">

        {/* 1. Gehäuseunterschale – von unten */}
        <AssemblyLayer
          progress={scrollYProgress}
          from={0.02}
          to={0.24}
          fromY={320}
          reducedMotion={reducedMotion}
          className={`${partBase} z-[51] drop-shadow-2xl`}
        >
          <BottomShell />
        </AssemblyLayer>

        {/* 2. Leiterplatte / Baugruppe – von unten */}
        <AssemblyLayer
          progress={scrollYProgress}
          from={0.16}
          to={0.38}
          fromY={220}
          reducedMotion={reducedMotion}
          className={`${partBase} z-[52]`}
        >
          <Pcba />
        </AssemblyLayer>

        {/* 3. Display-Einheit – von oben */}
        <AssemblyLayer
          progress={scrollYProgress}
          from={0.32}
          to={0.54}
          fromY={-260}
          reducedMotion={reducedMotion}
          className={`${partBase} z-[53]`}
        >
          <DisplayUnit progress={scrollYProgress} reducedMotion={reducedMotion} />
        </AssemblyLayer>

        {/* 4. Frontblende – von oben, schließt die Baugruppe */}
        <AssemblyLayer
          progress={scrollYProgress}
          from={0.46}
          to={0.68}
          fromY={-360}
          reducedMotion={reducedMotion}
          className={`${partBase} z-[54] drop-shadow-xl`}
        >
          <FrontBezel />
        </AssemblyLayer>

        {/* infoSlots als Callouts an den passenden Bauteilen */}
        <Callout
          slot={infoSlots[0]}
          progress={scrollYProgress}
          from={0.58}
          to={0.66}
          reducedMotion={reducedMotion}
          className="left-1/2 ml-[11rem] md:ml-[13rem] lg:ml-[16rem] top-[24%]"
        />
        <Callout
          slot={infoSlots[1]}
          progress={scrollYProgress}
          from={0.44}
          to={0.52}
          reducedMotion={reducedMotion}
          className="right-1/2 mr-[11rem] md:mr-[13rem] lg:mr-[16rem] top-[38%]"
        />
        <Callout
          slot={infoSlots[2]}
          progress={scrollYProgress}
          from={0.72}
          to={0.8}
          reducedMotion={reducedMotion}
          className="left-1/2 ml-[11rem] md:ml-[13rem] lg:ml-[16rem] top-[48%]"
        />
      </div>

      {/* "+"-Logik aus den Key Facts */}
      <div className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm md:text-base whitespace-nowrap pointer-events-none">
        {PLUS_STEPS.map((step, i) => (
          <PlusStep key={i} step={step} progress={scrollYProgress} reducedMotion={reducedMotion} />
        ))}
      </div>
    </div>
  );
}
