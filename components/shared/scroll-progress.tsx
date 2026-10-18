"use client";

import * as React from "react";

export function ScrollProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setProgress(scrollPercent);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-blue-500 to-cyan-400 transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
