"use server";

import {
  getKindeLoginUrl,
  getKindeRegisterUrl,
} from "@kinde/infrastructure";
import React from "react";

type HeaderProps = {
  page: "login" | "register" | "default";
};

export const Header = ({ page }: HeaderProps): React.JSX.Element => {
  const isLogin = page === "login";
  const showSwitchLink = page === "login" || page === "register";

  return (
    <header className="auth-header">
      <a className="brand-link" href="/" aria-label="Futuros">
        <span className="brand-mark" aria-hidden="true">F</span>
        <span className="brand-text">Futuros</span>
      </a>
      {showSwitchLink && (
        <a
          className="header-action"
          href={isLogin ? getKindeRegisterUrl() : getKindeLoginUrl()}
        >
          {isLogin ? "Sign up" : "Sign in"}
        </a>
      )}
    </header>
  );
};
