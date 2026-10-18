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
  const [selectedValue, setSelectedValue] = React.useState("About Md Arman Alam");
  const router = useRouter();
  const { setTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const scrollYRef = React.useRef(0);
  const navPaddingRef = React.useRef("");
  const isHistoryPushedRef = React.useRef(false);
  const triggerElementRef = React.useRef<HTMLElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const lastMousePosRef = React.useRef({ x: -1, y: -1 });

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
    setSelectedValue("About Md Arman Alam");
    lastMousePosRef.current = { x: -1, y: -1 };
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
        const target = e.target as HTMLElement | null;
        if (target && target.isContentEditable) {
          return;
        }
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

  // Scroll lock with scrollbar compensation for both body and fixed navbar
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

        const fixedNav = document.querySelector<HTMLElement>("header");
        if (fixedNav) {
          navPaddingRef.current = fixedNav.style.paddingRight;
          const currentPadding =
            parseFloat(window.getComputedStyle(fixedNav).paddingRight) || 0;
          fixedNav.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
        }
      }
    } else {
      if (document.body.style.position === "fixed") {
        const scrollY = scrollYRef.current;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";

        const fixedNav = document.querySelector<HTMLElement>("header");
        if (fixedNav) {
          fixedNav.style.paddingRight = navPaddingRef.current;
        }

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

        const fixedNav = document.querySelector<HTMLElement>("header");
        if (fixedNav) {
          fixedNav.style.paddingRight = navPaddingRef.current;
        }

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

  // Wheel & trackpad scroll lock: prevent background page scroll while allowing internal list scrolling
  React.useEffect(() => {
    if (!open) return;

    const handleWheel = (e: WheelEvent) => {
      const listEl = listRef.current;
      if (!listEl) {
        e.preventDefault();
        return;
      }

      // If wheel event originated outside list (backdrop, header, footer)
      if (!listEl.contains(e.target as Node)) {
        e.preventDefault();
        return;
      }

      // Inside list: prevent overscroll pass-through at edges
      const { scrollTop, scrollHeight, clientHeight } = listEl;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [open]);

  // Non-passive touchmove prevention on backdrop/header/footer for mobile devices
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

  // Auto-scroll the active highlighted item into view using block: "nearest"
  React.useEffect(() => {
    if (!open) return;
    const listEl = listRef.current;
    if (!listEl) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "aria-selected"
        ) {
          const target = mutation.target as HTMLElement;
          if (target.getAttribute("aria-selected") === "true") {
            target.scrollIntoView({
              block: "nearest",
              inline: "nearest",
            });
          }
        }
      }
    });

    observer.observe(listEl, {
      attributes: true,
      subtree: true,
      attributeFilter: ["aria-selected"],
    });

    return () => {
      observer.disconnect();
    };
  }, [open]);

  // Single source of truth highlight: update selection on mouse hover ONLY when mouse actually moves
  const handleItemPointerMove = React.useCallback(
    (itemVal: string) => (e: React.PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (
        e.clientX !== lastMousePosRef.current.x ||
        e.clientY !== lastMousePosRef.current.y
      ) {
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
        if (selectedValue !== itemVal) {
          setSelectedValue(itemVal);
        }
      }
    },
    [selectedValue]
  );

  // Command runner: close palette then execute action smoothly with sticky navbar offset
  const runCommand = (command: () => void) => {
    closePalette();
    setTimeout(() => {
      command();
    }, 60);
  };

  const navigateToSection = (hash: string) => {
    runCommand(() => {
      const sectionId = hash.replace("/#", "");
      if (window.location.pathname === "/") {
        const el = document.getElementById(sectionId);
        if (el) {
          window.dispatchEvent(
            new CustomEvent("nav-section-click", { detail: sectionId })
          );
          const fixedNav = document.querySelector<HTMLElement>("header");
          const navOffset = fixedNav
            ? fixedNav.getBoundingClientRect().height + 28
            : 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - navOffset;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });
          window.history.pushState(null, "", hash);
          return;
        }
      }
      router.push(hash);
    });
  };

  // Keyboard focus trap and dialog page keys
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
    } else if (e.key === "PageUp" || e.key === "PageDown") {
      e.preventDefault();
      const listEl = listRef.current;
      if (listEl) {
        const scrollAmount = listEl.clientHeight * 0.75;
        listEl.scrollBy({
          top: e.key === "PageUp" ? -scrollAmount : scrollAmount,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    } else if (e.key === " " && e.target !== inputRef.current) {
      e.preventDefault();
    }
  };

  const listMaxHeight = visualHeight
    ? `${Math.max(160, Math.min(visualHeight - 170, 420))}px`
    : "min(60vh, 420px)";

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
            duration: prefersReducedMotion ? 0 : 0.15,
            ease: "easeOut",
          }}
          style={{
            touchAction: "none",
          }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-[max(env(safe-area-inset-top,16px),16px)] sm:pt-[13vh] bg-background/80 backdrop-blur-md overflow-hidden h-[100dvh]"
        >
          <motion.div
            ref={panelRef}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.98, y: -6 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.98, y: -6 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              width: "min(640px, calc(100vw - 32px))",
            }}
            className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-card text-card-foreground shadow-2xl transition-all duration-150"
          >
            <Command
              loop
              disablePointerSelection
              value={selectedValue}
              onValueChange={setSelectedValue}
              className="w-full"
            >
              <div
                style={{ touchAction: "none" }}
                className="flex items-center border-b border-border/60 px-3.5 py-2.5 sm:py-3"
              >
                <Search className="mr-3 h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  ref={inputRef}
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or search sections..."
                  className="flex h-10 w-full rounded-md bg-transparent text-base sm:text-sm font-medium outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
                <kbd className="hidden sm:inline-flex select-none items-center gap-1 rounded-md border border-border/80 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <Command.List
                ref={listRef}
                style={{
                  maxHeight: listMaxHeight,
                  minHeight: search.trim() ? "260px" : "auto",
                  overscrollBehavior: "contain",
                  touchAction: "pan-y",
                }}
                className="command-palette-scroll overflow-y-auto overscroll-contain touch-pan-y p-2 text-sm"
              >
                <Command.Empty className="flex flex-col items-center justify-center py-12 text-center text-sm text-muted-foreground">
                  <Search className="mb-2.5 h-6 w-6 text-muted-foreground/50" />
                  <p className="font-medium text-foreground">No matching results found</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try searching for a section, skill, or project name
                  </p>
                </Command.Empty>

                <Command.Group
                  heading="Navigation"
                  className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  <Command.Item
                    value="About Md Arman Alam"
                    onSelect={() => navigateToSection("/#about")}
                    onPointerMove={handleItemPointerMove("About Md Arman Alam")}
                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <User className="h-4 w-4 text-muted-foreground group-aria-selected:text-primary shrink-0 transition-colors" />
                    <span
                      className="truncate flex-1 font-medium"
                      title="About Md Arman Alam"
                    >
                      About Md Arman Alam
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="Flagship: AI Mock Interview Coach"
                    onSelect={() => navigateToSection("/#featured")}
                    onPointerMove={handleItemPointerMove(
                      "Flagship: AI Mock Interview Coach"
                    )}
                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Sparkles className="h-4 w-4 text-primary shrink-0" />
                    <span
                      className="truncate flex-1 font-medium"
                      title="Flagship: AI Mock Interview Coach"
                    >
                      Flagship: AI Mock Interview Coach
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="All Projects (Bento Grid)"
                    onSelect={() => navigateToSection("/#projects")}
                    onPointerMove={handleItemPointerMove(
                      "All Projects (Bento Grid)"
                    )}
                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Code2 className="h-4 w-4 text-muted-foreground group-aria-selected:text-primary shrink-0 transition-colors" />
                    <span
                      className="truncate flex-1 font-medium"
                      title="All Projects (Bento Grid)"
                    >
                      All Projects (Bento Grid)
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="Technical Skills (Java, Spring, MERN, AI)"
                    onSelect={() => navigateToSection("/#skills")}
                    onPointerMove={handleItemPointerMove(
                      "Technical Skills (Java, Spring, MERN, AI)"
                    )}
                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Layers className="h-4 w-4 text-muted-foreground group-aria-selected:text-primary shrink-0 transition-colors" />
                    <span
                      className="truncate flex-1 font-medium"
                      title="Technical Skills (Java, Spring, MERN, AI)"
                    >
                      Technical Skills (Java, Spring, MERN, AI)
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="Experience & Education Timeline"
                    onSelect={() => navigateToSection("/#timeline")}
                    onPointerMove={handleItemPointerMove(
                      "Experience & Education Timeline"
                    )}
                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <GraduationCap className="h-4 w-4 text-muted-foreground group-aria-selected:text-primary shrink-0 transition-colors" />
                    <span
                      className="truncate flex-1 font-medium"
                      title="Experience & Education Timeline"
                    >
                      Experience & Education Timeline
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="Certifications (SAP & IEEE)"
                    onSelect={() => navigateToSection("/#certifications")}
                    onPointerMove={handleItemPointerMove(
                      "Certifications (SAP & IEEE)"
                    )}
                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Award className="h-4 w-4 text-muted-foreground group-aria-selected:text-primary shrink-0 transition-colors" />
                    <span
                      className="truncate flex-1 font-medium"
                      title="Certifications (SAP & IEEE)"
                    >
                      Certifications (SAP & IEEE)
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="Contact Form & Copy Info"
                    onSelect={() => navigateToSection("/#contact")}
                    onPointerMove={handleItemPointerMove(
                      "Contact Form & Copy Info"
                    )}
                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Mail className="h-4 w-4 text-muted-foreground group-aria-selected:text-primary shrink-0 transition-colors" />
                    <span
                      className="truncate flex-1 font-medium"
                      title="Contact Form & Copy Info"
                    >
                      Contact Form & Copy Info
                    </span>
                  </Command.Item>
                </Command.Group>

                <Command.Group
                  heading="Case Studies"
                  className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2"
                >
                  {projects.map((proj) => {
                    const title = `Case Study: ${proj.title}`;
                    return (
                      <Command.Item
                        key={proj.slug}
                        value={title}
                        keywords={[proj.tagline, ...proj.stack]}
                        onSelect={() =>
                          runCommand(() => router.push(`/projects/${proj.slug}`))
                        }
                        onPointerMove={handleItemPointerMove(title)}
                        className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                      >
                        <Laptop className="h-4 w-4 text-muted-foreground group-aria-selected:text-primary shrink-0 transition-colors" />
                        <span className="truncate flex-1 font-medium" title={title}>
                          {title}
                        </span>
                      </Command.Item>
                    );
                  })}
                </Command.Group>

                <Command.Group
                  heading="Actions & External Links"
                  className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2"
                >
                  <Command.Item
                    value="Download SDE Resume (Md_Arman_SDE.pdf)"
                    keywords={["software", "developer", "engineer", "cv", "resume"]}
                    onSelect={() =>
                      runCommand(() =>
                        window.open(siteConfig.links.resumeSde, "_blank")
                      )
                    }
                    onPointerMove={handleItemPointerMove(
                      "Download SDE Resume (Md_Arman_SDE.pdf)"
                    )}
                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <FileDown className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span
                      className="truncate flex-1 font-medium"
                      title="Download SDE Resume (Md_Arman_SDE.pdf)"
                    >
                      Download SDE Resume (Md_Arman_SDE.pdf)
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="Download SAP ABAP Resume (Md Arman - SAP ABAP (Resume).pdf)"
                    keywords={["sap", "abap", "cv", "resume"]}
                    onSelect={() =>
                      runCommand(() =>
                        window.open(siteConfig.links.resumeAbap, "_blank")
                      )
                    }
                    onPointerMove={handleItemPointerMove(
                      "Download SAP ABAP Resume (Md Arman - SAP ABAP (Resume).pdf)"
                    )}
                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <FileDown className="h-4 w-4 text-blue-500 shrink-0" />
                    <span
                      className="truncate flex-1 font-medium"
                      title="Download SAP ABAP Resume (Md Arman - SAP ABAP (Resume).pdf)"
                    >
                      Download SAP ABAP Resume (Md Arman - SAP ABAP (Resume).pdf)
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="View GitHub Profile"
                    keywords={["github", "code", "repository", "git"]}
                    onSelect={() =>
                      runCommand(() => window.open(siteConfig.links.github, "_blank"))
                    }
                    onPointerMove={handleItemPointerMove("View GitHub Profile")}
                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-aria-selected:text-primary shrink-0 transition-colors" />
                    <span
                      className="truncate flex-1 font-medium"
                      title="View GitHub Profile"
                    >
                      View GitHub Profile
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="View LinkedIn Profile"
                    keywords={["linkedin", "network", "connect"]}
                    onSelect={() =>
                      runCommand(() =>
                        window.open(siteConfig.links.linkedin, "_blank")
                      )
                    }
                    onPointerMove={handleItemPointerMove("View LinkedIn Profile")}
                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-aria-selected:text-primary shrink-0 transition-colors" />
                    <span
                      className="truncate flex-1 font-medium"
                      title="View LinkedIn Profile"
                    >
                      View LinkedIn Profile
                    </span>
                  </Command.Item>
                </Command.Group>

                <Command.Group
                  heading="Theme"
                  className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2"
                >
                  <Command.Item
                    value="Light Mode"
                    keywords={["theme", "light", "bright"]}
                    onSelect={() => runCommand(() => setTheme("light"))}
                    onPointerMove={handleItemPointerMove("Light Mode")}
                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Sun className="h-4 w-4 text-amber-500 shrink-0" />
                    <span className="truncate flex-1 font-medium" title="Light Mode">
                      Light Mode
                    </span>
                  </Command.Item>
                  <Command.Item
                    value="Dark Mode"
                    keywords={["theme", "dark", "night"]}
                    onSelect={() => runCommand(() => setTheme("dark"))}
                    onPointerMove={handleItemPointerMove("Dark Mode")}
                    className="group flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px] text-sm text-foreground transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                  >
                    <Moon className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span className="truncate flex-1 font-medium" title="Dark Mode">
                      Dark Mode
                    </span>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div
                style={{ touchAction: "none" }}
                className="hidden sm:flex items-center justify-between border-t border-border/60 bg-muted/40 px-3.5 py-2.5 text-[11px] text-muted-foreground select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5">
                    <kbd className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-border/80 bg-background px-1 font-mono text-[10px] font-semibold text-foreground/80 shadow-2xs">
                      ↑
                    </kbd>
                    <kbd className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-border/80 bg-background px-1 font-mono text-[10px] font-semibold text-foreground/80 shadow-2xs">
                      ↓
                    </kbd>
                    <span>Navigate</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <kbd className="inline-flex h-4 items-center justify-center rounded border border-border/80 bg-background px-1.5 font-mono text-[10px] font-semibold text-foreground/80 shadow-2xs">
                      ↵
                    </kbd>
                    <span>Select</span>
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="inline-flex h-4 items-center justify-center rounded border border-border/80 bg-background px-1.5 font-mono text-[10px] font-semibold text-foreground/80 shadow-2xs">
                    Esc
                  </kbd>
                  <span>Close</span>
                </span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
