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
      {/* Reserved height slot container: dynamic CSS grid auto-sizes to tallest role without layout shift */}
      <div
        className="relative w-full max-w-2xl grid grid-cols-1 grid-rows-1 items-center justify-center overflow-hidden"
        style={{ paddingBlock: "0.16em", marginBlock: "-0.16em" }}
      >
        {/* Ghost measuring layer: all roles stacked in cell (1, 1).
            Dynamically fits the tallest wrapped role with zero layout shift */}
        <div
          className="col-start-1 row-start-1 grid grid-cols-1 grid-rows-1 items-center justify-center invisible select-none pointer-events-none"
          aria-hidden="true"
        >
          {roles.map((role) => (
            <span
              key={role}
              className="col-start-1 row-start-1 font-display font-semibold tracking-tight text-center leading-[1.25] pb-[0.14em] px-2 text-balance [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
              style={{ fontSize: "clamp(1.35rem, 3.8vw, 2.6rem)" }}
            >
              {role}
            </span>
          ))}
        </div>

        {/* Active role layer */}
        <div className="col-start-1 row-start-1 flex items-center justify-center w-full">
          {prefersReducedMotion ? (
            <span
              className="font-display font-semibold tracking-tight text-center bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(56,189,248,0.3)] leading-[1.25] pb-[0.14em] px-2 text-balance [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
              style={{ fontSize: "clamp(1.35rem, 3.8vw, 2.6rem)" }}
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
                className="font-display font-semibold tracking-tight text-center bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(56,189,248,0.3)] leading-[1.25] pb-[0.14em] px-2 inline-block text-balance [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
                style={{ fontSize: "clamp(1.35rem, 3.8vw, 2.6rem)" }}
              >
                {currentRole}
              </motion.span>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* 2px progress bar that fills over the 2800ms hold duration */}
      {!prefersReducedMotion && (
        <div
          className="mt-3 w-32 sm:w-44 h-[2px] rounded-full bg-border/50 overflow-hidden relative"
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
