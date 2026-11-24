"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

/**
 * Animação de entrada global para qualquer elemento com [data-reveal]:
 * fade + subida de 24px, 700ms, power2.out, uma única vez ao entrar no viewport.
 * O estado inicial é definido em CSS (html.js [data-reveal]) para evitar flash.
 */
export function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-revealed])");
    if (!els.length) return;

    if (prefersReducedMotion()) {
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }

    const triggers = ScrollTrigger.batch(els, {
      start: "top 90%",
      once: true,
      onEnter: (batch) => {
        batch.forEach((el) => el.setAttribute("data-revealed", ""));
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.08, overwrite: true });
      },
    });

    // Recalcular posições depois de as fontes carregarem
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => triggers.forEach((t) => t.kill());
  }, [pathname]);

  return null;
}
