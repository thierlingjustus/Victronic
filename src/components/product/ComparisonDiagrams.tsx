import type { ComponentType, ReactNode } from 'react';

/**
 * Schematische Querschnitte für den Bild-Vergleich (ProductComparison.tsx),
 * wenn ein Foto den Unterschied nicht zeigt. Statisch, ohne Animation.
 *
 * Touchscreens – alle drei im selben Maßstab und mit derselben viewBox, damit
 * die Stapelhöhen vergleichbar sind:
 * - Resistiv: Der Finger drückt die flexible Folie auf das Glas, erst dann
 *   berühren sich die beiden leitfähigen Schichten (Quellen in products.ts).
 * - PCAP (G/G): Deckglas, darunter ein eigenes Sensorglas mit Elektroden;
 *   der Finger verändert das elektrische Feld, ohne Druck.
 * - OGS: Elektroden direkt auf der Rückseite des Deckglases – ein Glas weniger.
 *
 * Glaslösungen – Härtung und Oberflächen, je Paar im selben Aufbau (Quellen
 * in products.ts, Messwerte aus der Firmenpräsentation S. 14–17):
 * - Chemisch: große Kalium-Ionen in der Randschicht, Druck von beiden Seiten.
 * - Thermisch: Kühlluft von beiden Seiten, außen Druck, innen Zug.
 * - AG: geätzte, raue Oberfläche streut das gespiegelte Licht.
 * - AR: links ohne, rechts mit Schicht – Spiegelung ≤ 6 % gegen ≤ 1,5 %.
 * - AF/AS: links zerläuft der Tropfen, rechts perlt er ab (> 110°).
 * - AM: Silberionen in der Oberfläche, Keime von aktiv bis abgetötet.
 *
 * TFT-Displays – Panel-Technik in derselben Zelle (zwei Glasplatten, dazwischen
 * der Flüssigkristall), Bonding im selben Stapel (Quellen in products.ts):
 * - TN: Moleküle von unten nach oben um 90° verdreht, Elektroden oben und unten.
 * - IPS: Moleküle liegen flach, Elektroden nebeneinander auf dem unteren Glas.
 * - VA: Moleküle stehen ohne Spannung senkrecht zum Glas.
 * - Air Bonding: Klebeband am Rand, Luftspalt – Licht spiegelt an drei Flächen.
 * - Optical Bonding: OCA füllt den Spalt – es spiegelt nur noch die Oberfläche.
 *
 * Schrift nie kleiner als 11 Einheiten: Die Spalten sind ab lg rund 300 px
 * breit, bei viewBox-Breite 320 bleibt die Schrift damit über 10 px.
 */

const C = {
  ink: '#475569',
  label: '#64748b',
  glass: '#d3e3ee',
  glassEdge: '#9fb6c8',
  film: '#e2e8f0',
  filmEdge: '#94a3b8',
  ito: '#00a0e8',
  field: '#38b9ec',
  display: '#1e293b',
  accent: '#006da3',
  white: '#ffffff',
  /** Randschicht unter Druckspannung */
  band: '#bfe4f6',
  drop: '#d7f0fb',
  silver: '#b4bcc6',
  silverEdge: '#6b7280',
};

const VIEWBOX = '0 0 320 160';
/** Rechte Spalte für die Beschriftungen. */
const LABEL_X = 222;
/** Mitte des Fingers. */
const FX = 115;

function Label({ y, children }: { y: number; children: string }) {
  return (
    <text x={LABEL_X} y={y} fill={C.label} fontSize="11.5" fontWeight="500">
      {children}
    </text>
  );
}

/** Kernaussage unter dem Stapel. */
function Note({ children }: { children: string }) {
  return (
    <text x={FX} y={150} fill={C.accent} fontSize="12" fontWeight="600" textAnchor="middle">
      {children}
    </text>
  );
}

/** Fingerkuppe von der Seite, Unterkante bei `bottom`. */
function Finger({ bottom }: { bottom: number }) {
  return <rect x={FX - 18} y={bottom - 80} width="36" height="80" rx="18" fill={C.white} stroke={C.ink} strokeWidth="2" />;
}

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox={VIEWBOX} role="img" aria-label={label} className="block w-full h-auto">
      {children}
    </svg>
  );
}

