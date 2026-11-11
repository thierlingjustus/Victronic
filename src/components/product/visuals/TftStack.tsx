import type { ReactNode } from 'react';
import { useScrollStyle } from '../useScrollStyle';
import { at, C, FadeIn, IsoPlate, StackLayer, useStageViewBox, type ProductVisualProps } from './stage';

/**
 * TFT Displays (modelType "display"): der vollständige Schichtaufbau als
 * Explosionsdarstellung – Treiber-PCB mit FPC, LED-Leiste, Diffusor-Stack,
 * Rear-Polarisator, TFT-Glas mit RGB-Subpixeln, Farbfilterglas,
 * Front-Polarisator und Deckglas.
 *
 * Die beiden Polarisatoren waren zeitweise nur auf der Systemseite zu sehen,
 * gehören aber zwingend dazu: ohne sie schaltet eine LCD-Zelle kein Licht.
 *
 * Bewusst OHNE Touch-Sensor: hier geht es um das TFT-Display als Komponente.
 * Touch ist eine eigene Produktkategorie (/products/touchscreens) und ein
 * eigenes System (/systems/tft-touch).
 */

const CX = 360;
const CY = 300;
const A = 170;
const B = 95;

/** Beschriftungen wandern auf beide Seiten – rechts allein wird es zu voll. */
const LABEL_R = CX + A;
const LABEL_L = CX - A;
/** Links ist weniger Platz bis zum Rand der viewBox, also kürzere Führung. */
const LEN_R = 44;
const LEN_L = 16;

/**
 * Fenster, in dem der Stapel von "durchscheinend" auf sein Endaussehen läuft.
 * Vorher waren die Deckkraft-Werte statisch; der Aufbau wirkte dadurch auch
 * am Ende der Animation blass und man schaute durch die Schichten hindurch.
 */
const SOLID: [number, number] = [0.3, 0.55];

/**
 * Deckkraft-Rampe für eine Schicht. Liegt bewusst hier statt in stage.tsx –
 * nur der TFT-Stapel braucht das. Das umschlossene IsoPlate bekommt dann
 * opacity={1}, die Steuerung übernimmt dieses <g>.
 */
function Solidify({
  progress,
  reducedMotion,
  from,
  to,
  children,
}: {
  progress: ProductVisualProps['progress'];
  reducedMotion: boolean;
  /** Deckkraft am Anfang und am Ende der Rampe. */
  from: number;
  to: number;
  children: ReactNode;
}) {
  const ref = useScrollStyle<SVGGElement>(
    progress,
    { input: [at(SOLID[0]), at(SOLID[1])], opacity: [from, to] },
    reducedMotion
  );
  return (
    <g ref={ref} style={{ opacity: from }}>
      {children}
    </g>
  );
}

/** Zahl der Schichten – bestimmt die Staffelung über LAYER_BAND. */
const N = 9;

/**
 * Faktenkarte → Schicht. -1 heißt: keine Entsprechung, dann bleibt die
 * Zeichnung unverändert statt willkürlich etwas hervorzuheben.
 * Reihenfolge der specs in products.ts:
 * 0 Technologie · 1 Größen · 2 Format & Temperatur · 3 Schnittstellen
 */
const SPEC_LAYERS = [5, 8, -1, 0];

/**
 * Engerer Ausschnitt für das Handy, sobald die Beschriftungen entfallen:
 * gemessene Ausdehnung der Zeichnung über den ganzen Scrollverlauf plus Rand.
 */
const COMPACT_VIEWBOX = '120 20 480 570';

