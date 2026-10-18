import * as React from "react";

export function SystemArchitectureDiagram() {
  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="min-w-[680px] p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground">
              End-to-End System Topology
            </span>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">
            Zero Raw Audio Transmission • HTTPS Only
          </span>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center">
          {/* Node 1: Client Browser */}
          <div className="p-4 rounded-xl border border-border bg-background/80 shadow-xs text-center space-y-2">
            <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-primary/10 text-primary">
              Client Tier
            </div>
            <h4 className="font-display font-bold text-sm text-foreground">
              Web Browser
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Web Speech API (client STT) + React 19 UI
            </p>
            <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded py-1">
              Audio Stays Local
            </div>
          </div>

          {/* Node 2: Client SPA Hosting */}
          <div className="p-4 rounded-xl border border-border bg-background/80 shadow-xs text-center space-y-2">
            <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-500">
              Frontend CDN
            </div>
            <h4 className="font-display font-bold text-sm text-foreground">
              Vercel Edge
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Vite SPA • React Router 7 • Tailwind CSS
            </p>
            <div className="text-[10px] font-mono text-muted-foreground bg-muted/60 rounded py-1">
              Global CDN Edge
            </div>
          </div>

          {/* Node 3: Backend API */}
          <div className="p-4 rounded-xl border border-border bg-background/80 shadow-xs text-center space-y-2 relative">
            <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-500">
              Application API
            </div>
            <h4 className="font-display font-bold text-sm text-foreground">
              Express 4 (Render)
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Zod validation • Rate limits • JWT tokenVersion
            </p>
            <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded py-1">
              ~50s Cold Start Note
            </div>
          </div>

          {/* Node 4: External Services */}
          <div className="space-y-2">
            <div className="p-2.5 rounded-lg border border-border/80 bg-background/70 text-xs flex items-center justify-between">
              <span className="font-semibold text-foreground">Groq SDK</span>
              <span className="text-[10px] font-mono text-primary">Llama 3.3 70B</span>
            </div>
            <div className="p-2.5 rounded-lg border border-border/80 bg-background/70 text-xs flex items-center justify-between">
              <span className="font-semibold text-foreground">MongoDB Atlas</span>
              <span className="text-[10px] font-mono text-emerald-500">Mongoose + TTL</span>
            </div>
            <div className="p-2.5 rounded-lg border border-border/80 bg-background/70 text-xs flex items-center justify-between">
              <span className="font-semibold text-foreground">Brevo API</span>
              <span className="text-[10px] font-mono text-muted-foreground">HTTPS Port 443</span>
            </div>
            <div className="p-2.5 rounded-lg border border-border/80 bg-background/70 text-xs flex items-center justify-between">
              <span className="font-semibold text-foreground">Google OAuth</span>
              <span className="text-[10px] font-mono text-muted-foreground">Identity v2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
