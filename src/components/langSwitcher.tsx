"use server";

import React from "react";

type LangSwitcherProps = {
  /** Current resolved language code (our app's view — 'ca' / 'en' / 'es'). */
  activeLang: "ca" | "en" | "es";
  /**
   * The OAuth-flow start URL the switcher should navigate to (typically
   * `getKindeLoginUrl()` or `getKindeRegisterUrl()` for whichever flow
   * the parent page belongs to). Kinde only honours `lang=` at flow
   * start, so the switcher must restart the flow with the new language
   * rather than appending `?lang=` mid-flow. The inline script in
   * root.tsx adds `?lang=...` to this URL on click.
   */
  restartUrl: string;
};

/**
 * Fixed bottom-right language pill — mirrors the futuros.io homepage's
 * `.lang-toggle` styling so the auth pages feel like a continuation of
 * the marketing site.
 *
 * Each button's href is the fresh OAuth-flow URL (`restartUrl`). On
 * click, an inline script in root.tsx adds/replaces the `lang` URL param
 * and forces a full page navigation (bypassing Kinde's Roast XHR
 * interceptor). The result: Kinde re-evaluates language detection from
 * scratch with the new `lang` value at flow start, which is the only
 * point Kinde actually honours the parameter.
 *
 * We map "ca" → "pl" via `data-url-lang` for the Kinde-bound URL since
 * Kinde doesn't natively support Catalan and we hijack its Polish slot.
 */
export const LangSwitcher = ({
  activeLang,
  restartUrl,
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
          href={restartUrl}
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
