import FadeIn from '../FadeIn';

/**
 * Kleine Vergleichsgrafik „Axial oder radial?" auf der Lüfterseite: zwei
 * statische Grafiken, beide Bauarten in Seitenansicht, die Achse waagerecht,
 * der Luftstrom als Linien mit Pfeilspitze. Bewusst ohne Animation.
 *
 * Eigenständige Grafik, nicht Teil der Scroll-Bühne – die Schrift im SVG wird
 * hier nie kleiner als im Original (Spalte ≥ 320 px bei viewBox-Breite 320),
 * deshalb reichen schlichte <text>-Elemente statt der Bühnen-Bausteine.
 *
 * NUR BELEGTE AUSSAGEN (recherchiert 2026-11-24):
 * [DKA] digikey.com/en/articles/comparing-axial-fans-and-centrifugal-fans –
 *       Axial: „pulling air in one end and forcing it out the other in a parallel
 *       direction to the axis", „high volume, but low pressure"; Radial/Zentrifugal:
 *       „expels the air from an outlet at a 90-degree angle (perpendicular) to the
 *       intake", „pressurize air within the fan housing", „more limited volumes"
 * [DKF] forum.digikey.com/t/how-to-select-a-fan-type-axial-centrifugal-and-blower/1012 –
 *       Blower: „Air is strongly pushed in a single direction 90 degrees from the intake"
 * [ALT] victronic-gmbh.de/luefter/ – „DC Blower (Radial Fan)", „DC Brushless Fan
 *       (Axial Fan)", „AC Fan (Axial Fan)"
 * Geräusch bewusst weggelassen: die beiden DigiKey-Quellen widersprechen sich.
 */

const C = {
  axis: '#cbd5e1',
  frame: '#475569',
  hub: '#334155',
  blade: '#94a3b8',
  body: '#e2e8f0',
  outline: '#64748b',
  air: '#00a0e8',
  label: '#64748b',
};

function Arrowhead({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill={C.air} />
      </marker>
    </defs>
  );
}

function Label({ x, y, anchor = 'start', children }: { x: number; y: number; anchor?: 'start' | 'end'; children: string }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill={C.label} fontSize="11" fontWeight="500">
      {children}
    </text>
  );
}

/** Axiallüfter im Schnitt: Rahmenwangen oben/unten, Nabe, zwei Flügel; Luft geradeaus. */
function AxialSvg() {
  const arrow = 'airflow-arrow-axial';
  return (
    <svg
      viewBox="0 0 320 180"
      role="img"
      aria-label="Axiallüfter in Seitenansicht: Die Luft strömt parallel zur Achse durch den Lüfter."
      className="block w-full h-auto"
    >
      <Arrowhead id={arrow} />
      <line x1="16" y1="90" x2="304" y2="90" stroke={C.axis} strokeDasharray="3 4" />
      <Label x={304} y={86} anchor="end">Achse</Label>

      {/* Rahmen im Schnitt */}
      <rect x="138" y="20" width="44" height="14" rx="3" fill={C.frame} />
      <rect x="138" y="146" width="44" height="14" rx="3" fill={C.frame} />
      {/* Flügel, schräg angestellt */}
      <path d="M150 74 L160 36 L171 36 L162 74 Z" fill={C.blade} />
      <path d="M158 106 L149 144 L160 144 L170 106 Z" fill={C.blade} />
      {/* Nabe mit Motor */}
      <rect x="146" y="72" width="28" height="36" rx="5" fill={C.hub} />

      {/* Luftstrom: links rein, rechts raus – parallel zur Achse */}
      {[50, 64, 116, 130].map((y) => (
        <line
          key={y}
          x1="22"
          y1={y}
          x2="294"
          y2={y}
          stroke={C.air}
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd={`url(#${arrow})`}
        />
      ))}
      <Label x={22} y={40}>Ansaugung</Label>
      <Label x={294} y={40} anchor="end">Ausblas</Label>
    </svg>
  );
}

