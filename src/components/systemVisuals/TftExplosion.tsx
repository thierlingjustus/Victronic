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
 * Grafik überladen und die Zuordnung zwischen Beschriftung und Ebene zerstört;
 * er ist bewusst zurückgenommen. Beim Ändern deshalb immer gegenprüfen, dass
 * jede Beschriftung auf die Schicht zeigt, die sie beschreibt.
 *
 * Zwei Darstellungen:
 * - breit (ab 1280 px): die Schichten fahren diagonal auseinander, jede trägt
 *   ihre Beschriftung als Karte links bzw. rechts. Darunter reicht der Platz
 *   nicht – schon bei 1024 px ragten die äußeren Karten aus dem Bild.
 * - kompakt: die Schichten fahren senkrecht auseinander und füllen das
 *   Hochformat, die Beschriftungen laufen nacheinander durch die Textkarte am
 *   unteren Rand, die jeweilige Schicht ist dabei hervorgehoben.
 *
 * Die Kippung ist eine reine 2D-Abbildung (drehen, dann in der Höhe stauchen)
 * statt rotateX in einem preserve-3d-Kontext. Das Bild ist praktisch dasselbe,
 * aber z-index greift wieder normal und der Browser braucht keinen 3D-Kontext
 * mit zehn Ebenen zu sortieren.
 */

type LayerDef = {
  name: string;
  desc: string;
  side: 'left' | 'right';
  content: ReactNode;
  className: string;
};

const LAYERS: LayerDef[] = [
  {
    name: 'Touch-Sensor',
    desc: 'Kapazitives ITO-Raster auf dem Deckglas',
    side: 'left',
    // Rautenraster wie das ITO-Gitter in product/visuals/TouchPanel.tsx
    content: <div className="absolute inset-0 rounded-2xl opacity-60 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIxNSI+PHBhdGggZD0iTTEzIDAuNSBMMjUuNSA3LjUgTDEzIDE0LjUgTDAuNSA3LjUgWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBhMGU4IiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]" />,
    className: 'bg-brand-50/40 border-brand-200',
  },
  {
    name: 'Front-Polarisator',
    desc: 'High-Res Bildschirmoberfläche',
    side: 'right',
    // TODO(Victronic): Hier optional ein echtes Produkt-/Display-Foto einsetzen.
    // Bis dahin deutet ein Markenverlauf den aktiven Bildschirm an.
    content: <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-800 via-brand-500 to-brand-200" />,
    className: 'bg-transparent border-gray-200 shadow-2xl',
  },
  {
    name: 'Glas',
    desc: 'Schützendes Trägersubstrat',
    side: 'left',
    content: <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent rounded-2xl" />,
    className: 'bg-white/10 border-gray-300',
  },
  {
    name: 'Farbfilter',
    desc: 'Erzeugt die RGB-Subpixel',
    side: 'right',
    content: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjYiIGZpbGw9InJlZCIgb3BhY2l0eT0iMC4zIi8+PHJlY3QgeD0iMiIgd2lkdGg9IjIiIGhlaWdodD0iNiIgZmlsbD0iZ3JlZW4iIG9wYWNpdHk9IjAuMyIvPjxyZWN0IHg9IjQiIHdpZHRoPSIyIiBoZWlnaHQ9IjYiIGZpbGw9ImJsdWUiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')] rounded-2xl opacity-50" />,
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
    content: <div className="absolute inset-0 bg-gradient-to-b from-brand-500/15 to-brand-600/15 rounded-2xl" />,
    className: 'bg-transparent border-brand-200',
  },
  {
    name: 'Transistor (TFT)',
    desc: 'Aktive Matrix zur Pixelsteuerung',
    side: 'left',
    content: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xMCAxMGgxMHYxMEgxMHoiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] rounded-2xl" />,
    className: 'bg-white/90 border-gray-300',
  },
  {
    name: 'Pixel-Elektrode',
    desc: 'Individuelle Pixel-Ansteuerung',
    side: 'right',
    content: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMikiLz48L3N2Zz4=')] rounded-2xl" />,
    className: 'bg-transparent border-gray-200',
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
    content: <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.9)]" />,
    className: 'bg-white border-gray-200',
  },
];

/** Versatz-Faktor je Schicht: -5 (Touch, ganz vorn) bis +4 (Beleuchtung). */
const FACTORS = LAYERS.map((_, i) => i - 5);

/** Breit: diagonaler Versatz je Faktor und das Fenster, in dem er aufgeht. */
const WIDE_SPREAD = 50;
const WIDE_WINDOW = [0.15, 0.8];
/** Kompakt geht die Explosion schneller auf – danach laufen die Texte durch. */
const COMPACT_WINDOW = [0.12, 0.3];

/** Kippung der Platten: erst drehen, dann in der Höhe stauchen. */
const TILT = 'scaleY(0.5) rotate(-45deg)';
/** Eine gekippte 4:3-Platte der Breite w ist 1,237·w breit und 0,619·w hoch. */
const TILT_WIDTH = 1.237;
const TILT_HEIGHT = 0.619;

/** Startpunkte der Textkarten in der kompakten Darstellung. */
const CAPTION_START = 0.3;
const CAPTION_STEP = 0.044;

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
      // Oben die Navbar (64 px), unten Textkarte samt Abstand (200 px) und
      // etwas Luft, damit die oberste Platte nicht an der Navbar klebt.
      const free = window.innerHeight - 64 - 200 - 32;
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
 * Senkrechter Versatz je Faktor in der breiten Darstellung. Auf niedrigen
 * Fenstern (z.B. 1280 × 720) geriete die oberste Beschriftung mit den vollen
 * 50 px unter die Navbar – dort wird die Explosion flacher.
 */
