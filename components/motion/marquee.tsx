"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-3 select-none pointer-events-auto [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
        className
      )}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-4">
        {[...items, ...items, ...items].map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium border border-border/50 bg-muted/20 text-muted-foreground whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
