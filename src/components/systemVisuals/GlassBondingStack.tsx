import { useMemo, type ReactNode } from 'react';
import type { MotionValue } from 'motion/react';
import { useScrollStyle } from '../product/useScrollStyle';
import { useMediaQuery } from '../useMediaQuery';
import StageCaptions, { useActiveCaption, type StageCaption } from './StageCaptions';
import { at, Callout, QUALIFICATION, QUALIFICATION_AT, VISUAL_FADE_IN, type SystemVisualProps } from './shared';

/**
 * Scroll-Visualisierung für "Glastouch-Blenden": flaches 2D-Querschnitt-
 * Diagramm in OGS-Logik statt 3D-Explosion. Aufbau in vier Phasen:
 * Glasbalken -> gedruckter Sensor mit OGS-Klammer -> Finger mit kapazitiven
 * Feldlinien über einer unsichtbaren Taste -> Lichtstrahl-Diagramm mit
 * Transmission/Reflexion. Referenzen: Optical-Bonding-Querschnitt (Key Facts
 * S. 3) und die AR-Oberflächenbehandlungs-Folie (Präsentation S. 17:
 * Transmission > 95 %, Reflexion < 1,5 %).
 *
 * Auf dem Handy wäre die Zeichnung samt Beschriftung nur gut 5 px hoch
 * gesetzt. Dort (`narrow`) rückt der Ausschnitt deshalb enger an die Zeichnung,
 * die drei Messwerte stehen groß im Bild und alle übrigen Beschriftungen
 * wandern in die Textkarte am unteren Rand.
 */

/** Einblenden, optional mit kleiner Fahrt – für die Phasen der Zeichnung. */
function Phase({
  progress,
  from,
  to,
  fromY,
  children,
}: {
  progress: MotionValue<number>;
  /** Lokales Fenster 0..1 des Visuals. */
  from: number;
  to: number;
  fromY?: number;
  children: ReactNode;
}) {
  const ref = useScrollStyle<SVGGElement>(
    progress,
    fromY === undefined
      ? { input: [at(from), at(to)], opacity: [0, 1] }
      : { input: [at(from), at(to)], opacity: [0, 1], y: [fromY, 0] }
  );
  return (
    <g ref={ref} style={{ opacity: 0 }}>
      {children}
    </g>
  );
}

/** Pfad, der sich beim Scrollen nachzeichnet (Klammer, Feldlinien). */
function DrawnPath({
  progress,
  from,
  to,
  ...path
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
  d: string;
  stroke: string;
  strokeWidth: number;
  opacity?: number;
}) {
  const ref = useScrollStyle<SVGPathElement>(progress, {
    input: [at(from), at(to)],
    dashOffset: [1, 0],
  });
  return (
    <path
      ref={ref}
      {...path}
      fill="none"
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      style={{ strokeDashoffset: 1 }}
    />
  );
}

