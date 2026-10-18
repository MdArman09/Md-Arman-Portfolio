export interface SiteConfig {
  name: string;
  title: string;
  secondaryTitle: string;
  headline: string;
  roles: string[];
  intro: string;
  location: string;
  email: string;
  phone: string;
  links: {
    github: string;
    linkedin: string;
    resume: string;
    resumeSde: string;
    resumeAbap: string;
  };
  about: {
    summary: string;
    sapSummary: string;
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
  secondaryTitle: "SAP ABAP Developer | SAP Certified",
  headline: "Software Development Engineer",
  roles: [
    "Software Development Engineer",
    "MERN Developer",
    "SAP ABAP Developer",
  ],
  intro:
    "I build secure, scalable full-stack applications, from robust Spring Boot enterprise APIs to high-performance AI-powered products.",
  location: "Bangalore, Karnataka, India",
  email: "arman.dev09@gmail.com",
  phone: "+91-7978206195",
  links: {
    github: "https://github.com/MdArman09",
    linkedin: "https://linkedin.com/in/md-arman-alam",
    resume: "/Md_Arman_SDE.pdf",
    resumeSde: "/Md_Arman_SDE.pdf",
    resumeAbap: "/Md Arman - SAP ABAP (Resume).pdf",
  },
  about: {
    summary:
      "Computer Science graduate (9.13 CGPA) with strong competencies in Java, Spring Boot, RESTful Web Services, and relational database systems. Hands-on experience developing modular 3-tier enterprise applications, designing secure APIs with Role-Based Access Control (RBAC), and implementing responsive SPAs using Angular. Proficient in SDLC best practices, automated build processes (Maven), code reviews via Git, and algorithmic problem-solving in Java.",
    sapSummary:
      "SAP Certified Associate in Back-End Development (ABAP Cloud) and SAP Fiori Application Development, with hands-on training in Open SQL, Data Dictionary (DDIC), ALV Reports, Internal Tables, and modular programming.",
    quickFacts: [
      { label: "Location", value: "Bangalore, Karnataka, India" },
      { label: "Academics", value: "9.13 / 10 CGPA" },
      { label: "Graduation", value: "B.Tech CSE (2022 - 2026)" },
      { label: "Core Focus", value: "Full-Stack Java, Distributed Systems & AI" },
      { label: "SAP Focus", value: "ABAP Cloud, Fiori & Open SQL" },
      { label: "Status", value: "Open to SDE & SAP ABAP Roles" },
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
