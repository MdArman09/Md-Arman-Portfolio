"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SlideInCardProps {
  children: React.ReactNode;
  /** Zero-based index of the card in the sequence for stagger timing */
  index: number;
  /** Slide direction: 'right' (default, slides from right to left) or 'left' */
  direction?: "right" | "left";
  /** Slide distance on desktop (>=768px). Defaults to 80px */
  desktopDistance?: number;
  /** Slide distance on mobile (<768px). Defaults to 40px */
  mobileDistance?: number;
  /** Animation duration in seconds. Defaults to 0.6s (600ms) */
  duration?: number;
  /** Delay step per item on desktop. Defaults to 0.18s (180ms) */
  desktopDelayStep?: number;
  /** Delay step per item on mobile. Defaults to 0.10s (100ms) */
  mobileDelayStep?: number;
  /** Optional class name */
  className?: string;
}

export function SlideInCard({
  children,
  index,
  direction = "right",
  desktopDistance = 80,
  mobileDistance = 40,
  duration = 0.6,
  desktopDelayStep = 0.18,
  mobileDelayStep = 0.1,
  className,
}: SlideInCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const distance = isMobile ? mobileDistance : desktopDistance;
  const delayStep = isMobile ? mobileDelayStep : desktopDelayStep;
  const initialX = direction === "right" ? distance : -distance;
  const delay = prefersReducedMotion ? 0 : index * delayStep;

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: initialX }
      }
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
        margin: "-80px",
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
}
