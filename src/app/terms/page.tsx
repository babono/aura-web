import type { Metadata } from "next";
import LegalLayout, { List, Section } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use Aura.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Use"
      updated="16 September 2026"
      intro="By downloading or using Aura you agree to these terms. They are deliberately short."
    >
      <Section title="Licence">
        <p>
          Aura is licensed, not sold, to you for personal, non-commercial use on
          Apple devices you own or control, in line with Apple&rsquo;s{" "}
          <a
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Licensed Application End User License Agreement
          </a>
          . You may not redistribute, resell or reverse-engineer the app except
          where that restriction is prohibited by law.
        </p>
      </Section>

      <Section title="Weather information is not a guarantee">
        <p>
          Forecasts are supplied by third parties and are, by nature, predictions.
          Aura presents them as-is and makes no warranty about their accuracy,
          completeness or timeliness.
        </p>
        <p>
          <strong>
            Do not rely on Aura for decisions where weather affects safety
          </strong>{" "}
          — aviation, marine activity, severe-weather response or anything similar.
          Use an official meteorological service for those.
        </p>
      </Section>

      <Section title="Recommendations">
        <p>
          Activity and food suggestions are generated automatically and are
          offered as ideas, not advice. Aura does not verify that a suggested
          activity is safe, suitable or available to you, and place information
          comes from Apple Maps rather than from us.
        </p>
      </Section>

      <Section title="Third-party content">
        <p>
          The app displays data from Apple Weather, Open-Meteo and Apple Maps.
          That content belongs to its respective owners and is subject to their
          terms. Aura is not responsible for its accuracy or availability.
        </p>
      </Section>

      <Section title="Availability and changes">
        <List
          items={[
            "Features may change, and the app may be updated or withdrawn at any time.",
            "Services the app depends on may become unavailable, which can limit what Aura can show.",
            "These terms may be revised; continued use after a change means you accept the revision.",
          ]}
        />
      </Section>

      <Section title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Aura is provided &ldquo;as
          is&rdquo; without warranties of any kind, and we are not liable for any
          indirect or consequential loss arising from its use.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about these terms can go to{" "}
          <a href="mailto:babono@me.com">babono@me.com</a>.
        </p>
      </Section>
    </LegalLayout>
  );
}
