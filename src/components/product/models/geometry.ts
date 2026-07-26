import * as THREE from 'three';

/**
 * Geometrie-Helfer, die sich die Produkt- und System-3D-Modelle teilen.
 * Ursprünglich in HousingAssembly3D.tsx entstanden und von dort extrahiert,
 * damit die Modelle in models/ nicht dieselben Shapes neu bauen müssen.
 */

/** Abgerundetes Rechteck als äußere Kontur (zentriert um den Ursprung). */
export function roundedRectShape(w: number, h: number, r: number) {
  const x = -w / 2;
  const y = -h / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

/** Dieselbe Kontur als Loch – für Rahmen mit Ausschnitt. */
export function roundedRectHole(w: number, h: number, r: number) {
  const x = -w / 2;
  const y = -h / 2;
  const hole = new THREE.Path();
  hole.moveTo(x + r, y);
  hole.lineTo(x + w - r, y);
  hole.quadraticCurveTo(x + w, y, x + w, y + r);
  hole.lineTo(x + w, y + h - r);
  hole.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  hole.lineTo(x + r, y + h);
  hole.quadraticCurveTo(x, y + h, x, y + h - r);
  hole.lineTo(x, y + r);
  hole.quadraticCurveTo(x, y, x + r, y);
  return hole;
}

/** Abgerundetes Quadrat mit Eckradius – Basis für Lüfter-/Gehäuserahmen. */
export function roundedSquareShape(size: number, r: number) {
  return roundedRectShape(size, size, r);
}

/** Weiche 0..1-Rampe zwischen a und b (Kurzform für THREE.MathUtils.smoothstep). */
export const smooth = (p: number, a: number, b: number) => THREE.MathUtils.smoothstep(p, a, b);
