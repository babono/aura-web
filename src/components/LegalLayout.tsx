import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function LegalLayout({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="bg-surface pb-24 pt-32">
        <article className="mx-auto max-w-2xl px-6">
          <header className="border-b border-black/5 pb-8">
            <h1 className="font-serif text-5xl leading-tight text-ink">{title}</h1>
            <p className="mt-3 text-sm text-ink-soft">Last updated {updated}</p>
            {intro ? (
              <p className="mt-5 leading-relaxed text-ink-soft">{intro}</p>
            ) : null}
          </header>

          <div className="mt-10 space-y-10">{children}</div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-ink">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-ink-soft [&_a]:text-aura-primary [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}

export function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-aura-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