/** Elektrodenreihe als kurze Striche in Markenfarbe. */
function Electrodes({ y }: { y: number }) {
  return (
    <g fill={C.ito}>
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={24 + i * 16} y={y} width="10" height="3" rx="1" />
      ))}
    </g>
  );
}

/** Feldlinien von den Elektroden unter dem Finger hinauf zur Fingerkuppe. */
function FieldLines({ from, to }: { from: number; to: number }) {
  const mid = (from + to) / 2;
  return (
    <g stroke={C.field} strokeWidth="1.6" fill="none" strokeDasharray="3 3">
      <path d={`M${FX - 24} ${from} Q${FX - 22} ${mid} ${FX - 8} ${to}`} />
      <path d={`M${FX + 24} ${from} Q${FX + 22} ${mid} ${FX + 8} ${to}`} />
      <path d={`M${FX} ${from} V${to}`} />
    </g>
  );
}

function ResistiveDiagram() {
  // Folie mit Delle unter dem Finger; ITO-Schicht an ihrer Unterseite
  const film = (dy: number) =>
    `M20 ${40 + dy} H80 C100 ${40 + dy} 102 ${62 + dy} ${FX} ${62 + dy} C128 ${62 + dy} 130 ${40 + dy} 150 ${40 + dy} H210`;
  return (
    <Frame label="Querschnitt resistiver Touch: Der Finger drückt die flexible Folie auf das Glas, die leitfähigen Schichten berühren sich.">
      <path d={film(0)} stroke={C.filmEdge} strokeWidth="7" fill="none" />
      <path d={film(0)} stroke={C.film} strokeWidth="4" fill="none" />
      <path d={film(4)} stroke={C.ito} strokeWidth="2" fill="none" />
      {/* Abstandshalter zwischen den Schichten */}
      <g fill={C.filmEdge}>
        {[34, 58, 172, 196].map((x) => (
          <circle key={x} cx={x} cy="56" r="3" />
        ))}
      </g>
      {/* Untere ITO-Schicht auf dem Glas */}
      <path d="M20 68 H210" stroke={C.ito} strokeWidth="2" />
      <rect x="20" y="70" width="190" height="20" fill={C.glass} stroke={C.glassEdge} strokeWidth="1" />
      {/* Kontaktpunkt */}
      <circle cx={FX} cy="67" r="7" fill="none" stroke={C.accent} strokeWidth="1.5" />
      <circle cx={FX} cy="67" r="3" fill={C.accent} />
      <rect x="20" y="104" width="190" height="18" rx="2" fill={C.display} />
      <Finger bottom={58} />

      <Label y={44}>Folie, flexibel</Label>
      <Label y={60}>Abstandshalter</Label>
      <Label y={84}>Glas</Label>
      <Label y={117}>Display</Label>
      <Note>Druck schließt den Kontakt</Note>
    </Frame>
  );
}

function PcapDiagram() {
  return (
    <Frame label="Querschnitt projiziert-kapazitiver Touch: Deckglas und separates Sensorglas mit Elektroden, der Finger verändert das elektrische Feld.">
      <rect x="20" y="30" width="190" height="22" fill={C.glass} stroke={C.glassEdge} strokeWidth="1" />
      {/* Klebeschicht und eigenes Sensorglas */}
      <rect x="20" y="52" width="190" height="4" fill={C.film} />
      <rect x="20" y="59" width="190" height="16" fill={C.glass} stroke={C.glassEdge} strokeWidth="1" />
      <Electrodes y={56} />
      <FieldLines from={57} to={31} />
      <rect x="20" y="92" width="190" height="18" rx="2" fill={C.display} />
      <Finger bottom={30} />

      <Label y={45}>Deckglas</Label>
      <Label y={71}>Sensor auf Glas</Label>
      <Label y={105}>Display</Label>
      <Note>Finger ändert das Feld</Note>
    </Frame>
  );
}

