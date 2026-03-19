"use client";

/**
 * FadeIn
 *
 * Scroll-triggered fade + drift-up animation.
 * - Fires once when the element enters the viewport (viewport: { once: true })
 * - Respects prefers-reduced-motion via the `reducedMotion` prop on MotionConfig
 * - delay: stagger individual items in a list (in seconds)
 * - amount: how much of the element must be visible before animating (0–1)
 */

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  amount?: number;
  className?: string;
  /** Override the drift distance in px. Default 24. */
  distance?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  amount = 0.15,
  className,
  distance = 24,
}: FadeInProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: shouldReduce ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: shouldReduce ? 0.01 : duration,
        delay: shouldReduce ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart — smooth deceleration
      }}
    >
      {children}
    </motion.div>
  );
}
