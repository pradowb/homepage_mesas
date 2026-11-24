import { notFound } from "next/navigation";
import { Atelier } from "@/components/sections/Atelier";
import { Bespoke } from "@/components/sections/Bespoke";
import { Categories } from "@/components/sections/Categories";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Guarantees } from "@/components/sections/Guarantees";
import { Hero } from "@/components/sections/Hero";
import { Materials } from "@/components/sections/Materials";
import { Process } from "@/components/sections/Process";
import { ReadyProducts } from "@/components/sections/ReadyProducts";
import { Testimonials } from "@/components/sections/Testimonials";
import { isLocale } from "@/lib/i18n";
import { getProducts } from "@/lib/shopify/products";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const products = await getProducts(lang);

  return (
    <>
      <Hero lang={lang} />
      <Categories lang={lang} />
      <ReadyProducts lang={lang} products={products} />
      <Guarantees lang={lang} />
      <Bespoke lang={lang} />
      <Materials lang={lang} />
      <Process />
      <Testimonials lang={lang} />
      <Atelier lang={lang} />
      <Faq />
      <FinalCta />
    </>
  );
}
