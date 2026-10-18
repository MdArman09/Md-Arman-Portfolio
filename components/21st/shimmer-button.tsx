"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 font-semibold text-sm transition-all duration-300 cursor-pointer shadow-lg active:scale-95",
          "bg-primary text-primary-foreground hover:bg-primary/95",
          className
        )}
        {...props}
      >
        {/* Shimmer light bar */}
        <span
          className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
