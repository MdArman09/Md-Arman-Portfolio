"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSafeInView, MOTION_EASE, DURATIONS } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useSafeInView(ref, { amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn("w-full h-px bg-border/50", className)}
      />
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("w-full h-px overflow-hidden relative", className)}
    >
      <motion.div
        initial={false}
        animate={
          isInView
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{
          duration: DURATIONS.slow,
          ease: MOTION_EASE,
        }}
        style={{ originX: 0 }}
        className="w-full h-full bg-border/50"
      />
    </div>
  );
}
