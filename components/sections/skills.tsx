import * as React from "react";
import { skillGroups } from "@/data/skills";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { Layers, Terminal, Sparkles, ShieldCheck } from "lucide-react";

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div data-scroll-target className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
            <Layers className="w-3.5 h-3.5" />
            <span>04 // TECHNICAL TOOLING</span>
          </div>
          <h2
            tabIndex={-1}
            className="font-display font-bold text-3xl sm:text-4xl text-foreground outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            Skills & Competencies
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            Verified competencies across enterprise Java backends, relational persistence, SAP ABAP development, and modern AI/web architectures.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => {
            const isMernAi = group.category.includes("MERN & AI");
            const isSapAbap = group.category.includes("SAP & ABAP");

            return (
              <SpotlightCard
                key={group.category}
                className={`p-6 space-y-4 flex flex-col justify-between ${
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
                    {group.subgroups.map((sub) => (
                      <div key={sub.name} className="space-y-1.5">
                        <span className="text-[11px] font-mono font-semibold text-foreground/80 block">
                          {sub.name}:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sub.items.map((item) => (
                            <span
                              key={item}
                              className="px-2 py-0.5 rounded-md text-[11px] font-mono border border-blue-500/30 bg-blue-500/5 text-foreground hover:bg-blue-500/15 transition-colors"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
                          isMernAi
                            ? "border-primary/30 bg-primary/5 text-primary hover:bg-primary/15"
                            : "border-border/80 bg-muted/40 text-foreground hover:bg-muted"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
