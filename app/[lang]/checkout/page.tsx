import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  return { title: isLocale(lang) ? getDictionary(lang).meta.checkout : undefined, robots: { index: false } };
}

/** Vazio nesta fase: checkout e pagamentos não estão implementados (futuro: cart.checkoutUrl da Shopify). */
export default async function CheckoutPage({ params }: Params) {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "pt");
  return (
    <section className="min-h-[70vh] px-gutter pb-24 pt-40 md:pt-52">
      <h1 className="font-serif text-h2">{t.meta.checkout}</h1>
    </section>
  );
}
