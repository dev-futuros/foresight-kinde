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
        {/* Cookie sync — when the user lands on a Kinde-hosted page with
            ?lang=, write the corresponding language to futuros_lang on
            .futuros.io. This way a language change made via the in-page
            LangSwitcher carries back to the React app (dev/app.futuros.io)
            after auth completes.
            'pl' from URL → 'ca' in cookie (we hijack Kinde's Polish slot
            to host Catalan content; the cookie stores the real language). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=new URLSearchParams(location.search);var l=p.get('lang');if(!l)return;var v=l==='pl'?'ca':l;document.cookie='futuros_lang='+v+'; Domain=.futuros.io; Path=/; Max-Age=31536000; SameSite=Lax; Secure';})();`,
          }}
        />
      </body>
    </html>
  );
};
