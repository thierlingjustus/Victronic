import React from 'react';
import FadeIn from './FadeIn';

type ShowcaseImage = {
  src: string;
  caption: string;
};

type ProductShowcaseProps = {
  images: ShowcaseImage[];
  productName: string;
};

export default function ProductShowcase({ images, productName }: ProductShowcaseProps) {
  return (
    <div className="space-y-20 md:space-y-28">
      {images.map((img, i) => {
        const imageFirst = i % 2 === 0;
        return (
          <div key={i} className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className={imageFirst ? 'md:order-1' : 'md:order-2'}>
              <FadeIn inView direction={imageFirst ? 'left' : 'right'}>
                {/* Bewusst ohne festes Seitenverhältnis: Die Studioaufnahmen
                    haben unterschiedliche Formate und Hintergrundtöne. Würde
                    man sie in einen 4:3-Rahmen setzen, entstünden oben und
                    unten Füllflächen, deren Grau nie exakt zum Foto passt –
                    das Bild wirkte dann wie hineinkopiert. So füllt jedes Foto
                    seine Kachel randlos aus. */}
                <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-sm">
                  <img
                    src={img.src}
                    alt={`${productName}: ${img.caption}`}
                    loading="lazy"
                    className="block w-full h-auto"
                  />
                </div>
              </FadeIn>
            </div>
            <div className={imageFirst ? 'md:order-2' : 'md:order-1'}>
              <FadeIn inView direction={imageFirst ? 'right' : 'left'} delay={0.1}>
                <div className="text-brand-700 font-bold text-sm mb-3 tracking-wide">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {img.caption}
                </p>
              </FadeIn>
            </div>
          </div>
        );
      })}
    </div>
  );
}
