"use server";

import { getKindeWidget } from "@kinde/infrastructure";
import React from "react";

type WidgetProps = {
  heading: string;
  eyebrow?: string;
  lede?: string;
};

export const Widget = ({
  heading,
  eyebrow,
  lede,
}: WidgetProps): React.JSX.Element => {
  return (
    <section className="auth-card" aria-labelledby="auth-heading">
      <div className="card-brand">
        <span className="card-brand-mark" aria-hidden="true">F</span>
        <div>
          <div className="card-brand-name">Futuros</div>
          <div className="card-brand-tag">Strategic Foresight</div>
        </div>
      </div>

      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1 id="auth-heading">{heading}</h1>
      {lede && <p className="lede">{lede}</p>}

      {getKindeWidget()}
    </section>
  );
};
