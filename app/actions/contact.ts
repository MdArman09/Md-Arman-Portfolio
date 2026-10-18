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
        message: "Thank you! Your message has been sent directly to Arman.",
      };
    } catch (err: unknown) {
      console.error("Resend delivery failed:", err);
      return {
        success: false,
        message: "Could not send message via email provider. Please email arman.dev09@gmail.com directly.",
      };
    }
  }

  // Fallback for development without API key configured
  console.log("Mock contact form submission received:", { name, email, message });
  return {
    success: true,
    message: "Thank you for reaching out! Your message was received successfully.",
  };
}
