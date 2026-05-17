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
 * The displayed label still reads "CA" — the URL value is an
 * implementation detail.
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
        >
          {l.display}
        </a>
      ))}
    </div>
  );
};