/** Radiallüfter (Blower) im Schnitt: Luft tritt axial ein, verlässt das Gehäuse um 90° versetzt. */
function RadialSvg() {
  const arrow = 'airflow-arrow-radial';
  return (
    <svg
      viewBox="0 0 320 180"
      role="img"
      aria-label="Radiallüfter in Seitenansicht: Die Luft wird in Achsrichtung angesaugt und um 90 Grad versetzt ausgeblasen."
      className="block w-full h-auto"
    >
      <Arrowhead id={arrow} />
      <line x1="16" y1="122" x2="304" y2="122" stroke={C.axis} strokeDasharray="3 4" />
      <Label x={304} y={116} anchor="end">Achse</Label>

      {/* Gehäuse mit Ausblasstutzen nach oben; links die Ansaugöffnung */}
      <path
        d="M120 100 a8 8 0 0 1 8 -8 H190 V24 H232 V150 a8 8 0 0 1 -8 8 H128 a8 8 0 0 1 -8 -8 Z"
        fill={C.body}
      />
      <path
        d="M120 108 V100 a8 8 0 0 1 8 -8 H190 V24 H232 V150 a8 8 0 0 1 -8 8 H128 a8 8 0 0 1 -8 -8 V136"
        fill="none"
        stroke={C.outline}
        strokeWidth="1.5"
      />
      {/* Laufrad mit Schaufeln */}
      <rect x="140" y="104" width="36" height="36" rx="3" fill={C.hub} />
      {[147, 153, 159, 165, 171].map((x) => (
        <line key={x} x1={x} y1="107" x2={x} y2="137" stroke={C.outline} strokeWidth="1.5" />
      ))}

      {/* Luftstrom: axial angesaugt, um 90° umgelenkt nach oben ausgeblasen */}
      {[
        'M22 116 H146 C170 116 204 110 204 84 V18',
        'M22 128 H146 C178 128 218 118 218 84 V18',
      ].map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={C.air}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd={`url(#${arrow})`}
        />
      ))}
      <Label x={22} y={106}>Ansaugung</Label>
      <Label x={242} y={30}>Ausblas</Label>
      <Label x={242} y={46}>um 90°</Label>
    </svg>
  );
}

const PANELS = [
  {
    title: 'Axiallüfter',
    svg: <AxialSvg />,
    path: 'Die Luft strömt parallel zur Achse durch den Lüfter – auf der einen Seite hinein, auf der anderen hinaus.', // [DKA]
    rows: [
      { label: 'Luftmenge und Druck', text: 'Große Luftmenge bei geringem Druck' }, // [DKA]
      { label: 'Unsere Modelle', text: 'DC Brushless Fan, AC Fan' }, // [ALT]
    ],
  },
  {
    title: 'Radiallüfter (Blower)',
    svg: <RadialSvg />,
    path: 'Die Luft wird in Achsrichtung angesaugt und um 90° versetzt ausgeblasen.', // [DKA] [DKF]
    rows: [
      { label: 'Luftmenge und Druck', text: 'Baut im Gehäuse Druck auf, bei geringerer Luftmenge' }, // [DKA]
      { label: 'Unsere Modelle', text: 'DC Blower' }, // [ALT]
    ],
  },
];

export default function AirflowComparison() {
  return (
    <section aria-labelledby="luftweg-titel">
      <FadeIn inView>
        <div className="max-w-3xl mx-auto mb-10 md:mb-14 text-center">
          <h2 id="luftweg-titel" className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            Axial oder radial?
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Beide Varianten bieten wir an.
          </p>
        </div>
      </FadeIn>

      <FadeIn inView>
        <div className="grid gap-y-14 md:grid-cols-2 md:gap-x-10 lg:gap-x-16">
          {PANELS.map((panel) => (
            <div key={panel.title}>
              <div className="rounded-3xl ring-1 ring-black/5 bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#f2f5f8_55%,#e6ebf0_100%)] px-4 py-6 md:px-6">
                {panel.svg}
              </div>
              <h3 className="mt-6 text-xl md:text-2xl font-semibold tracking-tight text-gray-900">{panel.title}</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">{panel.path}</p>
              <dl className="mt-4">
                {panel.rows.map((row) => (
                  <div key={row.label} className="border-t border-gray-100 py-3">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{row.label}</dt>
                    <dd className="mt-1 text-gray-700">{row.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
