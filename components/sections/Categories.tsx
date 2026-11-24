import Image from "next/image";
import Link from "next/link";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { Em } from "../ui/Em";
import { SectionHeader } from "../ui/SectionHeader";

export function Categories({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).categories;

  return (
    <section id="categorias" aria-labelledby="categorias-titulo" className="section px-gutter md:pt-32 xl:pt-44">
      <SectionHeader id="categorias-titulo" number="01" label={t.label} title={<Em parts={t.title} />} />

      {/* Mobile: scroll horizontal com snap · Tablet: 2 colunas · Desktop: 4 colunas */}
      <ul className="no-scrollbar -mx-gutter mt-12 flex snap-x snap-mandatory scroll-px-gutter gap-4 overflow-x-auto px-gutter md:mx-0 md:mt-20 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-4">
        {t.items.map((c) => {
          return (
            <li key={c.handle} data-reveal className="w-[72vw] shrink-0 snap-start sm:w-[46vw] md:w-auto">
              <Link href={localePath(lang, `/mesas/${c.handle}`)} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* TODO: substituir por foto própria antes do lançamento */}
                  <Image
                    src={`/images/categorias/${c.handle}.jpg`}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 768px) 85vw, 25vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-[1400ms] ease-out2 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-sand pb-5">
                  <h3 className="font-serif text-h3 transition-colors duration-300 group-hover:text-walnut">
                    {c.title}
                  </h3>
                  <span className="text-label uppercase text-ink/70">
                    {t.cta}
                    <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
