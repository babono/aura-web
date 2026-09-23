import MeshGradient from "@/components/MeshGradient";
import PhoneMockup, { WidgetMockup } from "@/components/PhoneMockup";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import AppStoreBadge from "@/components/AppStoreBadge";

const FEATURES = [
  {
    title: "Conditions you can feel",
    body: "Temperature, what it actually feels like, humidity and wind — read at a glance, with live rain and sun effects drawn right into the sky.",
  },
  {
    title: "The next 24 hours",
    body: "An hourly strip with precipitation chance on every column, so you know whether to leave now or wait twenty minutes.",
  },
  {
    title: "Suggestions, not just numbers",
    body: "Apple Intelligence reads the forecast on device and proposes things to do and things to eat that suit the weather you are actually having.",
  },
  {
    title: "Places worth the trip",
    body: "Tap any suggestion to find real venues nearby, with photos, reviews and directions powered by Tripadvisor.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader light />
      <main>
        <Hero />
        <Features />
        <Widget />
        <Privacy />
        <Download />
      </main>
      <SiteFooter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <MeshGradient />
      </div>

      <div className="mx-auto grid max-w-6xl gap-14 px-6 pb-24 pt-36 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pb-32 md:pt-44">
        <div className="aura-rise">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            For iPhone
          </p>

          <h1 className="font-serif text-6xl leading-[0.95] text-white sm:text-7xl md:text-8xl">
            Weather worth
            <br />
            acting on.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85">
            Most weather apps hand you a number and leave. Aura reads the sky and
            tells you what to do with your afternoon — generated on your device,
            never on a server.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <AppStoreBadge />
            <a
              href="#features"
              className="text-sm font-semibold text-white/85 underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
            >
              See what it does
            </a>
          </div>
        </div>

        <div className="aura-rise mx-auto w-full max-w-[280px] md:max-w-[320px]" style={{ animationDelay: "0.15s" }}>
          <PhoneMockup className="aura-float" />
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>Features</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Everything you need, nothing you don&rsquo;t.
        </h2>

        <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <div key={feature.title}>
              <span className="font-serif text-2xl text-aura-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-2xl text-ink">{feature.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-soft">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Widget() {
  return (
    <section id="widget" className="scroll-mt-24 bg-surface-muted py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
        <div>
          <SectionLabel>Home Screen</SectionLabel>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            A glance is usually enough.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
            Put Aura on your Home Screen in small or medium. Current conditions,
            where you are, and the next five hours — kept fresh in the background
            so it is already right when you look.
          </p>

          <ul className="mt-7 space-y-3">
            {["Small and medium sizes", "Updates quietly in the background", "Reads the same data as the app, so the two never disagree"].map(
              (item) => (
                <li key={item} className="flex items-start gap-3 text-ink-soft">
                  <Check />
                  <span>{item}</span>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-md">
          <WidgetMockup />
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionLabel>Privacy</SectionLabel>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Your location never leaves the loop it needs.
        </h2>
        <p className="mt-6 leading-relaxed text-ink-soft">
          Aura has no account, no tracking and no analytics SDK. Recommendations
          are generated on your device using Apple Intelligence. Your coordinates
          are used to fetch a forecast and find nearby places — and that is all.
        </p>
        <a
          href="/privacy"
          className="mt-8 inline-block rounded-full border border-aura-primary/30 px-6 py-2.5 text-sm font-semibold text-aura-primary transition-colors hover:bg-aura-primary hover:text-white"
        >
          Read the privacy policy
        </a>
      </div>
    </section>
  );
}

function Download() {
  return (
    <section id="download" className="relative isolate overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 -z-10">
        <MeshGradient />
      </div>
      <div className="mx-auto max-w-3xl px-6 py-28 text-center md:py-36">
        <h2 className="font-serif text-5xl leading-[1.02] text-white sm:text-6xl">
          Go outside, informed.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-white/85">
          Free on the App Store. iPhone, iOS 26 and later.
        </p>
        <div className="mt-9 flex justify-center">
          <AppStoreBadge />
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-aura-primary">
      {children}
    </span>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-4 w-4 shrink-0 text-aura-primary" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}
