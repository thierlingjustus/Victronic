import { C, Chip, FadeIn, IsoPlate, Layer, LayerLabel, VIEWBOX, type ProductVisualProps } from './stage';

/**
 * LCM / LCD Module (modelType "lcd"): der Schichtaufbau eines monochromen
 * Moduls als Explosionsdarstellung – Treiber-PCB mit COG- und COB-Anbindung,
 * Backlight, LCD-Zelle aus zwei Glasscheiben, Polarisator und Stahl-Bezel.
 * Bauteile und Materialien folgen dem gelieferten CAD-Modul lcm-module-128x64
 * (pcb_board, backlight_panel, lcd_glass_lower/upper, polarizer_border,
 * dot_matrix_grid, chip_on_glass_driver, cob_controller_dome, crystal_32khz,
 * header_shroud) sowie den Captions in products.ts.
 */

const CX = 296;
const CY = 300;
const A = 196;
const B = 108;

/** Alle Beschriftungen stehen rechts – links wäre in der viewBox kein Platz. */
const LABEL_X = CX + A;

/**
 * Isometrische Abbildung als Matrix: ein normales Raster im Bereich
 * [-n..n] wird damit auf die Rautenfläche der Platte gelegt.
 */
const iso = (n: number) => {
  const kx = A / n;
  const ky = B / n;
  return `matrix(${kx} ${ky} ${-kx} ${ky} ${CX} ${CY})`;
};

