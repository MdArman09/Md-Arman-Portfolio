"use client";

import * as React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { GithubIcon } from "@/components/shared/icons";
import {
  ExternalLink,
  Sparkles,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Activity,
  Layers,
} from "lucide-react";

export function FeaturedProject() {
  const project = projects[0]; // AI Mock Interview Coach
  const [expandedHighlights, setExpandedHighlights] = React.useState(false);

  return (
    <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 // FLAGSHIP PROJECT HIGHLIGHT</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
              {project.title}
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
              {project.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
              >
                <span>Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-border/80 bg-card hover:bg-muted text-foreground transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>View Source</span>
              </a>
            )}

            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
            >
              <span>Full Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Cold Start Notice */}
        <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
          <span>
            <strong>Free-tier Host Notice:</strong> The backend API runs on Render free tier. Initial cold-start request may take ~50-60 seconds to spin up before responding.
          </span>
        </div>

        {/* Featured Card */}
        <SpotlightCard className="p-6 sm:p-10 border-border/80 space-y-8">
          {/* Top Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                  The Problem & Motivation
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground mt-1">
                  Why I Built It
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
                  {project.whyIBuiltIt}
                </p>
              </div>

              {/* Live Metric Demonstration Mockup */}
              <div className="p-5 rounded-2xl border border-border/80 bg-muted/30 space-y-3">
                <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
                  <span className="text-xs font-mono font-semibold text-foreground flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-primary" />
                    Code-Computed Speech Diagnostics (Client Side)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Zero Audio Stored
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-card border border-border/60">
                    <span className="text-[10px] font-mono text-muted-foreground block">
                      Speaking Rate
                    </span>
                    <span className="text-sm font-mono font-bold text-foreground">
                      138 WPM
                    </span>
                    <span className="text-[9px] text-emerald-500 block">Optimal</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-card border border-border/60">
                    <span className="text-[10px] font-mono text-muted-foreground block">
                      Filler Words
                    </span>
                    <span className="text-sm font-mono font-bold text-foreground">
                      2 detected
                    </span>
                    <span className="text-[9px] text-muted-foreground block">10 phrases tracked</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-card border border-border/60">
                    <span className="text-[10px] font-mono text-muted-foreground block">
                      STAR Scoring
                    </span>
                    <span className="text-sm font-mono font-bold text-primary">
                      9.2 / 10
                    </span>
                    <span className="text-[9px] text-primary block">Evidence Quotes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary block">
                Key Technical Highlights
              </span>

              <div className="space-y-2.5">
                {project.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-border/70 bg-card/70 flex items-start gap-2.5 text-xs text-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Privacy badge */}
              <div className="p-3.5 rounded-xl border border-border/70 bg-card/50 text-xs space-y-1">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Privacy-First Audio Design
                </span>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {project.privacyNotes}
                </p>
              </div>
            </div>
          </div>

          {/* Expandable Engineering Deep-Dive */}
          <div className="border-t border-border/60 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-foreground flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <span>Deep Engineering Highlights</span>
              </h4>
              <button
                onClick={() => setExpandedHighlights(!expandedHighlights)}
                className="text-xs font-mono text-primary hover:underline cursor-pointer"
              >
                {expandedHighlights ? "Show Less" : "Expand All 8 Highlights"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(expandedHighlights
                ? project.engineeringHighlights
                : project.engineeringHighlights?.slice(0, 4)
              )?.map((highlight, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl border border-border/60 bg-muted/20 text-xs text-muted-foreground flex items-start gap-2"
                >
                  <span className="font-mono text-primary font-bold shrink-0">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <div className="border-t border-border/60 pt-6 space-y-3">
            <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-primary" />
              Production Tech Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono border border-border/80 bg-background/80 text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