export default function TftStack({ progress, reducedMotion, activeFact = -1 }: ProductVisualProps) {
  const common = { progress, reducedMotion };
  const viewBox = useStageViewBox(COMPACT_VIEWBOX);
  const active = activeFact >= 0 ? SPEC_LAYERS[activeFact] ?? -1 : -1;
  const layer = { ...common, n: N, activeIndex: active };

  return (
    <svg viewBox={viewBox} className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        {/* Leuchtende Bildfläche, sobald das Backlight anläuft */}
        <linearGradient id="tft-lit" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor={C.brand300} />
          <stop offset="55%" stopColor={C.brand500} />
          <stop offset="100%" stopColor={C.brand700} />
        </linearGradient>
      </defs>

      {/* 0. Treiber-PCB – unterste Ebene */}
      <StackLayer
        {...layer}
        i={0}
        spread={168}
        label={{ x: LABEL_R, y: CY + 40, text: 'Treiber-PCB', sub: 'LVDS · RGB · MIPI', length: LEN_R }}
      >
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={12} fill={C.pcb} side="#0d3a20">
          <g stroke={C.pcbTrace} strokeWidth="2" fill="none">
            <path d={`M${CX - 102} ${CY} L${CX - 34} ${CY - 38} L${CX + 51} ${CY + 9}`} />
            <path d={`M${CX - 51} ${CY + 34} L${CX + 34} ${CY - 12}`} />
          </g>
          {/* Timing-Controller */}
          <polygon
            points={`${CX - 34},${CY + 5} ${CX + 3},${CY - 15} ${CX + 41},${CY + 5} ${CX + 3},${CY + 26}`}
            fill={C.ic}
          />
          {/* Steckverbinder */}
          <polygon
            points={`${CX + 82},${CY + 19} ${CX + 107},${CY + 5} ${CX + 128},${CY + 16} ${CX + 102},${CY + 30}`}
            fill={C.metal}
          />
        </IsoPlate>
      </StackLayer>

      {/* 1. FPC-Flachband zwischen Panel und PCB */}
      <StackLayer {...layer} i={1} spread={125}>
        <polygon
          points={`${CX - 151},${CY + 7} ${CX - 102},${CY - 20} ${CX - 71},${CY - 4} ${CX - 121},${CY + 23}`}
          fill={C.fpc}
        />
      </StackLayer>

      {/* 2. LED-Leiste */}
      <StackLayer
        {...layer}
        i={2}
        spread={83}
        label={{ x: LABEL_R, y: CY + 14, text: 'LED-Backlight', sub: 'LED-Leiste', length: LEN_R }}
      >
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={6} fill="#e9edf1" side={C.line}>
          <g fill="#fbbf24">
            {[-128, -85, -43, 0, 43, 85, 128].map((d) => (
              <circle key={d} cx={CX + d} cy={CY + B - Math.abs(d) * (B / A) - 7} r="4.5" />
            ))}
          </g>
        </IsoPlate>
      </StackLayer>

      {/* 3. Diffusor-Stack */}
      <StackLayer
        {...layer}
        i={3}
        spread={40}
        label={{ x: LABEL_L, y: CY + 8, text: 'Diffusor-Stack', sub: 'Streufolien & Prismen', side: 'left', length: LEN_L }}
      >
        <Solidify {...common} from={0.95} to={1}>
          <IsoPlate cx={CX} cy={CY} a={A} b={B} t={8} fill="#f8fafc" side={C.lineSoft} opacity={1} />
        </Solidify>
      </StackLayer>

      {/* 4. Rear-Polarisator */}
      <StackLayer
        {...layer}
        i={4}
        spread={-2}
        label={{ x: LABEL_L, y: CY - 8, text: 'Rear-Polarisator', sub: 'polarisiert das Licht', side: 'left', length: LEN_L }}
      >
        <Solidify {...common} from={0.45} to={0.85}>
          <IsoPlate cx={CX} cy={CY} a={A} b={B} t={4} fill={C.slate} side="#0f172a" opacity={1}>
            {/* Vorzugsrichtung als feine Schraffur */}
            <g stroke={C.white} strokeWidth="1" opacity="0.4">
              {[-4, -2, 0, 2, 4].map((k) => (
                <path key={k} d={`M${CX - A + 30 + k * 22} ${CY + (k * 22) / (A / B)} L${CX + k * 22} ${CY - B + 18 + (k * 22) / (A / B)}`} />
              ))}
            </g>
          </IsoPlate>
        </Solidify>
      </StackLayer>

      {/* 5. TFT-Glas mit RGB-Subpixeln */}
      <StackLayer
        {...layer}
        i={5}
        spread={-45}
        label={{ x: LABEL_R, y: CY - 8, text: 'TFT-Glas', sub: 'IPS, RGB-Subpixel', length: LEN_R }}
      >
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={7} fill={C.screenDark} side="#060c14">
          {/* Beleuchtete Bildfläche, blendet mit dem Backlight auf */}
          <FadeIn {...common} from={0.38} to={0.58} toOpacity={1}>
            <polygon
              points={`${CX - A + 12},${CY} ${CX},${CY - B + 7} ${CX + A - 12},${CY} ${CX},${CY + B - 7}`}
              fill="url(#tft-lit)"
            />
          </FadeIn>
          {/* RGB-Subpixel-Raster */}
          <g opacity="0.5">
            {[-3, -2, -1, 0, 1, 2, 3].map((r) =>
              [-3, -2, -1, 0, 1, 2, 3].map((c2) => {
                const px = CX + (c2 - r) * 22;
                const py = CY + (c2 + r) * 12;
                return (
                  <g key={`${r}-${c2}`}>
                    <rect x={px - 6} y={py - 3} width="3.4" height="5.4" fill="#ef4444" />
                    <rect x={px - 1.7} y={py - 3} width="3.4" height="5.4" fill="#22c55e" />
                    <rect x={px + 2.6} y={py - 3} width="3.4" height="5.4" fill="#3b82f6" />
                  </g>
                );
              })
            )}
          </g>
        </IsoPlate>
      </StackLayer>

      {/* 6. Farbfilterglas */}
      <StackLayer
        {...layer}
        i={6}
        spread={-87}
        label={{ x: LABEL_L, y: CY + 8, text: 'Farbfilterglas', sub: 'erzeugt die Subpixel', side: 'left', length: LEN_L }}
      >
        <Solidify {...common} from={0.75} to={0.92}>
          <IsoPlate cx={CX} cy={CY} a={A} b={B} t={6} fill={C.glass} side={C.brand200} opacity={1}>
            <g opacity="0.55">
              {[-2, -1, 0, 1, 2].map((k) => (
                <g key={k}>
                  <path d={`M${CX - 110 + k * 44} ${CY + 62 - (k * 44) / (A / B) - 62} l88 48`} stroke="#ef4444" strokeWidth="2" fill="none" />
                </g>
              ))}
            </g>
          </IsoPlate>
        </Solidify>
      </StackLayer>

      {/* 7. Front-Polarisator */}
      <StackLayer
        {...layer}
        i={7}
        spread={-130}
        label={{ x: LABEL_L, y: CY - 8, text: 'Front-Polarisator', sub: 'Analysator', side: 'left', length: LEN_L }}
      >
        <Solidify {...common} from={0.35} to={0.85}>
          <IsoPlate cx={CX} cy={CY} a={A} b={B} t={4} fill={C.slate} side="#0f172a" opacity={1}>
            {/* Um 90° gedrehte Vorzugsrichtung gegenüber dem Rear-Polarisator */}
            <g stroke={C.white} strokeWidth="1" opacity="0.45">
              {[-4, -2, 0, 2, 4].map((k) => (
                <path key={k} d={`M${CX + A - 30 - k * 22} ${CY + (k * 22) / (A / B)} L${CX - k * 22} ${CY - B + 18 + (k * 22) / (A / B)}`} />
              ))}
            </g>
          </IsoPlate>
        </Solidify>
      </StackLayer>

      {/* 9. Deckglas – oberste Ebene */}
      <StackLayer
        {...layer}
        i={8}
        spread={-172}
        label={{ x: LABEL_R, y: CY - 4, text: 'Deckglas', sub: 'AG / AR / AF veredelt', length: LEN_R }}
      >
        <Solidify {...common} from={0.6} to={0.92}>
          <IsoPlate cx={CX} cy={CY} a={A} b={B} t={9} fill={C.white} side={C.line} opacity={1}>
            <polygon
              points={`${CX - A},${CY} ${CX},${CY - B} ${CX + A},${CY} ${CX},${CY + B}`}
              fill="none"
              stroke={C.brand200}
              strokeWidth="2"
            />
            {/* Glanzstreifen */}
            <polygon
              points={`${CX - 110},${CY - 29} ${CX - 34},${CY - 72} ${CX - 8},${CY - 58} ${CX - 85},${CY - 15}`}
              fill={C.white}
              opacity="0.65"
            />
          </IsoPlate>
        </Solidify>
      </StackLayer>
    </svg>
  );
}
