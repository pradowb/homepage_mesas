import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/site";
import { ArrowLink, ButtonLink } from "../ui/Button";
import { Em } from "../ui/Em";
import { Media } from "../ui/Media";

/** Split: imagem à esquerda no desktop, imagem primeiro no mobile. */
export function Bespoke({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const t = dict.bespoke;

  return (
    <section id="sob-medida" aria-labelledby="sob-medida-titulo" className="section px-gutter">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12 border-t border-sand pt-6">
        <div data-reveal className="relative col-span-12 aspect-[4/5] overflow-hidden lg:col-span-6 lg:aspect-auto lg:min-h-[44rem]">
          <Media alt={t.imageAlt} sizes="(min-width: 1024px) 46vw, 100vw" />
        </div>

        <div className="col-span-12 flex flex-col lg:col-span-5 lg:col-start-8">
          <p data-reveal className="text-label uppercase text-ink/70">
            <span className="tabular-nums">03</span>
            <span aria-hidden="true" className="mx-3">—</span>
            {t.label}
          </p>
          <h2 id="sob-medida-titulo" data-reveal className="mt-6 font-serif text-h2 md:mt-8">
            <Em parts={t.title} />
          </h2>
          <p data-reveal className="mt-6 max-w-prose text-base text-ink/75 md:text-lg">
            {t.intro}
          </p>

          <ol className="mt-12 border-t border-sand md:mt-16">
            {t.steps.map((s, i) => (
              <li key={s.title} data-reveal className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-sand py-6 md:grid-cols-[4rem_1fr]">
                <span className="font-serif text-2xl leading-tight tabular-nums text-ink/70">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-2xl leading-tight">{s.title}</h3>
                  <p className="mt-2 text-ink/75">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div data-reveal className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href={localePath(lang, "/orcamento")}>{t.quote}</ButtonLink>
            <ArrowLink href={whatsappUrl(dict.whatsapp.bespoke)} external>
              {t.whatsapp}
            </ArrowLink>
          </div>
          <p data-reveal className="mt-8 max-w-prose text-sm text-ink/75">
            {t.professionals}
          </p>
        </div>
      </div>
    </section>
  );
}
