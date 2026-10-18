import * as React from "react";
import { skillGroups } from "@/data/skills";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { Layers, Terminal, Sparkles } from "lucide-react";

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
            <Layers className="w-3.5 h-3.5" />
            <span>04 // TECHNICAL TOOLING</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
            Skills & Competencies
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            Verified competencies across enterprise Java backends, relational persistence, and modern AI/web architectures.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => {
            const isMernAi = group.category.includes("MERN & AI");

            return (
              <SpotlightCard
                key={group.category}
                className={`p-6 space-y-4 flex flex-col justify-between ${
                  isMernAi ? "border-primary/40 bg-card" : "bg-card/70"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-base text-foreground flex items-center gap-2">
                      {isMernAi ? (
                        <Sparkles className="w-4 h-4 text-primary" />
                      ) : (
                        <Terminal className="w-4 h-4 text-primary" />
                      )}
                      <span>{group.category}</span>
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {group.description}
                  </p>
                </div>

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
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
