import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import fertigungImg from '../assets/hero/Victronic_1440px-X-500px_rgb.jpg';
import leiterplatteImg from '../assets/hero/BG_BLUE.jpg';
import touchscreenImg from '../assets/hero/Fotolia_30769948_XL_150dpi.jpg';
import weltkarteImg from '../assets/hero/bg.png';

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

  useEffect(() => {
    SLIDES.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

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
