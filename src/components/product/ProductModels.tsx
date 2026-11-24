import type { ProductAccessory, ProductCertifications, ProductModel } from '../../data/types';
import CtaLink from '../CtaLink';
import FadeIn from '../FadeIn';

type ProductModelsProps = {
  title: string;
  intro?: string;
  models: ProductModel[];
  accessories?: ProductAccessory[];
  /** Kennzeile über jedem Zubehörteil, z. B. „Standard-Zubehör" (Lüfter) oder „Zubehör". */
  accessoriesLabel?: string;
  certifications?: ProductCertifications;
};

/**
 * Modellübersicht direkt unter der Scroll-Bühne: je Modell eine Zeile mit
 * Produktfoto links und Bauart, Kurzbeschreibung und Eckdaten rechts, getrennt
 * durch feine Linien – wie die Liste „Lüfter-Arten" der bisherigen Website,
 * im Look der übrigen Produktseite (Tabellenzeilen wie „Technische Daten").
 *
 * Die Fotos stehen auf reinem Weiß und werden per mix-blend-multiply auf den
 * Verlauf der Kachel gelegt; der Verlauf greift den Bühnenhintergrund auf.
 */
export default function ProductModels({
  title,
  intro,
  models,
  accessories = [],
  accessoriesLabel = 'Standard-Zubehör',
  certifications,
}: ProductModelsProps) {
  return (
    <section aria-labelledby="modelle-titel">
      <FadeIn inView>
        <div className="max-w-3xl mx-auto mb-10 md:mb-14 text-center">
          <h2 id="modelle-titel" className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            {title}
          </h2>
          {intro && <p className="mt-4 text-gray-600 leading-relaxed">{intro}</p>}
        </div>
      </FadeIn>

      <ul className="border-t border-gray-100">
        {models.map((model) => (
          <li key={model.name} className="border-b border-gray-100 py-10 md:py-12">
            <FadeIn inView>
              <div className="grid sm:grid-cols-[12rem_minmax(0,1fr)] md:grid-cols-[15rem_minmax(0,1fr)] lg:grid-cols-[17rem_minmax(0,1fr)] gap-6 sm:gap-10 lg:gap-14 items-center">
                <div className="aspect-square w-40 sm:w-full rounded-3xl overflow-hidden ring-1 ring-black/5 bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#f2f5f8_55%,#e6ebf0_100%)]">
                  {model.image ? (
                    <img
                      src={model.image}
                      alt={`${model.name} – ${model.kind}`}
                      width={640}
                      height={640}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-full object-contain p-5 md:p-6 mix-blend-multiply"
                    />
                  ) : (
                    // Noch kein Foto: schlichtes Kürzel statt eines Platzhalterbilds
                    <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
                      <span className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-400">
                        {model.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-brand-700 text-xs font-semibold uppercase tracking-widest">{model.kind}</p>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-gray-900">{model.name}</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed max-w-2xl">{model.summary}</p>

                  {model.specs.length > 0 ? (
                    <dl className="mt-5 max-w-2xl">
                      {model.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex flex-col sm:flex-row sm:justify-between sm:gap-8 py-2.5 border-b border-gray-100 last:border-0"
                        >
                          <dt className="text-sm text-gray-500">{spec.label}</dt>
                          <dd className="text-sm md:text-base font-medium text-gray-900 sm:text-right">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="mt-5 text-sm text-gray-500">Baugrößen und Kennwerte auf Anfrage.</p>
                  )}

                  <CtaLink to="/#contact" size="sm" className="mt-5">
                    Details anfragen
                  </CtaLink>
                </div>
              </div>
            </FadeIn>
          </li>
        ))}
      </ul>

      {accessories.length > 0 && (
        <FadeIn inView>
          <div className="mt-8 md:mt-10 space-y-4">
            {accessories.map((item) => (
              <div key={item.name} className="flex items-center gap-5">
                {/* Nur in kleiner Auflösung vorhanden – deshalb bewusst klein gezeigt.
                    Breiter als hoch, weil Kabel und Stecker als lange Zeichnungen
                    vorliegen; auf dem Handy schmaler, damit der Text Platz behält. */}
                <img
                  src={item.image}
                  alt={item.name}
                  width={128}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-20 sm:h-16 sm:w-32 shrink-0 object-contain"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{accessoriesLabel}</p>
                  <p className="mt-1 text-gray-900 font-medium">
                    {item.name}
                    <span className="font-normal text-gray-500"> · {item.detail}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {/* Zertifizierungen als Abschluss der Liste – ab md als eine Leiste,
          darunter in zwei Zeilen, damit die Zeichen lesbar bleiben. */}
      {certifications && (
        <FadeIn inView>
          <figure className="mt-12 md:mt-16 border-t border-gray-100 pt-10 md:pt-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{certifications.title}</p>
            <img
              src={certifications.image}
              alt={certifications.alt}
              width={1401}
              height={85}
              loading="lazy"
              decoding="async"
              className="hidden md:block mt-6 w-full h-auto"
            />
            <div className="md:hidden mt-5 space-y-2">
              {certifications.mobileImages.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={i === 0 ? certifications.alt : ''}
                  width={738}
                  height={85}
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-auto"
                />
              ))}
            </div>
            <figcaption className="mt-5 text-sm text-gray-500 leading-relaxed max-w-2xl">
              {certifications.caption}
            </figcaption>
          </figure>
        </FadeIn>
      )}
    </section>
  );
}
