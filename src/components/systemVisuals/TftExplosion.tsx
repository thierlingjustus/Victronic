import { useEffect, useState, type ReactNode } from 'react';
import type { MotionValue } from 'motion/react';
import { useScrollStyle } from '../product/useScrollStyle';

/**
 * Scroll-gesteuerte Explosionsgrafik des TFT-mit-Touch-Aufbaus.
 *
 * Die Seite heißt "TFT mit Touch", zeigte aber lange nur den reinen
 * LCD-Aufbau – genau der Teil, der dieses System vom Produkt "TFT Displays"
 * unterscheidet, fehlte. Deckglas, kapazitiver Touch-Sensor und Optical
 * Bonding liegen deshalb jetzt oben auf dem Stapel, passend zur Caption von
 * tft-ctp-exploded.jpg in products.ts.
 *
 * Der Versatz wird aus dem Index gerechnet ((i - (n-1)/2) * spread) statt aus
 * neun hartkodierten Transform-Paaren – sonst geht die Rechnung mit zwölf
 * Schichten nicht mehr auf. Jede Schicht ist eine eigene Unterkomponente und
 * berechnet ihre Transforms selbst; damit bleibt die Hook-Zahl unabhängig von
 * der Zahl der Schichten (dasselbe Muster wie StageFact in ProductStage).
 *
 * Scrollgebundene Werte laufen über useScrollStyle, nicht über motion mit
 * useTransform – Begründung in useScrollStyle.ts. Wichtig dabei: der Hook
 * überschreibt style.transform komplett, deshalb sitzt die feste
 * Isometrie-Drehung auf einem inneren div.
 */

/** Fenster der Explosion in scrollYProgress-Koordinaten. */
const EXPLODE: [number, number] = [0.15, 0.8];
/** Diagonaler Endversatz je Schritt. Bei zwölf Schichten enger als früher. */
const SPREAD = 36;

/** Rautenraster des ITO-Sensors, analog zum Muster in TouchPanel.tsx. */
const ITO_GRID =
  "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIxNSI+PHBhdGggZD0iTTEzIDAuNSBMMjUuNSA3LjUgTDEzIDE0LjUgTDAuNSA3LjUgWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBhMGU4IiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')";

type LayerData = {
  name: string;
  desc: string;
  side: 'left' | 'right';
  content: ReactNode;
  className: string;
};

/**
 * Aufbau von vorn (Bedienseite) nach hinten (Beleuchtung).
 * Pixel-Elektrode steht vor dem Transistor: die Elektrode liegt auf dem
 * TFT-Array zum Flüssigkristall hin, der Transistor sitzt darunter auf dem
 * Trägerglas.
 */
const LAYERS: LayerData[] = [
  {
    name: 'Deckglas',
    desc: 'Chemisch oder physikalisch gehärtet, AG/AR/AF veredelt',
    side: 'left',
    content: (
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/50 via-white/10 to-white/40" />
    ),
    className: 'bg-white/10 border-gray-200',
  },
  {
    name: 'Kapazitiver Touch-Sensor',
    desc: 'Projiziert-kapazitives ITO-Raster für Multi-Touch',
    side: 'right',
    content: (
      <div
        className="absolute inset-0 rounded-2xl opacity-60"
        style={{ backgroundImage: ITO_GRID }}
      />
    ),
    className: 'bg-brand-50/40 border-brand-200',
  },
  {
    name: 'Optical Bonding',
    desc: 'OCA-Verklebung zwischen Touch und Display – alternativ Air Bonding',
    side: 'left',
    content: <div className="absolute inset-0 rounded-2xl bg-brand-100/25" />,
    className: 'bg-transparent border-brand-100',
  },
  {
    name: 'Front-Polarisator',
    desc: 'High-Res Bildschirmoberfläche',
    side: 'right',
    content: (
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-800 via-brand-500 to-brand-200" />
    ),
    className: 'bg-transparent border-gray-200 shadow-2xl',
  },
  {
    name: 'Farbfilter-Trägerglas',
    desc: 'Substrat der Farbfilterebene',
    side: 'left',
    content: (
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl backdrop-blur-sm" />
    ),
    className: 'bg-white/10 border-gray-300',
  },
  {
    name: 'Farbfilter',
    desc: 'Erzeugt die RGB-Subpixel',
    side: 'right',
    content: (
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjYiIGZpbGw9InJlZCIgb3BhY2l0eT0iMC4zIi8+PHJlY3QgeD0iMiIgd2lkdGg9IjIiIGhlaWdodD0iNiIgZmlsbD0iZ3JlZW4iIG9wYWNpdHk9IjAuMyIvPjxyZWN0IHg9IjQiIHdpZHRoPSIyIiBoZWlnaHQ9IjYiIGZpbGw9ImJsdWUiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')] rounded-2xl opacity-50" />
    ),
    className: 'bg-transparent border-gray-200',
  },
  {
    name: 'Gegen-Elektrode',
    desc: 'Gemeinsamer elektrischer Pol',
    side: 'left',
    content: <div className="absolute inset-0 bg-gray-100/10 rounded-2xl border border-gray-200" />,
    className: 'bg-transparent border-gray-200',
  },
  {
    name: 'Flüssigkristall',
    desc: 'Steuert die Lichtdurchlässigkeit',
    side: 'right',
    content: (
      <div className="absolute inset-0 bg-gradient-to-b from-brand-500/10 to-brand-600/10 rounded-2xl backdrop-blur-md" />
    ),
    className: 'bg-transparent border-brand-200',
  },
  {
    name: 'Pixel-Elektrode',
    desc: 'Individuelle Pixel-Ansteuerung',
    side: 'left',
    content: (
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMikiLz48L3N2Zz4=')] rounded-2xl" />
    ),
    className: 'bg-transparent border-gray-200',
  },
  {
    name: 'Transistor (TFT)',
    desc: 'Aktive Matrix zur Pixelsteuerung',
    side: 'right',
    content: (
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xMCAxMGgxMHYxMEgxMHoiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] rounded-2xl" />
    ),
    className: 'bg-white/90 border-gray-300',
  },
  {
    name: 'Rear-Polarisator',
    desc: 'Polarisiert das Hintergrundlicht',
    side: 'left',
    content: <div className="absolute inset-0 bg-slate-900/90 rounded-2xl" />,
    className: 'bg-transparent border-slate-700',
  },
  {
    name: 'Beleuchtung',
    desc: 'LED-Hintergrundbeleuchtung',
    side: 'right',
    content: (
      <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.9)]" />
    ),
    className: 'bg-white border-gray-200',
  },
];

