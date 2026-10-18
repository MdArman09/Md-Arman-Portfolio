import * as React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ResumePipelineDiagram() {
  const steps = [
    {
      step: "01",
      title: "Upload & Validation",
      detail: "5MB max limit • Magic-byte check (%PDF- / DOCX xml)",
      badge: "Security",
    },
    {
      step: "02",
      title: "Text Extraction",
      detail: "pdf-parse / mammoth • Sanitized text stream",
      badge: "Parser",
    },
    {
      step: "03",
      title: "Stage 1: Profile Extraction",
      detail: "Extract skills, years of experience, primary roles",
      badge: "AI Extraction",
    },
    {
      step: "04",
      title: "Deterministic Budgeting",
      detail: "Code-computed level (fresher/mid/senior) & question count",
      badge: "Zero-LLM Math",
    },
    {
      step: "05",
      title: "Stage 2: Batched Generation",
      detail: "10-40 targeted questions with Groq JSON mode fallback",
      badge: "Groq SDK",
    },
    {
      step: "06",
      title: "Storage & Practice",
      detail: "Persisted to MongoDB • Ready for real-time interview",
      badge: "Persistence",
    },
  ];

  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="min-w-[800px] p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground">
              Two-Stage Deterministic Resume Pipeline
            </span>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">
            Deterministic Code Budgeting Instead of LLM Arithmetic
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2 items-center">
          {steps.map((item, idx) => (
            <React.Fragment key={item.step}>
              <div className="p-3 rounded-xl border border-border/70 bg-background/80 shadow-xs flex flex-col justify-between h-40">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-primary">
                      {item.step}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {item.badge}
                    </span>
                  </div>
                  <h5 className="font-display font-semibold text-xs text-foreground mb-1">
                    {item.title}
                  </h5>
                  <p className="text-[10px] text-muted-foreground leading-snug">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3 h-3 mr-1 shrink-0" />
                  <span>Verified</span>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex justify-center text-muted-foreground">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
