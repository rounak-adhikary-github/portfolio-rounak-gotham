# portfolioDarkKnight — project notes

Noir "GCPD case file" one-pager for Rounak Adhikary. No framework, no build step, no third-party
requests. `index.html` + `css/dark-knight.css` + `js/dark-knight.js` + `assets/*.svg`.

## Conventions

- **Sections are "Cases", numbered in page order.** Currently: 01 Origin, 02 The Arsenal,
  03 The Record, 04 Off the Record (projects), 05 Training, 06 Secure Line. Adding a case means
  renumbering the `case-label` headings *and* the `FILE 0X-A/B` strips below it.
- **Project cards carry one button only** — the live link. Rounak explicitly does not want
  "view code" buttons. Do not add repo links.
- **Filter chips are generic.** A `.filters` bar names its grid in `data-target`; cards in that
  grid carry `data-cat`; `js/dark-knight.js` wires them. Chip `data-filter` values must match the
  `data-cat` values. Two independent bars exist (skills + projects).
- **Card copy comes from the live site's own `<title>`/meta description**, not from the repo slug.
  Slugs are misleading: `brainstorm` is the Thailand Trip Planner; `rounak-soumili-wedding-album`
  is the শুভ বিবাহ wedding album.
- **The emblem is swappable** via `--bat` / `--bat-mark` at the top of the CSS. Bump `?v=` when
  changing artwork. All artwork must stay original — no DC/Warner Bros. assets in a public repo.

## Verifying changes

Static page, so render it. Headless Edge + CDP works with no installs — see the
`browser-visual-verify` skill. Serve the folder over HTTP (`python -m http.server`) rather than
`file://`. Note the skill's `--scroll-to` uses `window.scrollTo` and therefore ignores
`scroll-margin-top`; to test where a sticky-header anchor really lands, set `location.hash` in
`--setup` instead.
