import type { Locale } from "./config";
import { en } from "./dictionaries/en";
import { pt, type Dictionary } from "./dictionaries/pt";

const DICTIONARIES: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(lang: Locale): Dictionary {
  return DICTIONARIES[lang];
}

export type { Dictionary, Emphasis } from "./dictionaries/pt";
export * from "./config";
