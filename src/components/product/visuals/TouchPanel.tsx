import { C, CompactNote, FadeIn, LayerLabel, StageText, useStageViewBox, type ProductVisualProps } from './stage';
import { MODEL_WINDOW, useScrollStyle } from '../useScrollStyle';

/**
 * Touchscreens (modelType "touch"): ein einfacher Touch. Beim Scrollen fährt
 * ein Finger an das Display, berührt eine Schaltfläche, und das Gerät
 * reagiert – die Fläche wird aktiv, Wellen laufen vom Berührpunkt aus, der
 * Statusbalken füllt sich und ein Haken erscheint. Danach zieht sich der
 * Finger ein Stück zurück, die Reaktion bleibt stehen.
 *
 * Bewusst keine Schichten und keine Technik-Unterschiede mehr (das Team fand
 * die Explosionsdarstellung unpassend) – die erklärt der Vergleich „Resistiv,
 * PCAP oder OGS?" weiter unten auf der Seite.
 *
 * Die Zeitpunkte unten sind direkte scrollYProgress-Werte der Bühne, nicht die
 * lokalen Fenster von Layer/FadeIn (die laufen über at()).
 */

/** Globaler Fortschritt → lokales Fenster für FadeIn (Umkehrung von at()). */
const local = (p: number) => (p - MODEL_WINDOW[0]) / (MODEL_WINDOW[1] - MODEL_WINDOW[0]);

// Display, frontal
// width/height statt w/h: die Objekte werden direkt auf <rect> gespreizt
const BEZEL = { x: 110, y: 100, width: 480, height: 330 };
const SCREEN = { x: 136, y: 126, width: 428, height: 278 };
// Drei Kacheln wie auf einer Bedienoberfläche; die mittlere wird berührt
const TILE_W = 116;
const TILE_H = 120;
// Kacheln eher im unteren Teil des Bildschirms: Der Finger muss dann nur ein
// kurzes Stück über den Rahmen und kann danach auslaufen – sonst wird er zu lang.
const TILE_Y = 226;
const TILE_XS = [154, 292, 430];
/** Berührpunkt: etwas unter der Mitte der mittleren Kachel. */
const TOUCH = { x: 350, y: 296 };
/** Neigung des Fingers: er kommt von rechts unten. */
const HAND_ANGLE = -22;

/** Engerer Ausschnitt für das Handy (Display plus Finger, ohne Beschriftungsrand). */
const COMPACT_VIEWBOX = '92 84 516 452';

/**
 * Wo der Finger steht, relativ zur Berührposition: erst außerhalb, dann knapp
 * über der Fläche, dann auf ihr, zum Schluss etwas zurückgezogen.
 */
const FINGER_INPUT = [0.2, 0.3, 0.42, 0.5, 0.6, 0.7];
const FINGER_X = [300, 170, 26, 0, 0, 70];
const FINGER_Y = [330, 200, 30, 0, 0, 80];
/** Schatten: liegt versetzt, solange der Finger schwebt, und läuft beim Berühren unter ihn. */
const SHADOW_X = [322, 192, 48, 3, 3, 100];
const SHADOW_Y = [356, 226, 56, 4, 4, 116];

/** Einfache Kachel-Symbole, als Strich gezeichnet. */
function TileIcon({ kind, cx, cy, color }: { kind: 'list' | 'power' | 'sun'; cx: number; cy: number; color: string }) {
  const common = { stroke: color, strokeWidth: 4, strokeLinecap: 'round' as const, fill: 'none' };
  if (kind === 'list') {
    return (
      <g {...common}>
        {[-14, 0, 14].map((dy) => (
          <path key={dy} d={`M${cx - 20} ${cy + dy} H${cx + 20}`} />
        ))}
      </g>
    );
  }
  if (kind === 'power') {
    return (
      <g {...common}>
        <path d={`M${cx - 13} ${cy - 13} A20 20 0 1 0 ${cx + 13} ${cy - 13}`} />
        <path d={`M${cx} ${cy - 24} V${cy - 2}`} />
      </g>
    );
  }
  return (
    <g {...common}>
      <circle cx={cx} cy={cy} r="9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const r = (deg * Math.PI) / 180;
        return (
          <path
            key={deg}
            d={`M${cx + Math.cos(r) * 16} ${cy + Math.sin(r) * 16} L${cx + Math.cos(r) * 21} ${cy + Math.sin(r) * 21}`}
          />
        );
      })}
    </g>
  );
}

/**
 * Zeigefinger als schlichtes Piktogramm (keine Hautfarbe), Fingerkuppe im
 * Ursprung, der Finger zeigt nach oben. Ohne Hand: Er läuft nach hinten über
 * eine Maske weich aus, als käme er von außerhalb ins Bild – so endet er
 * nirgends abrupt. Leichter Verlauf zur rechten Kante gibt ihm Volumen.
 *
 * Die Maske hängt am inneren <g> ohne transform, damit ihre Koordinaten die
 * lokalen (gedrehten) Fingerkoordinaten sind.
 */
