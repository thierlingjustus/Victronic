import { Suspense, lazy, useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { useScroll, type MotionValue } from 'motion/react';
import { ChevronDown, ChevronRight, MousePointer2, Sparkles } from 'lucide-react';
import type { InfoSlot } from '../../data/types';
import ProductFactCard from './ProductFactCard';
import { useScrollStyle } from './useScrollStyle';

// three.js erst laden, wenn eine Produktseite tatsächlich offen ist
const ProductModel3D = lazy(() => import('./ProductModel3D'));

type StageProduct = {
  name: string;
  headline: string;
  strategicBenefit: string;
  synergy: string;
  specs: { label: string; value: string }[];
  modelType: string;
  image: string;
  icon: ComponentType<{ className?: string }>;
};

/** Erstes Fakten-Fenster und Abstand der folgenden – ergibt die Staffelung. */
const FACT_WINDOW_START = 0.2;
const FACT_WINDOW_SPAN = 0.52;
const FACT_FADE = 0.1;

function factWindow(index: number, total: number): [number, number] {
  const start = FACT_WINDOW_START + (index * FACT_WINDOW_SPAN) / Math.max(total, 1);
  return [start, start + FACT_FADE];
}

/** Eigene Komponente je Fakt – so bleibt die Hook-Zahl unabhängig von der Anzahl. */
function StageFact({
  fact,
  index,
  total,
  progress,
  reducedMotion,
}: {
  fact: InfoSlot;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const [start, end] = factWindow(index, total);
  const isLeft = fact.align === 'left';

  const ref = useScrollStyle<HTMLDivElement>(
    progress,
    { input: [start, end], opacity: [0, 1], x: [isLeft ? -28 : 28, 0] },
    reducedMotion
  );

  // Vertikale Staffelung: Karten wandern paarweise nach unten
  const row = Math.floor(index / 2);
  const top = ['top-[24%]', 'top-[46%]', 'top-[66%]'][Math.min(row, 2)];
  const side = isLeft
    ? 'right-1/2 mr-[15.5rem] xl:mr-[19rem]'
    : 'left-1/2 ml-[15.5rem] xl:ml-[19rem]';

  return (
    <ProductFactCard
      ref={ref}
      title={fact.title}
      desc={fact.desc}
      align={isLeft ? 'left' : 'right'}
      className={`hidden lg:block ${side} ${top}`}
    />
  );
}

export default function ProductStage({ product }: { product: StageProduct }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeFact, setActiveFact] = useState(-1);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Entspricht dem lg-Breakpoint von Tailwind – ab hier steht das Intro
    // links neben dem Produkt statt darüber.
    const widthMq = window.matchMedia('(min-width: 1024px)');
    setReducedMotion(motionMq.matches);
    setIsDesktop(widthMq.matches);
    const onMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const onWidth = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    motionMq.addEventListener('change', onMotion);
    widthMq.addEventListener('change', onWidth);
    return () => {
      motionMq.removeEventListener('change', onMotion);
      widthMq.removeEventListener('change', onWidth);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Fakten aus den vorhandenen Spezifikationen – abwechselnd links und rechts.
  const facts: InfoSlot[] = useMemo(
    () =>
      product.specs.map((spec, i) => ({
        title: spec.label,
        desc: spec.value,
        align: i % 2 === 0 ? 'left' : 'right',
      })),
    [product.specs]
  );

  const introRef = useScrollStyle<HTMLDivElement>(
    scrollYProgress,
    { input: [0, 0.16], opacity: [1, 0], y: [0, -40], pointerEventsOffAfter: 0.16 },
    reducedMotion
  );
  // Solange das Intro links steht, rückt das Produkt nach rechts aus dem Text
  // heraus und wandert danach in die Bildmitte zurück.
  const visualRef = useScrollStyle<HTMLDivElement>(
    scrollYProgress,
    { input: [0, 0.2], x: isDesktop ? [140, 0] : [0, 0] },
    reducedMotion
  );
  const badgeRef = useScrollStyle<HTMLDivElement>(
    scrollYProgress,
    { input: [0.16, 0.24], opacity: [0, 1] },
    reducedMotion
  );
  const hintRef = useScrollStyle<HTMLDivElement>(
    scrollYProgress,
    { input: [0, 0.1], opacity: [1, 0] },
    reducedMotion
  );
  const dragHintRef = useScrollStyle<HTMLDivElement>(
    scrollYProgress,
    { input: [0.22, 0.3, 0.75, 0.85], opacity: [0, 1, 1, 0] },
    reducedMotion
  );
  const synergyRef = useScrollStyle<HTMLDivElement>(
    scrollYProgress,
    { input: [0.78, 0.88], opacity: [0, 1], y: [24, 0] },
    reducedMotion
  );
  // Unter lg teilen sich Fakten- und Synergie-Karte denselben Platz am unteren
  // Rand – die Fakten treten deshalb zurück, sobald die Synergie kommt.
  const compactFactsRef = useScrollStyle<HTMLDivElement>(
    scrollYProgress,
    { input: [0.72, 0.8], opacity: [1, 0] },
    reducedMotion
  );

  // Aktive Karte für die kompakte Darstellung unter lg und für die Punktleiste
  useEffect(() => {
    if (reducedMotion) return;
    return scrollYProgress.on('change', (latest: number) => {
      const total = facts.length;
      let next = -1;
      for (let i = 0; i < total; i++) {
        if (latest >= factWindow(i, total)[0]) next = i;
      }
      setActiveFact((prev) => (prev === next ? prev : next));
    });
  }, [scrollYProgress, facts.length, reducedMotion]);

  const visual = (
    <Suspense
      fallback={
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <img src={product.image} alt="" aria-hidden="true" className="max-w-full max-h-full object-contain opacity-40" />
        </div>
      }
    >
      <ProductModel3D
        modelType={product.modelType}
        progress={scrollYProgress}
        reducedMotion={reducedMotion}
        fallbackSrc={product.image}
        fallbackAlt={`${product.name} – Produktansicht`}
      />
    </Suspense>
  );

  const introBlock = (
    <>
      <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-5">
        <product.icon className="w-4 h-4" />
        {product.name}
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-[3.1rem] font-bold tracking-tighter leading-[1.05] text-gray-900 mb-5">
        {product.headline}
      </h1>
      <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
        {product.strategicBenefit}
      </p>
      <Link
        to="/#contact"
        className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-6 py-3.5 rounded-md font-medium hover:bg-brand-700 transition-colors group"
      >
        Technische Beratung anfordern
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </>
  );

  // Statische Variante ohne Scroll-Choreografie
  if (reducedMotion) {
    return (
      <section className="px-6 pt-28 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
            <div>{introBlock}</div>
            <div className="relative h-[380px] rounded-3xl bg-gradient-to-b from-white to-gray-100 border border-gray-200 overflow-hidden">
              {visual}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {facts.map((fact, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 shadow-sm">
                <h3 className="text-brand-700 font-bold text-[11px] uppercase tracking-wider">{fact.title}</h3>
                <p className="text-gray-600 text-xs mt-1.5 leading-snug">{fact.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-brand-50 border border-brand-100 rounded-xl px-5 py-4">
            <h3 className="text-brand-700 font-bold text-[11px] uppercase tracking-wider mb-1.5">Synergie im System</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.synergy}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[260vh] lg:h-[340vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Weicher Studio-Verlauf als Bühnenhintergrund */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#f2f5f8_45%,#e6ebf0_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />

        {/* Produkt in der Mitte – oben bleibt Platz für die fixe Navbar,
            unten für die kompakte Faktenkarte auf kleinen Displays. */}
        <div className="absolute inset-x-0 top-20 bottom-44 lg:top-[8%] lg:bottom-[12%] flex items-center justify-center">
          <div ref={visualRef} className="relative w-full h-full max-w-3xl">
            {visual}
          </div>
        </div>

        {/* Intro links – blendet beim Weiterscrollen aus */}
        <div ref={introRef} className="absolute inset-x-0 top-24 lg:top-1/2 lg:-translate-y-1/2 px-6 z-40">
          <div className="max-w-6xl mx-auto">
            {/* Unter lg liegt der Text über dem Modell und braucht eine
                abgesetzte Karte. Ab lg steht er daneben – dort darf gar kein
                backdrop-filter gesetzt sein, sonst legt sich ein unscharfer
                Kasten über das Modell. Deshalb max-lg: statt eines lg-Resets:
                backdrop-blur-0 existiert in Tailwind 4 nicht und würde den
                Blur wirkungslos „zurücksetzen". */}
            <div className="lg:max-w-md text-center lg:text-left max-lg:bg-white/70 max-lg:backdrop-blur-sm max-lg:rounded-2xl max-lg:p-5">
              {introBlock}
            </div>
          </div>
        </div>

        {/* Kompaktes Label, sobald das Intro weg ist */}
        <div
          ref={badgeRef}
          style={{ opacity: 0 }}
          className="absolute top-24 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 z-40 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-sm rounded-full px-4 py-2">
            <product.icon className="w-4 h-4 text-brand-700" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-700">{product.name}</span>
          </div>
        </div>

        {/* Fakten links und rechts (ab lg) */}
        <div className="absolute inset-0 z-[60] pointer-events-none hidden lg:block">
          <div className="relative w-full max-w-6xl h-full mx-auto">
            {facts.map((fact, i) => (
              <StageFact
                key={`${fact.title}-${i}`}
                fact={fact}
                index={i}
                total={facts.length}
                progress={scrollYProgress}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>

        {/* Fakten kompakt: unter lg immer nur die aktuelle Karte */}
        <div ref={compactFactsRef} className="absolute inset-x-0 bottom-24 px-6 z-[60] lg:hidden pointer-events-none">
          <div className="relative max-w-sm mx-auto min-h-[96px]">
            {facts.map((fact, i) => (
              <div
                key={`${fact.title}-mobile-${i}`}
                className={`bg-white/95 backdrop-blur-xl px-4 py-3.5 rounded-xl border border-gray-200 shadow-xl transition-opacity duration-300 ${
                  activeFact === i ? 'opacity-100 relative' : 'opacity-0 absolute inset-x-0 top-0'
                }`}
              >
                <h3 className="text-brand-700 font-bold text-[11px] uppercase tracking-wider">{fact.title}</h3>
                <p className="text-gray-600 text-xs mt-1.5 leading-snug">{fact.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Synergie-Karte zum Abschluss der Bühne */}
        <div
          ref={synergyRef}
          style={{ opacity: 0 }}
          className="absolute inset-x-0 bottom-24 lg:bottom-28 px-6 z-[65] pointer-events-none"
        >
          <div className="max-w-xl mx-auto bg-white/95 backdrop-blur-xl border border-brand-100 shadow-xl rounded-2xl px-6 py-5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-brand-700" />
              <h3 className="text-brand-700 font-bold text-[11px] uppercase tracking-wider">Synergie im System</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{product.synergy}</p>
          </div>
        </div>

        {/* Fortschrittspunkte */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-2 pointer-events-none">
          {facts.map((_, i) => (
            <span
              key={`dot-${i}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= activeFact ? 'bg-brand-600 w-6' : 'bg-gray-300 w-1.5'
              }`}
            />
          ))}
        </div>

        {/* Scroll-Hinweis im Intro */}
        <div
          ref={hintRef}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-[70] flex flex-col items-center gap-1.5 text-gray-400 pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-widest">Weiter scrollen</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* Drag-Hinweis (nur Maus) */}
        <div
          ref={dragHintRef}
          style={{ opacity: 0 }}
          className="absolute right-8 bottom-10 z-[70] hidden lg:flex items-center gap-1.5 text-[10px] text-gray-500 bg-white/95 px-2.5 py-1.5 rounded-full shadow-sm border border-gray-200 pointer-events-none"
        >
          <MousePointer2 className="w-3 h-3 text-brand-600" />
          Ziehen zum Drehen
        </div>
      </div>
    </div>
  );
}
