# Boulders Camp · Wolwedans

A website prototype for **Wolwedans Boulders Camp** in Namibia's NamibRand Nature Reserve, built for the Creo Media Stage 2 assessment (Part 1).

**Live site:** https://boulders-camp.vercel.app

---

## The brief, in one line

Help someone **discover** Boulders Camp, **fall in love** with it, and **enquire directly** instead of going through a travel agent.

## Creative concept: *From first light to starlight*

The website is the experience. The homepage follows one day at Boulders, and the page itself changes with the light: warm sand at sunrise, dusk tones in the afternoon, then deep night for the Antares star safari, before warming up again for the enquiry.

- **Headline:** *Where the silence begins*
- **Tone:** premium, calm and restrained. Few words, big photography, generous white space, slow and subtle motion.
- **Selling comes before complexity:** every section ends close to an enquiry, and the visitor can reach the planner from anywhere in one or two clicks.

## Features

| Feature | What it does |
|---|---|
| **Cinematic hero** | Slow cross-fading, zooming photographs (in place of a video), with a pause control, a transparent nav with a "Plan your stay" button, and a quick-link icon row. |
| **Suites carousel** | Four Seasons-style: outlined inactive cards and one solid active card in the centre, with arrows, a "2 / 5" counter and keyboard support. "Enquire about Suite X" pre-selects that suite in the planner. |
| **Day-to-night timeline** | Five moments from 06:00 to 21:00. The background darkens from sand to night. |
| **Antares night sky** | A drawn, twinkling starfield with a Milky Way glow and a granite silhouette. |
| **Plan your stay builder** (the interactive feature) | Dates (minimum 2 nights), adults and children (maximum 10 guests, children 7+), suites (2 guests each, with validation), included and on-request activities, and a **live price estimate** (from NAD 20,950 per person per night, levy excluded). Ends with a success summary and a **WhatsApp hand-off** pre-filled with the enquiry. |
| **Experience page** | `/experience`: *A Day & Night at Boulders*, hour by hour, with each hour in its own light. |
| **Lead generation** | A sticky enquiry bar on mobile, a floating WhatsApp button on desktop, the honest scarcity cue "Only 5 suites · max 10 guests", sustainability partner logos, placeholder guest quotes, a journey-guide email signup and downloadable rate sheets. |
| **Performance and accessibility** | WebP images served through `next/image` (responsive sizes, lazy loading), self-hosted fonts, fully static pages, `prefers-reduced-motion` support, a skip link, labelled controls and alt text on every image. |

## Tech stack, and why

- **Next.js 16 (App Router) + TypeScript:** pages are pre-rendered as static HTML, so they load fast and are SEO-friendly. TypeScript catches content-shape mistakes early.
- **Tailwind CSS v4:** design tokens live in one `@theme` block, and styling stays next to the markup, which makes changes quick.
- **Vercel:** every push to `main` deploys automatically.
- **No UI or animation libraries:** the motion is plain CSS plus one small `IntersectionObserver`, which keeps JavaScript to a minimum on mobile.

## Folder structure and CMS readiness

```
app/
  layout.tsx          Fonts, metadata, nav, footer, sticky enquiry bar
  page.tsx            Homepage: just an ordered list of sections
  experience/page.tsx Experience page
  globals.css         Design tokens (colours, fonts, easing)
components/           Presentational sections. They render content and hold no copy.
content/              All text, data and image paths, as JSON
  site.json           Camp name, SEO, nav, contact, footer
  home.json           Homepage sections
  suites.json         The five suites
  day.json            The day timeline (shared by both pages)
  planner.json        Rates and rules for the planner
  experience.json     Experience page
lib/content.ts        Single entry point that loads and types the content
public/images/        WebP photos (originals in /original, partner logos in /logos)
public/docs/          Official rate and activity PDFs
```

**Why it's CMS-ready:** components never contain copy. They import from `lib/content.ts`, which today reads local JSON. A headless CMS (Sanity, Contentful, Storyblok and so on) can replace those imports with API calls that return the same shapes, without changing any component. Each JSON file maps directly to a CMS content type: Site settings, Home page, Suite, Day moment, Planner settings and Experience page.

## Reusing the design for other Wolwedans camps

The design is a template. To launch Dune Camp or Plains Camp:

1. Copy `/content` and replace the text, suites, rates and image paths.
2. If needed, change the colour tokens in `app/globals.css` and the two fonts in `app/layout.tsx`.
3. No component changes are required. Sections that a camp doesn't need can be removed from `app/page.tsx`.

## Run it locally

Requires Node.js 20.9 or later.

```bash
git clone https://github.com/Kirubel007/boulders-camp.git
cd boulders-camp
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Image credits

All photography, partner logos and rate documents are **© Wolwedans**, sourced from [wolwedans.com/boulders-camp-2](https://www.wolwedans.com/boulders-camp-2/) and used for this assessment prototype only.

## Data and privacy note

This is a design prototype. **It does not collect, send or store any guest data**, and it is not connected to any booking system. The planner and the journey-guide form only show on-screen confirmations. Guest quotes are marked as placeholders.
