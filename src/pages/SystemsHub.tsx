import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { systems } from '../data/systems';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import FadeIn from '../components/FadeIn';
import IconTile from '../components/IconTile';
import CardPhoto from '../components/CardPhoto';
import Seo from '../components/Seo';
import { pageSeo } from '../data/seo';

export default function SystemsHub() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-brand-600 selection:text-white overflow-hidden relative">
      <Seo {...pageSeo.systems} />
      {/* Navigation */}
      <Navbar backTo="/" />

      <main className="pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <FadeIn>
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-6">
                System-Hub
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-gray-900 mb-6">
                Komplexe Lösungen, <br className="hidden md:block" />
                einfach integriert.
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Entdecken Sie unsere 4 Hauptsysteme. Klicken Sie auf ein Modul, um den inneren Aufbau Schicht für Schicht zu erleben.
              </p>
            </div>
          </FadeIn>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {systems.map((system, i) => (
              <FadeIn key={system.id} delay={i * 0.1}>
                <Link 
                  to={`/systems/${system.id}`} 
                  className="group block bg-white border border-gray-200 rounded-xl p-8 md:p-12 hover:border-brand-300 hover:shadow-md transition-all relative overflow-hidden h-full shadow-sm"
                >
                  {/* Beim Hover füllt das Produktfoto die Karte. Das Produkt
                      steht oben rechts über bzw. neben dem Titel – nie hinter
                      Text: Schmale Karten haben dafür nur den Streifen über
                      dem Titel, breite (xl) auch den Platz rechts daneben. */}
                  <CardPhoto
                    src={system.cardImage}
                    className="right-8 top-6 h-24 w-1/2 object-right-top md:right-12 md:top-10 md:h-[6.25rem] xl:top-12 xl:h-1/2 xl:w-[32%]"
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-8">
                      <IconTile icon={system.icon} size="lg" fadeOnHover />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">{system.name}</h2>
                    {/* Auf dem Studio-Ton eine Stufe dunkler, sonst zu wenig Kontrast. */}
                    <h3 className="text-lg text-gray-500 mb-6 transition-colors group-hover:text-gray-600">{system.subtitle}</h3>

                    <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                      {system.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-700 mt-auto transition-colors group-hover:text-brand-800">
                      Technik im Detail ansehen
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* Die Hover-Fotos in den Kacheln sind dieselben Abbildungen wie auf
              den Produktseiten – deshalb auch hier der Transparenzhinweis
              (Art. 50 KI-VO, siehe Product.tsx und InhaltRecht.tsx). */}
          <p className="mt-8 text-xs text-gray-400">
            Abbildungen: exemplarische Darstellungen, teilweise KI-gestützt erstellt.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