function OgsDiagram() {
  return (
    <Frame label="Querschnitt OGS: Die Elektroden sitzen direkt auf der Rückseite des Deckglases, ein Glas weniger als beim klassischen Aufbau.">
      <rect x="20" y="30" width="190" height="24" fill={C.glass} stroke={C.glassEdge} strokeWidth="1" />
      <Electrodes y={54} />
      <FieldLines from={55} to={31} />
      <rect x="20" y="74" width="190" height="18" rx="2" fill={C.display} />
      <Finger bottom={30} />

      <Label y={46}>Deckglas</Label>
      <Label y={60}>Sensor am Glas</Label>
      <Label y={87}>Display</Label>
      <Note>Ein Glas statt zwei</Note>
    </Frame>
  );
}

/* ---------- Glaslösungen ---------- */

/** Pfeil mit Spitze für Druck, Kühlluft und Lichtstrahlen. */
function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = C.ink,
  width = 2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const head = 4 + width * 2;
  const corner = (da: number) =>
    `${(x2 - head * Math.cos(a + da)).toFixed(1)},${(y2 - head * Math.sin(a + da)).toFixed(1)}`;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={(x2 - head * 0.7 * Math.cos(a)).toFixed(1)}
        y2={(y2 - head * 0.7 * Math.sin(a)).toFixed(1)}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
      <polygon points={`${x2},${y2} ${corner(0.42)} ${corner(-0.42)}`} fill={color} />
    </g>
  );
}

/** Glasscheibe im Querschnitt über die volle Zeichnungsbreite. */
function Glass({ y, h }: { y: number; h: number }) {
  return <rect x="20" y={y} width="190" height={h} fill={C.glass} stroke={C.glassEdge} strokeWidth="1" />;
}

/** Kleine Beschriftung unter der Scheibe („ohne“ / „mit“). */
function Sub({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} fill={C.label} fontSize="11" textAnchor="middle">
      {children}
    </text>
  );
}

/** Trennlinie zwischen der unbehandelten (links) und der behandelten Hälfte. */
function Split({ top, bottom }: { top: number; bottom: number }) {
  return <line x1={FX} y1={top} x2={FX} y2={bottom} stroke={C.filmEdge} strokeWidth="1" strokeDasharray="2 3" />;
}

/** Druckpfeile von links und rechts zur Mitte. */
function Squeeze({ y }: { y: number }) {
  return (
    <>
      <Arrow x1={36} y1={y} x2={100} y2={y} color={C.accent} />
      <Arrow x1={194} y1={y} x2={130} y2={y} color={C.accent} />
    </>
  );
}

function ChemicalDiagram() {
  const potassium = Array.from({ length: 13 }, (_, i) => 28 + i * 14.5);
  const sodium = [64, 74, 84].flatMap((y, row) =>
    Array.from({ length: 11 }, (_, i) => ({ x: (row % 2 ? 38 : 30) + i * 16, y })),
  );
  return (
    <Frame label="Chemische Härtung: In der Randschicht ersetzen große Kalium-Ionen kleinere Natrium-Ionen und setzen die Oberfläche unter Druck.">
      <Squeeze y={32} />
      <Glass y={44} h={60} />
      <rect x="20" y="44" width="190" height="12" fill={C.band} />
      <rect x="20" y="92" width="190" height="12" fill={C.band} />
      {potassium.map((x) => (
        <g key={x} fill={C.ito}>
          <circle cx={x} cy="50" r="3.6" />
          <circle cx={x} cy="98" r="3.6" />
        </g>
      ))}
      <g fill={C.glassEdge}>
        {sodium.map(({ x, y }) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
        ))}
      </g>
      <Squeeze y={116} />

      <Label y={36}>Druck</Label>
      <Label y={54}>Kalium-Ionen</Label>
      <Label y={78}>Natrium-Ionen</Label>
      <Note>Große Ionen erzeugen Druck</Note>
    </Frame>
  );
}

