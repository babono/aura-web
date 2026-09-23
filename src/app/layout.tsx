import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

// The same two families the app bundles (AuraApp/Resources/Fonts).
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const SITE_URL = "https://auraweatheractivity.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aura — Weather worth acting on",
    template: "%s · Aura",
  },
  description:
    "Aura turns the forecast into a plan. Live conditions, the hours ahead, and on-device Apple Intelligence suggestions for what to do and what to eat.",
  keywords: ["weather app", "iOS weather", "Apple Intelligence", "WeatherKit", "activity recommendations"],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Aura",
    title: "Aura — Weather worth acting on",
    description:
      "Live conditions, the hours ahead, and on-device suggestions for what to do and what to eat.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura — Weather worth acting on",
    description:
      "Live conditions, the hours ahead, and on-device suggestions for what to do and what to eat.",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#6f48c8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables must be declared on <html>, not <body>: the Tailwind
    // theme resolves `--font-serif: var(--font-instrument-serif), ...` on :root,
    // and an inner var() is substituted at the element that declares it. Put them
    // on <body> and that lookup fails at :root, silently dropping the family.
    <html lang="en" className={`${instrumentSans.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
