import { getDictionary, type Locale } from "@/lib/i18n";
import { Em } from "../ui/Em";
import { SectionHeader } from "../ui/SectionHeader";

/** 3 colunas no desktop, carrossel com snap no mobile. Textos são placeholders (sem avaliações inventadas). */
export function Testimonials({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).testimonials;

  return (
    <section aria-labelledby="depoimentos-titulo" className="section px-gutter">
      <SectionHeader id="depoimentos-titulo" number="07" label={t.label} title={<Em parts={t.title} />} />
      <ul className="no-scrollbar -mx-gutter mt-12 flex snap-x snap-mandatory scroll-px-gutter gap-4 overflow-x-auto px-gutter md:mx-0 md:mt-20 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
        {t.items.map((item, i) => (
          <li key={i} data-reveal className="w-[84vw] shrink-0 snap-start sm:w-[60vw] md:w-auto">
            <figure className="flex h-full flex-col rounded-sm bg-sand p-7 md:p-10">
              <span aria-hidden="true" className="font-serif text-5xl leading-none">
                “
              </span>
              <blockquote className="mt-4 flex-1 font-serif text-xl leading-snug md:text-[1.375rem]">
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className="mt-10 border-t border-ink/15 pt-5">
                <p className="text-label-lg uppercase">{item.name}</p>
                <p className="mt-1 text-sm text-ink/75">{item.role}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
