"use client";

import * as React from "react";
import { useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useSafeInView } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  duration?: number;
  className?: string;
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  duration = 1.2,
  className,
}: NumberTickerProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useSafeInView(ref);
  const prefersReducedMotion = useReducedMotion();

  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: duration * 1000,
  });

  const [displayValue, setDisplayValue] = React.useState(
    direction === "down" ? value.toFixed(decimalPlaces) : (0).toFixed(decimalPlaces)
  );

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value.toFixed(decimalPlaces));
      return;
    }

    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay, value, direction, motionValue, prefersReducedMotion, decimalPlaces]);

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Number(latest.toFixed(decimalPlaces)).toFixed(decimalPlaces));
    });

    return () => unsubscribe();
  }, [springValue, decimalPlaces, prefersReducedMotion]);

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums tracking-normal [font-variant-numeric:tabular-nums]", className)}
    >
      {prefersReducedMotion ? value.toFixed(decimalPlaces) : displayValue}
    </span>
  );
}
