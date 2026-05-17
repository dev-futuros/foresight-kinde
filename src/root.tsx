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
        {/* Two concerns in one inline script (nonced to satisfy Kinde's
            script-src 'strict-dynamic' CSP):

            1. Cookie sync — write `futuros_lang` (scoped to .futuros.io)
               from the current `?lang=` so the React app and homepage
               can pick the language up on subsequent navigations. The
               `pl → ca` map reflects the Catalan-as-Polish hijack
               (Kinde doesn't support `ca`, we fill its Polish slot
               with Catalan strings).

            2. LangSwitcher click handler — Kinde only honours `lang=`
               at OAuth flow start, not mid-flow. So clicking a switcher
               must restart the auth flow with the new language. The
               anchor's href is the fresh OAuth URL (from
               getKindeLoginUrl / getKindeRegisterUrl on the server);
               we add ?lang= and navigate. Capture-phase preventDefault +
               stopImmediatePropagation beats Kinde's "Roast" framework
               (response content-type: roast/mixed), which would
               otherwise intercept the click and turn it into an XHR
               partial render — and language switching is not a partial-
               renderable concept (it affects <html lang>, every widget
               label, every server-resolved string). window.location.assign
               forces a full navigation so the server re-renders top to
               bottom in the new language. */}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=new URLSearchParams(location.search);var l=p.get('lang');if(l){var v=l==='pl'?'ca':l;document.cookie='futuros_lang='+v+'; Domain=.futuros.io; Path=/; Max-Age=31536000; SameSite=Lax; Secure';}document.querySelectorAll('.lt-btn[data-url-lang]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();var u=new URL(a.href,location.href);u.searchParams.set('lang',a.getAttribute('data-url-lang'));window.location.assign(u.toString());},true);});})();`,
          }}
        />
      </body>
    </html>
  );
};