function ThermalDiagram() {
  const jets = [45, 90, 140, 185];
  return (
    <Frame label="Thermische Härtung: Das heiße Glas wird von beiden Seiten mit Luft schnell abgekühlt. Danach steht die Oberfläche unter Druck, der Kern unter Zug.">
      {jets.map((x) => (
        <g key={x}>
          <rect x={x - 8} y="13" width="16" height="7" rx="1.5" fill={C.ink} />
          <Arrow x1={x} y1={24} x2={x} y2={44} color={C.field} width={1.8} />
          <rect x={x - 8} y="119" width="16" height="7" rx="1.5" fill={C.ink} />
          <Arrow x1={x} y1={115} x2={x} y2={98} color={C.field} width={1.8} />
        </g>
      ))}
      <Glass y={50} h={42} />
      <rect x="20" y="50" width="190" height="10" fill={C.band} />
      <rect x="20" y="82" width="190" height="10" fill={C.band} />
      {/* Zug im Kern */}
      <Arrow x1={106} y1={71} x2={62} y2={71} color={C.label} width={1.6} />
      <Arrow x1={124} y1={71} x2={168} y2={71} color={C.label} width={1.6} />

      <Label y={22}>Kühlluft</Label>
      <Label y={59}>Druck</Label>
      <Label y={75}>Zug</Label>
      <Label y={91}>Druck</Label>
      <Note>Heiß, dann schnell abgekühlt</Note>
    </Frame>
  );
}

function AntiGlareDiagram() {
  // Geätzte Oberfläche, stark überzeichnet: 19 Hügel à 10 Einheiten
  const heights = [4, 2.5, 5, 3, 4.5, 2, 4, 3.5, 5, 2.5, 4, 3, 4.5, 2.5, 5, 3, 4, 2.5, 3.5];
  const surface = heights.map((h) => `q5 ${-h * 2} 10 0`).join(' ');
  const hit = { x: 100, y: 73 };
  const scatter = [-12, -38, -64, -90, -116, -172];
  return (
    <Frame label="Anti-Glare: Die fein geätzte, raue Oberfläche streut das gespiegelte Licht in viele Richtungen.">
      <path d={`M20 104 V78 ${surface} V104 Z`} fill={C.glass} stroke={C.glassEdge} strokeWidth="1" />
      <text x="24" y="16" fill={C.label} fontSize="11.5" fontWeight="500">
        Licht
      </text>
      <Arrow x1={36} y1={22} x2={hit.x - 2} y2={hit.y - 2} color={C.ink} width={2.2} />
      {scatter.map((deg) => {
        const a = (deg * Math.PI) / 180;
        return (
          <Arrow
            key={deg}
            x1={hit.x + 6 * Math.cos(a)}
            y1={hit.y + 6 * Math.sin(a)}
            x2={Math.round(hit.x + 32 * Math.cos(a))}
            y2={Math.round(hit.y + 32 * Math.sin(a))}
            color={C.ito}
            width={1.4}
          />
        );
      })}

      <Label y={52}>Streulicht</Label>
      <Label y={82}>Geätzte Fläche</Label>
      <Label y={99}>Glas</Label>
      <Note>Licht wird gestreut</Note>
    </Frame>
  );
}

function AntiReflectiveDiagram() {
  return (
    <Frame label="Anti-Reflective: Unbeschichtetes Glas spiegelt bis zu 6 % des Lichts, mit AR-Schichten höchstens 1,5 %.">
      <Glass y={78} h={26} />
      {/* AR-Schichten nur auf der rechten Hälfte */}
      <rect x={FX} y="72" width={210 - FX} height="3" fill={C.ito} />
      <rect x={FX} y="75" width={210 - FX} height="3" fill={C.field} opacity="0.5" />
      <Split top={66} bottom={108} />

      {/* ohne AR: kräftiger Reflex */}
      <Arrow x1={22} y1={24} x2={58} y2={76} color={C.ink} width={2.2} />
      <Arrow x1={60} y1={76} x2={90} y2={34} color={C.ito} width={3.2} />
      <text x="94" y="38" fill={C.accent} fontSize="11.5" fontWeight="600">
        ≤ 6 %
      </text>
      {/* mit AR: schwacher Reflex */}
      <Arrow x1={132} y1={22} x2={162} y2={70} color={C.ink} width={2.2} />
      <Arrow x1={164} y1={70} x2={190} y2={36} color={C.ito} width={1.2} />
      <text x="194" y="40" fill={C.accent} fontSize="11.5" fontWeight="600">
        ≤ 1,5 %
      </text>

      <Sub x={67} y={122}>ohne AR</Sub>
      <Sub x={162} y={122}>mit AR</Sub>
      <Label y={78}>AR-Schichten</Label>
      <Label y={97}>Glas</Label>
      <Note>Weniger Licht wird gespiegelt</Note>
    </Frame>
  );
}

