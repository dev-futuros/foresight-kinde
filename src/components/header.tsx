"use server";

import React from "react";

// The auth card carries the Futuros brand, and Kinde's widget renders its
// own switch-flow link ("No account? Create one") in the card footer.
// The chrome header is therefore intentionally empty — kept as a spacer so
// the card doesn't crash into the viewport edge on tall screens.
export const Header = (): React.JSX.Element => (
  <header className="auth-header" aria-hidden="true" />
);
