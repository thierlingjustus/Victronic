import React from 'react';
import { motion } from 'motion/react';

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  /** true: erst einblenden, wenn das Element in den Viewport scrollt; false: sofort beim Mount */
  inView?: boolean;
};

export default function FadeIn({ children, delay = 0, inView = false }: FadeInProps) {
  const reveal = inView
    ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-100px' } as const }
    : { animate: { opacity: 1, y: 0 } };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      {...reveal}
    >
      {children}
    </motion.div>
  );
}
