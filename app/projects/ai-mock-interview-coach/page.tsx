import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { SystemArchitectureDiagram } from "@/components/diagrams/system-architecture";
import { ResumePipelineDiagram } from "@/components/diagrams/resume-pipeline";
import { GithubIcon } from "@/components/shared/icons";
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Case Study: AI Mock Interview Coach | Md Arman Alam",
  description:
    "Full-stack case study of AI Mock Interview Coach: real-time speech diagnostics, STAR feedback, and resilient Groq LLM orchestration.",
};

export default function AiMockInterviewCoachPage() {
  const project = projects.find((p) => p.slug === "ai-mock-interview-coach");
  if (!project) notFound();

  return (
    <article className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-14">
      {/* Back to Home Link */}
      <div>
        <Link
          href="/#featured"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio Overview</span>
        </Link>
      </div>

      {/* Hero Header */}
      <header className="space-y-6 border-b border-border/70 pb-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            Flagship Project Case Study
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border/60">
            React 19 • Express 4 • Groq Llama 3.3
          </span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-foreground tracking-tight">
          {project.title}
        </h1>

        <p className="font-display text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          {project.tagline}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/95 transition-colors shadow-md"
            >
              <span>Live Application</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-border/80 bg-card hover:bg-muted text-foreground transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          )}
        </div>

        {/* Cold Start Notice */}
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
          <span>
            <strong>Free-Tier Hosting Notice:</strong> The backend API is hosted on Render free tier. The first API request after inactivity may take approximately ~50-60 seconds for container wake-up.
          </span>
        </div>
      </header>

      {/* Screenshot / Gallery Placeholder */}
      <section className="space-y-3">
        <h2 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span>Visual Walkthrough & Gallery</span>
        </h2>
        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 sm:p-10 text-center space-y-4">
          <div className="w-full h-64 sm:h-80 rounded-xl border-2 border-dashed border-border/70 flex flex-col items-center justify-center p-6 bg-muted/20">
            <Sparkles className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-display font-semibold text-base text-foreground">
              Interactive Interview Session Preview
            </h3>
            <p className="text-xs text-muted-foreground max-w-md mt-1">
              Live speech waveform, real-time STAR cue pills, and code-computed WPM/filler diagnostic cards.
            </p>
          </div>
          <p className="text-[11px] font-mono text-muted-foreground">
            Screenshot slot: ready for local replacement in public/projects/
          </p>
        </div>
      </section>

      {/* The Problem & The Why */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
          <span>01 // PROBLEM STATEMENT</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
          Why I Built It
        </h2>
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border/80 space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
          <p>{project.whyIBuiltIt}</p>
          <p>
            Standard LLM-only mock interview platforms often suffer from hallucinated analytics (e.g. asking the LLM to count words or calculate talking speed), privacy concerns around uploading voice audio, and generic questions that ignore the candidate’s specific resume depth. This platform was engineered from the ground up to eliminate those flaws through deterministic computation and client-side processing.
          </p>
        </div>
      </section>

      {/* Key Architectural & System Diagrams */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
          <span>02 // ARCHITECTURE</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
          System Architecture & Topology
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Clean separation of concerns: React client-side speech processing on Vercel Edge, hardened Express API on Render, and streaming Groq LLM inference.
        </p>

        <SystemArchitectureDiagram />
      </section>

      {/* Two-Stage Resume Pipeline */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
          <span>03 // RESUME INGESTION</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
          Two-Stage Deterministic Resume Pipeline
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Instead of asking the LLM to do arithmetic on question budgets, experience detection and question counts are evaluated in deterministic code before batched LLM generation.
        </p>

        <ResumePipelineDiagram />
      </section>

      {/* Core Feature Deep-Dive */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
          <span>04 // CAPABILITIES</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
          Key Functional Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.features?.map((feature, idx) => (
            <SpotlightCard
              key={idx}
              className="p-5 bg-card/70 flex items-start gap-3 border-border/70"
            >
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-foreground leading-relaxed">
                {feature}
              </span>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Deep Engineering Highlights */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
          <span>05 // ENGINEERING EXCELLENCE</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
          Engineering Highlights & Hardening
        </h2>

        <div className="space-y-3">
          {project.engineeringHighlights?.map((highlight, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-border/70 bg-card/60 flex items-start gap-3 text-xs sm:text-sm"
            >
              <span className="font-mono text-xs font-bold text-primary shrink-0 mt-0.5">
                {(idx + 1).toString().padStart(2, "0")}
              </span>
              <span className="text-foreground leading-relaxed">{highlight}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Security & Privacy Architecture */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
          <span>06 // PRIVACY & SECURITY</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
          Security and Privacy Architecture
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SpotlightCard className="p-6 bg-card/80 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Zero Raw Voice Storage</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {project.privacyNotes}
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-card/80 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Lock className="w-4 h-4 text-primary" />
              <span>Cryptographic Session Invalidation</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Monotonic tokenVersion in JWT payload allows instant global logout on all devices with zero Redis overhead. SHA-256 hashed single-use OTPs expire automatically with Mongo TTL.
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* Production Tech Stack Table */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
          <span>07 // STACK MATRIX</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
          Production Technology Stack
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-border/80 bg-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 font-mono text-muted-foreground border-b border-border/60">
              <tr>
                <th className="p-3.5">Layer</th>
                <th className="p-3.5">Technologies</th>
                <th className="p-3.5">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-mono">
              <tr>
                <td className="p-3.5 font-bold text-foreground">Client Tier</td>
                <td className="p-3.5 text-primary">React 19, Vite, Tailwind CSS, Framer Motion, React Router 7</td>
                <td className="p-3.5 text-muted-foreground font-sans">Modern reactive SPA with Web Speech API and responsive UI</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-foreground">API Backend</td>
                <td className="p-3.5 text-primary">Node.js, Express 4, Zod, Helmet, express-rate-limit</td>
                <td className="p-3.5 text-muted-foreground font-sans">Hardened REST services, strict payload validation, and tiered rate limits</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-foreground">AI Inference</td>
                <td className="p-3.5 text-primary">Groq SDK (llama-3.3-70b-versatile, openai/gpt-oss-120b fallback)</td>
                <td className="p-3.5 text-muted-foreground font-sans">High-speed sub-second token generation with JSON-mode structure</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-foreground">Data Layer</td>
                <td className="p-3.5 text-primary">MongoDB Atlas, Mongoose</td>
                <td className="p-3.5 text-muted-foreground font-sans">TTL indexes for OTP expiry, structured question banks & session records</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-foreground">Communications</td>
                <td className="p-3.5 text-primary">Brevo API (HTTPS port 443), Google OAuth 2.0</td>
                <td className="p-3.5 text-muted-foreground font-sans">Non-blocking transactional emails and secure federated identity</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-foreground">Infrastructure</td>
                <td className="p-3.5 text-primary">Vercel (Client Edge), Render (API Server)</td>
                <td className="p-3.5 text-muted-foreground font-sans">High availability CDN hosting with continuous git delivery</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Roadmap Strip */}
      <section className="space-y-4 border-t border-border/60 pt-8">
        <h3 className="font-display font-bold text-base uppercase tracking-wider text-foreground flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span>What&apos;s Next (Roadmap)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {project.roadmap?.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-border/70 bg-muted/20 text-xs text-foreground flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="pt-8 border-t border-border/70 flex items-center justify-between">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Projects</span>
        </Link>

        <Link
          href="/projects/sports-event-management-system"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          <span>Next: Sports Event Management System</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
