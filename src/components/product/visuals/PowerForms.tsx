import { C, Chip, FadeIn, Layer, VIEWBOX, type ProductVisualProps } from './stage';

/**
 * Stromversorgungen (modelType "power"): die drei Bauformen aus der Spec-Zeile
 * "DIN-Rail (Hutschiene), Open Frame, Enclosed" nebeneinander. Bewusst kein
 * Schichtstapel – diese Produktseite hat keine Galeriebilder, das Visual trägt
 * die Kategorie allein. Schutzschaltungen und Effizienzklasse stehen als
 * Beschriftung darunter.
 */

const BASE = 372;

/** Beschriftung mittig unter einer Bauform. */
function FormLabel({ cx, title, sub }: { cx: number; title: string; sub: string }) {
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

export default function PowerForms({ progress, reducedMotion }: ProductVisualProps) {
  const common = { progress, reducedMotion };

  return (
    <svg viewBox={VIEWBOX} className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* Gemeinsame Standlinie, auf der die drei Bauformen sitzen */}
      <FadeIn {...common} from={0.04} to={0.16}>
        <path d={`M60 ${BASE + 14} H740`} stroke={C.lineSoft} strokeWidth="2" />
      </FadeIn>

      {/* ---------------------------------------------------------------- */}
      {/* 1. DIN-Rail – schmales Gehäuse auf dem Hutschienen-Profil        */}
      {/* ---------------------------------------------------------------- */}
      <Layer {...common} from={0.06} to={0.26} spread={0}>
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
        <FormLabel cx={140} title="DIN-Rail" sub="Hutschiene TS35" />
      </Layer>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Open Frame – offene Platine, das Herzstück                     */}
      {/* ---------------------------------------------------------------- */}
      <Layer {...common} from={0.14} to={0.36} spread={0}>
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
        <text x={340} y={380} fill={C.inkFaint} fontSize="12" textAnchor="middle" fontFamily="inherit">
          Primär
        </text>
        <text x={460} y={380} fill={C.inkFaint} fontSize="12" textAnchor="middle" fontFamily="inherit">
          Sekundär
        </text>

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
        <FormLabel cx={400} title="Open Frame" sub="offene Baugruppe" />
      </Layer>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Enclosed – geschlossenes Metallgehäuse                         */}
      {/* ---------------------------------------------------------------- */}
      <Layer {...common} from={0.22} to={0.44} spread={0}>
        <rect x="576" y="238" width="164" height="124" rx="6" fill={C.metal} />
        <rect x="576" y="238" width="164" height="124" rx="6" fill="none" stroke={C.metalDark} strokeWidth="2" />
        {/* Deckelkante */}
        <path d="M576 262 H740" stroke={C.metalDark} strokeWidth="1.5" />
        {/* Lüftungsschlitze */}
        <g fill={C.metalDark} opacity="0.55">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={592 + i * 15} y="276" width="7" height="44" rx="3.5" />
          ))}
        </g>
        {/* Typenschild mit Druckzeilen */}
        <g>
          <rect x="592" y="326" width="76" height="28" rx="2" fill="#f5f7f9" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="597" y={331 + i * 7} width={62 - i * 12} height="3" rx="1.5" fill={C.inkFaint} />
          ))}
        </g>
        {/* Klemmenblock hinter Abdeckung */}
        <g>
          <rect x="684" y="326" width="48" height="28" rx="3" fill={C.plasticDark} />
          {[0, 1].map((j) => (
            <circle key={j} cx={698 + j * 20} cy={340} r="6" fill={C.steel} />
          ))}
        </g>
        {/* Status-LED */}
        <circle cx="722" cy="252" r="5" fill="#16a34a" />
        <FormLabel cx={658} title="Enclosed" sub="geschlossenes Gehäuse" />
      </Layer>

      {/* Schutzschaltungen und Kennwerte */}
      <FadeIn {...common} from={0.5} to={0.68}>
        <Chip x={120} y={488} label="OVP" />
        <Chip x={196} y={488} label="OCP" />
        <Chip x={272} y={488} label="SCP" />
        <Chip x={348} y={488} label="OTP" />
        <Chip x={430} y={488} label="Level VI" />
        <Chip x={546} y={488} label="MTBF > 500.000 h" />
      </FadeIn>
    </svg>
  );
}
