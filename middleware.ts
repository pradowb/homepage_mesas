import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n/config";

/**
 * Português na raiz, sem prefixo (`/` → reescrito internamente para `/pt`).
 * Outros idiomas com prefixo (`/en`). `/pt/...` redireciona para o URL sem prefixo.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const prefixed = LOCALES.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));

  if (prefixed === DEFAULT_LOCALE) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url);
  }
  if (prefixed) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // tudo exceto ficheiros internos do Next e ficheiros estáticos (com extensão)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
