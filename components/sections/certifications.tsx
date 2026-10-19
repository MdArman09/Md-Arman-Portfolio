"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { achievements } from "@/data/certifications";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { Award, ShieldCheck, Trophy } from "lucide-react";
import { SectionHeader } from "@/components/motion/section-header";
import { SectionDivider } from "@/components/motion/section-divider";
import { useSafeInView, MOTION_EASE } from "@/lib/motion";

export function Certifications() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useSafeInView(sectionRef);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-x-clip"
    >
      <SectionDivider className="absolute top-0 inset-x-0" />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <SectionHeader
          eyebrowIcon={<Award className="w-3.5 h-3.5" />}
          eyebrowText="06 // CREDENTIALS & AWARDS"
          title="Certifications & Honors"
          subtitle="Industry recognized SAP developer certifications and competitive exhibition honors."
        />

        {/* Badge-Style Grid with 3D Flip-up entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 [perspective:1000px]">
          {achievements.map((item, index) => {
            const isAward = item.type === "award";
            const cardDelay = prefersReducedMotion ? 0 : index * 0.12;

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={
                  isInView || prefersReducedMotion
                    ? { opacity: 1, rotateX: 0, y: 0 }
                    : {
                        opacity: 0,
                        rotateX: 20,
                        y: 24,
                      }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.65,
                        delay: cardDelay,
                        ease: MOTION_EASE,
                      }
                }
                style={{ transformOrigin: "bottom center" }}
                whileHover={prefersReducedMotion ? {} : { y: -6 }}
                className="group relative rounded-2xl will-change-transform flex flex-col"
              >
                <SpotlightCard
                  className={`p-6 space-y-5 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 ${
                    isAward
                      ? "border-amber-500/30 bg-card group-hover:border-amber-500/50 group-hover:shadow-[0_0_24px_rgba(245,158,11,0.18)]"
                      : "bg-card/70 group-hover:border-blue-500/50 group-hover:shadow-[0_0_24px_rgba(59,130,246,0.18)]"
                  }`}
                >
                  {/* Diagonal shine sweep across card on hover */}
                  <div
                    className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -rotate-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out motion-reduce:hidden"
                    aria-hidden="true"
                  />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {isAward ? (
                          <Trophy className="w-5 h-5 text-amber-500" />
                        ) : (
                          <ShieldCheck className="w-5 h-5 text-primary" />
                        )}
                      </div>

                      {/* Date chip slides in from the top */}
                      <motion.span
                        initial={false}
                        animate={
                          isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
                        }
                        transition={{
                          duration: 0.4,
                          delay: cardDelay + 0.2,
                          ease: MOTION_EASE,
                        }}
                        className="text-[11px] font-mono text-muted-foreground"
                      >
                        {item.date}
                      </motion.span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-muted/60 text-muted-foreground">
                          {item.issuer}
                        </span>
                        {item.grade && (
                          <motion.span
                            initial={false}
                            animate={
                              isInView ? { scale: [1, 1.08, 1] } : { scale: 1 }
                            }
                            transition={{
                              duration: 0.5,
                              delay: cardDelay + 0.35,
                              ease: MOTION_EASE,
                            }}
                            className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          >
                            {item.grade}
                          </motion.span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-base text-foreground leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-medium text-foreground flex items-center gap-1.5">
                      {/* Verified Credential checkmark draws itself */}
                      <svg
                        className="w-3.5 h-3.5 text-emerald-500 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <motion.path
                          d="M8 12l3 3 5-5"
                          initial={false}
                          animate={
                            isInView
                              ? { pathLength: 1, opacity: 1 }
                              : { pathLength: 0, opacity: 0 }
                          }
                          transition={{
                            duration: 0.5,
                            delay: cardDelay + 0.3,
                            ease: "easeOut",
                          }}
                        />
                      </svg>
                      Verified Credential
                    </span>
                    {item.badgeCode && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border bg-muted/40 text-muted-foreground">
                        {item.badgeCode}
                      </span>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
