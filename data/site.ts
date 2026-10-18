export interface SiteConfig {
  name: string;
  title: string;
  headline: string;
  intro: string;
  location: string;
  email: string;
  phone: string;
  links: {
    github: string;
    linkedin: string;
    resume: string;
  };
  about: {
    summary: string;
    quickFacts: {
      label: string;
      value: string;
    }[];
  };
  navItems: {
    label: string;
    href: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Md Arman Alam",
  title: "Software Development Engineer (SDE) | Full-Stack Java Developer",
  headline: "Software Development Engineer",
  intro:
    "I build secure, scalable full-stack applications, from robust Spring Boot enterprise APIs to high-performance AI-powered products.",
  location: "Bangalore, Karnataka, India",
  email: "arman.dev09@gmail.com",
  phone: "+91-7978206195",
  links: {
    github: "https://github.com/MdArman09",
    linkedin: "https://linkedin.com/in/md-arman-alam",
    resume: "/Md_Arman_Alam_Resume.pdf",
  },
  about: {
    summary:
      "Computer Science graduate (9.13 CGPA) with strong competencies in Java, Spring Boot, RESTful Web Services, and relational database systems. Hands-on experience developing modular 3-tier enterprise applications, designing secure APIs with Role-Based Access Control (RBAC), and implementing responsive SPAs using Angular. Proficient in SDLC best practices, automated build processes (Maven), code reviews via Git, and algorithmic problem-solving in Java.",
    quickFacts: [
      { label: "Location", value: "Bangalore, Karnataka, India" },
      { label: "Academics", value: "9.13 / 10 CGPA" },
      { label: "Graduation", value: "B.Tech CSE (2022 - 2026)" },
      { label: "Core Focus", value: "Full-Stack Java, Distributed Systems & AI" },
      { label: "Status", value: "Open to SDE Roles" },
    ],
  },
  navItems: [
    { label: "About", href: "/#about" },
    { label: "Featured", href: "/#featured" },
    { label: "Projects", href: "/#projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Timeline", href: "/#timeline" },
    { label: "Certifications", href: "/#certifications" },
    { label: "Contact", href: "/#contact" },
  ],
};
