# Why This War — PRD

> Short Title: Clear, sourced explainers on why current wars started and what drives them
> Last Updated: 2026-04-14

---

## Overview

Why This War is an educational explainer site answering one fundamental question about each active armed conflict: why is this war happening? For each conflict, the site provides a structured, source-backed explanation covering historical root causes, political and ethnic drivers, key actors, economic interests, and the specific escalation events that triggered open warfare. The tone is factual and neutral — the goal is understanding, not advocacy.

The site targets students, curious adults, and non-specialist readers who encounter conflict news but lack the background to understand context. It is structured around individual conflict pages, each built from a rich JSON data file. All content is static (SSG), internationalised across 8 languages, and monetised via Adsterra and Google AdSense.

**Live URL:** https://why-this-war.vercel.app

---

## Target Users & Pain Points

| User Type | Pain Point | How This Solves It |
|---|---|---|
| Students (high school / university) | Textbooks and Wikipedia are too dense or outdated | Plain-language, structured explainers with source links for citations |
| Curious adults / news readers | Hear about a war but don't understand what caused it | One-page answer per conflict: history, causes, key actors, escalation |
| Teachers / educators | Need reliable, shareable explainer resources | Clean pages, structured data, suitable for classroom use |
| Journalists (junior / generalist) | Need quick background before covering a conflict | Key actor profiles, timeline of escalation, root cause breakdown |
| Non-English readers | Conflict analysis is almost exclusively in English | 8-language i18n; accessible reading level in all languages |
| Policy researchers | Want structured comparative data across conflicts | JSON data model consistent across all conflicts |

---

## Tech Stack

- Framework: Next.js 15 (App Router, SSG)
- Styling: Tailwind CSS
- i18n: next-intl (8 languages: en / ko / ja / zh / es / fr / de / pt)
- Data: JSON files in /public/data/ (conflicts.json)
- Ads: Adsterra + Google AdSense ca-pub-7098271335538021
- Deployment: Vercel free tier
- Repo: GitHub (public)
- Typography: Readable body text — no icon-heavy design; content-first layout

---

## Pages & Routes

```
app/
├── [locale]/
│   ├── layout.tsx                  # Locale provider, nav, footer, ad slots
│   ├── page.tsx                    # Home: conflict index — all conflict cards
│   └── [conflictSlug]/
│       └── page.tsx                # Individual conflict explainer page (SSG)
├── api/
│   └── conflicts/
│       └── route.ts                # GET /api/conflicts — returns conflicts array
└── layout.tsx                      # Root layout (fonts, AdSense script)
```

### Page Descriptions

**Home — Conflict Index (`/[locale]/`)**
- Hero section: site mission statement ("Understand why every major war is happening")
- Search bar: fuzzy search across conflict names and regions
- Conflict cards grid: one card per conflict
  - Each card: conflict name, region badge, parties involved, start year, root cause tags (1–3), one-sentence hook ("Russia invaded Ukraine citing NATO expansion and ethnic Russian protection in Donbas"), "Read explainer" CTA
- Filter by region (Europe, Middle East, Africa, Asia-Pacific, Americas)
- Adsterra leaderboard ad below hero section

**Conflict Explainer Page (`/[locale]/[conflictSlug]/`)**
- SSG from conflicts.json slugs
- Page structure (long-form, scrollable):
  1. **Header**: conflict name, parties, region, start date, current status badge
  2. **In a Nutshell**: 2–3 sentence plain-language summary for casual readers
  3. **Historical Root Causes**: structured section covering long-term historical background (colonialism, ethnic tensions, border disputes, religious divisions)
  4. **Political Causes**: government decisions, power dynamics, election outcomes that contributed
  5. **Economic Causes**: resource competition, trade interests, sanctions, debt
  6. **Key Actors**: profiles of each major party (government, militia, foreign backer) with their stated goals and actual interests
  7. **Timeline of Escalation**: ordered list of specific events leading from background conditions to open warfare
  8. **Why Now?**: what triggered this specific outbreak at this specific time
  9. **What Each Side Claims**: brief summary of each party's stated justification for the war
  10. **What Analysts Say**: brief summary of expert / independent analysis
  11. **Further Reading**: 4–8 vetted source links
- Adsterra in-content ad unit (between sections 3 and 4)
- Second Adsterra unit (between sections 7 and 8)
- Breadcrumb: Home > [Conflict Name]
- "Last updated" date

**API (`/api/conflicts`)**
- Returns conflicts.json array
- Filter params: `?region=`, `?status=`, `?limit=`
- Used by SSG at build time

---

## Data Model (JSON schema)

File: `public/data/conflicts.json`

