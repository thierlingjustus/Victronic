import { motion, useTransform, MotionValue } from 'motion/react';
import type { InfoSlot } from '../../data/systems';
import VisualCallout from './VisualCallout';

/**
 * Scroll-Visualisierung für "LCM/LCD mit Touch": Montage statt Explosion.
 * Fünf Bauteile (Backlight-Housing mit Schnapphaken, LED-Backlight, monochrome
 * LCD-Zelle, Touch-Sensor, siebbedrucktes Deckglas) schweben beim Scrollen
 * zusammen; zum Schluss "schaltet sich" die Segment-Anzeige ein.
 * Referenz: Victronic Key Facts S. 2 (LCD-Modul + Backlight-Housing) und die
 * monochromen VA-/Segment-Displays der Displaytechnologien-Präsentation.
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

export default function LcmAssembly({
  scrollYProgress,
  infoSlots,
}: {
  scrollYProgress: MotionValue<number>;
  infoSlots: InfoSlot[];
}) {
  // Gleiches Sichtbarkeits-Fenster wie die TFT-Explosion, damit Intro/Outro
  // auf allen Detailseiten identisch getaktet bleiben.
  const progress = useTransform(scrollYProgress, [0.15, 0.8], [0, 1]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 0.9], [0, 1, 1, 0]);

  // Bauteile docken gestaffelt an: Housing & Backlight von unten,
  // Touch & Deckglas von oben, die LCD-Zelle ist der ruhende Anker.
  const housingY = useTransform(progress, [0.02, 0.22], [320, 0]);
  const housingOpacity = useTransform(progress, [0.02, 0.1], [0, 1]);
  const backlightY = useTransform(progress, [0.12, 0.32], [200, 0]);
  const backlightOpacity = useTransform(progress, [0.12, 0.2], [0, 1]);
  const lcdOpacity = useTransform(progress, [0, 0.08], [0, 1]);
  const touchY = useTransform(progress, [0.3, 0.5], [-260, 0]);
  const touchOpacity = useTransform(progress, [0.3, 0.38], [0, 1]);
  const glassY = useTransform(progress, [0.42, 0.62], [-360, 0]);
  const glassOpacity = useTransform(progress, [0.42, 0.5], [0, 1]);

  // Finale: Backlight leuchtet auf, Segmente werden kontrastreich sichtbar
  const powerOn = useTransform(progress, [0.66, 0.78], [0, 1]);
  const segmentOpacity = useTransform(powerOn, [0, 1], [0.12, 0.92]);

  const calloutGlass = useTransform(progress, [0.64, 0.72], [0, 1]);
  const calloutPrint = useTransform(progress, [0.56, 0.64], [0, 1]);
  const calloutHooks = useTransform(progress, [0.24, 0.32], [0, 1]);

  const partBase = 'absolute w-64 md:w-96 aspect-[4/3] rounded-2xl';

  return (
    <motion.div
      style={{ opacity: visualOpacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">

        {/* 1. Backlight-Housing mit Schnapphaken und Gewindeeinsätzen */}
        <motion.div
          style={{ y: housingY, opacity: housingOpacity }}
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
        </motion.div>

        {/* 2. LED-Backlight */}
        <motion.div
          style={{ y: backlightY, opacity: backlightOpacity }}
          className={`${partBase} bg-white border border-gray-200 z-[52]`}
        >
          <motion.div
            style={{ opacity: powerOn }}
            className="absolute inset-0 rounded-2xl bg-[#fdfbe8] shadow-[0_0_60px_rgba(253,249,205,0.9)]"
          />
          {/* LED-Zeile am unteren Rand */}
          <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-300" />
            ))}
          </div>
        </motion.div>

        {/* 3. Monochrome LCD-Zelle mit Segment-Anzeige */}
        <motion.div
          style={{ opacity: lcdOpacity }}
          className={`${partBase} bg-gradient-to-b from-[#cdd6c4] to-[#b8c4ae] border border-gray-400 z-[53] shadow-inner overflow-hidden`}
        >
          <svg viewBox="0 0 240 120" className="absolute inset-0 w-full h-full p-3">
            <motion.g style={{ opacity: segmentOpacity }}>
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
            </motion.g>
          </svg>
        </motion.div>

        {/* 4. Touch-Sensor */}
        <motion.div
          style={{ y: touchY, opacity: touchOpacity }}
          className={`${partBase} border border-brand-200/70 bg-brand-50/10 z-[54] bg-[repeating-linear-gradient(45deg,rgba(0,132,196,0.07)_0px,rgba(0,132,196,0.07)_1px,transparent_1px,transparent_10px)]`}
        />

        {/* 5. Deckglas mit Siebdruck-Passepartout */}
        <motion.div
          style={{ y: glassY, opacity: glassOpacity }}
          className={`${partBase} z-[55] overflow-hidden border border-gray-300 shadow-xl`}
        >
          <div className="absolute inset-0 rounded-2xl border-[14px] md:border-[18px] border-brand-800" />
          <div className="absolute inset-[14px] md:inset-[18px] ring-1 ring-white/40 rounded-sm" />
          <span className="absolute top-[3px] md:top-[5px] left-1/2 -translate-x-1/2 text-white/90 text-[7px] md:text-[9px] font-bold tracking-[0.3em]">
            VICTRONIC
          </span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/25 via-transparent to-transparent" />
        </motion.div>

        {/* infoSlots als Callouts an den passenden Bauteilen */}
        <VisualCallout
          slot={infoSlots[0]}
          opacity={calloutGlass}
          className="left-1/2 ml-[9.5rem] md:ml-[14rem] top-[24%] md:top-[26%]"
        />
        <VisualCallout
          slot={infoSlots[1]}
          opacity={calloutPrint}
          className="right-1/2 mr-[9.5rem] md:mr-[14rem] top-[42%]"
        />
        <VisualCallout
          slot={infoSlots[2]}
          opacity={calloutHooks}
          className="left-1/2 ml-[10.5rem] md:ml-[15rem] top-[52%]"
        />

      </div>
    </motion.div>
  );
}
