import * as React from "react";
import { achievements } from "@/data/certifications";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { Award, CheckCircle, ShieldCheck, Trophy } from "lucide-react";

export function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div data-scroll-target className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
            <Award className="w-3.5 h-3.5" />
            <span>06 // CREDENTIALS & AWARDS</span>
          </div>
          <h2
            tabIndex={-1}
            className="font-display font-bold text-3xl sm:text-4xl text-foreground outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            Certifications & Honors
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            Industry recognized SAP developer certifications and competitive exhibition honors.
          </p>
        </div>

        {/* Badge-Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item) => {
            const isAward = item.type === "award";

            return (
              <SpotlightCard
                key={item.id}
                className={`p-6 space-y-5 flex flex-col justify-between ${
                  isAward ? "border-amber-500/30 bg-card" : "bg-card/70"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {isAward ? (
                        <Trophy className="w-5 h-5 text-amber-500" />
                      ) : (
                        <ShieldCheck className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {item.date}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-muted/60 text-muted-foreground">
                        {item.issuer}
                      </span>
                      {item.grade && (
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {item.grade}
                        </span>
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
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    Verified Credential
                  </span>
                  {item.badgeCode && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border bg-muted/40 text-muted-foreground">
                      {item.badgeCode}
                    </span>
                  )}
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
