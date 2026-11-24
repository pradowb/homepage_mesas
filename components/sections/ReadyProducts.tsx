import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import type { Product } from "@/lib/shopify/types";
import { ProductCard } from "../products/ProductCard";
import { ArrowLink } from "../ui/Button";
import { Em } from "../ui/Em";
import { SectionHeader } from "../ui/SectionHeader";

export function ReadyProducts({ lang, products }: { lang: Locale; products: Product[] }) {
  const t = getDictionary(lang).ready;

  return (
    <section id="prontas" aria-labelledby="prontas-titulo" className="section px-gutter">
      <SectionHeader
        id="prontas-titulo"
        number="02"
        label={t.label}
        title={<Em parts={t.title} />}
        intro={t.intro}
        action={<ArrowLink href={localePath(lang, "/mesas")}>{t.cta}</ArrowLink>}
      />

      {/* Mobile: 1 coluna com scroll horizontal e snap · Tablet: 2 colunas · Desktop: 3 colunas */}
      <div className="no-scrollbar -mx-gutter mt-12 flex snap-x snap-mandatory scroll-px-gutter gap-4 overflow-x-auto px-gutter md:mx-0 md:mt-20 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-20 md:overflow-visible md:px-0 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} className="w-[82vw] shrink-0 snap-start sm:w-[60vw] md:w-auto" />
        ))}
      </div>
    </section>
  );
}
