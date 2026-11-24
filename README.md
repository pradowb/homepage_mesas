  # Veio — Homepage do ateliê de mesas

Next.js 15 (App Router) · TypeScript · Tailwind 3 · GSAP + ScrollTrigger · Lenis · Zustand.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Onde mexer

| O quê | Ficheiro |
|---|---|
| Tokens (cores, tipografia, espaçamento) | `tailwind.config.ts`, `app/globals.css` |
| Nome, contactos, WhatsApp, imagem do hero | `lib/site.ts` |
| Textos do site em português | `lib/i18n/dictionaries/pt.ts` |
| Textos do site em inglês | `lib/i18n/dictionaries/en.ts` |
| Títulos/fotos dos produtos em inglês | `data/products.en.json` |
| Produtos (mock com a forma da Storefront API) | `data/products.json` |
| Fonte de produtos (trocar por Shopify) | `lib/shopify/products.ts` → `getProducts()` |
| Carrinho | `lib/cart-store.ts` (Zustand + localStorage) |

## Placeholders

- **Imagens de produto (finais):** `public/images/mesa-resina-{branca,azul,magenta}.webp`, usadas tal como
  estão via `next/image` (a branca também no hero, com `priority`; as restantes com lazy-load).
- **Restantes imagens:** o componente `<Media>` sem `src` mostra um bloco areia marcado “FOTO: …”.
  Basta passar `src` para passar a usar `next/image`.
- **Dados dos produtos:** medidas `[C×L×A cm]`, madeira `[espécie]` e preço (`amount: null` → “[€]”) são
  placeholders. Para marcar uma peça como vendida: `availableForSale: false` no produto e na variante.
- Tudo entre `[ ]` (morada, telefone, email, ano, garantia, prazos, depoimentos) e o número de
  WhatsApp `351000000000` são placeholders. O nome “Veio” também é provisório.

## Idiomas (PT / EN)

- Português na raiz (`/`), inglês em `/en`. O `middleware.ts` reescreve `/…` para a rota interna `app/[lang]/`; `/pt/…` redireciona para `/…`.
- Seletor PT / EN no cabeçalho (desktop) e no menu mobile; mantém a página atual.
- `en.ts` tem de ter exatamente a mesma forma que `pt.ts` (o TypeScript avisa se faltar algum texto).
- Links internos: `localePath(lang, "/orcamento")` (servidor) ou `href("/orcamento")` de `useI18n()` (cliente).
- Na Shopify, os produtos traduzidos vêm de `@inContext(language: EN)`; aqui são simulados com `data/products.en.json`.

## Ligar à Shopify

1. `getProducts()` → query GraphQL `products { nodes { … } }` (os campos já coincidem).
2. Metafields com namespace `atelie`: `madeira`, `dimensoes`.
3. `useCart.add/remove` → mutations `cartCreate` / `cartLinesAdd` / `cartLinesRemove`; guardar `cartId`.
4. “Finalizar compra” → `cart.checkoutUrl` (hoje vai para `/checkout`, vazio).

## Notas

- O reveal do título do hero é CSS (começa no primeiro paint, sem esperar pela hidratação); as restantes entradas usam GSAP/ScrollTrigger (`[data-reveal]`).
- `prefers-reduced-motion`: Lenis e animações de entrada desativados.
- Páginas internas (`/mesas`, `/produtos/…`, `/orcamento`, `/atelie`, `/conta`, `/pesquisa`…) ainda não
  existem; mostram a página “Em preparação” (`app/not-found.tsx`).
