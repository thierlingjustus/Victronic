import type { ComponentType } from 'react';
import type { MotionValue } from 'motion/react';
import { ErrorBoundary } from '../ErrorBoundary';
import type { ProductVisualProps } from './visuals/stage';
import TftStack from './visuals/TftStack';
import LcmModule from './visuals/LcmModule';
import TouchPanel from './visuals/TouchPanel';
import PowerForms from './visuals/PowerForms';
import AxialFan from './visuals/AxialFan';
import PlasticShell from './visuals/PlasticShell';
import CoverGlass from './visuals/CoverGlass';
import BoxBuild from './visuals/BoxBuild';

/**
 * Bühne der Produktseiten. Früher ein three.js-Canvas mit gedrehtem Modell –
 * jetzt für jede Produktkategorie eine eigene DOM/SVG-Darstellung, die vom
 * Scroll-Fortschritt der Bühne angetrieben wird. Kein WebGL, keine externen
 * Assets, sofort sichtbar.
 */

const PRODUCT_VISUALS: Record<string, ComponentType<ProductVisualProps>> = {
  display: TftStack,
  lcd: LcmModule,
  touch: TouchPanel,
  power: PowerForms,
  fan: AxialFan,
  plastic: PlasticShell,
  glass: CoverGlass,
  assembly: BoxBuild,
};

export default function ProductVisual({
  modelType,
  progress,
  reducedMotion = false,
  fallbackSrc,
  fallbackAlt,
}: {
  modelType: string;
  progress: MotionValue<number>;
  reducedMotion?: boolean;
  fallbackSrc: string;
  fallbackAlt: string;
}) {
  const Visual = PRODUCT_VISUALS[modelType] ?? BoxBuild;

  return (
    <ErrorBoundary
      fallback={
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <img src={fallbackSrc} alt={fallbackAlt} className="max-w-full max-h-full object-contain opacity-80" />
        </div>
      }
    >
      {/*
        Die Zeichnung selbst ist dekorativ (aria-hidden in den Visuals); die
        Bedeutung trägt das Label hier. Klicks gehen durch, damit das Scrollen
        nie blockiert wird.
      */}
      <div className="absolute inset-0 pointer-events-none" role="img" aria-label={fallbackAlt}>
        <Visual progress={progress} reducedMotion={reducedMotion} />
      </div>
    </ErrorBoundary>
  );
}
