import { C, Chip, FadeIn, IsoPlate, Layer, LayerLabel, VIEWBOX, type ProductVisualProps } from './stage';

/**
 * Montage & Gehäuse (modelType "assembly"): das Box-Build-Endgerät als
 * Explosionsdarstellung – Rückschale mit HDMI-, Ethernet- und Stromanschluss
 * samt Kabelkonfektion, SMT-bestückte Leiterplatte, Displaymodul und
 * Frontblende mit Bedientasten. Zum Schluss das Prüfsiegel der
 * End-of-Line-Tests. Inhaltlich nach den Captions zu smt-pcb.jpg und
 * box-build-module.jpg in products.ts.
 *
 * Dient zugleich als Rückfall für unbekannte modelType-Werte.
 */

const CX = 296;
const CY = 300;
const A = 196;
const B = 108;

/** Alle Beschriftungen stehen rechts – links wäre in der viewBox kein Platz. */
const LABEL_X = CX + A;

export default function BoxBuild({ progress, reducedMotion }: ProductVisualProps) {
  const common = { progress, reducedMotion };

  return (
    <svg viewBox={VIEWBOX} className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="bb-lit" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={C.brand300} />
          <stop offset="50%" stopColor={C.brand500} />
          <stop offset="100%" stopColor={C.brand700} />
        </linearGradient>
      </defs>

      {/* 1. Rückschale mit den Anschlüssen und der Kabelkonfektion */}
      <Layer {...common} from={0.04} to={0.3} spread={158}>
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={26} fill={C.plasticMid} side="#a2a9b2">
          {/* HDMI – breiter flacher Metallschacht */}
          <polygon
            points={`${CX - 118},${CY + 40} ${CX - 62},${CY + 8} ${CX - 40},${CY + 20} ${CX - 96},${CY + 52}`}
            fill="#8b939c"
          />
          {/* Ethernet – quadratischer Schacht mit Rastnase */}
          <polygon
            points={`${CX - 30},${CY + 46} ${CX + 8},${CY + 24} ${CX + 30},${CY + 36} ${CX - 8},${CY + 58}`}
            fill="#5a6572"
          />
          <rect x={CX - 8} y={CY + 30} width="12" height="7" rx="2" fill="#5a6572" />
          {/* Rundbuchse für die Stromversorgung */}
          <ellipse cx={CX + 66} cy={CY + 40} rx="15" ry="9" fill="#2b2f36" />
          <ellipse cx={CX + 66} cy={CY + 40} rx="6" ry="3.5" fill={C.metal} />
        </IsoPlate>
        {/* Konfektionierte Kabelpeitsche */}
        <g stroke="#22262c" strokeWidth="7" fill="none" strokeLinecap="round">
          <path d={`M${CX + 78} ${CY + 46} q64 22 84 74`} />
        </g>
        <g stroke={C.ink} strokeWidth="4" fill="none" strokeLinecap="round">
          <path d={`M${CX + 78} ${CY + 52} q58 26 78 76`} />
        </g>
        <LayerLabel x={LABEL_X} y={CY + 56} text="HDMI · Ethernet" sub="Kabelkonfektionierung" length={44} />
      </Layer>

      {/* 2. SMT-bestückte Leiterplatte */}
      <Layer {...common} from={0.09} to={0.35} spread={78}>
        <IsoPlate cx={CX} cy={CY} a={A * 0.93} b={B * 0.93} t={9} fill={C.pcb} side="#0d3a20">
          {/* Leiterbahnen */}
          <g stroke={C.pcbTrace} strokeWidth="2" fill="none">
            <path d={`M${CX - 120} ${CY} L${CX - 40} ${CY - 44} L${CX + 66} ${CY + 14}`} />
            <path d={`M${CX - 70} ${CY + 36} L${CX + 40} ${CY - 24}`} />
          </g>
          {/* SoC */}
          <polygon points={`${CX - 74},${CY - 6} ${CX - 26},${CY - 32} ${CX + 22},${CY - 6} ${CX - 26},${CY + 20}`} fill={C.ic} />
          {/* Speicher und weitere ICs */}
          <polygon points={`${CX + 40},${CY + 18} ${CX + 76},${CY - 2} ${CX + 104},${CY + 13} ${CX + 68},${CY + 33}`} fill={C.ic} />
          {/* Dichte SMD-Reihen – das Kennzeichen der SMT-Bestückung */}
          <g fill={C.icSoft}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) =>
              [0, 1, 2].map((j) => {
                const x = CX - 130 + i * 21 + j * 11;
                const y = CY + 44 - i * 11 + j * 6;
                return <polygon key={`${i}-${j}`} points={`${x - 7},${y} ${x},${y - 4} ${x + 7},${y} ${x},${y + 4}`} />;
              })
            )}
          </g>
          {/* Steckverbinder zum Display */}
          <polygon points={`${CX - 16},${CY - 52} ${CX + 30},${CY - 78} ${CX + 44},${CY - 70} ${CX - 2},${CY - 44}`} fill={C.fpc} />
        </IsoPlate>
        <LayerLabel x={LABEL_X} y={CY + 16} text="SMT-Bestückung" sub="und THT" length={44} />
      </Layer>

      {/* 3. Displaymodul */}
      <Layer {...common} from={0.15} to={0.41} spread={6}>
        <IsoPlate cx={CX} cy={CY} a={A * 0.86} b={B * 0.86} t={12} fill={C.slate} side="#0f172a">
          <polygon
            points={`${CX - A * 0.72},${CY} ${CX},${CY - B * 0.72} ${CX + A * 0.72},${CY} ${CX},${CY + B * 0.72}`}
            fill={C.screenDark}
          />
          {/* Schaltet sich ein – wie beim End-of-Line-Funktionstest */}
          <FadeIn {...common} from={0.56} to={0.76} toOpacity={0.92}>
            <polygon
              points={`${CX - A * 0.72},${CY} ${CX},${CY - B * 0.72} ${CX + A * 0.72},${CY} ${CX},${CY + B * 0.72}`}
              fill="url(#bb-lit)"
            />
          </FadeIn>
        </IsoPlate>
      </Layer>

      {/* 4. Frontblende mit Display-Ausschnitt und Bedientasten */}
      <Layer {...common} from={0.21} to={0.47} spread={-88}>
        <g>
          <path
            fillRule="evenodd"
            fill={C.plasticLight}
            d={`M${CX - A} ${CY} L${CX} ${CY - B} L${CX + A} ${CY} L${CX} ${CY + B} Z
                M${CX - A * 0.74} ${CY - 12} L${CX} ${CY - B * 0.74 - 12} L${CX + A * 0.74} ${CY - 12} L${CX} ${CY + B * 0.74 - 12} Z`}
          />
          <polygon
            points={`${CX - A},${CY} ${CX},${CY - B} ${CX + A},${CY} ${CX},${CY + B}`}
            fill="none"
            stroke={C.plasticMid}
            strokeWidth="2"
          />
          {/* Bedientasten entlang der vorderen Kante */}
          {[0, 1, 2, 3].map((i) => {
            const f = -0.34 + i * 0.2;
            const x = CX + f * A;
            const y = CY + (1 - Math.abs(f)) * B * 0.62;
            return (
              <g key={i}>
                <ellipse cx={x} cy={y} rx="12" ry="7" fill="#3f4650" />
                <ellipse cx={x} cy={y} rx="12" ry="7" fill="none" stroke="#aeb5bd" strokeWidth="1.5" />
              </g>
            );
          })}
        </g>
        <LayerLabel x={LABEL_X} y={CY - 20} text="Frontblende" sub="Bedientasten" length={44} />
      </Layer>

      {/* Prüfsiegel der End-of-Line-Tests */}
      <FadeIn {...common} from={0.64} to={0.8}>
        <g transform="translate(596 52)">
          <rect x="0" y="0" width="168" height="98" rx="10" fill={C.white} stroke={C.brand100} strokeWidth="1.5" />
          <text x="14" y="26" fill={C.brand700} fontSize="12.5" fontWeight="700" fontFamily="inherit">
            100 % geprüft
          </text>
          {['AOI', 'ICT', 'Funktionstest'].map((t, i) => (
            <g key={t}>
              <path
                d={`M16 ${42 + i * 18} l5 5 l9 -10`}
                stroke={C.brand600}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="38" y={47 + i * 18} fill={C.inkSoft} fontSize="12" fontFamily="inherit">
                {t}
              </text>
            </g>
          ))}
        </g>
      </FadeIn>

      <FadeIn {...common} from={0.66} to={0.82}>
        <Chip x={44} y={512} label="Potting & Conformal Coating" />
      </FadeIn>
    </svg>
  );
}
