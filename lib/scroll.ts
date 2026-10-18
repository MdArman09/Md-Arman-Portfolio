"use client";

/**
 * Shared scroll utility for navigating to sections with exact offset
 * below the fixed floating navbar.
 */

export function getNavOffset(): number {
  if (typeof window === "undefined") return 88;
  const nav =
    document.querySelector<HTMLElement>("header nav") ||
    document.querySelector<HTMLElement>("header");
  if (nav) {
    const rect = nav.getBoundingClientRect();
    return Math.round(rect.bottom);
  }
  return window.innerWidth >= 640 ? 88 : 76;
}

export interface ScrollToSectionOptions {
  instant?: boolean;
  updateHistory?: boolean;
  onComplete?: () => void;
}

export function scrollToSection(
  sectionIdOrHash: string,
  options?: ScrollToSectionOptions
): boolean {
  if (typeof window === "undefined") return false;

  const raw = sectionIdOrHash.replace("/#", "").replace("#", "").trim();
  const sectionId = raw.toLowerCase();

  // If scrolling to hero / top / empty
  if (sectionId === "hero" || sectionId === "" || sectionId === "top") {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const behavior = options?.instant || prefersReducedMotion ? "auto" : "smooth";

    window.scrollTo({ top: 0, behavior });

    if (options?.updateHistory !== false) {
      try {
        if (window.location.hash) {
          window.history.pushState(null, "", window.location.pathname);
        }
      } catch {}
    }

    window.dispatchEvent(
      new CustomEvent("nav-section-click", { detail: "hero" })
    );

    options?.onComplete?.();
    return true;
  }

  const sectionEl = document.getElementById(sectionId);
  if (!sectionEl) return false;

  // Prefer data-scroll-target (the actual content header / pill), fallback to section element
  const targetEl =
    sectionEl.querySelector<HTMLElement>("[data-scroll-target]") || sectionEl;

  const navOffset = getNavOffset();
  // 18px consistent gap between navbar bottom and the section label pill (within 16-24px specification)
  const targetGap = 18;
  const elementTop = targetEl.getBoundingClientRect().top;
  const targetScrollTop = Math.max(
    0,
    Math.round(elementTop + window.scrollY - navOffset - targetGap)
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const behavior = options?.instant || prefersReducedMotion ? "auto" : "smooth";

  window.scrollTo({
    top: targetScrollTop,
    behavior,
  });

  // Update history cleanly without causing native jump
  if (options?.updateHistory !== false) {
    try {
      const newHash = `#${sectionId}`;
      if (window.location.hash !== newHash) {
        window.history.pushState(null, "", newHash);
      }
    } catch {}
  }

  // Notify listeners (navbar blue highlight, dynamic tab title)
  window.dispatchEvent(
    new CustomEvent("nav-section-click", { detail: sectionId })
  );

  // Layout shift correction & accessibility focus
  const finalizeScroll = () => {
    if (!targetEl || !document.body.contains(targetEl)) return;

    // Measure drift after smooth scroll
    const currentNavOffset = getNavOffset();
    const currentTop = targetEl.getBoundingClientRect().top;
    const expectedTop = currentNavOffset + targetGap;
    const delta = currentTop - expectedTop;

    // If drifted by more than 2px (due to layout shift / image loading), correct instantly
    if (Math.abs(delta) > 2) {
      window.scrollBy({ top: delta, behavior: "auto" });
    }

    // Keyboard accessibility: move focus to heading
    const heading = targetEl.querySelector<HTMLElement>("h1, h2, h3") || targetEl;
    if (heading) {
      if (!heading.hasAttribute("tabindex")) {
        heading.setAttribute("tabindex", "-1");
      }
      heading.focus({ preventScroll: true });
    }

    options?.onComplete?.();
  };

  if (behavior === "smooth") {
    let settled = false;
    const handleScrollEnd = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener("scrollend", handleScrollEnd);
      finalizeScroll();
    };

    if ("onscrollend" in window) {
      window.addEventListener("scrollend", handleScrollEnd, { once: true });
    }

    // Fallback timer in case scrollend doesn't fire or completes early
    setTimeout(() => {
      if (!settled) {
        settled = true;
        window.removeEventListener("scrollend", handleScrollEnd);
        finalizeScroll();
      }
    }, 700);
  } else {
    // Instant execution
    requestAnimationFrame(finalizeScroll);
  }

  return true;
}
