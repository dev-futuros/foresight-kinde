"use server";

import React from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export const DefaultLayout = ({
  children,
}: DefaultLayoutProps): React.JSX.Element => (
  <div className="auth-shell">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);
