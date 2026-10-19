"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
}

export function CopyButton({ value, label = "Copy", className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      aria-label={copied ? "Copied to clipboard" : `Copy ${label}`}
      className={cn(
        "relative inline-flex items-center justify-center min-w-[76px] h-7 px-2.5 py-1 rounded-md text-xs font-mono border border-border/80 bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer",
        copied && "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Copied</span>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5 shrink-0" />
            <span>{label}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
