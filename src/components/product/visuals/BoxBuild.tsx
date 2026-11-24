import {
  C,
  Chip,
  FadeIn,
  IsoPlate,
  LayerLabel,
  StackLayer,
  useStageViewBox,
  type ProductVisualProps,
} from './stage';

/**
 * Montage & Gehäuse (modelType "assembly"): das Box-Build-Endgerät als
 * Explosionsdarstellung – genau die Baugruppen, die Victronic laut
 * products.ts und systems.ts selbst liefert und im Modul vereint:
 *
 *  0 Kunststoff-Rückschale mit Buchsen, Schraubdomen, eingebautem
 *    Open-Frame-Netzteil und Kabel
 *      → specs "Gehäuse" (kundenspezifische Gerätegehäuse, Werkzeugbau laut
 *        alter Seite /housing/), Stromversorgungen (Open Frame 1–150 W) und
 *        die Synergie "… Stromversorgung … zu einem Gesamtsystem"
 *  1 Hauptplatine, bestückt
 *      → specs "Elektronik": SMD/SMT laut alter Seite /assembling/. Die
 *        Beschriftungen nennen bewusst kein THT und keine Kabelkonfektion –
 *        beides steht in keiner Unterlage.
 *  2 TFT-Displaymodul   → Produkt "TFT-Displays", System "TFT + Touch"
 *  3 Touch-Sensor mit Deckglas → Produkte "Touchscreens" (OGS/PCAP) und
 *    "Glaslösungen", von der Synergie ausdrücklich mitgenannt
 *  4 Frontblende mit Bedientasten → Key Facts TFT-CTP S. 1 (geschlossene
 *    Gehäuseoberschale mit kapazitiven Bedientasten oder Durchbrüchen für
 *    mechanische Tasten)
 *
 * Alles darüber hinaus (Prüfverfahren, Normen, Stückzahlen) ist auf der
 * Website nicht belegt und wird deshalb auch nicht gezeichnet.
 *
 * Das Netzteil sitzt bewusst IN der Schale statt als eigene Stapelebene: bei
 * fünf Ebenen bleibt die Staffelung bei rund 65 px, bei sechs sinkt sie auf
 * gut 50 – dann verschluckt die jeweils darüberliegende Platte alles, was
 * nicht am äußeren Rand der darunterliegenden liegt, und zwei gleich große
 * grüne Platinen lesen sich als ein einziger dicker Block.
 *
 * Dient zugleich als Rückfall für unbekannte modelType-Werte.
 */

const CX = 360;
const CY = 300;
const A = 170;
const B = 95;

const LABEL_R = CX + A;
const LABEL_L = CX - A;
const LEN_R = 44;
const LEN_L = 16;

/** Zahl der Schichten – bestimmt die Staffelung über LAYER_BAND. */
const N = 5;

/** Mittelpunkt des eingebauten Netzteils, relativ zur Schale. */
const PSX = CX - 80;
const PSY = CY + 14;
const PSA = 54;
const PSB = 30;

/**
 * Legendenzeile → Schicht. specs in products.ts:
 * 0 Gehäuse → Rückschale · 1 Elektronik (SMD/SMT) → Platine ·
 * 2 Module (Display-Touch) → TFT-Modul · 3 Werkzeug & Muster → -1
 * Die Reihenfolge folgt dem Aufbau: Jede Schicht ist schon eingeblendet,
 * wenn ihre Zeile an der Reihe ist (Modul-Zeile startet bei 0,46, die
 * TFT-Schicht bei 0,26). Der Werkzeugbau hat kein Bauteil, deshalb -1:
 * dann bleibt die Zeichnung unverändert, statt willkürlich etwas hervorzuheben.
 */
const SPEC_LAYERS = [0, 1, 2, -1];

/** Bedrahteter Elko – das sichtbare Merkmal der THT-Bestückung. */
function Elko({ x, y, h = 26, r = 9 }: { x: number; y: number; h?: number; r?: number }) {
  return (
    <g>
      <rect x={x - r} y={y - h} width={r * 2} height={h} fill={C.slate} />
      <ellipse cx={x} cy={y} rx={r} ry={r * 0.55} fill="#0f172a" />
      <ellipse cx={x} cy={y - h} rx={r} ry={r * 0.55} fill="#2b3038" />
      {/* Polungsstreifen */}
      <rect x={x - r} y={y - h + 4} width={r * 0.7} height={h - 6} fill={C.inkFaint} opacity="0.55" />
    </g>
  );
}

