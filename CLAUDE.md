# Boulders Camp Website — Project Brief

Creo Media Stage 2 assessment, **Part 1: Website prototype**.
Deadline: **Tue 13 Oct 2026, 17:00 CAT**. About 6 hours of build time, so speed and finish matter more than complexity.

## The brief
Create a digital experience that makes someone **discover** Wolwedans Boulders Camp, **fall in love** with it, and **enquire or book directly** instead of going through travel agents.

Required:
1. An immersive homepage that leads from discovery to enquiry.
2. One Experience page or a substantial section.
3. At least one working interactive feature.
4. A responsive layout for mobile and desktop.
5. A CMS-ready structure, with a design that other Wolwedans camps could reuse. Don't build the CMS.

Rules:
- Don't collect real guest data. Don't connect to live booking systems.
- Don't copy any one site.

## Creative principle
**The website is the experience.** Make people *feel* the silence, the granite, the stars and the remoteness, then make enquiring effortless.
- Selling comes before complexity.
- Premium, calm and restrained: few words, big imagery, generous white space, slow and subtle motion. Don't overdo it.

## Design references
Screenshots are in `/design-refs`. Look at them.
1. **Singita:** a full-screen cinematic hero with a transparent nav over it. One warm-coloured "Plan your trip" button in the nav. A huge elegant serif headline with a tiny tagline underneath.
2. **One&Only:** a small uppercase letter-spaced eyebrow above a large serif headline and a short subline, centred. Sound and pause controls on the hero video.
3. **Mandarin Oriental:** a slim row of line icons at the bottom of the hero for quick navigation (Suites, Experiences, Stars, Dining, Sustainability, Enquire). Below the hero, one large light-weight intro statement. A rounded "Book Stay" pill button.
4. **Four Seasons:** a dark full-bleed photo background with a centred card carousel. Inactive cards are outlined and show titles only. The active card is solid, with an image, a line of copy and a CTA. Arrows plus a "2 / 5" counter. Use this for the suites or experiences.

Also borrow the premium feel of Melia, Sandals and LHW: clear booking prompts and strong trust signals.

## Lead-generation rules
These come from the Qrolic article on getting more leads from a hotel website.
- A **sticky enquiry/booking bar** that's always visible, especially on mobile.
- A visitor can reach enquiry in **3 clicks or fewer** from anywhere.
- **Fast on mobile:** WebP images, lazy loading, minimal JavaScript.
- **Show the experience:** a video or slideshow hero, and photos with people in them.
- **Trust signals:** guest quotes (marked as placeholders), sustainability partners, and the honest scarcity cue "Only 5 suites · max 10 guests".
- A **lead magnet:** "Download the Boulders Camp journey guide" in exchange for an email (front-end only).
- **WhatsApp** quick contact.

## Real Boulders Camp content
- **Setting:** the base of a granite outcrop in the deep south of the NamibRand Nature Reserve, Namibia. It's the most remote Wolwedans camp, about 3 hours south of the others. Massive mountains rise behind it, and gravel plains stretch in front, dotted with the tops of submerged mountains.
- **Suites:** 5 tented suites, max 10 guests. Each has a spacious deck, a room open on three sides for the afternoon breeze, a separate bathroom, and a sala for afternoon rest. Suite 1 has a private plunge pool. Suites 2 & 3 share one, and so do 4 & 5.
- **Shared spaces:** a dining and lounge tent, a breakfast deck, a library, a pool, an open fireplace, and sundowners on a nearby rocky plateau.
- **Included activities:** morning and evening scenic drives, desert sundowners, the "Antares" naked-eye star safari, a full-day scenic safari, fat e-bikes, and 2–3 hour Bushman walks across ancient hunting grounds.
- **On request:** a Heart & Home Village tour and horse riding.
- **Sustainability:** a per-person, per-night Sustainability Levy linked to Wolwedans' "5 Cs". Partners: NamibRand Nature Reserve, Wolwedans Foundation, AridEden 2030, The Long Run, Dark Sky.
- **Rates:** from NAD 20,950 per person per night, excluding the levy. Minimum 2 nights. Children 7+.
- **Contact:** reservations@wolwedans.com, +27 66 382 5330 (WhatsApp).

