export interface Achievement {
  id: string;
  type: "certification" | "award";
  title: string;
  issuer: string;
  date: string;
  summary: string;
  badgeCode?: string;
  grade?: string;
}

export const achievements: Achievement[] = [
  {
    id: "sap-fiori",
    type: "certification",
    title: "SAP Certified Associate: SAP Fiori Application Developer",
    issuer: "SAP",
    date: "Dec 2025",
    summary:
      "Demonstrated competency in designing, developing, and extending modern enterprise user experiences with SAP Fiori and responsive web architectures.",
    badgeCode: "SAP Fiori",
  },
  {
    id: "sap-abap-cloud",
    type: "certification",
    title: "SAP Certified Associate: Back-End Developer, ABAP Cloud",
    issuer: "SAP",
    date: "Oct 2025",
    summary:
      "Certified in modern ABAP Cloud enterprise programming model, clean core principles, RESTful application programming (RAP), and cloud architecture.",
    badgeCode: "ABAP Cloud",
  },
  {
    id: "ieee-techspark",
    type: "award",
    title: "IEEE TECHSPARK Project Expo Finalist",
    issuer: "IEEE",
    date: "2024",
    grade: "Grade 'O' (Outstanding)",
    summary:
      "Shortlisted among the top 62 of 85+ competitive teams for final project exhibition; awarded the highest 'O' (Outstanding) grade for excellence in software architecture and demonstration.",
    badgeCode: "IEEE Techspark",
  },
];
