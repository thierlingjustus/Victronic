import { C, Chip, FadeIn, IsoPlate, Layer, LayerLabel, VIEWBOX, type ProductVisualProps } from './stage';

/**
 * Kunststoffkomponenten (modelType "plastic"): Innenansicht einer
 * Gehäuseunterschale aus PA66+GF30. Bauteile und Materialien folgen dem
 * gelieferten CAD-Teil gehaeuse-unterschale-pa66gf30 – Boden mit Rippenraster,
 * Eckdome mit Verstärkungsstegen und Stahl-Gewindeeinsatz, Platinenauflage,
 * Führungsstifte, Schnapphaken, Steckeraufnahme mit Kragen, Typenschildrahmen
 * und die umlaufende TPE-Dichtlippe auf der Wandoberkante (2K-Verbindung).
 */

const CX = 286;
const CY = 300;
const A = 196;
const B = 108;

/** Alle Beschriftungen stehen rechts – links wäre in der viewBox kein Platz. */
const LABEL_X = CX + A;
/** Höhe der hochgezogenen Wände in Bildpunkten. */
const WALL = 46;

/** Punkt auf der Rautenfläche: s und t laufen von -1 bis 1, |s|+|t| <= 1. */
const px = (s: number, t: number) => CX + (s - t) * A * 0.5;
const py = (s: number, t: number) => CY + (s + t) * B * 0.5;

