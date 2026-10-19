"use client";

import * as React from "react";
import { useInView, useReducedMotion, type UseInViewOptions, type Variants } from "framer-motion";

/**
 * Shared motion system configuration and tokens
 * Follows cubic-bezier(0.22, 1, 0.36, 1) and standardized durations/staggers.
 */
export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
export const MOTION_TRANSITION = {
  duration: 0.6,
  ease: MOTION_EASE,
};

export const SPRING_NAV = {
  type: "spring",
  stiffness: 380,
  damping: 32,
} as const;

export const DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.7,
  reduced: 0.15,
} as const;

export const STAGGERS = {
  desktop: 0.08,
  mobile: 0.04,
  fastDesktop: 0.04,
  fastMobile: 0.02,
} as const;

/**
 * Custom hook providing an in-view boolean with a 1.5s safety fallback
 * and reduced motion support. Content will never remain hidden.
 */
export function useSafeInView(
  ref: React.RefObject<Element | null>,
  options?: UseInViewOptions
): boolean {
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: true,
    amount: 0.15,
    margin: "0px",
    ...options,
  });

  const [fallbackTriggered, setFallbackTriggered] = React.useState(false);

  React.useEffect(() => {
    // 1.5s safety fallback: guarantee content visibility even if IntersectionObserver fails
    const timer = setTimeout(() => {
      setFallbackTriggered(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return Boolean(prefersReducedMotion || isInView || fallbackTriggered);
}

/**
 * Hook to detect pointer-fine desktop devices vs touch
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = React.useState(true);

  React.useEffect(() => {
    const media = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

/**
 * Shared motion variants
 */
export const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: MOTION_EASE,
    },
  },
};

export const revealVariantsMobile: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: MOTION_EASE,
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: (custom?: { staggerDelay?: number; delayChildren?: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom?.staggerDelay ?? STAGGERS.desktop,
      delayChildren: custom?.delayChildren ?? 0,
    },
  }),
};

export const maskedLineVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: MOTION_EASE,
    },
  },
};

export const cardFlipVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 20,
    transformOrigin: "bottom center",
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.65,
      ease: MOTION_EASE,
    },
  },
};