/** Diagonaler Endversatz der Schicht i – Mitte des Stapels bleibt stehen. */
const offset = (i: number, n: number) => (i - (n - 1) / 2) * SPREAD;

const LAYER_BOX = 'absolute w-64 md:w-96 aspect-[4/3]';
const LAYER_FACE =
  'absolute inset-0 rounded-2xl border flex items-center justify-center transition-shadow duration-300';

/** Eine Schicht: außen der scrollgebundene Versatz, innen die feste Drehung. */
function Layer({
  layer,
  index,
  total,
  progress,
  reducedMotion,
}: {
  layer: LayerData;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const d = offset(index, total);
  const ref = useScrollStyle<HTMLDivElement>(
    progress,
    { input: EXPLODE, x: [0, d], y: [0, d] },
    reducedMotion
  );
  return (
    <div ref={ref} className={LAYER_BOX} style={{ zIndex: 62 - index }}>
      <div
        className={`${LAYER_FACE} ${layer.className}`}
        style={{ transform: 'rotateX(60deg) rotateZ(-45deg)' }}
      >
        {layer.content}
      </div>
    </div>
  );
}

/** Beschriftung einer Schicht – fährt mit und blendet verzögert ein. */
function Tooltip({
  layer,
  index,
  total,
  progress,
  reducedMotion,
}: {
  layer: LayerData;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const d = offset(index, total);
  const [a, b] = EXPLODE;
  // Erst fährt die Geometrie auseinander, danach kommen die Bezeichnungen.
  const fadeStart = a + (b - a) * 0.3;
  const fadeEnd = a + (b - a) * 0.6;
  const ref = useScrollStyle<HTMLDivElement>(
    progress,
    {
      input: [a, fadeStart, fadeEnd, b],
      opacity: [0, 0, 1, 1],
      x: [0, d * 0.3, d * 0.6, d],
      y: [0, d * 0.3, d * 0.6, d],
    },
    reducedMotion
  );
  const isLeft = layer.side === 'left';
  return (
    <div
      ref={ref}
      style={{ opacity: 0, zIndex: 65 }}
      className={`absolute w-40 md:w-56 ${
        isLeft ? 'mr-[10rem] md:mr-[13rem] text-right right-1/2' : 'ml-[10rem] md:ml-[13rem] left-1/2'
      }`}
    >
      <div
        className="hidden md:block h-[1px] w-8 bg-brand-600 absolute top-4 opacity-50"
        style={{ [isLeft ? 'right' : 'left']: '-2rem' }}
      />
      <div className="bg-white/95 backdrop-blur-xl p-3 rounded-xl border border-gray-200 shadow-xl">
        <h3 className="text-brand-700 font-bold text-[10px] md:text-xs uppercase tracking-wider">{layer.name}</h3>
        <p className="text-gray-600 text-[9px] md:text-[10px] mt-1 leading-tight">{layer.desc}</p>
      </div>
    </div>
  );
}

export default function TftExplosion({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
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

  const total = LAYERS.length;
  const common = { total, progress: scrollYProgress, reducedMotion };

  return (
    <div
      ref={rootRef}
      style={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[2000px]"
    >
      {/* Etwas nach oben gerückt: sonst läuft die unterste Beschriftung in die
          Karte "Kundenspezifische Qualifizierung" unten rechts. */}
      <div
        className="relative w-full max-w-4xl flex items-center justify-center -translate-y-16"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {LAYERS.map((layer, i) => (
          <Layer key={`layer-${i}`} layer={layer} index={i} {...common} />
        ))}
        {LAYERS.map((layer, i) => (
          <Tooltip key={`tooltip-${i}`} layer={layer} index={i} {...common} />
        ))}
      </div>
    </div>
  );
}
