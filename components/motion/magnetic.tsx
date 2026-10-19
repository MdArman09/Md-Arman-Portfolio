"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsDesktop } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  maxDistance?: number;
  className?: string;
}

export function Magnetic({
  children,
  maxDistance = 6,
  className,
}: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !isDesktop || prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Limit to maxDistance (6px default)
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance === 0) return;
    const pull = Math.min(distance, maxDistance);
    const x = (deltaX / distance) * pull;
    const y = (deltaY / distance) * pull;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (!isDesktop || prefersReducedMotion) {
    return <div className={cn("inline-block", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
