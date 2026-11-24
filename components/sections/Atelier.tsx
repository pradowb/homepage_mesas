import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { ArrowLink } from "../ui/Button";
import { Em } from "../ui/Em";
import { Media } from "../ui/Media";

/** Split com a imagem à direita (alterna com "Sob medida"). No mobile a imagem vem primeiro. */
export function Atelier({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).atelier;

  return (
    <section id="atelie" aria-labelledby="atelie-titulo" className="section px-gutter">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12 border-t border-sand pt-6">
        <div
          data-reveal
          className="relative order-first col-span-12 aspect-[4/5] overflow-hidden lg:order-last lg:col-span-6 lg:col-start-7 lg:aspect-auto lg:min-h-[44rem]"
        >
          <Media src="/img/atelie-artesao-mesa-pinhas.jpg" alt={t.imageAlt} sizes="(min-width: 1024px) 46vw, 100vw" />
        </div>

        <div className="col-span-12 flex flex-col lg:col-span-5 lg:row-start-1">
          <p data-reveal className="text-label uppercase text-ink/70">
            <span className="tabular-nums">08</span>
            <span aria-hidden="true" className="mx-3">—</span>
            {t.label}
          </p>
          <h2 id="atelie-titulo" data-reveal className="mt-6 font-serif text-h2 md:mt-8">
            <Em parts={t.title} />
          </h2>
          <div data-reveal className="mt-8 max-w-prose space-y-5 text-base text-ink/75 md:text-lg">
            {t.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <dl data-reveal className="mt-12 grid grid-cols-2 border-t border-sand">
            <div className="border-b border-sand py-5 pr-4">
              <dt className="text-label uppercase text-ink/70">{t.founded}</dt>
              <dd className="mt-2 font-serif text-2xl">{t.foundedValue}</dd>
            </div>
            <div className="border-b border-l border-sand py-5 pl-4">
              <dt className="text-label uppercase text-ink/70">{t.location}</dt>
              <dd className="mt-2 font-serif text-2xl">{t.locationValue}</dd>
            </div>
          </dl>

          <div data-reveal className="mt-10">
            <ArrowLink href={localePath(lang, "/atelie")}>{t.visit}</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
