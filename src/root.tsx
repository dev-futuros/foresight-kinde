"use server";

import {
  getKindeCSRF,
  getKindeNonce,
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
  // CSP nonce for the inline cookie-sync script. Kinde's CSP requires
  // every inline <script> to carry a matching nonce attribute; without
  // it the browser silently refuses to execute the script.
  // The fonts on Kinde-hosted pages fall back to the OS serif/sans
  // stacks intentionally — Kinde's style-src CSP does not allow
  // fonts.googleapis.com, and we'd rather degrade gracefully to system
  // fonts than serve broken stylesheet requests. If we ever need
  // Playfair Display / DM Sans / DM Mono on the Kinde pages, we'd have
  // to self-host the .woff2 files under *.futuros.io (which is in the
  // allowed style-src list).
  const nonce = getKindeNonce();

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
        {/* Cookie sync — when the user lands on a Kinde-hosted page with
            ?lang=, write the corresponding language to futuros_lang on
            .futuros.io. This way a language change made via the in-page
            LangSwitcher carries back to the React app (dev/app.futuros.io)
            after auth completes.
            'pl' from URL → 'ca' in cookie (we hijack Kinde's Polish slot
            to host Catalan content; the cookie stores the real language).
            The nonce attribute satisfies Kinde's script-src 'strict-dynamic'
            CSP — without it the browser refuses to execute the script. */}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=new URLSearchParams(location.search);var l=p.get('lang');if(!l)return;var v=l==='pl'?'ca':l;document.cookie='futuros_lang='+v+'; Domain=.futuros.io; Path=/; Max-Age=31536000; SameSite=Lax; Secure';})();`,
          }}
        />
      </body>
    </html>
  );
};
