export const LOCALES = ["pt", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Atributo `lang` do <html> e locale do Intl (preços). */
export const HTML_LANG: Record<Locale, string> = { pt: "pt-PT", en: "en" };
export const INTL_LOCALE: Record<Locale, string> = { pt: "pt-PT", en: "en-IE" };
export const OG_LOCALE: Record<Locale, string> = { pt: "pt_PT", en: "en_GB" };

/**
 * Português vive na raiz (`/`, `/#prontas`, `/orcamento`); inglês em `/en`.
 * Links externos, mailto, etc. passam sem alteração.
 */
export function localePath(lang: Locale, href: string): string {
  if (!href.startsWith("/") || lang === DEFAULT_LOCALE) return href;
  if (href === "/") return `/${lang}`;
  if (href.startsWith("/#")) return `/${lang}${href.slice(1)}`;
  return `/${lang}${href}`;
}

/** Remove o prefixo de idioma de um pathname do browser (`/en/mesas` → `/mesas`). */
export function stripLocale(pathname: string): string {
  for (const l of LOCALES) {
    if (l === DEFAULT_LOCALE) continue;
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}