/** Stiftleiste – ebenfalls bedrahtet, sitzt neben den Elkos. */
function PinHeader({ x, y, n = 6 }: { x: number; y: number; n?: number }) {
  return (
    <g>
      <polygon
        points={`${x - 4},${y + 2} ${x + n * 8},${y - n * 4 + 2} ${x + n * 8 + 6},${y - n * 4 + 5} ${x + 2},${y + 5}`}
        fill={C.plasticDark}
      />
      {Array.from({ length: n }).map((_, i) => (
        <rect key={i} x={x + i * 8} y={y - i * 4 - 11} width="3" height="13" fill={C.gold} />
      ))}
    </g>
  );
}

/**
 * Engerer Ausschnitt für das Handy, sobald die Beschriftungen entfallen:
 * gemessene Ausdehnung der Zeichnung über den ganzen Scrollverlauf plus Rand.
 */
const COMPACT_VIEWBOX = '165 60 425 508';

export default function BoxBuild({ progress, reducedMotion, activeFact = -1 }: ProductVisualProps) {
  const common = { progress, reducedMotion };
  const viewBox = useStageViewBox(COMPACT_VIEWBOX);
  const active = activeFact >= 0 ? SPEC_LAYERS[activeFact] ?? -1 : -1;
  const layer = { ...common, n: N, activeIndex: active };

  return (
    <svg viewBox={viewBox} className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="bb-lit" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={C.brand300} />
          <stop offset="50%" stopColor={C.brand500} />
          <stop offset="100%" stopColor={C.brand700} />
        </linearGradient>
      </defs>

      {/* 0. Kunststoff-Rückschale: Anschlüsse, Schraubdome, Netzteil, Kabelbaum */}
      <StackLayer
        {...layer}
        i={0}
        spread={130}
        label={{ x: LABEL_R, y: CY + 46, text: 'Gerätegehäuse', sub: 'Werkzeugbau inklusive', length: LEN_R }}
      >
        <IsoPlate cx={CX} cy={CY} a={A} b={B} t={24} fill={C.plasticMid} side="#a2a9b2">
          {/* HDMI – Metallschacht mit dunkler Öffnung an der vorderen Kante.
              Die zweite, eingerückte Fläche macht aus der flachen Farbfläche
              erst eine erkennbare Buchse. */}
          <polygon
            points={`${CX + 10},${CY + 62} ${CX + 56},${CY + 36} ${CX + 74},${CY + 46} ${CX + 28},${CY + 72}`}
            fill={C.metal}
          />
          <polygon
            points={`${CX + 19},${CY + 60} ${CX + 52},${CY + 41} ${CX + 65},${CY + 48} ${CX + 32},${CY + 67}`}
            fill={C.plasticDark}
          />
          {/* Ethernet – quadratischer Schacht mit Rastnase */}
          <polygon
            points={`${CX + 58},${CY + 46} ${CX + 90},${CY + 28} ${CX + 108},${CY + 38} ${CX + 76},${CY + 56}`}
            fill="#8b939c"
          />
          <polygon
            points={`${CX + 66},${CY + 45} ${CX + 88},${CY + 32} ${CX + 101},${CY + 39} ${CX + 78},${CY + 52}`}
            fill={C.plasticDark}
          />
          <rect x={CX + 79} y={CY + 34} width="10" height="6" rx="2" fill="#5a6572" />
          {/* Rundbuchse für die Stromversorgung */}
          <ellipse cx={CX + 116} cy={CY + 20} rx="14" ry="8.5" fill="#2b2f36" />
          <ellipse cx={CX + 116} cy={CY + 20} rx="5.5" ry="3.5" fill={C.metal} />
          {/* Vier Schraubdome für die Verschraubung der Baugruppen */}
          {([
            [CX - A * 0.74, CY],
            [CX + A * 0.74, CY],
            [CX, CY - B * 0.74],
            [CX, CY + B * 0.86],
          ] as [number, number][]).map(([dx, dy], i) => (
            <g key={i}>
              <rect x={dx - 13} y={dy - 10} width="26" height="10" fill="#a2a9b2" />
              <ellipse cx={dx} cy={dy} rx="13" ry="7.5" fill="#a2a9b2" />
              <ellipse cx={dx} cy={dy - 10} rx="13" ry="7.5" fill={C.plasticLight} />
              <ellipse cx={dx} cy={dy - 10} rx="5.5" ry="3.2" fill="#8b939c" />
            </g>
          ))}
        </IsoPlate>

        {/* Eingebautes Open-Frame-Netzteil: Montageblech, Platine, Übertrager,
            bedrahteter Elko und Schraubklemme für die Netzzuleitung */}
        <IsoPlate cx={PSX} cy={PSY + 6} a={PSA + 6} b={PSB + 3.4} t={5} fill={C.metal} side={C.metalDark} />
        <IsoPlate cx={PSX} cy={PSY} a={PSA} b={PSB} t={6} fill={C.pcb} side="#0d3a20">
          <IsoPlate cx={PSX - 16} cy={PSY + 4} a={15} b={9} t={18} fill={C.slate} side="#0f172a" />
          <g stroke={C.gold} strokeWidth="2.5" opacity="0.85" fill="none">
            {[0, 1].map((i) => (
              <path key={i} d={`M${PSX - 30} ${PSY + i * 5} l14 -8`} />
            ))}
          </g>
          <Elko x={PSX + 24} y={PSY + 14} h={16} r={6.5} />
          <polygon
            points={`${PSX - 6},${PSY + 24} ${PSX + 18},${PSY + 11} ${PSX + 30},${PSY + 18} ${PSX + 6},${PSY + 31}`}
            fill={C.plasticLight}
          />
        </IsoPlate>
        <LayerLabel
          x={PSX - PSA}
          y={PSY}
          text="Open-Frame-Netzteil"
          sub="1–150 W"
          side="left"
          length={PSX - PSA - (LABEL_L - LEN_L)}
        />

        {/* Konfektionierte Kabelpeitsche an der DC-Buchse */}
        <g fill="none" strokeLinecap="round">
          <path d={`M${CX + 130} ${CY + 24} q40 34 52 74`} stroke="#22262c" strokeWidth="7" />
          <path d={`M${CX + 130} ${CY + 30} q36 34 46 72`} stroke={C.ink} strokeWidth="4" />
        </g>
        <g transform={`rotate(38 ${CX + 190} ${CY + 104})`}>
          <rect x={CX + 172} y={CY + 94} width="36" height="20" rx="4" fill="#2b2f36" />
          <rect x={CX + 206} y={CY + 99} width="9" height="10" rx="2" fill={C.metal} />
        </g>
      </StackLayer>

      {/* 1. Hauptplatine: SMT-Bestückung, dazu sichtbar bedrahtete THT-Bauteile */}
      <StackLayer
        {...layer}
        i={1}
        spread={65}
        label={{ x: LABEL_R, y: CY + 8, text: 'SMD/SMT-Bestückung', sub: 'Leiterplatte', length: LEN_R }}
      >
        <IsoPlate cx={CX} cy={CY} a={A * 0.93} b={B * 0.93} t={9} fill={C.pcb} side="#0d3a20">
          {/* Leiterbahnen */}
          <g stroke={C.pcbTrace} strokeWidth="2" fill="none">
            <path d={`M${CX - 112} ${CY} L${CX - 38} ${CY - 40} L${CX + 60} ${CY + 13}`} />
            <path d={`M${CX - 64} ${CY + 33} L${CX + 36} ${CY - 22}`} />
          </g>
          {/* SoC und Speicher – SMT */}
          <polygon points={`${CX - 70},${CY - 4} ${CX - 26},${CY - 28} ${CX + 18},${CY - 4} ${CX - 26},${CY + 20}`} fill={C.ic} />
          <polygon points={`${CX + 34},${CY + 14} ${CX + 66},${CY - 4} ${CX + 92},${CY + 10} ${CX + 60},${CY + 28}`} fill={C.ic} />
          {/* Dichte SMD-Reihen – das Kennzeichen der SMT-Bestückung */}
          <g fill={C.icSoft}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) =>
              [0, 1, 2].map((j) => {
                const x = CX - 122 + i * 20 + j * 10;
                const y = CY + 42 - i * 10 + j * 5.5;
                return <polygon key={`${i}-${j}`} points={`${x - 6.5},${y} ${x},${y - 3.7} ${x + 6.5},${y} ${x},${y + 3.7}`} />;
              })
            )}
          </g>
          {/* THT: zwei bedrahtete Elkos und eine Stiftleiste – beide am
              äußeren Rand, wo sie das Displaymodul darüber nicht verdeckt */}
          <Elko x={CX + 104} y={CY + 22} h={24} r={8.5} />
          <Elko x={CX + 128} y={CY + 8} h={19} r={7} />
          <PinHeader x={CX - 130} y={CY - 2} n={6} />
          {/* Flachbandanschluss zum Displaymodul */}
          <polygon points={`${CX - 14},${CY - 48} ${CX + 28},${CY - 72} ${CX + 42},${CY - 64} ${CX},${CY - 40}`} fill={C.fpc} />
        </IsoPlate>
      </StackLayer>

      {/* 2. TFT-Displaymodul */}
      <StackLayer
        {...layer}
        i={2}
        spread={0}
        label={{ x: LABEL_L, y: CY - 4, text: 'TFT-Modul', sub: '3" bis 24"', side: 'left', length: LEN_L }}
      >
        <IsoPlate cx={CX} cy={CY} a={A * 0.86} b={B * 0.86} t={12} fill={C.slate} side="#0f172a">
          <polygon
            points={`${CX - A * 0.72},${CY} ${CX},${CY - B * 0.72} ${CX + A * 0.72},${CY} ${CX},${CY + B * 0.72}`}
            fill={C.screenDark}
          />
          {/* Schaltet sich ein, sobald das Modul komplett ist */}
          <FadeIn {...common} from={0.6} to={0.78} toOpacity={0.92}>
            <polygon
              points={`${CX - A * 0.72},${CY} ${CX},${CY - B * 0.72} ${CX + A * 0.72},${CY} ${CX},${CY + B * 0.72}`}
              fill="url(#bb-lit)"
            />
          </FadeIn>
        </IsoPlate>
      </StackLayer>

      {/* 3. Touch-Sensor mit Deckglas */}
      <StackLayer
        {...layer}
        i={3}
        spread={-65}
        label={{ x: LABEL_R, y: CY - 12, text: 'Touch + Deckglas', sub: 'OGS · PCAP', length: LEN_R }}
      >
        <IsoPlate cx={CX} cy={CY} a={A * 0.88} b={B * 0.88} t={7} fill={C.glass} side={C.brand200} opacity={0.5} />
        {/* Siebdruck-Rand und Sensorraster liegen NEBEN der Platte, nicht in
            ihr: als Kinder würden sie die Glas-Transparenz miterben. */}
        <path
          fillRule="evenodd"
          fill="#0d1117"
          d={`M${CX - A * 0.88} ${CY} L${CX} ${CY - B * 0.88} L${CX + A * 0.88} ${CY} L${CX} ${CY + B * 0.88} Z
              M${CX - A * 0.88 + 32} ${CY} L${CX} ${CY - B * 0.88 + 18} L${CX + A * 0.88 - 32} ${CY} L${CX} ${CY + B * 0.88 - 18} Z`}
        />
        <g stroke={C.brand500} strokeWidth="1.4" fill="none" opacity="0.75">
          {[-2, -1, 0, 1, 2].map((r) =>
            [-2, -1, 0, 1, 2].map((c2) => {
              const gx = CX + (c2 - r) * 26;
              const gy = CY + (c2 + r) * 14.5;
              return (
                <polygon key={`${r}-${c2}`} points={`${gx - 12},${gy} ${gx},${gy - 6.7} ${gx + 12},${gy} ${gx},${gy + 6.7}`} />
              );
            })
          )}
        </g>
        {/* Glanzstreifen auf dem Deckglas */}
        <polygon
          points={`${CX - 96},${CY - 24} ${CX - 38},${CY - 56} ${CX - 16},${CY - 44} ${CX - 74},${CY - 12}`}
          fill={C.white}
          opacity="0.4"
        />
      </StackLayer>

      {/* 4. Frontblende mit Display-Ausschnitt und Bedientasten */}
      <StackLayer
        {...layer}
        i={4}
        spread={-130}
        label={{ x: LABEL_L, y: CY - 30, text: 'Frontblende', sub: 'Bedientasten', side: 'left', length: LEN_L }}
      >
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
              <ellipse cx={x} cy={y} rx="11" ry="6.5" fill="#3f4650" />
              <ellipse cx={x} cy={y} rx="11" ry="6.5" fill="none" stroke="#aeb5bd" strokeWidth="1.5" />
            </g>
          );
        })}
      </StackLayer>

      {/*
        Chip-Reihe unterhalb der Explosion: die unterste Spitze der Rückschale
        liegt bei CY + 130 + B + 24 = 549. Der frühere einzelne Chip stand bei
        y=512 mitten auf der Schale und über der Beschriftung daneben.
      */}
      <FadeIn {...common} from={0.66} to={0.82}>
        <Chip x={93} y={560} label="SMD/SMT" />
        <Chip x={201} y={560} label="Module · Baugruppen" />
        <Chip x={446} y={560} label="Werkzeug- & Musterbau" />
      </FadeIn>
    </svg>
  );
}
