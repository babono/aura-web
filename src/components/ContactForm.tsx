"use client";

import { useActionState, useState } from "react";
import { sendContactMessage, type ContactState } from "@/app/support/actions";
import { CONTACT_TOPICS } from "@/lib/site";

const INITIAL_STATE: ContactState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, INITIAL_STATE);
  const [topic, setTopic] = useState(CONTACT_TOPICS[0]);

  const isBug = topic === CONTACT_TOPICS[0];

  if (state.status === "sent") {
    return (
      <div role="status" className="py-4 text-center">
        <p className="font-serif text-2xl text-ink">Thanks — message received.</p>
        <p className="mt-2 text-ink-soft">We&rsquo;ll reply to the email address you gave us.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <Field label="What is it about?">
        <select
          name="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          className={INPUT}
        >
          {CONTACT_TOPICS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </Field>

      <Field label="Your email">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={INPUT}
        />
      </Field>

      <Field label="Message">
        <textarea
          name="message"
          required
          rows={6}
          maxLength={8000}
          placeholder={isBug ? "What happened, and what did you expect to happen?" : "How can we help?"}
          className={`${INPUT} resize-y`}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="iPhone model" optional={!isBug}>
          <input name="device" maxLength={100} placeholder="iPhone 16 Pro" className={INPUT} />
        </Field>
        <Field label="iOS version" optional={!isBug}>
          <input name="ios" maxLength={50} placeholder="26.1" className={INPUT} />
        </Field>
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-aura-primary px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] disabled:cursor-wait disabled:opacity-60 disabled:hover:scale-100"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        {state.status === "error" ? (
          <p role="alert" className="text-sm text-red-600">
            {state.message}
          </p>
        ) : null}
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
