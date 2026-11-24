/**
 * Tipos espelhados da Shopify Storefront API (subconjunto usado na homepage).
 * Os dados mock em /data/products.json seguem exatamente esta forma, para que a troca
 * por uma query GraphQL real (`products(first: 8) { nodes { ... } }`) não exija alterar componentes.
 */

export type CurrencyCode = "EUR";

export interface Money {
  /** A Storefront API devolve Decimal como string. `null` = preço ainda por definir (placeholder). */
  amount: string | null;
  currencyCode: CurrencyCode;
}

export interface ShopifyImage {
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface Metafield {
  namespace: string;
  key: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: Money;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  /** usado como categoria: "jantar" | "centro" | "consolas" | "bancadas" */
  productType: string;
  description: string;
  availableForSale: boolean;
  totalInventory: number;
  tags: string[];
  priceRange: { minVariantPrice: Money };
  featuredImage: ShopifyImage;
  images: { nodes: ShopifyImage[] };
  variants: { nodes: ProductVariant[] };
  metafields: Metafield[];
}