### Images
These are official Wolwedans photos. Download them into `/public/images`, convert them to WebP, and credit Wolwedans in the footer and README.
- https://www.wolwedans.com/wp-content/uploads/Boulders-Camp-Wolwedans-7-min.jpg
- https://www.wolwedans.com/wp-content/uploads/Wolwedans-Boulders-Camp-Enjoying.jpg
- https://www.wolwedans.com/wp-content/uploads/Boulders-Room-interiors.jpg
- https://www.wolwedans.com/wp-content/uploads/Boulders-at-sunset-2.jpg
- https://www.wolwedans.com/wp-content/uploads/Wolwedans-Boulders-Camp-Fairy-Ci.jpg
- https://www.wolwedans.com/wp-content/uploads/WOLWEDANS-COLLECTION-Boulders-Camp-Morning-coffee-stop-scaled.jpg
- https://www.wolwedans.com/wp-content/uploads/WOLWEDANS-COLLECTION-Boulders-Camp-Exterior-Room-Deck-scaled.jpg
- https://www.wolwedans.com/wp-content/uploads/WOLWEDANS-COLLECTION-Boulders-Camp-Martin-Gregus-@mywildlive-43.jpg
- https://www.wolwedans.com/wp-content/uploads/WOLWEDANS-COLLECTION-Boulders-Camp-Martin-Gregus-@mywildlive-44.jpg

## Suggested homepage journey
1. Cinematic hero
2. Intro statement
3. "Arrive": the remoteness
4. Suites carousel (Four Seasons style)
5. A day at Boulders, from sunrise to stars
6. Night sky / Antares
7. Regeneration and the 5 Cs
8. Guest voices
9. **Interactive "Plan your stay" builder:** choose dates (min 2 nights), guests (max 10, children 7+), suite and activities. Show a live estimated price, then send the enquiry (front-end only, with a success message and a WhatsApp option).
10. Footer

Also build an **Experience page**, for example "A Day & Night at Boulders".

## Technical approach
- Next.js (App Router), TypeScript, Tailwind, deployed on Vercel.
- **All text, data and image paths live in `/content/*.json`**, so a CMS could replace them later. Components only render content.
- Design tokens (colours and fonts) go in one place, so other Wolwedans camps can reuse the design by swapping content and tokens.

## Deliverables and Git
I must submit (1) a working link to the deployed website and (2) a GitHub repository with the source code.

- **Setup is done:** the repo is at github.com/kirubel007/boulders-camp and is connected to Vercel. Every push to `main` deploys automatically.
- **Live URL:** https://boulders-camp.vercel.app
- `.gitignore` must include node_modules, .next, .env*, .DS_Store and .vercel.
- After each build step, commit and push with a clear message in the form `feat: …`, `fix: …`, `style: …` or `docs: …`. I want a clean, readable commit history.
- At the end, write a professional `README.md` covering:
  - the project overview and creative concept;
  - the live link;
  - the tech stack and why I chose it;
  - the folder structure, explaining CMS readiness;
  - how the design could be reused for other Wolwedans camps;
  - how to run it locally;
  - features, including the planner;
  - image credits to Wolwedans;
  - a note that the prototype collects no real guest data.
- Before submission, run this final checklist:
  - the live site loads;
  - the mobile view has been checked;
  - every link works;
  - the repo is public and its README shows the live link;
  - there are no API keys or secrets in the code.

## How to work with me
- I'm on Windows and using the VS Code terminal.
- Explain decisions simply. I may have to defend this code in an interview.
- Work in steps of 30–45 minutes. After each step, commit, push and tell me what to check on the live site.
