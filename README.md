# aura-web

Marketing and legal site for the [Aura](https://github.com/ayungavis/aura-app) iOS app.

Next.js 16 (App Router) + Tailwind v4. Every route is statically prerendered —
there is no server-side logic and no database.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
```

## Design system

The palette and type are lifted directly from the app so the two read as one
product:

| Token | Value | Source in the app |
| --- | --- | --- |
| `aura-deep` | `#6F48C8` | `AnimatedMeshBackground.swift` |
| `aura-mid` | `#9978E6` | `AnimatedMeshBackground.swift` |
| `aura-cream` | `#FFE6CD` | `AnimatedMeshBackground.swift` |
| `aura-primary` | `#865DE0` | `Color.auraPrimary` |

Type is Instrument Serif (display) and Instrument Sans (UI) — the same two
families the app bundles, served locally via `next/font`.

`src/components/MeshGradient.tsx` is a port of the app's animated
`MeshGradient`: same control grid, same colours, same motion. It renders to a
56x56 canvas and lets the browser upscale, so it costs the same regardless of
viewport size and freezes under `prefers-reduced-motion`.

> **Note on font variables:** they are declared on `<html>`, not `<body>`.
> Tailwind resolves `--font-serif: var(--font-instrument-serif), …` on `:root`,
> and an inner `var()` is substituted at the element that declares it — put the
> font classes on `<body>` and that lookup silently fails.

## Before launch

- [ ] Set `APP_STORE_URL` in `src/components/AppStoreBadge.tsx`; the badge turns
      itself from "Coming soon" into a real link.
- [ ] Swap the placeholder badge markup for Apple's official artwork
      ([guidelines](https://developer.apple.com/app-store/marketing/guidelines/)).
- [x] Contact email set to `babono@me.com` — referenced in the footer, privacy
      policy, terms and support pages.
- [x] `SITE_URL` in `src/app/layout.tsx` set to https://auraweatheractivity.vercel.app.
- [ ] Have the privacy policy and terms reviewed before you rely on them.
- [ ] Add an OG image at `public/og.png` and reference it in `metadata.openGraph`.

## Deploy

Static output, so anything works — Vercel, Netlify, Cloudflare Pages or GitHub
Pages. App Store Connect wants two of these URLs: `/privacy` (required) and
`/support` (required).
