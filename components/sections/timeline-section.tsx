"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { timelineItems } from "@/data/experience";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { SlideInCard } from "@/components/motion/SlideInCard";
import {
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";

export function TimelineSection() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);
  const railRef = React.useRef<HTMLDivElement>(null);

  // useInView on the parent rail wrapper which always has real layout height
  const isRailInView = useInView(railRef, {
    once: true,
    amount: 0.1,
    margin: "0px",
  });

  const [fallbackTriggered, setFallbackTriggered] = React.useState(false);

  // Safety fallback: if in-view has not fired within 1.5s of mount, force visible so bar never stays hidden
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFallbackTriggered(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isTimelineVisible = prefersReducedMotion || isRailInView || fallbackTriggered;

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50 overflow-x-clip">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div data-scroll-target className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
            <Clock className="w-3.5 h-3.5" />
            <span>05 // TRACK RECORD</span>
          </div>
          <h2
            tabIndex={-1}
            className="font-display font-bold text-3xl sm:text-4xl text-foreground outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            Experience & Education
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            Software development internship, hands-on SAP ABAP guided training, and academic excellence.
          </p>
        </div>

        {/* Vertical Connected Rail Timeline: positive offset within section padding, cards indented */}
        <div ref={railRef} className="relative pl-[44px] sm:pl-12 space-y-10">
          {/* Top-to-bottom drawing line: clip-path reveal avoids zero-height bounding-box issues */}
          <motion.div
            initial={false}
            animate={
              isTimelineVisible
                ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
                : { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.001 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
            }
            className="absolute left-[16px] sm:left-[20px] top-3 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary via-border to-border/70 dark:from-primary/90 dark:via-border/80 dark:to-border/40 pointer-events-none z-0"
            aria-hidden="true"
          />

          {timelineItems.map((item, index) => {
            const isEducation = item.type === "education";
            const isTraining = item.type === "training";
            const delayStep = isMobile ? 0.1 : 0.18;
            const cardDelay = index * delayStep;
            const nodeDelay = Math.max(0, cardDelay - 0.06);

            return (
              <div key={item.id} className="relative group">
                {/* Node indicator: centered exactly on line anchor, pops in just before card */}
                <motion.div
                  initial={false}
                  animate={
                    isTimelineVisible
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.6, opacity: 0.001 }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.3,
                          delay: nodeDelay,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                  className="absolute left-[16px] sm:left-[20px] -translate-x-1/2 top-1.5 w-6 h-6 rounded-full border-2 border-background bg-card flex items-center justify-center text-primary shadow-xs group-hover:scale-110 group-hover:border-primary transition-all z-10"
                >
                  {isEducation ? (
                    <GraduationCap className="w-3 h-3 text-primary" />
                  ) : isTraining ? (
                    <ShieldCheck className="w-3 h-3 text-blue-500" />
                  ) : (
                    <Briefcase className="w-3 h-3 text-primary" />
                  )}
                </motion.div>

                {/* Card Container: slides in from right to left */}
                <SlideInCard index={index} direction="right">
                  <SpotlightCard className="p-6 space-y-4 bg-card/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                      <div>
                        <span
                          className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isTraining
                              ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                              : isEducation
                              ? "bg-primary/10 text-primary"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {isTraining
                            ? "Guided Training"
                            : isEducation
                            ? "Education"
                            : "Internship"}
                        </span>
                        <h3 className="font-display font-bold text-lg text-foreground mt-1.5">
                          {item.role}
                        </h3>
                        <p className="text-xs font-medium text-foreground/80 mt-0.5">
                          {item.organization}
                        </p>
                      </div>

                      <div className="text-xs text-muted-foreground font-mono space-y-1 sm:text-right">
                        <div className="flex items-center sm:justify-end gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.period}</span>
                        </div>
                        <div className="flex items-center sm:justify-end gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{item.location}</span>
                        </div>
                        {item.gradeOrStatus && (
                          <div
                            className={`text-xs font-mono font-bold ${
                              isTraining
                                ? "text-blue-500"
                                : "text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            {item.gradeOrStatus}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Highlights: subtle staggered fade-in after card lands */}
                    <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                      {item.highlights.map((point, pointIndex) => (
                        <motion.li
                          key={pointIndex}
                          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 3 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.25,
                            delay: prefersReducedMotion
                              ? 0
                              : cardDelay + 0.35 + pointIndex * 0.06,
                            ease: "easeOut",
                          }}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </SlideInCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
