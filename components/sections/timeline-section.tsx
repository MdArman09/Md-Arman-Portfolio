import * as React from "react";
import { timelineItems } from "@/data/experience";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import {
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
} from "lucide-react";

export function TimelineSection() {
  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
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
            Professional software development internship experience coupled with top-tier academic performance.
          </p>
        </div>

        {/* Vertical Connected Rail Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-border/70 space-y-10 ml-2 sm:ml-4">
          {timelineItems.map((item) => {
            const isEducation = item.type === "education";

            return (
              <div key={item.id} className="relative group">
                {/* Node indicator */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-2 border-background bg-card flex items-center justify-center text-primary shadow-xs group-hover:scale-110 group-hover:border-primary transition-all">
                  {isEducation ? (
                    <GraduationCap className="w-3 h-3 text-primary" />
                  ) : (
                    <Briefcase className="w-3 h-3 text-primary" />
                  )}
                </div>

                {/* Card Container */}
                <SpotlightCard className="p-6 space-y-4 bg-card/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-primary px-2 py-0.5 rounded bg-primary/10">
                        {isEducation ? "Education" : "Internship"}
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
                        <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {item.gradeOrStatus}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                    {item.highlights.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
