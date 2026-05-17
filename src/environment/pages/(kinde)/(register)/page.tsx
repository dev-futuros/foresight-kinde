"use server";

import { type KindePageEvent } from "@kinde/infrastructure";
import React from "react";
import { renderToString } from "react-dom/server.browser";
import { Widget } from "../../../../components/widget";
import { DefaultLayout } from "../../../../layouts/default";
import { Root } from "../../../../root";

const RegisterPage = (event: KindePageEvent): React.JSX.Element => (
  <Root context={event.context} request={event.request}>
    <DefaultLayout page="register">
      <Widget
        eyebrow="Create account"
        heading={event.context.widget.content.heading || "Begin your foresight"}
        lede="Join Futuros and start shaping the futures that matter."
      />
    </DefaultLayout>
  </Root>
);

export default async function Page(event: KindePageEvent): Promise<string> {
  return renderToString(<RegisterPage {...event} />);
}
