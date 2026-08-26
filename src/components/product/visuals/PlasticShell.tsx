import { C, Chip, FadeIn, IsoPlate, StackLayer, VIEWBOX, type ProductVisualProps } from './stage';

/**
 * Kunststoffkomponenten (modelType "plastic"): Gehäuseunterschale aus
 * PA66+GF30. Beim Scrollen heben sich die Anbauteile aus der Schale heraus –
 * Schraubdome mit Stahl-Gewindeeinsatz, Platinenauflage mit Führungsstiften,
 * Schnapphaken und Steckeraufnahme, zuletzt die umlaufende Dichtungsnut.
 * Als Detail die IMR-Dekorschicht im Schnitt ([PRÄS] S. 19).
 *
 * Vorher hatten alle Schichten spread={0}, das Visual blendete nur ein.
 * 2K-Spritzguss ist in keiner Quelle belegt und deshalb nicht mehr dargestellt.
 */

const CX = 300;
const CY = 300;
const A = 155;
const B = 86;

/** Alle Beschriftungen stehen rechts – links wäre in der viewBox kein Platz. */
const LABEL_X = CX + A;
/** Höhe der hochgezogenen Wände in Bildpunkten. */
const WALL = 38;

/** Zahl der Schichten – bestimmt die Staffelung über LAYER_BAND. */
const N = 5;

/**
 * Faktenkarte → Schicht. specs in products.ts:
 * 0 Materialien · 1 Sondermaterialien · 2 Verfahren (IML/IMR, nur im Detail)
 */
const SPEC_LAYERS = [0, 1, -1];

/** Punkt auf der Rautenfläche: s und t laufen von -1 bis 1, |s|+|t| <= 1. */
const px = (s: number, t: number) => CX + (s - t) * A * 0.5;
const py = (s: number, t: number) => CY + (s + t) * B * 0.5;

export default function PlasticShell({ progress, reducedMotion, activeFact = -1 }: ProductVisualProps) {
  const common = { progress, reducedMotion };
  const active = activeFact >= 0 ? SPEC_LAYERS[activeFact] ?? -1 : -1;
  const layer = { ...common, n: N, activeIndex: active };

  return (
    <svg viewBox={VIEWBOX} className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* 0. Die Schale: Boden plus vier hochgezogene Wände */}
      <StackLayer
        {...layer}
        i={0}
        spread={80}
        label={{ x: LABEL_X, y: CY + 20, text: 'PA66+GF30', sub: 'glasfaserverstärkt', length: 44 }}
      >
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
      </StackLayer>

      {/* 1. Schraubdome mit Verstärkungsstegen und Stahl-Gewindeeinsatz */}
      <StackLayer
        {...layer}
        i={1}
        spread={16}
        label={{ x: LABEL_X, y: CY, text: 'Schraubdom', sub: 'Stahl-Gewindeeinsatz', length: 44 }}
      >
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
                  height="26"
                  fill="#3d434b"
                  transform={`rotate(${deg + 30} ${x} ${y})`}
                />
              ))}
              {/* Dom und Gewindeeinsatz */}
              <ellipse cx={x} cy={y} rx="17" ry="10" fill="#3a4048" />
              <ellipse cx={x} cy={y} rx="10" ry="6" fill={C.steel} />
              <ellipse cx={x} cy={y} rx="5.5" ry="3.2" fill="#0f1113" />
            </g>
          );
        })}
      </StackLayer>

      {/* 2. Platinenauflage, Führungsstifte, Typenschildrahmen */}
      <StackLayer
        {...layer}
        i={2}
        spread={-26}
        label={{ x: LABEL_X, y: CY, text: 'Platinenauflage', sub: 'mit Führungsstiften', length: 44 }}
      >
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
          <ellipse key={i} cx={px(s, t)} cy={py(s, t) - WALL} rx="6.5" ry="3.8" fill="#8b929a" />
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
      </StackLayer>

      {/* 3. Schnapphaken an den Längswänden und Steckeraufnahme mit Kragen */}
      <StackLayer
        {...layer}
        i={3}
        spread={-72}
        label={{ x: LABEL_X, y: CY, text: 'Schnapphaken', sub: 'schraubenlose Montage', length: 44 }}
      >
        {[-0.5, 0.1].map((s, i) => (
          <g key={i}>
            <rect x={px(s, -1) - 13} y={py(s, -1) - WALL - 4} width="26" height="8" rx="3" fill="#4a515a" />
            <rect x={px(s, -1) - 7} y={py(s, -1) - WALL - 10} width="14" height="6" rx="2" fill="#5b636d" />
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
                     ${CX + 0.42 * A},${CY - WALL + 0.58 * B + 24}
                     ${CX + 0.66 * A},${CY - WALL + 0.34 * B + 24}`}
            fill="#6c7277"
          />
          <polygon
            points={`${CX + 0.62 * A},${CY - WALL + 0.38 * B + 4}
                     ${CX + 0.46 * A},${CY - WALL + 0.54 * B + 4}
                     ${CX + 0.46 * A},${CY - WALL + 0.54 * B + 19}
                     ${CX + 0.62 * A},${CY - WALL + 0.38 * B + 19}`}
            fill="#0f1113"
          />
        </g>
      </StackLayer>

      {/* 4. Umlaufende Dichtungsnut auf der Wandoberkante */}
      <StackLayer
        {...layer}
        i={4}
        spread={-124}
        label={{ x: LABEL_X, y: CY, text: 'Dichtungsnut', sub: 'umlaufend, Wandoberkante', length: 44 }}
      >
        {/* Nut als schmales Doppelprofil */}
        <polygon
          points={`${CX - A},${CY - WALL} ${CX},${CY - B - WALL} ${CX + A},${CY - WALL} ${CX},${CY + B - WALL}`}
          fill="none"
          stroke="#4a515a"
          strokeWidth="7"
          strokeLinejoin="round"
        />
        <polygon
          points={`${CX - A + 10},${CY - WALL} ${CX},${CY - B - WALL + 5.5} ${CX + A - 10},${CY - WALL} ${CX},${CY + B - WALL - 5.5}`}
          fill="none"
          stroke="#15181c"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </StackLayer>

      {/* Detailausschnitt: IMR-Dekorschicht auf dem Grundkörper im Schnitt */}
      <FadeIn {...common} from={0.74} to={0.9}>
        <g transform="translate(700 470)">
          <circle r="56" fill={C.white} stroke={C.line} strokeWidth="1.5" />
          {/* Grundkörper */}
          <path d="M-38 22 h76 v-20 h-76 Z" fill={C.plasticDark} />
          {/* Dekorschicht, im Werkzeug übertragen – bewusst hauchdünn */}
          <path d="M-38 2 h76 v-6 h-76 Z" fill={C.brand500} />
          <path d="M-38 -4 h76 v-3 h-76 Z" fill={C.brand200} />
          <text x="0" y="44" fill={C.inkSoft} fontSize="12" textAnchor="middle" fontFamily="inherit">
            IMR-Dekorschicht
          </text>
        </g>
      </FadeIn>

      <FadeIn {...common} from={0.78} to={0.92}>
        <Chip x={276} y={548} label="PA66+GF · PC · LCP · POM · ABS" />
      </FadeIn>
    </svg>
  );
}
