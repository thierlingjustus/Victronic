import {
  at,
  C,
  Chip,
  FadeIn,
  FadeOut,
  IsoPlate,
  layerWindow,
  StackLayer,
  useStageViewBox,
  type ProductVisualProps,
} from './stage';
import { useEffect, useState } from 'react';
import { useScrollStyle } from '../useScrollStyle';

/**
 * Lüfter (modelType "fan"): der Axiallüfter als echter Teardown in derselben
 * seitlich-isometrischen Ansicht wie TftStack. Reihenfolge von hinten nach
 * vorn – Rahmen mit vier Schraubpunkten, bewickelter Stator mit Ansteuer-PCB,
 * Rotorwelle mit zwei Kugellagern, Flügelrad, vieradrige Anschlussleitung.
 * Genau die Reihenfolge der Caption zu exploded-pwm.jpg in products.ts.
 *
 * Vorher war das Visual frontal, alle Schichten hatten spread={0} – es fuhr
 * also gar nicht auseinander – und die Lagergruppe saß bei x=740 in einer
 * viewBox der Breite 800, also unsichtbar unter der Faktenkarte.
 *
 * Ablauf: die Explosion läuft zuerst wieder zusammen (COLLAPSE), danach dreht
 * sich der montierte Lüfter frontal zur Kamera (TURN) und das Flügelrad läuft
 * weiter. Für die Drehung braucht es keine zweite Zeichnung: die isometrische
 * Ansicht ist exakt „Quadrat um 45° gedreht und in der Höhe um SQUASH
 * gestaucht". Nimmt man beides über eine Transformation zurück, wird aus der
 * Raute das aufrechte Quadrat und aus jeder Ellipse ein Kreis – aus derselben
 * Geometrie. Eine überblendete zweite Zeichnung hätte dagegen kurzzeitig zwei
 * Lüfter übereinander gezeigt.
 */

const CX = 360;
const CY = 300;
const A = 170;
const B = 95;

const LABEL_R = CX + A;
const LABEL_L = CX - A;
const LEN_R = 44;
const LEN_L = 16;

/** Stauchung der Kreisformen in die isometrische Fläche. */
const SQUASH = B / A;
const BLADES = 9;
/** Zahl der Schichten – bestimmt die Staffelung über LAYER_BAND. */
const N = 5;

/** Fenster, in dem sich der Lüfter wieder zusammensetzt. */
const COLLAPSE: [number, number] = [0.75, 0.88];

/**
 * Fenster der Frontaldrehung. Beginnt exakt dort, wo COLLAPSE endet – die
 * Schichten stehen dann alle wieder auf Versatz 0 und die Beschriftungen sind
 * ausgeblendet, es dreht sich also eine geschlossene Einheit.
 */
const TURN: [number, number] = [0.88, 0.97];

/**
 * Faktenkarte → Schicht. specs in products.ts:
 * 0 Bauarten · 1 Lagerung · 2 Varianten · 3 Steuerung & Zubehör
 */
const SPEC_LAYERS = [3, 2, 3, 1];

/** Ein Flügel als gebogene Fläche, von der Nabe nach außen. */
function Blade({ index }: { index: number }) {
  return (
    <path
      d="M31 -11 Q81 -36 100 -9 Q81 20 31 11 Q22 0 31 -11 Z"
      fill={C.slate}
      stroke="#0f172a"
      strokeWidth="1.5"
      transform={`rotate(${(index / BLADES) * 360})`}
      opacity="0.92"
    />
  );
}

/**
 * Engerer Ausschnitt für das Handy, sobald die Beschriftungen entfallen:
 * gemessene Ausdehnung der Zeichnung über den ganzen Scrollverlauf plus Rand.
 */
const COMPACT_VIEWBOX = '45 -10 630 620';

