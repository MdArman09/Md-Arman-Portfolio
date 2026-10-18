import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { FeaturedProject } from "@/components/sections/featured-project";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Skills } from "@/components/sections/skills";
import { TimelineSection } from "@/components/sections/timeline-section";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <FeaturedProject />
      <ProjectsGrid />
      <Skills />
      <TimelineSection />
      <Certifications />
      <Contact />
    </main>
  );
}
