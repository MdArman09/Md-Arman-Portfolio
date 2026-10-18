export interface TimelineItem {
  id: string;
  type: "experience" | "education";
  role: string;
  organization: string;
  location: string;
  period: string;
  gradeOrStatus?: string;
  highlights: string[];
}

export const timelineItems: TimelineItem[] = [
  {
    id: "plasmid-internship",
    type: "experience",
    role: "Web Development Intern",
    organization: "Plasmid Innovation Ltd",
    location: "Remote",
    period: "Apr 2024 - Jun 2024",
    highlights: [
      "Developed modular, responsive client-side interfaces for production web apps ensuring comprehensive cross-browser compatibility.",
      "Integrated RESTful API endpoints with frontend views for dynamic data rendering and asynchronous communication.",
      "Engaged in git-based engineering workflows: performed peer code reviews and resolved UI/logic defects prior to staging deployment.",
    ],
  },
  {
    id: "centurion-btech",
    type: "education",
    role: "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
    organization: "Centurion University of Technology and Management",
    location: "Bhubaneswar, Odisha, India",
    period: "Aug 2022 - Sep 2026",
    gradeOrStatus: "CGPA: 9.13 / 10",
    highlights: [
      "Rigorous curriculum focused on Algorithms, Object-Oriented Software Design, Database Systems, Operating Systems, and Enterprise Computing.",
      "Spearheaded multi-tier academic projects in Java Spring Boot and Servlet/JSP architectures with normalized database designs.",
    ],
  },
];
