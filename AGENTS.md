# AGENTS.md

`streaming-html5` (package `streaming-webrtc`): Vite + TypeScript testbed of
Red5 Pro WebRTC SDK examples (WHIP/WHEP, legacy RTC, Stream Manager, data
channel, live seek, etc.). The build output ships with the Red5 Pro server
as `webrtcexamples` and is published from tags by `release-on-tag.yml`.
`gh-pages` serves https://red5pro.github.io/streaming-html5/.

UI follows the **Red5 Pro Server Console** design language (tokens, typography,
tiles, and controls). Treat `public/style/main.css` as the source of truth for
theme variables; match existing example patterns before inventing new layout.

## Layout

- `src/examples/<name>/` — one directory per example; `README.md` links them all.
- `src/components/`, `src/lib/`, `src/service/`, `src/settings/` — shared UI, helpers, settings panel.
- `public/style/main.css` — global tokens, typography, buttons, breadcrumbs, icons.
- `public/style/pages/example.css` — shared example chrome (log panel, controls tray, live pill, media stage).
- `public/style/pages/<page>.css` — page-specific layout only; prefer tokens over one-off hex.
- `public/style/header.css`, `public/style/subscriber-link.css`, etc. — styles for shadow-DOM web components.
- `public/libs/red5pro/` — bundled SDK build and its generated API docs; updated by SDK bumps, not edited by hand.
- `scripts/` — license-header check and packaging helpers.
- `.planning/` — design references (e.g. `console.css`, icon HTML snippets); use for parity, not shipped assets.

