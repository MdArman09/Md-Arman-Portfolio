"use client";

import * as React from "react";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="w-9 h-9 rounded-full flex items-center justify-center border border-border/40 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative w-9 h-9 rounded-full flex items-center justify-center border border-border/50 bg-background/80 hover:bg-muted/70 text-foreground transition-all duration-200 cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-ring"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