function useWideSpreadY(enabled: boolean) {
  const [spread, setSpread] = useState(WIDE_SPREAD);

  useEffect(() => {
    if (!enabled) return;
    const measure = () => {
      // Rahmenmitte (halbe Höhe, 56 px angehoben) minus halbe Kartenhöhe muss
      // unter der Navbar (64 px) samt etwas Abstand bleiben.
      const room = window.innerHeight / 2 - 56 - 32 - 76;
      setSpread(Math.max(30, Math.min(WIDE_SPREAD, Math.floor(room / 5))));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [enabled]);

  return spread;
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
      : { input: WIDE_WINDOW, x: [0, f * WIDE_SPREAD], y: [0, f * wideSpreadY] }
  );

  return (
    <div
      ref={ref}
      className={`absolute aspect-[4/3] ${compact ? '' : 'w-96'}`}
      // Oberste Schicht liegt vorn.
      style={{ zIndex: 60 - index, width: compact ? width : undefined }}
    >
      <div
        className={`absolute inset-0 rounded-2xl border transition-[opacity,outline-color] duration-300 outline outline-2 outline-offset-2 ${
          highlight === 'active' ? 'outline-brand-500' : 'outline-transparent'
        } ${highlight === 'dim' ? 'opacity-60' : 'opacity-100'} ${layer.className}`}
        style={{ transform: TILT }}
      >
        {layer.content}
      </div>
    </div>
  );
}

/** Beschriftungskarte einer Schicht – fährt mit ihr mit (nur breite Darstellung). */
function PlateLabel({
  layer,
  index,
  progress,
  spreadY,
}: {
  layer: LayerDef;
  index: number;
  progress: MotionValue<number>;
  spreadY: number;
}) {
  const f = FACTORS[index];
  const [from, to] = WIDE_WINDOW;
  // Erscheint, sobald die Schichten weit genug auseinander sind.
  const fadeFrom = from + (to - from) * 0.3;
  const fadeTo = from + (to - from) * 0.6;
  // Anteil des Wegs, der an einer Stützstelle schon zurückgelegt ist.
  const part = (p: number) => (p - from) / (to - from);
  const ref = useScrollStyle<HTMLDivElement>(progress, {
    input: [from, fadeFrom, fadeTo, to],
    opacity: [0, 0, 1, 1],
    x: [0, part(fadeFrom) * f * WIDE_SPREAD, part(fadeTo) * f * WIDE_SPREAD, f * WIDE_SPREAD],
    y: [0, part(fadeFrom) * f * spreadY, part(fadeTo) * f * spreadY, f * spreadY],
  });
  const isLeft = layer.side === 'left';

  return (
    <div
      ref={ref}
      style={{ opacity: 0 }}
      className={`absolute z-[70] w-56 ${isLeft ? 'mr-[9rem] text-right right-1/2' : 'ml-[9rem] left-1/2'}`}
    >
      <div className={`h-px w-8 bg-brand-600 absolute top-4 opacity-50 ${isLeft ? '-right-8' : '-left-8'}`} />
      <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-brand-700 font-bold text-xs uppercase tracking-wider">{layer.name}</h3>
        <p className="text-gray-600 text-[11px] mt-1 leading-snug">{layer.desc}</p>
      </div>
    </div>
  );
}

export default function TftExplosion({
  scrollYProgress,
  compact,
}: {
  scrollYProgress: MotionValue<number>;
  compact: boolean;
}) {
  const rootRef = useScrollStyle<HTMLDivElement>(scrollYProgress, VISUAL_FADE_IN);
  const { width, spread } = useCompactGeometry(compact);
  const wideSpreadY = useWideSpreadY(!compact);

  const captions: StageCaption[] = useMemo(
    () => [
      ...LAYERS.map((layer, i) => ({
        title: layer.name,
        desc: layer.desc,
        at: CAPTION_START + i * CAPTION_STEP,
      })),
      { ...QUALIFICATION, at: QUALIFICATION_AT },
    ],
    []
  );
  const active = useActiveCaption(scrollYProgress, captions, compact);
  // Nur die zehn Schicht-Karten heben etwas hervor, die Qualifizierung nicht.
  const activeLayer = compact && active >= 0 && active < LAYERS.length ? active : -1;

  return (
    <div ref={rootRef} style={{ opacity: 0 }} className="absolute inset-0 pointer-events-none">
      {/* Kompakt: zentriert im Raum zwischen Navbar und Textkarte. Breit: etwas
          angehoben, damit unten Prozessleiste und Qualifizierung Platz haben. */}
      <div
        className={`absolute inset-x-0 flex items-center justify-center ${
          compact ? 'top-16 bottom-[12.5rem] lg:bottom-[19rem]' : 'inset-y-0'
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
          {/* Beschriftungen nach den Platten und mit höherem z-index, damit
              keine Platte eine Karte überdeckt. */}
          {!compact &&
            LAYERS.map((layer, i) => (
              <PlateLabel
                key={`label-${layer.name}`}
                layer={layer}
                index={i}
                progress={scrollYProgress}
                spreadY={wideSpreadY}
              />
            ))}
        </div>
      </div>

      {compact && <StageCaptions captions={captions} active={active} />}
    </div>
  );
}