export default function GlassBondingStack({ scrollYProgress, infoSlots, compact }: SystemVisualProps) {
  const narrow = useMediaQuery('(max-width: 639px)');
  const rootRef = useScrollStyle<HTMLDivElement>(scrollYProgress, VISUAL_FADE_IN);
  const p = scrollYProgress;

  // Kompakt: die Info-Karten in der Reihenfolge der vier Phasen. Die Texte
  // nehmen die Beschriftungen aus der Zeichnung mit auf, die auf dem Handy
  // nicht mehr im Bild stehen – es geht also nichts verloren.
  const captions: StageCaption[] = useMemo(
    () => [
      {
        title: infoSlots[1].title,
        desc: `Cover-Glas, chemisch gehärtet. ${infoSlots[1].desc}`,
        at: 0.17,
      },
      {
        title: infoSlots[0].title,
        desc: `Gedruckte Sensorstruktur (ITO). ${infoSlots[0].desc}`,
        at: 0.3,
      },
      {
        title: infoSlots[2].title,
        desc: `${infoSlots[2].desc} Im Bild: unsichtbare Taste, LED-hinterleuchtet.`,
        at: 0.44,
      },
      {
        title: 'AR-entspiegelte Oberfläche',
        // Geschützte Leerzeichen, damit Zahl und Prozentzeichen nicht umbrechen.
        desc: 'Einfall 100\u00a0%, Reflexion <\u00a01,5\u00a0%, Transmission >\u00a095\u00a0%.',
        at: 0.55,
      },
      { ...QUALIFICATION, at: QUALIFICATION_AT },
    ],
    [infoSlots]
  );
  const active = useActiveCaption(scrollYProgress, captions, compact);

  // Schriftgröße der drei Messwerte: auf dem Handy doppelt so groß gesetzt,
  // weil die Zeichnung dort nur halb so groß dargestellt wird.
  const valueSize = narrow ? 26 : 13;

  return (
    <div ref={rootRef} style={{ opacity: 0 }} className="absolute inset-0 pointer-events-none">
      <div
        className={`absolute inset-x-0 flex items-center justify-center ${
          compact ? 'top-16 bottom-[14.5rem]' : 'inset-y-0'
        }`}
      >
        <div className="relative w-full max-w-3xl px-4">
          <svg viewBox={narrow ? '30 44 700 350' : '0 0 800 480'} className="w-full h-auto">
            <defs>
              <linearGradient id="gbs-glass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e0f2fc" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#b9e5f8" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#7dd0f2" stopOpacity="0.55" />
              </linearGradient>
              <linearGradient id="gbs-glow" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#38b9ec" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#38b9ec" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Phase 1: Glasblende im Querschnitt */}
            <Phase progress={p} from={0} to={0.12} fromY={24}>
              <rect x={90} y={210} width={620} height={44} rx={8} fill="url(#gbs-glass)" stroke="#7dd0f2" strokeWidth={1.5} />
              <rect x={104} y={214} width={300} height={3} rx={1.5} fill="#ffffff" opacity={0.75} />
              {!narrow && (
                <text x={400} y={200} fontSize={12} fill="#64748b" textAnchor="middle">Cover-Glas (chemisch gehärtet)</text>
              )}
            </Phase>

            {/* Phase 2: direkt aufgedruckter Touch-Sensor (OGS) */}
            <Phase progress={p} from={0.16} to={0.26} fromY={-14}>
              <rect x={100} y={256} width={600} height={2} fill="#006da3" opacity={0.7} />
              {Array.from({ length: 25 }).map((_, i) => (
                <rect key={i} x={106 + i * 24} y={260} width={14} height={6} rx={1.5} fill="#0084c4" opacity={0.75} />
              ))}
              {!narrow && (
                <text x={400} y={286} fontSize={12} fill="#64748b" textAnchor="middle">gedruckte Sensorstruktur (ITO)</text>
              )}
            </Phase>

            {/* OGS-Klammer: Glas + Sensor = eine Einheit */}
            <DrawnPath
              progress={p}
              from={0.22}
              to={0.34}
              d="M 86 206 C 72 206 72 212 72 220 L 72 224 C 72 232 64 235 60 235 C 64 235 72 238 72 246 L 72 258 C 72 266 72 272 86 272"
              stroke="#006da3"
              strokeWidth={2.5}
            />
            {!narrow && (
              <Phase progress={p} from={0.28} to={0.36}>
                <text x={48} y={240} fontSize={15} fontWeight={700} fill="#006da3" textAnchor="end">
                  OGS
                </text>
              </Phase>
            )}

            {/* Phase 3: Finger + kapazitive Feldlinien */}
            <Phase progress={p} from={0.36} to={0.46} fromY={-40}>
              <path
                d="M 538 100 L 538 126 A 22 22 0 0 0 582 126 L 582 100"
                fill="#e2e8f0"
                stroke="#94a3b8"
                strokeWidth={1.5}
              />
              <path d="M 546 108 Q 560 116 574 108" fill="none" stroke="#cbd5e1" strokeWidth={2} />
            </Phase>
            {[24, 40, 56].map((r) => (
              <DrawnPath
                key={r}
                progress={p}
                from={0.42}
                to={0.56}
                d={`M ${560 - r} 212 A ${r} ${r} 0 0 1 ${560 + r} 212`}
                stroke="#00a0e8"
                strokeWidth={1.5}
                opacity={0.8}
              />
            ))}

            {/* Hinterleuchtete Taste + Bedienelemente hinter dem Glas */}
            <Phase progress={p} from={0.46} to={0.58}>
              <polygon points="546,296 574,296 600,192 520,192" fill="url(#gbs-glow)" />
              <circle cx={560} cy={318} r={11} fill="none" stroke="#0084c4" strokeWidth={2.5} />
              <line x1={560} y1={302} x2={560} y2={314} stroke="#0084c4" strokeWidth={2.5} strokeLinecap="round" />
              <rect x={554} y={338} width={12} height={5} rx={1} fill="#f59e0b" />
              {!narrow && (
                <text x={560} y={368} fontSize={11} fill="#94a3b8" textAnchor="middle">unsichtbare Taste, LED-hinterleuchtet</text>
              )}
              {/* Slider-Zone */}
              <rect x={618} y={302} width={80} height={7} rx={3.5} fill="#cbd5e1" />
              <circle cx={654} cy={305.5} r={8} fill="#0084c4" />
            </Phase>

            {/* Phase 4: Lichtstrahl-Diagramm (AR-entspiegelt) */}
            <Phase progress={p} from={0.58} to={0.64}>
              <line x1={148} y1={92} x2={222} y2={196} stroke="#f59e0b" strokeWidth={4} strokeLinecap="round" />
              <polygon points="226,202 212,194 221,186" fill="#f59e0b" />
              <text x={narrow ? 56 : 96} y={narrow ? 76 : 74} fontSize={valueSize} fontWeight={600} fill="#475569">Einfall 100 %</text>
            </Phase>
            <Phase progress={p} from={0.64} to={0.7}>
              <line x1={238} y1={200} x2={306} y2={104} stroke="#f59e0b" strokeWidth={1.5} strokeLinecap="round" opacity={0.8} />
              <polygon points="312,96 307,110 299,104" fill="#f59e0b" opacity={0.8} />
              <text x={narrow ? 300 : 322} y={narrow ? 76 : 92} fontSize={valueSize} fill="#475569">Reflexion &lt; 1,5 %</text>
            </Phase>
            <Phase progress={p} from={0.68} to={0.76}>
              <line x1={232} y1={212} x2={262} y2={326} stroke="#00a0e8" strokeWidth={7} strokeLinecap="round" opacity={0.9} />
              <polygon points="266,338 255,324 269,321" fill="#00a0e8" />
              <text x={narrow ? 140 : 292} y={narrow ? 378 : 340} fontSize={valueSize} fontWeight={600} fill="#006da3">Transmission &gt; 95 %</text>
              {!narrow && (
                <text x={60} y={124} fontSize={11} fill="#94a3b8">AR-entspiegelte Oberfläche</text>
              )}
            </Phase>
          </svg>

          {/* infoSlots als Callouts an den passenden Stellen (nur breit) */}
          {!compact && (
            <>
              <Callout
                slot={infoSlots[0]}
                progress={p}
                from={0.32}
                to={0.42}
                className="-left-6 top-[63%]"
              />
              <Callout
                slot={infoSlots[1]}
                progress={p}
                from={0.14}
                to={0.24}
                className="-right-6 top-[5%]"
              />
              {/* Etwas tiefer als früher: bei 76 % verdeckte die Karte die
                  Beschriftung der unsichtbaren Taste. */}
              <Callout
                slot={infoSlots[2]}
                progress={p}
                from={0.52}
                to={0.62}
                className="left-[34%] top-[84%]"
              />
            </>
          )}
        </div>
      </div>

      {compact && <StageCaptions captions={captions} active={active} />}
    </div>
  );
}
