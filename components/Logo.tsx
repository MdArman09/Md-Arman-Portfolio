"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ROLE_COLORS, useGlobalRoleIndex } from "@/lib/role-store";

export interface LogoProps {
  /** Size in pixels for the mark (e.g. 24, 32, 40). Defaults to 32. */
  size?: number;
  /** Whether to render the 'Arman.dev' wordmark alongside the mark. Defaults to true. */
  showWordmark?: boolean;
  /** Whether to wrap the component in an accessible link to '/'. Defaults to true. */
  asLink?: boolean;
  /** Optional additional classes on the outer wrapper. */
  className?: string;
  /** Optional click handler. */
  onClick?: () => void;
}

export function Logo({
  size = 32,
  showWordmark = true,
  asLink = true,
  className,
  onClick,
}: LogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const activeRoleIndex = useGlobalRoleIndex();
  const activeRole = ROLE_COLORS[activeRoleIndex] || ROLE_COLORS[0];

  // Unique ID for SVG gradients to prevent DOM collisions
  const reactId = React.useId();
  const gradId = React.useMemo(() => `logo-grad-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`, [reactId]);

  // One-time 600ms stroke-draw animation on mount
  const strokeVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.6, ease: "easeOut" },
        opacity: { duration: 0.2 },
      },
    },
  };

  const markContent = (
    <motion.div
      variants={{
        idle: { scale: 1 },
        hover: { scale: prefersReducedMotion ? 1 : 1.05 },
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative flex items-center justify-center shrink-0 select-none"
      style={{ width: size, height: size }}
    >
      {/* Soft radial glow on hover (opacity only, 200ms) */}
      <motion.div
        variants={{
          idle: { opacity: 0 },
          hover: { opacity: prefersReducedMotion ? 0 : 0.85 },
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-500/35 via-cyan-400/25 to-sky-400/20 blur-md pointer-events-none"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 36 36"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible relative z-10"
        aria-hidden="true"
      >
        <defs>
          {/* Accent gradient: Primary Blue to Vibrant Cyan from existing tokens */}
          <linearGradient id={gradId} x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          {/* Subtle soft glow filter for the accent dot */}
          <filter id={`${gradId}-dot-glow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Geometric Letter "A" outer legs with rounded joins */}
        <motion.path
          d="M 8 28.5 L 18 7.5 L 28 28.5"
          stroke={`url(#${gradId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={prefersReducedMotion ? undefined : strokeVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
        />

        {/* 2. Code Chevron ">" Crossbar: nudges 2px right on hover */}
        <motion.path
          d="M 13.5 15 L 19.5 18.5 L 13.5 22"
          stroke={`url(#${gradId})`}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            idle: { x: 0 },
            hover: { x: prefersReducedMotion ? 0 : 2 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />

        {/* 3. Small Accent Dot at Top-Right: color follows active hero role with 400ms cross-fade */}
        <circle
          cx="28"
          cy="7.5"
          r="2.25"
          fill={prefersReducedMotion ? ROLE_COLORS[0].color : activeRole.color}
          filter={`url(#${gradId}-dot-glow)`}
          style={{
            transition: prefersReducedMotion ? "none" : "fill 400ms ease",
          }}
        />
      </svg>
    </motion.div>
  );

  const wordmarkContent = showWordmark ? (
    <span className="font-display font-semibold text-sm tracking-tight text-foreground select-none hidden sm:inline-block">
      Arman
      <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent font-bold">
        .dev
      </span>
    </span>
  ) : null;

  const innerContent = (
    <motion.div
      initial="idle"
      animate="idle"
      whileHover="hover"
      whileFocus="hover"
      className={cn(
        "inline-flex items-center gap-2 sm:gap-2.5 cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      {markContent}
      {wordmarkContent}
    </motion.div>
  );

  if (!asLink) {
    return innerContent;
  }

  return (
    <Link
      href="/"
      className="inline-flex items-center rounded-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-shadow"
      aria-label="Arman.dev, home"
    >
      {innerContent}
    </Link>
  );
}
