import data from "@/data/products.json";
import en from "@/data/products.en.json";
import { INTL_LOCALE, type Locale } from "@/lib/i18n/config";
import type { Metafield, Product, ShopifyImage } from "./types";

type Translation = { title?: string; description?: string; images?: Record<string, string> };
const TRANSLATIONS: Partial<Record<Locale, Record<string, Translation>>> = { en: en.products };

/**
 * Fonte de produtos. Hoje lê o JSON mock; depois basta substituir o corpo por um fetch à
 * Storefront API (POST https://{loja}.myshopify.com/api/2025-01/graphql.json) e devolver `data.products.nodes`.
 * Idioma: na Shopify, `query Products @inContext(language: EN) { … }` devolve já os textos traduzidos.
 * Aqui simulamos isso aplicando `data/products.{lang}.json` por cima do mock.
 */
export async function getProducts(lang: Locale = "pt"): Promise<Product[]> {
  const products = data.products as Product[];
  const dict = TRANSLATIONS[lang];
  if (!dict) return products;

  return products.map((p) => {
    const tr = dict[p.handle];
    if (!tr) return p;
    const img = (i: ShopifyImage): ShopifyImage => ({ ...i, altText: tr.images?.[i.url] ?? i.altText });
    return {
      ...p,
      title: tr.title ?? p.title,
      description: tr.description ?? p.description,
      featuredImage: img(p.featuredImage),
      images: { nodes: p.images.nodes.map(img) },
    };
  });
}

export function getMetafield(product: Product, key: string, namespace = "atelie"): string | undefined {
  return product.metafields.find((m: Metafield) => m.namespace === namespace && m.key === key)?.value;
}

export const PRICE_PLACEHOLDER = "[€]";

export function formatPrice(amount: string | null, currencyCode = "EUR", lang: Locale = "pt"): string {
  if (amount === null) return PRICE_PLACEHOLDER;
  return new Intl.NumberFormat(INTL_LOCALE[lang], {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
    // pt-PT não agrupa números de 4 dígitos por omissão ("4850 €"); forçar "4 850 €"
    useGrouping: "always",
  } as Intl.NumberFormatOptions).format(Number(amount));
}
