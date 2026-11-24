import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { MotionValue } from 'motion/react';
import { useScrollStyle } from '../product/useScrollStyle';
import StageCaptions, { useActiveCaption, type StageCaption } from './StageCaptions';
import { QUALIFICATION, QUALIFICATION_AT, VISUAL_FADE_IN } from './shared';

/**
 * Scroll-gesteuerte Explosionsgrafik des TFT-mit-Touch-Aufbaus
 * (exklusiv für id === "tft-touch").
 *
 * Zehn Schichten: ganz oben der kapazitive Touch-Sensor – genau das, was
 * dieses System vom Produkt "TFT Displays" unterscheidet –, darunter die neun
 * Schichten des Displays. Ein früherer Umbau auf zwölf Schichten hat die
 * Grafik überladen; er ist bewusst zurückgenommen.
 *
 * Beschriftet werden die Schichten nicht mehr mit Karten neben der Grafik,
 * sondern in der Legende rechts (SystemDetail.tsx, Inhalt aus TFT_LAYER_LEGEND).
 * Damit Zeile und Schicht zusammenfinden, trägt jede Platte dieselbe Nummer
 * wie ihre Legendenzeile (LayerNumber, an der rechten Spitze – dort schaut
 * jede Schicht unter der darüberliegenden hervor). Zusätzlich läuft eine
 * Hervorhebung von vorn nach hinten durch: die beschriebene Schicht bekommt
 * einen Rahmen und eine blaue Nummer, die übrigen treten zurück, und die
 * Legende färbt dieselbe Zeile ein (onActiveLayer). Kompakt (unter 1280 px)
 * übernimmt die Textkarte am unteren Rand die Legende.
 *
 * Gut erkennbar sein müssen vor allem die beiden Enden des Stapels: vorn der
 * Touch-Sensor (kräftiges Raster, Anschlussfahne, ein Finger tippt darauf) und
 * hinten die Beleuchtung (warmer Leuchtschein mit LED-Leiste) – vorher waren
 * beide auf dem weißen Grund kaum zu sehen.
 *
 * Die Kippung ist eine reine 2D-Abbildung (drehen, dann in der Höhe stauchen)
 * statt rotateX in einem preserve-3d-Kontext. Das Bild ist praktisch dasselbe,
 * aber z-index greift wieder normal und der Browser braucht keinen 3D-Kontext
 * mit zehn Ebenen zu sortieren.
 */

type LayerDef = {
  name: string;
  desc: string;
  content: ReactNode;
  className: string;
};

/** Rautenraster wie das ITO-Gitter in product/visuals/TouchPanel.tsx */
const ITO_GRID =
  "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIxNSI+PHBhdGggZD0iTTEzIDAuNSBMMjUuNSA3LjUgTDEzIDE0LjUgTDAuNSA3LjUgWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBhMGU4IiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]";

