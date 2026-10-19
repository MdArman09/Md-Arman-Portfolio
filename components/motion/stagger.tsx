"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSafeInView, MOTION_EASE, STAGGERS, DURATIONS } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
}

export function Stagger({
  children,
  staggerDelay = STAGGERS.desktop,
  delayChildren = 0,
  className,
  ...props
}: StaggerProps) {
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

  const actualStagger = isMobile ? staggerDelay * 0.5 : staggerDelay;

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} {...props}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: actualStagger,
              delayChildren,
            },
          },
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export function StaggerItem({
  children,
  className,
  yOffset = 20,
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: DURATIONS.normal,
            ease: MOTION_EASE,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