function AntiFingerprintDiagram() {
  // Kontaktwinkel ~115°: Der Kreismittelpunkt liegt über der Oberfläche
  const r = 16;
  const cx = 162;
  const surf = 80;
  const half = r * Math.sin((65 * Math.PI) / 180);
  const cy = surf - r * Math.cos((65 * Math.PI) / 180);
  return (
    <Frame label="Anti-Fingerprint: Auf der fett- und wasserabweisenden Schicht perlt ein Tropfen mit über 110° Kontaktwinkel ab, auf unbehandeltem Glas zerläuft er.">
      <Glass y={83} h={24} />
      <rect x={FX} y="80" width={210 - FX} height="3" fill={C.ito} />
      <Split top={58} bottom={111} />

      {/* ohne AF: flacher, zerlaufener Tropfen */}
      <path d="M36 83 Q67 66 98 83 Z" fill={C.drop} stroke={C.field} strokeWidth="1.5" />
      {/* mit AF: Tropfen perlt ab */}
      <path
        d={`M${(cx - half).toFixed(1)} ${surf} A${r} ${r} 0 1 1 ${(cx + half).toFixed(1)} ${surf} Z`}
        fill={C.drop}
        stroke={C.field}
        strokeWidth="1.5"
      />
      <ellipse cx={cx - 6} cy={cy - 6} rx="3.5" ry="2.5" fill={C.white} />
      <text x="184" y="62" fill={C.accent} fontSize="11.5" fontWeight="600">
        &gt; 110°
      </text>

      <Sub x={67} y={125}>ohne AF</Sub>
      <Sub x={162} y={125}>mit AF</Sub>
      <Label y={84}>AF-Schicht</Label>
      <Label y={100}>Glas</Label>
      <Note>Tropfen perlen ab</Note>
    </Frame>
  );
}

function AntiMicrobialDiagram() {
  const ions = Array.from({ length: 10 }, (_, i) => 30 + i * 19.5);
  // Drei Stufen wie in der Präsentation: Keim aktiv → geschwächt → abgetötet
  const stages = [40, 105, 178];
  return (
    <Frame label="Anti-Microbial: Silberionen in der Glasoberfläche schwächen Keime, bis sie absterben.">
      <Glass y={80} h={30} />
      {ions.map((x) => (
        <circle key={x} cx={x} cy="88" r="3.6" fill={C.silver} stroke={C.silverEdge} strokeWidth="0.8" />
      ))}
      {/* aktiv */}
      <g>
        <rect x={stages[0] - 18} y="62" width="36" height="16" rx="8" fill={C.white} stroke={C.ink} strokeWidth="1.8" />
        <circle cx={stages[0] - 6} cy="70" r="2" fill={C.ink} />
        <circle cx={stages[0] + 6} cy="70" r="2" fill={C.ink} />
      </g>
      {/* geschwächt */}
      <g opacity="0.7">
        <rect x={stages[1] - 18} y="62" width="36" height="16" rx="8" fill={C.white} stroke={C.ink} strokeWidth="1.8" strokeDasharray="4 3" />
        <circle cx={stages[1] - 6} cy="70" r="2" fill={C.label} />
      </g>
      {/* abgetötet: zerfallen */}
      <g fill="none" stroke={C.ink} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4">
        <rect x={stages[2] - 19} y="66" width="15" height="11" rx="5.5" transform={`rotate(-16 ${stages[2] - 11.5} 71.5)`} />
        <rect x={stages[2] + 3} y="66" width="14" height="11" rx="5.5" transform={`rotate(20 ${stages[2] + 10} 71.5)`} />
      </g>

      <Sub x={stages[0]} y={127}>aktiv</Sub>
      <Sub x={stages[1]} y={127}>geschwächt</Sub>
      <Sub x={stages[2]} y={127}>abgetötet</Sub>
      <Label y={74}>Keime</Label>
      <Label y={92}>Silberionen</Label>
      <Label y={108}>Glas</Label>
      <Note>Silberionen wirken dauerhaft</Note>
    </Frame>
  );
}

