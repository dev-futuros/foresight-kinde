"use server";

import React from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { LangSwitcher } from "../components/langSwitcher";
import type { Lang } from "../i18n";

type DefaultLayoutProps = {
  children: React.ReactNode;
  /** Resolved app-side language (already mapped from Kinde's "pl" → "ca"). */
  lang: Lang;
  /** Localised "Terms & Conditions" label passed through to the footer. */
  termsLabel?: string;
  /**
   * Fresh OAuth-flow URL to restart with a new language. Passed straight
   * through to LangSwitcher — see its prop comment for the rationale.
   */
  restartUrl: string;
};

export const DefaultLayout = ({
  children,
  lang,
  termsLabel,
  restartUrl,
}: DefaultLayoutProps): React.JSX.Element => (
  <div className="auth-shell">
    <Header />
    <main>{children}</main>
    <Footer lang={lang} termsLabel={termsLabel} />
    <LangSwitcher activeLang={lang} restartUrl={restartUrl} />
  </div>
);
