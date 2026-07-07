import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { products } from '../data/products';
import ProductViewer3D from '../components/ProductViewer3D';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import NotFound from '../components/NotFound';
import FadeIn from '../components/FadeIn';

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <NotFound title="Produkt nicht gefunden" backTo="/" backLabel="Zurück zur Startseite" />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-brand-600 selection:text-white overflow-hidden relative">
      {/* Navigation */}
      <Navbar backTo="/" backLabel="Zurück zur Übersicht" />

      <main className="pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <FadeIn>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-6">
                <product.icon className="w-4 h-4" />
                {product.name}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] text-gray-900 mb-6">
                {product.headline}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
                {product.strategicBenefit}
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: 3D Viewer */}
            <FadeIn delay={0.2}>
              <div className="sticky top-32">
                <ProductViewer3D modelType={product.modelType} />
              </div>
            </FadeIn>

            {/* Right Column: Content */}
            <div className="space-y-12">
              {/* Specs */}
              <FadeIn delay={0.3}>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-brand-700" />
                    Technische Spezifikationen
                  </h2>
                  <div className="space-y-6">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <div className="text-sm text-gray-500 mb-1">{spec.label}</div>
                        <div className="text-lg font-semibold text-gray-800">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Synergy & Norms */}
              <FadeIn delay={0.4}>
                <div className="bg-brand-50/50 border border-brand-100 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Synergie & Normen</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.synergy}
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-500">
                      <CheckCircle2 className="w-5 h-5 text-brand-700 shrink-0" />
                      <span>Nahtlose Integration in bestehende Victronic-Baugruppen</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-500">
                      <CheckCircle2 className="w-5 h-5 text-brand-700 shrink-0" />
                      <span>Erfüllt höchste industrielle Qualitätsstandards</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              {/* CTA */}
              <FadeIn delay={0.5}>
                <div className="bg-gray-950 text-white rounded-xl p-8 text-center shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Projekt besprechen</h3>
                  <p className="text-gray-400 mb-8">
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
