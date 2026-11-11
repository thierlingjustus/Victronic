import { forwardRef } from 'react';

/**
 * Fakten-Karte der Produkt-Bühne. Optisch identisch zur VisualCallout-Karte
 * der System-Detailseiten (deckend weiße Karte, Verbindungsstrich in
 * brand-600), nur etwas größer, weil sie hier der Haupttext neben dem Produkt
 * ist. Bewusst ohne backdrop-blur – siehe VisualCallout.tsx.
 *
 * Ein- und Ausblenden übernimmt useScrollStyle über das weitergereichte ref –
 * nicht motion, siehe Kommentar in useScrollStyle.ts.
 */
const ProductFactCard = forwardRef<
  HTMLDivElement,
  { title: string; desc: string; align: 'left' | 'right'; className?: string }
>(function ProductFactCard({ title, desc, align, className = '' }, ref) {
  const isLeft = align === 'left';
  return (
    <div
      ref={ref}
      style={{ opacity: 0 }}
      className={`absolute z-[60] w-52 lg:w-56 xl:w-64 ${isLeft ? 'text-right' : ''} ${className}`}
    >
      {/* Verbindungsstrich zum Produkt in der Mitte */}
      <div
        className={`hidden lg:block h-px w-10 bg-brand-600 absolute top-5 opacity-50 ${isLeft ? '-right-10' : '-left-10'}`}
      />
      <div className="bg-white px-4 py-3.5 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-brand-700 font-bold text-[11px] uppercase tracking-wider">{title}</h3>
        <p className="text-gray-600 text-xs mt-1.5 leading-snug">{desc}</p>
      </div>
    </div>
  );
});

export default ProductFactCard;