const LAYERS: LayerDef[] = [
  {
    name: 'Touch-Sensor',
    desc: 'Kapazitives ITO-Raster, erkennt den Finger',
    content: (
      <>
        <div className={`absolute inset-0 rounded-2xl ${ITO_GRID}`} />
        {/* Anschlussfahne zum Touch-Controller */}
        <div className="absolute left-1/2 -bottom-7 h-7 w-16 -translate-x-1/2 rounded-b-md bg-amber-500/90" />
      </>
    ),
    className: 'bg-brand-100/70 border-2 border-brand-500',
  },
  {
    name: 'Front-Polarisator',
    desc: 'Lässt nur Licht einer Schwingungsrichtung durch',
    content: <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-800 via-brand-500 to-brand-200" />,
    className: 'bg-transparent border-gray-200 shadow-2xl',
  },
  {
    name: 'Glas',
    desc: 'Obere Glasplatte mit Farbfilter',
    content: <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent rounded-2xl" />,
    className: 'bg-white/10 border-gray-300',
  },
  {
    name: 'Farbfilter',
    desc: 'Erzeugt die roten, grünen und blauen Subpixel',
    content: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjYiIGZpbGw9InJlZCIgb3BhY2l0eT0iMC4zIi8+PHJlY3QgeD0iMiIgd2lkdGg9IjIiIGhlaWdodD0iNiIgZmlsbD0iZ3JlZW4iIG9wYWNpdHk9IjAuMyIvPjxyZWN0IHg9IjQiIHdpZHRoPSIyIiBoZWlnaHQ9IjYiIGZpbGw9ImJsdWUiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')] rounded-2xl opacity-50" />,
    className: 'bg-transparent border-gray-200',
  },
  {
    name: 'Gegen-Elektrode',
    desc: 'Gemeinsame, durchsichtige Elektrode (ITO)',
    content: <div className="absolute inset-0 bg-gray-100/10 rounded-2xl border border-gray-200" />,
    className: 'bg-transparent border-gray-200',
  },
  {
    name: 'Flüssigkristall',
    desc: 'Dreht das Licht – je nach Spannung mehr oder weniger',
    content: <div className="absolute inset-0 bg-gradient-to-b from-brand-500/15 to-brand-600/15 rounded-2xl" />,
    className: 'bg-transparent border-brand-200',
  },
  {
    name: 'Transistor (TFT)',
    desc: 'Aktive Matrix: ein Dünnschichttransistor je Subpixel',
    content: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xMCAxMGgxMHYxMEgxMHoiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] rounded-2xl" />,
    className: 'bg-white/90 border-gray-300',
  },
  {
    name: 'Pixel-Elektrode',
    desc: 'Legt die Spannung an jeden einzelnen Subpixel',
    content: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] rounded-2xl" />,
    className: 'bg-transparent border-gray-200',
  },
  {
    name: 'Rear-Polarisator',
    desc: 'Polarisiert das Licht der Beleuchtung',
    content: <div className="absolute inset-0 bg-slate-900/90 rounded-2xl" />,
    className: 'bg-transparent border-slate-700',
  },
  {
    name: 'Beleuchtung',
    desc: 'LED-Hintergrundbeleuchtung, die Lichtquelle',
    content: (
      <>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-100" />
        {/* LED-Leiste an der Kante, die hinter dem Rear-Polarisator hervorschaut */}
        <div className="absolute inset-x-4 bottom-2 flex justify-between">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="block h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_3px_rgba(251,191,36,0.7)]" />
          ))}
        </div>
      </>
    ),
    className: 'bg-amber-50 border-amber-300 shadow-[0_0_60px_rgba(251,191,36,0.55)]',
  },
];

/** Inhalt der Legende neben der Grafik (SystemDetail.tsx), von vorn nach hinten. */
export const TFT_LAYER_LEGEND = LAYERS.map(({ name, desc }) => ({ title: name, desc }));

/** Versatz-Faktor je Schicht: -5 (Touch, ganz vorn) bis +4 (Beleuchtung). */
const FACTORS = LAYERS.map((_, i) => i - 5);

/**
 * Breit: waagerechter Versatz je Faktor und das Fenster, in dem er aufgeht.
 * Ohne Beschriftungskarten an den Seiten reicht ein schmalerer Fächer – so
 * passt die Grafik neben die Legende.
 */
const WIDE_SPREAD_X = 40;
const WIDE_WINDOW = [0.15, 0.8];
/** Kompakt geht die Explosion schneller auf – danach laufen die Texte durch. */
const COMPACT_WINDOW = [0.12, 0.3];

/** Kippung der Platten: erst drehen, dann in der Höhe stauchen. */
const TILT = 'scaleY(0.5) rotate(-45deg)';
/** Eine gekippte 4:3-Platte der Breite w ist 1,237·w breit und 0,619·w hoch. */
const TILT_WIDTH = 1.237;
const TILT_HEIGHT = 0.619;
/** Plattenbreite in der breiten Darstellung (w-80). */
const WIDE_PLATE = 320;

/** Startpunkte der Hervorhebung: kompakt mit Textkarte, breit mit Legende. */
const CAPTION_START = 0.3;
const CAPTION_STEP = 0.044;
/** Breit erst, wenn die Nummern da sind (NUMBER_FADE) und nicht mehr überlappen. */
const WIDE_CAPTION_START = 0.5;
const WIDE_CAPTION_STEP = 0.028;
/** Breit: danach endet die Hervorhebung, alle Schichten stehen wieder gleich. */
const WIDE_CAPTION_END = 0.8;
/** Nummern blenden ein, sobald die Platten weit genug auseinander stehen. */
const NUMBER_FADE = { compact: [0.24, 0.3], wide: [0.42, 0.5] };

/**
 * Plattenbreite und senkrechter Abstand für die kompakte Darstellung, passend
 * zum freien Raum zwischen Navbar und Textkarte.
 */
