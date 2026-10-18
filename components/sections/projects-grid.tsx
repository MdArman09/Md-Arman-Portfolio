"use client";

import * as React from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
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
  const prefersReducedMotion = useReducedMotion();

  const categories = ["All", "AI & Full-Stack", "Enterprise Java", "Web Systems"];

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const isInitialMountRef = React.useRef(true);

  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollMask = React.useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  React.useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollMask();

    el.addEventListener("scroll", updateScrollMask, { passive: true });
    window.addEventListener("resize", updateScrollMask);

    return () => {
      el.removeEventListener("scroll", updateScrollMask);
      window.removeEventListener("resize", updateScrollMask);
    };
  }, [updateScrollMask]);

  React.useEffect(() => {
    // Avoid scrolling or moving the window on initial page mount/refresh
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }

    const activeTabEl = tabRefs.current[selectedCategory];
    const container = scrollContainerRef.current;
    if (activeTabEl && container) {
      const scrollOffset =
        activeTabEl.offsetLeft -
        container.clientWidth / 2 +
        activeTabEl.clientWidth / 2;

      container.scrollTo({
        left: Math.max(0, scrollOffset),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
    const timer = setTimeout(updateScrollMask, 350);
    return () => clearTimeout(timer);
  }, [selectedCategory, prefersReducedMotion, updateScrollMask]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = categories.indexOf(selectedCategory);
    if (currentIndex === -1) return;

    let nextIndex = -1;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % categories.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = categories.length - 1;
    }

    if (nextIndex !== -1) {
      const nextCat = categories[nextIndex];
      setSelectedCategory(nextCat);
      tabRefs.current[nextCat]?.focus();
    }
  };

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const getMaskStyle = (): React.CSSProperties => {
    if (!canScrollLeft && !canScrollRight) {
      return {};
    }
    let gradient = "";
    if (canScrollLeft && canScrollRight) {
      gradient =
        "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)";
    } else if (canScrollRight) {
      gradient = "linear-gradient(to right, black, black calc(100% - 24px), transparent)";
    } else if (canScrollLeft) {
      gradient = "linear-gradient(to right, transparent, black 24px, black 100%)";
    }

    return {
      maskImage: gradient,
      WebkitMaskImage: gradient,
    };
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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

          {/* Filter Pills Bar: horizontally scrollable edge-to-edge on mobile, single row on desktop */}
          <div className="relative w-full md:w-auto self-start md:self-auto min-w-0">
            {/* Scroll Affordance Mask Wrapper */}
            <div
              style={getMaskStyle()}
              className="transition-[mask-image] duration-200 -mx-4 px-4 md:mx-0 md:px-0"
            >
              <div
                ref={scrollContainerRef}
                role="tablist"
                aria-label="Filter projects by category"
                onKeyDown={handleKeyDown}
                className="flex flex-nowrap items-center gap-2 overflow-x-auto [scroll-snap-type:x_proximity] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch] overscroll-x-contain py-1.5 px-0.5"
              >
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      ref={(el) => {
                        tabRefs.current[cat] = el;
                      }}
                      role="tab"
                      id={`tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                      aria-controls="projects-grid-list"
                      aria-selected={isSelected}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => setSelectedCategory(cat)}
                      className={`min-h-[40px] px-4 py-2 inline-flex items-center justify-center rounded-full text-xs sm:text-sm font-medium shrink-0 whitespace-nowrap [scroll-snap-align:start] transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                        isSelected
                          ? "bg-primary text-primary-foreground border border-primary shadow-xs font-semibold"
                          : "bg-muted/40 hover:bg-muted/70 text-muted-foreground hover:text-foreground border border-border/70 hover:border-border"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div
          id="projects-grid-list"
          role="tabpanel"
          aria-label={`${selectedCategory} projects`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
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
