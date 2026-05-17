// Localisation for the Futuros brand chrome on Kinde-hosted auth pages.
//
// Scope: only the strings we control (brand tag, eyebrow, heading, lede,
// footer). Kinde's widget itself (form labels, "Continue with Google",
// password placeholder, OTP copy, etc.) is localised by Kinde based on
// the same `?lang=` URL parameter that drives this file.
//
// Language is resolved from `KindePageEvent.request.locale.lang` in each
// page.tsx. The React app appends `?lang=<lang>` when triggering
// LoginLink / login() / logout(), and Kinde forwards that value into
// `request.locale.lang`.

export type Lang = "ca" | "en" | "es";

const SUPPORTED: readonly Lang[] = ["ca", "en", "es"] as const;
const DEFAULT_LANG: Lang = "es";

/**
 * Normalise an incoming locale string (possibly "ca-ES", "en_GB", "ES", etc.)
 * to one of our three supported short codes. Anything we don't recognise
 * falls back to Spanish so a misconfigured locale never crashes the page.
 *
 * Special case — the "Polish as Catalan" hijack:
 *   Kinde doesn't natively support Catalan (as of 2026-05). To serve a
 *   fully-Catalan auth experience, we override Kinde's Polish ("pl") slot
 *   in the dashboard with Catalan translations, then route Catalan users
 *   to the Polish locale. When the page renders with `lang=pl`, that's
 *   actually a Catalan user — so we map "pl" → "ca" here so the brand
 *   chrome (eyebrow, heading, lede, footer) reads from the right column
 *   of the translations dict. The mirror mapping `ca → pl` lives in the
 *   Foresight React app, applied at the `<LoginLink>` / `login()`
 *   boundary when calling Kinde.
 *
 *   This is safe because we never serve real Polish — the React app
 *   doesn't include Polish in its supported languages list, so a genuine
 *   Polish browser would fall back to Spanish there before ever reaching
 *   Kinde with `lang=pl`.
 */
export const resolveLang = (raw: string | undefined | null): Lang => {
  if (!raw) return DEFAULT_LANG;
  const short = raw.toLowerCase().replace(/[_-].*/, "").slice(0, 2);
  if (short === "pl") return "ca";
  return (SUPPORTED as readonly string[]).includes(short)
    ? (short as Lang)
    : DEFAULT_LANG;
};

type Strings = {
  brandTag: string;
  termsAndConditions: string;
  loginEyebrow: string;
  loginHeading: string;
  loginLede: string;
  registerEyebrow: string;
  registerHeading: string;
  registerLede: string;
};

const dict: Record<Lang, Strings> = {
  en: {
    brandTag: "Strategic Foresight",
    termsAndConditions: "Terms & Conditions",
    loginEyebrow: "Sign in",
    loginHeading: "Welcome back",
    loginLede: "Continue mapping your strategic horizon.",
    registerEyebrow: "Create account",
    registerHeading: "Begin your foresight",
    registerLede:
      "Join Futuros and start shaping the futures that matter.",
  },
  es: {
    brandTag: "Estrategia de Foresight",
    termsAndConditions: "Términos y Condiciones",
    loginEyebrow: "Iniciar sesión",
    loginHeading: "Bienvenido de nuevo",
    loginLede: "Continúa mapeando tu horizonte estratégico.",
    registerEyebrow: "Crear cuenta",
    registerHeading: "Empieza tu foresight",
    registerLede:
      "Únete a Futuros y empieza a dar forma a los futuros que importan.",
  },
  ca: {
    brandTag: "Estratègia de Foresight",
    termsAndConditions: "Termes i Condicions",
    loginEyebrow: "Iniciar sessió",
    loginHeading: "Et donem la benvinguda",
    loginLede: "Continua mapant el teu horitzó estratègic.",
    registerEyebrow: "Crear compte",
    registerHeading: "Inicia el teu foresight",
    registerLede:
      "Uneix-te a Futuros i comença a donar forma als futurs que importen.",
  },
};

export const t = (lang: Lang): Strings => dict[lang];
