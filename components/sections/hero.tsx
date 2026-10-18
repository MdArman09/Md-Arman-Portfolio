"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ShimmerButton } from "@/components/21st/shimmer-button";
import { GridBackground } from "@/components/21st/grid-background";
import { HeroRoleRotate } from "@/components/21st/hero-role-rotate";
import { ResumeDropdown } from "@/components/shared/resume-dropdown";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
import { Mail, ArrowDown, Sparkles, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// Aurora orbs tint presets mapped to each role in order:
// 0: SDE (Blue/Cyan) | 1: MERN (Teal/Emerald) | 2: SAP ABAP (Indigo/Violet-Blue)
const roleGradients = [
  {
    primaryOrb: "bg-blue-600/15 dark:bg-blue-500/20",
    secondaryOrb: "bg-cyan-400/15 dark:bg-cyan-400/20",
  },
  {
    primaryOrb: "bg-emerald-500/15 dark:bg-emerald-500/20",
    secondaryOrb: "bg-teal-400/15 dark:bg-teal-400/20",
  },
  {
    primaryOrb: "bg-indigo-600/15 dark:bg-indigo-500/20",
    secondaryOrb: "bg-blue-500/15 dark:bg-blue-500/20",
  },
];

export function Hero() {
  const [activeRoleIndex, setActiveRoleIndex] = React.useState(0);

  return (
    <section
      id="hero"
      className="relative z-20 min-h-[92vh] flex items-center justify-center pt-28 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8"
    >
      <GridBackground>
        {/* Subtle Aurora / Soft-Orb Gradient (CSS/transform only, cross-fades per role) */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div
            className={cn(
              "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] sm:w-[46rem] h-[22rem] rounded-full blur-3xl transition-colors duration-1000 ease-in-out motion-reduce:transition-none opacity-80",
              roleGradients[activeRoleIndex]?.primaryOrb
            )}
          />
          <div
            className={cn(
              "absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[24rem] sm:w-[32rem] h-[18rem] rounded-full blur-3xl transition-colors duration-1000 ease-in-out motion-reduce:transition-none opacity-60",
              roleGradients[activeRoleIndex]?.secondaryOrb
            )}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/80 bg-background/80 backdrop-blur-md shadow-xs animate-in fade-in slide-in-from-top-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono font-medium text-foreground tracking-wide">
              Open to SDE & SAP ABAP roles
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              {siteConfig.location}
            </span>
          </div>

          {/* Name & Headline with WCAG AA Radial Scrim */}
          <div className="relative space-y-3">
            {/* Soft radial scrim to guarantee WCAG AA contrast against background aurora */}
            <div
              className="pointer-events-none absolute -inset-x-8 -inset-y-12 -z-10 rounded-full bg-radial from-background/90 via-background/60 to-transparent dark:from-background/90 dark:via-background/70 dark:to-transparent blur-xl"
              aria-hidden="true"
            />

            {/* Semantic H1: Name stays largest hero text */}
            <h1
              className="font-display font-extrabold tracking-tight text-foreground leading-[1.1]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
              {/* Visually hidden semantic text for screen readers & SEO */}
              <span className="sr-only">
                {" "}— Software Development Engineer, MERN Developer, and SAP ABAP Developer
              </span>
            </h1>

            {/* Animated Rotating Role Component (Word Rotate from 21st.dev) */}
            <HeroRoleRotate
              roles={siteConfig.roles}
              activeIndex={activeRoleIndex}
              onRoleChange={setActiveRoleIndex}
              className="mt-3 sm:mt-4"
            />

            {/* Static chip row for specialized competencies */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-border/80 bg-background/80 text-foreground/80 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Full-Stack Java
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-border/80 bg-background/80 text-foreground/80 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Spring Boot
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-primary/30 bg-primary/10 text-primary shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                SAP Certified (ABAP Cloud, Fiori)
              </span>
            </div>
          </div>

          {/* 2-Sentence Intro */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {siteConfig.intro}
          </p>

          {/* CTAs */}
          <div className="relative z-30 flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="#featured">
              <ShimmerButton className="text-sm px-6 py-3">
                <Sparkles className="w-4 h-4" />
                <span>View Flagship Project</span>
              </ShimmerButton>
            </Link>

            {/* Accessible Dual-Resume Dropdown */}
            <ResumeDropdown variant="hero" />

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-border/60 hover:border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </Link>
          </div>

          {/* Social Icons */}
          <div className="relative z-10 flex items-center justify-center gap-4 pt-4">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded-full border border-border/80 bg-background/60 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-all hover:scale-105 shadow-xs"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-full border border-border/80 bg-background/60 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-all hover:scale-105 shadow-xs"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Send direct email"
              className="w-10 h-10 rounded-full border border-border/80 bg-background/60 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-all hover:scale-105 shadow-xs"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Scroll Down Indicator */}
          <div className="relative z-10 pt-8">
            <Link
              href="#about"
              aria-label="Scroll to about section"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Explore Profile</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </Link>
          </div>
        </div>
      </GridBackground>
    </section>
  );
}
