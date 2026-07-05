import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { products } from '../data/products';
import ProductViewer3D from '../components/ProductViewer3D';
import logo from '../logo.png';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Produkt nicht gefunden</h1>
        <button onClick={() => navigate('/')} className="text-[#00dfd8] hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-[#0070f3] selection:text-white overflow-hidden relative">
      {/* Light Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />
      
      {/* Neon Blue Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0070f3]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Victronic GmbH Logo" className="h-8 md:h-10 w-auto object-contain" />
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-[#0070f3] flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Zurück zur Übersicht
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <FadeIn>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0070f3] text-xs font-semibold uppercase tracking-wider mb-6">
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
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-[#0070f3]" />
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
                <div className="bg-gradient-to-br from-blue-50 to-transparent border border-blue-100 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-[#0070f3] mb-4">Synergie & Normen</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.synergy}
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-500">
                      <CheckCircle2 className="w-5 h-5 text-[#0070f3] shrink-0" />
                      <span>Nahtlose Integration in bestehende Victronic-Baugruppen</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-500">
                      <CheckCircle2 className="w-5 h-5 text-[#0070f3] shrink-0" />
                      <span>Erfüllt höchste industrielle Qualitätsstandards</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              {/* CTA */}
              <FadeIn delay={0.5}>
                <div className="bg-gray-950 text-white rounded-2xl p-8 text-center shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Projekt besprechen</h3>
                  <p className="text-gray-400 mb-8">
                    Lassen Sie uns gemeinsam die optimale Lösung für Ihre spezifischen Anforderungen im Bereich {product.name} finden.
                  </p>
                  <Link to="/#contact" className="inline-flex items-center justify-center gap-2 bg-[#0070f3] text-white px-8 py-4 rounded-md font-medium hover:bg-[#005bc4] transition-colors w-full group">
                    Technische Beratung anfordern
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
