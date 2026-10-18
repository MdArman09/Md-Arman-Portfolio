"use client";

import * as React from "react";
import { useActionState } from "react";
import { siteConfig } from "@/data/site";
import { sendContactMessage, ContactActionResult } from "@/app/actions/contact";
import { SpotlightCard } from "@/components/21st/spotlight-card";
import { CopyButton } from "@/components/shared/copy-button";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
} from "lucide-react";

const initialState: ContactActionResult = {
  success: false,
  message: "",
};

export function Contact() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState
  );

  const [clientStatus, setClientStatus] = React.useState<ContactActionResult | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [lastSubmission, setLastSubmission] = React.useState<{
    name: string;
    email: string;
    message: string;
  } | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const displayStatus = clientStatus || state;
  const isBusy = isPending || isSubmitting;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setClientStatus(null);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();
    const website_hp = formData.get("website_hp") as string;

    if (name && email && message) {
      setLastSubmission({ name, email, message });
    }

    if (!name || !email || !message) {
      setIsSubmitting(false);
      setClientStatus({
        success: false,
        message: "Please fill out all required fields.",
      });
      return;
    }

    // Bot caught by honeypot
    if (website_hp) {
      setIsSubmitting(false);
      setClientStatus({
        success: true,
        message: "Thank you! Your message has been sent directly to arman.dev09@gmail.com.",
      });
      formRef.current?.reset();
      return;
    }

    // Step 1: Direct Browser Fetch to FormSubmit AJAX (uses real browser origin & visitor IP)
    try {
      const response = await fetch("https://formsubmit.co/ajax/arman.dev09@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `New Portfolio Message from ${name} (${email})`,
          _replyto: email,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (
        response.ok &&
        (data.success === "true" ||
          data.success === true ||
          data.message?.toLowerCase().includes("success") ||
          data.message?.toLowerCase().includes("activation"))
      ) {
        setClientStatus({
          success: true,
          message: "Thank you! Your message has been sent directly to arman.dev09@gmail.com.",
        });
        formRef.current?.reset();
        setIsSubmitting(false);
        return;
      }
    } catch (browserError) {
      console.warn("Direct browser submission attempt failed, trying server action:", browserError);
    }

    // Step 2: Fallback to Server Action
    try {
      const serverResult = await sendContactMessage(null, formData);
      setClientStatus(serverResult);
      if (serverResult.success) {
        formRef.current?.reset();
      }
    } catch (serverErr) {
      console.error("Server action failed:", serverErr);
      setClientStatus({
        success: false,
        message: "Could not deliver email automatically. Please reach out directly to arman.dev09@gmail.com.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
            <Mail className="w-3.5 h-3.5" />
            <span>07 // GET IN TOUCH</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
            Let&apos;s Connect & Build Together
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            Open to full-time Software Development Engineer roles and engineering conversations. Feel free to send a message or reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-4">
            <SpotlightCard className="p-6 space-y-6 bg-card/80">
              <h3 className="font-display font-bold text-lg text-foreground">
                Direct Contact Information
              </h3>

              {/* Email item */}
              <div className="p-4 rounded-xl border border-border/70 bg-muted/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    Email
                  </span>
                  <CopyButton value={siteConfig.email} label="Copy Email" />
                </div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-mono text-sm font-semibold text-foreground hover:text-primary transition-colors block"
                >
                  {siteConfig.email}
                </a>
              </div>

              {/* Phone item */}
              <div className="p-4 rounded-xl border border-border/70 bg-muted/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    Phone (Click to Call)
                  </span>
                  <CopyButton value={siteConfig.phone} label="Copy Phone" />
                </div>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="font-mono text-sm font-semibold text-foreground hover:text-primary transition-colors block"
                >
                  {siteConfig.phone}
                </a>
              </div>

              {/* Location item */}
              <div className="p-4 rounded-xl border border-border/70 bg-muted/20 space-y-1">
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  Location
                </span>
                <span className="text-sm font-medium text-foreground block">
                  {siteConfig.location}
                </span>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-border/60 space-y-2">
                <span className="text-xs font-mono text-muted-foreground block">
                  Profiles & Repositories
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-border/80 bg-background/60 hover:bg-muted text-xs font-semibold text-foreground transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-border/80 bg-background/60 hover:bg-muted text-xs font-semibold text-foreground transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-6 sm:p-8 bg-card">
              <div className="mb-6 space-y-1">
                <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span>Send a Direct Message</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  Delivered directly to arman.dev09@gmail.com with spam protection.
                </p>
              </div>

              {/* Success Notification */}
              {displayStatus?.success && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mb-6 p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                  <span>{displayStatus.message}</span>
                </div>
              )}

              {/* Error Notification with Direct 1-Click Fallback */}
              {displayStatus && !displayStatus.success && displayStatus.message && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mb-6 p-4 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs space-y-3 animate-in fade-in"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold">{displayStatus.message}</p>
                      <p className="text-[11px] opacity-90">
                        You can also send your message directly via your email app:
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-destructive/20 flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                        lastSubmission?.name
                          ? `Portfolio Inquiry from ${lastSubmission.name}`
                          : "Portfolio Inquiry"
                      )}&body=${encodeURIComponent(
                        lastSubmission
                          ? `Name: ${lastSubmission.name}\nEmail: ${lastSubmission.email}\n\nMessage:\n${lastSubmission.message}`
                          : "Hi Arman,\n\nI wanted to reach out regarding an opportunity.\n\nBest regards"
                      )}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-semibold transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send via Email Client</span>
                    </a>
                    <a
                      href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-destructive/30 hover:bg-destructive/10 text-xs font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Directly</span>
                    </a>
                  </div>
                </div>
              )}

              <form
                ref={formRef}
                action={formAction}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Honeypot field (hidden from legitimate users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_hp">Leave this field blank</label>
                  <input
                    type="text"
                    id="website_hp"
                    name="website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono font-medium text-foreground"
                  >
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Satya Nadella"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background/80 text-foreground placeholder:text-muted-foreground text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden transition-all"
                  />
                  {displayStatus?.errors?.name && (
                    <p className="text-[11px] text-destructive">
                      {displayStatus.errors.name[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono font-medium text-foreground"
                  >
                    Your Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="e.g. satya@microsoft.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background/80 text-foreground placeholder:text-muted-foreground text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden transition-all"
                  />
                  {displayStatus?.errors?.email && (
                    <p className="text-[11px] text-destructive">
                      {displayStatus.errors.email[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono font-medium text-foreground"
                  >
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Discuss an SDE role, project collaboration, or engineering idea..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background/80 text-foreground placeholder:text-muted-foreground text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden transition-all resize-y"
                  />
                  {displayStatus?.errors?.message && (
                    <p className="text-[11px] text-destructive">
                      {displayStatus.errors.message[0]}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isBusy}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/95 transition-all shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isBusy ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
