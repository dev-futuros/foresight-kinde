// Kinde widget styling — mirrors the Futuros token system from
// frontend/src/index.css + frontend/src/features/auth/auth.css.
// Single source of truth: keep this in sync with those files when
// the main app's design tokens change.

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
  /* ── Google Fonts (Playfair Display / DM Sans / DM Mono) ──────── */
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');

  /* ── Kinde widget CSS variables ───────────────────────────────── */
  :root {
    --kinde-base-font-family: ${tokens.sans};
    --kinde-base-font-size: 14px;
    --kinde-base-text-color: ${tokens.ink};
    --kinde-base-background-color: transparent;

    /* Inputs */
    --kinde-control-text-background-color: ${tokens.surface3};
    --kinde-control-text-color: ${tokens.ink};
    --kinde-control-text-border-color: ${tokens.line};
    --kinde-control-text-border-width: 1px;
    --kinde-control-text-border-radius: ${tokens.rMd};
    --kinde-control-text-padding-block: 13px;
    --kinde-control-text-padding-inline: 14px;
    --kinde-control-text-font-family: ${tokens.mono};
    --kinde-control-text-font-size: 14px;
    --kinde-control-text-focus-border-color: ${tokens.lineAccent};
    --kinde-control-text-focus-box-shadow: 0 0 0 3px hsla(40, 60%, 56%, 0.08);

    /* Labels */
    --kinde-control-label-color: ${tokens.inkMute};
    --kinde-control-label-font-family: ${tokens.mono};
    --kinde-control-label-font-size: 10.5px;
    --kinde-control-label-font-weight: 500;
    --kinde-control-label-text-transform: uppercase;
    --kinde-control-label-letter-spacing: 0.06em;

    /* Checkable controls (checkboxes / radios) */
    --kinde-control-checkable-border-color: ${tokens.lineStrong};
    --kinde-control-checkable-border-radius: 4px;
    --kinde-control-checkable-border-width: 1px;
    --kinde-control-checkable-background-color: ${tokens.surface3};
    --kinde-control-checkable-checked-background-color: ${tokens.gold};
    --kinde-control-checkable-checked-border-color: ${tokens.goldSoft};

    /* Primary button — the gold continue button */
    --kinde-button-primary-background-color: ${tokens.gold};
    --kinde-button-primary-color: #0a0a0a;
    --kinde-button-primary-border-color: ${tokens.goldSoft};
    --kinde-button-primary-border-width: 1px;
    --kinde-button-primary-border-radius: ${tokens.rMd};
    --kinde-button-primary-font-family: ${tokens.sans};
    --kinde-button-primary-font-weight: 600;
    --kinde-button-primary-font-size: 14px;
    --kinde-button-primary-padding-block: 13px;
    --kinde-button-primary-padding-inline: 22px;
    --kinde-button-primary-hover-background-color: ${tokens.gold};
    --kinde-button-primary-hover-color: #0a0a0a;

    /* Secondary button — outline */
    --kinde-button-secondary-background-color: transparent;
    --kinde-button-secondary-color: ${tokens.inkSoft};
    --kinde-button-secondary-border-color: ${tokens.line};
    --kinde-button-secondary-border-width: 1px;
    --kinde-button-secondary-border-style: solid;
    --kinde-button-secondary-border-radius: ${tokens.rMd};
    --kinde-button-secondary-hover-border-color: ${tokens.lineStrong};
    --kinde-button-secondary-hover-color: ${tokens.ink};

    /* Generic button radius (covers social/OAuth buttons too) */
    --kinde-button-border-radius: ${tokens.rMd};

    /* Form spacing */
    --kinde-form-spacing-content: 1rem;

    /* Links */
    --kinde-link-color: ${tokens.gold};
    --kinde-link-hover-color: ${tokens.goldSoft};

    /* Error state */
    --kinde-error-color: ${tokens.red};
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

  /* ── Header ───────────────────────────────────────────────────── */
  .auth-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 28px;
    position: relative;
    z-index: 2;
  }
  .auth-header .brand-link {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${tokens.ink};
  }
  .auth-header .brand-mark {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: ${tokens.surface2};
    border: 1px solid ${tokens.line};
    display: grid;
    place-items: center;
    font-family: ${tokens.serif};
    font-weight: 900;
    font-size: 22px;
    line-height: 1;
    color: ${tokens.gold};
  }
  .auth-header .brand-text {
    font-family: ${tokens.serif};
    font-size: 17px;
    color: ${tokens.ink};
    letter-spacing: -0.005em;
  }
  .auth-header .header-action {
    font-family: ${tokens.mono};
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${tokens.inkMute};
    padding: 8px 14px;
    border: 1px solid ${tokens.line};
    border-radius: ${tokens.rPill};
    transition: color 180ms, border-color 180ms;
  }
  .auth-header .header-action:hover {
    color: ${tokens.gold};
    border-color: ${tokens.lineAccent};
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

  /* ── Kinde widget overrides ───────────────────────────────────── */
  /* Most styling is driven by --kinde-* variables above. The selectors
     below are escape hatches for visual details the variables don't reach. */
  [data-kinde-root="true"] { color: ${tokens.ink}; }

  [data-kinde-control-label] {
    font-family: ${tokens.mono};
    font-size: 10.5px;
    color: ${tokens.inkMute};
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  [data-kinde-control-text],
  [data-kinde-control-select-text] {
    background: ${tokens.surface3};
    border: 1px solid ${tokens.line};
    color: ${tokens.ink};
    font-family: ${tokens.mono};
  }
  [data-kinde-control-text]::placeholder {
    font-family: ${tokens.sans};
    color: ${tokens.inkMute};
    opacity: 0.7;
  }
  [data-kinde-control-text]:hover:not(:focus) {
    border-color: ${tokens.lineStrong};
  }
  [data-kinde-control-text]:focus {
    border-color: ${tokens.lineAccent};
    box-shadow: 0 0 0 3px hsla(40, 60%, 56%, 0.08);
  }
  [data-kinde-control-text][aria-invalid="true"] {
    border-color: hsla(0, 80%, 70%, 0.45);
    box-shadow: 0 0 0 3px hsla(0, 80%, 70%, 0.06);
  }

  /* Built-with-Kinde branding — keep it but tone it down */
  [data-kinde-built-with] {
    opacity: 0.5;
    font-family: ${tokens.mono};
    font-size: 10px;
    letter-spacing: 0.06em;
  }

  /* Divider ("OR") between social and form */
  [data-kinde-divider] {
    color: ${tokens.inkMute};
    font-family: ${tokens.mono};
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  /* OTP / verification code input */
  [data-kinde-control-otp] input {
    background: ${tokens.surface3};
    border: 1px solid ${tokens.line};
    color: ${tokens.ink};
    font-family: ${tokens.mono};
    font-size: 18px;
    letter-spacing: 0.2em;
    text-align: center;
    border-radius: ${tokens.rMd};
  }
  [data-kinde-control-otp] input:focus {
    border-color: ${tokens.lineAccent};
    box-shadow: 0 0 0 3px hsla(40, 60%, 56%, 0.08);
    outline: none;
  }

  /* Primary button — gold glow on hover */
  [data-kinde-button][data-kinde-button-variant="primary"]:hover,
  button[type="submit"]:hover {
    box-shadow:
      0 1px 0 hsla(0, 0%, 100%, 0.2) inset,
      0 0 32px hsla(40, 60%, 56%, 0.22);
  }

  /* Error / hint messages */
  [data-kinde-error],
  [data-kinde-hint] {
    font-family: ${tokens.mono};
    font-size: 11px;
    letter-spacing: 0.02em;
    margin-top: 6px;
  }
  [data-kinde-error] { color: ${tokens.red}; }
  [data-kinde-hint] { color: ${tokens.inkMute}; }

  /* ── Card footer (switch flow link) ──────────────────────────── */
  .auth-card .card-footer {
    border-top: 1px solid ${tokens.line};
    margin-top: 20px;
    padding-top: 16px;
    text-align: center;
    font-family: ${tokens.mono};
    font-size: 11px;
    color: ${tokens.inkMute};
    letter-spacing: 0.04em;
  }
  .auth-card .card-footer a {
    color: ${tokens.gold};
    border-bottom: 1px solid rgba(212, 168, 83, 0.35);
    padding-bottom: 1px;
    margin-left: 6px;
    transition: color 200ms, border-color 200ms;
  }
  .auth-card .card-footer a:hover {
    color: ${tokens.goldSoft};
    border-bottom-color: rgba(212, 168, 83, 0.7);
  }

  /* ── Consent line (below the card form) ──────────────────────── */
  .consent-line {
    margin-top: 18px;
    font-family: ${tokens.mono};
    font-size: 9.5px;
    color: ${tokens.inkMute};
    opacity: 0.65;
    text-align: center;
    letter-spacing: 0.04em;
    line-height: 1.65;
  }
  .consent-line a {
    color: ${tokens.inkMute};
    text-decoration: underline;
    text-decoration-color: rgba(110, 106, 100, 0.4);
    text-underline-offset: 2px;
  }
  .consent-line a:hover { color: ${tokens.gold}; }

  /* ── Footer ───────────────────────────────────────────────────── */
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

  /* ── Responsive ──────────────────────────────────────────────── */
  @media (max-width: 480px) {
    .auth-shell main { padding: 16px; }
    .auth-card { padding: 28px 22px 24px; }
    .auth-card h1 { font-size: 24px; }
    .auth-header { padding: 18px 18px; }
  }
`;
