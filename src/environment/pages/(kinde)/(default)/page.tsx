"use server";

import { type KindePageEvent } from "@kinde/infrastructure";
import React from "react";
import { renderToString } from "react-dom/server.browser";
import { Widget } from "../../../../components/widget";
import { DefaultLayout } from "../../../../layouts/default";
import { Root } from "../../../../root";

const DefaultPage = (event: KindePageEvent): React.JSX.Element => (
  <Root context={event.context} request={event.request}>
    <DefaultLayout>
      <Widget heading={event.context.widget.content.heading} />
    </DefaultLayout>
  </Root>
);

export default async function Page(event: KindePageEvent): Promise<string> {
  return renderToString(<DefaultPage {...event} />);
}
