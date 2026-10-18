export interface TimelineItem {
  id: string;
  type: "experience" | "education" | "training";
  role: string;
  organization: string;
  location: string;
  period: string;
  gradeOrStatus?: string;
  highlights: string[];
}

export const timelineItems: TimelineItem[] = [
  {
    id: "eme-sap-training",
    type: "training",
    role: "SAP ABAP Trainee",
    organization: "EME Company (Centurion University of Technology and Management, Bhubaneswar)",
    location: "Bhubaneswar, Odisha, India",
    period: "Aug 2025 - Oct 2025",
    gradeOrStatus: "Training",
    highlights: [
      "Gained hands-on exposure to SAP ABAP development, including ALV Reports, Open SQL, Data Dictionary (DDIC), Internal Tables, and modular programming through guided training.",
      "Practiced developing and testing ABAP programs involving database CRUD operations and Open SQL-based data retrieval using custom and standard SAP tables.",
      "Applied debugging and modular programming techniques on ABAP exercises and mentor-guided development tasks.",
      "Gained conceptual understanding of the RICEF framework (Reports, Interfaces, Conversions, Enhancements, Forms) used in SAP implementation projects.",
    ],
  },
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
