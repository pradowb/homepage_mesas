"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useCart } from "@/lib/cart-store";
import { lockScroll, scrollToTarget } from "@/lib/scroll";
import { useI18n } from "@/lib/i18n/provider";
import { SITE, whatsappUrl } from "@/lib/site";
import { useUI } from "@/lib/ui-store";
import { cn } from "@/lib/utils";
import { buttonClasses } from "../ui/Button";
import { BagIcon, CloseIcon, SearchIcon, UserIcon } from "../ui/Icons";
import { AnnouncementBar } from "./AnnouncementBar";
import { LanguageSwitcher } from "./LanguageSwitcher";

const SOLID_AFTER = 80;

export function Header() {
  const pathname = usePathname();
  const { t: dict, href } = useI18n();
  const t = dict.header;
  const NAV_LINKS = dict.nav;
  const isHome = pathname === href("/");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);

  const menuOpen = useUI((s) => s.menuOpen);
  const setMenuOpen = useUI((s) => s.setMenuOpen);
  const count = useCart((s) => s.lines.length);
  const openCart = useCart((s) => s.open);

  // Sólida após 80px; esconde ao descer, reaparece ao subir.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SOLID_AFTER);
      if (y > SOLID_AFTER && y > last + 4) setHidden(true);
      else if (y < last - 4 || y <= SOLID_AFTER) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    lockScroll("menu", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMenuOpen]);

  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (isHome && href.startsWith("/#")) {
      e.preventDefault();
      const hash = href.slice(1);
      // espera que o bloqueio de scroll do menu seja libertado
      requestAnimationFrame(() => setTimeout(() => scrollToTarget(hash), 0));
      history.replaceState(null, "", hash);
    }
  };

  const overlayOpen = menuOpen || searchOpen;
  const solid = scrolled || !isHome || overlayOpen;
  const isHidden = hidden && !overlayOpen;

  const linkHover = "hover:text-walnut";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-transform duration-500 ease-out2",
          isHidden ? "-translate-y-full" : scrolled ? "-translate-y-9" : "translate-y-0",
        )}
      >
        <AnnouncementBar />
        <div
          className={cn(
            "border-b transition-colors duration-300",
            solid ? "border-sand bg-bone/90 text-ink backdrop-blur-md" : "border-transparent bg-transparent text-ink",
          )}
        >
          <div className="flex h-16 items-center justify-between gap-6 px-gutter md:h-nav">
            <Link href={href("/")} className="flex items-baseline gap-3" aria-label={`${SITE.name}, ${dict.site.descriptor} — ${t.home}`}>
              <span className="font-serif text-[1.75rem] leading-none tracking-[-0.02em]">{SITE.name}</span>
              <span className="hidden text-label uppercase opacity-80 md:inline">{dict.site.descriptor}</span>
            </Link>

            <nav aria-label={t.mainNav} className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={href(l.href)}
                      onClick={(e) => onNavClick(e, l.href)}
                      className={cn("text-label-lg uppercase transition-colors duration-300", linkHover)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="-mr-2 flex items-center md:-mr-3">
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                aria-expanded={searchOpen}
                aria-controls="pesquisa"
                aria-label={searchOpen ? t.closeSearch : t.search}
                className="hidden h-11 w-11 items-center justify-center transition-colors hover:text-walnut md:inline-flex"
              >
                {searchOpen ? <CloseIcon /> : <SearchIcon />}
              </button>
              <LanguageSwitcher className="mr-2 hidden md:flex" />
              <Link
                href={href("/conta")}
                aria-label={t.account}
                className="hidden h-11 w-11 items-center justify-center transition-colors hover:text-walnut md:inline-flex"
              >
                <UserIcon />
              </Link>
              <button
                type="button"
                onClick={openCart}
                aria-label={t.openCart(count)}
                className="inline-flex h-11 min-w-11 items-center justify-center gap-1.5 px-2 transition-colors hover:text-walnut"
              >
                <BagIcon />
                <span className="text-label tabular-nums">{count}</span>
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-controls="menu-mobile"
                className="inline-flex h-11 items-center pl-3 pr-2 text-label-lg uppercase lg:hidden"
              >
                {menuOpen ? t.close : t.menu}
              </button>
            </div>
          </div>

          {/* Pesquisa */}
          <div id="pesquisa" hidden={!searchOpen} className="border-t border-sand px-gutter py-6">
            <form action={href("/pesquisa")} method="get" role="search" className="flex items-end gap-6">
              <label htmlFor="q" className="sr-only">
                {t.searchLabel}
              </label>
              <input
                ref={searchInput}
                id="q"
                name="q"
                type="search"
                placeholder={t.searchPlaceholder}
                className="w-full border-b border-ink/30 bg-transparent pb-3 text-xl text-ink placeholder:text-ink/60 focus:border-ink focus:outline-none md:text-2xl"
              />
              <button type="submit" className={buttonClasses("primary", "shrink-0")}>
                {t.search}
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Menu mobile fullscreen */}
      <div
        id="menu-mobile"
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 z-30 flex flex-col overflow-y-auto bg-bone px-gutter pb-10 pt-32 text-ink transition-opacity duration-500 ease-out2 lg:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav aria-label={t.mobileNav}>
          <ul className="border-t border-sand">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href} className="border-b border-sand">
                <Link
                  href={href(l.href)}
                  onClick={(e) => onNavClick(e, l.href)}
                  className="flex items-baseline gap-5 py-5 text-[2rem] font-medium leading-none tracking-[-0.02em] hover:text-walnut"
                >
                  <span className="font-sans text-label tabular-nums text-ink/70">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-6 pt-12">
          <LanguageSwitcher className="-ml-1" />
          <Link href={href("/orcamento")} className={buttonClasses("primary", "w-full")} onClick={() => setMenuOpen(false)}>
            {t.quote}
          </Link>
          <ul className="grid grid-cols-3 gap-4 text-label uppercase">
            <li>
              <Link href={href("/pesquisa")} className="inline-flex min-h-11 items-center gap-2 hover:text-walnut">
                <SearchIcon size={16} /> {t.search}
              </Link>
            </li>
            <li>
              <Link href={href("/conta")} className="inline-flex min-h-11 items-center gap-2 hover:text-walnut">
                <UserIcon size={16} /> {t.account}
              </Link>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-walnut">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
