"use client";

import * as React from "react";

export interface RoleColor {
  name: string;
  color: string;
  glow: string;
}

export const ROLE_COLORS: RoleColor[] = [
  { name: "Software Development Engineer", color: "#3b82f6", glow: "rgba(59, 130, 246, 0.5)" }, // Blue
  { name: "MERN Developer", color: "#10b981", glow: "rgba(16, 185, 129, 0.5)" }, // Teal / Green
  { name: "SAP ABAP Developer", color: "#8b5cf6", glow: "rgba(139, 92, 246, 0.5)" }, // Violet-Blue
];

export function useGlobalRoleIndex(): number {
  const [roleIndex, setRoleIndex] = React.useState(0);

  React.useEffect(() => {
    let heroFound = false;
    let observer: MutationObserver | null = null;

    const detectRoleFromDOM = () => {
      const heroEl = document.getElementById("hero");
      if (!heroEl) return false;

      heroFound = true;
      const text = heroEl.textContent || "";
      if (text.includes("MERN Developer")) {
        setRoleIndex(1);
      } else if (text.includes("SAP ABAP Developer")) {
        setRoleIndex(2);
      } else if (text.includes("Software Development Engineer")) {
        setRoleIndex(0);
      }
      return true;
    };

    // Initial check
    detectRoleFromDOM();

    // Attach MutationObserver if #hero exists
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      observer = new MutationObserver(() => {
        detectRoleFromDOM();
      });

      observer.observe(heroEl, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    // Also listen to any custom events
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>;
      if (customEvent.detail && typeof customEvent.detail.index === "number") {
        setRoleIndex(customEvent.detail.index);
        heroFound = true;
      }
    };
    window.addEventListener("portfolio-role-change", handleCustomEvent);

    // Idle timer fallback: if on subpages or hero is absent/idle, cycle colors gently
    const idleTimer = setInterval(() => {
      if (!heroFound && !document.getElementById("hero")) {
        setRoleIndex((prev) => (prev + 1) % ROLE_COLORS.length);
      }
    }, 3800);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("portfolio-role-change", handleCustomEvent);
      clearInterval(idleTimer);
    };
  }, []);

  return roleIndex;
}
