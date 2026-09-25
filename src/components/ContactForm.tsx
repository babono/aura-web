"use client";

import { useState } from "react";
import { SUPPORT_EMAIL } from "@/lib/site";

const TOPICS = ["Something is broken", "A question", "Feedback or an idea", "Something else"];

/**
 * There is no backend, so the form composes an email in the visitor's own mail
 * app. That keeps the reply thread in their inbox and means nothing is stored.
 */
export default function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [device, setDevice] = useState("");
  const [ios, setIos] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const isBug = topic === TOPICS[0];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const details = [
      device && `iPhone model: ${device}`,
      ios && `iOS version: ${ios}`,
    ].filter(Boolean);
    const body = details.length ? `${message}\n\n—\n${details.join("\n")}` : message;

    const params = new URLSearchParams({ subject: `Aura: ${topic}`, body });
    // URLSearchParams encodes spaces as "+", which mail clients show literally.
    window.location.href = `mailto:${SUPPORT_EMAIL}?${params.toString().replace(/\+/g, "%20")}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="What is it about?">
        <select value={topic} onChange={(event) => setTopic(event.target.value)} className={INPUT}>
          {TOPICS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </Field>

      <Field label="Message">
        <textarea
          required
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={isBug ? "What happened, and what did you expect to happen?" : "How can we help?"}
          className={`${INPUT} resize-y`}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="iPhone model" optional={!isBug}>
          <input
            value={device}
            onChange={(event) => setDevice(event.target.value)}
            placeholder="iPhone 16 Pro"
            className={INPUT}
          />
        </Field>
        <Field label="iOS version" optional={!isBug}>
          <input
            value={ios}
            onChange={(event) => setIos(event.target.value)}
            placeholder="26.1"
            className={INPUT}
          />
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button
          type="submit"
          className="rounded-full bg-aura-primary px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          Write the email
        </button>
        <p className="text-sm text-ink-soft" aria-live="polite">
          {sent
            ? `Nothing opened? Email ${SUPPORT_EMAIL} directly.`
            : "Opens in your mail app, ready to send."}
        </p>
      </div>
    </form>
  );
}

const INPUT =
  "w-full rounded-xl border border-black/10 bg-surface px-4 py-2.5 text-ink placeholder:text-ink-soft/60 focus:border-aura-primary focus:outline-none focus:ring-2 focus:ring-aura-primary/20";

function Field({
  label,
  optional = false,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {optional ? <span className="font-normal text-ink-soft"> (optional)</span> : null}
      </span>
      {children}
    </label>
  );
}
