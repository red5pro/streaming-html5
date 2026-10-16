# AGENTS.md

`streaming-html5` (package `streaming-webrtc`): Vite + TypeScript testbed of
Red5 Pro WebRTC SDK examples (WHIP/WHEP, legacy RTC, Stream Manager, data
channel, live seek, etc.). The build output ships with the Red5 Pro server
as `webrtcexamples` and is published from tags by `release-on-tag.yml`.
`gh-pages` serves https://red5pro.github.io/streaming-html5/.

## Layout

- `src/examples/<name>/` — one directory per example; `README.md` links them all.
- `src/components/`, `src/lib/`, `src/service/`, `src/settings/` — shared UI, helpers, settings panel.
- `public/libs/red5pro/` — bundled SDK build and its generated API docs; updated by SDK bumps, not edited by hand.
- `scripts/` — license-header check and packaging helpers.

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
