import type { ProductProcess as ProductProcessData } from '../../data/types';
import FadeIn from '../FadeIn';

/**
 * Projektablauf als schlichter Zeitstrahl (Montage & Gehäuse: „Fixer
 * Projektablauf für kundenspezifische Entwicklungen" der alten Seite /housing/).
 * Arbeitsschritte als nummerierte Kreise, Freigaben als Raute mit Haken – so
 * ist auf einen Blick zu sehen, dass auf jeden Entwicklungsschritt eine
 * Freigabe folgt. Ab lg waagerecht, darunter senkrecht mit Linie links.
 * Darunter die Zusagen (`promises`) in schlichten Spalten.
 */
export default function ProductProcess({ title, intro, steps, promises = [] }: ProductProcessData) {
  let count = 0;
  const items = steps.map((step) => ({ ...step, no: step.approval ? 0 : ++count }));

  return (
    // Abstand nach oben setzt Product.tsx – je nachdem, was davor steht
    <section aria-labelledby="ablauf-titel">
      <FadeIn inView>
        <div className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
          <h2 id="ablauf-titel" className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            {title}
          </h2>
          {intro && <p className="mt-4 text-gray-600 leading-relaxed">{intro}</p>}
        </div>
      </FadeIn>

      <FadeIn inView>
        <ol className="lg:grid lg:grid-cols-7">
          {items.map((step, i) => {
            const last = i === items.length - 1;
            return (
              <li key={step.title} className={`relative flex items-center gap-4 lg:flex-col lg:gap-0 ${last ? '' : 'pb-6 lg:pb-0'}`}>
                {/* Verbindung zum nächsten Schritt: senkrecht (Handy) bzw. waagerecht (Desktop) */}
                {!last && (
                  <>
                    <span aria-hidden="true" className="lg:hidden absolute left-5 top-10 bottom-0 w-px bg-gray-200" />
                    <span aria-hidden="true" className="hidden lg:block absolute top-5 left-1/2 w-full h-px bg-gray-200" />
                  </>
                )}
                <Marker no={step.no} />
                <p
                  className={`lg:mt-4 lg:px-2 lg:text-center text-sm md:text-[15px] leading-snug ${
                    step.approval ? 'font-semibold text-brand-700' : 'font-medium text-gray-900'
                  }`}
                >
                  {step.title}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Zeichenerklärung */}
        <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500 lg:justify-center">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="w-3 h-3 rounded-full border-2 border-brand-600 bg-white" />
            Arbeitsschritt
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="w-2.5 h-2.5 rotate-45 rounded-[2px] bg-brand-600" />
            Freigabe – erst danach geht es weiter
          </span>
        </div>
      </FadeIn>

      {promises.length > 0 && (
        <FadeIn inView>
          <ul className="mt-14 md:mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 border-t border-gray-200 pt-10 md:pt-12">
            {promises.map((promise) => (
              <li key={promise.title}>
                <p className="font-semibold text-gray-900">{promise.title}</p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{promise.text}</p>
              </li>
            ))}
          </ul>
        </FadeIn>
      )}
    </section>
  );
}

/** Kreis mit Nummer für Arbeitsschritte, Raute mit Haken für Freigaben (no = 0). */
function Marker({ no }: { no: number }) {
  return (
    <span className="relative z-10 flex w-10 h-10 shrink-0 items-center justify-center bg-white">
      {no > 0 ? (
        <span className="flex w-10 h-10 items-center justify-center rounded-full border-2 border-brand-600 text-sm font-semibold text-brand-700">
          {no}
        </span>
      ) : (
        <svg viewBox="0 0 40 40" className="w-10 h-10" aria-label="Freigabe">
          <rect x="8" y="8" width="24" height="24" rx="3" transform="rotate(45 20 20)" fill="#0284c7" className="fill-brand-600" />
          <path d="M14.5 20.5 l4 4 l7-8" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}
