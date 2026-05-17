"use server";

import { getKindeRegisterUrl, type KindePageEvent } from "@kinde/infrastructure";
import React from "react";
import { renderToString } from "react-dom/server.browser";
import { Widget } from "../../../../components/widget";
import { resolveLang, t } from "../../../../i18n";
import { DefaultLayout } from "../../../../layouts/default";
import { Root } from "../../../../root";

const RegisterPage = (event: KindePageEvent): React.JSX.Element => {
  const lang = resolveLang(event.request.locale.lang);
  const s = t(lang);
  return (
    <Root context={event.context} request={event.request}>
      <DefaultLayout
        lang={lang}
        termsLabel={s.termsAndConditions}
        restartUrl={getKindeRegisterUrl()}
      >
        <Widget
          brandTag={s.brandTag}
          eyebrow={s.registerEyebrow}
          heading={event.context.widget.content.heading || s.registerHeading}
          lede={s.registerLede}
        />
      </DefaultLayout>
    </Root>
  );
};

export default async function Page(event: KindePageEvent): Promise<string> {
  return renderToString(<RegisterPage {...event} />);
}
