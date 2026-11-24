"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart-store";
import { useI18n } from "@/lib/i18n/provider";
import { formatPrice, getMetafield } from "@/lib/shopify/products";
import type { Product, ShopifyImage } from "@/lib/shopify/types";
import { cn } from "@/lib/utils";
import { buttonClasses } from "../ui/Button";

const SIZES = "(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 82vw";
const ZOOM = "transition-transform duration-[1400ms] ease-out2 group-hover/media:scale-[1.04]";

/**
 * Imagem do card (4:5, cover). Com uma segunda imagem:
 * - rato/trackpad: crossfade de 400ms para a segunda imagem no hover, com o mesmo zoom lento;
 * - touch: mini-carrossel com swipe (scroll-snap nativo) e 2 indicadores.
 */
function ProductMedia({
  href,
  image,
  hoverImage,
  badges,
}: {
  href: string;
  image: ShopifyImage;
  hoverImage?: ShopifyImage;
  badges: ReactNode;
}) {
  const { t } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  if (!hoverImage) {
    return (
      <Link href={href} tabIndex={-1} className="group/media relative block aspect-[4/5] overflow-hidden bg-sand">
        <Image src={image.url} alt={image.altText} fill sizes={SIZES} className={cn("object-cover object-center", ZOOM)} />
        {badges}
      </Link>
    );
  }

  const slides = [image, hoverImage];
  const onScroll = () => {
    const el = trackRef.current;
    if (el && el.clientWidth) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goTo = (i: number) => {
    const el = trackRef.current;
    el?.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <Link href={href} tabIndex={-1} className="group/media relative block aspect-[4/5] overflow-hidden bg-sand">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto can-hover:block can-hover:overflow-hidden"
        >
          <div className="relative h-full w-full shrink-0 snap-center overflow-hidden can-hover:absolute can-hover:inset-0">
            <Image src={image.url} alt={image.altText} fill sizes={SIZES} className={cn("object-cover object-center", ZOOM)} />
          </div>
          <div className="relative h-full w-full shrink-0 snap-center overflow-hidden can-hover:absolute can-hover:inset-0 can-hover:opacity-0 can-hover:transition-opacity can-hover:duration-[400ms] can-hover:ease-out2 can-hover:group-hover/media:opacity-100">
            {/* lazy por omissão do next/image; foco no centro da mesa */}
            <Image
              src={hoverImage.url}
              alt={hoverImage.altText}
              fill
              sizes={SIZES}
              className={cn("object-cover object-[51%_50%]", ZOOM)}
            />
          </div>
        </div>
        {badges}
      </Link>

      {/* indicadores: só em touch */}
      <div className="absolute inset-x-0 bottom-2 flex justify-center can-hover:hidden">
        {slides.map((s, i) => (
          <button
            key={s.url}
            type="button"
            onClick={() => goTo(i)}
            aria-label={t.product.imageOf(i + 1, slides.length)}
            aria-current={index === i}
            className="grid h-6 w-6 place-items-center"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-1.5 w-1.5 rounded-[50%] transition-colors duration-300",
                index === i ? "bg-bone" : "bg-bone/50",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { lang, href: localize, t: dict } = useI18n();
  const t = dict.product;
  const variant = product.variants.nodes[0];
  const inCart = useCart((s) => s.lines.some((l) => l.variantId === variant.id));
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);

  const sold = !product.availableForSale || !variant.availableForSale;
  const image = product.featuredImage;
  const hoverImage = product.images.nodes.find((img) => img.url !== image.url);
  const wood = getMetafield(product, "madeira");
  const dims = getMetafield(product, "dimensoes");
  const href = localize(`/produtos/${product.handle}`);

  const onAdd = () => {
    // peça única: quantidade máxima 1 (o store ignora duplicados)
    if (!inCart) {
      add({
        variantId: variant.id,
        productId: product.id,
        handle: product.handle,
        title: product.title,
        subtitle: [wood && `${t.woodPrefix} ${wood}`, dims].filter(Boolean).join(" · "),
        price: variant.price,
        image,
      });
    }
    open();
  };

  return (
    <article data-reveal className={cn("flex flex-col", className)} aria-labelledby={`p-${product.handle}`}>
      <ProductMedia
        href={href}
        image={image}
        hoverImage={hoverImage}
        badges={
          <span className="pointer-events-none absolute left-3 right-3 top-3 flex flex-wrap items-start gap-1">
            <span className="bg-bone px-2 py-1 text-label uppercase text-ink">{t.unique}</span>
            {sold && <span className="bg-ink px-2 py-1 text-label uppercase text-bone">{t.sold}</span>}
          </span>
        }
      />

      <div className="mt-5 flex flex-1 flex-col">
        <h3 id={`p-${product.handle}`} className="text-lg font-medium leading-snug">
          <Link href={href} className="transition-colors duration-300 hover:text-walnut">
            {product.title}
          </Link>
        </h3>

        <dl className="mt-4 border-t border-sand text-sm">
          {dims && (
            <div className="flex justify-between gap-4 border-b border-sand py-2.5">
              <dt className="text-ink/70">{t.dimensions}</dt>
              <dd className="tabular-nums">{dims}</dd>
            </div>
          )}
          {wood && (
            <div className="flex justify-between gap-4 border-b border-sand py-2.5">
              <dt className="text-ink/70">{t.wood}</dt>
              <dd>{wood}</dd>
            </div>
          )}
        </dl>

        <p className={cn("mt-4 text-label-lg uppercase tabular-nums", sold && "text-ink/60")}>
          {formatPrice(variant.price.amount, variant.price.currencyCode, lang)}
        </p>

        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={onAdd}
            disabled={sold}
            aria-label={
              sold
                ? t.ariaSold(product.title)
                : inCart
                  ? t.ariaInCart(product.title)
                  : t.ariaAdd(product.title)
            }
            className={buttonClasses("primary", "w-full")}
          >
            {sold ? t.sold : inCart ? t.inCart : t.add}
          </button>
        </div>
      </div>
    </article>
  );
}
