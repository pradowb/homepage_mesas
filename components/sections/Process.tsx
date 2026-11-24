"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";
import { Em } from "../ui/Em";
import { AmbientVideo } from "../ui/AmbientVideo";
import { Media } from "../ui/Media";
import { SectionHeader } from "../ui/SectionHeader";

/**
 * Desktop (≥1024px): imagem sticky que troca conforme a etapa ativa.
 * Mobile/tablet: lista vertical simples.
 */

/** Vídeos das etapas 04 e 05 (índices 3 e 4). As etapas 01–03 continuam com placeholder. */
const STEP_VIDEOS: Partial<Record<number, { src: string; poster: string; fallback?: string; position: string }>> = {
  3: {
    src: "/video/processo-04-vazamento-resina.mp4",
    poster: "/video/processo-04-vazamento-resina-poster.jpg",
    fallback: "/img/processo-04-vazamento-resina.jpg",
    position: "object-[50%_40%]",
  },
  4: {
    src: "/video/processo-05-acabamento-lixagem.mp4",
    poster: "/video/processo-05-acabamento-lixagem-poster.jpg",
    position: "object-[50%_50%]",
  },
};
export function Process() {
  const t = useI18n().t.process;
  const PROCESS = t.steps;
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const triggers = steps.current.map((el, i) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        }),
      );
      return () => triggers.forEach((t) => t.kill());
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="processo" aria-labelledby="processo-titulo" className="section-dark bg-ink px-gutter text-bone">
      <SectionHeader
        dark
        id="processo-titulo"
        number="05"
        label={t.label}
        title={<Em parts={t.title} />}
        intro={t.intro}
      />

      <div className="mt-14 grid grid-cols-12 gap-x-6 md:mt-24">
        {/* Imagem sticky (só desktop) */}
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-[14vh] aspect-[4/5] max-h-[76vh] w-full overflow-hidden">
            {PROCESS.map((s, i) => {
              const video = STEP_VIDEOS[i];
              return (
                <div
                  key={s.title}
                  aria-hidden={active !== i}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-out2",
                    active === i ? "opacity-100" : "opacity-0",
                  )}
                >
                  {video ? (
                    <AmbientVideo
                      src={video.src}
                      poster={video.poster}
                      fallbackSrc={video.fallback}
                      label={s.alt}
                      sizes="46vw"
                      active={active === i}
                      className={video.position}
                    />
                  ) : (
                    <Media alt={s.alt} sizes="46vw" tone="dark" className="!bg-bone/[0.06]" />
                  )}
                </div>
              );
            })}
            <p className="absolute bottom-4 right-4 text-label uppercase tabular-nums text-bone/70" aria-hidden="true">
              {String(active + 1).padStart(2, "0")} / {String(PROCESS.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        <ol className="col-span-12 border-t border-bone/20 lg:col-span-5 lg:col-start-8 lg:border-t-0">
          {PROCESS.map((s, i) => (
            <li
              key={s.title}
              ref={(el) => {
                steps.current[i] = el;
              }}
              data-reveal
              className={cn(
                "grid grid-cols-[3rem_1fr] gap-x-4 border-b border-bone/20 py-8 md:grid-cols-[4rem_1fr]",
                "lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:border-b-0 lg:py-0",
                "transition-colors duration-500",
                active === i ? "lg:text-bone" : "lg:text-bone/55",
              )}
            >
              <span className="font-serif text-2xl leading-tight tabular-nums text-bone/70">
                <span className="sr-only">{t.step} </span>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="lg:mt-6">
                <h3 className="font-serif text-h3">{s.title}</h3>
                <p className={cn("mt-3 max-w-prose", active === i ? "text-bone/80" : "text-bone/80 lg:text-bone/55")}>
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
