import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useScroll, type MotionValue } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { systems } from '../data/systems';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import NotFound from '../components/NotFound';
import Seo from '../components/Seo';
import { systemSeo } from '../data/seo';
import CtaLink from '../components/CtaLink';
import FadeIn from '../components/FadeIn';
import { useMediaQuery } from '../components/useMediaQuery';
import { useScrollStyle } from '../components/product/useScrollStyle';
import { INTRO_FADE_OUT, QUALIFICATION } from '../components/systemVisuals/shared';
import TftExplosion from '../components/systemVisuals/TftExplosion';
import LcmAssembly from '../components/systemVisuals/LcmAssembly';
import GlassBondingStack from '../components/systemVisuals/GlassBondingStack';
import HousingAssembly from '../components/systemVisuals/HousingAssembly';

// Wortlaut aus [ALT /produkte/] und [ALT /housing/] – dieselben sieben
// Schritte wie im Prozess-Abschnitt der Startseite.
const PROJECT_STEPS = [
  "Produktplanung und -entwicklung",
  "Zeichnungsfreigabe",
  "Werkzeugbau",
  "Werkzeugfreigabe",
  "Prototypen-Herstellung",
  "Freigabe der Prototypen",
  "Serienproduktion"
];

/**
 * Unterhalb dieser Breite wechselt die Bühne in die kompakte Darstellung: eine
 * Textkarte am unteren Rand statt schwebender Karten neben der Grafik. Die
 * TFT-Explosion braucht mit ihren zehn Beschriftungen mehr Breite als die
 * anderen – schon bei 1024 px ragten die äußeren Karten aus dem Bild.
 */
const COMPACT_QUERY: Record<string, string> = {
  'tft-touch': '(max-width: 1279px)',
};
const DEFAULT_COMPACT_QUERY = '(max-width: 1023px)';

/** Die drei Zusagen des Schluss-Abschnitts. */
const NO_EXTRA_COST = [
  {
    title: 'Fixe Toolingkosten',
    desc: 'Einmalige Investition, keine Nachforderungen bei Iterationen.',
  },
  {
    title: 'Werkzeuge und Daten',
    desc: 'Sämtliche Daten und Werkzeuge werden Ihnen nach Projektabschluss zur Verfügung gestellt.',
  },
  {
    title: 'Risikofreie Serie',
    desc: 'Garantierte Qualität und Liefertreue für die gesamte Serienlaufzeit.',
  },
];

/**
 * Prozessleiste am unteren Rand der Bühne. Sitzt bewusst IN der Sticky-Bühne
 * und nicht `fixed` am Fenster: als fixed-Element blieb sie über die ganze
 * Seite stehen und legte sich am Ende als weißer Schleier über den Footer.
 */
