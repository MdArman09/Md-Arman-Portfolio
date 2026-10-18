export interface SectionConfig {
  id: string;
  title: string;
  hash: string;
}

export const SECTIONS: Record<string, SectionConfig> = {
  hero: {
    id: "hero",
    title: "Md Arman Alam | Software Development Engineer",
    hash: "",
  },
  about: {
    id: "about",
    title: "Md Arman Alam | About",
    hash: "#about",
  },
  featured: {
    id: "featured",
    title: "Md Arman Alam | AI Mock Interview Coach",
    hash: "#featured",
  },
  projects: {
    id: "projects",
    title: "Md Arman Alam | Projects",
    hash: "#projects",
  },
  skills: {
    id: "skills",
    title: "Md Arman Alam | Skills",
    hash: "#skills",
  },
  timeline: {
    id: "timeline",
    title: "Md Arman Alam | Experience & Education",
    hash: "#timeline",
  },
  certifications: {
    id: "certifications",
    title: "Md Arman Alam | Certifications",
    hash: "#certifications",
  },
  contact: {
    id: "contact",
    title: "Md Arman Alam | Contact",
    hash: "#contact",
  },
};

// Aliases for alternate naming references
SECTIONS["flagship"] = SECTIONS.featured;
SECTIONS["experience"] = SECTIONS.timeline;

export const SECTION_IDS: string[] = [
  "hero",
  "about",
  "featured",
  "projects",
  "skills",
  "timeline",
  "certifications",
  "contact",
];

export const DEFAULT_SECTION_ID = "hero";
