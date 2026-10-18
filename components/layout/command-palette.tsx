"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  Code2,
  User,
  Sparkles,
  Layers,
  GraduationCap,
  Award,
  Mail,
  FileDown,
  ExternalLink,
  Laptop,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    const handleCustomOpen = () => setOpen(true);
    window.addEventListener("open-command-palette", handleCustomOpen);
    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-background/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/80 bg-card text-card-foreground shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center border-b border-border/60 px-3 py-2.5">
          <Search className="mr-2.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <Command.Input
            placeholder="Type a command or search sections..."
            className="flex h-10 w-full rounded-md bg-transparent text-sm font-medium outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
          <kbd className="hidden sm:inline-flex select-none items-center gap-1 rounded-md border border-border bg-muted/60 px-1.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[320px] overflow-y-auto p-2 scrollbar-none text-sm">
          <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
            No matching results found.
          </Command.Empty>

          <Command.Group
            heading="Navigation"
            className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            <Command.Item
              onSelect={() => runCommand(() => router.push("/#about"))}
              className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              <span>About Md Arman Alam</span>
            </Command.Item>

            <Command.Item
              onSelect={() => runCommand(() => router.push("/#featured"))}
              className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Flagship: AI Mock Interview Coach</span>
            </Command.Item>

            <Command.Item
              onSelect={() => runCommand(() => router.push("/#projects"))}
              className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <Code2 className="h-4 w-4 text-muted-foreground" />
              <span>All Projects (Bento Grid)</span>
            </Command.Item>

            <Command.Item
              onSelect={() => runCommand(() => router.push("/#skills"))}
              className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <Layers className="h-4 w-4 text-muted-foreground" />
              <span>Technical Skills (Java, Spring, MERN, AI)</span>
            </Command.Item>

            <Command.Item
              onSelect={() => runCommand(() => router.push("/#timeline"))}
              className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span>Experience & Education Timeline</span>
            </Command.Item>

            <Command.Item
              onSelect={() => runCommand(() => router.push("/#certifications"))}
              className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <Award className="h-4 w-4 text-muted-foreground" />
              <span>Certifications (SAP & IEEE)</span>
            </Command.Item>

            <Command.Item
              onSelect={() => runCommand(() => router.push("/#contact"))}
              className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>Contact Form & Copy Info</span>
            </Command.Item>
          </Command.Group>

          <Command.Group
            heading="Case Studies"
            className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2"
          >
            {projects.map((proj) => (
              <Command.Item
                key={proj.slug}
                onSelect={() =>
                  runCommand(() => router.push(`/projects/${proj.slug}`))
                }
                className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
              >
                <Laptop className="h-4 w-4 text-muted-foreground" />
                <span>Case Study: {proj.title}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group
            heading="Actions & External Links"
            className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2"
          >
            <Command.Item
              onSelect={() =>
                runCommand(() => window.open(siteConfig.links.resumeSde, "_blank"))
              }
              className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <FileDown className="h-4 w-4 text-emerald-500" />
              <span>Download SDE Resume (Md_Arman_SDE.pdf)</span>
            </Command.Item>

            <Command.Item
              onSelect={() =>
                runCommand(() => window.open(siteConfig.links.resumeAbap, "_blank"))
              }
              className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <FileDown className="h-4 w-4 text-blue-500" />
              <span>Download SAP ABAP Resume (Md Arman - SAP ABAP (Resume).pdf)</span>
            </Command.Item>

            <Command.Item
              onSelect={() =>
                runCommand(() => window.open(siteConfig.links.github, "_blank"))
              }
              className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <span>View GitHub Profile</span>
            </Command.Item>

            <Command.Item
              onSelect={() =>
                runCommand(() => window.open(siteConfig.links.linkedin, "_blank"))
              }
              className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <span>View LinkedIn Profile</span>
            </Command.Item>
          </Command.Group>

          <Command.Group
            heading="Theme"
            className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2"
          >
            <Command.Item
              onSelect={() => runCommand(() => setTheme("light"))}
              className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <Sun className="h-4 w-4 text-amber-500" />
              <span>Light Mode</span>
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => setTheme("dark"))}
              className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
            >
              <Moon className="h-4 w-4 text-indigo-400" />
              <span>Dark Mode</span>
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-between border-t border-border/60 bg-muted/40 px-3 py-2 text-[11px] text-muted-foreground">
          <span>Navigate with arrow keys</span>
          <span>Press Enter to select</span>
        </div>
      </div>
    </Command.Dialog>
  );
}
