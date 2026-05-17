"use server";

import { getKindeLoginUrl, type KindePageEvent } from "@kinde/infrastructure";
import React from "react";
import { renderToString } from "react-dom/server.browser";
import { Widget } from "../../../../components/widget";
import { resolveLang, t } from "../../../../i18n";
import { DefaultLayout } from "../../../../layouts/default";
import { Root } from "../../../../root";

const LoginPage = (event: KindePageEvent): React.JSX.Element => {
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
          eyebrow={s.loginEyebrow}
          heading={event.context.widget.content.heading || s.loginHeading}
          lede={s.loginLede}
        />
      </DefaultLayout>
    </Root>
  );
};

export default async function Page(event: KindePageEvent): Promise<string> {
  return renderToString(<LoginPage {...event} />);
}
