"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { timelineItems } from "@/data/experience";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { SlideInCard } from "@/components/motion/SlideInCard";
import { SectionHeader } from "@/components/motion/section-header";
import { SectionDivider } from "@/components/motion/section-divider";
import {
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { MOTION_EASE } from "@/lib/motion";

export function TimelineSection() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);
  const railRef = React.useRef<HTMLDivElement>(null);
  const sectionRef = React.useRef<HTMLElement>(null);

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

  // Scroll-linked progress fill of the vertical rail
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 70%", "end 70%"],
  });
  const railFillScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-x-clip"
    >
      <SectionDivider className="absolute top-0 inset-x-0" />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <SectionHeader
          eyebrowIcon={<Clock className="w-3.5 h-3.5" />}
          eyebrowText="05 // TRACK RECORD"
          title="Experience & Education"
          subtitle="Software development internship, hands-on SAP ABAP guided training, and academic excellence."
        />

        {/* Vertical Connected Rail Timeline */}
        <div ref={railRef} className="relative pl-[44px] sm:pl-12 space-y-10">
          {/* Base background vertical rail */}
          <motion.div
            initial={false}
            animate={
              isTimelineVisible || prefersReducedMotion
                ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
                : { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.001 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.7, ease: MOTION_EASE }
            }
            className="absolute left-[16px] sm:left-[20px] top-3 bottom-4 w-[2px] -translate-x-1/2 bg-border/60 dark:bg-border/40 pointer-events-none z-0"
            aria-hidden="true"
          />

          {/* Scroll-linked progress fill vertical rail */}
          <motion.div
            style={{
              scaleY: railFillScaleY,
              originY: 0,
            }}
            className="absolute left-[16px] sm:left-[20px] top-3 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary via-primary to-blue-500 pointer-events-none z-0 motion-reduce:hidden"
            aria-hidden="true"
          />

          {timelineItems.map((item, index) => {
            const isEducation = item.type === "education";
            const isTraining = item.type === "training";
            const delayStep = isMobile ? 0.1 : 0.18;
            const cardDelay = index * delayStep;
            const nodeDelay = Math.max(0, cardDelay - 0.06);
            const metaDelay = prefersReducedMotion ? 0 : cardDelay + 0.6 + 0.15;

            return (
              <div key={item.id} className="relative group">
                {/* Node indicator: centered exactly on line anchor, with soft pulsing ring on active/hover */}
                <motion.div
                  initial={false}
                  animate={
                    isTimelineVisible || prefersReducedMotion
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.6, opacity: 0.001 }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.3,
                          delay: nodeDelay,
                          ease: MOTION_EASE,
                        }
                  }
                  className="absolute left-[16px] sm:left-[20px] -translate-x-1/2 top-1.5 w-6 h-6 rounded-full border-2 border-background bg-card flex items-center justify-center text-primary shadow-xs group-hover:scale-110 group-hover:border-primary group-hover:ring-4 group-hover:ring-primary/20 transition-all z-10"
                >
                  {isEducation ? (
                    <GraduationCap className="w-3 h-3 text-primary" />
                  ) : isTraining ? (
                    <ShieldCheck className="w-3 h-3 text-blue-500" />
                  ) : (
                    <Briefcase className="w-3 h-3 text-primary" />
                  )}
                </motion.div>

                {/* Card Container: slides in from right to left (KEPT EXACTLY AS IT IS) */}
                <SlideInCard index={index} direction="right">
                  <SpotlightCard className="p-6 space-y-4 bg-card/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                      <div>
                        {/* Tag: fades in 150ms after card lands */}
                        <motion.span
                          initial={false}
                          animate={
                            isTimelineVisible || prefersReducedMotion
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 4 }
                          }
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : {
                                  duration: 0.3,
                                  delay: metaDelay,
                                  ease: MOTION_EASE,
                                }
                          }
                          className={`inline-block text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
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
                        </motion.span>
                        <h3 className="font-display font-bold text-lg text-foreground mt-1.5">
                          {item.role}
                        </h3>
                        <p className="text-xs font-medium text-foreground/80 mt-0.5">
                          {item.organization}
                        </p>
                      </div>

                      {/* Date/location meta: fades in 150ms after card lands */}
                      <motion.div
                        initial={false}
                        animate={
                          isTimelineVisible || prefersReducedMotion
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 4 }
                        }
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : {
                                duration: 0.3,
                                delay: metaDelay,
                                ease: MOTION_EASE,
                              }
                        }
                        className="text-xs text-muted-foreground font-mono space-y-1 sm:text-right"
                      >
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
                      </motion.div>
                    </div>

                    {/* Highlights: subtle staggered fade-in after card lands */}
                    <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                      {item.highlights.map((point, pointIndex) => (
                        <motion.li
                          key={pointIndex}
                          initial={false}
                          animate={
                            isTimelineVisible || prefersReducedMotion
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 3 }
                          }
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : {
                                  duration: 0.25,
                                  delay: cardDelay + 0.35 + pointIndex * 0.06,
                                  ease: "easeOut",
                                }
                          }
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
