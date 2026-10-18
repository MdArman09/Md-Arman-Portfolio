"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ShimmerButton } from "@/components/21st/shimmer-button";
import { GridBackground } from "@/components/21st/grid-background";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
import { Mail, ArrowDown, FileDown, Sparkles, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <GridBackground>
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/80 bg-background/80 backdrop-blur-md shadow-xs animate-in fade-in slide-in-from-top-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono font-medium text-foreground tracking-wide">
              Open to SDE Roles
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              {siteConfig.location}
            </span>
          </div>

          {/* Name & Headline */}
          <div className="space-y-4">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-foreground">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </h1>

            <p className="font-display text-lg sm:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto">
              {siteConfig.title}
            </p>
          </div>

          {/* 2-Sentence Intro */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {siteConfig.intro}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="#featured">
              <ShimmerButton className="text-sm px-6 py-3">
                <Sparkles className="w-4 h-4" />
                <span>View Flagship Project</span>
              </ShimmerButton>
            </Link>

            <a
              href={siteConfig.links.resume}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-border/80 bg-card hover:bg-muted/80 text-foreground transition-all duration-200 shadow-xs cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-emerald-500" />
              <span>Download Resume</span>
            </a>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-border/60 hover:border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 pt-4">
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
          <div className="pt-8">
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
