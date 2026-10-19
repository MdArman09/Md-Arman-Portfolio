"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { Sparkles, Terminal, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/motion/section-header";
import { SectionDivider } from "@/components/motion/section-divider";
import { NumberTicker } from "@/components/motion/number-ticker";
import { WordBlurFade } from "@/components/motion/word-blur-fade";
import { useSafeInView, useIsDesktop, MOTION_EASE } from "@/lib/motion";

export function About() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useSafeInView(sectionRef);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  // Desktop hover 3D tilt state
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setTilt({ x: -x * 6, y: y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-x-clip"
    >
      <SectionDivider className="absolute top-0 inset-x-0" />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <SectionHeader
          eyebrowIcon={<Terminal className="w-3.5 h-3.5" />}
          eyebrowText="01 // PROFILE & BACKGROUND"
          title="About Me"
          subtitle="Software Development Engineer with a strong foundation in Java enterprise systems, API security, and AI integrations, certified in SAP ABAP Cloud and Fiori development."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Avatar / Identity Card */}
          <div className="lg:col-span-5 [perspective:1000px]">
            <motion.div
              initial={false}
              animate={
                isInView || prefersReducedMotion
                  ? {
                      opacity: 1,
                      y: 0,
                      rotateX: tilt.x,
                      rotateY: tilt.y,
                    }
                  : {
                      opacity: 0,
                      y: 24,
                      rotateX: 8,
                      rotateY: 0,
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.65,
                      ease: MOTION_EASE,
                    }
              }
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="will-change-transform"
            >
              <SpotlightCard className="p-8 text-center space-y-6 relative transition-shadow duration-500 hover:shadow-xl">
                {/* Soft glow border on view entrance */}
                <motion.div
                  initial={false}
                  animate={
                    isInView
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/20"
                  aria-hidden="true"
                />

                {/* Photo / Monogram Slot */}
                <div className="relative mx-auto w-36 h-36">
                  {/* One-time pulsing ring */}
                  <motion.div
                    initial={false}
                    animate={
                      isInView && !prefersReducedMotion
                        ? { scale: [1, 1.25, 1], opacity: [0.6, 0, 0] }
                        : { scale: 1, opacity: 0 }
                    }
                    transition={{ duration: 0.85, delay: 0.3 }}
                    className="absolute inset-0 rounded-3xl border-2 border-primary/40 pointer-events-none motion-reduce:hidden"
                    aria-hidden="true"
                  />

                  <motion.div
                    initial={false}
                    animate={
                      isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
                    }
                    transition={{ duration: 0.5, ease: MOTION_EASE }}
                    className="w-full h-full rounded-3xl bg-gradient-to-tr from-primary/20 via-blue-500/20 to-cyan-400/20 p-1 border border-border/80 shadow-inner"
                  >
                    <div className="w-full h-full rounded-[22px] bg-card flex flex-col items-center justify-center space-y-1 overflow-hidden relative">
                      <div className="absolute inset-0 bg-radial from-primary/10 to-transparent" />
                      <span className="font-display font-black text-4xl text-primary tracking-tight">
                        AA
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                        Bengaluru, IN
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    {siteConfig.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Centurion University of Technology and Management
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Available for SDE & SAP ABAP roles</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60 grid grid-cols-2 gap-3 text-left">
                  <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
                    <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                      Degree
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      B.Tech in CSE
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
                    <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                      CGPA
                    </span>
                    <span className="text-xs font-semibold text-primary font-mono inline-flex items-baseline gap-1">
                      <NumberTicker value={9.13} decimalPlaces={2} duration={1.2} />
                      <span>/ 10</span>
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>

          {/* Narrative Summary & Quick Facts */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={false}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.15, ease: MOTION_EASE }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-border/80 space-y-5"
            >
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Engineering Philosophy & Specialization</span>
              </h3>

              {/* Primary SDE Summary */}
              <WordBlurFade
                text={siteConfig.about.summary}
                className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                delay={0.2}
              />

              {/* Second Paragraph: SAP ABAP & Fiori Specialization */}
              <div className="pt-4 border-t border-border/60 space-y-2">
                <span className="text-xs font-mono font-semibold text-primary flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>SAP Certified Associate</span>
                </span>
                <WordBlurFade
                  text={siteConfig.about.sapSummary}
                  className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                  delay={0.35}
                />
              </div>
            </motion.div>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siteConfig.about.quickFacts.map((fact, idx) => (
                <motion.div
                  key={fact.label}
                  initial={false}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -16 }
                  }
                  transition={{
                    duration: 0.45,
                    delay: 0.25 + idx * 0.05,
                    ease: MOTION_EASE,
                  }}
                  className="p-4 rounded-xl border border-border/70 bg-card/60 hover:bg-card/90 transition-colors flex items-center justify-between"
                >
                  <span className="text-xs font-mono text-muted-foreground">
                    {fact.label}
                  </span>
                  <span className="text-xs font-semibold text-foreground text-right">
                    {fact.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
