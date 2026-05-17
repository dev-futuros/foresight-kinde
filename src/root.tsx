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

        {/* Preconnect + stylesheet for Playfair Display / DM Sans / DM Mono.
            Using a <link rel="stylesheet"> instead of an @import inside our
            inline <style> — link is more reliable across browsers and lets
            the font stylesheet load in parallel with the page CSS. */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />

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
