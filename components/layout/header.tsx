"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ThemeToggle } from "./theme-toggle";
import { Search, Menu, X, ArrowUpRight } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = siteConfig.navItems.map((item) =>
        item.href.replace("/#", "")
      );
      const scrollY = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i]);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <header className="fixed top-3 sm:top-5 inset-x-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none">
        <nav
          aria-label="Main Navigation"
          className="pointer-events-auto w-full max-w-5xl rounded-full glass-panel px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between shadow-lg shadow-black/5 dark:shadow-black/20 border border-border/60 transition-all duration-300"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer focus-visible:rounded-full"
            aria-label="Md Arman Alam Home"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-400 text-white flex items-center justify-center font-display font-bold text-xs tracking-wider shadow-xs group-hover:scale-105 transition-transform">
              AA
            </div>
            <span className="font-display font-semibold text-sm tracking-tight hidden md:inline-block">
              Arman<span className="text-primary font-bold">.dev</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {siteConfig.navItems.map((item) => {
              const sectionId = item.href.replace("/#", "");
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary/15 text-primary font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Actions: Command Palette, Resume, ThemeToggle, Mobile Menu */}
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

            {/* Resume button */}
            <a
              href={siteConfig.links.resume}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

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
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between min-h-[44px]"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-border/60 flex flex-col gap-2.5">
              <a
                href={siteConfig.links.resume}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground min-h-[44px]"
              >
                <span>Download Resume</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
