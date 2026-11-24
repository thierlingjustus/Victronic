import { C, Chip, CompactNote, FadeIn, Layer, StageText, useStageCaption, useStageViewBox, type ProductVisualProps } from './stage';

/**
 * Stromversorgungen (modelType "power"): drei der in [ALT /netzteile/]
 * genannten Bauformen nebeneinander – Hutschiene (TS35), Open Frame und
 * Steckernetzteil. "Enclosed" ist kein Begriff der alten Website. Bewusst kein
 * Schichtstapel – das Visual zeigt die Bauformen, die Fotos aller Netzteilarten
 * stehen in der Modellübersicht darunter. Schutzschaltungen und Effizienzklasse
 * stehen als Beschriftung darunter.
 */

const BASE = 372;

/**
 * Engerer Ausschnitt für das Handy, sobald die Beschriftungen entfallen:
 * gemessene Ausdehnung der Zeichnung über den ganzen Scrollverlauf plus Rand.
 */
const COMPACT_VIEWBOX = '50 150 700 270';

/** Beschriftung mittig unter einer Bauform. */
function FormLabel({ cx, title, sub }: { cx: number; title: string; sub: string }) {
  // Kompakt steht die Bezeichnung als Textzeile unter der Grafik.
  const { compact } = useStageCaption(title, sub);
  if (compact) return null;
  return (
    <g>
      <text x={cx} y={BASE + 52} fill={C.ink} fontSize="17" fontWeight="700" textAnchor="middle" fontFamily="inherit">
        {title}
      </text>
      <text x={cx} y={BASE + 73} fill={C.inkSoft} fontSize="13" textAnchor="middle" fontFamily="inherit">
        {sub}
      </text>
    </g>
  );
}

/**
 * Legendenzeile → Bauform. specs in products.ts (ohne legendOnly):
 * 0 Bauformen · 1 Effizienz · 2 Weitere Produkte
 * Keine der Zeilen gehört zu genau einer gezeichneten Bauform, deshalb wird
 * nichts hervorgehoben. (Effizienz → Steckernetzteil wurde verworfen: die Zeile
 * ist aktiv, bevor das Steckernetzteil eingeblendet ist – die übrigen Bauformen
 * wurden abgeblendet und die Grafik wirkte leer.)
 */
const SPEC_LAYERS = [-1, -1, -1];

