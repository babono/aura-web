import MeshGradient from "./MeshGradient";

const HOURS = [
  { label: "Now", temp: "29°", icon: "sun", rain: null },
  { label: "3 PM", temp: "29°", icon: "sun", rain: null },
  { label: "4 PM", temp: "28°", icon: "cloud", rain: "20%" },
  { label: "5 PM", temp: "27°", icon: "rain", rain: "60%" },
  { label: "6 PM", temp: "26°", icon: "rain", rain: "70%" },
];

const ACTIVITIES = [
  { title: "Beach walk", meta: "60 mins" },
  { title: "Café hop", meta: "90 mins" },
];

/** A stylised recreation of the app's home screen, built to match the real UI. */
export default function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.75rem] border-[10px] border-[#1a1520] bg-white shadow-[0_40px_90px_-20px_rgba(60,30,120,0.45)]">
        {/* Gradient sky, fading into the content area like the app does. */}
        <div className="absolute inset-x-0 top-0 h-[46%]">
          <MeshGradient />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        </div>

        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-3 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-[#1a1520]" />

        <div className="relative z-10 flex h-full flex-col px-5 pt-16">
          <p className="text-sm font-medium text-ink-soft">Clear Sky</p>
          <p className="font-serif text-7xl leading-[0.95] text-ink">29°</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
            <LocationPin /> Denpasar
          </p>

          {/* Hourly strip */}
          <div className="mt-7 flex justify-between gap-1">
            {HOURS.map((hour) => (
              <div key={hour.label} className="flex flex-col items-center gap-1.5">
                <span className="text-[9px] font-medium text-ink-soft">{hour.label}</span>
                <WeatherIcon kind={hour.icon} />
                <span className="text-[9px] font-semibold text-aura-primary">
                  {hour.rain ?? " "}
                </span>
                <span className="text-[11px] font-semibold text-ink">{hour.temp}</span>
              </div>
            ))}
          </div>

          <h3 className="mt-7 font-serif text-xl text-ink">Recommended Activities</h3>
          <div className="mt-3 flex gap-3">
            {ACTIVITIES.map((activity) => (
              <div key={activity.title} className="flex-1">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-aura-mid/30 to-aura-cream/50" />
                <p className="mt-1.5 text-[11px] font-semibold text-ink">{activity.title}</p>
                <p className="text-[9px] text-ink-soft">{activity.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** The medium home-screen widget, matching AuraWidget's layout. */
export function WidgetMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex aspect-[2.13/1] w-full items-stretch gap-4 rounded-[1.65rem] bg-gradient-to-br from-aura-deep to-aura-mid p-4 shadow-[0_24px_60px_-18px_rgba(60,30,120,0.5)] ${className}`}
    >
      <div className="flex flex-1 flex-col text-white">
        <SunGlyph className="h-6 w-6" />
        <div className="flex-1" />
        <p className="font-serif text-4xl leading-none">29°</p>
        <p className="text-[11px] font-medium text-white/85">Clear Sky</p>
        <p className="text-[10px] text-aura-cream">Denpasar</p>
      </div>

      <div className="flex items-start gap-3">
        {HOURS.slice(0, 5).map((hour) => (
          <div key={hour.label} className="flex flex-col items-center gap-1.5">
            <span className="text-[9px] text-white/70">{hour.label}</span>
            <WeatherIcon kind={hour.icon} light />
            <span className="text-[10px] font-semibold text-white">{hour.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeatherIcon({ kind, light = false }: { kind: string; light?: boolean }) {
  const tone = light ? "text-white" : "text-ink";
  if (kind === "sun") return <SunGlyph className={`h-3.5 w-3.5 ${tone}`} />;
  if (kind === "rain") return <RainGlyph className={`h-3.5 w-3.5 ${tone}`} />;
  return <CloudGlyph className={`h-3.5 w-3.5 ${tone}`} />;
}

function SunGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

function CloudGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 18h10a4 4 0 0 0 .3-8A6 6 0 0 0 6 11.3 3.4 3.4 0 0 0 7 18Z" />
    </svg>
  );
}

function RainGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 15h10a4 4 0 0 0 .3-8A6 6 0 0 0 6 8.3 3.4 3.4 0 0 0 7 15Z" />
      <path d="M9 18.5 8 21M13 18.5 12 21M17 18.5 16 21" />
    </svg>
  );
}

function LocationPin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M21 3 3 10.5l7.2 2.8L13 21l8-18Z" />
    </svg>
  );
}
