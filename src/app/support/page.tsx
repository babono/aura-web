import type { Metadata } from "next";
import LegalLayout, { Section } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Support",
  description: "Help with Aura — common questions and how to reach a human.",
};

const FAQS = [
  {
    q: "The weather will not load.",
    a: "Aura needs location access to know what to forecast. Check Settings › Privacy & Security › Location Services › Aura and make sure it is set to \"While Using the App\". If it is already on, pull down to retry — the app falls back to a second weather provider automatically when the first is unreachable.",
  },
  {
    q: "Why are there no activity suggestions?",
    a: "AI suggestions need a device that supports Apple Intelligence. On other devices Aura shows a built-in list instead. Suggestions also need a successful weather fetch first.",
  },
  {
    q: "The images on the cards never appear.",
    a: "Artwork is generated on device and can take a while on first run, especially on battery saver. The cards stay usable with symbols in the meantime. If Image Playground has not finished setting up in iOS, generation is skipped entirely.",
  },
  {
    q: "The widget is out of date.",
    a: "The widget refreshes on a schedule set by iOS, and shows the last known conditions in between. Opening the app updates it immediately. iOS also throttles widget refreshes when battery is low.",
  },
  {
    q: "Can I change the units to Fahrenheit?",
    a: "Aura follows your iPhone's region setting. Change it in Settings › General › Language & Region › Temperature.",
  },
  {
    q: "How do I delete my data?",
    a: "Delete the app. Aura stores everything locally and keeps no server-side record of you — there is no account to close.",
  },
];

export default function SupportPage() {
  return (
    <LegalLayout
      title="Support"
      updated="16 September 2026"
      intro="Most issues have a quick answer below. If yours is not here, email us — a person reads it."
    >
      <Section title="Get in touch">
        <p>
          Email <a href="mailto:babono@me.com">babono@me.com</a>.
          Telling us your iPhone model and iOS version makes a bug far easier to
          track down.
        </p>
      </Section>

      <section>
        <h2 className="font-serif text-2xl text-ink">Common questions</h2>
        <dl className="mt-5 divide-y divide-black/5 border-y border-black/5">
          {FAQS.map((faq) => (
            <div key={faq.q} className="py-5">
              <dt className="font-semibold text-ink">{faq.q}</dt>
              <dd className="mt-1.5 leading-relaxed text-ink-soft">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Section title="System requirements">
        <p>
          iPhone running iOS 26 or later. AI-generated recommendations and artwork
          additionally require a device that supports Apple Intelligence.
        </p>
      </Section>
    </LegalLayout>
  );
}
