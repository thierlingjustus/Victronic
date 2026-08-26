import { C, Chip, FadeIn, IsoPlate, StackLayer, VIEWBOX, type ProductVisualProps } from './stage';

/**
 * Glaslösungen (modelType "glass"): das veredelte Deckglas als Schichtstapel –
 * Glasscheibe mit CNC-Ausschnitt, siebgedruckter Passepartout-Rand, silberne
 * Markierungen und die Beschichtungslage. Daneben das Kanten-Schnittdetail mit
 * AG, AR, AF und AM.
 *
 * Vorher lagen alle Schichten bei spread={0} – das Visual blendete nur ein,
 * statt auseinanderzufahren. Bauteile nach der CAD-Datei cover-glass-printed
 * und den drei Captions in products.ts, Oberflächen nach [PRÄS] S. 10 und 19.
 */

const CX = 430;
const CY = 280;
const A = 170;
const B = 96;

const LABEL_R = CX + A;
const LEN_R = 24;

/** Zahl der Schichten – bestimmt die Staffelung über LAYER_BAND. */
const N = 4;

/** Breite des umlaufenden Siebdruckrands, als Anteil der Rautenfläche. */
const BORDER = 0.22;

/** CNC-Ausschnitt, vollständig innerhalb der freien Fläche. */
const HX = CX + 66;
const HY = CY - 12;
const HRX = 26;
const HRY = 15;

/**
 * Faktenkarte → Schicht. specs in products.ts:
 * 0 Materialien · 1 Härtung · 2 Oberflächen · 3 Bearbeitung & Design
 */
const SPEC_LAYERS = [0, 0, 3, 1];

/** Rautenkontur mit frei wählbarer Einrückung. */
const rhombus = (k: number) =>
  `M${CX - A * k} ${CY} L${CX} ${CY - B * k} L${CX + A * k} ${CY} L${CX} ${CY + B * k} Z`;

