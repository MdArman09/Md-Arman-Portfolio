"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skillGroups } from "@/data/skills";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { Layers, Terminal, Sparkles, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/motion/section-header";
import { SectionDivider } from "@/components/motion/section-divider";
import { Marquee } from "@/components/motion/marquee";
import { useSafeInView, MOTION_EASE } from "@/lib/motion";

const MARQUEE_TECH = [
  "Java 17/21",
  "Spring Boot",
  "SAP ABAP Cloud",
  "SAP Fiori / UI5",
  "Next.js 16",
  "React 19",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "REST APIs",
  "Tailwind CSS",
  "Clean Architecture",
];

export function Skills() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useSafeInView(sectionRef);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-x-clip"
    >
      <SectionDivider className="absolute top-0 inset-x-0" />

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <SectionHeader
          eyebrowIcon={<Layers className="w-3.5 h-3.5" />}
          eyebrowText="04 // TECHNICAL TOOLING"
          title="Skills & Competencies"
          subtitle="Verified competencies across enterprise Java backends, relational persistence, SAP ABAP development, and modern AI/web architectures."
        />

        {/* Faint infinite marquee strip of key tech names (desktop only, pause on hover) */}
        <Marquee items={MARQUEE_TECH} className="hidden md:flex opacity-80" />

        {/* Skills Cards Grid with Wave Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, index) => {
            const isMernAi = group.category.includes("MERN & AI");
            const isSapAbap = group.category.includes("SAP & ABAP");

            // Calculate grid wave delay: column + row
            const col = index % 3;
            const row = Math.floor(index / 3);
            const waveDelay = prefersReducedMotion ? 0 : 0.1 + (col + row) * 0.08;

            return (
              <motion.div
                key={group.category}
                initial={false}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
                }
                transition={{
                  duration: 0.55,
                  delay: waveDelay,
                  ease: MOTION_EASE,
                }}
                className="relative rounded-2xl flex flex-col"
              >
                {/* SAP Certified specialty card: slow rotating animated conic gradient border */}
                {isSapAbap && !prefersReducedMotion && (
                  <div
                    className="pointer-events-none absolute -inset-[1px] rounded-2xl overflow-hidden z-0"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_300deg,hsl(var(--primary))_360deg)] animate-conic-rotate opacity-50" />
                  </div>
                )}

                <SpotlightCard
                  className={`relative z-10 p-6 space-y-4 flex flex-col justify-between h-full ${
                    isMernAi
                      ? "border-primary/40 bg-card"
                      : isSapAbap
                      ? "border-blue-500/40 bg-card"
                      : "bg-card/70"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-base text-foreground flex items-center gap-2">
                        {isMernAi ? (
                          <Sparkles className="w-4 h-4 text-primary" />
                        ) : isSapAbap ? (
                          <ShieldCheck className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Terminal className="w-4 h-4 text-primary" />
                        )}
                        <span>{group.category}</span>
                      </h3>
                      {isSapAbap && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-semibold border border-blue-500/20">
                          SAP Certified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug">
                      {group.description}
                    </p>
                  </div>

                  {/* Subgroup rendering for SAP & ABAP */}
                  {group.subgroups ? (
                    <div className="space-y-3 pt-2">
                      {group.subgroups.map((sub, subIdx) => (
                        <div key={sub.name} className="space-y-1.5">
                          <span className="text-[11px] font-mono font-semibold text-foreground/80 block">
                            {sub.name}:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {sub.items.map((item, itemIdx) => {
                              const chipDelay = Math.min(
                                0.6,
                                waveDelay + 0.15 + (subIdx * 4 + itemIdx) * 0.025
                              );
                              return (
                                <motion.span
                                  key={item}
                                  initial={false}
                                  animate={
                                    isInView
                                      ? { opacity: 1, scale: 1 }
                                      : { opacity: 0, scale: 0.9 }
                                  }
                                  transition={{
                                    duration: 0.3,
                                    delay: prefersReducedMotion ? 0 : chipDelay,
                                    ease: MOTION_EASE,
                                  }}
                                  whileHover={
                                    prefersReducedMotion
                                      ? {}
                                      : {
                                          scale: 1.05,
                                          boxShadow: "0 0 12px hsla(var(--primary) / 0.25)",
                                        }
                                  }
                                  className="px-2 py-0.5 rounded-md text-[11px] font-mono border border-blue-500/30 bg-blue-500/5 text-foreground hover:bg-blue-500/15 transition-colors cursor-default"
                                >
                                  {item}
                                </motion.span>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {group.skills.map((skill, skillIdx) => {
                        const chipDelay = Math.min(
                          0.6,
                          waveDelay + 0.15 + skillIdx * 0.025
                        );
                        return (
                          <motion.span
                            key={skill}
                            initial={false}
                            animate={
                              isInView
                                ? { opacity: 1, scale: 1 }
                                : { opacity: 0, scale: 0.9 }
                            }
                            transition={{
                              duration: 0.3,
                              delay: prefersReducedMotion ? 0 : chipDelay,
                              ease: MOTION_EASE,
                            }}
                            whileHover={
                              prefersReducedMotion
                                ? {}
                                : {
                                    scale: 1.05,
                                    boxShadow: isMernAi
                                      ? "0 0 12px hsla(var(--primary) / 0.3)"
                                      : "0 0 10px hsla(var(--foreground) / 0.1)",
                                  }
                            }
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors cursor-default ${
                              isMernAi
                                ? "border-primary/30 bg-primary/5 text-primary hover:bg-primary/15"
                                : "border-border/80 bg-muted/40 text-foreground hover:bg-muted"
                            }`}
                          >
                            {skill}
                          </motion.span>
                        );
                      })}
                    </div>
                  )}
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
