# Rounak Adhikary — dark knight single-page portfolio

A one-page portfolio filed like a **GCPD case file at 3am**: rain on the glass, sodium
light, film grain, a searchlight behind the cover, and every section kept as evidence —
on top of content that is actually useful (skills, experience, education, contact).

**Zero dependencies.** No framework, no build step, no webfonts, no analytics, no
third-party requests — one HTML file, one stylesheet, one small script and six little
SVG files. It renders identically offline and on GitHub Pages.

```
testCode/
├── index.html                        → the whole page (cover + six case files)
├── css/dark-knight.css               → the noir design system
├── js/dark-knight.js                 → clock, typing, reveals, filters, toggles, cipher
├── assets/Rounak_Adhikary-Resume.pdf → linked from every "Résumé" button
├── assets/bat.svg                    → the bat emblem (used as a CSS mask)
├── assets/bat-mark.svg               → reduced bat, still legible at 14-24px
├── assets/gotham.svg                 → skyline, drawn once and reused in the footer
├── assets/rain.svg                   → seamless rain streaks (scrolled by CSS)
├── assets/grain.svg                  → seamless film grain (SVG turbulence)
├── assets/icon.svg                   → favicon + home-screen icon (standalone)
├── manifest.webmanifest              → lets phones "Add to Home screen"
├── robots.txt                        → allow crawlers (nothing private here)
├── .nojekyll                         → tells GitHub Pages to serve files as-is
└── README.md                         → this file
```

---

## 1. The emblem, and swapping it

**Everything on the page is original artwork, drawn in SVG for this page.** The bat is a
silhouette in the same idiom as the modern film emblem — wide, earless, sharp outer points,
a scalloped underside — but it is **not** a copy or trace of DC / Warner Bros' logo, and no
film or comic artwork, stencil or dialogue is reproduced anywhere in this repo.

That distinction is worth keeping. The official bat symbol is DC's registered trademark and
copyrighted artwork. Dropping that file into a **public** GitHub Pages repo is the kind of
thing that attracts a takedown notice, and the notice lands on your account, not mine — so
please decide that one yourself rather than inheriting it from me. The page already says
plainly, in the cover copy, that the emblem is drawn for this page.

**If you do have artwork you have the rights to use, swapping it in is one edit.** Everything
in the page masks through two tokens at the top of `css/dark-knight.css` (section 1):

```css
--bat:url("../assets/bat.svg?v=2");
--bat-mark:url("../assets/bat-mark.svg?v=2");
```

- **Easiest:** replace `assets/bat.svg` with your own file, keeping the name. A mask only
  reads the alpha channel, so any solid-colour silhouette works — PNG is fine too.
- **Or:** keep your file elsewhere and point `--bat` at it.
- **Bump the `?v=` number** whenever you change the artwork, or returning visitors will keep
  the cached copy of the old one.
- Replacing `bat.svg` changes the masthead mark, the list bullets **and** the searchlight on
  the cover at once, because all three derive from it.
- `assets/icon.svg` is the only other copy — the favicon and the manifest icon come from it
  (they have to be standalone files), and it also carries the "RA" tag at the bottom.

`--bat-mark` is the reduced version for the 14–24px sizes, where fine detail turns to mush;
if your artwork is simple enough you can just point `--bat-mark` at the same file.

---

## 2. Preview it locally

Open `index.html` directly, or serve the folder (nicer, because the PDF download behaves
like it will in production):

```bash
cd testCode
python -m http.server 8080
# then open http://127.0.0.1:8080/
```

---

## 3. Publish it free on GitHub Pages

> ⚠️ **This folder is currently ignored by the parent repo's `.gitignore`** (that was
> requested: everything in `testCode/` stays untracked), so it *cannot* be published from
> this repository as it stands. Pick one:

**Option A — its own repository (recommended for a portfolio)**

```bash
cd testCode
git init -b main
git add .
git commit -m "Dark knight single-page portfolio"
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `root` → Save**.
Your site appears at `https://<your-username>.github.io/<repo>/` in about a minute.

**Option B — publish from this repo**
Delete the `testCode/` line from the root `.gitignore`, commit, then point GitHub Pages at
either the branch root (and browse to `/testCode/`) or the `/docs` folder if you move it there.