export default function CoverGlass({ progress, reducedMotion, activeFact = -1 }: ProductVisualProps) {
  const common = { progress, reducedMotion };
  const active = activeFact >= 0 ? SPEC_LAYERS[activeFact] ?? -1 : -1;
  const layer = { ...common, n: N, activeIndex: active };

  return (
    <svg viewBox={VIEWBOX} className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* 0. Die Glasscheibe mit CNC-Ausschnitt – unterste Ebene */}
      <StackLayer
        {...layer}
        i={0}
        spread={96}
        label={{ x: LABEL_R, y: CY + 4, text: 'Cover-Lens', sub: 'Glas oder PMMA', length: LEN_R }}
      >
        {/* Materialstärke */}
        <polygon points={`${CX - A},${CY} ${CX},${CY + B} ${CX},${CY + B + 9} ${CX - A},${CY + 9}`} fill={C.brand200} />
        <polygon points={`${CX + A},${CY} ${CX},${CY + B} ${CX},${CY + B + 9} ${CX + A},${CY + 9}`} fill={C.brand200} opacity="0.75" />
        {/* Deckfläche mit echtem Loch – evenodd stanzt den Ausschnitt */}
        <path
          fillRule="evenodd"
          fill={C.glass}
          opacity="0.85"
          d={`${rhombus(1)} M${HX - HRX} ${HY} a${HRX} ${HRY} 0 1 0 ${2 * HRX} 0 a${HRX} ${HRY} 0 1 0 ${-2 * HRX} 0 Z`}
        />
        <path d={rhombus(1)} fill="none" stroke={C.brand300} strokeWidth="3" />
        <ellipse cx={HX} cy={HY} rx={HRX} ry={HRY} fill="none" stroke={C.brand300} strokeWidth="2.5" />
        {/* Glanzstreifen über die Scheibe */}
        <polygon
          points={`${CX - 96},${CY + 26} ${CX - 26},${CY - 14} ${CX - 2},${CY - 1} ${CX - 72},${CY + 40}`}
          fill={C.white}
          opacity="0.45"
        />
      </StackLayer>

      {/* 1. Umlaufender Siebdruck-Passepartout */}
      <StackLayer
        {...layer}
        i={1}
        spread={36}
        label={{ x: LABEL_R, y: CY, text: 'Siebdruck-Rand', sub: 'Logos & Buttons', length: LEN_R }}
      >
        <path fillRule="evenodd" fill="#0d1117" d={`${rhombus(1)} ${rhombus(1 - BORDER)}`} />
      </StackLayer>

      {/* 2. Silberne Markierungen im Druck (marking_bar, marking_dot) */}
      <StackLayer {...layer} i={2} spread={-18}>
        <g fill="#7c838b">
          <polygon
            points={`${CX - 74},${CY + 12} ${CX - 26},${CY - 15} ${CX - 16},${CY - 9} ${CX - 64},${CY + 18}`}
          />
          <ellipse cx={CX + 74} cy={CY + 22} rx="8" ry="4.6" />
        </g>
      </StackLayer>

      {/* 3. Beschichtungslage – hauchdünn, deshalb nur als getönte Fläche */}
      <StackLayer
        {...layer}
        i={3}
        spread={-82}
        label={{ x: LABEL_R, y: CY - 4, text: 'Beschichtungen', sub: 'AG · AR · AF · AS · AM', length: LEN_R }}
      >
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={3} fill={C.brand200} side={C.brand300} opacity={0.8}>
          <path d={rhombus(1)} fill="none" stroke={C.brand400} strokeWidth="2" />
        </IsoPlate>
      </StackLayer>

      {/* Kanten-Schnittdetail: Fase, Politur und die Beschichtungen */}
      <FadeIn {...common} from={0.74} to={0.9}>
        {/* Führungslinie von der Scheibenkante zum Detail */}
        <path d={`M${CX - A} ${CY + 96} L262 352`} stroke={C.line} strokeWidth="1.5" fill="none" />

        <g transform="translate(16 300)">
          <rect x="0" y="0" width="250" height="190" rx="12" fill={C.white} stroke={C.line} strokeWidth="1.5" />
          <text x="125" y="26" fill={C.ink} fontSize="15" fontWeight="700" textAnchor="middle" fontFamily="inherit">
            Kante im Schnitt
          </text>

          {/* Glasquerschnitt mit beidseitiger Fase */}
          <path d="M40 132 h170 l-16 -16 h-138 Z" fill={C.glass} stroke={C.brand300} strokeWidth="1.5" />
          <path d="M40 132 h170 l-16 16 h-138 Z" fill={C.glass} opacity="0.55" stroke={C.brand300} strokeWidth="1.5" />

          {/* Beschichtungen als feine Lagen auf der Oberseite */}
          {([
            ['AG', 108, C.brand400, 'Anti-Glare'],
            ['AR', 96, C.brand500, 'Anti-Reflective'],
            ['AF', 84, C.brand700, 'Anti-Fingerprint'],
            ['AM', 72, C.brand900, 'Anti-Microbial (Ag+)'],
          ] as [string, number, string, string][]).map(([tag, y, col, name]) => (
            <g key={tag}>
              <path d={`M62 ${y} h74`} stroke={col} strokeWidth="3.5" />
              <text x="54" y={y + 4} fill={col} fontSize="12" fontWeight="700" textAnchor="end" fontFamily="inherit">
                {tag}
              </text>
              <text x="144" y={y + 4} fill={C.inkSoft} fontSize="11.5" fontFamily="inherit">
                {name}
              </text>
            </g>
          ))}

          <text x="125" y="166" fill={C.inkSoft} fontSize="12" textAnchor="middle" fontFamily="inherit">
            gefaste, polierte Kante
          </text>
        </g>
      </FadeIn>

      <FadeIn {...common} from={0.78} to={0.92}>
        <Chip x={147} y={540} label="chemisch gehärtet" />
        <Chip x={318} y={540} label="2D · 2.5D · 3D-Kanten" />
        <Chip x={517} y={540} label="AM · SGS-zertifiziert" />
      </FadeIn>
    </svg>
  );
}
