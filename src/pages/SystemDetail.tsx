import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { systems } from '../data/systems';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import NotFound from '../components/NotFound';
import Seo from '../components/Seo';
import TftExplosion from '../components/systemVisuals/TftExplosion';
import LcmAssembly from '../components/systemVisuals/LcmAssembly';
import GlassBondingStack from '../components/systemVisuals/GlassBondingStack';

// three/react-three-fiber nur laden, wenn die Housing-Route besucht wird
const HousingAssembly3D = lazy(() => import('../components/systemVisuals/HousingAssembly3D'));

const PROJECT_STEPS = [
  "Anfrage & Beratung",
  "Konzept & Design",
  "Prototyping",
  "Testing & Freigabe",
  "Tooling & Nullserie",
  "Serienproduktion",
  "Logistik & After-Sales"
];

const ProcessIndicator = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest: number) => {
      const step = Math.min(6, Math.max(0, Math.floor(latest * 7)));
      if (step !== activeStep) {
        setActiveStep(step);
      }
    });
  }, [scrollYProgress, activeStep]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-white to-transparent pb-6 pt-12 pointer-events-none hidden md:block">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gray-200 -z-10" />
          {PROJECT_STEPS.map((step, idx) => {
            const isActive = idx <= activeStep;
            const isCurrent = idx === activeStep;
            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-2 h-2 rounded-full border transition-all duration-500 ${
                    isActive 
                      ? 'bg-brand-600 border-brand-600'
                      : 'bg-gray-200 border-gray-300'
                  } ${isCurrent ? 'scale-150' : 'scale-100'}`} 
                />
                <span className={`text-[10px] uppercase tracking-wider font-semibold max-w-[80px] text-center leading-tight transition-colors duration-500 ${
                  isActive ? 'text-brand-700' : 'text-gray-400'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function SystemDetail() {
  const { id } = useParams();
  const system = systems.find(s => s.id === id);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Intro animations
  const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  const introPointerEvents = useTransform(scrollYProgress, (v) => v > 0.15 ? "none" : "auto");

  // Fortschritt des mittleren Visual-Fensters – identische Keyframes wie die
  // frühere tooltipsOpacity, damit der Qualifizierungs-Block auf allen
  // Detailseiten (insbesondere tft-touch) pixelgleich getaktet bleibt.
  const visualProgress = useTransform(scrollYProgress, [0.15, 0.8], [0, 1]);
  const qualificationOpacity = useTransform(visualProgress, [0.3, 0.6], [0, 1]);

  // Outro animations
  const outroOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const outroY = useTransform(scrollYProgress, [0.85, 0.95], [50, 0]);
  const outroPointerEvents = useTransform(scrollYProgress, (v) => v > 0.85 ? "auto" : "none");

  if (!system) {
    return <NotFound title="System nicht gefunden" backTo="/systems" backLabel="Zurück zur Übersicht" />;
  }

  return (
    <div className="bg-white text-gray-800 font-sans selection:bg-brand-600 selection:text-white">
      <Seo title={`${system.name} – Victronic GmbH`} description={system.description} />
      {/* Navigation */}
      <Navbar backTo="/systems" backLabel="Zurück zum Hub" />

      <ProcessIndicator scrollYProgress={scrollYProgress} />

      {/* Scrollytelling Container */}
      <div ref={containerRef} className="relative h-[400vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Intro Section */}
          <motion.div 
            style={{ opacity: introOpacity, y: introY, pointerEvents: introPointerEvents as any }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30"
          >
            <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-6">
              VICTRONIC-Lösung
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-4">
              {system.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              {system.description}
            </p>
            <div className="animate-bounce text-gray-400 flex flex-col items-center gap-2">
              <span className="text-sm uppercase tracking-widest">Weiter scrollen</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </motion.div>

          {/* System-spezifische Visualisierung (mittlerer Hauptteil) */}
          {system.id === 'tft-touch' && <TftExplosion scrollYProgress={scrollYProgress} />}
          {system.id === 'lcm-touch' && <LcmAssembly scrollYProgress={scrollYProgress} infoSlots={system.infoSlots} />}
          {system.id === 'glass-touch' && <GlassBondingStack scrollYProgress={scrollYProgress} infoSlots={system.infoSlots} />}
          {system.id === 'housing-assembling' && (
            <Suspense fallback={null}>
              <HousingAssembly3D scrollYProgress={scrollYProgress} infoSlots={system.infoSlots} />
            </Suspense>
          )}

          {/* Kundenspezifische Qualifizierung Block (Bottom Right) */}
          <motion.div
            style={{ opacity: qualificationOpacity }}
            className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-[70] max-w-xs md:max-w-sm pointer-events-none"
          >
            <div className="bg-white/95 backdrop-blur-2xl p-6 rounded-2xl border border-gray-200 shadow-2xl">
              <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                <ShieldCheck className="w-4 h-4 text-brand-700" />
              </div>
              <h3 className="text-gray-900 font-bold text-sm md:text-base mb-2 uppercase tracking-wide">Kundenspezifische Qualifizierung</h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                Jedes Display-System durchläuft strenge, kundenspezifische Testverfahren. Von optischer Performance bis hin zu extremen Umweltbedingungen garantieren wir höchste Zuverlässigkeit für industrielle Anwendungen.
              </p>
            </div>
          </motion.div>

          {/* Outro Section */}
          <motion.div 
            style={{ opacity: outroOpacity, y: outroY, pointerEvents: outroPointerEvents as any }}
            className="absolute inset-0 flex items-center justify-center px-6 z-30 bg-white/80 backdrop-blur-sm"
          >
            <div className="max-w-4xl w-full bg-brand-50/50 border border-brand-100 rounded-xl p-8 md:p-16 text-center relative overflow-hidden shadow-xl text-gray-800">
              <ShieldCheck className="w-16 h-16 text-brand-700 mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Der Victronic <span className="text-brand-700">No-Extra-Cost</span> Vorteil
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Keine versteckten Kosten. Keine bösen Überraschungen. Wir garantieren Ihnen einen fixen Projektablauf ohne Mehrkosten für Korrekturschritte über die initialen Toolingkosten hinaus.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-brand-700 font-bold mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 01. Fixe Toolingkosten</div>
                  <div className="text-sm text-gray-600">Einmalige Investition, keine Nachforderungen bei Iterationen.</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-brand-700 font-bold mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 02. Voller Datenbesitz</div>
                  <div className="text-sm text-gray-600">Alle Werkzeuge und Konstruktionsdaten gehen in Ihr Eigentum über.</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-brand-700 font-bold mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 03. Risikofreie Serie</div>
                  <div className="text-sm text-gray-600">Garantierte Qualität und Liefertreue für die gesamte Serienlaufzeit.</div>
                </div>
              </div>

              <Link to="/#contact" className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-md font-bold hover:bg-brand-700 transition-colors shadow-md">
                Projekt jetzt besprechen
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