const ProcessIndicator = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const pick = (latest: number) => {
      const step = Math.min(6, Math.max(0, Math.floor(latest * 7)));
      setActiveStep((prev) => (prev === step ? prev : step));
    };
    pick(scrollYProgress.get());
    return scrollYProgress.on("change", pick);
  }, [scrollYProgress]);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-white to-transparent pb-6 pt-12 pointer-events-none hidden lg:block">
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
  const compact = useMediaQuery(COMPACT_QUERY[id ?? ''] ?? DEFAULT_COMPACT_QUERY);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Alle scrollgebundenen Styles laufen über useScrollStyle statt motion.div:
  // motion hängt Werte, die direkt von scrollYProgress abgeleitet sind, an eine
  // native ScrollTimeline der ganzen Seite statt an die Bühne. Das Intro blieb
  // dadurch als Geisterbild stehen und das Schluss-Panel erschien nie
  // (ausführlich in useScrollStyle.ts).
  const introRef = useScrollStyle<HTMLDivElement>(scrollYProgress, {
    input: INTRO_FADE_OUT,
    opacity: [1, 0],
    y: [0, -40],
    pointerEventsOffAfter: INTRO_FADE_OUT[1],
  });

  // Gleiche Stützstellen wie bisher: 30 bis 60 % des Visual-Fensters (0.15–0.8).
  const qualificationRef = useScrollStyle<HTMLDivElement>(scrollYProgress, {
    input: [0.345, 0.54],
    opacity: [0, 1],
  });

  if (!system) {
    return <NotFound title="System nicht gefunden" backTo="/systems" backLabel="Zurück zur Übersicht" />;
  }

  // Bei der TFT-Explosion ist unten rechts die Beschriftung der letzten
  // Schicht – die Qualifizierung steht dort deshalb links.
  const qualificationSide = system.id === 'tft-touch' ? 'left-8 xl:left-12' : 'right-8 xl:right-12';

  return (
    <div className="bg-white text-gray-800 font-sans selection:bg-brand-600 selection:text-white">
      <Seo {...systemSeo(system)} />
      {/* Navigation */}
      <Navbar backTo="/systems" backLabel="Zurück zum Hub" />

      {/* Scrollytelling Container */}
      <div ref={containerRef} className="relative h-[400vh] w-full">
        {/*
          Höhe in svh statt vh, wo der Browser es kann: auf dem Handy rechnet
          100vh die ein- und ausfahrende Adressleiste mit ein, und was am
          unteren Rand der Bühne sitzt (die Textkarte), läge dann dahinter.
        */}
        <div className="sticky top-0 h-[100vh] supports-[height:100svh]:h-[100svh] w-full overflow-hidden flex items-center justify-center">

          {/* Intro Section */}
          <div
            ref={introRef}
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
            <div className="text-gray-400 flex flex-col items-center gap-2">
              <span className="text-sm uppercase tracking-widest">Weiter scrollen</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>

          {/* System-spezifische Visualisierung (mittlerer Hauptteil) */}
          {system.id === 'tft-touch' && <TftExplosion scrollYProgress={scrollYProgress} compact={compact} />}
          {system.id === 'lcm-touch' && <LcmAssembly scrollYProgress={scrollYProgress} infoSlots={system.infoSlots} compact={compact} />}
          {system.id === 'glass-touch' && <GlassBondingStack scrollYProgress={scrollYProgress} infoSlots={system.infoSlots} compact={compact} />}
          {system.id === 'housing-assembling' && <HousingAssembly scrollYProgress={scrollYProgress} infoSlots={system.infoSlots} compact={compact} />}

          {/* Kundenspezifische Qualifizierung – breit als Karte über der
              Prozessleiste, kompakt als letzte Textkarte des Visuals. */}
          {/* Kompakt nur per CSS versteckt statt nicht gerendert: so bleibt das
              ref bestehen und die Karte ist nach einem Größenwechsel des
              Fensters sofort im richtigen Zustand. */}
          <div
            ref={qualificationRef}
            style={{ opacity: 0 }}
            className={`absolute bottom-28 z-[70] max-w-xs pointer-events-none ${qualificationSide} ${compact ? 'hidden' : ''}`}
          >
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-gray-900 font-bold text-xs mb-2 uppercase tracking-wider">{QUALIFICATION.title}</h3>
              <p className="text-gray-600 text-[13px] leading-relaxed">{QUALIFICATION.desc}</p>
            </div>
          </div>

          <ProcessIndicator scrollYProgress={scrollYProgress} />
        </div>
      </div>

      {/*
        Schluss-Abschnitt. Lag früher als Überblendung in der Sticky-Bühne und
        war an den Scroll-Fortschritt gebunden – dort erschien er in Chrome nie,
        und auf dem Handy hätte er nicht in die Bildschirmhöhe gepasst. Als
        normaler Abschnitt nach der Bühne ist er auf jedem Gerät erreichbar.
      */}
      <section className="border-t border-gray-100 px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <FadeIn inView>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Der Victronic No-Extra-Cost Vorteil
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-12">
              Keine versteckten Kosten. Keine bösen Überraschungen. Wir garantieren Ihnen einen fixen Projektablauf ohne Mehrkosten für Korrekturschritte über die initialen Toolingkosten hinaus.
            </p>
          </FadeIn>

          <FadeIn inView delay={0.1}>
            <ol className="grid md:grid-cols-3 gap-x-10 gap-y-8 mb-12">
              {NO_EXTRA_COST.map((item, i) => (
                <li key={item.title} className="border-t border-gray-200 pt-5">
                  <div className="text-sm font-bold text-brand-700 tabular-nums mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ol>
            <CtaLink to="/#contact">Projekt jetzt besprechen</CtaLink>
          </FadeIn>
        </div>
      </section>
      <Footer />
    </div>
  );
}
