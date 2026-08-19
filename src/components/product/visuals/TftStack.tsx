import { C, FadeIn, IsoPlate, Layer, LayerLabel, VIEWBOX, type ProductVisualProps } from './stage';

/**
 * TFT Displays (modelType "display"): der vollständige Schichtaufbau als
 * Explosionsdarstellung – Deckglas, kapazitiver Touch-Sensor, Farbfilterglas,
 * TFT-Glas mit RGB-Subpixeln, Diffusor-Stack, LED-Leiste und Treiber-PCB mit
 * FPC-Anschluss. Beim Scrollen ziehen die Schichten auseinander, zum Schluss
 * fährt die Hintergrundbeleuchtung hoch.
 * Inhaltlich nach der Caption zu tft-ctp-exploded.jpg in products.ts.
 */

const CX = 300;
const CY = 300;
const A = 200;
const B = 110;

/** Alle Beschriftungen stehen rechts – links wäre in der viewBox kein Platz. */
const LABEL_X = CX + A;

export default function TftStack({ progress, reducedMotion }: ProductVisualProps) {
  const common = { progress, reducedMotion };

  return (
    <svg viewBox={VIEWBOX} className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        {/* Leuchtende Bildfläche, sobald das Backlight anläuft */}
        <linearGradient id="tft-lit" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor={C.brand300} />
          <stop offset="55%" stopColor={C.brand500} />
          <stop offset="100%" stopColor={C.brand700} />
        </linearGradient>
      </defs>

      {/* 7. Treiber-PCB mit FPC – unterste Ebene, bleibt am Platz */}
      <Layer {...common} from={0.04} to={0.3} spread={150}>
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={12} fill={C.pcb} side="#0d3a20">
          <g stroke={C.pcbTrace} strokeWidth="2" fill="none">
            <path d={`M${CX - 120} ${CY} L${CX - 40} ${CY - 44} L${CX + 60} ${CY + 10}`} />
            <path d={`M${CX - 60} ${CY + 40} L${CX + 40} ${CY - 14}`} />
          </g>
          {/* Timing-Controller */}
          <polygon
            points={`${CX - 40},${CY + 6} ${CX + 4},${CY - 18} ${CX + 48},${CY + 6} ${CX + 4},${CY + 30}`}
            fill={C.ic}
          />
          {/* Steckverbinder */}
          <polygon
            points={`${CX + 96},${CY + 22} ${CX + 126},${CY + 6} ${CX + 150},${CY + 19} ${CX + 120},${CY + 35}`}
            fill={C.metal}
          />
        </IsoPlate>
        <LayerLabel x={LABEL_X} y={CY + 46} text="Treiber-PCB" sub="LVDS · RGB · MIPI · eDP" length={44} />
      </Layer>

      {/* 6. FPC-Flachband zwischen Panel und PCB */}
      <Layer {...common} from={0.06} to={0.32} spread={112}>
        <polygon
          points={`${CX - 178},${CY + 8} ${CX - 120},${CY - 24} ${CX - 84},${CY - 5} ${CX - 142},${CY + 27}`}
          fill={C.fpc}
        />
      </Layer>

      {/* 5. LED-Leiste */}
      <Layer {...common} from={0.08} to={0.34} spread={78}>
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={6} fill="#e9edf1" side={C.line}>
          <g fill="#fbbf24">
            {[-150, -100, -50, 0, 50, 100, 150].map((d) => (
              <circle key={d} cx={CX + d} cy={CY + B - Math.abs(d) * (B / A) - 8} r="5" />
            ))}
          </g>
        </IsoPlate>
        <LayerLabel x={LABEL_X} y={CY + 18} text="LED-Backlight" sub="bis 1500 cd/m²" length={44} />
      </Layer>

      {/* 4. Diffusor-Stack */}
      <Layer {...common} from={0.1} to={0.36} spread={44}>
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={8} fill="#f8fafc" side={C.lineSoft} opacity={0.95} />
      </Layer>

      {/* 3. TFT-Glas mit RGB-Subpixeln */}
      <Layer {...common} from={0.12} to={0.38} spread={4}>
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={7} fill={C.screenDark} side="#060c14">
          {/* Beleuchtete Bildfläche, blendet mit dem Backlight auf */}
          <FadeIn {...common} from={0.5} to={0.72} toOpacity={0.92}>
            <polygon
              points={`${CX - A + 14},${CY} ${CX},${CY - B + 8} ${CX + A - 14},${CY} ${CX},${CY + B - 8}`}
              fill="url(#tft-lit)"
            />
          </FadeIn>
          {/* RGB-Subpixel-Raster */}
          <g opacity="0.5">
            {[-3, -2, -1, 0, 1, 2, 3].map((r) =>
              [-3, -2, -1, 0, 1, 2, 3].map((c2) => {
                const px = CX + (c2 - r) * 26;
                const py = CY + (c2 + r) * 14;
                return (
                  <g key={`${r}-${c2}`}>
                    <rect x={px - 7} y={py - 3} width="4" height="6" fill="#ef4444" />
                    <rect x={px - 2} y={py - 3} width="4" height="6" fill="#22c55e" />
                    <rect x={px + 3} y={py - 3} width="4" height="6" fill="#3b82f6" />
                  </g>
                );
              })
            )}
          </g>
        </IsoPlate>
        <LayerLabel x={LABEL_X} y={CY - 10} text="TFT-Glas" sub="IPS, RGB-Subpixel" length={44} />
      </Layer>

      {/* 2. Farbfilterglas */}
      <Layer {...common} from={0.14} to={0.4} spread={-38}>
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={6} fill={C.glass} side={C.brand200} opacity={0.75} />
      </Layer>

      {/* 1. Kapazitiver Touch-Sensor */}
      <Layer {...common} from={0.16} to={0.42} spread={-84}>
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={5} fill={C.brand100} side={C.brand200} opacity={0.7}>
          {/* Rautenförmiges ITO-Elektrodenraster */}
          <g stroke={C.brand500} strokeWidth="1.5" fill="none" opacity="0.75">
            {[-2, -1, 0, 1, 2].map((r) =>
              [-2, -1, 0, 1, 2].map((c2) => {
                const px = CX + (c2 - r) * 42;
                const py = CY + (c2 + r) * 23;
                return (
                  <polygon
                    key={`${r}-${c2}`}
                    points={`${px - 18},${py} ${px},${py - 10} ${px + 18},${py} ${px},${py + 10}`}
                  />
                );
              })
            )}
          </g>
        </IsoPlate>
        <LayerLabel x={LABEL_X} y={CY - 6} text="Touch-Sensor" sub="kapazitiv (CTP)" length={44} />
      </Layer>

      {/* 0. Deckglas – oberste Ebene */}
      <Layer {...common} from={0.18} to={0.44} spread={-136}>
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={9} fill={C.white} side={C.line} opacity={0.6}>
          <polygon
            points={`${CX - A},${CY} ${CX},${CY - B} ${CX + A},${CY} ${CX},${CY + B}`}
            fill="none"
            stroke={C.brand200}
            strokeWidth="2"
          />
          {/* Glanzstreifen */}
          <polygon points={`${CX - 130},${CY - 34} ${CX - 40},${CY - 84} ${CX - 10},${CY - 68} ${CX - 100},${CY - 18}`} fill={C.white} opacity="0.65" />
        </IsoPlate>
        <LayerLabel x={LABEL_X} y={CY - 4} text="Deckglas" sub="AG / AR / AF veredelt" length={44} />
      </Layer>
    </svg>
  );
}
