import type { ComponentType } from 'react';

type IconTileProps = {
  icon: ComponentType<{ className?: string }>;
  size?: 'md' | 'lg';
  /**
   * Für Karten mit Hover-Foto (CardPhoto): Die Kachel tritt beim Hover zurück
   * und macht dem Produktbild Platz. Ohne diese Option färbt sich nur das Icon.
   */
  fadeOnHover?: boolean;
};

/**
 * Icon-Kachel für Produkt-, System- und Leistungskarten. Die umgebende Karte
 * muss die Klasse `group` tragen.
 */
export default function IconTile({ icon: Icon, size = 'md', fadeOnHover = false }: IconTileProps) {
  const box = size === 'lg' ? 'w-16 h-16' : 'w-14 h-14';
  const glyph = size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 duration-300 ${box} ${
        fadeOnHover
          ? 'transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0'
          : 'transition-colors group-hover:border-brand-300 group-focus-visible:border-brand-300'
      }`}
    >
      <Icon
        className={`text-gray-400 transition-colors duration-300 group-hover:text-brand-700 group-focus-visible:text-brand-700 ${glyph}`}
      />
    </span>
  );
}
