"use client";

import * as React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { GithubIcon } from "@/components/shared/icons";
import {
  ExternalLink,
  Code2,
  ArrowRight,
  Lock,
} from "lucide-react";

export function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", "AI & Full-Stack", "Enterprise Java", "Web Systems"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
              <Code2 className="w-3.5 h-3.5" />
              <span>03 // PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
              Projects & Engineering Work
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl">
              Enterprise Java 3-tier platforms, high-performance AI tooling, and MVC architectures.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-muted/40 border border-border/70 self-start sm:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isFlagship = project.id === "ai-mock-interview-coach";

            return (
              <SpotlightCard
                key={project.id}
                className={`flex flex-col justify-between ${
                  isFlagship ? "lg:col-span-2 border-primary/40 bg-card" : "bg-card/70"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                      {project.category}
                    </span>
                    {project.context && (
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {project.context}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                      <span>{project.title}</span>
                      {isFlagship && (
                        <span className="text-[10px] font-mono uppercase bg-primary text-primary-foreground px-2 py-0.5 rounded">
                          Flagship
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                    {project.highlights.slice(0, 3).map((hl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold shrink-0">•</span>
                        <span className="line-clamp-2">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-border/60 space-y-4 mt-6">
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/60 text-muted-foreground border border-border/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 6 && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/60 text-muted-foreground">
                        +{project.stack.length - 6} more
                      </span>
                    )}
                  </div>

                  {/* Action links */}
                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live Demo for ${project.title}`}
                          className="w-8 h-8 rounded-full border border-border/70 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub Repository for ${project.title}`}
                          className="w-8 h-8 rounded-full border border-border/70 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.isPrivate && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-muted/50 text-muted-foreground border border-border/50">
                          <Lock className="w-3 h-3" />
                          <span>Academic</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
