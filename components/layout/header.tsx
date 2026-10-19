"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { ThemeToggle } from "./theme-toggle";
import { ResumeDropdown } from "@/components/shared/resume-dropdown";
import { Logo } from "@/components/Logo";
import { Search, Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToSection, getNavOffset } from "@/lib/scroll";

export function Header() {
  const prefersReducedMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");
  const isClickScrollingRef = React.useRef(false);
  const clickTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    // 1. Dynamic navbar occupied height measurement via ResizeObserver
    const updateNavOffset = () => {
      const navEl =
        document.querySelector<HTMLElement>("header nav") ||
        document.querySelector<HTMLElement>("header");
      if (navEl) {
        const bottom = Math.round(navEl.getBoundingClientRect().bottom);
        document.documentElement.style.setProperty("--nav-offset", `${bottom}px`);
      }
    };

    updateNavOffset();

    const navEl = document.querySelector<HTMLElement>("header nav");
    let resizeObserver: ResizeObserver | null = null;
    if (navEl && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateNavOffset();
      });
      resizeObserver.observe(navEl);
    }

    // 2. Scroll-spy tracking aligned to data-scroll-target content start
    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      const scrollY = window.scrollY;

      // When near top (hero), clear active section so no nav item is highlighted
      if (scrollY < 180) {
        setActiveSection("");
        return;
      }

      // When near bottom of page, activate last section (contact)
      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 24
      ) {
        setActiveSection("contact");
        return;
      }

      const navOffset = getNavOffset();
      const sections = siteConfig.navItems.map((item) =>
        item.href.replace("/#", "")
      );
      const targetThreshold = scrollY + navOffset + 32;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const targetChild =
            sectionEl.querySelector<HTMLElement>("[data-scroll-target]") ||
            sectionEl;
          const top = targetChild.getBoundingClientRect().top + scrollY;
          if (top <= targetThreshold) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
    };

    // 3. Listen to section clicks from nav links, mobile drawer, command palette
    const handleSectionClickEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const targetId = customEvent.detail;
      if (targetId === "hero" || !targetId) {
        setActiveSection("");
      } else {
        const valid = siteConfig.navItems.some(
          (item) => item.href.replace("/#", "") === targetId
        );
        if (valid) {
          setActiveSection(targetId);
        }
      }
      isClickScrollingRef.current = true;
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      clickTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 950);
    };

    const handleHashSync = () => {
      if (window.location.hash) {
        const hashId = window.location.hash.replace("#", "");
        const valid = siteConfig.navItems.some(
          (item) => item.href.replace("/#", "") === hashId
        );
        if (valid) {
          setActiveSection(hashId);
          return;
        }
      }
      handleScroll();
    };

    // 4. Back / Forward navigation synchronization
    const handlePopState = () => {
      if (window.location.hash) {
        scrollToSection(window.location.hash, { updateHistory: false });
      } else if (window.location.pathname === "/") {
        scrollToSection("hero", { updateHistory: false });
      }
    };

    // 5. Initial load with hash: wait for fonts to settle and re-align
    if (window.location.hash) {
      const initialHash = window.location.hash;
      const alignInitialHash = async () => {
        try {
          if (document.fonts?.ready) {
            await document.fonts.ready;
          }
        } catch {}
        requestAnimationFrame(() => {
          scrollToSection(initialHash, { instant: true, updateHistory: false });
        });
      };
      alignInitialHash();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateNavOffset, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("orientationchange", updateNavOffset, { passive: true });
    window.addEventListener("hashchange", handleHashSync);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("nav-section-click", handleSectionClickEvent);

    const rafId = requestAnimationFrame(() => {
      handleHashSync();
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateNavOffset);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("orientationchange", updateNavOffset);
      window.removeEventListener("hashchange", handleHashSync);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("nav-section-click", handleSectionClickEvent);
    };
  }, []);

  const scrollYRef = React.useRef(0);

  // 6. Lock background scrolling when mobile navigation drawer is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      scrollYRef.current = scrollY;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
        }
      };

      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setMobileMenuOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", handleResize);

      return () => {
        if (document.body.style.position === "fixed") {
          document.body.style.position = "";
          document.body.style.top = "";
          document.body.style.left = "";
          document.body.style.right = "";
          document.body.style.width = "";
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
          window.scrollTo(0, scrollY);
        }
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [mobileMenuOpen]);

  const openPalette = () => {
    if (document.body.style.position === "fixed") {
      const savedScrollY = scrollYRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, savedScrollY);
    }
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();

      // Immediately turn clicked item active blue
      setActiveSection(sectionId);

      // Lock scroll-spy listener during smooth scroll
      isClickScrollingRef.current = true;
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      clickTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 950);

      // Restore scroll lock immediately before calculating section offset and scrolling
      if (document.body.style.position === "fixed") {
        const savedScrollY = scrollYRef.current;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        window.scrollTo(0, savedScrollY);
      }

      // Close mobile drawer
      setMobileMenuOpen(false);

      // Scroll to section content start using shared utility
      requestAnimationFrame(() => {
        scrollToSection(sectionId);
      });
    } else {
      if (document.body.style.position === "fixed") {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
      setMobileMenuOpen(false);
    }
  };

  const handleLogoClick = (e?: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      if (e) e.preventDefault();
      setActiveSection("");
      isClickScrollingRef.current = true;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 850);

      if (document.body.style.position === "fixed") {
        const savedScrollY = scrollYRef.current;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        window.scrollTo(0, savedScrollY);
      }

      setMobileMenuOpen(false);
      requestAnimationFrame(() => {
        scrollToSection("hero");
      });
    }
  };

  return (
    <>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-hidden focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <header className="fixed top-3 sm:top-5 inset-x-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none">
        <nav
          aria-label="Main Navigation"
          className="pointer-events-auto w-full max-w-5xl rounded-full glass-panel px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between shadow-lg shadow-black/5 dark:shadow-black/20 border border-border/60 transition-all duration-300"
        >
          {/* Brand Logo */}
          <Logo size={32} onClick={handleLogoClick} />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {siteConfig.navItems.map((item) => {
              const sectionId = item.href.replace("/#", "");
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, sectionId)}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                      className="absolute inset-0 rounded-full bg-primary/15 border border-primary/20 shadow-xs"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Actions: Command Palette, Dual Resume Dropdown, ThemeToggle, Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Quick Command Palette Button */}
            <button
              onClick={openPalette}
              aria-label="Open command palette (Ctrl+K or Cmd+K)"
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs font-medium border border-border/70 bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Search</span>
              <kbd className="inline-flex items-center rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={openPalette}
              aria-label="Open search dialog"
              className="sm:hidden w-8 h-8 rounded-full flex items-center justify-center border border-border/70 bg-muted/40 text-muted-foreground hover:text-foreground"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Accessible Dual-Resume Dropdown for Desktop */}
            <ResumeDropdown variant="nav" />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center border border-border/70 bg-muted/40 text-foreground hover:bg-muted/70 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-md lg:hidden pt-24 px-6 animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="rounded-2xl glass-panel p-6 max-w-sm mx-auto shadow-2xl space-y-4 border border-border/80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-1">
              {siteConfig.navItems.map((item) => {
                const sectionId = item.href.replace("/#", "");
                const isActive = activeSection === sectionId;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, sectionId)}
                    aria-current={isActive ? "location" : undefined}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between min-h-[44px] cursor-pointer ${
                      isActive
                        ? "bg-primary/15 text-primary font-semibold border border-primary/25 shadow-xs"
                        : "text-foreground hover:bg-muted/60 border border-transparent"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-border/60">
              <ResumeDropdown variant="mobile" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
