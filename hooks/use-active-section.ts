"use client";

import * as React from "react";
import { SECTION_IDS, DEFAULT_SECTION_ID } from "@/data/sections";

export function useActiveSection(sectionIds: string[] = SECTION_IDS): string {
  const [activeSection, setActiveSection] = React.useState<string>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      if (sectionIds.includes(hashId)) {
        return hashId;
      }
    }
    return DEFAULT_SECTION_ID;
  });

  const intersectionRatiosRef = React.useRef<Map<string, number>>(new Map());
  const isClickLockedRef = React.useRef(false);
  const lockTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Fast-scroll & boundary fallback helper
    const resolveActiveByScroll = (): string => {
      if (isClickLockedRef.current) return activeSection;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom check: activate last section (contact) when within 8px of page bottom
      if (viewportHeight + scrollY >= documentHeight - 8) {
        return "contact";
      }

      // Top check: default to hero when at top of page
      if (scrollY <= 80) {
        return "hero";
      }

      // If observer has intersecting sections, pick the one with highest ratio
      let highestRatio = -1;
      let highestId = "";
      for (const [id, ratio] of intersectionRatiosRef.current.entries()) {
        if (ratio > highestRatio) {
          highestRatio = ratio;
          highestId = id;
        }
      }

      if (highestId && highestRatio > 0) {
        return highestId;
      }

      // Fast-scroll fallback: find section spanning middle of viewport
      const middleY = scrollY + viewportHeight * 0.48;
      let matchedId = DEFAULT_SECTION_ID;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (middleY >= top && middleY <= top + height) {
            matchedId = id;
            break;
          } else if (top <= middleY) {
            matchedId = id;
          }
        }
      }

      return matchedId || DEFAULT_SECTION_ID;
    };

    // IntersectionObserver with rootMargin: "-45% 0px -50% 0px"
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickLockedRef.current) return;

        for (const entry of entries) {
          const targetId = entry.target.id;
          if (entry.isIntersecting) {
            intersectionRatiosRef.current.set(targetId, entry.intersectionRatio);
          } else {
            intersectionRatiosRef.current.delete(targetId);
          }
        }

        const resolved = resolveActiveByScroll();
        setActiveSection(resolved);
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      }
    );

    // Observe all valid section DOM elements
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    }

    // Scroll listener for fast scrolls and boundary edge conditions
    const handleScroll = () => {
      if (isClickLockedRef.current) return;
      const resolved = resolveActiveByScroll();
      setActiveSection(resolved);
    };

    // Hash navigation listener (clicking navbar links, back/forward)
    const handleHashSync = () => {
      if (window.location.hash) {
        const hashId = window.location.hash.replace("#", "");
        if (sectionIds.includes(hashId)) {
          setActiveSection(hashId);
          return;
        }
      }
      handleScroll();
    };

    // Global nav click event listener: immediately set active and lock during smooth scroll
    const handleSectionClick = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const targetId = customEvent.detail;
      if (targetId && sectionIds.includes(targetId)) {
        isClickLockedRef.current = true;
        if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
        setActiveSection(targetId);
        lockTimeoutRef.current = setTimeout(() => {
          isClickLockedRef.current = false;
        }, 900);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashSync);
    window.addEventListener("popstate", handleHashSync);
    window.addEventListener("nav-section-click", handleSectionClick);

    // Initial check on mount
    handleHashSync();

    return () => {
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("hashchange", handleHashSync);
      window.removeEventListener("popstate", handleHashSync);
      window.removeEventListener("nav-section-click", handleSectionClick);
    };
  }, [sectionIds, activeSection]);

  return activeSection;
}
