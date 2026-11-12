/**
 * Hover-Foto für Produkt- und Systemkarten: Fährt der Zeiger über die Karte
 * (sie muss `group`, `relative` und `overflow-hidden` tragen), färbt sich die
 * ganze Karte im Studio-Ton der Produktfotos ein und das freigestellte Produkt
 * blendet ein. So sieht die Karte aus wie ein einziges Foto, und das Produkt
 * lässt sich trotzdem frei neben den Text setzen, statt mittig unter ihm zu
 * liegen.
 *
 * Die Bilder (src/assets/products/cards) stehen auf reinem Weiß und werden per
 * `mix-blend-multiply` über den Ton gelegt: Weiß ergibt dabei exakt den Ton.
 * Ein transparenter Rand ginge auch, weicht nach der WebP-Kompression aber um
 * ein, zwei Farbstufen ab – das zeichnete sich als heller Kasten ums Produkt ab.
 *
 * Der Inhalt der Karte muss danach kommen und `relative` sein, sonst liegt er
 * unter diesen absolut positionierten Ebenen.
 *
 * Tailwinds group-hover greift nur auf Geräten mit echtem Hover; auf dem Handy
 * bleibt die Karte weiß.
 */
export default function CardPhoto({
  src,
  className,
}: {
  src: string;
  /** Lage und Größe des Produktbilds in der Karte (absolute Positionierung). */
  className: string;
}) {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-studio opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className={`pointer-events-none absolute object-contain mix-blend-multiply opacity-0 scale-95 transition-[opacity,scale] duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 ${className}`}
      />
    </>
  );
}
