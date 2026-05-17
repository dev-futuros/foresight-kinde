"use server";

import React from "react";

export const Footer = (): React.JSX.Element => {
  const year = new Date().getFullYear();
  return (
    <footer className="auth-footer">
      <div className="footer-note">FUTUROS · STRATEGIC FORESIGHT</div>
      <div className="footer-links">
        <a href="https://futuros.io/terms" target="_blank" rel="noreferrer">
          Terms &amp; Conditions
        </a>
        <span className="sep">·</span>
        <span>&copy; {year}</span>
      </div>
    </footer>
  );
};
