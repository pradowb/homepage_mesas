import Image from "next/image";
import type { CSSProperties } from "react";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { ArrowLink, ButtonLink } from "../ui/Button";

/**
 * Hero split em ecrã inteiro.
 * Desktop: texto 5/12 à esquerda, imagem 7/12 à direita a ocupar toda a altura da coluna.
 * Mobile: imagem primeiro (70svh), texto por baixo.
 * O topo é reservado à barra de anúncio + navegação (100px mobile, 108px desktop), para a
 * navegação transparente nunca ficar por cima da fotografia.
 */
export function Hero({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const lines = t.hero.lines;

  return (
    <section
      aria-labelledby="hero-titulo"
      className="flex flex-col bg-bone pt-[6.25rem] md:pt-[6.75rem] lg:grid lg:h-[100svh] lg:min-h-[640px] lg:grid-cols-12 lg:gap-x-6"
    >
      {/* Imagem: primeiro no mobile, à direita no desktop */}
      <div className="relative h-[70svh] min-h-[360px] w-full overflow-hidden bg-sand lg:order-last lg:col-span-7 lg:h-full lg:min-h-0">
        <Image
          src={SITE.hero.image}
          alt={t.site.heroAlt}
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-[50%_55%]"
        />
      </div>

      <div className="flex flex-col justify-end px-gutter pb-16 pt-10 lg:col-span-5 lg:pb-14 lg:pr-0 lg:pt-0">
        <p className="hero-fade text-label uppercase text-ink/70" style={{ animationDelay: "0.1s" }}>
          {t.hero.eyebrow[0]} <span aria-hidden="true" className="mx-2">—</span> {t.hero.eyebrow[1]}
        </p>

        <h1 id="hero-titulo" className="mt-6 font-serif text-display lg:mt-8">
          {lines.map((line, i) => (
            <span key={i} className="line-mask">
              <span className="line-inner" style={{ "--i": i } as CSSProperties}>
                {/* última linha em itálico */}
                {i === lines.length - 1 ? <em>{line}</em> : line}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-fade mt-8 lg:mt-10">
          <p className="max-w-[36ch] text-base text-ink/75 md:text-lg">{t.hero.intro}</p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href={localePath(lang, "/#prontas")}>{t.hero.primary}</ButtonLink>
            <ArrowLink href={localePath(lang, "/orcamento")}>{t.hero.secondary}</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