export default function PlasticShell({ progress, reducedMotion }: ProductVisualProps) {
  const common = { progress, reducedMotion };

  return (
    <svg viewBox={VIEWBOX} className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* 1. Die Schale: Boden plus vier hochgezogene Wände */}
      <Layer {...common} from={0.04} to={0.28} spread={0}>
        {/* Wände – die beiden vorderen Flächen sind sichtbar */}
        <polygon
          points={`${CX - A},${CY} ${CX},${CY + B} ${CX},${CY + B - WALL} ${CX - A},${CY - WALL}`}
          fill="#16181c"
        />
        <polygon
          points={`${CX + A},${CY} ${CX},${CY + B} ${CX},${CY + B - WALL} ${CX + A},${CY - WALL}`}
          fill="#1e2126"
        />
        {/* Boden, um die Wandhöhe nach oben versetzt */}
        <IsoPlate cx={CX} cy={CY - WALL} a={A} b={B} t={0} fill="#282c32" side="#282c32">
          {/* Rippenraster im Boden */}
          <g stroke="#3d434b" strokeWidth="2.5" fill="none">
            {[-0.55, -0.18, 0.18, 0.55].map((s) => (
              <path
                key={`l${s}`}
                d={`M${px(s, -0.9 + Math.abs(s) * 0.9)} ${py(s, -0.9 + Math.abs(s) * 0.9) - WALL}
                    L${px(s, 0.9 - Math.abs(s) * 0.9)} ${py(s, 0.9 - Math.abs(s) * 0.9) - WALL}`}
              />
            ))}
            {[-0.5, 0, 0.5].map((t) => (
              <path
                key={`q${t}`}
                d={`M${px(-0.9 + Math.abs(t) * 0.9, t)} ${py(-0.9 + Math.abs(t) * 0.9, t) - WALL}
                    L${px(0.9 - Math.abs(t) * 0.9, t)} ${py(0.9 - Math.abs(t) * 0.9, t) - WALL}`}
              />
            ))}
          </g>
        </IsoPlate>
        <LayerLabel x={LABEL_X} y={CY + 36} text="PA66+GF30" sub="glasfaserverstärkt" length={44} />
      </Layer>

      {/* 2. Schraubdome mit Verstärkungsstegen und Stahl-Gewindeeinsatz */}
      <Layer {...common} from={0.14} to={0.34} spread={0}>
        {([
          [-0.62, -0.22],
          [0.22, -0.62],
          [0.62, 0.22],
          [-0.22, 0.62],
        ] as [number, number][]).map(([s, t], i) => {
          const x = px(s, t);
          const y = py(s, t) - WALL;
          return (
            <g key={i}>
              {/* Drei Domstege */}
              {[0, 120, 240].map((deg) => (
                <rect
                  key={deg}
                  x={x - 3}
                  y={y}
                  width="6"
                  height="28"
                  fill="#3d434b"
                  transform={`rotate(${deg + 30} ${x} ${y})`}
                />
              ))}
              {/* Dom und Gewindeeinsatz */}
              <ellipse cx={x} cy={y} rx="19" ry="11" fill="#3a4048" />
              <ellipse cx={x} cy={y} rx="11" ry="6.5" fill={C.steel} />
              <ellipse cx={x} cy={y} rx="6" ry="3.5" fill="#0f1113" />
            </g>
          );
        })}
        <LayerLabel x={LABEL_X} y={CY - 4} text="Schraubdom" sub="Stahl-Gewindeeinsatz" length={44} />
      </Layer>

      {/* 3. Platinenauflage, Führungsstifte, Typenschildrahmen */}
      <Layer {...common} from={0.22} to={0.42} spread={0}>
        <polygon
          points={`${px(-0.42, -0.42)},${py(-0.42, -0.42) - WALL}
                   ${px(0.42, -0.42)},${py(0.42, -0.42) - WALL}
                   ${px(0.42, 0.42)},${py(0.42, 0.42) - WALL}
                   ${px(-0.42, 0.42)},${py(-0.42, 0.42) - WALL}`}
          fill="none"
          stroke="#767d86"
          strokeWidth="2"
          strokeDasharray="9 7"
        />
        {/* Zwei Führungsstifte */}
        {([[-0.3, 0.3], [0.3, -0.3]] as [number, number][]).map(([s, t], i) => (
          <ellipse key={i} cx={px(s, t)} cy={py(s, t) - WALL} rx="7" ry="4" fill="#8b929a" />
        ))}
        {/* Typenschildrahmen im Boden */}
        <polygon
          points={`${px(-0.1, 0.5)},${py(-0.1, 0.5) - WALL}
                   ${px(0.3, 0.5)},${py(0.3, 0.5) - WALL}
                   ${px(0.3, 0.72)},${py(0.3, 0.72) - WALL}
                   ${px(-0.1, 0.72)},${py(-0.1, 0.72) - WALL}`}
          fill="none"
          stroke="#767d86"
          strokeWidth="1.5"
        />
      </Layer>

      {/* 4. Schnapphaken an den Längswänden und Steckeraufnahme mit Kragen */}
      <Layer {...common} from={0.3} to={0.5} spread={0}>
        {/* Schnapphaken */}
        {[-0.5, 0.1].map((s, i) => (
          <g key={i}>
            <rect x={px(s, -1) - 14} y={py(s, -1) - WALL - 4} width="28" height="9" rx="3" fill="#4a515a" />
            <rect x={px(s, -1) - 8} y={py(s, -1) - WALL - 11} width="16" height="7" rx="2" fill="#5b636d" />
          </g>
        ))}
        {/*
          Steckeraufnahme mit Kragen in der rechten Wand. Bewusst als Polygon
          entlang der Wandfläche statt per skewY – skewY schert um den Ursprung
          der viewBox und würde das Bauteil von der Schale wegziehen.
        */}
        <g>
          <polygon
            points={`${CX + 0.66 * A},${CY - WALL + 0.34 * B}
                     ${CX + 0.42 * A},${CY - WALL + 0.58 * B}
                     ${CX + 0.42 * A},${CY - WALL + 0.58 * B + 28}
                     ${CX + 0.66 * A},${CY - WALL + 0.34 * B + 28}`}
            fill="#6c7277"
          />
          <polygon
            points={`${CX + 0.62 * A},${CY - WALL + 0.38 * B + 5}
                     ${CX + 0.46 * A},${CY - WALL + 0.54 * B + 5}
                     ${CX + 0.46 * A},${CY - WALL + 0.54 * B + 22}
                     ${CX + 0.62 * A},${CY - WALL + 0.38 * B + 22}`}
            fill="#0f1113"
          />
        </g>
        <LayerLabel x={LABEL_X} y={CY - 44} text="Schnapphaken" sub="schraubenlose Montage" length={44} />
      </Layer>

      {/* 5. Umlaufende TPE-Dichtlippe auf der Wandoberkante – die 2K-Zone */}
      <Layer {...common} from={0.4} to={0.6} spread={0}>
        <polygon
          points={`${CX - A},${CY - WALL} ${CX},${CY - B - WALL} ${CX + A},${CY - WALL} ${CX},${CY + B - WALL}`}
          fill="none"
          stroke={C.tpe}
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <LayerLabel x={LABEL_X} y={CY - 84} text="TPE-Dichtlippe" sub="2K Hart-Weich" length={44} />
      </Layer>

      {/* 6. Detailausschnitt: Hart- und Weichkomponente im Schnitt */}
      <FadeIn {...common} from={0.56} to={0.74}>
        <g transform="translate(660 468)">
          <circle r="62" fill={C.white} stroke={C.line} strokeWidth="1.5" />
          <path d="M-42 20 h84 v-16 h-84 Z" fill={C.plasticDark} />
          <path d="M-42 4 q0 -22 20 -22 h44 q20 0 20 22 Z" fill={C.tpe} />
          <path d="M-42 4 h84" stroke={C.metal} strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="0" y="46" fill={C.inkSoft} fontSize="12" textAnchor="middle" fontFamily="inherit">
            2K-Verbund
          </text>
        </g>
        <path d={`M${CX + A - 30} ${CY - WALL + 16} L604 452`} stroke={C.line} strokeWidth="1.5" fill="none" />
      </FadeIn>

      <FadeIn {...common} from={0.62} to={0.8}>
        <Chip x={44} y={512} label="PA66+GF · PC · LCP" />
        <Chip x={230} y={512} label="IATF 16949" />
        <Chip x={366} y={512} label="Toleranzen im µm-Bereich" />
      </FadeIn>
    </svg>
  );
}
