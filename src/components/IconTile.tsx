import type { ComponentType } from 'react';

type IconTileProps = {
  icon: ComponentType<{ className?: string }>;
  /**
   * Kleines Produktfoto. Fährt der Zeiger über die umgebende Karte (sie muss
   * die Klasse `group` tragen), füllt das Foto die Kachel und das Icon blendet
   * aus. Ohne Foto bleibt es beim Icon.
   */
  thumb?: string;
  size?: 'md' | 'lg';
};

/**
 * Icon-Kachel für Produkt- und Systemkarten.
 *
 * Tailwinds group-hover greift nur auf Geräten mit echtem Hover – auf dem Handy
 * bleibt die Kachel also ruhig. Die Thumbnails sind jeweils nur wenige KB groß
 * und laden lazy, damit die Startseite dadurch nicht schwerer wird.
 */
export default function IconTile({ icon: Icon, thumb, size = 'md' }: IconTileProps) {
  const box = size === 'lg' ? 'w-16 h-16' : 'w-14 h-14';
  const glyph = size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-colors duration-300 group-hover:border-brand-300 group-focus-visible:border-brand-300 ${box}`}
    >
      {thumb && (
        <img
          src={thumb}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-0 scale-110 transition-[opacity,scale] duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100"
        />
      )}
      <Icon
        className={`relative text-gray-400 duration-300 ${glyph} ${
          thumb
            ? 'transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0'
            : 'transition-colors group-hover:text-brand-700 group-focus-visible:text-brand-700'
        }`}
      />
    </span>
  );
}
