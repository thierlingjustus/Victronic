import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import { useScroll, type MotionValue } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { InfoSlot } from '../../data/types';
import CtaLink from '../CtaLink';
import { useMediaQuery } from '../useMediaQuery';
import ProductFactCard from './ProductFactCard';
import ProductVisual from './ProductVisual';
import { useScrollStyle } from './useScrollStyle';

type StageProduct = {
  name: string;
  headline: string;
  strategicBenefit: string;
  synergy: string;
  specs: { label: string; value: string }[];
  modelType: string;
  image: string;
  icon: ComponentType<{ className?: string }>;
  /** true: Technische Daten als Legende rechts neben dem Produkt statt Faktenkarten links und rechts. */
  specsLegend?: boolean;
};

/**
 * Bühnengeometrie mit Legende: Visual | Legende. Die Legende braucht mehr
 * Breite als eine Faktenkarte, dafür entfällt die linke Kartenspalte.
 */
const LEGEND_GRID =
  'mx-auto h-full w-full max-w-6xl xl:max-w-7xl px-6 lg:grid lg:gap-10 ' +
  'lg:grid-cols-[minmax(0,1fr)_22rem]';
/**
 * Die Visual-Spalte sitzt mit Legende um (22rem + 2,5rem) / 2 links der
 * Bildmitte. Um diesen Betrag rückt das Produkt im Intro zusätzlich nach
 * rechts, damit es dort steht wie auf den Seiten ohne Legende.
 */
const LEGEND_SHIFT = 196;
/** Ab hier kommt die Synergie-Karte; die Hervorhebung in der Legende endet. */
const SYNERGY_START = 0.78;

/**
 * Gemeinsame Spaltengeometrie der Bühne ab lg: Karten links | Visual | Karten
 * rechts. Beide Ebenen – die Kartenspalten und der Visual-Container – benutzen
 * dieselbe Konstante. Vorher standen die Karten absolut bei ±15,5 rem, während
 * das Visual max-w-3xl (±24 rem) breit war; das ergab 136 px Überlappung je
 * Seite. Über ein echtes Grid kann das konstruktiv nicht mehr passieren.
 */
const STAGE_GRID =
  'mx-auto h-full w-full max-w-6xl xl:max-w-7xl px-6 lg:grid lg:gap-6 ' +
  'lg:grid-cols-[14rem_minmax(0,1fr)_14rem] xl:grid-cols-[17rem_minmax(0,1fr)_17rem]';

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

  // Vertikale Staffelung: Karten wandern paarweise nach unten. Die Seite
  // ergibt sich jetzt aus der Grid-Spalte, nicht mehr aus einem Randabstand.
  const row = Math.floor(index / 2);
  const top = ['top-[24%]', 'top-[46%]', 'top-[66%]'][Math.min(row, 2)];

  return (
    <ProductFactCard
      ref={ref}
      title={fact.title}
      desc={fact.desc}
      align={isLeft ? 'left' : 'right'}
      className={`hidden lg:block ${isLeft ? 'right-0' : 'left-0'} ${top}`}
    />
  );
}

