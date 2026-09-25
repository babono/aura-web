import Link from "next/link";
import Logo from "./Logo";

const MAKERS = ["Babono", "Wahyu"];

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-surface-muted">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Weather worth acting on. Built for iOS with Apple Intelligence on device.
            </p>

            <div className="mt-6 space-y-2 text-sm leading-relaxed">
              <p className="text-ink-soft">
                Built at{" "}
                <span className="whitespace-nowrap font-medium text-ink">
                  <AppleLogo /> Apple Developer Academy Bali
                </span>
                <span className="block">during Challenge 2 Remix Weather App</span>
              </p>
              <p className="font-medium text-ink">
                {MAKERS.map((name, index) => (
                  <span key={name}>
                    {index > 0 ? <span className="px-1.5 text-ink-soft/50" aria-hidden="true">·</span> : null}
                    {name}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterColumn
              title="Product"
              links={[
                { href: "/#features", label: "Features" },
                { href: "/#widget", label: "Widget" },
                { href: "/#download", label: "Download" },
              ]}
            />
            <FooterColumn
              title="Legal"
              links={[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Use" },
              ]}
            />
            <FooterColumn
              title="Help"
              links={[
                { href: "/support", label: "Support" },
                { href: "/support#contact", label: "Contact" },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-black/5 pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Aura. All rights reserved.</p>
          <p>
            Weather data from Apple Weather and Open-Meteo. Places from Apple Maps.
          </p>
        </div>
      </div>
    </footer>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 17 20" fill="currentColor" className="mx-0.5 inline-block h-[0.95em] w-[0.8em] -translate-y-[0.12em] align-middle" role="img" aria-label="Apple">
      <path d="M14.1 10.6c0-2.5 2.1-3.7 2.2-3.8-1.2-1.7-3-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9C3.6 4.9 2 5.9 1.1 7.4c-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.2ZM11.6 3.2c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5Z" />
    </svg>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-ink">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-aura-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
