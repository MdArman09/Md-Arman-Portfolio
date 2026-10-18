# Md Arman Alam — Personal Portfolio & Engineering Showcase

> **Production-ready, accessible, fast, and visually distinctive developer portfolio positioning Md Arman Alam as a Software Development Engineer (SDE) and Full-Stack Java Developer, featuring an AI flagship project.**

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 🎨 Aesthetic Direction & Design System

* **Design Concept**: **"Technical Precision / Deep Slate & Electric Cobalt"**
  * Built to communicate senior-level software engineering rigour, architectural clarity, and full-stack execution rather than a generic developer template or the warm-paper palette of the interview coach project.
* **Palette Tokens** (Light & Dark mode via CSS variables in `app/globals.css`):
  * **Dark Mode** (Primary showcase): Deep slate obsidian `hsl(222, 47%, 7%)` (`#090D16`), Card surfaces `hsl(217, 33%, 12%)` (`#111827`), Subtle luminous borders `hsl(217, 24%, 18%)`.
  * **Light Mode**: Crisp architectural slate `hsl(210, 40%, 98%)` (`#F8FAFC`), Pure card white `hsl(0, 0%, 100%)`, Defined borders `hsl(214, 32%, 88%)`.
  * **Primary Accent**: Electric Cobalt `hsl(221, 83%, 53%)` (`#2563EB`) in light, `hsl(217, 91%, 60%)` (`#3B82F6`) in dark.
  * **Signal Accent**: Emerald `hsl(142, 71%, 45%)` (`#10B981`) for the pulsing "Open to SDE roles" status badge.
* **Typography**:
  * **Headings / Display**: `Space Grotesk` (geometric, structured engineering feel)
  * **Body / UI**: `Inter` (optimal legibility, tabular numerals)
  * **Code / Badges / Metrics**: `JetBrains Mono` (high-fidelity monospace precision)
* **Accessibility & Motion**:
  * WCAG AA contrast ratio compliance ($\ge 4.5:1$ for body copy, $\ge 3:1$ for large text and interactive boundaries).
  * Strict `prefers-reduced-motion` compliance across CSS and component animations.
  * Keyboard accessibility with skip links, visible focus rings, and an interactive `⌘K` command palette.

---

## 🧩 21st.dev Component Integration

Modern React components sourced and adapted from **21st.dev**, unified under custom design tokens:

| Component | 21st.dev Source | Purpose |
| :--- | :--- | :--- |
| **Grid Background** | `appica-dev/background-pattern` | Interactive canvas with mouse-following radial spotlight glow |
| **Floating Navbar** | `preetsuthar17/navbar-1` | Floating pill header with glassmorphism blur, active link indicator, and `⌘K` trigger |
| **Shimmer Button** | `dillionverma/shimmer-button` | Animated perimeter shimmer on the primary CTA ("View Flagship Project") |
| **Spotlight Card** | `preetsuthar17/spotlight-card` & `ibelick/spotlight` | Interactive cards with mouse-tracking radial border and background glow |
| **Projects Bento Grid** | `designali-in/bento-grid` | Responsive asymmetric bento grid with category filters and tech tags |
| **Vertical Timeline** | `cubby-ui/timeline` | Connected rail timeline for internship experience and B.Tech education |
| **Command Palette** | `properui/command-menu` (`cmdk`) | `⌘K` / `Ctrl+K` keyboard dialog for jumping between sections and case studies |
| **Footer** | `scrollxui/footer-with-suite` | Typographic brand wordmark with social links and tech credits |

---

## 🚀 Projects Showcased