/* ---------- TFT-Displays ---------- */

/** Zeilen der Flüssigkristall-Moleküle zwischen den Glasplatten, von oben nach unten. */
const LC_ROWS = [44, 54, 65, 76, 86];
const LC_COLS = Array.from({ length: 8 }, (_, i) => 32 + i * 24);

/** Flüssigkristall-Zelle: oberes und unteres Glas, optional mit Elektrode innen. */
function Cell({ electrodes }: { electrodes: boolean }) {
  return (
    <>
      <Glass y={24} h={12} />
      <Glass y={94} h={12} />
      {electrodes && (
        <g fill={C.ito}>
          <rect x="20" y="36" width="190" height="2" />
          <rect x="20" y="92" width="190" height="2" />
        </g>
      )}
    </>
  );
}

/** Ein Molekül als Stäbchen; `half` ist die sichtbare halbe Länge in der Zeichenebene. */
function Molecule({ x, y, half, upright = false }: { x: number; y: number; half: number; upright?: boolean }) {
  return upright ? (
    <ellipse cx={x} cy={y} rx="2.6" ry={half} fill={C.field} />
  ) : (
    <ellipse cx={x} cy={y} rx={half} ry="2.4" fill={C.field} />
  );
}

function TnDiagram() {
  // Unten liegen die Stäbchen in der Zeichenebene, nach oben drehen sie sich
  // schrittweise um 90° aus ihr heraus – von vorn gesehen werden sie kürzer.
  const halves = [2.6, 3.4, 5.7, 7.4, 8];
  return (
    <Frame label="Querschnitt TN-Zelle: Die Flüssigkristall-Moleküle sind zwischen den beiden Glasplatten schraubenförmig um 90 Grad verdreht.">
      <Cell electrodes />
      {LC_ROWS.map((y, row) =>
        LC_COLS.map((x) => <Molecule key={`${x}-${y}`} x={x} y={y} half={halves[row]} />),
      )}

      <Label y={34}>Glas</Label>
      <Label y={69}>Flüssigkristall</Label>
      <Label y={104}>Glas</Label>
      <Note>Moleküle um 90° verdreht</Note>
    </Frame>
  );
}

function IpsDiagram() {
  // Elektrodenpaare nebeneinander auf dem unteren Glas, Feldlinien als Bögen
  const electrodes = [26, 74, 122, 170];
  return (
    <Frame label="Querschnitt IPS-Zelle: Die Moleküle liegen flach, beide Elektroden sitzen nebeneinander auf dem unteren Glas, das Feld verläuft parallel zum Glas.">
      <Cell electrodes={false} />
      <g stroke={C.field} strokeWidth="1.4" fill="none" strokeDasharray="3 3" opacity="0.8">
        {electrodes.slice(0, -1).map((x, i) => {
          const x2 = electrodes[i + 1];
          return <path key={x} d={`M${x + 7} 90 Q${(x + x2) / 2 + 7} 52 ${x2 + 7} 90`} />;
        })}
      </g>
      {LC_ROWS.map((y) => LC_COLS.map((x) => <Molecule key={`${x}-${y}`} x={x} y={y} half={8} />))}
      <g fill={C.ito}>
        {electrodes.map((x) => (
          <rect key={x} x={x} y="90" width="14" height="4" rx="1" />
        ))}
      </g>

      <Label y={34}>Glas</Label>
      <Label y={62}>Flüssigkristall</Label>
      <Label y={85}>Elektroden</Label>
      <Label y={105}>Glas</Label>
      <Note>Feld parallel zum Glas</Note>
    </Frame>
  );
}

function VaDiagram() {
  return (
    <Frame label="Querschnitt VA-Zelle: Ohne Spannung stehen die Moleküle senkrecht zu den Glasplatten, der Bildpunkt bleibt schwarz.">
      <Cell electrodes />
      {[48, 65, 82].map((y) =>
        LC_COLS.map((x) => <Molecule key={`${x}-${y}`} x={x} y={y} half={7} upright />),
      )}

      <Label y={34}>Glas</Label>
      <Label y={69}>Flüssigkristall</Label>
      <Label y={104}>Glas</Label>
      <Note>Moleküle stehen senkrecht</Note>
    </Frame>
  );
}

