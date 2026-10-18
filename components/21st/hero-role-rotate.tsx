"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroRoleRotateProps {
  roles: string[];
  activeIndex: number;
  onRoleChange: (index: number) => void;
  holdDuration?: number; // ms to hold static
  transitionDuration?: number; // seconds
  className?: string;
}

export function HeroRoleRotate({
  roles,
  activeIndex,
  onRoleChange,
  holdDuration = 2800,
  transitionDuration = 0.5,
  className,
}: HeroRoleRotateProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Transition variants: vertical slot-slide with blur
  // cubic-bezier(0.22, 1, 0.36, 1)
  const variants: Variants = {
    initial: {
      y: "100%",
      opacity: 0,
      filter: "blur(6px)",
    },
    animate: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: transitionDuration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      filter: "blur(6px)",
      transition: {
        duration: transitionDuration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Pause when document is hidden (switching tabs)
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Timer loop for rotating roles
  React.useEffect(() => {
    // Under reduced motion: lock to first role statically, no rotation
    if (prefersReducedMotion) {
      if (activeIndex !== 0) onRoleChange(0);
      return;
    }

    if (isPaused) return;

    const timer = setTimeout(() => {
      onRoleChange((activeIndex + 1) % roles.length);
    }, holdDuration);

    return () => clearTimeout(timer);
  }, [activeIndex, isPaused, holdDuration, roles.length, prefersReducedMotion, onRoleChange]);

  const currentRole = roles[activeIndex] || roles[0];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0}
      aria-hidden="true"
      className={cn(
        "group relative flex flex-col items-center justify-center text-center select-none outline-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl py-1",
        className
      )}
    >
      {/* Reserved height slot container sized to prevent layout shift */}
      <div className="relative w-full max-w-2xl h-[3rem] sm:h-[3.5rem] md:h-[4rem] flex items-center justify-center overflow-hidden">
        {prefersReducedMotion ? (
          <span
            className="font-display font-semibold tracking-tight text-center bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(56,189,248,0.3)] leading-tight px-2"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.75rem)" }}
          >
            {roles[0]}
          </span>
        ) : (
          <AnimatePresence mode="wait">
            <motion.span
              key={currentRole}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute font-display font-semibold tracking-tight text-center bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(56,189,248,0.3)] leading-tight px-2 inline-block"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.75rem)" }}
            >
              {currentRole}
            </motion.span>
          </AnimatePresence>
        )}
      </div>

      {/* 2px progress bar that fills over the 2800ms hold duration */}
      {!prefersReducedMotion && (
        <div
          className="mt-2 w-32 sm:w-44 h-[2px] rounded-full bg-border/50 overflow-hidden relative"
          aria-hidden="true"
        >
          <motion.div
            key={`${activeIndex}-${isPaused}`}
            initial={{ scaleX: 0 }}
            animate={isPaused ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{
              duration: holdDuration / 1000,
              ease: "linear",
            }}
            className="h-full w-full bg-gradient-to-r from-blue-500 to-cyan-400 origin-left opacity-75 dark:opacity-90"
          />
        </div>
      )}
    </div>
  );
}
