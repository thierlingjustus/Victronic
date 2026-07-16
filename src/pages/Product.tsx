import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import NotFound from '../components/NotFound';
import FadeIn from '../components/FadeIn';
import Seo from '../components/Seo';

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <NotFound title="Produkt nicht gefunden" backTo="/" backLabel="Zurück zur Startseite" />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-brand-600 selection:text-white overflow-hidden relative">
      <Seo title={`${product.name} – Victronic GmbH`} description={product.strategicBenefit} />
      {/* Navigation */}
      <Navbar backTo="/" backLabel="Zurück zur Übersicht" />

      <main className="pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Linke Spalte: Produktfoto (Platzhalter-SVG) */}
            <FadeIn delay={0.2}>
              <div className="sticky top-32">
                <div className="bg-gray-100 rounded-3xl p-8 md:p-12 aspect-[4/3] flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Rechte Spalte: Inhalt */}
            <div className="space-y-10 md:space-y-12">
              {/* Abschnitt 1: Überblick */}
              <FadeIn delay={0.3}>
                <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-5">
                  <product.icon className="w-4 h-4" />
                  {product.name}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1] text-gray-900 mb-5">
                  {product.headline}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {product.strategicBenefit}
                </p>
              </FadeIn>

              {/* Abschnitt 2: Spezifikationen */}
              <FadeIn delay={0.4}>
                <div className="border-t border-gray-100 pt-8 md:pt-10">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-6">
                    Technik.<span className="text-gray-400"> Alles, was zählt.</span>
                  </h2>
                  <dl>
                    {product.specs.map((spec, i) => (
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
              </FadeIn>

              {/* Abschnitt 3: Synergie & Normen (dezent aufklappbar) */}
              <FadeIn delay={0.5}>
                <details className="group border-t border-gray-100 pt-8 md:pt-10">
                  <summary className="flex items-center justify-between cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
                      Synergie.<span className="text-gray-400"> Normen &amp; Integration.</span>
                    </h2>
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="mt-4 md:mt-6">
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {product.synergy}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm text-gray-500">
                        <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0" />
                        <span>Nahtlose Integration in bestehende Victronic-Baugruppen</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-500">
                        <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0" />
                        <span>Erfüllt höchste industrielle Qualitätsstandards</span>
                      </li>
                    </ul>
                  </div>
                </details>
              </FadeIn>

              {/* CTA */}
              <FadeIn delay={0.6}>
                <div className="bg-brand-50 rounded-3xl p-8 md:p-10 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Projekt besprechen</h3>
                  <p className="text-gray-600 mb-8">
                    Lassen Sie uns gemeinsam die optimale Lösung für Ihre spezifischen Anforderungen im Bereich {product.name} finden.
                  </p>
                  <Link to="/#contact" className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-md font-medium hover:bg-brand-700 transition-colors w-full group">
                    Technische Beratung anfordern
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
