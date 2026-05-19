// Kinde widget styling — mirrors the Futuros token system from
// frontend/src/index.css + frontend/src/features/auth/auth.css.
// Single source of truth: keep this in sync with those files when
// the main app's design tokens change.
//
// Kinde exposes two extension points:
//   1. CSS custom properties (--kinde-*)        → preferred when documented
//   2. Style hook data attributes ([data-kinde-*]) → for everything else
// Docs: https://docs.kinde.com/design/customize-with-code/styling-with-css/
//       https://docs.kinde.com/design/customize-with-code/style-with-style-hooks/

const tokens = {
  // surfaces
  bg: "#08080b",
  surface1: "#0e0e12",
  surface2: "#14141a",
  surface3: "#1a1a22",
  surfaceHi: "#20202a",

  // lines
  line: "hsla(0, 0%, 100%, 0.06)",
  lineStrong: "hsla(0, 0%, 100%, 0.11)",
  lineAccent: "hsla(40, 60%, 56%, 0.30)",

  // ink
  ink: "#f0ece4",
  inkSoft: "#b8b3aa",
  inkMute: "#6e6a64",
  inkFaint: "#3e3b37",

  // gold accent
  gold: "#d4a853",
  goldSoft: "#c69839",
  goldBg: "hsla(40, 60%, 56%, 0.08)",
  goldBg2: "hsla(40, 60%, 56%, 0.14)",

  // semantic
  red: "#fb8e8e",

  // type
  serif: "'Playfair Display', 'Times New Roman', Georgia, serif",
  sans: "'DM Sans', system-ui, -apple-system, sans-serif",
  mono: "'DM Mono', 'JetBrains Mono', ui-monospace, monospace",

  // radii
  rSm: "6px",
  rMd: "10px",
  rLg: "14px",
  rPill: "999px",
} as const;