function useCompactGeometry(compact: boolean) {
  const [geo, setGeo] = useState({ width: 280, spread: 30 });

  useEffect(() => {
    if (!compact) return;
    const measure = () => {
      const width = Math.round(Math.min(340, (window.innerWidth - 32) / TILT_WIDTH));
      // Oben die Navbar (64 px) samt Platz für den Finger, unten Textkarte
      // samt Abstand (200 px).
      const free = window.innerHeight - 64 - 200 - 64;
      const spread = Math.max(12, Math.min(38, (free - width * TILT_HEIGHT) / (LAYERS.length - 1)));
      setGeo((prev) => (prev.width === width && prev.spread === spread ? prev : { width, spread }));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [compact]);

  return geo;
}

/**
 * Senkrechter Versatz je Faktor in der breiten Darstellung. Die oberste Platte
 * (Faktor -5, die Gruppe ist um 56 px angehoben) muss samt Finger unter der
 * Navbar bleiben; auf niedrigen Fenstern wird die Explosion deshalb flacher.
 */
function useWideSpreadY(enabled: boolean) {
  const [spread, setSpread] = useState(44);

  useEffect(() => {
    if (!enabled) return;
    const measure = () => {
      const halfPlate = (WIDE_PLATE * TILT_HEIGHT) / 2;
      const room = window.innerHeight / 2 - 56 - halfPlate - 72;
      setSpread(Math.max(24, Math.min(46, Math.floor(room / 5))));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [enabled]);

  return spread;
}

/** Finger, der auf die Mitte des Touch-Sensors tippt, mit Berührungsringen. */
function Finger({ progress, compact }: { progress: MotionValue<number>; compact: boolean }) {
  const ref = useScrollStyle<HTMLDivElement>(
    progress,
    compact ? { input: [0.26, 0.3], opacity: [0, 1], y: [-16, 0] } : { input: [0.6, 0.7], opacity: [0, 1], y: [-24, 0] }
  );
  return (
    <div ref={ref} style={{ opacity: 0 }} className="absolute left-1/2 top-1/2 pointer-events-none">
      {/* Ringe liegen flach auf der gekippten Platte, deshalb gestaucht */}
      <svg width="140" height="70" viewBox="0 0 140 70" className="absolute -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <ellipse cx="70" cy="35" rx="28" ry="14" fill="none" stroke="#00a0e8" strokeWidth="2" opacity="0.8" />
        <ellipse cx="70" cy="35" rx="52" ry="26" fill="none" stroke="#00a0e8" strokeWidth="1.5" opacity="0.45" />
      </svg>
      {/* Fingerkuppe von hinten gesehen, Spitze auf der Plattenmitte */}
      <svg width="40" height="76" viewBox="0 0 40 76" className="absolute -translate-x-1/2 -translate-y-full" aria-hidden="true">
        <rect x="2" y="2" width="36" height="72" rx="18" fill="#ffffff" stroke="#475569" strokeWidth="2.5" />
        <path d="M11 56 Q20 66 29 56" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * Nummer einer Schicht wie in der Legende. Sitzt an der rechten Spitze der
 * gekippten Platte (bei 4:3 und Breite w: 0,619·w rechts, 0,044·w über der
 * Mitte), leicht nach innen gerückt – so bleibt sie auch auf dem Handy im Bild,
 * und die Platte darüber verdeckt sie nicht.
 */
function LayerNumber({
  index,
  progress,
  compact,
  plateWidth,
  active,
}: {
  index: number;
  progress: MotionValue<number>;
  compact: boolean;
  plateWidth: number;
  active: boolean;
}) {
  const ref = useScrollStyle<HTMLSpanElement>(progress, {
    input: compact ? NUMBER_FADE.compact : NUMBER_FADE.wide,
    opacity: [0, 1],
  });
  const tipX = plateWidth * 0.619 - 18;
  const tipY = -plateWidth * 0.044;
  return (
    <span
      ref={ref}
      style={{ opacity: 0, left: `calc(50% + ${tipX}px)`, top: `calc(50% + ${tipY}px)` }}
      className={`absolute z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[10px] font-bold tabular-nums shadow-sm transition-colors duration-300 ${
        active ? 'border-brand-600 bg-brand-600 text-white' : 'border-gray-300 bg-white text-gray-700'
      }`}
    >
      {String(index + 1).padStart(2, '0')}
    </span>
  );
}

function Plate({
  layer,
  index,
  progress,
  compact,
  spread,
  wideSpreadY,
  width,
  highlight,
}: {
  layer: LayerDef;
  index: number;
  progress: MotionValue<number>;
  compact: boolean;
  spread: number;
  wideSpreadY: number;
  width: number;
  /** 'active' = diese Schicht wird gerade beschrieben, 'dim' = eine andere. */
  highlight: 'none' | 'active' | 'dim';
}) {
  const f = FACTORS[index];
  const ref = useScrollStyle<HTMLDivElement>(
    progress,
    compact
      ? { input: COMPACT_WINDOW, x: [0, 0], y: [0, f * spread] }
      : { input: WIDE_WINDOW, x: [0, f * WIDE_SPREAD_X], y: [0, f * wideSpreadY] }
  );

  return (
    <div
      ref={ref}
      className={`absolute aspect-[4/3] ${compact ? '' : 'w-80'}`}
      // Oberste Schicht liegt vorn.
      style={{ zIndex: 60 - index, width: compact ? width : undefined }}
    >
      <div
        className={`absolute inset-0 rounded-2xl border transition-[opacity,outline-color] duration-300 outline outline-2 outline-offset-2 ${
          highlight === 'active' ? 'outline-brand-500' : 'outline-transparent'
        } ${highlight === 'dim' ? 'opacity-50' : 'opacity-100'} ${layer.className}`}
        style={{ transform: TILT }}
      >
        {layer.content}
      </div>
      {index === 0 && <Finger progress={progress} compact={compact} />}
      <LayerNumber
        index={index}
        progress={progress}
        compact={compact}
        plateWidth={compact ? width : WIDE_PLATE}
        active={highlight === 'active'}
      />
      {/* Nummer liegt über der eigenen Platte; die Platten darüber reichen
          an dieser Stelle nicht heran (siehe LayerNumber). */}
    </div>
  );
}

export default function TftExplosion({
  scrollYProgress,
  compact,
  onActiveLayer,
}: {
  scrollYProgress: MotionValue<number>;
  compact: boolean;
  /** Meldet die gerade beschriebene Schicht (-1 = keine) für die Legende. */
  onActiveLayer?: (index: number) => void;
}) {
  const rootRef = useScrollStyle<HTMLDivElement>(scrollYProgress, VISUAL_FADE_IN);
  const { width, spread } = useCompactGeometry(compact);
  const wideSpreadY = useWideSpreadY(!compact);

  const captions: StageCaption[] = useMemo(
    () => [
      ...LAYERS.map((layer, i) => ({
        title: layer.name,
        desc: layer.desc,
        at: compact ? CAPTION_START + i * CAPTION_STEP : WIDE_CAPTION_START + i * WIDE_CAPTION_STEP,
      })),
      { ...QUALIFICATION, at: compact ? QUALIFICATION_AT : WIDE_CAPTION_END },
    ],
    [compact]
  );
  const active = useActiveCaption(scrollYProgress, captions);
  // Nur die zehn Schichten heben etwas hervor, die Qualifizierung nicht.
  const activeLayer = active >= 0 && active < LAYERS.length ? active : -1;

  useEffect(() => {
    onActiveLayer?.(activeLayer);
  }, [activeLayer, onActiveLayer]);

  return (
    <div ref={rootRef} style={{ opacity: 0 }} className="absolute inset-0 pointer-events-none">
      {/* Kompakt: zentriert im Raum zwischen Navbar und Textkarte. Breit: etwas
          angehoben, damit unten die Prozessleiste Platz hat. */}
      <div
        className={`absolute inset-x-0 flex items-center justify-center ${
          compact ? 'top-28 bottom-[12.5rem] lg:bottom-[19rem]' : 'inset-y-0'
        }`}
      >
        <div className={`relative w-full max-w-4xl flex items-center justify-center ${compact ? '' : '-translate-y-14'}`}>
          {LAYERS.map((layer, i) => (
            <Plate
              key={layer.name}
              layer={layer}
              index={i}
              progress={scrollYProgress}
              compact={compact}
              spread={spread}
              wideSpreadY={wideSpreadY}
              width={width}
              highlight={activeLayer < 0 ? 'none' : activeLayer === i ? 'active' : 'dim'}
            />
          ))}
        </div>
      </div>

      {compact && <StageCaptions captions={captions} active={active} />}
    </div>
  );
}
