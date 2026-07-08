import { motion, useTransform, MotionValue } from 'motion/react';
import type { InfoSlot } from '../../data/systems';
import VisualCallout from './VisualCallout';

/**
 * Scroll-Visualisierung für "Glastouch-Blenden": flaches 2D-Querschnitt-
 * Diagramm in OGS-Logik statt 3D-Explosion. Aufbau in vier Phasen:
 * Glasbalken -> gedruckter Sensor mit OGS-Klammer -> Finger mit kapazitiven
 * Feldlinien über einer unsichtbaren Taste -> Lichtstrahl-Diagramm mit
 * Transmission/Reflexion. Referenzen: Optical-Bonding-Querschnitt (Key Facts
 * S. 3) und die AR-Oberflächenbehandlungs-Folie (Präsentation S. 17:
 * Transmission > 95 %, Reflexion < 1,5 %).
 */
export default function GlassBondingStack({
  scrollYProgress,
  infoSlots,
}: {
  scrollYProgress: MotionValue<number>;
  infoSlots: InfoSlot[];
}) {
  const progress = useTransform(scrollYProgress, [0.15, 0.8], [0, 1]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 0.9], [0, 1, 1, 0]);

  // Phase 1: Glasbalken
  const glassOpacity = useTransform(progress, [0.0, 0.12], [0, 1]);
  const glassY = useTransform(progress, [0.0, 0.12], [24, 0]);

  // Phase 2: gedruckte Sensorstruktur + OGS-Klammer
  const sensorOpacity = useTransform(progress, [0.16, 0.26], [0, 1]);
  const sensorY = useTransform(progress, [0.16, 0.26], [-14, 0]);
  const braceLength = useTransform(progress, [0.22, 0.34], [0, 1]);
  const braceLabelOpacity = useTransform(progress, [0.28, 0.36], [0, 1]);

  // Phase 3: Finger + kapazitive Feldlinien + hinterleuchtete Taste
  const fingerOpacity = useTransform(progress, [0.36, 0.46], [0, 1]);
  const fingerY = useTransform(progress, [0.36, 0.46], [-40, 0]);
  const fieldLength = useTransform(progress, [0.42, 0.56], [0, 1]);
  const buttonGlow = useTransform(progress, [0.46, 0.58], [0, 1]);

  // Phase 4: Lichtstrahlen mit Messwerten (AR-entspiegelt)
  const rayInOpacity = useTransform(progress, [0.58, 0.64], [0, 1]);
  const rayReflOpacity = useTransform(progress, [0.64, 0.7], [0, 1]);
  const rayTransOpacity = useTransform(progress, [0.68, 0.76], [0, 1]);

  const calloutScratch = useTransform(progress, [0.14, 0.24], [0, 1]);
  const calloutOgs = useTransform(progress, [0.32, 0.42], [0, 1]);
  const calloutControls = useTransform(progress, [0.52, 0.62], [0, 1]);

  return (
    <motion.div
      style={{ opacity: visualOpacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="relative w-full max-w-3xl px-4">
        <svg viewBox="0 0 800 480" className="w-full h-auto">
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
          <motion.g style={{ opacity: glassOpacity, y: glassY }}>
            <rect x={90} y={210} width={620} height={44} rx={8} fill="url(#gbs-glass)" stroke="#7dd0f2" strokeWidth={1.5} />
            <rect x={104} y={214} width={300} height={3} rx={1.5} fill="#ffffff" opacity={0.75} />
            <text x={400} y={200} fontSize={12} fill="#64748b" textAnchor="middle">Cover-Glas (chemisch gehärtet)</text>
          </motion.g>

          {/* Phase 2: direkt aufgedruckter Touch-Sensor (OGS) */}
          <motion.g style={{ opacity: sensorOpacity, y: sensorY }}>
            <rect x={100} y={256} width={600} height={2} fill="#006da3" opacity={0.7} />
            {Array.from({ length: 25 }).map((_, i) => (
              <rect key={i} x={106 + i * 24} y={260} width={14} height={6} rx={1.5} fill="#0084c4" opacity={0.75} />
            ))}
            <text x={400} y={286} fontSize={12} fill="#64748b" textAnchor="middle">gedruckte Sensorstruktur (ITO)</text>
          </motion.g>

          {/* OGS-Klammer: Glas + Sensor = eine Einheit */}
          <motion.path
            d="M 86 206 C 72 206 72 212 72 220 L 72 224 C 72 232 64 235 60 235 C 64 235 72 238 72 246 L 72 258 C 72 266 72 272 86 272"
            fill="none"
            stroke="#006da3"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ pathLength: braceLength, opacity: sensorOpacity }}
          />
          <motion.text
            x={48}
            y={240}
            fontSize={15}
            fontWeight={700}
            fill="#006da3"
            textAnchor="end"
            style={{ opacity: braceLabelOpacity }}
          >
            OGS
          </motion.text>

          {/* Phase 3: Finger + kapazitive Feldlinien */}
          <motion.g style={{ opacity: fingerOpacity, y: fingerY }}>
            <path
              d="M 538 100 L 538 126 A 22 22 0 0 0 582 126 L 582 100"
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth={1.5}
            />
            <path d="M 546 108 Q 560 116 574 108" fill="none" stroke="#cbd5e1" strokeWidth={2} />
          </motion.g>
          {[24, 40, 56].map((r) => (
            <motion.path
              key={r}
              d={`M ${560 - r} 212 A ${r} ${r} 0 0 1 ${560 + r} 212`}
              fill="none"
              stroke="#00a0e8"
              strokeWidth={1.5}
              opacity={0.8}
              style={{ pathLength: fieldLength }}
            />
          ))}

          {/* Hinterleuchtete Taste + Bedienelemente hinter dem Glas */}
          <motion.g style={{ opacity: buttonGlow }}>
            <polygon points="546,296 574,296 600,192 520,192" fill="url(#gbs-glow)" />
            <circle cx={560} cy={318} r={11} fill="none" stroke="#0084c4" strokeWidth={2.5} />
            <line x1={560} y1={302} x2={560} y2={314} stroke="#0084c4" strokeWidth={2.5} strokeLinecap="round" />
            <rect x={554} y={338} width={12} height={5} rx={1} fill="#f59e0b" />
            <text x={560} y={368} fontSize={11} fill="#94a3b8" textAnchor="middle">unsichtbare Taste, LED-hinterleuchtet</text>
            {/* Slider-Zone */}
            <rect x={618} y={302} width={80} height={7} rx={3.5} fill="#cbd5e1" />
            <circle cx={654} cy={305.5} r={8} fill="#0084c4" />
          </motion.g>

          {/* Phase 4: Lichtstrahl-Diagramm (AR-entspiegelt) */}
          <motion.g style={{ opacity: rayInOpacity }}>
            <line x1={148} y1={92} x2={222} y2={196} stroke="#f59e0b" strokeWidth={4} strokeLinecap="round" />
            <polygon points="226,202 212,194 221,186" fill="#f59e0b" />
            <text x={96} y={74} fontSize={13} fontWeight={600} fill="#475569">Einfall 100 %</text>
          </motion.g>
          <motion.g style={{ opacity: rayReflOpacity }}>
            <line x1={238} y1={200} x2={306} y2={104} stroke="#f59e0b" strokeWidth={1.5} strokeLinecap="round" opacity={0.8} />
            <polygon points="312,96 307,110 299,104" fill="#f59e0b" opacity={0.8} />
            <text x={322} y={92} fontSize={13} fill="#475569">Reflexion &lt; 1,5 %</text>
          </motion.g>
          <motion.g style={{ opacity: rayTransOpacity }}>
            <line x1={232} y1={212} x2={262} y2={326} stroke="#00a0e8" strokeWidth={7} strokeLinecap="round" opacity={0.9} />
            <polygon points="266,338 255,324 269,321" fill="#00a0e8" />
            <text x={292} y={340} fontSize={13} fontWeight={600} fill="#006da3">Transmission &gt; 95 %</text>
            <text x={60} y={124} fontSize={11} fill="#94a3b8">AR-entspiegelte Oberfläche</text>
          </motion.g>
        </svg>

        {/* infoSlots als Callouts an den passenden Stellen */}
        <VisualCallout
          slot={infoSlots[0]}
          opacity={calloutOgs}
          className="left-0 md:-left-6 top-[63%]"
        />
        <VisualCallout
          slot={infoSlots[1]}
          opacity={calloutScratch}
          className="right-0 md:-right-6 top-[5%]"
        />
        <VisualCallout
          slot={infoSlots[2]}
          opacity={calloutControls}
          className="left-[30%] md:left-[34%] top-[76%]"
        />
      </div>
    </motion.div>
  );
}