function Finger() {
  // Proportion wie ein echter Zeigefinger: rund 50 breit, bis zum Auslauf gut
  // 4-mal so lang. Der Umriss ist nicht gerade: Kuppe etwas breiter, hinter dem
  // vorderen Gelenk leicht schmaler, am Mittelgelenk minimal dicker, nach
  // hinten breiter. (Eine erste Fassung war 7-mal so lang wie breit und
  // schnurgerade – sie sah aus wie ein Stift.)
  // Gezeichnet mit der Kuppe bei y = 0; translate(0 -12) legt die Fingerbeere
  // auf den Ursprung, also auf den Berührpunkt.
  const outline =
    'M-24 28 C-24 9 -13 0 0 0 C13 0 24 9 24 28 ' +
    'C24.5 44 23 55 23.5 63 C24 86 27 108 26.6 122 C26.3 140 27.5 165 28.5 190 L30 230 ' +
    'L-30 230 L-28.5 190 C-27.5 165 -26.3 140 -26.6 122 C-27 108 -24 86 -23.5 63 C-23 55 -24.5 44 -24 28 Z';
  return (
    <g mask="url(#touch-finger-fade)">
      <g transform="translate(0 -12)">
        <path d={outline} fill="url(#touch-finger-shade)" stroke={C.inkSoft} strokeWidth="2" strokeLinejoin="round" />
        {/* Nagel mit Glanzlicht und Nagelhaut */}
        <rect x="-14" y="5" width="28" height="34" rx="12" fill={C.brand50} stroke={C.inkFaint} strokeWidth="1.5" />
        <ellipse cx="-5" cy="16" rx="4" ry="7" fill={C.white} opacity="0.9" />
        <path d="M-11 44 q11 4 22 0" stroke={C.lineSoft} strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Falten am vorderen und am mittleren Gelenk */}
        <g stroke={C.inkFaint} strokeWidth="1.5" fill="none" strokeLinecap="round">
          <path d="M-10 64 q10 4 20 0" />
          <path d="M-7 70 q7 2.5 14 0" />
          <path d="M-12 117 q12 5 24 0" />
          <path d="M-13 124 q13 5 26 0" />
          <path d="M-9 131 q9 3 18 0" />
        </g>
      </g>
    </g>
  );
}

