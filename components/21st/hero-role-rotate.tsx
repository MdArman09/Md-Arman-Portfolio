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
  const isMouseHoveredRef = React.useRef(false);

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

  // Visibility & page lifecycle: pause when hidden, resume on visible, focus, or pageshow
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        if (!isMouseHoveredRef.current) {
          setIsPaused(false);
        }
      }
    };

    const handleResume = () => {
      if (!document.hidden && !isMouseHoveredRef.current) {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleResume);
    window.addEventListener("pageshow", handleResume);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleResume);
      window.removeEventListener("pageshow", handleResume);
    };
  }, []);

  // Safety net watchdog: if paused for > 3500ms while not genuinely hovered by a fine mouse, auto-resume
  React.useEffect(() => {
    if (!isPaused || prefersReducedMotion) return;

    const watchdogTimer = setTimeout(() => {
      const isFinePointer =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      const isStillHovered =
        isFinePointer &&
        Boolean(containerRef.current?.matches(":hover")) &&
        isMouseHoveredRef.current;

      if (!isStillHovered) {
        isMouseHoveredRef.current = false;
        setIsPaused(false);
      }
    }, 3500);

    return () => clearTimeout(watchdogTimer);
  }, [isPaused, prefersReducedMotion]);

  // Timer loop for rotating roles
  React.useEffect(() => {
    // Under reduced motion: lock to first role statically, no rotation
    if (prefersReducedMotion) {
      if (activeIndex !== 0) onRoleChange(0);
      return;
    }

    if (isPaused) return;

    const timer = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % roles.length;
      onRoleChange(nextIndex);
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("portfolio-role-change", { detail: { index: nextIndex } })
        );
      }
    }, holdDuration);

    return () => clearTimeout(timer);
  }, [activeIndex, isPaused, holdDuration, roles.length, prefersReducedMotion, onRoleChange]);

  // Pointer event handlers: strictly gate hover pause to real mouse on fine-pointer devices
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (e.pointerType === "mouse" && isFinePointer) {
      isMouseHoveredRef.current = true;
      setIsPaused(true);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") {
      isMouseHoveredRef.current = false;
      setIsPaused(false);
    }
  };

  const handlePointerCancel = () => {
    isMouseHoveredRef.current = false;
    setIsPaused(false);
  };

  // Keyboard focus handling: only pause for :focus-visible, never for tap focus
  const handleFocus = (e: React.FocusEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && typeof target.matches === "function" && target.matches(":focus-visible")) {
      setIsPaused(true);
    }
  };

  const handleBlur = () => {
    setIsPaused(false);
  };

  const currentRole = roles[activeIndex] || roles[0];

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerCancel}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-hidden="true"
      style={{
        touchAction: "pan-y",
        WebkitTapHighlightColor: "transparent",
      }}
      className={cn(
        "group relative flex flex-col items-center justify-center text-center select-none outline-none rounded-xl py-1 touch-pan-y",
        className
      )}
    >
      {/* Reserved height slot container: dynamic CSS grid auto-sizes to tallest role without layout shift */}
      <div
        className="relative w-full max-w-2xl grid grid-cols-1 grid-rows-1 items-center justify-center overflow-hidden pointer-events-none"
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
              className="col-start-1 row-start-1 font-display font-semibold tracking-tight text-center leading-[1.25] pb-[0.14em] px-2 text-balance hero-role-text [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
            >
              {role}
            </span>
          ))}
        </div>

        {/* Active role layer */}
        <div className="col-start-1 row-start-1 flex items-center justify-center w-full pointer-events-none">
          {prefersReducedMotion ? (
            <span
              className="font-display font-semibold tracking-tight text-center bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(56,189,248,0.3)] leading-[1.25] pb-[0.14em] px-2 text-balance hero-role-text [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
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
                className="font-display font-semibold tracking-tight text-center bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(56,189,248,0.3)] leading-[1.25] pb-[0.14em] px-2 inline-block text-balance hero-role-text [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
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
          className="mt-3 w-32 sm:w-44 h-[2px] rounded-full bg-border/50 overflow-hidden relative pointer-events-none"
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
