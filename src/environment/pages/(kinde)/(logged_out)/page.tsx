"use server";

import {
  getKindeLoginUrl,
  type KindePageEvent,
} from "@kinde/infrastructure";
import React from "react";
import { renderToString } from "react-dom/server.browser";
import { DefaultLayout } from "../../../../layouts/default";
import { Root } from "../../../../root";

const LoggedOutPage = (event: KindePageEvent): React.JSX.Element => (
  <Root context={event.context} request={event.request}>
    <DefaultLayout>
      <section
        className="auth-card logged-out-card"
        aria-labelledby="logged-out-heading"
      >
        <div className="card-brand" style={{ justifyContent: "center" }}>
          <span className="card-brand-mark" aria-hidden="true">
            F
          </span>
          <div>
            <div className="card-brand-name">Futuros</div>
            <div className="card-brand-tag">Strategic Foresight</div>
          </div>
        </div>

        <div className="check-mark" aria-hidden="true">
          ✓
        </div>

        <div className="eyebrow">Session ended</div>
        <h1 id="logged-out-heading">You&rsquo;ve signed out</h1>
        <p className="lede">
          Your session has been closed securely. Sign back in when you&rsquo;re
          ready to continue mapping your strategic horizon.
        </p>

        <div className="actions">
          <a href={getKindeLoginUrl()}>Sign in again</a>
          <a className="secondary" href="https://futuros.io">
            Back to futuros.io
          </a>
        </div>
      </section>
    </DefaultLayout>
  </Root>
);

export default async function Page(event: KindePageEvent): Promise<string> {
  return renderToString(<LoggedOutPage {...event} />);
}
