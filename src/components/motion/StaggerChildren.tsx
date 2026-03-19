"use client";

/**
 * StaggerChildren
 *
 * Wraps a list container and staggers its direct children's fade-in animations.
 * Each child should be wrapped in a FadeIn with an incrementing delay, OR
 * use this component with the `staggerDelay` prop to auto-compute delays.
 *
 * Usage — wrap your grid/list container:
 *   <StaggerChildren staggerDelay={0.1}>
 *     <FadeIn delay={0}> ... </FadeIn>
 *     <FadeIn delay={0.1}> ... </FadeIn>
 *     <FadeIn delay={0.2}> ... </FadeIn>
 *   </StaggerChildren>
 *
 * The container itself fades in the section heading first (delay=0),
 * then children animate in sequence.
 */

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  /** Extra delay before the first child animates (seconds). Default 0. */
  initialDelay?: number;
}

export default function StaggerChildren({
  children,
  className,
  initialDelay = 0,
}: StaggerChildrenProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: initialDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — use inside StaggerChildren instead of FadeIn for auto-stagger.
 */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
