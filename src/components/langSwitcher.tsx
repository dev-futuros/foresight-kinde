"use server";

import React from "react";

type LangSwitcherProps = {
  /** Current resolved language code (our app's view — 'ca' / 'en' / 'es'). */
  activeLang: "ca" | "en" | "es";
};

/**
 * Fixed bottom-right language pill — mirrors the futuros.io homepage's
 * `.lang-toggle` styling so the auth pages feel like a continuation of
 * the marketing site.
 *
 * Each button is a plain anchor that reloads the page with a new `?lang=`
 * URL parameter. We map "ca" → "pl" for the Kinde-bound URL since Kinde
 * doesn't natively support Catalan and we hijack its Polish slot for
 * Catalan content (see src/i18n.ts for the reverse mapping).
 *
 * The `href` here only carries the `lang` param. Kinde's auth pages
 * include other state params (`psid`, `state`, `_:nav`, etc.) that we
 * MUST preserve across the language switch — otherwise the auth flow
 * breaks. A small inline script in root.tsx rewrites these anchors on
 * page load to merge `?lang=…` with whatever else is in the current
 * query string. The `data-url-lang` attribute is what the rewrite script
 * keys off; the static `href` stays as a fallback if the script can't
 * run for any reason.
 */
export const LangSwitcher = ({
  activeLang,
}: LangSwitcherProps): React.JSX.Element => {
  const langs: ReadonlyArray<{ display: string; code: string; key: "ca" | "en" | "es" }> = [
    { display: "ES", code: "es", key: "es" },
    { display: "CA", code: "pl", key: "ca" }, // Polish slot used for Catalan
    { display: "EN", code: "en", key: "en" },
  ];

  return (
    <div className="lang-toggle" aria-label="Language">
      {langs.map((l) => (
        <a
          key={l.key}
          href={`?lang=${l.code}`}
          className={`lt-btn${activeLang === l.key ? " active" : ""}`}
          aria-current={activeLang === l.key ? "true" : undefined}
          data-url-lang={l.code}
        >
          {l.display}
        </a>
      ))}
    </div>
  );
};