export const getStyles = (): string => `
  /* ── Kinde CSS variables (documented in styling-with-css) ─────── */
  :root {
    --kinde-base-font-family: ${tokens.sans};
    --kinde-base-font-size: 14px;
    --kinde-base-color: ${tokens.ink};
    --kinde-base-background-color: transparent;

    /* Primary button (gold "Continue") */
    --kinde-button-primary-background-color: ${tokens.gold};
    --kinde-button-primary-color: #0a0a0a;
    --kinde-button-primary-border-width: 1px;
    --kinde-button-font-size: 14px;
    --kinde-button-inline-size-is-content-width: false;

    /* Secondary / uncontained — social provider buttons */
    --kinde-button-secondary-background-color: ${tokens.surface3};
    --kinde-button-uncontained-background-color: ${tokens.surface3};

    /* Form field label spacing */
    --kinde-control-label-spacing: 8px;

    /* Validation */
    --kinde-shared-color-invalid: ${tokens.red};

    /* Text links */
    --kinde-text-link-color: ${tokens.gold};
    --kinde-text-link-color-hover: ${tokens.goldSoft};
    --kinde-text-link-color-active: ${tokens.goldSoft};
    --kinde-text-link-color-focus: ${tokens.goldSoft};
    --kinde-text-link-color-visited: ${tokens.gold};

    /* Disabled */
    --kinde-shared-color-disabled-background: ${tokens.surface2};
    --kinde-shared-color-disabled-text: ${tokens.inkMute};
  }

  /* ── Document basics ──────────────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    background: ${tokens.bg};
    color: ${tokens.ink};
    font-family: ${tokens.sans};
    font-size: 14px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    min-height: 100vh;
  }
  ::selection { background: ${tokens.goldBg2}; color: ${tokens.ink}; }
  a { color: inherit; text-decoration: none; }
  img, svg { display: block; max-width: 100%; }

  /* ── Atmosphere (radial gradients + grid) ─────────────────────── */
  .atmosphere {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .atmosphere::before,
  .atmosphere::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
  }
  .atmosphere::before {
    width: 520px;
    height: 520px;
    top: -140px;
    right: -180px;
    background: radial-gradient(circle, hsla(40, 60%, 56%, 0.08), transparent 70%);
  }
  .atmosphere::after {
    width: 420px;
    height: 420px;
    bottom: -160px;
    left: -140px;
    background: radial-gradient(circle, hsla(40, 60%, 56%, 0.05), transparent 70%);
  }
  .grid-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image:
      linear-gradient(hsla(0, 0%, 100%, 0.022) 1px, transparent 1px),
      linear-gradient(90deg, hsla(0, 0%, 100%, 0.022) 1px, transparent 1px);
    background-size: 56px 56px;
    -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent);
            mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent);
  }

  /* ── Page shell ───────────────────────────────────────────────── */
  .auth-shell {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .auth-shell main {
    flex: 1;
    display: grid;
    place-items: center;
    padding: 24px;
  }

  /* Header is intentionally empty — keep its size for visual rhythm */
  .auth-header {
    height: 64px;
    padding: 22px 28px;
    position: relative;
    z-index: 2;
  }

  /* ── Card ─────────────────────────────────────────────────────── */
  .auth-card {
    position: relative;
    z-index: 1;
    background: linear-gradient(180deg, ${tokens.surface1}, ${tokens.surface2});
    border: 1px solid ${tokens.line};
    border-radius: 16px;
    width: 100%;
    max-width: 420px;
    padding: 28px 28px 22px;
    box-shadow:
      0 1px 0 hsla(0, 0%, 100%, 0.04) inset,
      0 24px 48px -16px rgba(0, 0, 0, 0.5),
      0 0 80px hsla(40, 60%, 56%, 0.04);
    animation: auth-rise 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  }
  @keyframes auth-rise {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Brand strip inside the card — wordmark only, no F mark. */
  .auth-card .card-brand {
    display: block;
    margin-bottom: 22px;
  }
  .auth-card .card-brand-name {
    font-family: ${tokens.serif};
    font-size: 30px;
    font-weight: 400;
    color: ${tokens.gold};
    letter-spacing: -0.01em;
    line-height: 1.05;
  }
  .auth-card .card-brand-tag {
    font-family: ${tokens.mono};
    font-size: 9.5px;
    color: ${tokens.inkMute};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-top: 6px;
  }

  /* Heading area */
  .auth-card .eyebrow {
    font-family: ${tokens.mono};
    font-size: 9.5px;
    color: ${tokens.gold};
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .auth-card h1 {
    font-family: ${tokens.serif};
    font-weight: 400;
    font-size: 24px;
    line-height: 1.15;
    letter-spacing: -0.01em;
    margin-bottom: 6px;
    color: ${tokens.ink};
  }
  .auth-card .lede {
    font-size: 13px;
    color: ${tokens.inkSoft};
    line-height: 1.55;
    margin-bottom: 18px;
  }

  /* ── Kinde widget root ────────────────────────────────────────── */
  [data-kinde-root="true"] {
    color: ${tokens.ink};
    display: block;
  }

  /* ── Form fields (inputs) ─────────────────────────────────────── */
  /* Labels */
  [data-kinde-control-label],
  label[data-kinde-control-label] {
    font-family: ${tokens.mono} !important;
    font-size: 10px !important;
    color: ${tokens.inkMute} !important;
    letter-spacing: 0.06em !important;
    text-transform: uppercase !important;
    font-weight: 500 !important;
    margin-bottom: 6px !important;
    display: block !important;
  }

  /* Text/email/password inputs (covering Kinde's various selector forms) */
  [data-kinde-form-field] input,
  [data-kinde-form-field-variant] input,
  [data-kinde-control-select-text],
  [data-kinde-control-text],
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="tel"] {
    background: ${tokens.surface3} !important;
    border: 1px solid ${tokens.line} !important;
    color: ${tokens.ink} !important;
    font-family: ${tokens.mono} !important;
    font-size: 13.5px !important;
    border-radius: ${tokens.rMd} !important;
    padding: 11px 14px !important;
    transition: border-color 180ms, box-shadow 180ms;
  }
  [data-kinde-form-field] input::placeholder,
  input::placeholder {
    font-family: ${tokens.sans} !important;
    color: ${tokens.inkMute} !important;
    opacity: 0.7;
  }
  [data-kinde-form-field] input:hover:not(:focus),
  input[type="text"]:hover:not(:focus),
  input[type="email"]:hover:not(:focus),
  input[type="password"]:hover:not(:focus) {
    border-color: ${tokens.lineStrong} !important;
  }
  [data-kinde-form-field] input:focus,
  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus {
    border-color: ${tokens.lineAccent} !important;
    box-shadow: 0 0 0 3px hsla(40, 60%, 56%, 0.08) !important;
    outline: none;
  }
  [data-kinde-form-field] input[aria-invalid="true"],
  input[aria-invalid="true"] {
    border-color: hsla(0, 80%, 70%, 0.45) !important;
    box-shadow: 0 0 0 3px hsla(0, 80%, 70%, 0.06) !important;
  }

  /* Spacing between form fields and between field and submit button. */
  [data-kinde-form-field],
  [data-kinde-form-field-variant] {
    display: block !important;
    margin-bottom: 14px !important;
  }

  /* ── Buttons ──────────────────────────────────────────────────── */
  /* DOM verified by browser inspection on auth-dev.futuros.io:
     - Primary submit: button.kinde-button-variant-primary
     - Social buttons: button.kinde-button-variant-secondary
       containing svg.kinde-icon (NOT <img>)
     - Container:     ul.kinde-layout-auth-buttons (already display: grid,
                      one implicit column → vertical stacking)
     - Items:         li[data-kinde-layout-auth-buttons-item="true"]
                      (display: list-item, full-width — the actual cause
                      of vertical stacking even though parent is grid). */

  /* Primary submit button — gold "Continue". */
  .kinde-button-variant-primary,
  [data-kinde-button][data-kinde-button-variant="primary"] {
    background: ${tokens.gold} !important;
    color: #0a0a0a !important;
    border: 1px solid ${tokens.goldSoft} !important;
    border-radius: ${tokens.rMd} !important;
    font-family: ${tokens.sans} !important;
    font-weight: 600 !important;
    font-size: 13.5px !important;
    letter-spacing: 0.005em !important;
    padding: 11px 22px !important;
    cursor: pointer;
    transition: opacity 180ms, transform 120ms cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 200ms !important;
    box-shadow: 0 1px 0 hsla(0, 0%, 100%, 0.2) inset !important;
    width: 100% !important;
    margin-top: 4px !important;
  }
  .kinde-button-variant-primary:hover,
  [data-kinde-button][data-kinde-button-variant="primary"]:hover {
    background: ${tokens.gold} !important;
    color: #0a0a0a !important;
    border-color: ${tokens.goldSoft} !important;
    opacity: 0.94 !important;
    box-shadow:
      0 1px 0 hsla(0, 0%, 100%, 0.2) inset,
      0 0 32px hsla(40, 60%, 56%, 0.22) !important;
  }
  .kinde-button-variant-primary:active {
    transform: scale(0.985) !important;
  }
  .kinde-button-variant-primary:focus-visible {
    outline: 2px solid ${tokens.goldSoft} !important;
    outline-offset: 2px !important;
  }

  /* ── Social / OAuth provider buttons ──────────────────────────── */
  /* The buttons themselves: dark surface, icon-only (text hidden). */
  .kinde-button-variant-secondary,
  [data-kinde-button][data-kinde-button-variant="secondary"] {
    background: ${tokens.surface3} !important;
    color: ${tokens.ink} !important;
    border: 1px solid ${tokens.line} !important;
    border-radius: ${tokens.rMd} !important;
    cursor: pointer;
    transition: background 150ms, border-color 150ms !important;
    /* icon-only sizing — fill the grid cell, ~44px tall */
    width: 100% !important;
    padding: 10px !important;
    min-height: 44px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0 !important;
    /* hide the "Continue with X" text, keep the inline SVG visible */
    font-size: 0 !important;
    text-indent: -9999px;
    overflow: hidden;
  }
  .kinde-button-variant-secondary:hover,
  [data-kinde-button][data-kinde-button-variant="secondary"]:hover {
    background: ${tokens.surfaceHi} !important;
    color: ${tokens.ink} !important;
    border-color: ${tokens.lineStrong} !important;
  }
  /* Restore the SVG icon (we killed font-size on the button). */
  .kinde-button-variant-secondary .kinde-icon,
  [data-kinde-button][data-kinde-button-variant="secondary"] svg {
    text-indent: 0 !important;
    font-size: initial !important;
    width: 20px !important;
    height: 20px !important;
    flex-shrink: 0 !important;
  }

  /* ── Social buttons container ─────────────────────────────────── */
  /* The container is already display: grid. Give it explicit columns
     so all providers sit side-by-side (auto-fit lets it gracefully
     wrap to two rows if you add many providers later). The <li>s
     drop their list-item semantics and stretch into their grid cell. */
  .kinde-layout-auth-buttons,
  ul[data-kinde-layout-auth-buttons="true"] {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(56px, 1fr)) !important;
    gap: 8px !important;
    list-style: none !important;
    padding: 0 !important;
    margin: 0 0 4px 0 !important;
    width: 100% !important;
  }
  li[data-kinde-layout-auth-buttons-item="true"] {
    list-style: none !important;
    display: block !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Divider ("OR") between social and form — extra breathing room. */
  [data-kinde-divider],
  [data-kinde-separator] {
    color: ${tokens.inkMute} !important;
    font-family: ${tokens.mono} !important;
    font-size: 10px !important;
    letter-spacing: 0.14em !important;
    text-transform: uppercase !important;
    margin: 18px 0 !important;
  }

  /* ── Form-level spacing ──────────────────────────────────────── */
  [data-kinde-fallback-action],
  [data-kinde-text-link]:not([data-kinde-form-field] [data-kinde-text-link]) {
    font-family: ${tokens.mono} !important;
    font-size: 11px !important;
    letter-spacing: 0.04em !important;
    color: ${tokens.inkMute} !important;
  }

  /* "No account? Create one" — sits between submit and Powered by Kinde */
  [data-kinde-fallback-action] {
    margin-top: 20px !important;
    margin-bottom: 0 !important;
    text-align: center;
  }
  [data-kinde-fallback-action] a,
  [data-kinde-fallback-action] [data-kinde-text-link] {
    color: ${tokens.gold} !important;
    margin-left: 4px;
  }
  [data-kinde-fallback-action] a:hover,
  [data-kinde-fallback-action] [data-kinde-text-link]:hover {
    color: ${tokens.goldSoft} !important;
  }

  /* Powered by Kinde — pushed well clear of "Create one" so the two
     pieces of microcopy don't crowd each other. */
  [data-kinde-built-with],
  [data-kinde-powered-by] {
    margin-top: 36px !important;
    padding-top: 16px !important;
    border-top: 1px dotted ${tokens.line} !important;
    opacity: 0.45;
    font-family: ${tokens.mono} !important;
    font-size: 10px !important;
    letter-spacing: 0.06em !important;
    text-align: center;
    display: block;
  }

  [data-kinde-form-footer],
  [data-kinde-actions] {
    margin-top: 14px !important;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* OTP / verification code input */
  [data-kinde-control-otp] input {
    background: ${tokens.surface3} !important;
    border: 1px solid ${tokens.line} !important;
    color: ${tokens.ink} !important;
    font-family: ${tokens.mono} !important;
    font-size: 18px !important;
    letter-spacing: 0.2em !important;
    text-align: center !important;
    border-radius: ${tokens.rMd} !important;
  }
  [data-kinde-control-otp] input:focus {
    border-color: ${tokens.lineAccent} !important;
    box-shadow: 0 0 0 3px hsla(40, 60%, 56%, 0.08) !important;
    outline: none;
  }

  /* Error / hint messages */
  [data-kinde-error],
  [data-kinde-hint],
  [data-kinde-control-associated-text] {
    font-family: ${tokens.mono} !important;
    font-size: 11px !important;
    letter-spacing: 0.02em !important;
    margin-top: 6px !important;
  }
  [data-kinde-error],
  [data-kinde-control-associated-text][data-kinde-control-associated-text-variant="invalid"] {
    color: ${tokens.red} !important;
  }
  [data-kinde-hint] { color: ${tokens.inkMute} !important; }

  /* ── Auth footer (outside the card) ───────────────────────────── */
  .auth-footer {
    padding: 26px 28px 22px;
    text-align: center;
    position: relative;
    z-index: 1;
  }
  .auth-footer .footer-note {
    font-family: ${tokens.mono};
    font-size: 9.5px;
    color: ${tokens.inkMute};
    opacity: 0.5;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .auth-footer .footer-links {
    margin-top: 12px;
    font-family: ${tokens.mono};
    font-size: 10px;
    color: ${tokens.inkMute};
    opacity: 0.7;
    letter-spacing: 0.06em;
  }
  .auth-footer .footer-links a {
    color: ${tokens.inkMute};
    border-bottom: 1px solid rgba(110, 106, 100, 0.3);
    transition: color 200ms, border-color 200ms;
    padding-bottom: 1px;
  }
  .auth-footer .footer-links a:hover {
    color: ${tokens.gold};
    border-bottom-color: rgba(212, 168, 83, 0.5);
  }
  .auth-footer .footer-links .sep {
    margin: 0 10px;
    opacity: 0.4;
  }

  /* ── Logged-out page ──────────────────────────────────────────── */
  .logged-out-card { text-align: center; }
  .logged-out-card .check-mark {
    width: 56px;
    height: 56px;
    margin: 0 auto 22px;
    border-radius: 50%;
    background: ${tokens.goldBg};
    border: 1px solid ${tokens.lineAccent};
    display: grid;
    place-items: center;
    color: ${tokens.gold};
    font-family: ${tokens.serif};
    font-size: 26px;
    line-height: 1;
  }
  .logged-out-card .actions {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .logged-out-card .actions a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 13px 22px;
    border-radius: ${tokens.rMd};
    font-family: ${tokens.sans};
    font-size: 14px;
    font-weight: 600;
    background: ${tokens.gold};
    color: #0a0a0a;
    border: 1px solid ${tokens.goldSoft};
    box-shadow: 0 1px 0 hsla(0, 0%, 100%, 0.2) inset;
    transition: box-shadow 200ms, opacity 180ms;
  }
  .logged-out-card .actions a:hover {
    opacity: 0.94;
    box-shadow:
      0 1px 0 hsla(0, 0%, 100%, 0.2) inset,
      0 0 32px hsla(40, 60%, 56%, 0.22);
  }
  .logged-out-card .actions .secondary {
    background: transparent;
    color: ${tokens.inkSoft};
    border: 1px solid ${tokens.line};
    font-weight: 500;
    box-shadow: none;
  }
  .logged-out-card .actions .secondary:hover {
    background: hsla(0, 0%, 100%, 0.02);
    border-color: ${tokens.lineStrong};
    color: ${tokens.ink};
    box-shadow: none;
  }

  /* ── Billing / plan-selection screens ────────────────────────────
     The (choose_plan), (collect_payment_details), and
     (subscription_success) pages render in the same auth flow as
     register/login (data-kinde-root="true") and so flow through
     (default)/page.tsx into our .auth-card wrapper. The widget DOM
     inside the card uses the same kinde-* / data-kinde-* hook
     namespace as the auth widgets, but with different elements
     (kinde-layout-plans, kinde-card, kinde-heading, kinde-price, …)
     none of which our auth styles cover. This block fills the gap.

     DOM verified on auth-dev.futuros.io during a fresh registration
     flow on 2026-05-18 after enabling pricing-table-in-signup at
     Settings → Environment → Billing. */

  /* Widen the auth-card when it holds a plans grid. Two plans need
     ~720px to lay out comfortably side-by-side; the upper bound is
     viewport-bounded by the existing width:100% / padding on the
     shell, so this still works on phones (cards just get tighter
     rather than stacking — D requirement: always side-by-side). */
  .auth-card:has(.kinde-layout-plans),
  .auth-card:has([data-kinde-layout-plans="true"]) {
    max-width: 720px;
  }

  /* Plans grid. Kinde gives this its own flex/grid by default but
     we set it explicitly so the side-by-side guarantee doesn't
     depend on Kinde's CSS. */
  .kinde-layout-plans,
  [data-kinde-layout-plans="true"] {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 14px !important;
    margin-top: 6px !important;
  }

  /* Single-plan special case — when the plans grid contains exactly
     one .kinde-card (e.g. only "Pro" is published; the Free / trial
     tier was removed), the default 2-col grid leaves an empty cell
     and the lone card sits awkwardly in the left half of a 720px
     auth-card. Override both axes:
       1. Narrow the auth-card back to its login-width (420px) so the
          whitespace around the single card matches what the user
          already knows from sign-in / sign-up.
       2. Collapse the grid to one column so the card fills the
          narrowed wrapper end-to-end.
     Uses :has(...:only-child) — supported in all evergreen browsers
     since 2023, which is the same support floor as the rest of this
     stylesheet's :has() usage above. */
  .auth-card:has(.kinde-layout-plans > .kinde-card:only-child),
  .auth-card:has([data-kinde-layout-plans="true"] > [data-kinde-card="true"]:only-child) {
    max-width: 420px;
  }
  .auth-card:has(.kinde-layout-plans > .kinde-card:only-child) .kinde-layout-plans,
  .auth-card:has([data-kinde-layout-plans="true"] > [data-kinde-card="true"]:only-child) [data-kinde-layout-plans="true"] {
    grid-template-columns: 1fr !important;
  }

  /* Per-plan card — Kinde's own .kinde-card, NOT our outer .auth-card. */
  .kinde-layout-plans .kinde-card,
  [data-kinde-layout-plans="true"] [data-kinde-card="true"] {
    background: ${tokens.surface3};
    border: 1px solid ${tokens.line};
    border-radius: ${tokens.rMd};
    padding: 20px 18px 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: border-color 180ms, box-shadow 180ms;
  }
  .kinde-layout-plans .kinde-card:hover,
  [data-kinde-layout-plans="true"] [data-kinde-card="true"]:hover {
    border-color: ${tokens.lineStrong};
  }

  /* Plan description ("- 1 user · 10 reports/month"). */
  .kinde-layout-plans [data-plan-details-card-description="true"] {
    font-size: 13px;
    color: ${tokens.inkSoft};
    line-height: 1.5;
    margin: 0;
  }

  /* ── Badge slot ────────────────────────────────────────────────
     Every plan card carries a [data-plan-details-card-placeholder]
     div BEFORE the plan-name heading. On plans configured with a
     marketing badge (e.g. "Free trial for 2 days") Kinde injects a
     .kinde-badge here; on plans without one the div is empty. Give
     the slot a fixed min-height so all cards in a side-by-side row
     align: when one plan has a badge and another doesn't, the
     non-badged plan keeps the same vertical space reserved so its
     heading / price / CTA line up with the badged plan's. */
  .kinde-layout-plans [data-plan-details-card-placeholder="true"] {
    min-height: 26px;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }

  /* The badge itself — small mono uppercase pill in the gold accent
     palette. Targets both the class and the data-attribute so it works
     even if Kinde stops emitting one of them. */
  .kinde-badge,
  [data-kinde-badge="true"] {
    display: inline-flex;
    align-items: center;
    padding: 3px 9px;
    background: ${tokens.goldBg};
    border: 1px solid ${tokens.lineAccent};
    border-radius: ${tokens.rPill};
    color: ${tokens.gold};
    font-family: ${tokens.mono};
    font-size: 9.5px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1.2;
  }
  .kinde-badge-text,
  [data-kinde-badge-text="true"] {
    font-family: inherit;
    color: inherit;
    letter-spacing: inherit;
  }

  /* ── Kinde "heading" elements ──────────────────────────────────
     Used for plan names (variant-large), prices (variant-x-large),
     and the "Features" section label (variant-x-small). Default
     Kinde leaves color/font unset so they're invisible on our dark
     surfaces — define every variant explicitly. Scoped to
     .kinde-layout-widget so it doesn't reach into the auth widget
     (which uses our own h1 from widget.tsx, styled separately). */
  .kinde-layout-widget .kinde-heading,
  .kinde-layout-widget [data-kinde-heading="true"] {
    color: ${tokens.ink};
    font-weight: 400;
    letter-spacing: -0.01em;
    line-height: 1.15;
    margin: 0;
  }
  .kinde-layout-widget .kinde-heading-variant-large,
  .kinde-layout-widget [data-kinde-heading-variant="large"] {
    font-family: ${tokens.serif};
    font-size: 22px;
    color: ${tokens.gold};
  }
  .kinde-layout-widget .kinde-heading-variant-x-large,
  .kinde-layout-widget [data-kinde-heading-variant="x-large"] {
    font-family: ${tokens.serif};
    font-size: 30px;
    color: ${tokens.ink};
  }
  .kinde-layout-widget .kinde-heading-variant-x-small,
  .kinde-layout-widget [data-kinde-heading-variant="x-small"] {
    font-family: ${tokens.mono};
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${tokens.inkMute};
    font-weight: 500;
  }

  /* Price block (€99 EUR / month). */
  .kinde-price,
  [data-kinde-price="true"] {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin: 0;
  }
  .kinde-price-meta,
  [data-kinde-price-meta="true"] {
    font-family: ${tokens.mono};
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${tokens.inkMute};
  }

  /* Subtle divider between CTA and features list. */
  .kinde-card-element-divider,
  [data-kinde-card-element-divider="true"] {
    height: 1px;
    background: ${tokens.line};
    margin: 4px 0;
    border: 0;
  }

  /* Features list. Same check-icon look we already apply to
     .kinde-icon, but tightened up for in-card use. */
  .kinde-layout-plans .kinde-list,
  [data-kinde-layout-plans="true"] [data-kinde-list="true"] {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .kinde-layout-plans li[data-kinde-list-item="true"] {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    color: ${tokens.inkSoft};
    font-size: 12.5px;
    line-height: 1.5;
  }
  .kinde-layout-plans li[data-kinde-list-item="true"] svg.kinde-icon,
  .kinde-layout-plans li[data-kinde-list-item="true"] [data-kinde-icon="true"] {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    color: ${tokens.gold};
    margin-top: 3px;
  }

  /* ── "Choose plan" CTA ─────────────────────────────────────────
     The plan buttons use .kinde-button-variant-secondary (same as
     social auth buttons), but distinguished by
     .kinde-button-is-content-width. Our existing social-button rule
     hides text (font-size: 0 + text-indent: -9999px) — override that
     for content-width variants so the "Choose plan" label is
     visible, and restyle to look like a plan CTA. */
  .kinde-button-is-content-width.kinde-button-variant-secondary,
  [data-kinde-button-is-content-width="true"][data-kinde-button-variant="secondary"] {
    font-size: 13.5px !important;
    text-indent: 0 !important;
    width: 100% !important;
    padding: 11px 16px !important;
    font-family: ${tokens.sans} !important;
    font-weight: 600 !important;
    letter-spacing: 0.005em !important;
    background: ${tokens.surfaceHi} !important;
    border: 1px solid ${tokens.lineStrong} !important;
    border-radius: ${tokens.rMd} !important;
    color: ${tokens.ink} !important;
    cursor: pointer;
    transition: background 160ms, border-color 160ms, color 160ms, box-shadow 200ms !important;
    overflow: visible !important;
    text-transform: none !important;
  }
  .kinde-button-is-content-width.kinde-button-variant-secondary:hover,
  [data-kinde-button-is-content-width="true"][data-kinde-button-variant="secondary"]:hover {
    background: ${tokens.gold} !important;
    border-color: ${tokens.goldSoft} !important;
    color: #0a0a0a !important;
    box-shadow:
      0 1px 0 hsla(0, 0%, 100%, 0.2) inset,
      0 0 32px hsla(40, 60%, 56%, 0.18) !important;
  }
  /* The text span inherits font-size: 0 from the outer button rule
     applied to all .kinde-button-variant-secondary. Re-assert
     inherit so the override above takes effect for plan buttons. */
  .kinde-button-is-content-width .kinde-button-text,
  [data-kinde-button-is-content-width="true"] [data-kinde-button-text="true"] {
    font-size: inherit !important;
    text-indent: 0 !important;
    color: inherit !important;
  }

  /* ── Subscription payment (collect_payment_details) ────────────
     The Stripe Payment Element renders its card-number / expiry /
     CVC / country fields and the Link "Save my information" opt-in
     inside a Stripe-controlled iframe for PCI compliance. CSS from
     this stylesheet doesn't cross the iframe boundary — we can't
     reach .p-FieldLabel / .p-Input / etc. Stripe defaults to a
     LIGHT theme inside the iframe, and Kinde's Custom UI exposes
     no hook to pass through an appearance config to Stripe.js
     (confirmed against docs at
     docs.kinde.com/design/customize-with-code/styling-with-css/).

     Painting the surrounding chrome dark left a half-and-half page:
     light Stripe iframe glued to a dark-themed wrapper, plus the
     selected-plan accent pill defaulting to Kinde's light pill on
     our dark card. Both readability (dark text on dark body where
     Stripe's transparent iframe lets the body show through) and
     visual coherence broke.

     Pragmatic fix: opt this single page out of our entire dark
     theme. Scope with :has(.kinde-stripe-payment-form) on body so
     login / signup / choose_plan / subscription_success stay dark
     unchanged. The rules below hide the atmospherics, flip the body
     and auth-card to white, and let text fall to a near-black so
     the Stripe iframe's light defaults read coherently with their
     surroundings. The Futuros wordmark stays gold (works on white)
     and the gold Continue button stays gold (also fine on white).

     Revisit if Kinde ever ships a Stripe appearance pass-through:
     at that point flip everything BACK to dark and re-theme the
     iframe to match. */
  body:has(.kinde-stripe-payment-form) {
    background: #ffffff !important;
    color: #18181b !important;
  }
  body:has(.kinde-stripe-payment-form) .atmosphere,
  body:has(.kinde-stripe-payment-form) .grid-overlay {
    display: none !important;
  }
  body:has(.kinde-stripe-payment-form) .auth-card {
    background: #ffffff !important;
    border: 1px solid #e4e4e7 !important;
    color: #18181b !important;
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.05),
      0 4px 12px rgba(0, 0, 0, 0.03) !important;
  }
  body:has(.kinde-stripe-payment-form) .auth-card h1,
  body:has(.kinde-stripe-payment-form) .auth-card h2,
  body:has(.kinde-stripe-payment-form) .auth-card h3 {
    color: #18181b !important;
  }
  /* Card-level brand chip — wordmark stays gold (legible on white);
     tagline drops to a neutral grey. */
  body:has(.kinde-stripe-payment-form) .card-brand-tag {
    color: #71717a !important;
  }
  /* Footer note + privacy links — soft grey on white. */
  body:has(.kinde-stripe-payment-form) .auth-footer .footer-note,
  body:has(.kinde-stripe-payment-form) .auth-footer .footer-links,
  body:has(.kinde-stripe-payment-form) .auth-footer .footer-links a {
    color: #71717a !important;
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
  body:has(.kinde-stripe-payment-form) .auth-footer .footer-links a:hover {
    color: ${tokens.gold} !important;
  }

  /* Vertical rhythm — Kinde's bare defaults stack the page's section
     headings (Subscription payment, Selected plan, Pro, Credit card
     details) flush against each other with no breathing room. Add
     margins back so each section reads as its own block. Also pad
     the .kinde-card-is-accent-color "Selected plan" pill which is
     otherwise a single-line strip with the price text squeezed
     against its top edge. */
  body:has(.kinde-stripe-payment-form) .auth-card h1 {
    margin-bottom: 24px !important;
  }
  body:has(.kinde-stripe-payment-form) .kinde-layout-widget .kinde-heading-variant-medium,
  body:has(.kinde-stripe-payment-form)
    .kinde-layout-widget
    [data-kinde-heading-variant="medium"] {
    margin: 20px 0 10px !important;
    font-weight: 500;
  }
  body:has(.kinde-stripe-payment-form) .kinde-card-is-accent-color,
  body:has(.kinde-stripe-payment-form) [data-kinde-card-is-accent-color="true"] {
    padding: 14px 16px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 6px !important;
    margin-bottom: 8px !important;
  }
  /* Inside the accent pill, the "Pro" heading defaulted to variant-
     medium which we just gave a big top margin above — undo that for
     this in-pill usage so it sits flush at the top of the pill, not
     halfway down. */
  body:has(.kinde-stripe-payment-form) .kinde-card-is-accent-color .kinde-heading-variant-medium,
  body:has(.kinde-stripe-payment-form)
    [data-kinde-card-is-accent-color="true"]
    [data-kinde-heading-variant="medium"] {
    margin: 0 !important;
  }
  /* Stripe form wrapper — give it room above "Credit card details"
     so the heading + lock-icon + iframe block sits clear of the
     accent pill above. */
  body:has(.kinde-stripe-payment-form) .kinde-stripe-payment-form {
    margin-top: 8px !important;
  }
  /* Primary "Subscribe and pay now" button — bit of room above so it
     doesn't sit right under the Stripe iframe. */
  body:has(.kinde-stripe-payment-form) .kinde-stripe-payment-form .kinde-button-variant-primary {
    margin-top: 18px !important;
  }

  /* Alert banners (Stripe payment errors, noscript warning, etc.). */
  .kinde-alert-banner,
  [data-kinde-alert-banner="true"] {
    display: flex;
    gap: 10px;
    padding: 10px 12px;
    border-radius: ${tokens.rMd};
    border: 1px solid ${tokens.line};
    background: ${tokens.surface2};
    margin: 10px 0;
    align-items: flex-start;
  }
  .kinde-alert-banner--variant-error {
    background: hsla(0, 80%, 70%, 0.06);
    border-color: hsla(0, 80%, 70%, 0.25);
  }
  .kinde-alert-banner-icon,
  [data-kinde-alert-banner-icon="true"] {
    flex-shrink: 0;
    color: ${tokens.red};
    display: inline-flex;
    align-items: center;
    margin-top: 1px;
  }
  .kinde-alert-banner-icon .kinde-icon,
  [data-kinde-alert-banner-icon="true"] [data-kinde-icon="true"] {
    width: 18px;
    height: 18px;
  }
  .kinde-alert-banner-text,
  [data-kinde-alert-banner-text="true"] {
    margin: 0;
    font-size: 12.5px;
    line-height: 1.45;
    color: ${tokens.inkSoft};
  }

  /* ── "Powered by Kinde" footer inside the widget ──────────────── */
  .kinde-layout-widget-branding,
  [data-kinde-layout-widget-branding="true"] {
    margin-top: 22px;
    padding-top: 14px;
    border-top: 1px dotted ${tokens.line};
    text-align: center;
    opacity: 0.4;
  }
  .kinde-layout-widget-branding .kinde-branding {
    font-family: ${tokens.mono};
    font-size: 10px;
    color: ${tokens.inkMute};
    letter-spacing: 0.04em;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin: 0;
  }
  .kinde-layout-widget-branding .kinde-branding figcaption {
    display: inline;
  }
  .kinde-layout-widget-branding a {
    display: inline-flex;
    align-items: center;
    color: ${tokens.inkMute};
  }
  .kinde-layout-widget-branding svg {
    width: 46px;
    height: auto;
    color: ${tokens.inkMute};
  }

  /* ── Responsive ──────────────────────────────────────────────── */
  @media (max-width: 480px) {
    .auth-shell main { padding: 16px; }
    .auth-card { padding: 28px 22px 24px; }
    .auth-card h1 { font-size: 24px; }
    .auth-header { padding: 18px 18px; height: 56px; }
    /* Plan cards stay side-by-side per the requirement, but tighten
       padding so they fit. If two plans become unreadable at this
       width we can revisit. */
    .kinde-layout-plans .kinde-card,
    [data-kinde-layout-plans="true"] [data-kinde-card="true"] {
      padding: 14px 12px;
    }
    .kinde-layout-plans {
      gap: 8px !important;
    }
  }
`;
