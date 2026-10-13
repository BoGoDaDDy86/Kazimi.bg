# Kazimi Properties

Modern bilingual (BG/EN) real estate marketing site for [kazimi.bg](https://kazimi.bg) — apartments for sale/rent plus buy/sell client offers.

Built with **Next.js**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **next-intl**.

## Local development

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4327/bg](http://127.0.0.1:4327/bg) (default locale is Bulgarian). English: `/en`.

```bash
npm run build
npm start
```

## Listing management (v1)

No database or auth in v1. Content lives in Git as structured JSON — ideal for Vercel static/SSR deploys and simple edits in the repo (or a headless Git-based CMS later).

### Add an apartment

1. Copy an existing file in `content/listings/`.
2. Rename it (filename should match `slug`).
3. Fill bilingual fields (`bg` / `en`) for title, summary, description, features, city, neighborhood.
4. Set `type` to `"sale"` or `"rent"`, `status` to `"published"` (or `"draft"` to hide).
5. Put images under `public/listings/` and reference them as `/listings/your-photo.jpg`.
6. Commit and deploy — the site picks up new files automatically.

### Add a buy/sell offer

Same pattern in `content/offers/`: set `side` to `"buy"` or `"sell"`, bilingual copy, and budget range.

## Deploy on Vercel

1. Import this repository in Vercel.
2. Framework preset: Next.js (defaults are fine).
3. Deploy. Locales are served at `/bg` and `/en`.

Optional: connect the `kazimi.bg` domain in Vercel project settings.

## Brand notes

Palette and logo language are derived from the live Wix site:

- Accent coral **`#F26338`**
- Near-black ink / high-contrast wordmark + house mark
- Elevated stone neutrals (not a cream/terracotta clone)
- Fonts: **Unbounded** (display, Cyrillic) + **Manrope** (body)

## Project structure

```
content/listings/   apartment JSON
content/offers/     buy/sell offer JSON
messages/           UI strings (bg.json, en.json)
public/brand/       logos
src/app/[locale]/   bilingual routes
```
