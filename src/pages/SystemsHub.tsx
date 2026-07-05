import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { systems } from '../data/systems';
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

export default function SystemsHub() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <FadeIn>
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0070f3] text-xs font-semibold uppercase tracking-wider mb-6">
                System-Hub
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] text-gray-900 mb-6">
                Komplexe Lösungen, <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070f3] to-blue-600">
                  einfach integriert.
                </span>
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
                  className="group block bg-white border border-gray-200 rounded-3xl p-8 md:p-12 hover:border-[#0070f3]/50 hover:shadow-md transition-all duration-500 relative overflow-hidden h-full shadow-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0070f3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-[#0070f3]/50 transition-all duration-500">
                      <system.icon className="w-8 h-8 text-gray-400 group-hover:text-[#0070f3] transition-colors" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-[#0070f3] transition-colors">{system.name}</h2>
                    <h3 className="text-lg text-gray-500 mb-6">{system.subtitle}</h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                      {system.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#0070f3] mt-auto">
                      Inside-the-Tech ansehen
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
