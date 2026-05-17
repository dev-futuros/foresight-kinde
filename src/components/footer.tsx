"use server";

import React from "react";
import type { Lang } from "../i18n";

type FooterProps = {
  /** Localised "Terms & Conditions" link label. */
  termsLabel?: string;
  /**
   * Resolved app-side language. Appended to the terms link as a `?lang=`
   * URL parameter so the standalone terms page opens in the same language
   * the user is currently reading the auth page in (terms.html has no
   * in-page switcher and relies on this hint).
   */
  lang?: Lang;
};

export const Footer = ({
  termsLabel = "Terms & Conditions",
  lang,
}: FooterProps): React.JSX.Element => {
  const year = new Date().getFullYear();
  const termsHref = lang
    ? `https://futuros.io/terms.html?lang=${lang}`
    : "https://futuros.io/terms.html";
  return (
    <footer className="auth-footer">
      <div className="footer-note">FUTUROS · STRATEGIC FORESIGHT</div>
      <div className="footer-links">
        <a href={termsHref} target="_blank" rel="noreferrer">
          {termsLabel}
        </a>
        <span className="sep">·</span>
        <span>&copy; {year}</span>
      </div>
    </footer>
  );
};