**Optional custom domain:** add a `CNAME` file containing your domain, then set the DNS
records GitHub shows you under *Settings → Pages → Custom domain*.

### Before you publish

- Replace the placeholder URLs in `index.html`: `<link rel="canonical">`,
  `<meta property="og:url">` and the JSON-LD `"url"` all say `https://example.github.io/portfolio/`.
  A wrong canonical can stop the page being indexed, so change this first.
- Add an `og:image` if you want a picture in link previews — a screenshot of the cover
  (1200×630) works nicely against a dark feed.
- There is no `404.html` on purpose: GitHub Pages serves `404.html` for *any* missing path,
  and its asset links resolve against that path, so it can only be written correctly once
  the final URL is known.

---

## 4. What's on the page

| File | What it carries |
|---|---|
| Cover | Name, role, live Kolkata clock, rotating focus, case summary, WhatsApp / Instagram / Email, and the "Subject File" panel with the searchlight behind it |
| Evidence tags | 7+ years · 4 companies · 5 enterprise clients · 25+ skills (animated counters) |
| Case 01 · Origin | Prose summary + "Capabilities" list |
| Case 02 · The Arsenal | Five armouries behind six filter chips, six skills flagged **NEW GEAR** |
| Case 03 · The Record | Four roles, then six "Signature Cases" |
| Case 04 · Off the Record | Fifteen personal projects behind five filter chips — each card carries one **Open live** button and nothing else |
| Case 05 · Training | Report card (B.Tech 8.935 CGPA, ISC 84.33%, ICSE 87%) + courses & languages |
| Case 06 · Secure Line | Form that opens a pre-filled mail draft, plus a channels panel |
| Footer | Skyline, case intake counter, quick links, and a hidden cipher |

### The fifteen side cases

Grouped so the filters mean something: **City Tools** (4), **Business** (2), **Portfolio Skins** (6)
and **Personal** (3). Every card links straight to the live site on GitHub Pages — deliberately
**no "view code" button** on any of them.

| # | Project | Live at |
|---|---|---|
| 01 | BusBondhu — Kolkata bus companion | `bus-bondhu` |
| 02 | Two-Wheeler SOS Map | `two-wheeler-sos-map` |
| 03 | Night Owl — Kolkata after midnight | `night-owl-directory-kolkata` |
| 04 | Kolkata SOS Helplines | `sos-kolkata-helplines` |
| 05 | Babyz Pizza — cloud-kitchen storefront | `BabyzPizza` |
| 06 | Babyz Pizza — Revenue & Order Tracker | `babyz-revenue` |
| 07–12 | Six re-skins of this portfolio — Neo, Glass, Neumorph, Y2K, Comic, Gotham | `neo-portfolio-rounak`, `glass-portfolio-rounak`, `portfolio-rounak-neomorph`, `portfolio-rounak-y2k`, `portfolio-rounak-comic`, `portfolio-rounak-gotham` |
| 13 | World Weather Info | `world-weather` |
| 14 | Thailand Trip Planner | `brainstorm` |
| 15 | শুভ বিবাহ · Our Wedding Album | `rounak-soumili-wedding-album` |

The card copy is taken from each site's own `<title>` and meta description, not invented — so if a
project changes its pitch, that is the line to update here.

### Skills marked NEW GEAR

Grouped under **AI-Assisted Engineering** and **Backend & APIs**, added on request to the
existing CV list:

- Spring Boot
- JPA
- CSV Report Generation
- GitHub Copilot
- Claude Code
- Vibecoding

Everything else comes straight from the two résumé PDFs — Core Java, the Collections
Framework, RESTful Web Services, JAX-RS, Microservices, MongoDB (4 yrs), MySQL (3 yrs), XML
Parsing, XSL Transformations, Excel report generation, ad-services revenue calculation,
PCF-ARO migration, E2E migration management, the concierge role, client-facing delivery and
migration playbooks. No clients or dates were invented for the theme.

---

## 5. How the noir look is built

- **Atmosphere layers** — five fixed layers sit behind the content at `z-index:-1`, so they
  can never intercept a click or shift the layout: rain (two tiles at different scales and
  speeds, scrolled by animating `background-position`), film grain (`grain.svg` turbulence),
  a vignette, a pointer-following searchlight, and scanlines for detective mode.
