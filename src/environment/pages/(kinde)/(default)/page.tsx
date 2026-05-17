"use server";

import { getKindeLoginUrl, type KindePageEvent } from "@kinde/infrastructure";
import React from "react";
import { renderToString } from "react-dom/server.browser";
import { Widget } from "../../../../components/widget";
import { resolveLang, t } from "../../../../i18n";
import { DefaultLayout } from "../../../../layouts/default";
import { Root } from "../../../../root";

// The catch-all template — used by any Kinde flow we haven't customised
// (password reset, MFA, verify email, error pages). Kinde supplies its
// own `widget.content.heading`; we just localise the brand chrome around it.
// LangSwitcher restarts via the login flow as a sensible default — most
// of these intermediate pages are reached during a sign-in.
const DefaultPage = (event: KindePageEvent): React.JSX.Element => {
  const lang = resolveLang(event.request.locale.lang);
  const s = t(lang);
  return (
    <Root context={event.context} request={event.request}>
      <DefaultLayout
        lang={lang}
        termsLabel={s.termsAndConditions}
        restartUrl={getKindeLoginUrl()}
      >
        <Widget
          brandTag={s.brandTag}
          heading={event.context.widget.content.heading}
        />
      </DefaultLayout>
    </Root>
  );
};

export default async function Page(event: KindePageEvent): Promise<string> {
  return renderToString(<DefaultPage {...event} />);
}
