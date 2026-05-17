# Futuros — Kinde custom auth UI

Custom Kinde-hosted auth pages styled to match the Futuros (Foresight) brand — dark palette, gold accent, Playfair Display serif headings, DM Sans body, DM Mono labels.

Modelled on the official [`kinde-starter-kits/custom-ui-barknbite`](https://github.com/kinde-starter-kits/custom-ui-barknbite) starter and following Kinde's [custom code with CSS/HTML](https://docs.kinde.com/design/customize-with-code/customize-with-css-html/) documentation.

## Structure

```
kinde-custom-ui/
├── kinde.json                 # Kinde config — points at kindeSrc/
├── package.json               # @kinde/infrastructure + React deps
├── tsconfig.json
└── src/
    ├── root.tsx               # <html>/<head>/<body> wrapper, injects styles + Kinde required CSS/JS
    ├── styles/
    │   └── styles.ts          # Single source of truth for Kinde-widget styling
    ├── components/
    │   ├── header.tsx         # Top brand strip + switch-flow link
    │   ├── footer.tsx         # Privacy / Terms / copyright
    │   └── widget.tsx         # Auth card (brand + eyebrow + heading + Kinde widget)
    ├── layouts/
    │   └── default.tsx        # Header + main + footer chrome
    └── environment/
        └── pages/
            └── (kinde)/
                ├── (default)/page.tsx    # Catch-all auth flow
                ├── (login)/page.tsx      # /sign-in
                └── (register)/page.tsx   # /sign-up
```

## How styling is wired up

1. **`styles.ts`** exposes a single `getStyles()` function that returns a CSS string.
2. That CSS sets [Kinde's widget CSS variables](https://docs.kinde.com/design/customize-with-code/styling-with-css/) (`--kinde-button-primary-*`, `--kinde-control-text-*`, etc.) to Futuros tokens.
3. For visual details the variables don't reach, it uses Kinde's documented data-attribute selectors (`[data-kinde-control-text]`, `[data-kinde-control-label]`, etc.).
4. `root.tsx` injects the CSS into the `<head>` and loads Playfair Display / DM Sans / DM Mono from Google Fonts.

Keep `styles.ts` in sync with `frontend/src/index.css` and `frontend/src/features/auth/auth.css` if the main app's tokens change.

## Connecting to Kinde

> ⚠️ Custom UI requires a **custom domain** on your Kinde environment (e.g. `auth.futuros.io`) — it does not run on the default `*.kinde.com` domain. See the [custom domain docs](https://docs.kinde.com/build/domains/pointing-your-domain/).

1. **Push this folder to its own GitHub repo.** Kinde connects to a repo at its root — it looks for `kinde.json` at `/kinde.json`. From the `kinde-custom-ui/` directory:
   ```bash
   git init
   git add .
   git commit -m "Initial Futuros Kinde UI"
   gh repo create futuros-kinde-ui --private --source=. --remote=origin --push
   ```
2. **Install dependencies locally** for type-checking and editor IntelliSense:
   ```bash
   npm install
   ```
3. **Connect the repo in Kinde**:
   - Kinde dashboard → **Design → Custom code** → **Connect repo**
   - Authorize the Kinde GitHub app on `futuros-kinde-ui`
   - Pick the branch to sync (typically `main`)
4. **Verify** — open your custom auth URL (e.g. `https://auth.futuros.io`) and confirm the sign-in / sign-up screens render with the Futuros style.

## Iterating

- Edits land in Kinde within ~30s of pushing to the connected branch.
- The Kinde dashboard's home page shows sync status — failed builds or runtime errors surface there.
- `data-kinde-*` selectors are Kinde's stable styling hooks; prefer them over deep internal classnames, which can break between Kinde releases.

## Why a separate repo and not inside `foresight/`

Kinde's GitHub app needs to be installed on a single repository, and it reads `kinde.json` from that repo's root. Putting this inside the foresight monorepo would either:
- require giving Kinde access to the entire foresight repo (over-broad), or
- not work, because Kinde doesn't support sub-path connections.

A dedicated `futuros-kinde-ui` repo keeps the trust boundary tight and the auth UI deployable independently of the app.
