import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Als WebP: zusammen rund 0,36 MB statt vorher 3,2 MB (Originale liegen in
// Information/Firma).
import fertigungImg from '../assets/hero/fertigung.webp';
import leiterplatteImg from '../assets/hero/leiterplatte.webp';
import touchscreenImg from '../assets/hero/touchscreen.webp';
import weltkarteImg from '../assets/hero/weltkarte.webp';

const SLIDES = [
  { src: fertigungImg, alt: 'Fertigung bei Victronic' },
  { src: leiterplatteImg, alt: 'Elektronikfertigung Leiterplatte' },
  { src: touchscreenImg, alt: 'Digitale Prozesssteuerung' },
  { src: weltkarteImg, alt: 'Internationales Liefernetzwerk' },
];

const SLIDE_DURATION_MS = 5500;
const CROSSFADE_DURATION_S = 1.1;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  // Zählt manuelle Navigationen, damit der Autoplay-Timer danach neu startet
  const [timerKey, setTimerKey] = useState(0);

  // Nur das jeweils nächste Bild vorladen statt gleich alle vier – so teilt
  // sich das erste Bild die Leitung beim Seitenaufruf nicht mit drei weiteren.
  useEffect(() => {
    const img = new Image();
    img.src = SLIDES[(index + 1) % SLIDES.length].src;
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(interval);
  }, [timerKey]);

  function goTo(step: number) {
    setIndex((i) => (i + step + SLIDES.length) % SLIDES.length);
    setTimerKey((k) => k + 1);
  }

  return (
    <>
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={SLIDES[index].src}
            alt={SLIDES[index].alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: CROSSFADE_DURATION_S, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-6 z-30 flex gap-2">
        <button
          type="button"
          onClick={() => goTo(-1)}
          aria-label="Vorheriges Bild"
          className="w-11 h-11 flex items-center justify-center rounded-md bg-black/30 hover:bg-black/50 text-white/80 hover:text-white backdrop-blur-sm transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => goTo(1)}
          aria-label="Nächstes Bild"
          className="w-11 h-11 flex items-center justify-center rounded-md bg-black/30 hover:bg-black/50 text-white/80 hover:text-white backdrop-blur-sm transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