export default function LcmModule({ progress, reducedMotion }: ProductVisualProps) {
  const common = { progress, reducedMotion };

  return (
    <svg viewBox={VIEWBOX} className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* 1. Treiber-PCB – Goldpads, COB-Vergusstropfen, Quarz, Pfostenstecker */}
      <Layer {...common} from={0.04} to={0.3} spread={148}>
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={11} fill={C.pcb} side="#0d3a20">
          <g stroke={C.pcbTrace} strokeWidth="2" fill="none">
            <path d={`M${CX - 110} ${CY + 4} L${CX - 30} ${CY - 40} L${CX + 70} ${CY + 14}`} />
            <path d={`M${CX - 50} ${CY + 46} L${CX + 60} ${CY - 14}`} />
          </g>
          {/* Goldene Montagepads in den Ecken der Rautenfläche */}
          <g fill={C.gold}>
            {[
              [CX - A + 34, CY],
              [CX, CY - B + 19],
              [CX + A - 34, CY],
              [CX, CY + B - 19],
            ].map(([x, y], i) => (
              <ellipse key={i} cx={x} cy={y} rx="9" ry="5" />
            ))}
          </g>
          {/* COB-Controller als schwarzer Vergusstropfen */}
          <ellipse cx={CX - 78} cy={CY + 22} rx="34" ry="18" fill={C.ic} />
          {/* 32-kHz-Quarz in Metalldose */}
          <ellipse cx={CX + 34} cy={CY + 42} rx="20" ry="11" fill={C.metal} />
          {/* SMD-Bauteile */}
          <g fill={C.icSoft}>
            {[
              [CX + 96, CY + 8],
              [CX + 118, CY + 20],
              [CX + 140, CY + 32],
            ].map(([x, y], i) => (
              <polygon key={i} points={`${x - 11},${y} ${x},${y - 6} ${x + 11},${y} ${x},${y + 6}`} />
            ))}
          </g>
          {/* Pfostenstecker am hinteren Rand */}
          <polygon
            points={`${CX - 4},${CY - B + 12} ${CX + 76},${CY - B + 56} ${CX + 62},${CY - B + 64} ${CX - 18},${CY - B + 20}`}
            fill={C.ic}
          />
        </IsoPlate>
        <LayerLabel x={LABEL_X} y={CY + 46} text="Treiber-PCB" sub="COB · Pfostenstecker" length={44} />
      </Layer>

      {/* 2. Backlight-Panel */}
      <Layer {...common} from={0.07} to={0.33} spread={96}>
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={7} fill="#f8fafc" side={C.lineSoft} />
      </Layer>

      {/* 3. Unteres LCD-Glas mit Chip-on-Glass-Treiber am Rand */}
      <Layer {...common} from={0.1} to={0.36} spread={44}>
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={6} fill="#cdd6c4" side="#aab39f" opacity={0.9}>
          {/* COG-Treiber: schmaler dunkler Balken direkt auf dem Substrat */}
          <polygon
            points={`${CX - 96},${CY + 54} ${CX + 24},${CY - 12} ${CX + 42},${CY - 2} ${CX - 78},${CY + 64}`}
            fill={C.ic}
          />
          {/* Bonddrähte zum Glas */}
          <g stroke={C.gold} strokeWidth="1.5">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <path key={i} d={`M${CX - 88 + i * 15} ${CY + 56 - i * 8} l7 -12`} fill="none" />
            ))}
          </g>
        </IsoPlate>
        <LayerLabel x={LABEL_X} y={CY + 18} text="COG-Bonding" sub="Chip-on-Glass" length={44} />
      </Layer>

      {/* 4. Oberes LCD-Glas mit Punktmatrix */}
      <Layer {...common} from={0.13} to={0.39} spread={-8}>
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={6} fill="#c3cdb8" side="#a2ac96" opacity={0.95}>
          {/*
            128x64 echte Punkte wären unlesbar – ein repräsentatives Raster
            zeigt die Struktur. Die Matrix legt es auf die Rautenfläche.
          */}
          <FadeIn {...common} from={0.46} to={0.7} toOpacity={0.9}>
            <g transform={iso(26)} fill={C.slate}>
              {Array.from({ length: 25 }).map((_, ri) =>
                Array.from({ length: 25 }).map((_, ci) => {
                  const x = (ri - 12) * 2;
                  const y = (ci - 12) * 2;
                  if (Math.abs(x) + Math.abs(y) > 24) return null;
                  // Angezeigter Inhalt: eine Messkurve, wie sie ein Messgerät
                  // auf der Punktmatrix ausgibt.
                  const wave = Math.round((7 * Math.sin(x / 6)) / 2) * 2;
                  const on = Math.abs(y - wave) <= 2;
                  return (
                    <rect
                      key={`${ri}-${ci}`}
                      x={x - 0.62}
                      y={y - 0.62}
                      width="1.24"
                      height="1.24"
                      opacity={on ? 1 : 0.14}
                    />
                  );
                })
              )}
            </g>
          </FadeIn>
        </IsoPlate>
        <LayerLabel x={LABEL_X} y={CY - 8} text="FSTN-Glaszelle" sub="Punktmatrix 128 × 64" length={44} />
      </Layer>

      {/* 5. Polarisator */}
      <Layer {...common} from={0.16} to={0.42} spread={-58}>
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={4} fill={C.slate} side="#0f172a" opacity={0.4} />
      </Layer>

      {/* 6. Bezel-Rahmen aus schwarzem Stahl */}
      <Layer {...common} from={0.19} to={0.45} spread={-116}>
        <g>
          {/* Rahmen als Raute mit Ausschnitt – zwei Konturen, evenodd stanzt */}
          <path
            fillRule="evenodd"
            fill="#0f1113"
            d={`M${CX - A} ${CY} L${CX} ${CY - B} L${CX + A} ${CY} L${CX} ${CY + B} Z
                M${CX - A + 46} ${CY} L${CX} ${CY - B + 25} L${CX + A - 46} ${CY} L${CX} ${CY + B - 25} Z`}
          />
          <polygon
            points={`${CX - A},${CY} ${CX},${CY - B} ${CX + A},${CY} ${CX},${CY + B}`}
            fill="none"
            stroke={C.metal}
            strokeWidth="1.5"
            opacity="0.5"
          />
        </g>
        <LayerLabel x={LABEL_X} y={CY - 4} text="Bezel-Rahmen" sub="Stahl, schwarz" length={44} />
      </Layer>

      {/* Fakten aus den Spezifikationen */}
      <FadeIn {...common} from={0.6} to={0.76}>
        <Chip x={44} y={512} label="-30 °C bis +85 °C" />
        <Chip x={214} y={512} label="FSC · DFSTN · FSTN" />
      </FadeIn>
    </svg>
  );
}
