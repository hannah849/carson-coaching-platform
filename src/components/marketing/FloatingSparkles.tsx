"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const COLORS = ["#D1927F", "#E6A57A", "#D1927F", "#E6A57A"];

const StarIcon = ({ size, color }: { size: number; color: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    aria-hidden="true"
  >
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
  </svg>
);

export default function FloatingSparkles({ count = 20, edgesOnly = false }: { count?: number; edgesOnly?: boolean }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generated: Sparkle[] = Array.from({ length: count }, (_, i) => {
      // edgesOnly: left zone 0–18% or right zone 82–100%, y in image band 42–92%
      const isLeft = i % 2 === 0;
      const x = edgesOnly
        ? (isLeft ? Math.random() * 18 : 82 + Math.random() * 18)
        : Math.random() * 96;
      const y = edgesOnly
        ? 42 + Math.random() * 50
        : Math.random() * 96;
      return {
        id: i,
        x,
        y,
        size: Math.random() * 20 + 30,         // 30–50 px
        delay: Math.random() * 1.5,
        duration: Math.random() * 2 + 3,
        color: COLORS[i % 2],
      };
    });
    setSparkles(generated);
  }, [count, edgesOnly]);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      aria-hidden="true"
    >
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ opacity: 0, scale: 0.4, y: 0 }}
          animate={{
            opacity: [0, 0.85, 0.7, 0],
            scale: [0.4, 1.2, 0.9, 0.4],
            y: [0, -20, -40],
            rotate: [0, 20, -15, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        >
          <StarIcon size={s.size} color={s.color} />
        </motion.div>
      ))}
    </div>
  );
}
