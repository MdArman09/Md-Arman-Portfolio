"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
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

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50 overflow-x-clip">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
            <Clock className="w-3.5 h-3.5" />
            <span>05 // TRACK RECORD</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
            Experience & Education
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            Software development internship, hands-on SAP ABAP guided training, and academic excellence.
          </p>
        </div>

        {/* Vertical Connected Rail Timeline */}
        <div className="relative pl-6 sm:pl-8 space-y-10 ml-2 sm:ml-4">
          {/* Top-to-bottom drawing line */}
          <motion.div
            initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-2 bottom-3 w-0.5 bg-border/70 origin-top pointer-events-none"
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
                {/* Node indicator: pops in just before card slides in */}
                <motion.div
                  initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2, margin: "-80px" }}
                  transition={{
                    duration: 0.3,
                    delay: prefersReducedMotion ? 0 : nodeDelay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-2 border-background bg-card flex items-center justify-center text-primary shadow-xs group-hover:scale-110 group-hover:border-primary transition-all z-10"
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