## Commands

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # tsc + vite build
npm run lint
npm run format
npm run check:license-headers
```

Enable the pre-commit hook (license headers + build): `git config core.hooksPath .githooks`.

## Branches and releases

- Release lines are `epic/<CODENAME>` (default branch = current line, e.g. `epic/RAAS`),
  matching `red5pro-plugins`. There is no `master`/`develop`; merge epic → epic directly.
- A new line starts with a `release/<CODENAME>_SETUP` PR that bumps `version` in `package.json`.
- Tags `<PFX>-<x.y.z.n>-release` (server) and `CLD-<x.y.z.n>-release` (Cloud) are created by CI builds.
- `epic/*` and the default branch are protected: PR with 1 approval, merge commits only, no force push.

## Conventions

- Branch: `feat/…`, `fix/…`, `bug/…`, `doc/…`, ideally with the Jira key (`fix/live_seek_RED5DEV-1234`).
- Commit/PR title: Jira key plus summary, e.g. `RED5DEV-1234: Fix live seek cleanup`
  (older history uses `fix:` / `feat:` prefixes).
- Keep license headers on new source files (`scripts/check-license-headers.mjs`).
- Do not commit credentials or real Stream Manager hosts in examples or settings defaults.

## UI and design standards

### Theme

- Light theme: default on `:root`.
- Dark theme: `[data-theme='dark']` on `<html>` (via settings / `applyTheme()`).
- Use CSS custom properties (`--bg`, `--text`, `--border`, `--accent`, etc.); do not hardcode console colors in new CSS.
- Dark body uses a fixed radial wash; cards/tiles use `--tile-bg` (gradient in dark, flat in light).
- `r5-header` shadow DOM defines matching tokens on `:host` in `header.css`.

### Fonts

- Loaded remotely in `main.css` (same approach as the server console):
  - **IBM Plex Mono** (400/500) — labels, meta, breadcrumbs, tags, log-adjacent UI.
  - **Clash Grotesk** (400/500/600/700) — headings and body sans.
- **Do not** vend Clash font files in `public/fonts/`; Fontshare/ITF license restricts redistribution in shipped products.

### Typography and weight

- Prefer **font-weight 500** for headings and buttons; avoid **700** unless there is a strong reason.
- Global `h1`–`h3` are weight 500; page titles use `.page__heading` (46px, 32px at ≤760px).
- Section labels: mono, uppercase, ~14px, increased letter-spacing (see `.examples-section__title`, `.log-panel__title`, `.section-title`).

### Color accents (data tones)

Use semantic tokens, not raw hex, for chips and icons:

| Token        | Role                                 |
| ------------ | ------------------------------------ |
| `--c-red`    | Publish / live / camera              |
| `--c-blue`   | Subscribe / eye                      |
| `--c-amber`  | Messaging / broadcast                |
| `--c-purple` | Stream Manager examples (where used) |

Light and dark each define these in `main.css`. Accent/link and danger buttons differ by theme (coral outline danger in dark).

### Icons

- Line icons: `<svg class="i" viewBox="0 0 24 24">` with stroke `currentColor`, width ~1.7 (see global `svg.i` in `main.css`).
- Reference shapes live in `.planning/icons/*.html` when adding new chips.
- **Chips** (landing cards): `.chip` with inline `--tone`; 42×42, 12px radius; card chips in `public/style/pages/index.css`.
- **Host pill** on landing: globe in `.host-ico` (red tone).

### Landing page (`index.html`, `src/main.ts`, `index.css`)

- Example cards: 18px tile radius, 1.5px border, 16px grid gap; 3 → 2 → 1 columns at 1000px / 760px.
- Optional section or per-card `chip` config in `src/main.ts` (`SectionChip`: tone + SVG).
- Filter control: mono uppercase label, search icon in input.

### Example pages (shared chrome)

**Stylesheets:** always include `/style/main.css` and `/style/pages/example.css`; add `/style/pages/<name>.css` only for layout unique to that example.

**Breadcrumb** (all example HTML):

```html
<nav class="breadcrumb">
  <a class="breadcrumb__home" href="/">Home</a
  ><span class="breadcrumb__sep" aria-hidden="true">/</span> Page Title
</nav>
```

Rendered uppercase via CSS; link is muted (not accent red). Header brand text remains “WebRTC Testbed”.

**Log panel**

- Header: “Log” + icon clear button `#log-clear-btn` with trash SVG (not a text “Clear” label).
- Wire with `wireExampleLog()` from `@/lib/example-log`.
- Styles: `.log-panel__clear` in `example.css`.

**Publisher preview (WHIP examples)**

- Wrap `#publisher-video` in `.media-stage` (or `.video-preview` when mute indicators exist).
- Live badge: `#live-pill` with classes `.live-pill` / `.live-pill__dot` (styles in `example.css`).
- Show/hide with `setLivePillVisible()` from `@/lib/live-pill` on **`Publish.Available`** (same timing as enabling `r5-subscriber-link`), hide on unpublish/errors.

**Controls tray**

- Publish actions + `<r5-subscriber-link>` in `.controls-tray` / `.controls-tray__actions`.
- Subscriber link includes blue eye chip; layout rules in `subscriber-link.css` and `example.css` (right-aligned ≥496px, icon order responsive).

**Select controls**

- Custom chevron: `::after` clip-path triangle on `.settings-panel__select-wrap` and `.publish-settings__select-wrap` (`header.css`, `publish-settings.css`), not the native `▾` glyph.

### Web components

- `r5-header`, `r5-subscriber-link`, `r5-publish-settings`, etc. use shadow DOM + linked CSS under `public/style/`.
- Theme variables inherit from the document into shadow trees; component `:host` tokens must stay aligned with `main.css` when changing palette.

### Responsive breakpoints (common)

- **760px** — page padding, heading size, header wrap, landing grid → 1 column.
- **1000px** — landing grid → 2 columns.
- **495px** — subscriber link alignment / chip order in controls tray.

### New example checklist

1. License header on new TS/HTML.
2. `main.css` + `example.css` (+ page CSS if needed).
3. Breadcrumb `Home / …`, `<r5-header>`, standard log panel with trash clear.
4. WHIP publish: `media-stage`, live pill, `Publish.Available` → pill + subscriber link.
5. Tokens and weights consistent with `main.css`; no new font files.
6. Run `npm run build`, `npm run lint`, `npm run check:license-headers`.
