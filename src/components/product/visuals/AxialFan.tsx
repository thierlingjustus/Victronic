import { at, C, Chip, FadeIn, Layer, LayerLabel, VIEWBOX, type ProductVisualProps } from './stage';
import { useScrollStyle } from '../useScrollStyle';

/**
 * Lüfter (modelType "fan"): Axiallüfter als leichte Explosionsdarstellung –
 * Rahmen mit Schutzstegen, neunflügeliges Flügelrad, Kugellager-Rotor,
 * bewickelter Stator mit Ansteuer-PCB und vieradrige Anschlussleitung.
 * Inhaltlich nach den Captions zu exploded-pwm.jpg und
 * exploded-dual-bearing.jpg in products.ts.
 *
 * Frontal statt isometrisch: Flügelrad und Lagerung sind so deutlich besser
 * lesbar als in der Raute der anderen Visuals.
 */

const CX = 300;
const CY = 290;
const R_FRAME = 168;
const R_GRILLE = 138;
const BLADES = 9;

/** Ein Flügel als gebogene Fläche, von der Nabe nach aussen. */
function Blade({ index }: { index: number }) {
  const a = (index / BLADES) * 360;
  return (
    <path
      d={`M40 -14 Q104 -46 128 -12 Q104 26 40 14 Q28 0 40 -14 Z`}
      fill={C.slate}
      stroke="#0f172a"
      strokeWidth="1.5"
      transform={`rotate(${a})`}
      opacity="0.92"
    />
  );
}

