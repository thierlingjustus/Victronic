import { forwardRef } from 'react';
import { motion, MotionValue } from 'motion/react';
import type { InfoSlot } from '../../data/systems';

/**
 * Callout-Karte für die System-Visualisierungen – gleicher Look wie die
 * Layer-Tooltips der TFT-Explosion, gespeist aus den infoSlots in systems.ts.
 * Position kommt per className vom Aufrufer, `align` steuert die Leserichtung.
 *
 * Zwei Betriebsarten, damit alte und neue Visuals dieselbe Karte teilen:
 * - `opacity` als MotionValue → gerendert als motion.div (LcmAssembly,
 *   GlassBondingStack, also der Bestand).
 * - ohne `opacity`, dafür mit Ref → einfaches div, das von useScrollStyle
 *   direkt beschrieben wird. Startet unsichtbar, damit vor dem ersten
 *   Style-Schreiben nichts aufblitzt.
 */
const CalloutBody = ({ slot, isLeft }: { slot: InfoSlot; isLeft: boolean }) => (
  <>
    <div className={`hidden md:block h-[1px] w-8 bg-brand-600 absolute top-4 opacity-50 ${isLeft ? '-right-8' : '-left-8'}`} />
    <div className="bg-white/95 backdrop-blur-xl p-3 rounded-xl border border-gray-200 shadow-xl">
      <h3 className="text-brand-700 font-bold text-[10px] md:text-xs uppercase tracking-wider">{slot.title}</h3>
      <p className="text-gray-600 text-[9px] md:text-[10px] mt-1 leading-tight">{slot.desc}</p>
    </div>
  </>
);

const VisualCallout = forwardRef<
  HTMLDivElement,
  { slot: InfoSlot; opacity?: MotionValue<number>; className?: string }
>(function VisualCallout({ slot, opacity, className = '' }, ref) {
  const isLeft = slot.align === 'left';
  const wrapperClass = `absolute z-[60] w-40 md:w-56 ${isLeft ? 'text-right' : ''} ${className}`;

  if (opacity) {
    return (
      <motion.div style={{ opacity }} className={wrapperClass}>
        <CalloutBody slot={slot} isLeft={isLeft} />
      </motion.div>
    );
  }

  return (
    <div ref={ref} style={{ opacity: 0 }} className={wrapperClass}>
      <CalloutBody slot={slot} isLeft={isLeft} />
    </div>
  );
});

export default VisualCallout;
