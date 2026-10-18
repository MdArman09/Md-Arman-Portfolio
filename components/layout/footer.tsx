"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { Mail, ArrowUpRight, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
import { Logo } from "@/components/Logo";
import { scrollToSection } from "@/lib/scroll";

export function Footer() {
  const currentYear = 2026;

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (typeof window !== "undefined" && window.location.pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      scrollToSection(href);
    }
  };

  return (
    <footer className="relative border-t border-border/70 bg-card/40 backdrop-blur-md pt-16 pb-12 overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-border/60">
          {/* Identity & Status */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Logo size={36} showWordmark={false} asLink={false} />
              <div>
                <span className="font-display font-bold text-lg tracking-tight block">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-muted-foreground block">
                  {siteConfig.title} • {siteConfig.secondaryTitle}
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {siteConfig.about.summary}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for SDE & SAP ABAP roles</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Case Studies & Social */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-foreground">
                Projects
              </h3>
              <ul className="space-y-2 text-sm">
                {projects.map((proj) => (
                  <li key={proj.slug}>
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="line-clamp-1">{proj.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5 pt-2">
              <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-foreground">
                Connect
              </h3>
              <div className="flex items-center gap-2.5">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-8 h-8 rounded-full border border-border/70 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-8 h-8 rounded-full border border-border/70 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label="Send Email"
                  className="w-8 h-8 rounded-full border border-border/70 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Large Decorative Wordmark (Scalable SVG ensures zero clipping/overflow on all device sizes) */}
        <div className="py-6 sm:py-10 select-none overflow-hidden opacity-10 dark:opacity-15 pointer-events-none flex justify-center items-center w-full px-2">
          <svg
            viewBox="0 0 1000 110"
            className="w-full max-w-5xl h-auto select-none"
            aria-hidden="true"
          >
            <text
              x="50%"
              y="55%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="currentColor"
              className="font-display font-extrabold tracking-tight text-foreground uppercase"
              fontSize="80"
              letterSpacing="-0.02em"
            >
              MD ARMAN ALAM
            </text>
          </svg>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground pt-4">
          <p>© {currentYear} Md Arman Alam. All rights reserved.</p>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span>Next.js 16 • React 19 • Tailwind CSS • TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
