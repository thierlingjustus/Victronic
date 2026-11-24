import type { ProductMaterialOverview } from '../../data/types';
import FadeIn from '../FadeIn';

/**
 * Werkstoff-Übersicht als schlichte Tabelle (Kunststoffkomponenten: „Welcher
 * Kunststoff wofür?"). Ab lg vier Spalten mit Kopfzeile; darunter steht je
 * Werkstoff ein Block, und jede Angabe trägt ihr eigenes kleines Label.
 * Bewusst ohne Grafiken – Kunststoffsorten unterscheiden sich in Kennwerten,
 * nicht im Aufbau, ein Bild würde nichts erklären.
 */
const COLS = 'lg:grid lg:grid-cols-[12rem_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-10';
const LABEL = 'text-[11px] font-bold uppercase tracking-wider text-gray-500';

export default function ProductMaterials({ title, intro, note, items }: ProductMaterialOverview) {
  return (
    // Abstand nach oben setzt Product.tsx – je nachdem, was davor steht
    <section aria-labelledby="werkstoffe-titel">
      <FadeIn inView>
        <div className="max-w-3xl mx-auto mb-10 md:mb-14 text-center">
          <h2 id="werkstoffe-titel" className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            {title}
          </h2>
          {intro && <p className="mt-4 text-gray-600 leading-relaxed">{intro}</p>}
        </div>
      </FadeIn>

      <FadeIn inView>
        <div role="table" aria-labelledby="werkstoffe-titel" className="border-t border-gray-200 lg:border-t-0">
          <div role="row" className={`hidden ${COLS} border-b border-gray-200 pb-3`}>
            {['Werkstoff', 'Eigenschaften', 'Typischer Einsatz', 'Zu beachten'].map((head) => (
              <p key={head} role="columnheader" className={LABEL}>
                {head}
              </p>
            ))}
          </div>

          {items.map((item) => (
            <div key={item.code} role="row" className={`${COLS} border-b border-gray-100 py-6 md:py-7`}>
              <div role="rowheader">
                <p className="text-lg font-semibold tracking-tight text-gray-900">
                  {item.code}
                  {item.standard && (
                    <span className="ml-2 align-middle rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
                      Standard
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-sm text-gray-500">{item.name}</p>
              </div>
              <Cell label="Eigenschaften" text={item.properties} />
              <Cell label="Typischer Einsatz" text={item.uses} />
              {item.caveats ? (
                <Cell label="Zu beachten" text={item.caveats} />
              ) : (
                <div role="cell" className="hidden lg:block text-gray-300">
                  –
                </div>
              )}
            </div>
          ))}
        </div>
      </FadeIn>

      {note && (
        <FadeIn inView>
          <p className="mt-6 text-sm text-gray-500 leading-relaxed max-w-3xl">{note}</p>
        </FadeIn>
      )}
    </section>
  );
}

function Cell({ label, text }: { label: string; text: string }) {
  return (
    <div role="cell" className="mt-4 lg:mt-0">
      <p className={`${LABEL} lg:hidden`}>{label}</p>
      <p className="mt-1 lg:mt-0 text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}
