import { forwardRef } from 'react';
import type { InfoSlot } from '../../data/systems';

/**
 * Callout-Karte für die System-Visualisierungen, gespeist aus den infoSlots in
 * systems.ts. Position kommt per className vom Aufrufer, `align` steuert die
 * Leserichtung.
 *
 * Ein- und Ausblenden übernimmt useScrollStyle über das weitergereichte ref
 * (siehe Callout in shared.tsx). Die Karte startet unsichtbar, damit vor dem
 * ersten Style-Schreiben nichts aufblitzt.
 *
 * Bewusst eine deckend weiße Karte ohne backdrop-blur: der Weichzeichner wird
 * beim Scrollen in jedem Frame neu berechnet und ist auf schwächeren Handys
 * die typische Ruckel-Ursache.
 */
const VisualCallout = forwardRef<HTMLDivElement, { slot: InfoSlot; className?: string }>(
  function VisualCallout({ slot, className = '' }, ref) {
    const isLeft = slot.align === 'left';
    return (
      <div
        ref={ref}
        style={{ opacity: 0 }}
        className={`absolute z-[60] w-56 ${isLeft ? 'text-right' : ''} ${className}`}
      >
        <div className={`h-px w-8 bg-brand-600 absolute top-4 opacity-50 ${isLeft ? '-right-8' : '-left-8'}`} />
        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-brand-700 font-bold text-xs uppercase tracking-wider">{slot.title}</h3>
          <p className="text-gray-600 text-[11px] mt-1 leading-snug">{slot.desc}</p>
        </div>
      </div>
    );
  }
);

export default VisualCallout;
