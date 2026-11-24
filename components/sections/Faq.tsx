"use client";

import { useId, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";
import { Em } from "../ui/Em";
import { SectionHeader } from "../ui/SectionHeader";

/** Accordion: só um item aberto de cada vez; altura animada com grid-template-rows (0fr → 1fr). */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  const t = useI18n().t.faq;

  return (
    <section id="faq" aria-labelledby="faq-titulo" className="section px-gutter">
      <SectionHeader
        id="faq-titulo"
        number="09"
        label={t.label}
        title={<Em parts={t.title} />}
      />

      <div className="mt-12 grid grid-cols-12 gap-x-6 md:mt-20">
        <ul className="col-span-12 border-t border-sand md:col-span-9 md:col-start-4">
          {t.items.map((item, i) => {
            const isOpen = open === i;
            const btnId = `${uid}-b${i}`;
            const panelId = `${uid}-p${i}`;
            return (
              <li key={item.q} data-reveal className="border-b border-sand">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
                  >
                    <span className="font-serif text-xl leading-snug transition-colors duration-300 group-hover:text-walnut md:text-2xl">
                      {item.q}
                    </span>
                    {/* + / − sem rotação: a barra vertical recolhe */}
                    <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                      <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                      <span
                        className={cn(
                          "absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-500 ease-out2",
                          isOpen ? "scale-y-0" : "scale-y-100",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 ease-out2",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="max-w-prose pb-8 text-base text-ink/75 md:text-lg">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
