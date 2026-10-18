import type { Metadata } from "next";
import Link from "next/link";
import { Home, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="inline-block p-4 rounded-3xl bg-primary/10 border border-primary/20 text-primary font-mono font-bold text-4xl">
          404
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-bold text-3xl text-foreground">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The page or project case study you requested could not be located.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/95 transition-colors shadow-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold border border-border/80 bg-card hover:bg-muted text-foreground transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Browse Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
