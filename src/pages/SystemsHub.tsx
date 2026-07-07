import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { systems } from '../data/systems';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import FadeIn from '../components/FadeIn';

export default function SystemsHub() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-brand-600 selection:text-white overflow-hidden relative">
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
                <span className="text-brand-700">einfach integriert.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Entdecken Sie unsere 4 Hauptsysteme. Klicken Sie auf ein Modul, um die innere Technik in einer interaktiven 3D-Explosion zu erleben.
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
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center mb-8 group-hover:border-brand-300 transition-colors">
                      <system.icon className="w-8 h-8 text-gray-400 group-hover:text-brand-700 transition-colors" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">{system.name}</h2>
                    <h3 className="text-lg text-gray-500 mb-6">{system.subtitle}</h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                      {system.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-700 mt-auto">
                      Technik im Detail ansehen
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
