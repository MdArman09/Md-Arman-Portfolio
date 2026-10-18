"use client";

import * as React from "react";

export function GridBackground({ children }: { children?: React.ReactNode }) {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    if (!hasMoved) setHasMoved(true);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40 dark:opacity-25"
        style={{
          backgroundImage: `radial-gradient(rgba(100, 116, 139, 0.25) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Mouse spotlight reveal */}
      {hasMoved && (
        <div
          className="pointer-events-none absolute -z-10 h-full w-full transition-opacity duration-300 hidden md:block"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, hsla(var(--primary) / 0.08), transparent 80%)`,
          }}
        />
      )}

      {children}
    </div>
  );
}
