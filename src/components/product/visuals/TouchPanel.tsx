import { C, Chip, FadeIn, IsoPlate, Layer, LayerLabel, VIEWBOX, type ProductVisualProps } from './stage';

/**
 * Touchscreens (modelType "touch"): OGS-Panel – Sensor und Deckglas bilden eine
 * einteilige Glasscheibe mit bedrucktem Rand-Bezel und FPC-Anschluss, darunter
 * die Controller-Platine mit QFP-IC und ZIF-Steckverbinder.
 * Inhaltlich nach den Captions zu ogs-panel.jpg, pcap-sensor.jpg und
 * touch-controller-board.jpg in products.ts.
 */

const CX = 300;
const CY = 310;
const A = 196;
const B = 108;

/** Alle Beschriftungen stehen rechts – links wäre in der viewBox kein Platz. */
const LABEL_X = CX + A;

export default function TouchPanel({ progress, reducedMotion }: ProductVisualProps) {
  const common = { progress, reducedMotion };

  return (
    <svg viewBox={VIEWBOX} className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* 1. Controller-Platine mit QFP-IC und ZIF-Steckverbinder */}
      <Layer {...common} from={0.04} to={0.3} spread={150}>
        <IsoPlate cx={CX} cy={CY} a={A * 0.62} b={B * 0.62} t={9} fill={C.pcb} side="#0d3a20">
          {/* QFP-IC mit Pins an allen vier Kanten */}
          <polygon
            points={`${CX - 40},${CY + 4} ${CX},${CY - 18} ${CX + 40},${CY + 4} ${CX},${CY + 26}`}
            fill={C.ic}
          />
          <g stroke={C.metal} strokeWidth="1.6">
            {[0, 1, 2, 3, 4].map((i) => {
              const f = (i - 2) / 2.6;
              return (
                <g key={i}>
                  <path d={`M${CX - 40 + f * 36} ${CY + 4 + f * 20} l-8 -5`} />
                  <path d={`M${CX + 40 + f * 36} ${CY + 4 - f * 20} l8 5`} />
                  <path d={`M${CX + f * 36} ${CY - 18 + f * 20} l-8 -4`} />
                  <path d={`M${CX + f * 36} ${CY + 26 - f * 20} l8 4`} />
                </g>
              );
            })}
          </g>
          {/* ZIF-Steckverbinder als heller Riegel */}
          <polygon
            points={`${CX - 92},${CY - 10} ${CX - 46},${CY - 36} ${CX - 32},${CY - 28} ${CX - 78},${CY - 2}`}
            fill="#e8ebee"
          />
        </IsoPlate>
        <LayerLabel x={LABEL_X} y={CY + 52} text="Controller-IC" sub="EETI · Ilitek · Goodix" length={44} />
      </Layer>

      {/* 2. FPC-Band von der Platine zur Scheibe */}
      <Layer {...common} from={0.08} to={0.32} spread={96}>
        <path
          d={`M${CX - 78} ${CY - 8} L${CX - 40} ${CY - 30} L${CX - 24} ${CY - 92} L${CX - 58} ${CY - 76} Z`}
          fill={C.fpc}
        />
        <g stroke={C.fpcDark} strokeWidth="1.3" fill="none">
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${CX - 68 + i * 12} ${CY - 16 + i * 3} L${CX - 48 + i * 10} ${CY - 78}`} />
          ))}
        </g>
      </Layer>

      {/* 3. OGS-Scheibe: Sensor und Deckglas in einem Stück Glas */}
      <Layer {...common} from={0.12} to={0.38} spread={-30}>
        {/* Das Glas selbst – transparent */}
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={9} fill={C.glass} side={C.brand200} opacity={0.5} />

        {/*
          Siebdruck und Sensorraster liegen bewusst NEBEN der Platte, nicht in
          ihr: als Kinder würden sie die Glas-Transparenz miterben und
          ausbleichen.
        */}
        <path
          fillRule="evenodd"
          fill="#0d1117"
          d={`M${CX - A} ${CY} L${CX} ${CY - B} L${CX + A} ${CY} L${CX} ${CY + B} Z
              M${CX - A + 40} ${CY} L${CX} ${CY - B + 22} L${CX + A - 40} ${CY} L${CX} ${CY + B - 22} Z`}
        />

        {/* Rautenförmiges ITO-Elektrodenraster, wird beim Scrollen sichtbar */}
        <FadeIn {...common} from={0.3} to={0.54} toOpacity={0.85}>
          <g stroke={C.brand500} strokeWidth="1.6" fill="none">
            {[-3, -2, -1, 0, 1, 2, 3].map((r) =>
              [-3, -2, -1, 0, 1, 2, 3].map((c2) => {
                if (Math.abs(c2 - r) > 5 || Math.abs(c2 + r) > 5) return null;
                const gx = CX + (c2 - r) * 26;
                const gy = CY + (c2 + r) * 14.5;
                return (
                  <polygon
                    key={`${r}-${c2}`}
                    points={`${gx - 12.5},${gy} ${gx},${gy - 7} ${gx + 12.5},${gy} ${gx},${gy + 7}`}
                  />
                );
              })
            )}
          </g>
        </FadeIn>

        {/* Glanzstreifen auf dem Deckglas */}
        <polygon
          points={`${CX - 112},${CY - 28} ${CX - 44},${CY - 66} ${CX - 20},${CY - 53} ${CX - 88},${CY - 15}`}
          fill={C.white}
          opacity="0.4"
        />

        <LayerLabel x={LABEL_X} y={CY - 34} text="OGS-Deckglas" sub="Sensor + Glas in einem" length={44} />
        <LayerLabel x={LABEL_X} y={CY + 12} text="ITO-Raster" sub="projiziert-kapazitiv" length={44} />
      </Layer>

      {/* Zwei Berührpunkte mit Feldlinien – Multi-Touch */}
      <FadeIn {...common} from={0.56} to={0.74}>
        {([
          [CX - 66, CY - 96],
          [CX + 68, CY - 58],
        ] as [number, number][]).map(([fx, fy], i) => (
          <g key={i}>
            {[14, 26, 38].map((r, j) => (
              <ellipse
                key={r}
                cx={fx}
                cy={fy}
                rx={r}
                ry={r * 0.55}
                fill="none"
                stroke={C.brand500}
                strokeWidth="2"
                opacity={0.6 - j * 0.16}
              />
            ))}
            <ellipse cx={fx} cy={fy} rx="11" ry="6" fill={C.brand500} opacity="0.5" />
            <ellipse cx={fx} cy={fy} rx="5" ry="2.8" fill={C.brand700} />
          </g>
        ))}
      </FadeIn>

      <FadeIn {...common} from={0.62} to={0.78}>
        <Chip x={44} y={520} label="Multi-Touch" />
        <Chip x={168} y={520} label="mit Handschuh" />
        <Chip x={318} y={520} label="Water-Rejection" />
      </FadeIn>
    </svg>
  );
}
