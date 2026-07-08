import { motion, useTransform, MotionValue } from 'motion/react';

/**
 * Scroll-gesteuerte 9-Layer-Explosionsgrafik des TFT-Aufbaus.
 * 1:1 aus SystemDetail.tsx extrahiert – Keyframes, Klassen und layersData
 * dürfen nicht verändert werden (exklusiv für id === "tft-touch").
 */
export default function TftExplosion({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Explosion animations
  const explosionProgress = useTransform(scrollYProgress, [0.15, 0.8], [0, 1]);
  const explosionOpacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 0.9], [0, 1, 1, 0]);

  // Diagonal movement for 9 parts
  const spreadX = 55;
  const spreadY = 55;

  const t0X = useTransform(explosionProgress, [0, 1], [0, -4 * spreadX]);
  const t0Y = useTransform(explosionProgress, [0, 1], [0, -4 * spreadY]);

  const t1X = useTransform(explosionProgress, [0, 1], [0, -3 * spreadX]);
  const t1Y = useTransform(explosionProgress, [0, 1], [0, -3 * spreadY]);

  const t2X = useTransform(explosionProgress, [0, 1], [0, -2 * spreadX]);
  const t2Y = useTransform(explosionProgress, [0, 1], [0, -2 * spreadY]);

  const t3X = useTransform(explosionProgress, [0, 1], [0, -1 * spreadX]);
  const t3Y = useTransform(explosionProgress, [0, 1], [0, -1 * spreadY]);

  const t4X = useTransform(explosionProgress, [0, 1], [0, 0]);
  const t4Y = useTransform(explosionProgress, [0, 1], [0, 0]);

  const t5X = useTransform(explosionProgress, [0, 1], [0, 1 * spreadX]);
  const t5Y = useTransform(explosionProgress, [0, 1], [0, 1 * spreadY]);

  const t6X = useTransform(explosionProgress, [0, 1], [0, 2 * spreadX]);
  const t6Y = useTransform(explosionProgress, [0, 1], [0, 2 * spreadY]);

  const t7X = useTransform(explosionProgress, [0, 1], [0, 3 * spreadX]);
  const t7Y = useTransform(explosionProgress, [0, 1], [0, 3 * spreadY]);

  const t8X = useTransform(explosionProgress, [0, 1], [0, 4 * spreadX]);
  const t8Y = useTransform(explosionProgress, [0, 1], [0, 4 * spreadY]);

  const transforms = [
    { x: t0X, y: t0Y },
    { x: t1X, y: t1Y },
    { x: t2X, y: t2Y },
    { x: t3X, y: t3Y },
    { x: t4X, y: t4Y },
    { x: t5X, y: t5Y },
    { x: t6X, y: t6Y },
    { x: t7X, y: t7Y },
    { x: t8X, y: t8Y },
  ];

  const layersData = [
    {
      name: "Front-Polarisator",
      desc: "High-Res Bildschirmoberfläche",
      side: "right",
      // TODO(Victronic): Hier optional ein echtes Produkt-/Display-Foto einsetzen.
      // Bis dahin deutet ein Markenverlauf den aktiven Bildschirm an.
      content: <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-800 via-brand-500 to-brand-200" />,
      className: "bg-transparent border-gray-200 z-[59] shadow-2xl"
    },
    {
      name: "Glas",
      desc: "Schützendes Trägersubstrat",
      side: "left",
      content: <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl backdrop-blur-sm" />,
      className: "bg-white/10 border-gray-300 z-[58]"
    },
    {
      name: "Farbfilter",
      desc: "Erzeugt die RGB-Subpixel",
      side: "right",
      content: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjYiIGZpbGw9InJlZCIgb3BhY2l0eT0iMC4zIi8+PHJlY3QgeD0iMiIgd2lkdGg9IjIiIGhlaWdodD0iNiIgZmlsbD0iZ3JlZW4iIG9wYWNpdHk9IjAuMyIvPjxyZWN0IHg9IjQiIHdpZHRoPSIyIiBoZWlnaHQ9IjYiIGZpbGw9ImJsdWUiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')] rounded-2xl opacity-50" />,
      className: "bg-transparent border-gray-200 z-[57]"
    },
    {
      name: "Gegen-Elektrode",
      desc: "Gemeinsamer elektrischer Pol",
      side: "left",
      content: <div className="absolute inset-0 bg-gray-100/10 rounded-2xl border border-gray-250" />,
      className: "bg-transparent border-gray-200 z-[56]"
    },
    {
      name: "Flüssigkristall",
      desc: "Steuert die Lichtdurchlässigkeit",
      side: "right",
      content: <div className="absolute inset-0 bg-gradient-to-b from-brand-500/10 to-brand-600/10 rounded-2xl backdrop-blur-md" />,
      className: "bg-transparent border-brand-200 z-[55]"
    },
    {
      name: "Transistor (TFT)",
      desc: "Aktive Matrix zur Pixelsteuerung",
      side: "left",
      content: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xMCAxMGgxMHYxMEgxMHoiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] rounded-2xl" />,
      className: "bg-white/90 border-gray-300 z-[54]"
    },
    {
      name: "Pixel-Elektrode",
      desc: "Individuelle Pixel-Ansteuerung",
      side: "right",
      content: <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMikiLz48L3N2Zz4=')] rounded-2xl" />,
      className: "bg-transparent border-gray-200 z-[53]"
    },
    {
      name: "Rear-Polarisator",
      desc: "Polarisiert das Hintergrundlicht",
      side: "left",
      content: <div className="absolute inset-0 bg-slate-900/90 rounded-2xl" />,
      className: "bg-transparent border-slate-700 z-[52]"
    },
    {
      name: "Beleuchtung",
      desc: "LED-Hintergrundbeleuchtung",
      side: "right",
      content: <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.9)]" />,
      className: "bg-white border-gray-200 z-[51]"
    },
  ];

  // Tooltips
  const tooltipsOpacity = useTransform(explosionProgress, [0.3, 0.6], [0, 1]);

  const layerStyle = "absolute w-64 md:w-96 aspect-[4/3] rounded-2xl border flex items-center justify-center transition-shadow duration-300";

  return (
    <motion.div
      style={{ opacity: explosionOpacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[2000px]"
    >
      <div className="relative w-full max-w-4xl flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>

        {/* Tooltips */}
        {layersData.map((layer, i) => (
          <motion.div
            key={`tooltip-${i}`}
            style={{ x: transforms[i].x, y: transforms[i].y, opacity: tooltipsOpacity }}
            className={`absolute z-[60] w-40 md:w-56 ${layer.side === 'left' ? 'mr-[13rem] md:mr-[22rem] text-right right-1/2' : 'ml-[13rem] md:ml-[22rem] left-1/2'}`}
          >
            <div className="hidden md:block h-[1px] w-8 bg-brand-600 absolute top-4 opacity-50" style={{ [layer.side === 'left' ? 'right' : 'left']: '-2rem' }} />
            <div className="bg-white/95 backdrop-blur-xl p-3 rounded-xl border border-gray-200 shadow-xl">
              <h3 className="text-brand-700 font-bold text-[10px] md:text-xs uppercase tracking-wider">{layer.name}</h3>
              <p className="text-gray-600 text-[9px] md:text-[10px] mt-1 leading-tight">{layer.desc}</p>
            </div>
          </motion.div>
        ))}

        {/* Layers */}
        {layersData.map((layer, i) => (
          <motion.div
            key={`layer-${i}`}
            style={{ x: transforms[i].x, y: transforms[i].y, rotateX: 60, rotateZ: -45 }}
            className={`${layerStyle} ${layer.className}`}
          >
            {layer.content}
          </motion.div>
        ))}

      </div>
    </motion.div>
  );
}
