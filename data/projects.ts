export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  context?: string;
  category: "AI & Full-Stack" | "Enterprise Java" | "Web Systems";
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  isPrivate?: boolean;
  stack: string[];
  description: string;
  whyIBuiltIt?: string;
  highlights: string[];
  features?: string[];
  engineeringHighlights?: string[];
  privacyNotes?: string;
  roadmap?: string[];
  renderColdStartNote?: boolean;
}

export const projects: Project[] = [
  {
    id: "ai-mock-interview-coach",
    slug: "ai-mock-interview-coach",
    title: "AI Mock Interview Coach",
    tagline:
      "An interactive interview practice platform providing real-time voice and typed evaluations, code-computed pacing and filler-word metrics, and structured STAR feedback powered by Groq.",
    category: "AI & Full-Stack",
    featured: true,
    liveUrl: "https://ai-mock-interview-coach-rho.vercel.app",
    githubUrl: "https://github.com/MdArman09/AI-Mock-Interview-Coach",
    stack: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "React Router 7",
      "Node.js",
      "Express 4",
      "MongoDB Atlas",
      "Mongoose",
      "Groq SDK (Llama 3.3 70B)",
      "JWT",
      "bcryptjs",
      "Zod",
      "Helmet",
      "express-rate-limit",
      "pdf-parse",
      "mammoth",
      "Brevo email API",
      "Google OAuth 2.0",
      "Vercel",
      "Render",
    ],
    description:
      "A full-stack, AI-powered interactive mock interview platform engineered for deterministic speech analysis, resume-aware custom question generation, and structured behavioral evaluations.",
    whyIBuiltIt:
      "Practicing interview answers alone gives no actionable signal. The tool computes speaking rate and filler counts in code, pulls exact quotes from the transcript to verify each STAR stage, and suggests a restructured stronger answer.",
    features: [
      "Dual input: speak (browser Web Speech API) or type answers",
      "STAR evaluation: Situation, Task, Action, Result each scored 0-10 with detected/missing badges and evidence quotes from the transcript",
      "Code-computed metrics: WPM, duration, filler-word counts (10 phrases), calibrated filler score",
      "Live STAR cue pills while recording to keep pacing and structure on track",
      "Resume-tailored questions: upload PDF/DOCX, two-stage analysis, experience level detection (fresher/junior/mid/senior), generating 10-40 targeted questions",
      "Question bank with search and filters by category and difficulty",
      "Enterprise-grade auth: email+password (bcrypt), 6-digit email OTP verification, password reset, Google OAuth, session revocation via JWT tokenVersion, full cascade account deletion",
      "Polished UX: warm editorial theme, dark mode support, optimistic deletes with 6-second Undo toast, responsive sidebar + mobile bottom nav",
    ],
    engineeringHighlights: [
      "Two-stage resume pipeline: question budget computed in deterministic code instead of asking the LLM to do arithmetic",
      "Deterministic speech metrics computed in code before the LLM call to prevent hallucinated stats",
      "Resilient Groq JSON-mode orchestration: model fallback (llama-3.3-70b-versatile to openai/gpt-oss-120b), concurrency-limited queue, and exponential backoff honoring retry-after headers",
      "Multi-tier rate limiting: per-IP on auth routes plus per-user hourly and daily AI inference quotas",
      "Cryptographic security: SHA-256 hashed single-use OTP/reset tokens with MongoDB TTL expiry",
      "Monotonic tokenVersion for instantaneous global session revocation across devices without requiring Redis",
      "Non-blocking transactional email over HTTPS (Brevo, port 443) to avoid SMTP port blocking on free cloud hosts",
      "Upload hardening: 5MB strict cap, magic-byte validation (%PDF-, DOCX word/document.xml), and recursive NoSQL-injection sanitization",
    ],
    privacyNotes:
      "Raw audio is never sent to or stored on servers; speech-to-text processing executes client-side in the browser, transmitting only transcript text and duration.",
    roadmap: [
      "Adaptive dynamic follow-up questions based on answer depth",
      "Side-by-side interactive model answer diffing",
      "Comprehensive historical progress analytics dashboard",
      "Full interview session PDF report export",
    ],
    renderColdStartNote: true,
    highlights: [
      "Dual input (Web Speech API + typing) with zero server audio storage",
      "Deterministic code-computed pacing, WPM, and 10 filler-word detection",
      "Two-stage resume parsing pipeline extracting 10-40 targeted questions",
      "Resilient Groq JSON orchestration with exponential backoff & model fallback",
    ],
  },
  {
    id: "sports-event-management-system",
    slug: "sports-event-management-system",
    title: "Sports Event Management System (SEMS)",
    tagline:
      "A 3-tier enterprise platform with secured RESTful APIs for tournament coordination, multi-entity scheduling, and RBAC.",
    context: "Centurion University",
    category: "Enterprise Java",
    featured: false,
    isPrivate: true,
    stack: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "MySQL",
      "Angular",
      "Firebase Auth",
      "Postman",
      "Maven",
    ],
    description:
      "Architected a modular 3-tier platform with Spring Boot exposing secured RESTful APIs for multi-entity CRUD workflows across venues, teams, and tournament schedules.",
    highlights: [
      "Architected a 3-tier platform with Spring Boot exposing secured RESTful APIs for multi-entity CRUD workflows across venues, teams, and tournament schedules",
      "Engineered a normalized MySQL database using Hibernate ORM, enforcing foreign-key integrity and transactional boundaries",
      "Implemented token-based authentication with Role-Based Access Control (RBAC) and responsive Angular dashboards for event coordination",
      "Streamlined automated builds with Maven and executed endpoint contract testing and status-code verification with Postman",
    ],
  },
  {
    id: "centurion-library-management-system",
    slug: "centurion-library-management-system",
    title: "Centurion Library Management System (CLMS)",
    tagline:
      "MVC-pattern web application automating circulation lifecycles, availability tracking, and relational integrity.",
    context: "Centurion University",
    category: "Web Systems",
    featured: false,
    isPrivate: true,
    stack: [
      "Java",
      "Servlets",
      "JSP",
      "JDBC",
      "MySQL",
      "Apache Tomcat",
      "MVC",
      "HTML5/CSS3",
      "JavaScript",
    ],
    description:
      "Applied classical MVC architecture using Java Servlets, dynamic JSP pages, and optimized JDBC transactions on Apache Tomcat.",
    highlights: [
      "Applied the MVC pattern: Servlets for request routing and business logic execution, JSP for dynamic data-bound UI",
      "Designed a 3NF MySQL schema, optimized multi-table joins, and enforced relational integrity across patrons, catalog, and borrow logs",
      "Implemented RBAC and business logic automating circulation lifecycle, real-time book availability tracking, and overdue fine calculation",
      "Managed robust user state via HttpSession and fine-grained JDBC transactions on Apache Tomcat",
    ],
  },
];
