import React from 'react';
import { motion } from 'motion/react';

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  /** true: erst einblenden, wenn das Element in den Viewport scrollt; false: sofort beim Mount */
  inView?: boolean;
  /** Richtung, aus der eingeblendet wird. 'up' (Default) entspricht dem bisherigen Verhalten. */
  direction?: 'up' | 'left' | 'right';
};

const DIRECTION_OFFSET = {
  up: { y: 20 },
  left: { x: -40 },
  right: { x: 40 },
};

export default function FadeIn({ children, delay = 0, inView = false, direction = 'up' }: FadeInProps) {
  const offset = DIRECTION_OFFSET[direction];
  const reveal = inView
    ? { whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: true, margin: '-100px' } as const }
    : { animate: { opacity: 1, x: 0, y: 0 } };

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      transition={{ duration: 0.6, delay }}
      {...reveal}
    >
      {children}
    </motion.div>
  );
}