export default function ProductStage({ product }: { product: StageProduct }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeFact, setActiveFact] = useState(-1);
  // Legende: Zeile, deren Bauteil die Animation gerade hervorhebt
  const [legendActive, setLegendActive] = useState(-1);
  const legend = !!product.specsLegend;
  // Um wie viele Pixel das Visual nach oben rückt, sobald die Synergie-Karte
  // kommt – rund 12 % der Bühnenhöhe (lg: top-[8%] bis bottom-[12%] ≈ 80 vh).
  const [synergyLift, setSynergyLift] = useState(0);
  // Handy-Breite: dort wäre die Beschriftung in der Zeichnung nur gut 6 px
  // hoch – sie erscheint stattdessen als Textzeile unter der Grafik.
  const narrow = useMediaQuery('(max-width: 639px)');

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
    const onResize = () => setSynergyLift(-Math.round(window.innerHeight * 0.8 * 0.12));
    onResize();
    motionMq.addEventListener('change', onMotion);
    widthMq.addEventListener('change', onWidth);
    window.addEventListener('resize', onResize);
    return () => {
      motionMq.removeEventListener('change', onMotion);
      widthMq.removeEventListener('change', onWidth);
      window.removeEventListener('resize', onResize);
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
  // heraus und wandert danach in die Bildmitte zurück. Zum Schluss steigt es
  // nach oben, statt sich von der Synergie-Karte überdecken zu lassen.
  // Mit Legende ist der Weg nach links länger. Das Produkt wartet deshalb
  // rechts, bis das Intro fast ausgeblendet ist – sonst schöbe es sich noch
  // über den Text.
  const visualRef = useScrollStyle<HTMLDivElement>(
    scrollYProgress,
    legend
      ? {
          input: [0, 0.14, 0.26, 0.78, 0.88],
          x: isDesktop ? [140 + LEGEND_SHIFT, 120 + LEGEND_SHIFT, 0, 0, 0] : [0, 0, 0, 0, 0],
          y: isDesktop ? [0, 0, 0, 0, synergyLift] : [0, 0, 0, 0, 0],
        }
      : {
          input: [0, 0.2, 0.78, 0.88],
          x: isDesktop ? [140, 0, 0, 0] : [0, 0, 0, 0],
          y: isDesktop ? [0, 0, 0, synergyLift] : [0, 0, 0, 0],
        },
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
  const synergyRef = useScrollStyle<HTMLDivElement>(
    scrollYProgress,
    { input: [SYNERGY_START, 0.88], opacity: [0, 1], y: [24, 0] },
    reducedMotion
  );
  // Legende kommt, während das Intro geht, und bleibt bis zum Schluss stehen
  const legendRef = useScrollStyle<HTMLDivElement>(
    scrollYProgress,
    { input: [0.14, 0.24], opacity: [0, 1], x: [24, 0] },
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
      const row = latest >= SYNERGY_START ? -1 : next;
      setLegendActive((prev) => (prev === row ? prev : row));
    });
  }, [scrollYProgress, facts.length, reducedMotion]);

  // Technische Daten als Legende – ohne Karte und ohne Verbindungsstriche
  const specLegend = (
    <div>
      <h2 className="text-lg font-semibold tracking-tight text-gray-900 mb-3">Technische Daten</h2>
      <dl className="border-t border-gray-200">
        {facts.map((fact, i) => (
          <div key={fact.title} className="py-3.5 border-b border-gray-200">
            <dt
              className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                legendActive === i ? 'text-brand-700' : 'text-gray-500'
              }`}
            >
              {fact.title}
            </dt>
            <dd className="mt-1 text-sm text-gray-700 leading-snug">{fact.desc}</dd>
          </div>
        ))}
      </dl>
    </div>
  );

  const visual = (
    <ProductVisual
      modelType={product.modelType}
      progress={scrollYProgress}
      reducedMotion={reducedMotion}
      activeFact={activeFact}
      compactLabels={narrow && !reducedMotion}
      fallbackSrc={product.image}
      fallbackAlt={`${product.name} – Produktansicht`}
    />
  );

  const introBlock = (
    <>
      <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-5">
        <product.icon className="w-4 h-4" />
        {product.name}
      </div>
      {/* hyphens-auto: lange Wörter wie „Thermomanagement" liefen auf schmalen
          Handys rechts aus der Karte. */}
      <h1 className="text-4xl md:text-5xl lg:text-[3.1rem] font-bold tracking-tighter leading-[1.05] text-gray-900 mb-5 hyphens-auto [overflow-wrap:anywhere]">
        {product.headline}
      </h1>
      <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
        {product.strategicBenefit}
      </p>
      <CtaLink to="/#contact">Technische Beratung anfordern</CtaLink>
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
          {legend ? (
            // Unter lg zeigt Product.tsx die Technischen Daten direkt unter der Bühne
            <div className="hidden lg:block max-w-3xl">{specLegend}</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {facts.map((fact, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 shadow-sm">
                  <h3 className="text-brand-700 font-bold text-[11px] uppercase tracking-wider">{fact.title}</h3>
                  <p className="text-gray-600 text-xs mt-1.5 leading-snug">{fact.desc}</p>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 bg-brand-50 border border-brand-100 rounded-xl px-5 py-4">
            <h3 className="text-brand-700 font-bold text-[11px] uppercase tracking-wider mb-1.5">Synergie im System</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.synergy}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[260vh] lg:h-[280vh] w-full">
      {/* Höhe in svh statt vh, wo der Browser es kann: 100vh rechnet auf dem
          Handy die ein- und ausfahrende Adressleiste mit ein, und die Karten am
          unteren Rand der Bühne lägen dann dahinter. */}
      <div className="sticky top-0 h-[100vh] supports-[height:100svh]:h-[100svh] w-full overflow-hidden flex items-center justify-center">
        {/* Weicher Studio-Verlauf als Bühnenhintergrund */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#f2f5f8_45%,#e6ebf0_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />

        {/* Produkt in der Mitte – oben bleibt Platz für die fixe Navbar,
            unten für die kompakte Faktenkarte auf kleinen Displays. */}
        <div className="absolute inset-x-0 top-20 bottom-52 lg:top-[8%] lg:bottom-[12%]">
          {legend ? (
            <div className={LEGEND_GRID}>
              <div ref={visualRef} className="relative mx-auto h-full w-full max-w-3xl lg:max-w-none">
                {visual}
              </div>
              {/* Rechte Spalte gehört der Legende */}
              <div className="hidden lg:block" />
            </div>
          ) : (
            <div className={STAGE_GRID}>
              {/* Die beiden Randspalten bleiben hier leer – sie gehören den
                  Faktenkarten, und das Visual darf sie nie betreten. */}
              <div className="hidden lg:block" />
              <div ref={visualRef} className="relative mx-auto h-full w-full max-w-3xl lg:max-w-none">
                {visual}
              </div>
              <div className="hidden lg:block" />
            </div>
          )}
        </div>

        {/* Intro links – blendet beim Weiterscrollen aus */}
        <div ref={introRef} className="absolute inset-x-0 top-24 lg:top-1/2 lg:-translate-y-1/2 px-6 z-40">
          <div className="max-w-6xl mx-auto">
            {/* Unter lg liegt der Text über dem Modell und braucht eine
                abgesetzte, deckende Karte. Ab lg steht er daneben und bleibt
                ohne Hintergrund. Bewusst kein backdrop-blur: der Weichzeichner
                wird beim Scrollen in jedem Frame neu berechnet. */}
            <div className="lg:max-w-md text-center lg:text-left max-lg:bg-white/90 max-lg:rounded-2xl max-lg:p-5">
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
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-full px-4 py-2">
            <product.icon className="w-4 h-4 text-brand-700" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-700">{product.name}</span>
          </div>
        </div>

        {/* Legende rechts neben dem Produkt (ab lg) */}
        {legend && (
          // pointer-events-none: die Ebene liegt über dem Intro und würde sonst
          // dessen Link „Technische Beratung anfordern" abfangen.
          <div className="absolute inset-x-0 top-[8%] bottom-[12%] z-[60] hidden lg:block pointer-events-none">
            <div className={LEGEND_GRID}>
              <div />
              <div className="flex h-full items-center">
                <div ref={legendRef} style={{ opacity: 0 }} className="w-full">
                  {specLegend}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fakten links und rechts (ab lg) */}
        {!legend && (
        <div className="absolute inset-0 z-[60] pointer-events-none hidden lg:block">
          <div className={STAGE_GRID}>
            <div className="relative h-full">
              {facts.map((fact, i) =>
                fact.align === 'left' ? (
                  <StageFact
                    key={`${fact.title}-${i}`}
                    fact={fact}
                    index={i}
                    total={facts.length}
                    progress={scrollYProgress}
                    reducedMotion={reducedMotion}
                  />
                ) : null
              )}
            </div>
            <div />
            <div className="relative h-full">
              {facts.map((fact, i) =>
                fact.align === 'left' ? null : (
                  <StageFact
                    key={`${fact.title}-${i}`}
                    fact={fact}
                    index={i}
                    total={facts.length}
                    progress={scrollYProgress}
                    reducedMotion={reducedMotion}
                  />
                )
              )}
            </div>
          </div>
        </div>
        )}

        {/* Fakten kompakt: unter lg immer nur die aktuelle Karte. Mit Legende
            entfällt sie – die Daten stehen dann direkt unter der Bühne. */}
        {!legend && (
        <div ref={compactFactsRef} className="absolute inset-x-0 bottom-24 px-6 z-[60] lg:hidden pointer-events-none">
          <div className="relative max-w-sm mx-auto min-h-[96px]">
            {facts.map((fact, i) => (
              <div
                key={`${fact.title}-mobile-${i}`}
                className={`bg-white px-4 py-3.5 rounded-xl border border-gray-200 shadow-sm transition-opacity duration-300 ${
                  activeFact === i ? 'opacity-100 relative' : 'opacity-0 absolute inset-x-0 top-0'
                }`}
              >
                <h3 className="text-brand-700 font-bold text-[11px] uppercase tracking-wider">{fact.title}</h3>
                <p className="text-gray-600 text-xs mt-1.5 leading-snug">{fact.desc}</p>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Synergie-Karte zum Abschluss der Bühne – mit Legende mittig unter
            dem Produkt statt unter der ganzen Breite, sonst läge sie auf
            schmaleren Desktops über der Legende. */}
        <div
          ref={synergyRef}
          style={{ opacity: 0 }}
          className="absolute inset-x-0 bottom-24 lg:bottom-28 px-6 z-[65] pointer-events-none"
        >
          <div className={legend ? 'max-w-6xl xl:max-w-7xl mx-auto lg:pr-[24.5rem]' : ''}>
            <div className="max-w-xl mx-auto bg-white border border-gray-200 shadow-sm rounded-xl px-6 py-5">
              <h3 className="text-brand-700 font-bold text-[11px] uppercase tracking-wider mb-2">Synergie im System</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{product.synergy}</p>
            </div>
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
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
