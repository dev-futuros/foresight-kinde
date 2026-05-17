"use server";

import React from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import type { Lang } from "../i18n";

type DefaultLayoutProps = {
  children: React.ReactNode;
  /**
   * Resolved app-side language (already mapped from Kinde's "pl" → "ca").
   * Passed through to Footer so the Terms link can carry `?lang=`.
   */
  lang: Lang;
  /** Localised "Terms & Conditions" label passed through to the footer. */
  termsLabel?: string;
};

export const DefaultLayout = ({
  children,
  lang,
  termsLabel,
}: DefaultLayoutProps): React.JSX.Element => (
  <div className="auth-shell">
    <Header />
    <main>{children}</main>
    <Footer lang={lang} termsLabel={termsLabel} />
  </div>
);