export default function AxialFan({ progress, reducedMotion }: ProductVisualProps) {
  const common = { progress, reducedMotion };

  /*
   * Der Rotor dreht sich mit dem Scrollen und wird dabei schneller. Das läuft
   * nicht über <Layer>, weil dort nur Deckkraft und Versatz gesteuert werden.
   * transformBox/transformOrigin sind zwingend – ohne sie dreht ein SVG-Knoten
   * um den Ursprung der viewBox statt um die Nabe.
   */
  const rotorRef = useScrollStyle<SVGGElement>(
    progress,
    { input: [at(0.08), at(0.35), at(0.9)], opacity: [0, 1, 1], rotate: [0, 90, 1080] },
    reducedMotion
  );

  return (
    <svg viewBox={VIEWBOX} className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* 1. Rahmen mit Gitterdurchbruch und vier Schraublöchern */}
      <Layer {...common} from={0.04} to={0.26} spread={0}>
        <path
          fillRule="evenodd"
          fill="#3a3f47"
          d={`M${CX - R_FRAME + 46} ${CY - R_FRAME}
              h${2 * R_FRAME - 92} a46 46 0 0 1 46 46
              v${2 * R_FRAME - 92} a46 46 0 0 1 -46 46
              h${-(2 * R_FRAME - 92)} a46 46 0 0 1 -46 -46
              v${-(2 * R_FRAME - 92)} a46 46 0 0 1 46 -46 Z
              M${CX} ${CY - R_GRILLE} a${R_GRILLE} ${R_GRILLE} 0 1 0 0.1 0 Z`}
        />
        {/* Schraublöcher mit Gummitüllen */}
        {([
          [CX - 132, CY - 132],
          [CX + 132, CY - 132],
          [CX + 132, CY + 132],
          [CX - 132, CY + 132],
        ] as [number, number][]).map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="15" fill="#15181d" />
            <circle cx={x} cy={y} r="8" fill={C.white} opacity="0.9" />
          </g>
        ))}
        {/* Drei Haltestege zur Nabe */}
        <g stroke="#3d434b" strokeWidth="13" strokeLinecap="round">
          {[0, 120, 240].map((deg) => (
            <path
              key={deg}
              d={`M${CX} ${CY} L${CX} ${CY - R_GRILLE + 4}`}
              transform={`rotate(${deg + 24} ${CX} ${CY})`}
              fill="none"
            />
          ))}
        </g>
        <LayerLabel x={CX + R_FRAME} y={CY - 120} text="Rahmen" sub="4 Schraubpunkte" length={40} />
      </Layer>

      {/* 2. Bewickelter Stator mit Ansteuer-PCB – liegt hinter dem Rotor */}
      <Layer {...common} from={0.1} to={0.32} spread={0}>
        <circle cx={CX} cy={CY} r="52" fill={C.slate} />
        {/* Wicklungspakete */}
        <g stroke={C.gold} strokeWidth="4" opacity="0.85">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              d={`M${CX} ${CY - 30} A30 30 0 0 1 ${CX + 26} ${CY - 15}`}
              transform={`rotate(${deg} ${CX} ${CY})`}
              fill="none"
            />
          ))}
        </g>
        {/* Ansteuer-PCB */}
        <rect x={CX - 34} y={CY + 34} width="68" height="26" rx="3" fill={C.pcb} />
        <rect x={CX - 20} y={CY + 42} width="18" height="11" rx="2" fill={C.ic} />
        <LayerLabel x={CX + R_FRAME} y={CY + 90} text="Stator + PWM-PCB" sub="Tachosignal" length={40} />
      </Layer>

      {/* 3. Flügelrad – dreht sich, wird beim Scrollen schneller */}
      <g
        ref={rotorRef}
        style={{ opacity: 0, transformOrigin: `${CX}px ${CY}px`, transformBox: 'view-box' }}
      >
        <g transform={`translate(${CX} ${CY})`}>
          {Array.from({ length: BLADES }).map((_, i) => (
            <Blade key={i} index={i} />
          ))}
          {/* Nabe mit Rotorkappe */}
          <circle r="42" fill="#2b3038" />
          <circle r="42" fill="none" stroke="#1a1f26" strokeWidth="2" />
          <circle r="26" fill="#343a44" />
          <circle cx="-9" cy="-9" r="10" fill={C.white} opacity="0.14" />
        </g>
      </g>

      {/* 4. Kugellager-Rotor: Welle mit zwei Lagern (Dual Ball Bearing) */}
      <Layer {...common} from={0.3} to={0.5} spread={0}>
        <g transform={`translate(740 ${CY - 40})`}>
          {/* Welle */}
          <rect x="-9" y="-92" width="18" height="196" rx="5" fill={C.steel} />
          {/* Zwei Lager beidseitig */}
          {[-64, 68].map((y, i) => (
            <g key={i}>
              <circle cy={y} r="34" fill="none" stroke={C.metal} strokeWidth="9" />
              <circle cy={y} r="34" fill="none" stroke={C.metalDark} strokeWidth="1.5" />
              <circle cy={y} r="25" fill="none" stroke={C.metalDark} strokeWidth="1.5" />
              {/* Kugeln im Käfig */}
              <g fill={C.white}>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  return <circle key={deg} cx={Math.cos(rad) * 29.5} cy={y + Math.sin(rad) * 29.5} r="5.5" />;
                })}
              </g>
            </g>
          ))}
        </g>
        <LayerLabel x={706} y={CY - 40} text="Dual Ball Bearing" sub="beidseitig gelagert" side="left" length={30} />
      </Layer>

      {/* 5. Vieradrige Anschlussleitung mit Stecker */}
      <Layer {...common} from={0.4} to={0.6} spread={0}>
        <g strokeWidth="5" fill="none" strokeLinecap="round">
          <path d={`M${CX - 118} ${CY + 148} q-40 34 -22 62`} stroke={C.ink} />
          <path d={`M${CX - 110} ${CY + 150} q-34 36 -16 62`} stroke={C.inkFaint} />
          <path d={`M${CX - 102} ${CY + 152} q-28 38 -10 62`} stroke={C.fpc} />
          <path d={`M${CX - 94} ${CY + 154} q-22 40 -4 62`} stroke={C.pcbTrace} />
        </g>
        {/* Stecker */}
        <rect x={CX - 168} y={CY + 210} width="66" height="26" rx="4" fill="#eef1f4" stroke={C.line} strokeWidth="1.5" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={CX - 160 + i * 15} y={CY + 216} width="7" height="15" rx="2" fill={C.metalDark} />
        ))}
        <text x={CX - 92} y={CY + 228} fill={C.inkSoft} fontSize="13" fontFamily="inherit">
          4-adrig: +, −, Tacho, PWM
        </text>
      </Layer>

      <FadeIn {...common} from={0.62} to={0.78}>
        <Chip x={556} y={422} label="PWM + Tachosignal" />
        <Chip x={556} y={458} label="IP55 bis IP68" />
      </FadeIn>
    </svg>
  );
}
