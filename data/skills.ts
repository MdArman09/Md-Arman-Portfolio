export interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
  subgroups?: {
    name: string;
    items: string[];
  }[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    description: "Type-safe systems, object-oriented paradigms, and database query languages",
    skills: [
      "Java (Core & J2EE)",
      "SQL / Open SQL",
      "ABAP",
      "TypeScript",
      "JavaScript",
      "HTML5/CSS3",
    ],
  },
  {
    category: "SAP & ABAP (Certified Specialty)",
    description: "Official SAP certifications in ABAP Cloud & Fiori, enterprise DDIC, and RICEF reporting",
    skills: [
      "Data Dictionary (DDIC)",
      "Internal Tables",
      "ALV Reports",
      "Selection Screens",
      "Subroutines & Modular Programming",
      "ABAP Debugging",
      "OO ABAP",
      "Classical & Interactive Reports",
      "RICEF Framework",
      "BAPI",
      "SmartForms",
      "SAP Logon & SAP GUI",
      "SAP Fiori",
    ],
    subgroups: [
      {
        name: "ABAP Development",
        items: [
          "Data Dictionary (DDIC)",
          "Internal Tables",
          "ALV Reports",
          "Selection Screens",
          "Subroutines",
          "Modular Programming",
          "Debugging",
        ],
      },
      {
        name: "ABAP Concepts",
        items: [
          "OO ABAP",
          "Classical Reports",
          "Interactive Reports",
          "RICEF",
          "BAPI",
          "SmartForms",
        ],
      },
      {
        name: "SAP Technologies",
        items: ["SAP Logon", "SAP GUI", "SAP Fiori"],
      },
    ],
  },
  {
    category: "Frameworks & Web",
    description: "Enterprise backend development, persistence frameworks, and SPAs",
    skills: [
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "Angular",
      "RESTful APIs",
      "Servlets",
      "JSP",
    ],
  },
  {
    category: "Databases & Cloud",
    description: "Relational modeling, transaction isolation, and cloud authentication",
    skills: ["MySQL", "MongoDB Atlas", "Firebase Auth"],
  },
  {
    category: "Developer Tools",
    description: "Version control, build automation, servlet containers, and API testing",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "Maven",
      "Apache Tomcat",
      "VS Code",
      "Eclipse",
    ],
  },
  {
    category: "Core Computer Science",
    description: "Foundational CS principles and robust software engineering practices",
    skills: [
      "Object-Oriented Programming (OOP)",
      "Database Management Systems (DBMS)",
      "Operating Systems",
      "SDLC Best Practices",
    ],
  },
  {
    category: "MERN & AI (Flagship Stack)",
    description: "Modern full-stack JavaScript, high-speed LLM inference, and deployment platforms",
    skills: [
      "React 19",
      "Node.js",
      "Express",
      "MongoDB / Mongoose",
      "Groq (Llama 3.3 70B)",
      "Tailwind CSS",
      "Vite",
      "Framer Motion",
      "JWT",
      "Zod",
      "Vercel",
      "Render",
    ],
  },
];
