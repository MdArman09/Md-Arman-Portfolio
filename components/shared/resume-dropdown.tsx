"use client";

import * as React from "react";
import { FileDown, ChevronDown, Code2, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

interface ResumeDropdownProps {
  variant?: "hero" | "nav" | "mobile";
  className?: string;
}

export function ResumeDropdown({ variant = "hero", className }: ResumeDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const resumes = [
    {
      id: "sde",
      title: "Software Engineer Resume (SDE / Full-Stack)",
      shortTitle: "SDE / Full-Stack Resume",
      filename: "Md_Arman_SDE.pdf",
      url: siteConfig.links.resumeSde,
      icon: Code2,
      tag: "Java • Spring • React • AI",
    },
    {
      id: "abap",
      title: "SAP ABAP Resume (SAP Certified)",
      shortTitle: "SAP ABAP Resume",
      filename: "Md Arman - SAP ABAP (Resume).pdf",
      url: siteConfig.links.resumeAbap,
      icon: ShieldCheck,
      tag: "ABAP Cloud • Fiori • Open SQL",
    },
  ];

  if (variant === "mobile") {
    return (
      <div className="w-full space-y-2">
        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block px-1">
          Download Resume (PDF)
        </span>
        <div className="grid grid-cols-1 gap-2">
          {resumes.map((r) => {
            const Icon = r.icon;
            return (
              <a
                key={r.id}
                href={r.url}
                download={r.filename}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-card hover:bg-muted/80 text-xs font-semibold text-foreground transition-colors min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <div className="text-left">
                    <span className="block">{r.shortTitle}</span>
                    <span className="text-[10px] font-mono text-muted-foreground block">
                      {r.filename}
                    </span>
                  </div>
                </div>
                <FileDown className="w-4 h-4 text-emerald-500" />
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === "nav") {
    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label="Download Resume options"
          className={cn(
            "hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-ring",
            className
          )}
        >
          <span>Resume</span>
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div
            role="menu"
            aria-orientation="vertical"
            className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl bg-card text-card-foreground border border-border shadow-2xl shadow-black/20 ring-1 ring-black/5 dark:ring-white/10 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="px-2 py-1.5 text-[11px] font-mono text-muted-foreground uppercase tracking-wider border-b border-border/60 mb-1">
              Select Resume to Download
            </div>
            {resumes.map((r) => {
              const Icon = r.icon;
              return (
                <a
                  key={r.id}
                  href={r.url}
                  download={r.filename}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-muted/80 transition-colors text-foreground group cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div className="flex-1 text-left">
                    <span className="text-xs font-semibold block group-hover:text-primary transition-colors">
                      {r.title}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground block mt-0.5">
                      {r.filename} • {r.tag}
                    </span>
                  </div>
                  <FileDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors mt-0.5" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Hero variant (large, prominent split/dropdown button)
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="inline-flex rounded-full shadow-xs border border-border/80 bg-card">
        <a
          href={siteConfig.links.resumeSde}
          download="Md_Arman_SDE.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-l-full text-sm font-semibold hover:bg-muted/80 text-foreground transition-all duration-200 cursor-pointer"
        >
          <FileDown className="w-4 h-4 text-emerald-500" />
          <span>Download Resume</span>
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label="Toggle resume download options (SDE or SAP ABAP)"
          className="px-3 py-3 border-l border-border/80 rounded-r-full hover:bg-muted/80 text-foreground transition-colors cursor-pointer"
        >
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </div>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 sm:w-92 max-w-[calc(100vw-2rem)] rounded-2xl bg-card text-card-foreground border border-border shadow-2xl shadow-black/30 dark:shadow-black/60 ring-1 ring-black/5 dark:ring-white/10 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3 py-2 text-[11px] font-mono text-muted-foreground uppercase tracking-wider border-b border-border/60 mb-1 flex items-center justify-between">
            <span>Choose Target Profile Resume</span>
            <span className="text-[10px] text-muted-foreground">PDF</span>
          </div>
          {resumes.map((r) => {
            const Icon = r.icon;
            return (
              <a
                key={r.id}
                href={r.url}
                download={r.filename}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/70 transition-colors text-foreground group cursor-pointer border border-transparent hover:border-border/60"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                      {r.shortTitle}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
                      Download
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground block mt-0.5">
                    {r.title}
                  </span>
                  <span className="text-[10px] font-mono text-primary/80 block mt-1">
                    File: {r.filename}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