```json
[
  {
    "id": "string (slug-safe, e.g. 'ukraine-russia')",
    "slug": "string (matches id)",
    "name": "string (e.g. 'Ukraine-Russia War')",
    "parties": [
      {
        "name": "string (e.g. 'Ukraine')",
        "role": "defender | aggressor | rebel | external-backer | other",
        "statedGoal": "string (their official stated reason for fighting)",
        "actualInterest": "string (analyst assessment of real motivations)",
        "externalBacker": "string | null (e.g. 'United States, NATO')"
      }
    ],
    "region": "europe | middle-east | africa | asia-pacific | americas",
    "startDate": "string (ISO 8601)",
    "currentStatus": "active | frozen | ceasefire | ended",
    "rootCauseTags": ["string (1–4 short tags, e.g. 'territorial', 'ethnic', 'resource', 'religious', 'colonial-legacy', 'proxy-war')"],
    "inANutshell": "string (2–3 sentences, plain language, max 400 chars)",
    "historicalRootCauses": [
      {
        "period": "string (e.g. '1991–2014')",
        "description": "string (paragraph, max 500 chars)"
      }
    ],
    "politicalCauses": ["string (each item one key political factor, max 200 chars)"],
    "economicCauses": ["string (each item one economic factor, max 200 chars)"],
    "keyActors": [
      {
        "name": "string",
        "type": "state | non-state | international-org | individual",
        "role": "string (brief description of their role in the conflict)",
        "statedGoal": "string",
        "notes": "string | null"
      }
    ],
    "escalationTimeline": [
      {
        "date": "string (ISO 8601 or year string)",
        "event": "string (max 200 chars)"
      }
    ],
    "whyNow": "string (paragraph explaining the proximate trigger, max 600 chars)",
    "whatEachSideClaims": [
      {
        "party": "string",
        "claim": "string (max 300 chars)"
      }
    ],
    "analystView": "string (paragraph on expert/independent analysis, max 600 chars)",
    "furtherReading": [
      {
        "label": "string",
        "url": "string",
        "type": "article | report | book | documentary"
      }
    ],
    "imageUrl": "string | null (CC-licensed map or conflict image)",
    "imageAlt": "string | null",
    "imageCredit": "string | null",
    "lastUpdated": "string (ISO 8601 date)",
    "tags": ["string"]
  }
]
```

### Field Notes
- `rootCauseTags`: used for filter chips on home page; keep consistent across entries
- `escalationTimeline`: should have 5–10 entries per conflict, covering key events from background conditions to outbreak
- `parties[].role`: use `external-backer` for countries not directly fighting but supplying weapons/troops
- `actualInterest` vs `statedGoal`: this distinction is central to the site's value — provide analyst-level nuance beyond official narratives
- `historicalRootCauses`: structured as time-period segments to show how causes compound over decades
- `lastUpdated`: update whenever conflict status or key facts change

---

## Milestones & Git Push Points

### M0 — Project Scaffold
- Next.js 15 init, Tailwind, next-intl for 8 locales
- Empty `conflicts.json` with 1 placeholder entry
- Vercel project linked; first deploy succeeds
- Git push: `chore: init why-this-war scaffold`

### M1 — Data Layer & API
- `conflicts.json` populated with 3 complete conflict entries (Ukraine-Russia, Gaza-Israel, Sudan)
- Each entry has all required fields populated with researched content
- API route implemented with region and status filters
- TypeScript types for Conflict schema
- Git push: `feat: conflicts data layer with 3 entries and API route`

### M2 — Home Conflict Index
- Conflict cards grid with all card fields
- Region filter (client-side)
- Search bar (client-side fuzzy search across name, region, rootCauseTags)
- Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
- Git push: `feat: home conflict index with search and region filter`

### M3 — Conflict Explainer Pages
- SSG: `generateStaticParams` from all conflict slugs
- Full explainer page layout: all 10 content sections
- Breadcrumb component
- Per-page metadata: og:title, og:description, og:image
- Adsterra ad units between sections
- Git push: `feat: conflict explainer pages SSG with full layout`

### M4 — i18n & Content Expansion
- next-intl messages for all 8 languages (UI strings)
- Add 3 more conflict entries (Myanmar, Yemen, and 1 more): total 6 conflicts
- Git push: `feat: i18n messages and 6 conflict entries`

### M5 — Ads & SEO
- Google AdSense script in root layout
- Sitemap covering all conflict slugs × 8 locales
- Structured data (Article / FAQPage) on conflict explainer pages
- `robots.txt` allow all
- Git push: `feat: ads, sitemap, structured data, robots.txt`

### M6 — Launch
- 6+ conflict entries, all with complete content
- Lighthouse ≥ 90 performance and accessibility
- All 8 locale routes verified
- Google Search Console sitemap submitted
- Git push: `chore: launch — 6 conflicts, all locales, SEO complete`

---

## Agent Team

### Frontend Agent
**Responsibilities:**
- Home conflict index grid: card design, search bar, region filter
- Conflict explainer page: full 10-section layout with clear section headings
- Timeline of escalation component (ordered list with date pills)
- Key actors table or card list
- Parties section: statedGoal vs actualInterest display
- Breadcrumb component
- Responsive typography (content-first; body text must be highly readable)
- Ad slot placement between content sections

**Key files:** `app/[locale]/page.tsx`, `app/[locale]/[conflictSlug]/page.tsx`, `components/ConflictCard.tsx`, `components/EscalationTimeline.tsx`, `components/KeyActors.tsx`, `components/PartiesList.tsx`

