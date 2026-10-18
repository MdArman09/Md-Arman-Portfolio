import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { GithubIcon } from "@/components/shared/icons";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Lock,
  Layers,
  CheckCircle2,
  Building,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) notFound();

  const project = projects[currentIndex];
  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <article className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Back Link */}
      <div>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4 border-b border-border/70 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            {project.category}
          </span>
          {project.context && (
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border/60 flex items-center gap-1">
              <Building className="w-3 h-3" />
              <span>{project.context}</span>
            </span>
          )}
          {project.isPrivate && (
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-muted/50 text-muted-foreground border border-border/50 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Academic / Private Repository</span>
            </span>
          )}
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl text-foreground tracking-tight">
          {project.title}
        </h1>

        <p className="font-display text-base sm:text-lg text-muted-foreground leading-relaxed">
          {project.tagline}
        </p>

        {/* Action Links */}
        <div className="flex items-center gap-3 pt-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/95 transition-colors shadow-xs"
            >
              <span>Live Application</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border border-border/60 bg-muted/30 text-muted-foreground cursor-not-allowed">
              <Lock className="w-3.5 h-3.5" />
              <span>Internal / Academic Platform</span>
            </span>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-border/80 bg-card hover:bg-muted text-foreground transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </header>

      {/* Description & Problem Context */}
      <section className="space-y-4">
        <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
          System Overview & Architecture
        </h2>
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border/80 text-sm sm:text-base leading-relaxed text-muted-foreground space-y-3">
          <p>{project.description}</p>
        </div>
      </section>

      {/* Architectural Highlights */}
      <section className="space-y-4">
        <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
          Key Engineering Deliverables & Implementation
        </h2>
        <div className="space-y-3">
          {project.highlights.map((point, index) => (
            <SpotlightCard
              key={index}
              className="p-4 bg-card/70 flex items-start gap-3 border-border/70"
            >
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-foreground leading-relaxed">
                {point}
              </span>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section className="space-y-4">
        <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <span>Technologies Utilized</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="px-3 py-1 rounded-lg text-xs font-mono border border-border/80 bg-card text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Next / Previous Project Navigation */}
      <nav
        aria-label="Project Case Studies Navigation"
        className="pt-10 border-t border-border/70 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <Link
          href={`/projects/${prevProject.slug}`}
          className="p-4 rounded-xl border border-border/70 bg-card/50 hover:bg-card hover:border-primary/40 transition-all flex flex-col items-start gap-1 group"
        >
          <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Project</span>
          </span>
          <span className="font-display font-bold text-sm text-foreground line-clamp-1">
            {prevProject.title}
          </span>
        </Link>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="p-4 rounded-xl border border-border/70 bg-card/50 hover:bg-card hover:border-primary/40 transition-all flex flex-col items-end gap-1 text-right group"
        >
          <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
            <span>Next Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <span className="font-display font-bold text-sm text-foreground line-clamp-1">
            {nextProject.title}
          </span>
        </Link>
      </nav>
    </article>
  );
}
