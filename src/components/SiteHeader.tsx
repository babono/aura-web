"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV = [
  { href: "/#features", label: "Features" },
  { href: "/#widget", label: "Widget" },
  { href: "/privacy", label: "Privacy" },
  { href: "/support", label: "Support" },
];

export default function SiteHeader({ light = false }: { light?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over the hero the header is transparent with white type; once scrolled (or
  // on a plain page) it becomes a frosted bar with dark type.
  const onDark = light && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-black/5 bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo light={onDark} />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-opacity hover:opacity-60 ${
                onDark ? "text-white/90" : "text-ink-soft"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="#download"
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-transform hover:scale-[1.03] ${
            onDark
              ? "bg-white text-aura-deep"
              : "bg-aura-primary text-white"
          }`}
        >
          Get Aura
        </a>
      </div>
    </header>
  );
}
