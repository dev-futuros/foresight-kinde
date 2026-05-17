"use server";

import React from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

type DefaultLayoutProps = {
  children: React.ReactNode;
  page?: "login" | "register" | "default";
};

export const DefaultLayout = ({
  children,
  page = "default",
}: DefaultLayoutProps): React.JSX.Element => (
  <div className="auth-shell">
    <Header page={page} />
    <main>{children}</main>
    <Footer />
  </div>
);
