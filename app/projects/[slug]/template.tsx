"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MOTION_EASE } from "@/lib/motion";

export default function ProjectTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        ease: MOTION_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
