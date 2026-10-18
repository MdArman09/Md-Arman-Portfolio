"use server";

import { contactSchema } from "@/lib/validation";
import { Resend } from "resend";

export interface ContactActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function sendContactMessage(
  prevState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    website_hp: formData.get("website_hp"), // Honeypot field
  };

  const validation = contactSchema.safeParse(rawData);

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Please check the form fields and correct the highlighted errors.",
      errors,
    };
  }

  const { name, email, message, website_hp } = validation.data;

  // Bot caught by honeypot
  if (website_hp && website_hp.length > 0) {
    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  // 1. If RESEND_API_KEY is configured, attempt Resend delivery
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "arman.dev09@gmail.com",
        replyTo: email,
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });

      return {
        success: true,
        message: "Thank you! Your message has been sent directly to arman.dev09@gmail.com.",
      };
    } catch (err: unknown) {
      console.warn("Resend delivery failed, falling back to direct delivery:", err);
    }
  }

  // 2. Direct delivery to arman.dev09@gmail.com via FormSubmit API
  try {
    const res = await fetch("https://formsubmit.co/ajax/arman.dev09@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://md-arman-portfolio.vercel.app",
        Referer: "https://md-arman-portfolio.vercel.app/",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Portfolio Message from ${name} (${email})`,
        _replyto: email,
        _template: "table",
        _captcha: "false",
      }),
    });

    const data = await res.json().catch(() => ({}));

    const isSuccess =
      res.ok &&
      (data.success === "true" ||
        data.success === true ||
        data.message?.toLowerCase().includes("activation") ||
        data.message?.toLowerCase().includes("sent") ||
        data.message?.toLowerCase().includes("success"));

    if (isSuccess) {
      if (data.message?.toLowerCase().includes("activation")) {
        return {
          success: true,
          message:
            "Activation email sent! Please check arman.dev09@gmail.com (including Spam/Updates) and click 'Activate Form' to start receiving messages.",
        };
      }

      return {
        success: true,
        message: "Thank you! Your message has been sent directly to arman.dev09@gmail.com.",
      };
    } else {
      console.error("Email delivery provider response:", data);
    }
  } catch (deliveryError: unknown) {
    console.error("Direct email delivery error:", deliveryError);
  }

  return {
    success: false,
    message:
      "Could not deliver email automatically. Please reach out directly to arman.dev09@gmail.com.",
  };
}