- **The searchlight** — no extra artwork: it is a CSS light disc with `.hero-light::after`
  masked by `--bat` and filled near-black. Positioned by the parent and *animated on a
  pseudo-element*, so the sweep never fights the centring that narrow screens need. On
  phones it parks behind the name instead of hanging off the edge.
- **Masks, not images** — `bat.svg` and `bat-mark.svg` are used with `-webkit-mask`/`mask`,
  so one file tints amber in the header, steel in the footer and whatever a theme needs,
  instead of shipping a colour per variant.
- **Case panels** — a hairline border, a bright left edge, a soft shadow and a mono
  `FILE 03-B` strip; sections are labelled `Case 01 · Origin` and so on.
- **Type** — `Impact` for the lettering, `Segoe UI` for reading, `Courier New` for anything
  meant to look typed. Deliberately no webfont download.

### Interactive bits

- **`RAIN`** — switches the rain and film grain off for a clear night (remembered).
- **`DETECTIVE`** — an amber viewscreen palette plus scanlines. It is a repaint, not a CSS
  `filter`, because a filter on `<body>` would break every fixed-position layer.
- **The cipher** — type `gotham` (or the old ↑ ↑ ↓ ↓ ← → ← → B A) and the signal answers:
  the page flares, shakes, and a hidden file opens. Typing in the form never triggers it.
- **Filters** — show one armoury at a time, with `aria-pressed` kept in sync.
- **Form** — composes a `mailto:` draft from what you type; nothing is sent to a server.
- **Copy-email button** with a `role="status"` announcement.
- **Case intake counter** — a period gag. It is a local `localStorage` counter starting at
  100000, not an analytics service, and no data leaves the browser.
- **Accessibility:** skip link, visible focus rings, `aria-pressed` on toggles, `aria-live`
  announcements, a scroll-margin on each section so the sticky masthead never covers a
  heading, real `<table>` semantics on mobile (the `<thead>` is visually hidden and each
  stacked cell is labelled with `data-th`), and full `prefers-reduced-motion` support — which
  also stops the rain and disables the searchlight sweep.
- **Print stylesheet:** Ctrl/⌘-P gives a clean black-on-white dossier with the atmosphere,
  scanner, buttons and cipher removed.

---

## 6. Editing the content

Everything lives in `index.html`, in plain HTML with comments marking each case.

| Change | Where |
|---|---|
| Name, role, tagline | `.hero-copy` — `<h1 class="title">` and `.dossier` |
| Rotating focus words | `words` array in `js/dark-knight.js` |
| Skills | `.tags` lists inside `#skillGrid`; add `class="is-new"` plus `<span class="badge-new">NEW GEAR</span>`, and set `data-cat` to control which filter shows the panel |
| Jobs | `.timeline` — one `<li class="panel job">` per role |
| Signature cases | `.cards` — one `<article class="panel card">` each |
| Personal projects | `#projectGrid` — one `<article class="panel card project">` each; `data-cat` sets the filter group, the `file-no` strip carries the label, and the single `<a>` in `.project-foot` is the live link |
| Project categories | The chips in `.filters[data-target="#projectGrid"]` — every `data-filter` value must match a `data-cat` value in the grid (`city` / `business` / `skins` / `personal`) |
| Report card | `table.marks` (keep the `data-th` attributes — they are the mobile labels) |
| Courses | `.ticks` inside FILE 04-B |
| The cipher word | `WORD` near the bottom of `js/dark-knight.js` (default `gotham`) |
| The emblem | `--bat` / `--bat-mark` at the top of `css/dark-knight.css` — see section 1 |
| Phone / Instagram / email | `wa.me/918017414711`, `instagram.com/ig_chromozome`, `write2r.adhikary@gmail.com` — each appears several times (cover, channels, footer, JSON-LD) |
| Résumé | Replace `assets/Rounak_Adhikary-Resume.pdf` with the new file, same name |

If you change the phone number or Instagram handle, remember the floating buttons (`.fabs`)
and the footer links too — a search-and-replace for `8017414711` and `ig_chromozome` catches
them all.

**Trading the theme back down:** if you ever want a plain, light version, delete the three
atmosphere divs and the `.rain`/`.grain`/`.vignette`/`.spotlight`/`.scanlines` rules in
`css/dark-knight.css` (section 2) and flip the tokens at the top of the file — the layout is
all tokens, so the page recolours without touching the markup.