### Backend / Data Agent
**Responsibilities:**
- Maintain and validate `conflicts.json`
- API route with region and status filters
- TypeScript types (`types/conflict.ts`)
- `generateStaticParams` for conflict SSG pages
- Data validation: unique slugs, valid ISO dates, valid enum values for region/status/type, minimum required fields populated

**Key files:** `app/api/conflicts/route.ts`, `public/data/conflicts.json`, `types/conflict.ts`, `lib/getConflicts.ts`

### SEO / Content Agent
**Responsibilities:**
- Research and write 6+ complete conflict explainers with accurate, sourced content
- Each explainer must pass editorial quality check: factual accuracy, neutral tone, 4+ further reading links
- Keyword-optimised page titles and meta descriptions
- Home page: keyword targeting for "why is [conflict] happening" queries
- next-intl UI messages for 8 languages
- Structured data (Article, FAQPage) on explainer pages
- Sitemap generation
- `lastUpdated` maintenance when conflict facts change

**Key files:** `public/data/conflicts.json`, `messages/`, `app/sitemap.ts`

### QA Agent
**Responsibilities:**
- Validate conflicts.json schema and content quality (no empty required fields)
- Test API filter params
- Verify all SSG conflict pages resolve
- Check all 8 locale routes return HTTP 200
- Lighthouse audits: Performance ≥ 90, Accessibility ≥ 90
- Validate structured data in Google Rich Results Test
- HTTP 200 check on all further-reading URLs
- Readability check: body text size ≥ 16px, sufficient contrast ratio

---

## SEO Strategy

### Primary Keywords

| Keyword | Monthly Volume (est.) | Intent | Target Page |
|---|---|---|---|
| why is ukraine at war | 18,000 | Informational | Conflict: ukraine-russia |
| why did the war start | 9,500 | Informational | Home / multiple conflict pages |
| conflict causes explained | 4,200 | Informational | Home |
| why is there a war in gaza | 22,000 | Informational | Conflict: gaza-israel |
| why did russia invade ukraine | 35,000 | Informational | Conflict: ukraine-russia |
| what caused the sudan war | 7,800 | Informational | Conflict: sudan |
| why is myanmar at war | 5,100 | Informational | Conflict: myanmar |
| why is there a war in yemen | 8,300 | Informational | Conflict: yemen |

### On-Page SEO
- Home `<title>`: `Why This War? — Conflict Causes Explained | All Active Wars 2026`
- Conflict `<title>`: `Why Is There a War in Ukraine? Causes Explained | Why This War`
- Meta descriptions: 150–160 chars; lead with the primary keyword question form
- H1 on conflict pages: "Why Is There a War in [Place]?" (matches search query intent)
- H2 subheadings: match common question formats ("What caused the [conflict]?", "Who started the [conflict] war?")
- `hreflang` for all 8 locales on every page

### Structured Data
- `Article` schema on each conflict page: `headline`, `dateModified`, `description`, `author`
- `FAQPage` schema on conflict pages: populate with 3–5 Q&A pairs (e.g. "Why did Russia invade Ukraine?", "What are the root causes of the Gaza conflict?")
- `BreadcrumbList` on conflict pages

### Content Strategy
- H1 and first paragraph must directly answer the page's primary query
- Use the `whyNow` field content as the opening paragraph (immediate answer, then depth)
- Keep reading level accessible (aim for Flesch-Kincaid Grade 10 or lower)
- Conflict pages are evergreen; prioritise depth over frequency
- Update `lastUpdated` and refresh `currentStatus` whenever major conflict developments occur
- Further reading links signal E-E-A-T to Google; prefer BBC, Reuters, academic sources, UN reports

### Technical SEO
- Sitemap: all conflict slugs × 8 locales
- No JavaScript required for initial content render (SSG, fully static)
- All images use `next/image` with explicit dimensions
- Canonical per locale

---

## Launch Checklist

- [ ] `conflicts.json` has 6+ complete entries covering major active conflicts
- [ ] Each entry has: all 10 content sections populated, 4+ further reading links, valid slug
- [ ] Conflicts covered at minimum: Ukraine-Russia, Gaza-Israel, Sudan, Yemen, Myanmar, plus 1 more
- [ ] Home conflict index renders with search and region filter working
- [ ] Conflict explainer SSG pages generated for all slugs in conflicts.json
- [ ] `/api/conflicts` returns valid JSON; `?region=` and `?status=` filters work
- [ ] All 8 locale routes return HTTP 200
- [ ] Adsterra and AdSense units present in production HTML
- [ ] `sitemap.xml` accessible; submitted to Google Search Console
- [ ] `robots.txt` allows all crawlers
- [ ] `hreflang` tags on all pages
- [ ] BreadcrumbList and FAQPage structured data validate in Rich Results Test
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 90
- [ ] No broken further-reading links (HTTP 200)
- [ ] og:title and og:description correct on conflict pages (Open Graph debugger)
- [ ] Body text readable at ≥ 16px; contrast ratio ≥ 4.5:1
- [ ] Vercel Analytics enabled
- [ ] Live URL confirmed: why-this-war.vercel.app
- [ ] Mobile layout reviewed at 375px viewport
