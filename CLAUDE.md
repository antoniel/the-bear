# the-bear — agent notes

Hackathon workspace for **bitcomplete · Teamweek**.

- **Windows 95 aesthetic** via [React95](https://react95.io) (`@react95/core@^9.8.0`).
- All user-facing UI copy is **English**.

## What this repo is

- **the-bear**: internal demo/playground for Teamweek
- **Design system**: React95 component showcase (`/design-system`)
- **Applets**: small standalone apps in retro shell (`/applets` index, individual routes per applet)
- **Stack**: Next.js 15 (Turbopack in dev), React 19, TypeScript

The starter shipped with shadcn/ui demos under `src/components/*-demo.tsx` and `src/registry/`. **Product UI ignores shadcn** — use React95 only for pages we own.

## Routes

| Route            | Purpose                                                                          |
| ---------------- | -------------------------------------------------------------------------------- |
| `/`              | Win95 home with intro + clickable previews (Design System, Applets)              |
| `/design-system` | React95 component showcase                                                       |
| `/applets`       | Applet launcher (`Applets.exe` window)                                           |
| `/tony-canvas`   | **Teamweek Messenger** — Slack-style messaging mock (bitcomplete Teamweek theme) |

## Project layout

```
src/
├── app/
│   ├── layout.tsx          # Win95AppShell + react95-styles globally
│   ├── react95-styles.ts   # import win95.css only (not GlobalStyle)
│   ├── page.tsx            # home
│   ├── design-system/
│   ├── applets/
│   └── tony-canvas/        # thin route → applet component
├── components/
│   ├── win95/              # shared shell: Desktop, Win95Window, taskbar nav
│   └── applets/
│       ├── messaging-app/  # data + UI
│       └── react95-showcase/
└── lib/
    ├── react95.ts          # safe subpath re-exports (see gotchas)
    └── applets.ts          # applet registry for /applets page
```

**Conventions**

- **Routes stay thin** — import from `@/components/applets/...` or `@/components/win95/...`
- **Applet code** lives under `src/components/applets/<name>/` with optional `*.data.ts` for mock content
- **Register new applets** in `src/lib/applets.ts` and add `src/app/<route>/page.tsx`
- **Import components** from `@/lib/react95`, never from `@react95/core` barrel

## React95 integration (lessons learned)

### Always use subpath imports

Re-export through `src/lib/react95.ts` and import from `@/lib/react95`.

Do **not** import `@react95/core` barrel — Turbopack can leave exports undefined and pulls broken icon dependencies.

### Theme / CSS

```ts
// src/app/react95-styles.ts
import '@react95/core/themes/win95.css';
```

- Use **`win95.css` only** — `@react95/core` `GlobalStyle` embeds huge data URLs and breaks Next's CSS minimizer in production builds.
- Root `layout.tsx` imports `@/app/react95-styles` once for the whole app.

### Components intentionally excluded from `@/lib/react95`

| Export                              | Reason                                                                                        |
| ----------------------------------- | --------------------------------------------------------------------------------------------- |
| `Range`                             | Generated CSS uses `.class::hover` — **Turbopack/Lightning CSS rejects it** (500 in dev)      |
| `Alert`, `TaskBar`, `Tree`, `Video` | Depend on `@react95/icons@2.5.0`, which publishes broken `exports` (points to missing `src/`) |

`@react95/icons` is installed but not reliably resolvable; do not reexport those components until the package is fixed or shimmed.

### Win95 shell pattern

- `Win95AppShell` — teal desktop (`#008080`) + taskbar nav on every page
- `Win95Window` — `TitleBar` + inset/outset frame shadow
- Applet pages: padding wrapper only — **no second teal background** (shell already provides it)
- Selection/highlight color: `#000080` (classic Win95 blue)

### Helper scripts (optional, not in package.json)

- `scripts/link-react95.mjs` — symlinks `esm`/`cjs`/`types` if package layout is wrong
- `scripts/patch-react95-css.mjs` — patches SVG data URLs in `.vanilla.css` for Turbopack

Run manually if React95 package layout causes resolve errors.

## Dev troubleshooting

- **`ENOENT` on `.next/static/development/_buildManifest.js.tmp.*`** — usually stale `.next` or rapid `next.config` restarts; stop dev server, `rm -rf .next`, restart.
- **Type errors referencing deleted routes** — same fix: `rm -rf .next`.
- **Workspace root warning** — parent dir has `bun.lockb`; harmless locally or set `turbopack.root` / `outputFileTracingRoot` in `next.config.ts` if needed.
- **Build while dev server is running** — can corrupt `.next`; stop dev before `npm run build`.

## Commands

```bash
npm run dev          # next dev --turbopack
npm run build
npm run type-check
npm run lint
```

Node **22.19.0** (see `.nvmrc`).

## Adding an applet (checklist)

1. Create `src/components/applets/my-applet/` (component + optional `.data.ts`)
2. Export from `index.ts`
3. Add entry to `src/lib/applets.ts`
4. Add `src/app/my-route/page.tsx` importing the applet
5. Use `@/lib/react95` components; wrap content in `Win95Window` if it should look like a desktop app
6. Keep mock copy in English; Teamweek/bitcomplete tone is fine for hackathon demos

## Messaging applet notes

- Mock Slack-style UI with channels + DMs; data in `messaging-app.data.ts`
- Workspace label: `bitcomplete · Teamweek`
- Do not import `Range` into the messaging app (see above)
