"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cartSubtotal, useCart } from "@/lib/cart-store";
import { useI18n } from "@/lib/i18n/provider";
import { lockScroll } from "@/lib/scroll";
import { formatPrice } from "@/lib/shopify/products";
import { cn } from "@/lib/utils";
import { ArrowLink, buttonClasses } from "../ui/Button";
import { CloseIcon } from "../ui/Icons";
import { Media } from "../ui/Media";

export function CartDrawer() {
  const { lines, isOpen, close, remove } = useCart();
  const { lang, href, t: dict } = useI18n();
  const t = dict.cart;
  const panel = useRef<HTMLElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  // Reidratar o carrinho guardado (localStorage) só no cliente
  useEffect(() => {
    useCart.persist.rehydrate();
  }, []);

  useEffect(() => {
    lockScroll("cart", isOpen);
    if (isOpen) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      // foco no botão fechar depois da transição começar
      requestAnimationFrame(() => closeBtn.current?.focus());
    } else {
      returnFocus.current?.focus?.();
    }
  }, [isOpen]);

  // ESC fecha; Tab fica preso dentro do drawer
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const focusables = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const subtotal = cartSubtotal(lines);

  return (
    <div className={cn("fixed inset-0 z-50", !isOpen && "pointer-events-none")} inert={!isOpen}>
      {/* Clique fora fecha */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "absolute inset-0 bg-ink/40 transition-opacity duration-500 ease-out2",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="carrinho-titulo"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full flex-col bg-bone text-ink md:max-w-[460px] md:border-l md:border-sand",
          "transition-transform duration-500 ease-out2",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sand px-6 md:h-nav md:px-8">
          <h2 id="carrinho-titulo" className="text-label-lg uppercase">
            {t.title} <span className="tabular-nums text-ink/70">({lines.length})</span>
          </h2>
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            aria-label={t.close}
            className="-mr-3 inline-flex h-11 w-11 items-center justify-center hover:text-walnut"
          >
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-6 px-6 md:px-8">
            <p className="text-lg font-medium">{t.empty}</p>
            <p className="max-w-[30ch] text-ink/75">{t.emptyText}</p>
            <ArrowLink href={href("/#prontas")} onClick={close}>
              {t.browse}
            </ArrowLink>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 md:px-8" data-lenis-prevent>
              {lines.map((line) => (
                <li key={line.variantId} className="flex gap-5 border-b border-sand py-6">
                  <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden">
                    <Media
                      src={line.image.url}
                      alt={line.image.altText}
                      sizes="96px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-label uppercase text-ink/70">{t.unique}</p>
                    <Link
                      href={href(`/produtos/${line.handle}`)}
                      onClick={close}
                      className="mt-1 text-base font-medium leading-snug hover:text-walnut"
                    >
                      {line.title}
                    </Link>
                    <p className="mt-1 text-sm text-ink/75">{line.subtitle}</p>
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <p className="text-label-lg uppercase tabular-nums">{formatPrice(line.price.amount, line.price.currencyCode, lang)}</p>
                      <button
                        type="button"
                        onClick={() => remove(line.variantId)}
                        className="-mb-2 min-h-11 text-label uppercase underline decoration-1 underline-offset-4 hover:text-walnut"
                        aria-label={t.ariaRemove(line.title)}
                      >
                        {t.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-sand px-6 py-6 md:px-8 md:py-8">
              <div className="flex items-baseline justify-between">
                <p className="text-label-lg uppercase">{t.subtotal}</p>
                <p className="text-label-lg uppercase tabular-nums">{formatPrice(subtotal, "EUR", lang)}</p>
              </div>
              <p className="mt-2 text-sm text-ink/75">{t.shippingNote}</p>
              <Link href={href("/checkout")} onClick={close} className={buttonClasses("primary", "mt-6 w-full")}>
                {t.checkout}
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