export default function PowerForms({ progress, reducedMotion, activeFact = -1 }: ProductVisualProps) {
  const common = { progress, reducedMotion };
  const active = activeFact >= 0 ? SPEC_LAYERS[activeFact] ?? -1 : -1;
  const box = { ...common, activeIndex: active, spread: 0 };
  const viewBox = useStageViewBox(COMPACT_VIEWBOX);

  return (
    <svg viewBox={viewBox} className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* Gemeinsame Standlinie, auf der die drei Bauformen sitzen */}
      <FadeIn {...common} from={0.03} to={0.12}>
        <path d={`M60 ${BASE + 14} H740`} stroke={C.lineSoft} strokeWidth="2" />
      </FadeIn>

      {/* ---------------------------------------------------------------- */}
      {/* 1. Hutschiene – schmales Gehäuse auf dem TS35-Profil             */}
      {/* ---------------------------------------------------------------- */}
      <Layer {...box} index={0} from={0.05} to={0.31}>
        {/* Hutschienen-Profil im Schnitt (TS35) */}
        <path
          d="M78 372 h124 v-9 h-16 v-22 h16 v-9 h-124 v9 h16 v22 h-16 Z"
          fill={C.metal}
          stroke={C.metalDark}
          strokeWidth="1.5"
        />
        {/* Gehäuse, hochkant */}
        <rect x="96" y="176" width="88" height="156" rx="5" fill={C.plasticDark} />
        <rect x="96" y="176" width="88" height="156" rx="5" fill="none" stroke={C.plasticRib} strokeWidth="2" />
        {/* Lüftungsschlitze */}
        <g fill={C.plasticRib}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x="108" y={228 + i * 13} width="64" height="4" rx="2" />
          ))}
        </g>
        {/* Schraubklemmen oben und unten */}
        {[190, 306].map((y, i) => (
          <g key={i}>
            <rect x="104" y={y} width="72" height="22" rx="3" fill={C.plasticMid} />
            {[0, 1, 2].map((j) => (
              <circle key={j} cx={118 + j * 24} cy={y + 11} r="6" fill={C.steel} />
            ))}
          </g>
        ))}
        {/* Status-LED */}
        <circle cx="140" cy="216" r="5" fill="#16a34a" />
        <FormLabel cx={140} title="Hutschiene" sub="TS35, 10–30 W" />
      </Layer>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Open Frame – offene Platine, das Herzstück                     */}
      {/* ---------------------------------------------------------------- */}
      <Layer {...box} index={1} from={0.255} to={0.515}>
        {/* Platine */}
        <rect x="284" y="240" width="232" height="122" rx="4" fill={C.pcb} />
        <rect x="284" y="240" width="232" height="122" rx="4" fill="none" stroke="#0d3a20" strokeWidth="2" />
        {/* Abstandsbolzen an den Ecken */}
        <g fill={C.steel}>
          {[[294, 352], [506, 352], [294, 250], [506, 250]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" />
          ))}
        </g>
        {/* Trennlinie Primär / Sekundär */}
        <path d="M400 236 V370" stroke={C.inkFaint} strokeWidth="1.5" strokeDasharray="6 5" />
        <StageText x={340} y={380} fill={C.inkFaint} fontSize="12" textAnchor="middle">
          Primär
        </StageText>
        <StageText x={460} y={380} fill={C.inkFaint} fontSize="12" textAnchor="middle">
          Sekundär
        </StageText>
        <CompactNote text="Trennung Primär / Sekundär" />

        {/* Netzfilter-Drossel */}
        <g>
          <rect x="294" y="252" width="34" height="26" rx="4" fill={C.slate} />
          <g stroke={C.gold} strokeWidth="1.6">
            {[0, 1, 2, 3].map((i) => (
              <path key={i} d={`M${299 + i * 8} 252 v26`} fill="none" />
            ))}
          </g>
        </g>
        {/* Gleichrichter-Brücke */}
        <rect x="294" y="292" width="24" height="24" rx="3" fill={C.ic} />
        {/* Transformator – der grosse Block mit Wicklung */}
        <g>
          <rect x="352" y="252" width="70" height="76" rx="4" fill={C.slate} />
          <g stroke={C.gold} strokeWidth="2" opacity="0.8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path key={i} d={`M352 ${262 + i * 12} h70`} fill="none" />
            ))}
          </g>
          <rect x="366" y="240" width="42" height="14" rx="2" fill={C.metalDark} />
        </g>
        {/* Zwei stehende Elkos */}
        {[444, 480].map((x, i) => (
          <g key={i}>
            <ellipse cx={x} cy={272} rx="16" ry="6" fill={C.metal} />
            <rect x={x - 16} y={272} width="32" height="46" fill={C.metal} />
            <ellipse cx={x} cy={318} rx="16" ry="6" fill={C.metalDark} />
            <path d={`M${x - 16} 280 h32`} stroke={C.metalDark} strokeWidth="2" />
          </g>
        ))}
        {/* Kühlkörper mit Lamellen */}
        <g>
          <rect x="330" y="292" width="14" height="60" fill={C.steel} />
          <g stroke={C.metalDark} strokeWidth="1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M330 ${300 + i * 12} h14`} fill="none" />
            ))}
          </g>
        </g>
        {/* Schraubklemmenblock */}
        <g>
          <rect x="440" y="330" width="70" height="24" rx="3" fill={C.plasticDark} />
          {[0, 1, 2].map((j) => (
            <circle key={j} cx={456 + j * 20} cy={342} r="6" fill={C.steel} />
          ))}
        </g>
        <FormLabel cx={400} title="Open Frame" sub="offene Baugruppe, 1–150 W" />
      </Layer>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Steckernetzteil – kompaktes Gehäuse mit AC-Steckerstiften      */}
      {/* ---------------------------------------------------------------- */}
      <Layer {...box} index={2} from={0.46} to={0.72}>
        {/* Die beiden AC-Kontaktstifte stehen aus der Oberseite heraus */}
        <g fill={C.metal} stroke={C.metalDark} strokeWidth="1.5">
          <rect x="628" y="216" width="11" height="38" rx="5.5" />
          <rect x="677" y="216" width="11" height="38" rx="5.5" />
        </g>
        {/* Gehäusekörper */}
        <rect x="596" y="248" width="124" height="100" rx="12" fill={C.plasticDark} />
        <rect x="596" y="248" width="124" height="100" rx="12" fill="none" stroke={C.plasticRib} strokeWidth="2" />
        {/* Trennfuge der beiden Gehäusehälften */}
        <path d="M596 300 H720" stroke={C.plasticRib} strokeWidth="1.5" />
        {/* Typenschild mit Druckzeilen */}
        <g>
          <rect x="612" y="262" width="92" height="30" rx="2" fill="#f5f7f9" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="618" y={268 + i * 7} width={78 - i * 16} height="3" rx="1.5" fill={C.inkFaint} />
          ))}
        </g>
        {/* Status-LED */}
        <circle cx="614" cy="336" r="5" fill="#16a34a" />
        {/* DC-Leitung mit Hohlstecker */}
        <path d="M666 348 q4 26 -26 34" stroke={C.ink} strokeWidth="6" fill="none" strokeLinecap="round" />
        <rect x="606" y="374" width="30" height="14" rx="4" fill={C.metalDark} />
        <FormLabel cx={658} title="Steckernetzteil" sub="1–36 W" />
      </Layer>

      {/* Schutzschaltungen und Kennwerte */}
      <FadeIn {...common} from={0.76} to={0.9}>
        <Chip x={213} y={520} label="OVP" />
        <Chip x={278} y={520} label="SCP" />
        <Chip x={343} y={520} label="Level VI" />
        <Chip x={446} y={520} label="MTBF > 200.000 h" />
      </FadeIn>
    </svg>
  );
}
