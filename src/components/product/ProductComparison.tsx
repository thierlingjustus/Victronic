import type { CSSProperties } from 'react';
import type { ProductComparison as Comparison } from '../../data/types';
import FadeIn from '../FadeIn';
import { COMPARISON_DIAGRAMS } from './ComparisonDiagrams';

/**
 * Zwei (oder mehr) Varianten nebeneinander: Bild mit markierter Stelle (oder
 * schematische Zeichnung), Titel, dann dieselben Zeilen je Spalte (Aufbau,
 * Stärken, Grenzen, Einsatz).
 *
 * Ab md (bei drei und mehr Spalten ab lg) liegen die Zeilen per CSS-Subgrid
 * auf gleicher Höhe – so lässt sich Zeile für Zeile vergleichen, auch wenn ein
 * Text länger ist. Darunter stehen die Spalten einfach untereinander.
 */
export default function ProductComparison({ title, intro, columns }: Comparison) {
  // Bild + Titel + Zeilen; alle Spalten haben dieselben Zeilen-Labels
  const rowCount = 2 + Math.max(...columns.map((c) => c.rows.length));
  // Drei Spalten wären bei md nur gut 200 px breit – zu schmal für Text und
  // Zeichnung. Die Klassen stehen ausgeschrieben, damit Tailwind sie findet.
  const wide = columns.length > 2;
  const gridClass = wide
    ? 'grid gap-y-16 lg:gap-y-6 lg:gap-x-12 lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]'
    : 'grid gap-y-16 md:gap-y-6 md:gap-x-10 lg:gap-x-16 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]';
  const columnClass = wide
    ? 'flex flex-col gap-6 lg:grid lg:grid-rows-subgrid lg:[grid-row:span_var(--rows)]'
    : 'flex flex-col gap-6 md:grid md:grid-rows-subgrid md:[grid-row:span_var(--rows)]';

  return (
    // Abstand nach oben setzt Product.tsx – je nachdem, ob eine Galerie davor steht
    <section aria-labelledby="vergleich-titel">
      <FadeIn inView>
        <div className="max-w-3xl mx-auto mb-10 md:mb-14 text-center">
          <h2 id="vergleich-titel" className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            {title}
          </h2>
          {intro && <p className="mt-4 text-gray-600 leading-relaxed">{intro}</p>}
        </div>
      </FadeIn>

      <FadeIn inView>
        <div
          className={gridClass}
          style={{ '--cols': columns.length, '--rows': rowCount } as CSSProperties}
        >
          {columns.map((col) => {
            const Diagram = col.diagram ? COMPARISON_DIAGRAMS[col.diagram] : undefined;
            return (
            <div key={col.title} className={columnClass}>
              {Diagram ? (
                // Schematische Zeichnung auf dem Kachelverlauf der Modellfotos
                <div className="rounded-3xl ring-1 ring-black/5 bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#f2f5f8_55%,#e6ebf0_100%)] px-4 py-5 md:px-5 self-start w-full">
                  <Diagram />
                </div>
              ) : (
              /* Bild mit Markierung der Stelle, um die es geht */
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-sm self-start">
                <img src={col.image} alt={col.imageAlt ?? ''} loading="lazy" decoding="async" className="block w-full h-auto" />
                {col.highlight && (
                  <div
                    aria-hidden="true"
                    className="absolute rounded-2xl border-2 border-brand-500"
                    style={{
                      left: `${col.highlight.x}%`,
                      top: `${col.highlight.y}%`,
                      width: `${col.highlight.w}%`,
                      height: `${col.highlight.h}%`,
                    }}
                  >
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-brand-700 shadow-sm ring-1 ring-black/5">
                      {col.highlight.label}
                    </span>
                  </div>
                )}
              </div>
              )}

              <div>
                <h4 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900">{col.title}</h4>
                <p className="mt-1 text-sm text-gray-500">{col.tag}</p>
              </div>

              {col.rows.map((row) => (
                <div key={row.label} className="border-t border-gray-100 pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{row.label}</p>
                  {row.text && <p className="mt-1.5 text-gray-700 leading-relaxed">{row.text}</p>}
                  {row.items && (
                    <ul className="mt-1.5 space-y-1.5">
                      {row.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-gray-700 leading-relaxed">
                          <span aria-hidden="true" className="text-gray-300">–</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
