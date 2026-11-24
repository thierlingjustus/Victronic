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

export const COMPARISON_DIAGRAMS: Record<string, ComponentType> = {
  'touch-resistiv': ResistiveDiagram,
  'touch-pcap': PcapDiagram,
  'touch-ogs': OgsDiagram,
};
