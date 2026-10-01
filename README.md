# HMA Global Solutions — React site

React 18 + Vite + React Router. Same design as the original, now fully
componentized: every section is its own file, so you edit one component
without touching anything else.

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

Deploy: push to GitHub and import into Vercel or Netlify — both configs are
included (`vercel.json` rewrites, `public/_redirects`), so direct URLs like
`/services` and `/blog` work out of the box. Build command `npm run build`,
output directory `dist`.

## Pages → components

```
src/pages/Home.jsx            Hero · Ecosystem · ProblemSimple · ServicesOverview ·
                              HowWeWork · WhyChooseUs · Platforms · FunnelSection · StrategyCall
src/pages/Services.jsx        PageHero · ServiceExplainers · ServicesShowcase ·
                              TrackingProblem · TrackingDashboard · CtaStrip
src/pages/CaseStudies.jsx     PageHero · Results · CaseStudy · CreativeTesting · CtaStrip
src/pages/About.jsx           PageHero · AboutStory · WorkingSteps · Principles · CtaStrip
src/pages/Blog.jsx            PageHero · BlogSection (filters + cards) · CtaStrip
src/pages/Contact.jsx         PageHero · ContactSection (full qualification form)
```

Each page file is just an ordered list of components — reorder sections by
reordering the imports' usage. Shared pieces live in `src/components/`
(`Navbar`, `Footer`, `shared.jsx` → SectionHead / PageHero / CtaStrip / Ez /
Photo, `LeadForm` with `compact` and `full` variants, `icons.jsx`).

## Editing content

Most copy lives in small data arrays at the TOP of each component file
(pains, service cards, steps, principles, KPIs, campaigns, timeline…).
Change the array, the layout takes care of itself.

- **Blog posts:** `src/data/posts.js`. Set `soon: false` when an article is
  real; the data shape (slug per post) is ready for a `/blog/:slug` route
  when you want individual article pages.
- **Charts & demo data:** `src/lib/charts.js` (SPEND, CONV, TREND, ROUNDS, PM).
- **Canvas scenes:** `src/lib/waveField.js` (hero / funnel / CTA waves).
- **Entrance animations:** `src/lib/reveal.js` — sections opt in via
  `data-reveal`, headings via `data-split`, numbers via `data-count`.

## Wiring the form to a backend (the "M·E·N" part)

`LeadForm` POSTs JSON to `VITE_CONTACT_ENDPOINT` when it's set:

```bash
# .env
VITE_CONTACT_ENDPOINT=https://your-api.example.com/api/leads
```

Point it at an Express route, a serverless function, or a CRM webhook.
Without it, the form shows the design-sample confirmation and sends nothing.

## Fixed in this version

- **"Next step" strip on inner pages**: the dark band never set a text
  colour, so its heading rendered charcoal-on-charcoal — invisible. Fixed in
  `src/styles.css` (`.cta-strip` now sets `color: var(--on-dark)`); verified
  with computed-style checks on all four pages.
- Insights → **Blog** (`/blog`), in the navbar and footer.

## Before this goes to a client

1. **Logo:** placeholder mark in `src/components/icons.jsx` (`LogoMark`) and
   `public/img/favicon.svg` — swap for the official SVG.
2. **Email:** `hello@hmaglobalsolutions.com` in
   `src/components/contact/ContactSection.jsx` is a placeholder.
3. **Sample data:** every metric is demo data, labelled on the page.
4. **Photos:** placeholder stock in `public/img/`; the duotone/cool CSS
   treatments restyle replacements automatically.
