"use server";

import { saveContactMessage } from "@/lib/notion";
import { CONTACT_TOPICS } from "@/lib/site";

export type ContactState = { status: "idle" | "sent" | "error"; message?: string };

const field = (formData: FormData, name: string, max: number) =>
  String(formData.get(name) ?? "").trim().slice(0, max);

export async function sendContactMessage(_: ContactState, formData: FormData): Promise<ContactState> {
  // Hidden from people; bots that fill every field get a quiet "sent".
  if (field(formData, "website", 200)) return { status: "sent" };

  const topic = field(formData, "topic", 100);
  const email = field(formData, "email", 200);
  const message = field(formData, "message", 8000);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address so we can reply." };
  }
  if (!message) {
    return { status: "error", message: "Please write a message." };
  }

  try {
    await saveContactMessage({
      topic: CONTACT_TOPICS.includes(topic) ? topic : "Something else",
      email,
      message,
      device: field(formData, "device", 100),
      ios: field(formData, "ios", 50),
    });
    return { status: "sent" };
  } catch (error) {
    console.error("Contact form submission failed", error);
    return { status: "error", message: "Your message could not be sent. Please try again in a moment." };
  }
}