export default function AxialFan({ progress, reducedMotion, activeFact = -1 }: ProductVisualProps) {
  const common = { progress, reducedMotion };
  const viewBox = useStageViewBox(COMPACT_VIEWBOX);
  const [assembled, setAssembled] = useState(false);
  useEffect(() => {
    const mark = (v: number) => setAssembled(v >= at(COLLAPSE[0]));
    mark(progress.get());
    return progress.on('change', mark);
  }, [progress]);

  const active = !assembled && activeFact >= 0 ? SPEC_LAYERS[activeFact] ?? -1 : -1;
  const layer = { ...common, n: N, activeIndex: active, collapse: COLLAPSE };

  /*
   * Der Rotor dreht sich mit dem Scrollen und wird dabei schneller. Das läuft
   * nicht über <Layer>, weil dort nur Deckkraft und Versatz gesteuert werden.
   * Die Drehung sitzt innerhalb der translate/scale-Gruppe, transformOrigin
   * ist deshalb der lokale Nullpunkt – transformBox ist zwingend, sonst dreht
   * der Knoten um den Ursprung der viewBox statt um die Nabe.
   */
  const axisRef = useScrollStyle<SVGGElement>(
    progress,
    {
      input: [at(0.1), at(0.3), at(COLLAPSE[0]), at(COLLAPSE[1])],
      opacity: [0, 1, 1, 0],
    },
    reducedMotion
  );

  const rotorWindow = layerWindow(3, N);
  const rotorRef = useScrollStyle<SVGGElement>(
    progress,
    {
      input: [at(rotorWindow[0]), at(rotorWindow[1]), at(COLLAPSE[0]), at(1)],
      rotate: [0, 90, 180, 1440],
    },
    reducedMotion
  );

  /*
   * Die Frontaldrehung. rotate(45°) richtet die Raute zum Quadrat auf,
   * scaleY(1/SQUASH) nimmt die isometrische Stauchung zurück – in dieser
   * Reihenfolge, weil transform-Listen von rechts nach links auf die
   * Kindkoordinaten wirken: erst entzerren, dann drehen. Alles, was innerhalb
   * der Gruppe mit scale(1 SQUASH) gezeichnet ist (Flügelrad, Stator, Naben),
   * wird dadurch wieder kreisrund, die Schraublöcher ebenso.
   */
  const turnRef = useScrollStyle<SVGGElement>(
    progress,
    {
      input: [at(TURN[0]), at(TURN[1])],
      rotate: [0, 45],
      scaleY: [1, 1 / SQUASH],
      // Das aufgerichtete Quadrat ist nur A*√2 breit, die liegende Raute 2*A.
      // Der gleichmäßige Aufschlag hält die Bildwirkung über die Drehung hinweg.
      scale: [1, 1.25],
    },
    reducedMotion
  );

  return (
    <svg viewBox={viewBox} className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/*
        Anschlussleitung der Frontalansicht. Steht bewusst außerhalb der
        Drehgruppe – sie wird in Endkoordinaten gezeichnet und blendet erst
        auf, wenn der Rahmen schon fast quadratisch ist und ihren Austritt
        verdeckt. Vor der Gruppe notiert, damit sie hinter dem Rahmen liegt.
      */}
      <FadeIn {...common} from={0.955} to={0.99}>
        <g strokeWidth="4.5" fill="none" strokeLinecap="round">
          {([
            [-6, C.ink],
            [-2, C.inkFaint],
            [2, C.fpc],
            [6, C.pcbTrace],
          ] as [number, string][]).map(([d, col]) => (
            <path
              key={d}
              d={`M${CX - 100 + d * 0.5} ${CY + 106 + d} q-60 40 -124 56`}
              stroke={col}
            />
          ))}
        </g>
        {/* Stecker am freien Ende – vier Kontakte: +, −, Tacho, PWM */}
        <rect
          x={CX - 282}
          y={CY + 150}
          width="58"
          height="24"
          rx="4"
          fill="#eef1f4"
          stroke={C.line}
          strokeWidth="1.5"
        />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={CX - 274 + i * 13} y={CY + 156} width="7" height="13" rx="2" fill={C.metalDark} />
        ))}
      </FadeIn>

      <g
        ref={turnRef}
        style={{ transformBox: 'view-box', transformOrigin: `${CX}px ${CY}px` }}
      >
        {/* Montageachse – bindet Welle, Lager und Nabe sichtbar aneinander,
            statt sie frei im Raum stehen zu lassen. Übliche Konvention in
            Explosionszeichnungen, deshalb gestrichelt und ganz hinten. */}
        <g ref={axisRef} style={{ opacity: 0 }}>
          <path
            d={`M${CX} ${CY - 190} V${CY + 230}`}
            stroke={C.line}
            strokeWidth="1.5"
            strokeDasharray="7 6"
            fill="none"
          />
        </g>

        {/* 0. Rahmen mit Gitterdurchbruch und vier Schraubpunkten */}
        <StackLayer
          {...layer}
          i={0}
          spread={110}
          label={{ x: LABEL_R, y: CY + 6, text: 'Rahmen', sub: '4 Schraubpunkte', length: LEN_R }}
        >
          {/* Materialstärke des Rahmens – nur in der Draufsicht sichtbar */}
          <FadeOut {...common} from={TURN[0]} to={TURN[0] + 0.05}>
            <polygon points={`${CX - A},${CY} ${CX},${CY + B} ${CX},${CY + B + 16} ${CX - A},${CY + 16}`} fill="#26292f" />
            <polygon points={`${CX + A},${CY} ${CX},${CY + B} ${CX},${CY + B + 16} ${CX + A},${CY + 16}`} fill="#1c1f24" />
          </FadeOut>
          {/* Deckfläche mit rundem Durchbruch – evenodd stanzt das Loch */}
          <path
            fillRule="evenodd"
            fill="#3a3f47"
            d={`M${CX - A} ${CY} L${CX} ${CY - B} L${CX + A} ${CY} L${CX} ${CY + B} Z
                M${CX - A * 0.62} ${CY} a${A * 0.62} ${B * 0.62} 0 1 0 ${A * 1.24} 0
                a${A * 0.62} ${B * 0.62} 0 1 0 ${-A * 1.24} 0 Z`}
          />
          {/* Schraublöcher mit Gummitüllen, an den vier Ecken des Rahmens */}
          {([
            [CX - A * 0.84, CY],
            [CX + A * 0.84, CY],
            [CX, CY - B * 0.84],
            [CX, CY + B * 0.84],
          ] as [number, number][]).map(([x, y], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y} rx="15" ry="8.5" fill="#15181d" />
              <ellipse cx={x} cy={y} rx="8" ry="4.5" fill={C.white} opacity="0.9" />
            </g>
          ))}
          {/* Drei Haltestege zur Nabe */}
          <g transform={`translate(${CX} ${CY}) scale(1 ${SQUASH})`}>
            <g stroke="#4a515a" strokeWidth="12" strokeLinecap="round" fill="none">
              {[24, 144, 264].map((deg) => (
                <path key={deg} d="M0 0 L0 -104" transform={`rotate(${deg})`} />
              ))}
            </g>
          </g>
        </StackLayer>

        {/* 1. Bewickelter Stator mit Ansteuer-PCB */}
        <StackLayer
          {...layer}
          i={1}
          spread={56}
          label={{ x: CX - 52, y: CY, text: 'Stator + PWM-PCB', sub: 'Tachosignal', side: 'left', length: CX - 52 - (LABEL_L - LEN_L) }}
        >
          {/* Trägerplatine, auf der der Stator sitzt. Frontal liegt sie
              vollständig hinter dem Flügelrad – als Quadrat würde sie sonst
              zwischen den Flügeln durchscheinen. */}
          <FadeOut {...common} from={TURN[0]} to={TURN[0] + 0.05}>
            <IsoPlate cx={CX} cy={CY} a={A * 0.46} b={B * 0.46} t={6} fill={C.pcb} side="#0d3a20">
              <rect x={CX - 16} y={CY - 5} width="32" height="12" rx="2" fill={C.ic} />
            </IsoPlate>
          </FadeOut>
          <g transform={`translate(${CX} ${CY}) scale(1 ${SQUASH})`}>
            {/* Statorkern */}
            <circle r="52" fill={C.slate} />
            <circle r="52" fill="none" stroke="#0f172a" strokeWidth="2" />
            {/* Sechs Wicklungspakete */}
            <g stroke={C.gold} strokeWidth="7" opacity="0.9" fill="none" strokeLinecap="round">
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <path key={deg} d="M0 -44 A44 44 0 0 1 26 -35" transform={`rotate(${deg})`} />
              ))}
            </g>
            <circle r="18" fill="#0f1113" />
          </g>
        </StackLayer>

        {/* 2. Rotorwelle mit zwei Kugellagern (Dual Ball Bearing).
            Blendet zur Frontalansicht aus: von vorn liegt beides hinter der
            Nabe, die Welle zeigt zur Kamera. */}
        <StackLayer
          {...layer}
          i={2}
          spread={0}
          label={{ x: CX + 46, y: CY - 6, text: 'Dual Ball Bearing', sub: 'beidseitig gelagert', length: LABEL_R + LEN_R - (CX + 46) }}
        >
          <FadeOut {...common} from={TURN[0]} to={TURN[0] + 0.05}>
            <g transform={`translate(${CX} ${CY})`}>
              {/* Welle – steht senkrecht auf der Rotationsebene */}
              <rect x="-8" y="-64" width="16" height="128" rx="4" fill={C.steel} />
              <rect x="-8" y="-64" width="16" height="128" rx="4" fill="none" stroke={C.metalDark} strokeWidth="1.2" />
              {/* Bund am unteren Wellenende – sitzt später im Statorlager */}
              <g transform={`translate(0 62) scale(1 ${SQUASH})`}>
                <circle r="17" fill={C.metal} stroke={C.metalDark} strokeWidth="1.5" />
                <circle r="8" fill="#0f1113" />
              </g>
              {/* Zwei Lager beidseitig der Welle */}
              {[-42, 44].map((dy, i) => (
                <g key={i} transform={`translate(0 ${dy}) scale(1 ${SQUASH})`}>
                  <circle r="34.5" fill="#e6e9ec" stroke={C.metalDark} strokeWidth="1.5" />
                  <circle r="40" fill="none" stroke={C.metalDark} strokeWidth="11" />
                  <circle r="45.5" fill="none" stroke={C.metalDark} strokeWidth="1.5" />
                  <circle r="29" fill="none" stroke={C.metalDark} strokeWidth="1.5" />
                  <g fill={C.white} stroke={C.metalDark} strokeWidth="0.8">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                      const rad = (deg * Math.PI) / 180;
                      return <circle key={deg} cx={Math.cos(rad) * 34.5} cy={Math.sin(rad) * 34.5} r="5.5" />;
                    })}
                  </g>
                </g>
              ))}
            </g>
          </FadeOut>
        </StackLayer>

        {/* 3. Flügelrad – dreht sich, wird beim Scrollen schneller */}
        <StackLayer
          {...layer}
          i={3}
          spread={-60}
          label={{ x: CX - 100, y: CY, text: 'Flügelrad', sub: '9 Flügel, DC brushless', side: 'left', length: CX - 100 - (LABEL_L - LEN_L) }}
        >
          <g transform={`translate(${CX} ${CY}) scale(1 ${SQUASH})`}>
            <g ref={rotorRef} style={{ transformOrigin: '0px 0px', transformBox: 'view-box' }}>
              {Array.from({ length: BLADES }).map((_, i) => (
                <Blade key={i} index={i} />
              ))}
              {/* Nabe mit Rotorkappe */}
              <circle r="34" fill="#2b3038" />
              <circle r="34" fill="none" stroke="#1a1f26" strokeWidth="2" />
              <circle r="21" fill="#343a44" />
              <circle cx="-7" cy="-7" r="8" fill={C.white} opacity="0.14" />
            </g>
          </g>
        </StackLayer>

        {/*
          4. Vieradrige Anschlussleitung mit Stecker. Liegt auf derselben Höhe
          wie der Rahmen (spread 110): real tritt das Kabel seitlich aus dem
          Rahmen aus, es darf nicht über dem Rotor schweben. Zur Frontalansicht
          übernimmt die Leitung außerhalb der Drehgruppe.
        */}
        <StackLayer
          {...layer}
          i={4}
          spread={110}
          label={{ x: CX - 150, y: CY + 46, text: '4-adrige Leitung', sub: '+, −, Tacho, PWM', side: 'left', length: CX - 150 - (LABEL_L - LEN_L) }}
        >
          <FadeOut {...common} from={TURN[0]} to={TURN[0] + 0.04}>
            {/* Austritt an der unteren linken Rahmenkante, dann nach unten links */}
            <g strokeWidth="4.5" fill="none" strokeLinecap="round">
              {([
                [-6, C.ink],
                [-2, C.inkFaint],
                [2, C.fpc],
                [6, C.pcbTrace],
              ] as [number, string][]).map(([d, col]) => (
                <path
                  key={d}
                  d={`M${CX - 86 + d} ${CY + 46 + d * 0.5} L${CX - 132 + d} ${CY + 72 + d * 0.5} q-38 22 -74 26`}
                  stroke={col}
                />
              ))}
            </g>
            {/* Tülle am Rahmenaustritt */}
            <ellipse cx={CX - 86} cy={CY + 46} rx="13" ry="9" fill="#15181d" transform={`rotate(-30 ${CX - 86} ${CY + 46})`} />
            {/* Stecker am freien Ende */}
            <rect x={CX - 248} y={CY + 86} width="58" height="24" rx="4" fill="#eef1f4" stroke={C.line} strokeWidth="1.5" />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={CX - 240 + i * 13} y={CY + 92} width="7" height="13" rx="2" fill={C.metalDark} />
            ))}
          </FadeOut>
        </StackLayer>
      </g>

      <FadeIn {...common} from={0.76} to={0.9}>
        <Chip x={126} y={540} label="PWM + Tachosignal" />
        <Chip x={295} y={540} label="Sleeve · Ball · Double Ball" />
        <Chip x={533} y={540} label="High · Mid · Low" />
      </FadeIn>
    </svg>
  );
}
