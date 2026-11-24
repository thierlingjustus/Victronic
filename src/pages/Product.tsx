import React from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import NotFound from '../components/NotFound';
import FadeIn from '../components/FadeIn';
import ProductShowcase from '../components/ProductShowcase';
import ProductStage from '../components/product/ProductStage';
import ProductModels from '../components/product/ProductModels';
import ProductComparison from '../components/product/ProductComparison';
import AirflowComparison from '../components/product/AirflowComparison';
import Seo from '../components/Seo';
import { productSeo } from '../data/seo';
import CtaLink from '../components/CtaLink';

function TechSpecs({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <div className="border-t border-gray-100 pt-8 md:pt-10">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-6">
        Technische Daten
      </h2>
      <dl>
        {specs.map((spec, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:justify-between sm:gap-8 py-4 border-b border-gray-100 last:border-0"
          >
            <dt className="text-sm text-gray-500">{spec.label}</dt>
            <dd className="text-sm md:text-base font-medium text-gray-900 sm:text-right">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <NotFound title="Produkt nicht gefunden" backTo="/" backLabel="Zurück zur Startseite" />;
  }

  // Fällt auf das bestehende Platzhalter-SVG zurück, solange für eine Kategorie
  // noch keine Abbildungen vorliegen – außer sie hat stattdessen einen
  // Bild-Vergleich (Lüfter), dann bleibt die Galerie bewusst leer.
  const galleryImages = product.images.length > 0
    ? product.images
    : product.comparison || product.explainer
      ? []
      : [{ src: product.image, caption: product.strategicBenefit }];

  return (
    // Kein overflow-hidden auf dem Wrapper: das würde das position:sticky der
    // Scroll-Bühne aushebeln (siehe SystemDetail.tsx, dort ebenfalls offen).
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-brand-600 selection:text-white relative">
      <Seo {...productSeo(product)} />
      {/* Navigation */}
      <Navbar backTo="/" backLabel="Zurück zur Übersicht" />

      {/* Scroll-Bühne: Produkt in der Mitte, Fakten links und rechts */}
      <ProductStage product={product} />

      {/* overflow-x-clip: die seitlich einfahrenden Galerie-Elemente stehen vor
          dem Einblenden 40 px neben ihrer Endlage und machten die Seite sonst
          waagerecht scrollbar. clip statt hidden, damit kein Scroll-Container
          entsteht. */}
      <main className="pt-4 pb-24 px-6 relative z-10 overflow-x-clip">
        {/* Handy/Tablet: die Legende der Bühne (Technische Daten) steht hier,
            direkt unter der Animation. Ab lg steht sie rechts neben dem Produkt. */}
        {product.specsLegend && (
          <div className="lg:hidden max-w-3xl mx-auto mb-16">
            <TechSpecs specs={product.specs} />
          </div>
        )}

        {/* Modellübersicht – nur Kategorien mit `models` (Lüfter, Stromversorgungen) */}
        {product.models && product.models.length > 0 && (
          <div className="max-w-6xl mx-auto mb-20 md:mb-28">
            <ProductModels
              title={product.modelsTitle ?? 'Modelle'}
              models={product.models}
              accessories={product.accessories}
              accessoriesLabel={product.accessoriesLabel}
              certifications={product.certifications}
            />
          </div>
        )}

        {/* Alternierende Bild/Text-Galerie, Bild-Vergleich und Erklär-Grafik */}
        {(galleryImages.length > 0 || product.comparison || product.explainer) && (
          <div className="max-w-6xl mx-auto mb-20 md:mb-28">
            {galleryImages.length > 0 && (
              <>
                <FadeIn inView>
                  <div className="max-w-3xl mx-auto mb-14 md:mb-20 text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
                      Aufbau und Technologie
                    </h2>
                  </div>
                </FadeIn>
                <ProductShowcase images={galleryImages} productName={product.name} />
              </>
            )}
            {product.comparison && (
              <div className={galleryImages.length > 0 ? 'mt-20 md:mt-28' : ''}>
                <ProductComparison {...product.comparison} />
              </div>
            )}
            {/* Lüfter: Luftweg Axial vs. Radial, direkt unter dem Lager-Vergleich */}
            {product.explainer === 'airflow' && (
              <div className={galleryImages.length > 0 || product.comparison ? 'mt-20 md:mt-28' : ''}>
                <AirflowComparison />
              </div>
            )}
            {/* Transparenzhinweis zu den Abbildungen (Art. 50 KI-VO / UWG).
                Bewusst einmal pro Seite statt an jedem einzelnen Bild: gleiche
                rechtliche Wirkung, ohne die technische Darstellung zu entwerten. */}
            <FadeIn inView>
              <p className="mt-14 md:mt-20 text-xs text-gray-400 text-center max-w-3xl mx-auto leading-relaxed">
                Abbildungen: exemplarische Darstellungen technischer Lösungen und Fertigungsverfahren,
                teilweise KI-gestützt erstellt. Sie bilden keinen konkreten Liefergegenstand ab –
                die Ausführung erfolgt projektspezifisch nach Ihren Anforderungen.
              </p>
            </FadeIn>
          </div>
        )}

        {/* Spezifikationen, Synergie & CTA */}
        <div className="max-w-3xl mx-auto space-y-10 md:space-y-12">
          {/* Mit Legende stehen die Technischen Daten schon in der Bühne bzw.
              auf dem Handy direkt darunter – hier nicht noch einmal. */}
          {!product.specsLegend && (
            <FadeIn inView>
              <TechSpecs specs={product.specs} />
            </FadeIn>
          )}

          {/* Synergie (dezent aufklappbar) */}
          <FadeIn inView>
            <details className="group border-t border-gray-100 pt-8 md:pt-10">
              <summary className="flex items-center justify-between cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
                  Synergie und Integration
                </h2>
                <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-4 md:mt-6">
                <p className="text-gray-600 leading-relaxed">
                  {product.synergy}
                </p>
              </div>
            </details>
          </FadeIn>

          {/* CTA – bewusst ohne farbige Box: Trennlinie wie die Abschnitte darüber */}
          <FadeIn inView>
            <div className="border-t border-gray-100 pt-8 md:pt-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-3">Projekt besprechen</h2>
              <p className="text-gray-600 leading-relaxed mb-5 max-w-2xl">
                Lassen Sie uns gemeinsam die optimale Lösung für Ihre spezifischen Anforderungen im Bereich {product.name} finden.
              </p>
              <CtaLink to="/#contact">Technische Beratung anfordern</CtaLink>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
