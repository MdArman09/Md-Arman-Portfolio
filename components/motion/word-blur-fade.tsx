"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSafeInView, MOTION_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface WordBlurFadeProps {
  text: string;
  className?: string;
  delay?: number;
}

export function WordBlurFade({ text, className, delay = 0 }: WordBlurFadeProps) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const isInView = useSafeInView(ref);
  const prefersReducedMotion = useReducedMotion();
  const words = React.useMemo(() => text.split(" "), [text]);

  // Calculate per-word stagger capped to keep total duration well under 900ms
  const stagger = Math.min(0.02, 0.5 / Math.max(words.length, 1));

  return (
    <p ref={ref} className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={false}
          animate={
            isInView || prefersReducedMotion
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(4px)", y: 6 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 0.28,
                  delay: delay + i * stagger,
                  ease: MOTION_EASE,
                }
          }
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
