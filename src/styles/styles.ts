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
    border-radius: 18px;
    width: 100%;
    max-width: 440px;
    padding: 36px 36px 32px;
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

  /* Brand strip inside the card */
  .auth-card .card-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }
  .auth-card .card-brand-mark {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: ${tokens.surface3};
    border: 1px solid ${tokens.line};
    display: grid;
    place-items: center;
    font-family: ${tokens.serif};
    font-weight: 900;
    font-size: 26px;
    line-height: 1;
    color: ${tokens.gold};
  }
  .auth-card .card-brand-name {
    font-family: ${tokens.serif};
    font-size: 22px;
    color: ${tokens.gold};
    letter-spacing: -0.005em;
    line-height: 1.15;
  }
  .auth-card .card-brand-tag {
    font-family: ${tokens.mono};
    font-size: 9.5px;
    color: ${tokens.inkMute};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-top: 4px;
  }

  /* Heading area */
  .auth-card .eyebrow {
    font-family: ${tokens.mono};
    font-size: 10px;
    color: ${tokens.gold};
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .auth-card h1 {
    font-family: ${tokens.serif};
    font-weight: 400;
    font-size: 28px;
    line-height: 1.15;
    letter-spacing: -0.01em;
    margin-bottom: 8px;
    color: ${tokens.ink};
  }
  .auth-card .lede {
    font-size: 13.5px;
    color: ${tokens.inkSoft};
    line-height: 1.6;
    margin-bottom: 24px;
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
    font-size: 10.5px !important;
    color: ${tokens.inkMute} !important;
    letter-spacing: 0.06em !important;
    text-transform: uppercase !important;
    font-weight: 500 !important;
    margin-bottom: 8px !important;
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
    font-size: 14px !important;
    border-radius: ${tokens.rMd} !important;
    padding: 13px 14px !important;
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

  /* Spacing between form fields and between field and submit button.
     Kinde's form is a vertical stack — apply margin to every form field
     wrapper so there's air between the email input and the gold button. */
  [data-kinde-form-field],
  [data-kinde-form-field-variant] {
    display: block !important;
    margin-bottom: 18px !important;
  }

  /* ── Buttons ──────────────────────────────────────────────────── */
  /* Primary submit button — gold, with strong hover that doesn't fade.
     !important is needed because Kinde generates inline hover styles that
     reduce opacity / shift background on hover, which fights the variable. */
  [data-kinde-button][data-kinde-button-variant="primary"],
  button[type="submit"][data-kinde-button],
  button[type="submit"] {
    background: ${tokens.gold} !important;
    color: #0a0a0a !important;
    border: 1px solid ${tokens.goldSoft} !important;
    border-radius: ${tokens.rMd} !important;
    font-family: ${tokens.sans} !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    letter-spacing: 0.005em !important;
    padding: 13px 22px !important;
    cursor: pointer;
    transition: opacity 180ms, transform 120ms cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 200ms !important;
    box-shadow: 0 1px 0 hsla(0, 0%, 100%, 0.2) inset !important;
    width: 100% !important;
    margin-top: 4px !important;
  }
  [data-kinde-button][data-kinde-button-variant="primary"]:hover,
  button[type="submit"][data-kinde-button]:hover,
  button[type="submit"]:hover {
    background: ${tokens.gold} !important;
    color: #0a0a0a !important;
    border-color: ${tokens.goldSoft} !important;
    opacity: 0.94 !important;
    box-shadow:
      0 1px 0 hsla(0, 0%, 100%, 0.2) inset,
      0 0 32px hsla(40, 60%, 56%, 0.22) !important;
  }
  [data-kinde-button][data-kinde-button-variant="primary"]:active,
  button[type="submit"]:active {
    transform: scale(0.985) !important;
  }
  [data-kinde-button][data-kinde-button-variant="primary"]:focus-visible,
  button[type="submit"]:focus-visible {
    outline: 2px solid ${tokens.goldSoft} !important;
    outline-offset: 2px !important;
  }

  /* Social / OAuth provider buttons. Kinde renders these as either the
     "secondary" or "uncontained" variant; cover both. Override Kinde's
     default light hover so they stay on-theme. */
  [data-kinde-button][data-kinde-button-variant="secondary"],
  [data-kinde-button][data-kinde-button-variant="uncontained"],
  [data-kinde-button][data-kinde-button-variant="social"] {
    background: ${tokens.surface3} !important;
    color: ${tokens.ink} !important;
    border: 1px solid ${tokens.line} !important;
    border-radius: ${tokens.rMd} !important;
    font-family: ${tokens.sans} !important;
    font-weight: 500 !important;
    font-size: 13px !important;
    padding: 11px 14px !important;
    cursor: pointer;
    transition: background 150ms, border-color 150ms !important;
    width: 100% !important;
  }
  [data-kinde-button][data-kinde-button-variant="secondary"]:hover,
  [data-kinde-button][data-kinde-button-variant="uncontained"]:hover,
  [data-kinde-button][data-kinde-button-variant="social"]:hover {
    background: ${tokens.surfaceHi} !important;
    color: ${tokens.ink} !important;
    border-color: ${tokens.lineStrong} !important;
  }

  /* Divider ("OR") between social and form */
  [data-kinde-divider],
  [data-kinde-separator] {
    color: ${tokens.inkMute} !important;
    font-family: ${tokens.mono} !important;
    font-size: 10px !important;
    letter-spacing: 0.14em !important;
    text-transform: uppercase !important;
    margin: 12px 0 !important;
  }

  /* ── Form-level spacing ──────────────────────────────────────── */
  /* Generous top margin on the "fallback action" area (where Kinde renders
     "No account? Create one") and on the built-with footer so they don't
     crowd the submit button. */
  [data-kinde-fallback-action],
  [data-kinde-text-link]:not([data-kinde-form-field] [data-kinde-text-link]) {
    font-family: ${tokens.mono} !important;
    font-size: 11px !important;
    letter-spacing: 0.04em !important;
    color: ${tokens.inkMute} !important;
  }

  /* "No account? Create one" / "Already have an account?" — the row that
     sits between the submit button and "Powered by Kinde". Kinde marks
     this area with data-kinde-fallback-action; if a different attribute
     is used, the generic form > *:not(button) margin below catches it. */
  [data-kinde-fallback-action] {
    margin-top: 22px !important;
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

  /* Powered by Kinde — separated from the fallback action above it. */
  [data-kinde-built-with],
  [data-kinde-powered-by] {
    margin-top: 18px !important;
    opacity: 0.5;
    font-family: ${tokens.mono} !important;
    font-size: 10px !important;
    letter-spacing: 0.06em !important;
    text-align: center;
    display: block;
  }

  /* Belt-and-braces: if Kinde wraps the submit button in a footer/group
     element, ensure breathing room around it. */
  [data-kinde-form-footer],
  [data-kinde-actions] {
    margin-top: 18px !important;
    display: flex;
    flex-direction: column;
    gap: 14px;
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

  /* ── Responsive ──────────────────────────────────────────────── */
  @media (max-width: 480px) {
    .auth-shell main { padding: 16px; }
    .auth-card { padding: 28px 22px 24px; }
    .auth-card h1 { font-size: 24px; }
    .auth-header { padding: 18px 18px; height: 56px; }
  }
`;
