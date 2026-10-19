"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { BorderBeam } from "@/components/21st/border-beam";
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
  ChevronDown,
} from "lucide-react";
import { SectionHeader } from "@/components/motion/section-header";
import { SectionDivider } from "@/components/motion/section-divider";
import { NumberTicker } from "@/components/motion/number-ticker";
import { Magnetic } from "@/components/motion/magnetic";
import { useSafeInView, MOTION_EASE } from "@/lib/motion";

export function FeaturedProject() {
  const project = projects[0]; // AI Mock Interview Coach
  const [expandedHighlights, setExpandedHighlights] = React.useState(false);

  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useSafeInView(sectionRef);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-x-clip"
    >
      <SectionDivider className="absolute top-0 inset-x-0" />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <SectionHeader
          eyebrowIcon={<Sparkles className="w-3.5 h-3.5" />}
          eyebrowText="02 // FLAGSHIP PROJECT HIGHLIGHT"
          title={project.title}
          subtitle={project.tagline}
          subtitleMaxWidth="max-w-2xl"
          rightAction={
            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <Magnetic>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
                  >
                    <span>Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Magnetic>
              )}

              {project.githubUrl && (
                <Magnetic>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-border/80 bg-card hover:bg-muted text-foreground transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Source</span>
                  </a>
                </Magnetic>
              )}

              <Magnetic>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                >
                  <span>Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Magnetic>
            </div>
          }
        />

        {/* Cold Start Notice */}
        <motion.div
          initial={false}
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
          }
          transition={{ duration: 0.5, delay: 0.2, ease: MOTION_EASE }}
          className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
          <span>
            <strong>Free-tier Host Notice:</strong> The backend API runs on Render free tier. Initial cold-start request may take ~50-60 seconds to spin up before responding.
          </span>
        </motion.div>

        {/* Featured Hero Card */}
        <motion.div
          initial={false}
          animate={
            isInView
              ? { opacity: 1, scale: 1, y: 0 }
              : {
                  opacity: 0,
                  scale: prefersReducedMotion ? 1 : 0.96,
                  y: prefersReducedMotion ? 0 : 20,
                }
          }
          transition={{
            duration: 0.65,
            delay: 0.15,
            ease: MOTION_EASE,
          }}
          className="relative rounded-2xl"
        >
          <SpotlightCard className="p-5 sm:p-10 border-border/80 space-y-8 relative overflow-hidden">
            {/* Border beam single sweep across perimeter */}
            <BorderBeam
              size={280}
              duration={6}
              delay={0.2}
              runOnce={true}
              colorFrom="hsl(var(--primary))"
              colorTo="#38bdf8"
            />

            {/* Top Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                    The Problem & Motivation
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground mt-1">
                    Why I Built It
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-[1.6] text-pretty">
                    {project.whyIBuiltIt}
                  </p>
                </div>

                {/* Live Metric Demonstration Mockup */}
                <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-muted/30 space-y-4 max-w-full min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4 border-b border-border/50 pb-3 sm:pb-3.5 min-w-0">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Activity className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-mono font-semibold text-foreground tracking-tight leading-snug text-balance">
                          Code-Computed Speech Diagnostics
                        </h4>
                        <span className="text-[11px] font-mono text-muted-foreground block mt-0.5">
                          (Client Side)
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap shrink-0 self-start sm:self-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Zero Audio Stored</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 items-stretch">
                    {/* Tile 1: Speaking Rate */}
                    <motion.div
                      initial={false}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                      }
                      transition={{ duration: 0.45, delay: 0.25, ease: MOTION_EASE }}
                      className="p-3 sm:p-3.5 rounded-xl bg-card border border-border/60 flex flex-row items-center justify-between sm:flex-col sm:justify-center text-left sm:text-center min-w-0 transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block whitespace-nowrap">
                          Speaking Rate
                        </span>
                        <span className="text-[10px] text-emerald-500 font-medium block sm:hidden mt-0.5 whitespace-nowrap">
                          Optimal
                        </span>
                      </div>
                      <div className="flex flex-col items-end sm:items-center shrink-0 sm:shrink min-w-0 sm:mt-1">
                        <span className="inline-flex items-baseline gap-1 whitespace-nowrap font-mono tabular-nums [font-variant-numeric:tabular-nums]">
                          <span className="text-lg sm:text-xl font-bold text-foreground">
                            <NumberTicker value={138} duration={1.2} />
                          </span>
                          <span className="text-xs font-medium text-muted-foreground">WPM</span>
                        </span>
                        <span className="text-[10px] text-emerald-500 font-medium hidden sm:block mt-1 whitespace-nowrap">
                          Optimal
                        </span>
                      </div>
                    </motion.div>

                    {/* Tile 2: Filler Words */}
                    <motion.div
                      initial={false}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                      }
                      transition={{ duration: 0.45, delay: 0.35, ease: MOTION_EASE }}
                      className="p-3 sm:p-3.5 rounded-xl bg-card border border-border/60 flex flex-row items-center justify-between sm:flex-col sm:justify-center text-left sm:text-center min-w-0 transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block whitespace-nowrap">
                          Filler Words
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium block sm:hidden mt-0.5 whitespace-nowrap">
                          10 phrases tracked
                        </span>
                      </div>
                      <div className="flex flex-col items-end sm:items-center shrink-0 sm:shrink min-w-0 sm:mt-1">
                        <span className="inline-flex items-baseline gap-1 whitespace-nowrap font-mono tabular-nums [font-variant-numeric:tabular-nums]">
                          <span className="text-lg sm:text-xl font-bold text-foreground">
                            <NumberTicker value={2} duration={1.2} />
                          </span>
                          <span className="text-xs font-medium text-muted-foreground">detected</span>
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium hidden sm:block mt-1 whitespace-nowrap">
                          10 phrases tracked
                        </span>
                      </div>
                    </motion.div>

                    {/* Tile 3: STAR Scoring */}
                    <motion.div
                      initial={false}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                      }
                      transition={{ duration: 0.45, delay: 0.45, ease: MOTION_EASE }}
                      className="p-3 sm:p-3.5 rounded-xl bg-card border border-border/60 flex flex-row items-center justify-between sm:flex-col sm:justify-center text-left sm:text-center min-w-0 transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block whitespace-nowrap">
                          STAR Scoring
                        </span>
                        <span className="text-[10px] text-primary font-medium block sm:hidden mt-0.5 whitespace-nowrap">
                          Evidence Quotes
                        </span>
                      </div>
                      <div className="flex flex-col items-end sm:items-center shrink-0 sm:shrink min-w-0 sm:mt-1">
                        <span className="inline-flex items-baseline gap-1 whitespace-nowrap font-mono tabular-nums [font-variant-numeric:tabular-nums]">
                          <span className="text-lg sm:text-xl font-bold text-primary">
                            <NumberTicker value={9.2} decimalPlaces={1} duration={1.2} />
                          </span>
                          <span className="text-xs font-medium text-primary/70">/&nbsp;10</span>
                        </span>
                        <span className="text-[10px] text-primary font-medium hidden sm:block mt-1 whitespace-nowrap">
                          Evidence Quotes
                        </span>
                      </div>
                    </motion.div>
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
                    <motion.div
                      key={idx}
                      initial={false}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }
                      }
                      transition={{
                        duration: 0.4,
                        delay: 0.25 + idx * 0.05,
                        ease: MOTION_EASE,
                      }}
                      className="p-3 rounded-xl border border-border/70 bg-card/70 flex items-start gap-2.5 text-xs text-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.div>
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
                  type="button"
                  onClick={() => setExpandedHighlights(!expandedHighlights)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline cursor-pointer group"
                >
                  <span>{expandedHighlights ? "Show Less" : "Expand All 8 Highlights"}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      expandedHighlights ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(expandedHighlights
                  ? project.engineeringHighlights
                  : project.engineeringHighlights?.slice(0, 4)
                )?.map((highlight, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      duration: 0.3,
                      delay: prefersReducedMotion ? 0 : (index % 4) * 0.04,
                      ease: MOTION_EASE,
                    }}
                    className="p-3.5 rounded-xl border border-border/60 bg-muted/20 text-xs text-muted-foreground flex items-start gap-2"
                  >
                    <span className="font-mono text-primary font-bold shrink-0">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed">{highlight}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Technology Badges */}
            <div className="border-t border-border/60 pt-6 space-y-3">
              <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-primary" />
                Production Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech, idx) => (
                  <motion.span
                    key={tech}
                    initial={false}
                    animate={
                      isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
                    }
                    transition={{
                      duration: 0.35,
                      delay: 0.3 + idx * 0.03,
                      ease: MOTION_EASE,
                    }}
                    className="px-2.5 py-1 rounded-md text-xs font-mono border border-border/80 bg-background/80 text-foreground transition-transform hover:scale-105"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
