"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full glass-panel border border-border/80 shadow-lg text-foreground hover:text-primary hover:border-primary/50 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring animate-in fade-in slide-in-from-bottom-4"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
