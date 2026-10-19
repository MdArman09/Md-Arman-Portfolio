"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSafeInView, MOTION_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrowIcon: React.ReactNode;
  eyebrowText: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  subtitleMaxWidth?: string;
  rightAction?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrowIcon,
  eyebrowText,
  title,
  subtitle,
  subtitleMaxWidth = "max-w-xl",
  rightAction,
  className,
  align = "left",
}: SectionHeaderProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useSafeInView(ref);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      data-scroll-target
      className={cn(
        rightAction
          ? "flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          : "space-y-2",
        align === "center" ? "text-center sm:text-left" : "",
        className
      )}
    >
      <div className="space-y-2">
        {/* 1. Eyebrow pill fade in */}
        <motion.div
          initial={false}
          animate={
            isInView || prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 8 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 0.45,
                  ease: MOTION_EASE,
                }
          }
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20"
        >
          {eyebrowIcon}
          <span>{eyebrowText}</span>
        </motion.div>

        {/* 2. Heading: masked line slide-up */}
        <div className="overflow-hidden py-0.5">
          <motion.h2
            tabIndex={-1}
            initial={false}
            animate={
              isInView || prefersReducedMotion
                ? { y: 0, opacity: 1 }
                : { y: "100%", opacity: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: 0.55,
                    delay: 0.12,
                    ease: MOTION_EASE,
                  }
            }
            className="font-display font-bold text-3xl sm:text-4xl text-foreground outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            {title}
          </motion.h2>
        </div>

        {/* 3. Subtitle fade in */}
        {subtitle && (
          <motion.p
            initial={false}
            animate={
              isInView || prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: 0.5,
                    delay: 0.24,
                    ease: MOTION_EASE,
                  }
            }
            className={cn("text-muted-foreground text-sm leading-relaxed", subtitleMaxWidth)}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {rightAction && (
        <motion.div
          initial={false}
          animate={
            isInView || prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 0.5,
                  delay: 0.28,
                  ease: MOTION_EASE,
                }
          }
          className="w-full sm:w-auto"
        >
          {rightAction}
        </motion.div>
      )}
    </div>
  );
}
