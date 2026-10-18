"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface HeroBackgroundProps {
  activeRoleIndex: number;
}

export function HeroBackground({ activeRoleIndex }: HeroBackgroundProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 w-full h-full overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Subtle Dot Grid with Centered Radial Mask (hidden/light on mobile) */}
      <div
        className="hidden sm:block absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(rgba(148, 163, 184, 0.45) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* 2. Symmetric Side Glows (Mirror-image placed at left 12% and right 12%) */}
      {/* Left Glow (Accent Blue) */}
      <div
        className={cn(
          "absolute left-[10%] sm:left-[12%] top-[34%] -translate-x-1/2 -translate-y-1/2",
          "w-[220px] sm:w-[320px] md:w-[440px] h-[220px] sm:h-[320px] md:h-[440px]",
          "rounded-full blur-[70px] md:blur-[110px]",
          "bg-blue-500/10 dark:bg-blue-500/16",
          "animate-orb-left motion-reduce:animate-none"
        )}
      />

      {/* Right Glow (Accent Cyan) */}
      <div
        className={cn(
          "absolute right-[10%] sm:right-[12%] top-[44%] translate-x-1/2 -translate-y-1/2",
          "w-[220px] sm:w-[320px] md:w-[440px] h-[220px] sm:h-[320px] md:h-[440px]",
          "rounded-full blur-[70px] md:blur-[110px]",
          "bg-cyan-500/10 dark:bg-cyan-400/16",
          "animate-orb-right motion-reduce:animate-none"
        )}
      />

      {/* 3. Center Aura (~900px by 600px, 50% / 38%, cross-fades per role over 600ms) */}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 animate-orb-center motion-reduce:animate-none">
        {/* Role 0: SDE (Blue / Cyan) */}
        <div
          className={cn(
            "w-[320px] sm:w-[540px] md:w-[880px] lg:w-[920px] h-[300px] sm:h-[420px] md:h-[580px] lg:h-[620px]",
            "rounded-full blur-[80px] md:blur-[120px] transition-opacity duration-600 ease-in-out motion-reduce:transition-none",
            "bg-gradient-to-tr from-blue-600/15 via-cyan-500/12 to-blue-400/10 dark:from-blue-600/32 dark:via-cyan-400/26 dark:to-sky-500/18",
            activeRoleIndex === 0 ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Role 1: MERN (Teal / Emerald) */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "rounded-full blur-[80px] md:blur-[120px] transition-opacity duration-600 ease-in-out motion-reduce:transition-none",
            "bg-gradient-to-tr from-emerald-600/15 via-teal-500/12 to-cyan-400/10 dark:from-emerald-500/32 dark:via-teal-400/26 dark:to-emerald-400/18",
            activeRoleIndex === 1 ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Role 2: SAP ABAP (Violet-Blue / Indigo) */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "rounded-full blur-[80px] md:blur-[120px] transition-opacity duration-600 ease-in-out motion-reduce:transition-none",
            "bg-gradient-to-tr from-indigo-600/15 via-blue-600/12 to-violet-500/10 dark:from-indigo-500/32 dark:via-blue-500/26 dark:to-indigo-400/18",
            activeRoleIndex === 2 ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      {/* 4. Vignettes & Edge Transitions (Blends smoothly into navbar, page edges & next section) */}
      {/* Top fade */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-background via-background/60 to-transparent" />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-background via-background/70 to-transparent" />

      {/* Perimeter edge vignette */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 50%, hsl(var(--background)) 100%)",
          opacity: 0.85,
        }}
      />
    </div>
  );
}
