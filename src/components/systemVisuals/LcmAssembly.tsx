import { useMemo, type ReactNode } from 'react';
import type { MotionValue } from 'motion/react';
import { useScrollStyle } from '../product/useScrollStyle';
import StageCaptions, { useActiveCaption, type StageCaption } from './StageCaptions';
import { at, Callout, QUALIFICATION, QUALIFICATION_AT, VISUAL_FADE_IN, type SystemVisualProps } from './shared';

/**
 * Scroll-Visualisierung für "LCM/LCD mit Touch": Montage statt Explosion.
 * Fünf Bauteile (Backlight-Housing mit Schnapphaken, LED-Backlight, monochrome
 * LCD-Zelle, Touch-Sensor, siebbedrucktes Deckglas) schweben beim Scrollen
 * zusammen; zum Schluss "schaltet sich" die Segment-Anzeige ein.
 * Referenz: Victronic Key Facts S. 2 (LCD-Modul + Backlight-Housing) und die
 * monochromen VA-/Segment-Displays der Displaytechnologien-Präsentation.
 *
 * Bewegung über useScrollStyle, siehe shared.tsx.
 */

// Sieben-Segment-Ziffer "8" (alle Segmente aktiv) im 36x64-Raster
const SEGMENTS = [
  { x: 6, y: 0, w: 24, h: 7 },      // a oben
  { x: 29, y: 4, w: 7, h: 25 },     // b rechts oben
  { x: 29, y: 35, w: 7, h: 25 },    // c rechts unten
  { x: 6, y: 57, w: 24, h: 7 },     // d unten
  { x: 0, y: 35, w: 7, h: 25 },     // e links unten
  { x: 0, y: 4, w: 7, h: 25 },      // f links oben
  { x: 6, y: 28.5, w: 24, h: 7 },   // g Mitte
];

