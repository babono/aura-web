import Image, { type StaticImageData } from "next/image";
import homeScreenshot from "@/assets/screenshots/home.png";

const HOURS = [
  { label: "Now", temp: "29°", icon: "sun" },
  { label: "3 PM", temp: "29°", icon: "sun" },
  { label: "4 PM", temp: "28°", icon: "cloud" },
  { label: "5 PM", temp: "27°", icon: "rain" },
  { label: "6 PM", temp: "26°", icon: "rain" },
];

/** A real app screenshot framed as an iPhone. Defaults to the home screen. */
export default function PhoneMockup({
  src = homeScreenshot,
  alt = "Aura home screen showing current conditions, the hourly forecast and recommended activities",
  preload = false,
  className = "",
}: {
  src?: StaticImageData;
  alt?: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative aspect-[1206/2622] w-full overflow-hidden rounded-[2.75rem] border-[10px] border-[#1a1520] bg-white shadow-[0_40px_90px_-20px_rgba(60,30,120,0.45)]">
        <Image
          src={src}
          alt={alt}
          fill
          preload={preload}
          placeholder="blur"
          sizes="(min-width: 768px) 320px, 280px"
          className="object-cover object-top"
        />

        {/* Dynamic Island — screenshots do not include it. */}
        <div className="absolute left-1/2 top-3 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-[#1a1520]" />
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
