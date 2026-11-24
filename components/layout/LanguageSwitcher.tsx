"use client";

import { usePathname } from "next/navigation";
import { LOCALES, localePath, stripLocale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * PT / EN. Usa <a> (navegação completa) em vez de <Link> para o <html lang>, o Lenis e as
 * animações reiniciarem limpos no novo idioma. Mantém a mesma página.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, t } = useI18n();
  const base = stripLocale(usePathname() || "/");

  return (
    <ul aria-label={t.language.label} className={cn("flex items-center text-label uppercase", className)}>
      {LOCALES.map((l, i) => (
        <li key={l} className="flex items-center">
          {i > 0 && (
            <span aria-hidden="true" className="px-1 opacity-50">
              /
            </span>
          )}
          <a
            href={localePath(l, base)}
            hrefLang={l}
            lang={l}
            aria-label={t.language.names[l]}
            aria-current={l === lang ? "true" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center px-1 transition-colors hover:text-walnut",
              l === lang ? "underline decoration-1 underline-offset-4" : "opacity-60",
            )}
          >
            {l}
          </a>
        </li>
      ))}
    </ul>
  );
}