function SegmentDigit({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) skewX(-4)`}>
      {SEGMENTS.map((s, i) => (
        <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={1.5} fill="#1e293b" />
      ))}
    </g>
  );
}

/**
 * Ein Bauteil, das aus `fromY` Pixeln Abstand in seine Endlage fährt. Die
 * Deckkraft ist nach 40 % des Fensters voll da, die Fahrt läuft weiter.
 */
function Part({
  progress,
  from,
  to,
  fromY = 0,
  className,
  children,
}: {
  progress: MotionValue<number>;
  /** Lokales Fenster 0..1 des Visuals. */
  from: number;
  to: number;
  /** Startversatz in Pixeln – negativ = von oben, 0 = nur einblenden. */
  fromY?: number;
  className: string;
  children?: ReactNode;
}) {
  const mid = from + (to - from) * 0.4;
  const ref = useScrollStyle<HTMLDivElement>(
    progress,
    fromY === 0
      ? { input: [at(from), at(to)], opacity: [0, 1] }
      : { input: [at(from), at(mid), at(to)], opacity: [0, 1, 1], y: [fromY, fromY * 0.6, 0] }
  );
  return (
    <div ref={ref} style={{ opacity: 0 }} className={className}>
      {children}
    </div>
  );
}

/** Fenster, in dem sich Backlight und Anzeige "einschalten". */
const POWER_ON: [number, number] = [0.66, 0.78];

export default function LcmAssembly({ scrollYProgress, infoSlots, compact }: SystemVisualProps) {
  const rootRef = useScrollStyle<HTMLDivElement>(scrollYProgress, VISUAL_FADE_IN);

  // Finale: Backlight leuchtet auf, Segmente werden kontrastreich sichtbar
  const glowRef = useScrollStyle<HTMLDivElement>(scrollYProgress, {
    input: [at(POWER_ON[0]), at(POWER_ON[1])],
    opacity: [0, 1],
  });
  const segmentsRef = useScrollStyle<SVGGElement>(scrollYProgress, {
    input: [at(POWER_ON[0]), at(POWER_ON[1])],
    opacity: [0.12, 0.92],
  });

  // Kompakt: die drei Info-Karten nacheinander, in der Reihenfolge, in der die
  // zugehörigen Bauteile ins Bild kommen (Housing → Deckglas).
  const captions: StageCaption[] = useMemo(
    () => [
      { ...infoSlots[2], at: 0.2 },
      { ...infoSlots[1], at: 0.44 },
      { ...infoSlots[0], at: 0.58 },
      { ...QUALIFICATION, at: QUALIFICATION_AT },
    ],
    [infoSlots]
  );
  const active = useActiveCaption(scrollYProgress, captions, compact);

  const partBase = 'absolute w-64 md:w-96 aspect-[4/3] rounded-2xl';

  return (
    <div ref={rootRef} style={{ opacity: 0 }} className="absolute inset-0 pointer-events-none">
      {/* Kompakt: zentriert im Raum zwischen Navbar und Textkarte */}
      <div
        className={`absolute inset-x-0 flex items-center justify-center ${
          compact ? 'top-16 bottom-[14.5rem]' : 'inset-y-0'
        }`}
      >
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">

          {/* 1. Backlight-Housing mit Schnapphaken und Gewindeeinsätzen – von unten */}
          <Part
            progress={scrollYProgress}
            from={0.02}
            to={0.22}
            fromY={320}
            className="absolute w-72 md:w-[26rem] aspect-[4/3] rounded-2xl bg-slate-800 border border-slate-600 z-[51] shadow-2xl"
          >
            <div className="absolute inset-3 rounded-xl bg-slate-700/60" />
            {/* Schnapphaken links/rechts */}
            <div className="absolute -left-2 top-[22%] w-2 h-8 bg-slate-500 rounded-l-md" />
            <div className="absolute -left-2 bottom-[22%] w-2 h-8 bg-slate-500 rounded-l-md" />
            <div className="absolute -right-2 top-[22%] w-2 h-8 bg-slate-500 rounded-r-md" />
            <div className="absolute -right-2 bottom-[22%] w-2 h-8 bg-slate-500 rounded-r-md" />
            {/* Gewindeeinsätze (Messing) in den Ecken */}
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full border-2 border-amber-600/80 bg-slate-900" />
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-amber-600/80 bg-slate-900" />
            <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full border-2 border-amber-600/80 bg-slate-900" />
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full border-2 border-amber-600/80 bg-slate-900" />
          </Part>

          {/* 2. LED-Backlight – von unten */}
          <Part
            progress={scrollYProgress}
            from={0.12}
            to={0.32}
            fromY={200}
            className={`${partBase} bg-white border border-gray-200 z-[52]`}
          >
            <div
              ref={glowRef}
              style={{ opacity: 0 }}
              className="absolute inset-0 rounded-2xl bg-[#fdfbe8] shadow-[0_0_60px_rgba(253,249,205,0.9)]"
            />
            {/* LED-Zeile am unteren Rand */}
            <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-300" />
              ))}
            </div>
          </Part>

          {/* 3. Monochrome LCD-Zelle mit Segment-Anzeige – der ruhende Anker */}
          <Part
            progress={scrollYProgress}
            from={0}
            to={0.08}
            className={`${partBase} bg-gradient-to-b from-[#cdd6c4] to-[#b8c4ae] border border-gray-400 z-[53] shadow-inner overflow-hidden`}
          >
            <svg viewBox="0 0 240 120" className="absolute inset-0 w-full h-full p-3">
              <g ref={segmentsRef} style={{ opacity: 0.12 }}>
                {/* Batterie-Symbol */}
                <g transform="translate(12,10)">
                  <rect x={0} y={0} width={30} height={14} rx={2} fill="none" stroke="#1e293b" strokeWidth={2} />
                  <rect x={31} y={4} width={3} height={6} fill="#1e293b" />
                  <rect x={3} y={3} width={7} height={8} fill="#1e293b" />
                  <rect x={12} y={3} width={7} height={8} fill="#1e293b" />
                  <rect x={21} y={3} width={7} height={8} fill="#1e293b" />
                </g>
                {/* Messwert "88.8 V" */}
                <SegmentDigit x={62} y={32} />
                <SegmentDigit x={108} y={32} />
                <circle cx={156} cy={94} r={3.5} fill="#1e293b" />
                <SegmentDigit x={166} y={32} />
                <text x={212} y={96} fontSize={20} fontWeight={700} fill="#1e293b" fontFamily="inherit">V</text>
                {/* Status-Balken */}
                <rect x={12} y={102} width={18} height={7} rx={2} fill="#1e293b" />
                <rect x={34} y={102} width={18} height={7} rx={2} fill="#1e293b" opacity={0.55} />
                <rect x={56} y={102} width={18} height={7} rx={2} fill="#1e293b" opacity={0.3} />
              </g>
            </svg>
          </Part>

          {/* 4. Touch-Sensor – von oben */}
          <Part
            progress={scrollYProgress}
            from={0.3}
            to={0.5}
            fromY={-260}
            className={`${partBase} border border-brand-200/70 bg-brand-50/10 z-[54] bg-[repeating-linear-gradient(45deg,rgba(0,132,196,0.07)_0px,rgba(0,132,196,0.07)_1px,transparent_1px,transparent_10px)]`}
          />

          {/* 5. Deckglas mit Siebdruck-Passepartout – von oben */}
          <Part
            progress={scrollYProgress}
            from={0.42}
            to={0.62}
            fromY={-360}
            className={`${partBase} z-[55] overflow-hidden border border-gray-300 shadow-xl`}
          >
            <div className="absolute inset-0 rounded-2xl border-[14px] md:border-[18px] border-brand-800" />
            <div className="absolute inset-[14px] md:inset-[18px] ring-1 ring-white/40 rounded-sm" />
            <span className="absolute top-[3px] md:top-[5px] left-1/2 -translate-x-1/2 text-white/90 text-[7px] md:text-[9px] font-bold tracking-[0.3em]">
              VICTRONIC
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/25 via-transparent to-transparent" />
          </Part>

          {/* infoSlots als Callouts an den passenden Bauteilen (nur breit) */}
          {!compact && (
            <>
              <Callout
                slot={infoSlots[0]}
                progress={scrollYProgress}
                from={0.64}
                to={0.72}
                className="left-1/2 ml-[14rem] top-[26%]"
              />
              <Callout
                slot={infoSlots[1]}
                progress={scrollYProgress}
                from={0.56}
                to={0.64}
                className="right-1/2 mr-[14rem] top-[42%]"
              />
              <Callout
                slot={infoSlots[2]}
                progress={scrollYProgress}
                from={0.24}
                to={0.32}
                className="left-1/2 ml-[15rem] top-[52%]"
              />
            </>
          )}
        </div>
      </div>

      {compact && <StageCaptions captions={captions} active={active} />}
    </div>
  );
}
