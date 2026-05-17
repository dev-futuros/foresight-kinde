"use server";

import {
  getKindeCSRF,
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getSVGFaviconUrl,
  type KindePageEvent,
} from "@kinde/infrastructure";
import React from "react";
import { getStyles } from "./styles/styles";

interface RootProps extends KindePageEvent {
  children: React.ReactNode;
}

export const Root = ({
  children,
  context,
  request,
}: RootProps): React.JSX.Element => {
  // Fonts on Kinde-hosted pages fall back to the OS serif/sans stacks
  // intentionally — Kinde's style-src CSP doesn't allow fonts.googleapis.com,
  // and we'd rather degrade gracefully to system fonts than serve broken
  // stylesheet requests. If we ever need Playfair Display / DM Sans / DM
  // Mono on the Kinde pages, we'd have to self-host the .woff2 files under
  // *.futuros.io (which is in the allowed style-src list).
  return (
    <html dir={request.locale.isRtl ? "rtl" : "ltr"} lang={request.locale.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="noindex" name="robots" />
        <meta content={getKindeCSRF()} name="csrf-token" />
        <meta content="dark" name="color-scheme" />
        <meta content="nopagereadaloud" name="google" />
        <meta content="#08080b" name="theme-color" />
        <title>{context.widget.content.page_title}</title>

        <link href={getSVGFaviconUrl()} rel="icon" type="image/svg+xml" />

        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
        <style dangerouslySetInnerHTML={{ __html: getStyles() }} />
      </head>

      <body>
        <div className="atmosphere" aria-hidden="true" />
        <div className="grid-overlay" aria-hidden="true" />
        <div data-kinde-root="true">{children}</div>
      </body>
    </html>
  );
};
