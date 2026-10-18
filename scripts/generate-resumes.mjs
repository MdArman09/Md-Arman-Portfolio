import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";

async function createSdeResume() {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  let page = pdfDoc.addPage([612, 792]); // Standard US Letter
  let { width, height } = page.getSize();
  let y = height - 40;
  const margin = 42;
  const contentWidth = width - margin * 2;

  const checkPage = (needed) => {
    if (y - needed < 40) {
      page = pdfDoc.addPage([612, 792]);
      y = height - 40;
    }
  };

  const drawHeader = () => {
    page.drawText("MD ARMAN ALAM", {
      x: margin,
      y,
      size: 20,
      font: fontBold,
      color: rgb(0.08, 0.15, 0.3),
    });
    y -= 16;

    page.drawText(
      "Software Development Engineer (SDE) | Full-Stack Java Developer",
      {
        x: margin,
        y,
        size: 10.5,
        font: fontBold,
        color: rgb(0.15, 0.4, 0.85),
      }
    );
    y -= 14;

    const contactLine =
      "Bangalore, India  |  +91-7978206195  |  arman.dev09@gmail.com  |  linkedin.com/in/md-arman-alam  |  github.com/MdArman09";
    page.drawText(contactLine, {
      x: margin,
      y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.3, 0.35, 0.4),
    });
    y -= 12;

    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 1,
      color: rgb(0.8, 0.83, 0.88),
    });
    y -= 16;
  };

  const drawSectionTitle = (title) => {
    checkPage(30);
    page.drawText(title.toUpperCase(), {
      x: margin,
      y,
      size: 10,
      font: fontBold,
      color: rgb(0.08, 0.15, 0.3),
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.75,
      color: rgb(0.85, 0.88, 0.92),
    });
    y -= 12;
  };

  drawHeader();

  // 1. PROFESSIONAL SUMMARY
  drawSectionTitle("Professional Summary");
  const summaryText =
    "Computer Science graduate (9.13 CGPA) with strong competencies in Java, Spring Boot, RESTful Web Services, and relational database systems. Hands-on experience developing modular 3-tier enterprise applications, designing secure APIs with Role-Based Access Control (RBAC), and implementing responsive SPAs using Angular and React 19. Proficient in SDLC best practices, automated build processes (Maven), code reviews via Git, and algorithmic problem-solving in Java.";
  
  const words = summaryText.split(" ");
  let line = "";
  for (const word of words) {
    if (fontRegular.widthOfTextAtSize(line + word + " ", 8.5) > contentWidth) {
      page.drawText(line, { x: margin, y, size: 8.5, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
      y -= 11.5;
      line = word + " ";
    } else {
      line += word + " ";
    }
  }
  if (line) {
    page.drawText(line, { x: margin, y, size: 8.5, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    y -= 14;
  }

  // 2. TECHNICAL SKILLS
  drawSectionTitle("Technical Skills");
  const skills = [
    { label: "Languages", val: "Java (Core & J2EE), SQL / Open SQL, TypeScript, JavaScript, HTML5/CSS3, ABAP" },
    { label: "Frameworks & Web", val: "Spring Boot, Spring Data JPA, Hibernate, Angular, RESTful APIs, Servlets, JSP" },
    { label: "Databases & Cloud", val: "MySQL, MongoDB Atlas, Firebase Auth" },
    { label: "Developer Tools", val: "Git, GitHub, Postman, Maven, Apache Tomcat, VS Code, Eclipse" },
    { label: "Core CS", val: "OOP, DBMS, Operating Systems, SDLC Best Practices, Algorithmic Problem Solving" },
    { label: "MERN & AI Stack", val: "React 19, Node.js, Express, MongoDB/Mongoose, Groq SDK (Llama 3.3 70B), JWT, Zod, Tailwind CSS" },
  ];

  for (const s of skills) {
    checkPage(14);
    page.drawText(s.label + ": ", { x: margin, y, size: 8.5, font: fontBold, color: rgb(0.15, 0.2, 0.25) });
    const labelW = fontBold.widthOfTextAtSize(s.label + ": ", 8.5);
    page.drawText(s.val, { x: margin + labelW, y, size: 8.5, font: fontRegular, color: rgb(0.25, 0.3, 0.35) });
    y -= 12;
  }
  y -= 4;

  // 3. FLAGSHIP & KEY PROJECTS
  drawSectionTitle("Key Engineering Projects");

  // Project 1
  checkPage(40);
  page.drawText("AI Mock Interview Coach (Flagship AI & Full-Stack Platform)", { x: margin, y, size: 9.5, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
  page.drawText("React 19, Express 4, Groq (Llama 3.3 70B), MongoDB Atlas", { x: margin + 300, y, size: 8, font: fontOblique, color: rgb(0.4, 0.45, 0.5) });
  y -= 11;
  const p1Bullets = [
    "Dual input system (browser Web Speech API + typing) featuring deterministic code-computed pacing (WPM) and 10 filler-word detection metrics.",
    "Engineered structured STAR evaluation scoring Situation/Task/Action/Result (0-10) with exact evidence quotes extracted from transcripts.",
    "Architected two-stage resume ingestion pipeline extracting candidate experience level and computing question budget in code without LLM math.",
    "Hardened Groq JSON-mode orchestration with model fallback (to openai/gpt-oss-120b), concurrency queue, and exponential backoff retry.",
    "Implemented secure auth with bcrypt, SHA-256 hashed single-use OTPs with Mongo TTL, and monotonic tokenVersion for instant session revocation.",
  ];
  for (const b of p1Bullets) {
    checkPage(14);
    page.drawText("•", { x: margin + 4, y, size: 8.5, font: fontBold, color: rgb(0.15, 0.4, 0.85) });
    page.drawText(b, { x: margin + 14, y, size: 8, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    y -= 11;
  }
  y -= 3;

  // Project 2
  checkPage(40);
  page.drawText("Sports Event Management System (SEMS)", { x: margin, y, size: 9.5, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
  page.drawText("Java, Spring Boot, Spring Data JPA, Hibernate, MySQL, Angular", { x: margin + 260, y, size: 8, font: fontOblique, color: rgb(0.4, 0.45, 0.5) });
  y -= 11;
  const p2Bullets = [
    "Architected a 3-tier enterprise platform with Spring Boot exposing secured RESTful APIs for multi-entity tournament and venue management.",
    "Designed a normalized MySQL schema using Hibernate ORM enforcing transactional boundaries and relational foreign-key integrity.",
    "Implemented token-based authentication with Role-Based Access Control (RBAC) and responsive Angular dashboards for event coordinators.",
    "Automated builds with Maven and validated endpoint contracts and status codes using Postman test collections.",
  ];
  for (const b of p2Bullets) {
    checkPage(14);
    page.drawText("•", { x: margin + 4, y, size: 8.5, font: fontBold, color: rgb(0.15, 0.4, 0.85) });
    page.drawText(b, { x: margin + 14, y, size: 8, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    y -= 11;
  }
  y -= 3;

  // Project 3
  checkPage(40);
  page.drawText("Centurion Library Management System (CLMS)", { x: margin, y, size: 9.5, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
  page.drawText("Java Servlets, JSP, JDBC, MySQL, Apache Tomcat, MVC", { x: margin + 300, y, size: 8, font: fontOblique, color: rgb(0.4, 0.45, 0.5) });
  y -= 11;
  const p3Bullets = [
    "Applied the MVC pattern: Servlets for request routing and business logic execution, and JSP for dynamic data-bound views.",
    "Engineered 3NF MySQL schema, optimized multi-table join queries, and enforced relational integrity across patrons, catalog, and borrow logs.",
    "Implemented automated circulation lifecycles, book availability tracking, overdue fine calculation, and session state on Apache Tomcat.",
  ];
  for (const b of p3Bullets) {
    checkPage(14);
    page.drawText("•", { x: margin + 4, y, size: 8.5, font: fontBold, color: rgb(0.15, 0.4, 0.85) });
    page.drawText(b, { x: margin + 14, y, size: 8, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    y -= 11;
  }
  y -= 4;

  // 4. EXPERIENCE & INTERNSHIP
  drawSectionTitle("Experience & Practical Training");

  // Experience 1
  checkPage(30);
  page.drawText("Web Development Intern  |  Plasmid Innovation Ltd (Remote)", { x: margin, y, size: 9, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
  page.drawText("Apr 2024 - Jun 2024", { x: width - margin - 80, y, size: 8.5, font: fontRegular, color: rgb(0.4, 0.45, 0.5) });
  y -= 11;
  const exp1Bullets = [
    "Developed modular, responsive client-side interfaces for production web applications with cross-browser compatibility.",
    "Integrated RESTful API endpoints with frontend views for dynamic data rendering and asynchronous communication.",
    "Participated in git-based engineering workflows: performed peer code reviews and resolved UI/logic defects before staging deployment.",
  ];
  for (const b of exp1Bullets) {
    checkPage(14);
    page.drawText("•", { x: margin + 4, y, size: 8.5, font: fontBold, color: rgb(0.15, 0.4, 0.85) });
    page.drawText(b, { x: margin + 14, y, size: 8, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    y -= 11;
  }
  y -= 4;

  // Experience 2 (Training)
  checkPage(30);
  page.drawText("SAP ABAP Trainee (Guided Training)  |  EME Company", { x: margin, y, size: 9, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
  page.drawText("Aug 2025 - Oct 2025", { x: width - margin - 80, y, size: 8.5, font: fontRegular, color: rgb(0.4, 0.45, 0.5) });
  y -= 11;
  const exp2Bullets = [
    "Completed guided training in SAP ABAP development: ALV Reports, Open SQL, Data Dictionary (DDIC), and modular programming.",
    "Practiced developing and testing ABAP database CRUD programs and Open SQL queries using custom and standard SAP tables.",
  ];
  for (const b of exp2Bullets) {
    checkPage(14);
    page.drawText("•", { x: margin + 4, y, size: 8.5, font: fontBold, color: rgb(0.15, 0.4, 0.85) });
    page.drawText(b, { x: margin + 14, y, size: 8, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    y -= 11;
  }
  y -= 4;

  // 5. EDUCATION
  drawSectionTitle("Education");
  checkPage(24);
  page.drawText("Bachelor of Technology (B.Tech) in Computer Science and Engineering", { x: margin, y, size: 9, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
  page.drawText("Aug 2022 - Sep 2026", { x: width - margin - 80, y, size: 8.5, font: fontRegular, color: rgb(0.4, 0.45, 0.5) });
  y -= 11;
  page.drawText("Centurion University of Technology and Management, Bhubaneswar, Odisha  |  CGPA: 9.13 / 10", { x: margin, y, size: 8.5, font: fontRegular, color: rgb(0.25, 0.3, 0.35) });
  y -= 15;

  // 6. CERTIFICATIONS & HONORS
  drawSectionTitle("Certifications & Honors");
  const certs = [
    "SAP Certified Associate: Back-End Developer, ABAP Cloud (Oct 2025) - SAP Official Certification",
    "SAP Certified Associate: SAP Fiori Application Developer (Dec 2025) - SAP Official Certification",
    "IEEE TECHSPARK Project Expo Finalist: Shortlisted in top 62 of 85+ teams; awarded 'O' (Outstanding) grade for architecture.",
  ];
  for (const c of certs) {
    checkPage(13);
    page.drawText("•", { x: margin + 4, y, size: 8.5, font: fontBold, color: rgb(0.15, 0.4, 0.85) });
    page.drawText(c, { x: margin + 14, y, size: 8, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    y -= 11;
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync("public/Md_Arman_SDE.pdf", pdfBytes);
  // Also keep Md_Arman_Alam_Resume.pdf synced for backwards compatibility
  fs.writeFileSync("public/Md_Arman_Alam_Resume.pdf", pdfBytes);
  console.log("Successfully generated public/Md_Arman_SDE.pdf");
}

async function createAbapResume() {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let page = pdfDoc.addPage([612, 792]);
  let { width, height } = page.getSize();
  let y = height - 40;
  const margin = 42;
  const contentWidth = width - margin * 2;

  const checkPage = (needed) => {
    if (y - needed < 40) {
      page = pdfDoc.addPage([612, 792]);
      y = height - 40;
    }
  };

  const drawHeader = () => {
    page.drawText("MD ARMAN ALAM", {
      x: margin,
      y,
      size: 20,
      font: fontBold,
      color: rgb(0.08, 0.15, 0.3),
    });
    y -= 16;

    page.drawText(
      "SAP Certified ABAP Developer  |  SAP Fiori  |  Full-Stack Software Engineer",
      {
        x: margin,
        y,
        size: 10.5,
        font: fontBold,
        color: rgb(0.15, 0.4, 0.85),
      }
    );
    y -= 14;

    const contactLine =
      "Bangalore, India  |  +91-7978206195  |  arman.dev09@gmail.com  |  linkedin.com/in/md-arman-alam  |  github.com/MdArman09";
    page.drawText(contactLine, {
      x: margin,
      y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.3, 0.35, 0.4),
    });
    y -= 12;

    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 1,
      color: rgb(0.8, 0.83, 0.88),
    });
    y -= 16;
  };

  const drawSectionTitle = (title) => {
    checkPage(30);
    page.drawText(title.toUpperCase(), {
      x: margin,
      y,
      size: 10,
      font: fontBold,
      color: rgb(0.08, 0.15, 0.3),
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.75,
      color: rgb(0.85, 0.88, 0.92),
    });
    y -= 12;
  };

  drawHeader();

  // 1. PROFESSIONAL SUMMARY
  drawSectionTitle("Professional Summary");
  const summaryText =
    "SAP Certified Associate in Back-End Development (ABAP Cloud) and SAP Fiori Application Development, with hands-on training in Open SQL, Data Dictionary (DDIC), ALV Reports, Internal Tables, and modular programming. Computer Science graduate (9.13 CGPA) with strong competencies in Java, relational database systems (MySQL), and modern web architectures. Strong problem-solving aptitude with hands-on experience in debugging ABAP code, constructing database CRUD operations, and understanding enterprise business frameworks (RICEF).";

  const words = summaryText.split(" ");
  let line = "";
  for (const word of words) {
    if (fontRegular.widthOfTextAtSize(line + word + " ", 8.5) > contentWidth) {
      page.drawText(line, { x: margin, y, size: 8.5, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
      y -= 11.5;
      line = word + " ";
    } else {
      line += word + " ";
    }
  }
  if (line) {
    page.drawText(line, { x: margin, y, size: 8.5, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    y -= 14;
  }

  // 2. SAP CERTIFICATIONS (Featured Prominently)
  drawSectionTitle("SAP Official Certifications");
  const certs = [
    { title: "SAP Certified Associate: Back-End Developer, ABAP Cloud", date: "Issued: Oct 2025", desc: "Competency in modern ABAP Cloud programming model, clean core principles, RESTful Application Programming (RAP), and Open SQL." },
    { title: "SAP Certified Associate: SAP Fiori Application Developer", date: "Issued: Dec 2025", desc: "Demonstrated skills in developing and extending modern enterprise user experiences with SAP Fiori, UI5, and OData consumption." },
  ];
  for (const c of certs) {
    checkPage(24);
    page.drawText(c.title, { x: margin, y, size: 9, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
    page.drawText(c.date, { x: width - margin - 80, y, size: 8, font: fontRegular, color: rgb(0.4, 0.45, 0.5) });
    y -= 11;
    page.drawText(c.desc, { x: margin + 8, y, size: 8, font: fontRegular, color: rgb(0.25, 0.3, 0.35) });
    y -= 13;
  }
  y -= 2;

  // 3. SAP & TECHNICAL SKILLS
  drawSectionTitle("SAP & Technical Competencies");
  const abapSkills = [
    { label: "ABAP Development", val: "Data Dictionary (DDIC), Internal Tables, ALV Reports, Selection Screens, Subroutines, Modular Programming, Debugging" },
    { label: "ABAP Concepts", val: "OO ABAP, Classical Reports, Interactive Reports, RICEF Framework, BAPI, SmartForms" },
    { label: "SAP Technologies", val: "SAP Logon, SAP GUI, SAP Fiori, ABAP Cloud" },
    { label: "Languages & Database", val: "ABAP, Open SQL, Java (Core & J2EE), SQL, TypeScript, HTML5/CSS3" },
    { label: "Frameworks & Cloud", val: "Spring Boot, RESTful APIs, Hibernate, MySQL, Firebase Auth, Node.js" },
    { label: "Developer Tools", val: "SAP GUI, Eclipse (ADT), Git, GitHub, Postman, Maven, VS Code" },
  ];

  for (const s of abapSkills) {
    checkPage(14);
    page.drawText(s.label + ": ", { x: margin, y, size: 8.5, font: fontBold, color: rgb(0.15, 0.2, 0.25) });
    const labelW = fontBold.widthOfTextAtSize(s.label + ": ", 8.5);
    page.drawText(s.val, { x: margin + labelW, y, size: 8.5, font: fontRegular, color: rgb(0.25, 0.3, 0.35) });
    y -= 12;
  }
  y -= 4;

  // 4. SAP EXPERIENCE & TRAINING
  drawSectionTitle("SAP Experience & Professional Background");

  // SAP Trainee
  checkPage(40);
  page.drawText("SAP ABAP Trainee (Guided Training)  |  EME Company", { x: margin, y, size: 9.5, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
  page.drawText("Aug 2025 - Oct 2025", { x: width - margin - 80, y, size: 8.5, font: fontRegular, color: rgb(0.4, 0.45, 0.5) });
  y -= 11;
  const abapBullets = [
    "Gained hands-on exposure to SAP ABAP development, including ALV Reports, Open SQL, Data Dictionary (DDIC), Internal Tables, and modular programming through guided training.",
    "Practiced developing and testing ABAP programs involving database CRUD operations and Open SQL-based data retrieval using custom and standard SAP tables.",
    "Applied debugging and modular programming techniques on ABAP exercises and mentor-guided development tasks.",
    "Gained conceptual understanding of the RICEF framework (Reports, Interfaces, Conversions, Enhancements, Forms) used in SAP implementation projects.",
  ];
  for (const b of abapBullets) {
    checkPage(14);
    page.drawText("•", { x: margin + 4, y, size: 8.5, font: fontBold, color: rgb(0.15, 0.4, 0.85) });
    page.drawText(b, { x: margin + 14, y, size: 8, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    y -= 11;
  }
  y -= 4;

  // Web Development Intern
  checkPage(30);
  page.drawText("Web Development Intern  |  Plasmid Innovation Ltd (Remote)", { x: margin, y, size: 9, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
  page.drawText("Apr 2024 - Jun 2024", { x: width - margin - 80, y, size: 8.5, font: fontRegular, color: rgb(0.4, 0.45, 0.5) });
  y -= 11;
  const webBullets = [
    "Developed modular, responsive client-side interfaces for production web apps with cross-browser compatibility.",
    "Integrated RESTful API endpoints with frontend views for dynamic data rendering and async communication.",
    "Worked in git-based workflows: peer code reviews and debugging UI/logic defects before staging deployment.",
  ];
  for (const b of webBullets) {
    checkPage(14);
    page.drawText("•", { x: margin + 4, y, size: 8.5, font: fontBold, color: rgb(0.15, 0.4, 0.85) });
    page.drawText(b, { x: margin + 14, y, size: 8, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    y -= 11;
  }
  y -= 4;

  // 5. PROJECTS
  drawSectionTitle("Software Engineering Projects");

  checkPage(35);
  page.drawText("Sports Event Management System (SEMS)  |  Spring Boot, JPA, MySQL, Angular", { x: margin, y, size: 9, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
  y -= 11;
  const p1 = [
    "Architected 3-tier enterprise platform exposing secured REST APIs for multi-entity tournament workflows.",
    "Engineered normalized relational MySQL schema with Hibernate ORM, foreign-key integrity, and RBAC authentication.",
  ];
  for (const b of p1) {
    checkPage(12);
    page.drawText("•", { x: margin + 4, y, size: 8.5, font: fontBold, color: rgb(0.15, 0.4, 0.85) });
    page.drawText(b, { x: margin + 14, y, size: 8, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    y -= 11;
  }
  y -= 3;

  checkPage(35);
  page.drawText("AI Mock Interview Coach  |  React 19, Express 4, Groq SDK (Llama 3.3 70B), MongoDB", { x: margin, y, size: 9, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
  y -= 11;
  const p2 = [
    "Built real-time speech evaluation platform with Web Speech API and deterministic code-computed speech metrics.",
    "Structured STAR feedback scoring with Groq LLM JSON-mode fallback orchestration and hardened rate-limiting.",
  ];
  for (const b of p2) {
    checkPage(12);
    page.drawText("•", { x: margin + 4, y, size: 8.5, font: fontBold, color: rgb(0.15, 0.4, 0.85) });
    page.drawText(b, { x: margin + 14, y, size: 8, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    y -= 11;
  }
  y -= 4;

  // 6. EDUCATION & AWARDS
  drawSectionTitle("Education & Honors");
  checkPage(24);
  page.drawText("B.Tech in Computer Science and Engineering  |  Centurion University, Bhubaneswar", { x: margin, y, size: 9, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
  page.drawText("CGPA: 9.13 / 10  (2022 - 2026)", { x: width - margin - 120, y, size: 8.5, font: fontRegular, color: rgb(0.4, 0.45, 0.5) });
  y -= 12;
  page.drawText("• IEEE TECHSPARK Project Expo: Shortlisted in top 62 of 85+ teams; awarded 'O' (Outstanding) grade.", { x: margin + 4, y, size: 8, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
  y -= 12;

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync("public/Md_Arman_ABAP.pdf", pdfBytes);
  console.log("Successfully generated public/Md_Arman_ABAP.pdf");
}

async function main() {
  await createSdeResume();
  await createAbapResume();
}

main().catch(console.error);
