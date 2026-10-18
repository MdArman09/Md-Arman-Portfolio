import * as React from "react";
import { siteConfig } from "@/data/site";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { Sparkles, Terminal, ShieldCheck } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // PROFILE & BACKGROUND</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
            About Me
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            Software Development Engineer with a strong foundation in Java enterprise systems, API security, and AI integrations, certified in SAP ABAP Cloud and Fiori development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Avatar / Identity Card */}
          <div className="lg:col-span-5">
            <SpotlightCard className="p-8 text-center space-y-6">
              {/* Photo / Monogram Slot */}
              <div className="relative mx-auto w-36 h-36 rounded-3xl bg-gradient-to-tr from-primary/20 via-blue-500/20 to-cyan-400/20 p-1 border border-border/80 shadow-inner">
                <div className="w-full h-full rounded-[22px] bg-card flex flex-col items-center justify-center space-y-1 overflow-hidden relative">
                  <div className="absolute inset-0 bg-radial from-primary/10 to-transparent" />
                  <span className="font-display font-black text-4xl text-primary tracking-tight">
                    AA
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    Bengaluru, IN
                  </span>
                </div>
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
                  <span className="text-xs font-semibold text-primary font-mono">
                    9.13 / 10
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Narrative Summary & Quick Facts */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border/80 space-y-5">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Engineering Philosophy & Specialization</span>
              </h3>

              {/* Primary SDE Summary */}
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {siteConfig.about.summary}
              </p>

              {/* Second Paragraph: SAP ABAP & Fiori Specialization */}
              <div className="pt-4 border-t border-border/60 space-y-2">
                <span className="text-xs font-mono font-semibold text-primary flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>SAP Certified Associate</span>
                </span>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {siteConfig.about.sapSummary}
                </p>
              </div>
            </div>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siteConfig.about.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="p-4 rounded-xl border border-border/70 bg-card/60 hover:bg-card/90 transition-colors flex items-center justify-between"
                >
                  <span className="text-xs font-mono text-muted-foreground">
                    {fact.label}
                  </span>
                  <span className="text-xs font-semibold text-foreground text-right">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