1. **AI Mock Interview Coach (Flagship Project)**
   * *Tagline*: Interactive interview practice platform providing real-time voice and typed evaluations, code-computed pacing and filler-word metrics, and structured STAR feedback powered by Groq.
   * *Stack*: React 19, Vite, Tailwind CSS, Framer Motion, React Router 7, Node.js, Express 4, MongoDB Atlas, Groq SDK (Llama 3.3 70B), JWT, Zod, Helmet, Brevo API, Google OAuth 2.0, Vercel, Render.
   * *Full Case Study Route*: [`/projects/ai-mock-interview-coach`](file:///app/projects/ai-mock-interview-coach/page.tsx)
   * *Live*: [ai-mock-interview-coach-rho.vercel.app](https://ai-mock-interview-coach-rho.vercel.app)
   * *GitHub*: [github.com/MdArman09/AI-Mock-Interview-Coach](https://github.com/MdArman09/AI-Mock-Interview-Coach)
2. **Sports Event Management System (SEMS)**
   * *Context*: Centurion University
   * *Stack*: Java, Spring Boot, Spring Data JPA, Hibernate, MySQL, Angular, Firebase Auth, Postman, Maven.
   * *Dynamic Route*: [`/projects/sports-event-management-system`](file:///app/projects/[slug]/page.tsx)
3. **Centurion Library Management System (CLMS)**
   * *Context*: Centurion University
   * *Stack*: Java, Servlets, JSP, JDBC, MySQL, Apache Tomcat, MVC, HTML5/CSS3, JavaScript.
   * *Dynamic Route*: [`/projects/centurion-library-management-system`](file:///app/projects/[slug]/page.tsx)

---

## 🛠️ Project Structure

```text
├── app/
│   ├── layout.tsx                     # Root layout, fonts, ThemeProvider, CommandPalette, JSON-LD
│   ├── page.tsx                       # Single-page home with 8 continuous sections
│   ├── not-found.tsx                  # Custom 404 page
│   ├── sitemap.ts                     # Dynamic search engine sitemap
│   ├── robots.ts                      # Web crawler directives
│   ├── globals.css                    # Design tokens (light/dark CSS vars), utility layers
│   ├── actions/
│   │   └── contact.ts                 # React 19 Server Action with Zod & Resend integration
│   └── projects/
│       ├── ai-mock-interview-coach/
│       │   └── page.tsx               # Flagship in-depth case study & diagrams
│       └── [slug]/
│           └── page.tsx               # Dynamic case study page for SEMS and CLMS
├── components/
│   ├── 21st/                          # Sourced 21st.dev components adapted to design tokens
│   │   ├── grid-background.tsx
│   │   ├── shimmer-button.tsx
│   │   └── spotlight-card.tsx
│   ├── layout/                        # Header, Footer, ThemeToggle, CommandPalette
│   ├── sections/                      # Hero, About, Featured, Projects, Skills, Timeline, Certs, Contact
│   ├── diagrams/                      # System Architecture & Two-Stage Resume Pipeline SVGs
│   └── shared/                        # CopyButton, ScrollProgress, BackToTop, Icons
├── data/                              # Typed single sources of truth
│   ├── site.ts                        # Identity, links, bio, quick facts
│   ├── projects.ts                    # All project data and case study content
│   ├── skills.ts                      # Technical skills grouped into 6 categories
│   ├── experience.ts                  # Experience & Education timeline entries
│   └── certifications.ts              # SAP certifications & IEEE award
└── lib/
    ├── utils.ts                       # clsx + twMerge utility
    └── validation.ts                  # Zod validation schema for contact submissions
```

---

## 💻 Local Development Setup

### 1. Prerequisites
* Node.js $\ge 18.18$ (Tested on Node.js v24)
* npm $\ge 9$

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/MdArman09/Md-Arman-Portfolio.git
cd Md-Arman-Portfolio

# Install dependencies
npm install
```

### 3. Environment Variables (Optional)
Create a `.env.local` file in the root directory:
```env
# Optional: Resend API Key for live email dispatch from the contact form
# If omitted, contact form submissions log gracefully to the server console in development.
RESEND_API_KEY=re_your_api_key_here
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Linting
```bash
# Run ESLint check
npm run lint

# Build production bundle with full typecheck and static prerendering
npm run build

# Start the production server locally
npm start
```

---

## 📝 How to Add or Update Content

All content is strictly isolated into typed TypeScript files inside the `data/` folder. **Adding or modifying content never requires touching JSX layout code**:

### 1. Add a New Project
Open `data/projects.ts` and append an object to the `projects` array:
```typescript
{
  id: "your-project-id",
  slug: "your-project-slug",
  title: "Your Project Title",
  tagline: "One sentence overview...",
  category: "Enterprise Java", // or "AI & Full-Stack" | "Web Systems"
  featured: false,
  liveUrl: "https://your-demo.app",
  githubUrl: "https://github.com/...",
  stack: ["Java", "Spring Boot", "PostgreSQL"],
  description: "Detailed system architecture description...",
  highlights: [
    "Implemented high-throughput messaging queue...",
    "Normalized database schema...",
  ],
}
```
* The new project will automatically appear in the **Projects Bento Grid**, the **Filter Tabs**, the **Command Palette (⌘K)**, the **Sitemap**, and receive its own case study page at `/projects/your-project-slug`.

### 2. Update Resumes
The website supports dual targeted resumes for recruiters:
- **SAP ABAP Resume**: Located at `public/Md Arman - SAP ABAP (Resume).pdf` (your authentic uploaded SAP ABAP resume).
- **Software Engineer Resume**: Located at `public/Md_Arman_SDE.pdf`. When you want to update it, drop your updated PDF into `public/Md_Arman_SDE.pdf` (or place it in `Resume/` and copy it to `public/`). All download buttons across the hero, navbar, and command palette automatically serve your exact file without alterations.

### 3. Update Technical Skills or Experience
* Edit `data/skills.ts` to add or modify chips in any of the 6 categories.
* Edit `data/experience.ts` to add new roles or education milestones to the timeline.
* Edit `data/certifications.ts` to add new certifications or awards.

---

## 🚢 Deploying to Vercel

The project is built specifically for zero-config deployment on Vercel:

1. Push your repository to GitHub (`https://github.com/MdArman09/Md-Arman-Portfolio`).
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `Md-Arman-Portfolio` repository.
4. Leave the default settings:
   * **Framework Preset**: Next.js
   * **Root Directory**: `./`
   * **Build Command**: `next build`
   * **Output Directory**: `.next`
5. *(Optional)* In **Environment Variables**, add `RESEND_API_KEY` if you want contact form submissions emailed to you directly.
6. Click **Deploy**. Vercel will build the static pages and deploy to global CDN edge locations.

---

## 👤 Author

* **Md Arman Alam**
* **Title**: Software Development Engineer (SDE) | Full-Stack Java Developer
* **Location**: Bangalore, Karnataka, India
* **Email**: [arman.dev09@gmail.com](mailto:arman.dev09@gmail.com)
* **LinkedIn**: [linkedin.com/in/md-arman-alam](https://linkedin.com/in/md-arman-alam)
* **GitHub**: [github.com/MdArman09](https://github.com/MdArman09)
