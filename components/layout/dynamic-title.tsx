"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { SECTIONS, DEFAULT_SECTION_ID } from "@/data/sections";

export function DynamicTitle() {
  const pathname = usePathname();
  const activeSectionId = useActiveSection();

  React.useEffect(() => {
    // Only manage dynamic title and hash on the home page route ("/")
    // Sub-routes (/projects/[slug]) and 404 pages are governed by Next.js static metadata
    if (pathname !== "/") return;

    const sectionMeta =
      SECTIONS[activeSectionId] || SECTIONS[DEFAULT_SECTION_ID];
    const targetTitle = sectionMeta.title;
    const targetHash = sectionMeta.hash;

    const timer = setTimeout(() => {
      // Set document.title only when the value actually changes (avoid flicker and redundant DOM writes)
      if (document.title !== targetTitle) {
        document.title = targetTitle;
      }

      // Update URL hash with history.replaceState (skip for hero to keep clean "/")
      if (typeof window !== "undefined") {
        if (activeSectionId === "hero") {
          if (window.location.hash) {
            window.history.replaceState(null, "", window.location.pathname);
          }
        } else if (targetHash) {
          if (window.location.hash !== targetHash) {
            window.history.replaceState(null, "", targetHash);
          }
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, activeSectionId]);

  return null;
}
