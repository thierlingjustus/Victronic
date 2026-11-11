import { useEffect, useState } from 'react';

/**
 * Liefert, ob eine Media-Query gerade zutrifft, und bleibt bei Änderungen
 * (Fenstergröße, Drehen des Geräts) aktuell.
 *
 * Der Startwert wird synchron gelesen – die Seite ist eine reine Client-SPA,
 * es gibt also kein Server-Rendering, das davon abweichen könnte. So steht
 * schon der erste Frame in der richtigen Geometrie und nichts springt um.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
