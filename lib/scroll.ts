import type Lenis from "lenis";

let lenis: Lenis | null = null;
const locks = new Set<string>();

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

/** Bloqueia o scroll da página (drawer, menu). Cada origem tem a sua chave para não se anularem. */
export function lockScroll(key: string, locked: boolean) {
  if (locked) locks.add(key);
  else locks.delete(key);
  const any = locks.size > 0;
  document.documentElement.style.overflow = any ? "hidden" : "";
  if (lenis) {
    if (any) lenis.stop();
    else lenis.start();
  }
}

export function scrollToTarget(selector: string) {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.2 });
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
}
