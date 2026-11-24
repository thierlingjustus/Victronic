import type { ProductExampleGallery } from '../../data/types';
import CtaLink from '../CtaLink';
import FadeIn from '../FadeIn';

/**
 * Anwendungsbeispiele unter der Modellübersicht (Touchscreens: Glastouch-Blenden).
 * Kacheln im Look der Modellfotos. flex-wrap statt Grid, damit eine
 * unvollständige letzte Reihe mittig steht (7 Bilder: 4 + 3 am Desktop).
 * Die Zeichnungen haben sehr unterschiedliche Formate (bis 3,5 : 1) –
 * object-contain in gleich großen 4:3-Kacheln hält die Reihen trotzdem ruhig.
 */
export default function ProductExamples({ title, intro, link, items }: ProductExampleGallery) {
  return (
    <section aria-labelledby="beispiele-titel">
      <FadeIn inView>
        <div className="max-w-3xl mx-auto mb-10 md:mb-14 text-center">
          <h2 id="beispiele-titel" className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            {title}
          </h2>
          {intro && <p className="mt-4 text-gray-600 leading-relaxed">{intro}</p>}
        </div>
      </FadeIn>

      <FadeIn inView>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8">
          {items.map((item) => (
            <li
              key={item.image}
              className="w-[calc(50%-0.5rem)] md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <figure>
                <div className="aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden ring-1 ring-black/5 bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#f2f5f8_55%,#e6ebf0_100%)]">
                  <img
                    src={item.image}
                    alt={`${title}: ${item.caption}`}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-full object-contain p-4 md:p-6 mix-blend-multiply"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-gray-600 text-center">{item.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </FadeIn>

      {link && (
        <FadeIn inView>
          <div className="mt-10 text-center">
            <CtaLink to={link.to} size="sm">
              {link.label}
            </CtaLink>
          </div>
        </FadeIn>
      )}
    </section>
  );
}
