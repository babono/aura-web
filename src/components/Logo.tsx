import Link from "next/link";

/**
 * The app's logo is simply the word "aura" set in Instrument Serif
 * (see AuraApp/Shared/Components/Logo.swift).
 */
export default function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`font-serif text-3xl leading-none tracking-tight transition-opacity hover:opacity-70 ${
        light ? "text-white" : "text-ink"
      } ${className}`}
    >
      aura
    </Link>
  );
}
