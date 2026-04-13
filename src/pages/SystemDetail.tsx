import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ChevronDown, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { systems } from '../data/systems';

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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[#050505] to-transparent pb-6 pt-12 pointer-events-none hidden md:block">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/10 -z-10" />
          {PROJECT_STEPS.map((step, idx) => {
            const isActive = idx <= activeStep;
            const isCurrent = idx === activeStep;
            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-2 h-2 rounded-full border transition-all duration-500 ${
                    isActive 
                      ? 'bg-[#00dfd8] border-[#00dfd8] shadow-[0_0_10px_rgba(0,223,216,0.8)]' 
                      : 'bg-white/20 border-white/10 shadow-[0_0_10px_rgba(0,223,216,0)]'
                  } ${isCurrent ? 'scale-150' : 'scale-100'}`} 
                />
                <span className={`text-[10px] uppercase tracking-wider font-medium max-w-[80px] text-center leading-tight transition-colors duration-500 ${
                  isActive ? 'text-[#00dfd8]' : 'text-gray-500'
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
  const navigate = useNavigate();
  const system = systems.find(s => s.id === id);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Intro animations
  const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  const introPointerEvents = useTransform(scrollYProgress, (v) => v > 0.15 ? "none" : "auto");

  // Explosion animations
  const explosionProgress = useTransform(scrollYProgress, [0.15, 0.8], [0, 1]);
  const explosionOpacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 0.9], [0, 1, 1, 0]);
  
  // Diagonal movement for 9 parts
  const spreadX = 55;
  const spreadY = 55;

  const t0X = useTransform(explosionProgress, [0, 1], [0, -4 * spreadX]);
  const t0Y = useTransform(explosionProgress, [0, 1], [0, -4 * spreadY]);

  const t1X = useTransform(explosionProgress, [0, 1], [0, -3 * spreadX]);
  const t1Y = useTransform(explosionProgress, [0, 1], [0, -3 * spreadY]);

  const t2X = useTransform(explosionProgress, [0, 1], [0, -2 * spreadX]);
  const t2Y = useTransform(explosionProgress, [0, 1], [0, -2 * spreadY]);

  const t3X = useTransform(explosionProgress, [0, 1], [0, -1 * spreadX]);
  const t3Y = useTransform(explosionProgress, [0, 1], [0, -1 * spreadY]);

  const t4X = useTransform(explosionProgress, [0, 1], [0, 0]);
  const t4Y = useTransform(explosionProgress, [0, 1], [0, 0]);

  const t5X = useTransform(explosionProgress, [0, 1], [0, 1 * spreadX]);
  const t5Y = useTransform(explosionProgress, [0, 1], [0, 1 * spreadY]);

  const t6X = useTransform(explosionProgress, [0, 1], [0, 2 * spreadX]);
  const t6Y = useTransform(explosionProgress, [0, 1], [0, 2 * spreadY]);

  const t7X = useTransform(explosionProgress, [0, 1], [0, 3 * spreadX]);
  const t7Y = useTransform(explosionProgress, [0, 1], [0, 3 * spreadY]);

  const t8X = useTransform(explosionProgress, [0, 1], [0, 4 * spreadX]);
  const t8Y = useTransform(explosionProgress, [0, 1], [0, 4 * spreadY]);

  const transforms = [
    { x: t0X, y: t0Y },
    { x: t1X, y: t1Y },
    { x: t2X, y: t2Y },
    { x: t3X, y: t3Y },
    { x: t4X, y: t4Y },
    { x: t5X, y: t5Y },
    { x: t6X, y: t6Y },
    { x: t7X, y: t7Y },
    { x: t8X, y: t8Y },
  ];

  const layersData = [
    { 
      name: "Front-Polarisator", 
      desc: "High-Res Bildschirmoberfläche", 
      side: "right",
      content: <img src="https://picsum.photos/seed/seascape/1200/900" alt="Display" className="w-full h-full object-cover rounded-2xl" referrerPolicy="no-referrer" />,
      className: "bg-transparent border-white/20 z-[59] shadow-2xl"
    },
    { 
      name: "Glas", 
      desc: "Schützendes Trägersubstrat", 
      side: "left",
      content: <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl backdrop-blur-sm" />,
      className: "bg-white/5 border-white/30 z-[58]"
    },
    { 
      name: "Farbfilter", 
      desc: "Erzeugt die RGB-Subpixel", 
      side: "right",
      content: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjYiIGZpbGw9InJlZCIgb3BhY2l0eT0iMC4zIi8+PHJlY3QgeD0iMiIgd2lkdGg9IjIiIGhlaWdodD0iNiIgZmlsbD0iZ3JlZW4iIG9wYWNpdHk9IjAuMyIvPjxyZWN0IHg9IjQiIHdpZHRoPSIyIiBoZWlnaHQ9IjYiIGZpbGw9ImJsdWUiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')] rounded-2xl opacity-50" />,
      className: "bg-transparent border-white/10 z-[57]"
    },
    { 
      name: "Gegen-Elektrode", 
      desc: "Gemeinsamer elektrischer Pol", 
      side: "left",
      content: <div className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10" />,
      className: "bg-transparent border-white/10 z-[56]"
    },
    { 
      name: "Flüssigkristall", 
      desc: "Steuert die Lichtdurchlässigkeit", 
      side: "right",
      content: <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-blue-500/20 rounded-2xl backdrop-blur-md" />,
      className: "bg-transparent border-cyan-500/30 z-[55]"
    },
    { 
      name: "Transistor (TFT)", 
      desc: "Aktive Matrix zur Pixelsteuerung", 
      side: "left",
      content: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xMCAxMGgxMHYxMEgxMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] rounded-2xl" />,
      className: "bg-black/60 border-gray-600 z-[54]"
    },
    { 
      name: "Pixel-Elektrode", 
      desc: "Individuelle Pixel-Ansteuerung", 
      side: "right",
      content: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] rounded-2xl" />,
      className: "bg-transparent border-white/10 z-[53]"
    },
    { 
      name: "Rear-Polarisator", 
      desc: "Polarisiert das Hintergrundlicht", 
      side: "left",
      content: <div className="absolute inset-0 bg-black/80 rounded-2xl" />,
      className: "bg-transparent border-black/50 z-[52]"
    },
    { 
      name: "Beleuchtung", 
      desc: "LED-Hintergrundbeleuchtung", 
      side: "right",
      content: <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.9)]" />,
      className: "bg-white border-white z-[51]"
    },
  ];

  // Tooltips
  const tooltipsOpacity = useTransform(explosionProgress, [0.3, 0.6], [0, 1]);

  // Outro animations
  const outroOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const outroY = useTransform(scrollYProgress, [0.85, 0.95], [50, 0]);
  const outroPointerEvents = useTransform(scrollYProgress, (v) => v > 0.85 ? "auto" : "none");

  if (!system) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">System nicht gefunden</h1>
        <button onClick={() => navigate('/systems')} className="text-[#00dfd8] hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Zurück zur Übersicht
        </button>
      </div>
    );
  }

  const layerStyle = "absolute w-64 md:w-96 aspect-[4/3] rounded-2xl border flex items-center justify-center transition-shadow duration-300";

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-[#00dfd8] selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:text-[#00dfd8] transition-colors">
            <div className="w-6 h-6 bg-[#00dfd8] rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full" />
            </div>
            Victronic
          </Link>
          <Link to="/systems" className="text-sm font-medium text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Zurück zum Hub
          </Link>
        </div>
      </nav>

      <ProcessIndicator scrollYProgress={scrollYProgress} />

      {/* Scrollytelling Container */}
      <div ref={containerRef} className="relative h-[400vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,223,216,0.03)_0%,transparent_70%)] pointer-events-none" />

          {/* Intro Section */}
          <motion.div 
            style={{ opacity: introOpacity, y: introY, pointerEvents: introPointerEvents as any }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00dfd8] text-xs font-semibold uppercase tracking-wider mb-6">
              VICTRONIC-Lösung
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              {system.name}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              {system.description}
            </p>
            <div className="animate-bounce text-gray-500 flex flex-col items-center gap-2">
              <span className="text-sm uppercase tracking-widest">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Explosion Graphic */}
          <motion.div 
            style={{ opacity: explosionOpacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[2000px]"
          >
            <div className="relative w-full max-w-4xl flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              
              {/* Tooltips */}
              {layersData.map((layer, i) => (
                <motion.div 
                  key={`tooltip-${i}`}
                  style={{ x: transforms[i].x, y: transforms[i].y, opacity: tooltipsOpacity }} 
                  className={`absolute z-[60] w-40 md:w-56 ${layer.side === 'left' ? 'mr-[18rem] md:mr-[32rem] text-right right-1/2' : 'ml-[18rem] md:ml-[32rem] left-1/2'}`}
                >
                  <div className="hidden md:block h-[1px] w-8 bg-[#00dfd8] absolute top-4 opacity-50" style={{ [layer.side === 'left' ? 'right' : 'left']: '-2rem' }} />
                  <div className="bg-[#050505]/90 backdrop-blur-xl p-3 rounded-xl border border-white/10 shadow-2xl">
                    <h3 className="text-[#00dfd8] font-bold text-[10px] md:text-xs uppercase tracking-wider">{layer.name}</h3>
                    <p className="text-gray-400 text-[9px] md:text-[10px] mt-1 leading-tight">{layer.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* Layers */}
              {layersData.map((layer, i) => (
                <motion.div 
                  key={`layer-${i}`}
                  style={{ x: transforms[i].x, y: transforms[i].y, rotateX: 60, rotateZ: -45 }} 
                  className={`${layerStyle} ${layer.className}`}
                >
                  {layer.content}
                </motion.div>
              ))}

            </div>
          </motion.div>

          {/* Kundenspezifische Qualifizierung Block (Bottom Right) */}
          <motion.div 
            style={{ opacity: tooltipsOpacity }}
            className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-[70] max-w-xs md:max-w-sm pointer-events-none"
          >
            <div className="bg-[#050505]/95 backdrop-blur-2xl p-6 rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
              <div className="w-8 h-8 rounded-full bg-[#00dfd8]/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-4 h-4 text-[#00dfd8]" />
              </div>
              <h3 className="text-white font-bold text-sm md:text-base mb-2 uppercase tracking-wide">Kundenspezifische Qualifizierung</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                Jedes Display-System durchläuft strenge, kundenspezifische Testverfahren. Von optischer Performance bis hin zu extremen Umweltbedingungen garantieren wir höchste Zuverlässigkeit für industrielle Anwendungen.
              </p>
            </div>
          </motion.div>

          {/* Outro Section */}
          <motion.div 
            style={{ opacity: outroOpacity, y: outroY, pointerEvents: outroPointerEvents as any }}
            className="absolute inset-0 flex items-center justify-center px-6 z-30 bg-[#050505]/80 backdrop-blur-sm"
          >
            <div className="max-w-4xl w-full bg-gradient-to-br from-[#00dfd8]/10 to-transparent border border-[#00dfd8]/30 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00dfd8]/10 blur-[100px] rounded-full" />
              
              <ShieldCheck className="w-16 h-16 text-[#00dfd8] mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Der Victronic <span className="text-[#00dfd8]">No-Extra-Cost</span> Vorteil
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Keine versteckten Kosten. Keine bösen Überraschungen. Wir garantieren Ihnen einen fixen Projektablauf ohne Mehrkosten für Korrekturschritte über die initialen Toolingkosten hinaus.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
                <div className="bg-black/50 p-6 rounded-xl border border-white/5">
                  <div className="text-[#00dfd8] font-bold mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 01. Fixe Toolingkosten</div>
                  <div className="text-sm text-gray-400">Einmalige Investition, keine Nachforderungen bei Iterationen.</div>
                </div>
                <div className="bg-black/50 p-6 rounded-xl border border-white/5">
                  <div className="text-[#00dfd8] font-bold mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 02. Voller Datenbesitz</div>
                  <div className="text-sm text-gray-400">Alle Werkzeuge und Konstruktionsdaten gehen in Ihr Eigentum über.</div>
                </div>
                <div className="bg-black/50 p-6 rounded-xl border border-white/5">
                  <div className="text-[#00dfd8] font-bold mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 03. Risikofreie Serie</div>
                  <div className="text-sm text-gray-400">Garantierte Qualität und Liefertreue für die gesamte Serienlaufzeit.</div>
                </div>
              </div>

              <Link to="/#contact" className="inline-flex items-center justify-center gap-2 bg-[#00dfd8] text-black px-8 py-4 rounded-md font-bold hover:bg-white transition-colors">
                Projekt jetzt besprechen
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
