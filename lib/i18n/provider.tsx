"use client";

import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LOCALE, localePath, type Locale } from "./config";
import { getDictionary } from "./index";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

/** Só o idioma atravessa a fronteira servidor → cliente; o dicionário (que tem funções) é lido aqui. */
export function I18nProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const lang = useContext(LocaleContext);
  return { lang, t: getDictionary(lang), href: (path: string) => localePath(lang, path) };
}
