"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Search,
  Code2,
  User,
  Sparkles,
  Layers,
  GraduationCap,
  Award,
  Mail,
  FileDown,
  ExternalLink,
  Laptop,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const { setTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const scrollYRef = React.useRef(0);
  const isHistoryPushedRef = React.useRef(false);
  const triggerElementRef = React.useRef<HTMLElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  const [visualHeight, setVisualHeight] = React.useState<number | null>(null);

  const closePalette = React.useCallback(() => {
    setOpen(false);
    setSearch("");
    if (isHistoryPushedRef.current) {
      isHistoryPushedRef.current = false;
      if (typeof window !== "undefined" && window.history.state?.commandPaletteOpen) {
        window.history.back();
      }
    }
  }, []);

  const openPalette = React.useCallback(() => {
    triggerElementRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
    if (typeof window !== "undefined") {
      try {
        window.history.pushState({ commandPaletteOpen: true }, "");
        isHistoryPushedRef.current = true;
      } catch {}
    }
  }, []);

  // Keyboard shortcut (Cmd/Ctrl+K) & custom event trigger
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => {
          if (prev) {
            closePalette();
            return false;
          } else {
            openPalette();
            return true;
          }
        });
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        closePalette();
      }
    };

    const handleCustomOpen = () => {
      openPalette();
    };

    window.addEventListener("open-command-palette", handleCustomOpen);
    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [open, openPalette, closePalette]);

  // Mobile popstate (Back button closes palette instead of leaving page)
  React.useEffect(() => {
    const handlePopState = () => {
      if (open) {
        isHistoryPushedRef.current = false;
        setOpen(false);
        setSearch("");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [open]);

  // iOS Safari-safe body scroll lock
  React.useEffect(() => {
    if (open) {
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
    } else {
      const scrollY = scrollYRef.current;
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
    }

    return () => {
      if (document.body.style.position === "fixed") {
        const scrollY = scrollYRef.current;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        window.scrollTo(0, scrollY);
      }
    };
  }, [open]);

  // Focus management: focus input on open, return focus on close
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      triggerElementRef.current?.focus();
    }
  }, [open]);

  // Mobile visualViewport tracking for on-screen keyboard
  React.useEffect(() => {
    if (!open) return;
    const updateHeight = () => {
      if (typeof window !== "undefined" && window.visualViewport) {
        setVisualHeight(window.visualViewport.height);
      }
    };

    updateHeight();
    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", updateHeight);
      vv.addEventListener("scroll", updateHeight);
      return () => {
        vv.removeEventListener("resize", updateHeight);
        vv.removeEventListener("scroll", updateHeight);
      };
    }
  }, [open]);

  // Non-passive touchmove prevention on backdrop/header/footer to prevent background scroll
  React.useEffect(() => {
    if (!open) return;
    const backdropEl = backdropRef.current;
    if (!backdropEl) return;

    const preventTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest("[cmdk-list]")) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    backdropEl.addEventListener("touchmove", preventTouch, { passive: false });
    return () => {
      backdropEl.removeEventListener("touchmove", preventTouch);
    };
  }, [open]);

  // Command runner: close palette then execute action smoothly
  const runCommand = (command: () => void) => {
    closePalette();
    setTimeout(() => {
      command();
    }, 100);
  };

  const navigateToSection = (hash: string) => {
    runCommand(() => {
      const sectionId = hash.replace("/#", "");
      if (window.location.pathname === "/") {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", hash);
          return;
        }
      }
      router.push(hash);
    });
  };

  // Keyboard focus trap inside modal
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const listMaxHeight = visualHeight
    ? `${Math.max(160, Math.min(visualHeight - 170, 420))}px`
    : "min(60dvh, 420px)";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={backdropRef}
          role="dialog"
          aria-modal="true"
          aria-label="Search sections and commands"
          onKeyDown={handleModalKeyDown}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) {
              closePalette();
            }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.18,
            ease: "easeOut",
          }}
          style={{
            paddingTop: "max(env(safe-area-inset-top, 16px), 16px)",
            touchAction: "none",
          }}
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20 bg-background/80 backdrop-blur-md overflow-hidden h-[100dvh]"
        >
          <motion.div
            ref={panelRef}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: -10 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: -10 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/80 bg-card text-card-foreground shadow-2xl transition-all duration-200"
          >
            <Command loop className="w-full">
              <div
                style={{ touchAction: "none" }}
                className="flex items-center border-b border-border/60 px-3 py-2 sm:py-2.5"
              >
                <Search className="mr-2.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  ref={inputRef}
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or search sections..."
                  className="flex h-11 w-full rounded-md bg-transparent text-base sm:text-sm font-medium outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
                <kbd className="hidden sm:inline-flex select-none items-center gap-1 rounded-md border border-border bg-muted/60 px-1.5 font-mono text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <Command.List
                style={{
                  maxHeight: listMaxHeight,
                  overscrollBehavior: "contain",
                  touchAction: "pan-y",
                }}
                className="overflow-y-auto overscroll-contain touch-pan-y p-2 scrollbar-none text-sm"
              >
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No matching results found.
                </Command.Empty>

                <Command.Group
                  heading="Navigation"
                  className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  <Command.Item
                    onSelect={() => navigateToSection("/#about")}
                    className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <User className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>About Md Arman Alam</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => navigateToSection("/#featured")}
                    className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Sparkles className="h-4 w-4 text-primary shrink-0" />
                    <span>Flagship: AI Mock Interview Coach</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => navigateToSection("/#projects")}
                    className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Code2 className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>All Projects (Bento Grid)</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => navigateToSection("/#skills")}
                    className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Layers className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>Technical Skills (Java, Spring, MERN, AI)</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => navigateToSection("/#timeline")}
                    className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>Experience & Education Timeline</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => navigateToSection("/#certifications")}
                    className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Award className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>Certifications (SAP & IEEE)</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => navigateToSection("/#contact")}
                    className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>Contact Form & Copy Info</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group
                  heading="Case Studies"
                  className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2"
                >
                  {projects.map((proj) => (
                    <Command.Item
                      key={proj.slug}
                      onSelect={() =>
                        runCommand(() => router.push(`/projects/${proj.slug}`))
                      }
                      className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                    >
                      <Laptop className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>Case Study: {proj.title}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Actions & External Links"
                  className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2"
                >
                  <Command.Item
                    onSelect={() =>
                      runCommand(() => window.open(siteConfig.links.resumeSde, "_blank"))
                    }
                    className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <FileDown className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Download SDE Resume (Md_Arman_SDE.pdf)</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() =>
                      runCommand(() => window.open(siteConfig.links.resumeAbap, "_blank"))
                    }
                    className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <FileDown className="h-4 w-4 text-blue-500 shrink-0" />
                    <span>Download SAP ABAP Resume (Md Arman - SAP ABAP (Resume).pdf)</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() =>
                      runCommand(() => window.open(siteConfig.links.github, "_blank"))
                    }
                    className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>View GitHub Profile</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() =>
                      runCommand(() => window.open(siteConfig.links.linkedin, "_blank"))
                    }
                    className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>View LinkedIn Profile</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group
                  heading="Theme"
                  className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2"
                >
                  <Command.Item
                    onSelect={() => runCommand(() => setTheme("light"))}
                    className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Sun className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>Light Mode</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => setTheme("dark"))}
                    className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Moon className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span>Dark Mode</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div
                style={{ touchAction: "none" }}
                className="flex items-center justify-between border-t border-border/60 bg-muted/40 px-3 py-2 text-[11px] text-muted-foreground"
              >
                <span>Navigate with arrow keys</span>
                <span>Press Enter to select</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
