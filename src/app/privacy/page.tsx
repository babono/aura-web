import type { Metadata } from "next";
import LegalLayout, { List, Section } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Aura collects, what it does not, and which services see your data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="16 September 2026"
      intro="Aura is built so that the less it knows about you, the better it works. There is no account, no profile and no advertising. This page explains exactly what happens to the data the app touches."
    >
      <Section title="The short version">
        <List
          items={[
            "Aura has no user accounts and collects no personal information.",
            "There is no analytics SDK, no crash-reporting SDK and no advertising network in the app.",
            "Your location is used to fetch a forecast and find nearby places. It is not stored on any server we control — we do not operate one.",
            "Activity and food suggestions are generated on your device by Apple Intelligence. The prompts never leave your iPhone.",
          ]}
        />
      </Section>

      <Section title="Location">
        <p>
          When you open Aura it asks for your location <strong>while using the
          app</strong>. The coordinates are used for three things: to fetch the
          current forecast, to work out the name of the place you are in, and to
          search for venues near you when you tap a suggestion.
        </p>
        <p>
          Aura never requests background or &ldquo;always&rdquo; location access,
          and it does not track your movement over time. You can revoke access at
          any time in <strong>Settings &rsaquo; Privacy &amp; Security &rsaquo;
          Location Services &rsaquo; Aura</strong>. The app still runs — it simply
          cannot show you local weather.
        </p>
      </Section>

      <Section title="Services your data reaches">
        <p>
          Aura talks to a small number of third parties. Each receives only what
          it needs to answer the request, and none of them receive an identifier
          that ties the request to you.
        </p>
        <List
          items={[
            <>
              <strong>Apple Weather (WeatherKit)</strong> — receives your
              approximate coordinates to return a forecast. Apple&rsquo;s handling
              is described in their{" "}
              <a href="https://www.apple.com/legal/privacy/data/en/weather/" target="_blank" rel="noopener noreferrer">
                Weather privacy notice
              </a>
              .
            </>,
            <>
              <strong>Open-Meteo</strong> — used as a fallback when Apple Weather
              is unavailable. Receives coordinates only. See their{" "}
              <a href="https://open-meteo.com/en/terms" target="_blank" rel="noopener noreferrer">
                terms and privacy statement
              </a>
              .
            </>,
            <>
              <strong>Tripadvisor Content API</strong> — receives your coordinates
              and a search term when you open a recommendation, so it can return
              nearby places, photos and reviews. See the{" "}
              <a href="https://www.tripadvisor.com/privacy" target="_blank" rel="noopener noreferrer">
                Tripadvisor privacy policy
              </a>
              .
            </>,
            <>
              <strong>Apple geocoding</strong> — the coordinates are converted to
              a place name using the system geocoder built into iOS.
            </>,
          ]}
        />
      </Section>

      <Section title="On-device intelligence">
        <p>
          The activity and food suggestions, and the artwork shown alongside them,
          are produced by Apple Intelligence running <strong>on your
          iPhone</strong> — using the Foundation Models and Image Playground
          frameworks. The weather description used as a prompt, the generated
          text and the generated images all stay on the device. Nothing is sent to
          us or to any third-party model provider.
        </p>
        <p>
          On devices that do not support Apple Intelligence, Aura falls back to a
          fixed rule-based list built into the app. That path involves no
          inference at all.
        </p>
      </Section>

      <Section title="What is stored on your device">
        <p>
          Aura keeps a small cache so it does not refetch the same data
          repeatedly: the most recent forecast, place results and downloaded
          images. The forecast cache is also what the Home Screen widget reads.
        </p>
        <p>
          All of it lives in the app&rsquo;s own container and the shared app
          group on your device. Deleting Aura removes every trace of it.
        </p>
      </Section>

      <Section title="Children">
        <p>
          Aura is not directed at children under 13 and does not knowingly collect
          information from them. Since the app collects no personal information
          from anyone, there is nothing for us to delete on request — but if you
          have a concern, please get in touch.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          If the app starts handling data differently, this page will be updated
          and the date at the top will change. Material changes will also be noted
          in the App Store release notes.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about privacy can go to{" "}
          <a href="mailto:babono@me.com">babono@me.com</a>.
        </p>
      </Section>
    </LegalLayout>
  );
}
