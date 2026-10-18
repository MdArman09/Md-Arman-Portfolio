import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { BackToTop } from "@/components/shared/back-to-top";
import { siteConfig } from "@/data/site";

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.about.summary,
  authors: [{ name: siteConfig.name, url: siteConfig.links.github }],
  creator: siteConfig.name,
  keywords: [
    "Md Arman Alam",
    "Software Development Engineer",
    "Full-Stack Java Developer",
    "Spring Boot",
    "React 19",
    "AI Mock Interview Coach",
    "Groq Llama 3.3",
    "Bangalore",
    "Portfolio",
  ],
  metadataBase: new URL("https://md-arman-portfolio.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://md-arman-portfolio.vercel.app",
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.about.summary,
    siteName: `${siteConfig.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.about.summary,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "India",
    },
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <Header />
          <CommandPalette />
          <div id="main-content">{children}</div>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