export default function TouchPanel({ progress, reducedMotion }: ProductVisualProps) {
  const common = { progress, reducedMotion };
  const viewBox = useStageViewBox(COMPACT_VIEWBOX);

  // Finger: Weg zur Fläche, kurz drauf, dann etwas zurück. Beim Berühren
  // minimal kleiner – er bewegt sich vom Betrachter weg zum Glas hin.
  const fingerRef = useScrollStyle<SVGGElement>(
    progress,
    {
      input: FINGER_INPUT,
      x: FINGER_X,
      y: FINGER_Y,
      opacity: [0, 1, 1, 1, 1, 1],
      scale: [1, 1, 1, 0.97, 0.97, 1],
    },
    reducedMotion
  );
  const shadowRef = useScrollStyle<SVGGElement>(
    progress,
    {
      input: FINGER_INPUT,
      x: SHADOW_X,
      y: SHADOW_Y,
      opacity: [0, 0.5, 0.6, 0.9, 0.9, 0.45],
    },
    reducedMotion
  );

  // Reaktion des Geräts
  const activeRef = useScrollStyle<SVGGElement>(progress, { input: [0.5, 0.54], opacity: [0, 1] }, reducedMotion);
  const ring1Ref = useScrollStyle<SVGCircleElement>(
    progress,
    { input: [0.5, 0.52, 0.64], opacity: [0, 0.9, 0], scale: [0.4, 0.7, 2.8] },
    reducedMotion
  );
  const ring2Ref = useScrollStyle<SVGCircleElement>(
    progress,
    { input: [0.54, 0.56, 0.7], opacity: [0, 0.7, 0], scale: [0.4, 0.7, 2.8] },
    reducedMotion
  );
  const statusRef = useScrollStyle<SVGPathElement>(progress, { input: [0.53, 0.68], dashOffset: [1, 0] }, reducedMotion);

  // Wellen skalieren um ihren eigenen Mittelpunkt, der Finger um den Berührpunkt
  const ringStyle = { opacity: 0, transformBox: 'fill-box', transformOrigin: 'center' } as const;

  return (
    <svg viewBox={viewBox} className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="touch-screen-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.brand50} />
          <stop offset="100%" stopColor={C.white} />
        </linearGradient>
        <radialGradient id="touch-shadow-grad">
          <stop offset="0%" stopColor={C.slate} stopOpacity="0.35" />
          <stop offset="100%" stopColor={C.slate} stopOpacity="0" />
        </radialGradient>
        {/* Finger: Volumen über die Breite, Auslauf nach hinten (lokale Koordinaten) */}
        <linearGradient id="touch-finger-shade" gradientUnits="userSpaceOnUse" x1="-30" y1="0" x2="30" y2="0">
          <stop offset="0%" stopColor={C.white} />
          <stop offset="50%" stopColor={C.white} />
          <stop offset="85%" stopColor={C.lineSoft} />
          <stop offset="100%" stopColor={C.line} />
        </linearGradient>
        {/* Kurzer Auslauf etwa dort, wo der Knöchel säße – erst unterhalb des Rahmens */}
        <linearGradient id="touch-finger-fade-grad" gradientUnits="userSpaceOnUse" x1="0" y1="160" x2="0" y2="208">
          <stop offset="0%" stopColor={C.white} />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <mask id="touch-finger-fade" maskUnits="userSpaceOnUse" x="-50" y="-50" width="100" height="320">
          <rect x="-50" y="-50" width="100" height="320" fill="url(#touch-finger-fade-grad)" />
        </mask>
      </defs>

      {/* Display: Rahmen, Glasfläche, Oberfläche mit drei Kacheln */}
      <FadeIn {...common} from={0} to={0.1}>
        <rect {...BEZEL} rx="26" fill={C.plasticDark} />
        <rect {...BEZEL} rx="26" fill="none" stroke={C.plasticRib} strokeWidth="2" />
        <rect {...SCREEN} rx="10" fill="url(#touch-screen-grad)" />

        {/* Statusleiste: leere Spur, füllt sich nach der Berührung */}
        <path d="M160 152 H400" stroke={C.lineSoft} strokeWidth="6" strokeLinecap="round" />
        {/* Seitenpunkte unten */}
        <g fill={C.line}>
          {[334, 350, 366].map((x) => (
            <circle key={x} cx={x} cy="382" r="4" />
          ))}
        </g>

        {TILE_XS.map((x, i) => (
          <g key={x}>
            <rect x={x} y={TILE_Y} width={TILE_W} height={TILE_H} rx="16" fill={C.white} stroke={C.lineSoft} strokeWidth="2" />
            <TileIcon kind={(['list', 'power', 'sun'] as const)[i]} cx={x + TILE_W / 2} cy={TILE_Y + TILE_H / 2} color={C.inkFaint} />
          </g>
        ))}

        {/* Glanz auf dem Deckglas */}
        <polygon points="136,126 300,126 196,404 136,404" fill={C.white} opacity="0.12" />

        <LayerLabel x={BEZEL.x + BEZEL.width} y={160} text="Touch-Display" sub="Glas mit Touch-Sensor" length={30} />
      </FadeIn>

      {/* Reaktion: mittlere Kachel wird aktiv */}
      <g ref={activeRef} style={{ opacity: 0 }}>
        <rect x={TILE_XS[1]} y={TILE_Y} width={TILE_W} height={TILE_H} rx="16" fill={C.brand500} />
        <TileIcon kind="power" cx={TILE_XS[1] + TILE_W / 2} cy={TILE_Y + TILE_H / 2} color={C.white} />
      </g>

      {/* Statusbalken füllt sich */}
      <path
        ref={statusRef}
        d="M160 152 H400"
        stroke={C.brand500}
        strokeWidth="6"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        style={{ strokeDashoffset: 1 }}
      />

      {/* Wellen vom Berührpunkt */}
      <circle ref={ring1Ref} cx={TOUCH.x} cy={TOUCH.y} r="22" fill="none" stroke={C.brand500} strokeWidth="3" style={ringStyle} />
      <circle ref={ring2Ref} cx={TOUCH.x} cy={TOUCH.y} r="22" fill="none" stroke={C.brand400} strokeWidth="2.5" style={ringStyle} />

      {/* Haken in der Statusleiste und Beschriftung der Reaktion */}
      <FadeIn {...common} from={local(0.62)} to={local(0.7)}>
        <circle cx="538" cy="152" r="13" fill={C.brand500} />
        <path d="M531 152 l5 5 l9 -10" stroke={C.white} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <StageText x={418} y={157} fill={C.brand700} fontSize="13" fontWeight="700">
          Aktiv
        </StageText>
      </FadeIn>
      <FadeIn {...common} from={local(0.56)} to={local(0.64)}>
        <LayerLabel x={BEZEL.x + BEZEL.width} y={TOUCH.y} text="Touch erkannt" sub="Gerät reagiert" length={30} />
      </FadeIn>
      {/* Kompakt (Handy): Hinweis, solange der Finger kommt */}
      <FadeIn {...common} from={local(0.3)} to={local(0.4)}>
        <CompactNote text="Berührung" sub="Finger auf dem Glas" />
      </FadeIn>

      {/* Schatten des Fingers auf dem Glas – zeigt, wie nah er ist */}
      <g ref={shadowRef} style={{ opacity: 0 }}>
        <g transform={`translate(${TOUCH.x} ${TOUCH.y}) rotate(${HAND_ANGLE})`}>
          <ellipse cx="3" cy="66" rx="32" ry="78" fill="url(#touch-shadow-grad)" />
        </g>
      </g>

      {/* Finger */}
      <g
        ref={fingerRef}
        style={{ opacity: 0, transformBox: 'view-box', transformOrigin: `${TOUCH.x}px ${TOUCH.y}px` }}
      >
        <g transform={`translate(${TOUCH.x} ${TOUCH.y}) rotate(${HAND_ANGLE})`}>
          <Finger />
        </g>
      </g>
    </svg>
  );
}
