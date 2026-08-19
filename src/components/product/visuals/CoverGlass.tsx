import { C, Chip, FadeIn, Layer, LayerLabel, VIEWBOX, type ProductVisualProps } from './stage';

/**
 * Glaslösungen (modelType "glass"): ein veredeltes Deckglas im Format 3:2 mit
 * siebgedrucktem Passepartout, silbernen Markierungen und CNC-gefrästem
 * Rundausschnitt, dazu das Kanten-Schnittdetail mit den Beschichtungen.
 * Bauteile nach der gelieferten CAD-Datei cover-glass-printed
 * (cover_glass_pane, screen_print_border, silver_marking mit marking_bar und
 * marking_dot, glass_edge_polished) und den drei Captions in products.ts.
 */

// Scheibe im echten Seitenverhältnis 3:2 (230 x 154 mm)
const PX = 70;
const PY = 170;
const PW = 345;
const PH = 230;

// Breite des umlaufenden Siebdruckrands
const BORDER_X = 34;
const BORDER_Y = 30;

/**
 * CNC-Ausschnitt – bewusst vollständig innerhalb der freien Fläche, damit er
 * den Druckrand nicht schneidet (sonst überdeckt der Druck den Ausschnitt).
 */
const HX = PX + PW - 66;
const HY = PY + 70;
const HR = 26;

export default function CoverGlass({ progress, reducedMotion }: ProductVisualProps) {
  const common = { progress, reducedMotion };

  return (
    <svg viewBox={VIEWBOX} className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* 1. Die Glasscheibe mit CNC-Ausschnitt */}
      <Layer {...common} from={0.04} to={0.26} spread={0}>
        {/* Echtes Loch: äußere Kontur und Kreis in einem Pfad, evenodd stanzt */}
        <path
          fillRule="evenodd"
          fill={C.glass}
          opacity="0.55"
          d={`M${PX} ${PY} h${PW} v${PH} h${-PW} Z
              M${HX} ${HY - HR} a${HR} ${HR} 0 1 0 0.1 0 Z`}
        />
        <rect x={PX} y={PY} width={PW} height={PH} fill="none" stroke={C.brand200} strokeWidth="2.5" />
        <circle cx={HX} cy={HY} r={HR} fill="none" stroke={C.brand300} strokeWidth="2.5" />
        {/* Glanzstreifen über die Scheibe */}
        <polygon
          points={`${PX + 36},${PY + PH} ${PX + 138},${PY} ${PX + 180},${PY} ${PX + 78},${PY + PH}`}
          fill={C.white}
          opacity="0.4"
        />
        <LayerLabel x={HX - HR} y={HY} text="CNC-Ausschnitt" sub="Bohrungen" side="left" length={58} />
      </Layer>

      {/* 2. Umlaufender Siebdruck-Passepartout */}
      <Layer {...common} from={0.16} to={0.38} spread={0}>
        <path
          fillRule="evenodd"
          fill="#0d1117"
          d={`M${PX} ${PY} h${PW} v${PH} h${-PW} Z
              M${PX + BORDER_X} ${PY + BORDER_Y} h${PW - 2 * BORDER_X} v${PH - 2 * BORDER_Y} h${-(PW - 2 * BORDER_X)} Z`}
        />
        <LayerLabel
          x={PX + PW - 16}
          y={PY + PH - 15}
          text="Siebdruck-Rand"
          sub="Logos & Buttons"
          length={48}
        />
      </Layer>

      {/* 3. Silberne Markierungen im Druck (marking_bar, marking_dot) */}
      <Layer {...common} from={0.3} to={0.46} spread={0}>
        <rect x={PX + 56} y={PY + 12} width="84" height="7" rx="3.5" fill="#7c838b" />
        <circle cx={PX + PW - 48} cy={PY + PH - 15} r="6" fill="#7c838b" />
      </Layer>

      {/* 4. Kanten-Schnittdetail: Fase, Politur und die Beschichtungen */}
      <FadeIn {...common} from={0.44} to={0.66}>
        {/* Führungslinie von der rechten Scheibenkante zum Detail */}
        <path d={`M${PX + PW} ${PY + 150} L462 244`} stroke={C.line} strokeWidth="1.5" fill="none" />

        <g transform="translate(462 150)">
          <rect x="0" y="0" width="300" height="210" rx="12" fill={C.white} stroke={C.line} strokeWidth="1.5" />
          <text x="150" y="28" fill={C.ink} fontSize="15" fontWeight="700" textAnchor="middle" fontFamily="inherit">
            Kante im Schnitt
          </text>

          {/* Glasquerschnitt mit beidseitiger Fase */}
          <path d="M54 122 h192 l-18 -18 h-156 Z" fill={C.glass} stroke={C.brand300} strokeWidth="1.5" />
          <path d="M54 122 h192 l-18 18 h-156 Z" fill={C.glass} opacity="0.55" stroke={C.brand300} strokeWidth="1.5" />

          {/* Beschichtungen als feine Lagen auf der Oberseite */}
          {([
            ['AG', 96, C.brand400, 'Anti-Glare'],
            ['AR', 84, C.brand500, 'Anti-Reflective'],
            ['AF', 72, C.brand700, 'Anti-Fingerprint'],
          ] as [string, number, string, string][]).map(([tag, y, col, name]) => (
            <g key={tag}>
              <path d={`M78 ${y} h100`} stroke={col} strokeWidth="3.5" />
              <text x="70" y={y + 4} fill={col} fontSize="12" fontWeight="700" textAnchor="end" fontFamily="inherit">
                {tag}
              </text>
              <text x="186" y={y + 4} fill={C.inkSoft} fontSize="11.5" fontFamily="inherit">
                {name}
              </text>
            </g>
          ))}

          {/* Splitterschutzfolie auf der Rückseite */}
          <path d="M54 146 h192" stroke={C.inkFaint} strokeWidth="3" strokeDasharray="5 4" />
          <text x="150" y="170" fill={C.inkSoft} fontSize="12" textAnchor="middle" fontFamily="inherit">
            Splitterschutzfolie (Shatter-Proof)
          </text>
          <text x="150" y="190" fill={C.inkFaint} fontSize="11.5" textAnchor="middle" fontFamily="inherit">
            gefaste, polierte Kante
          </text>
        </g>
      </FadeIn>

      <FadeIn {...common} from={0.62} to={0.8}>
        <Chip x={70} y={452} label="chemisch gehärtet" />
        <Chip x={228} y={452} label="AG · AR · AF" />
        <Chip x={346} y={452} label="EN 50155" />
      </FadeIn>
    </svg>
  );
}
