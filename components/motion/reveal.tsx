"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSafeInView, MOTION_EASE, DURATIONS } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: boolean;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  duration = DURATIONS.normal,
  yOffset = 24,
  blur = true,
  className,
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useSafeInView(ref);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const actualY = isMobile ? Math.min(yOffset, 16) : yOffset;
  const actualBlur = isMobile ? false : blur;
  const actualDelay = isMobile ? delay * 0.5 : delay;

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <motion.div
        initial={false}
        animate={
          isInView || prefersReducedMotion
            ? {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }
            : {
                opacity: 0,
                y: actualY,
                filter: actualBlur ? "blur(6px)" : "blur(0px)",
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration,
                delay: actualDelay,
                ease: MOTION_EASE,
              }
        }
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
