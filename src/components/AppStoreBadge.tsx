/**
 * App Store call-to-action.
 *
 * Set APP_STORE_URL once the listing is live and the badge becomes a real link
 * automatically; until then it renders a non-interactive "coming soon" pill
 * rather than a dead link.
 *
 * NOTE: Apple requires their *official* badge artwork for the live link — grab
 * it from developer.apple.com/app-store/marketing/guidelines and drop it in as
 * an <Image> here. The markup below is a stand-in with the correct proportions.
 */
const APP_STORE_URL: string | null = null;

export default function AppStoreBadge() {
  const content = (
    <>
      <AppleGlyph />
      <span className="text-left leading-tight">
        <span className="block text-[10px] font-medium opacity-80">
          {APP_STORE_URL ? "Download on the" : "Coming soon to the"}
        </span>
        <span className="block text-lg font-semibold tracking-tight">App Store</span>
      </span>
    </>
  );

  const className =
    "inline-flex items-center gap-3 rounded-2xl bg-ink px-5 py-2.5 text-white shadow-lg shadow-black/10";

  if (!APP_STORE_URL) {
    return (
      <span className={`${className} cursor-default opacity-90`} aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <a
      href={APP_STORE_URL}
      className={`${className} transition-transform hover:scale-[1.03]`}
    >
      {content}
    </a>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
      <path d="M17.05 12.54c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.61-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.86-.76-1.47.02-2.83.85-3.59 2.17-1.53 2.65-.39 6.58 1.1 8.73.73 1.05 1.6 2.23 2.74 2.19 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.48zM14.88 5.8c.6-.74 1.01-1.76.9-2.78-.87.04-1.93.58-2.56 1.31-.56.65-1.06 1.7-.93 2.7.97.08 1.97-.49 2.59-1.23z" />
    </svg>
  );
}