/**
 * Gemeinsamer Stapel für den Bonding-Vergleich: Deckglas mit Touch-Elektroden
 * (46–63), darunter der Spalt (GAP) und das Display (91–109). Der Spalt ist
 * bewusst hoch, damit rechts zwei Beschriftungen übereinander Platz haben.
 * Das Licht kommt von links oben; `reflections` sind die Höhen, an denen es
 * spiegelt – der Strahl trifft sie auf seiner Geraden von (34|18) nach (88|90).
 */
const GAP = { top: 63, bottom: 91 };
const rayX = (y: number) => 34 + (y - 18) * 0.75;

function BondingStack({ reflections, children }: { reflections: { y: number; w: number }[]; children: ReactNode }) {
  return (
    <>
      <text x="20" y="12" fill={C.label} fontSize="11.5" fontWeight="500">
        Licht
      </text>
      {children}
      <Glass y={46} h={14} />
      <g fill={C.ito}>
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={24 + i * 16} y="60" width="10" height="3" rx="1" />
        ))}
      </g>
      <rect x="20" y={GAP.bottom} width="190" height="18" rx="2" fill={C.display} />
      {/* Einfallender Strahl bis aufs Display */}
      <Arrow x1={34} y1={18} x2={88} y2={GAP.bottom - 1} color={C.ink} width={2.2} />
      {reflections.map(({ y, w }) => (
        <Arrow key={y} x1={rayX(y) + 2} y1={y - 2} x2={rayX(y) + 22} y2={y - 26} color={C.ito} width={w} />
      ))}
    </>
  );
}

function AirBondingDiagram() {
  return (
    <Frame label="Air Bonding: Ein Klebeband am Rand hält Deckglas und Touch über dem Display, dazwischen bleibt ein Luftspalt. Das Licht spiegelt an der Oberfläche und an beiden Seiten des Luftspalts.">
      <BondingStack
        reflections={[
          { y: 46, w: 2.2 },
          { y: GAP.top, w: 1.6 },
          { y: GAP.bottom, w: 1.6 },
        ]}
      >
        <g fill={C.filmEdge}>
          <rect x="20" y={GAP.top} width="12" height={GAP.bottom - GAP.top} />
          <rect x="198" y={GAP.top} width="12" height={GAP.bottom - GAP.top} />
        </g>
      </BondingStack>

      <Label y={57}>Deckglas, Touch</Label>
      <Label y={74}>Klebeband</Label>
      <Label y={89}>Luftspalt</Label>
      <Label y={105}>Display</Label>
      <Note>Zusätzliche Spiegelungen</Note>
    </Frame>
  );
}

function OpticalBondingDiagram() {
  return (
    <Frame label="Optical Bonding: Ein optisch klarer Kleber (OCA) füllt den Raum zwischen Deckglas mit Touch und Display vollflächig. Das Licht spiegelt nur noch an der Oberfläche.">
      <BondingStack reflections={[{ y: 46, w: 2.2 }]}>
        <rect x="20" y={GAP.top} width="190" height={GAP.bottom - GAP.top} fill={C.band} />
      </BondingStack>

      <Label y={57}>Deckglas, Touch</Label>
      <Label y={81}>OCA-Kleber</Label>
      <Label y={105}>Display</Label>
      <Note>Klebstoff statt Luftspalt</Note>
    </Frame>
  );
}

export const COMPARISON_DIAGRAMS: Record<string, ComponentType> = {
  'touch-resistiv': ResistiveDiagram,
  'touch-pcap': PcapDiagram,
  'touch-ogs': OgsDiagram,
  'glas-chemisch': ChemicalDiagram,
  'glas-thermisch': ThermalDiagram,
  'glas-ag': AntiGlareDiagram,
  'glas-ar': AntiReflectiveDiagram,
  'glas-af': AntiFingerprintDiagram,
  'glas-am': AntiMicrobialDiagram,
  'tft-tn': TnDiagram,
  'tft-ips': IpsDiagram,
  'tft-va': VaDiagram,
  'tft-air': AirBondingDiagram,
  'tft-optical': OpticalBondingDiagram,
};
