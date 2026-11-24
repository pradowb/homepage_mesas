import { getDictionary, type Locale } from "@/lib/i18n";
import { Em } from "../ui/Em";
import { Media } from "../ui/Media";
import { SectionHeader } from "../ui/SectionHeader";

type Swatch = { name: string; note: string; alt: string };

/** Fotos das amostras de madeira (WebP 1200x1200), pela mesma ordem do dicionário. */
const WOOD_IMAGES = [
  "/materiais/nogueira.webp",
  "/materiais/carvalho.webp",
  "/materiais/castanho.webp",
  "/materiais/freixo.webp",
] as const;

/** Fotos das amostras de resina, pela mesma ordem do dicionário. */
const RESIN_IMAGES = [
  "/img/material-resina-branca.jpg",
  "/img/material-resina-azul.jpg",
  "/img/material-resina-magenta.jpg",
  "/img/material-resina-cor-a-medida.jpg",
] as const;

function SwatchGroup({
  title,
  items,
  id,
  images,
}: {
  title: string;
  items: readonly Swatch[];
  id: string;
  images?: readonly string[];
}) {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-8 border-t border-sand pt-6">
      <h3 id={id} data-reveal className="col-span-12 text-label-lg uppercase md:col-span-3">
        {title}
      </h3>
      <ul aria-labelledby={id} className="col-span-12 grid grid-cols-2 gap-x-4 gap-y-10 md:col-span-9 md:gap-x-6 lg:grid-cols-4">
        {items.map((s, i) => (
          <li key={s.name} data-reveal>
            <div className="relative aspect-square overflow-hidden">
              <Media src={images?.[i]} alt={s.alt} sizes="(min-width: 1024px) 16vw, 46vw" />
            </div>
            <p className="mt-4 font-serif text-xl leading-tight md:text-2xl">{s.name}</p>
            <p className="mt-2 text-sm text-ink/75">{s.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Materials({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).materials;

  return (
    <section id="materiais" aria-labelledby="materiais-titulo" className="section px-gutter">
      <SectionHeader id="materiais-titulo" number="04" label={t.label} title={<Em parts={t.title} />} intro={t.intro} />
      <div className="mt-14 space-y-16 md:mt-24 md:space-y-24">
        <SwatchGroup id="madeiras" title={t.woodsTitle} items={t.woods} images={WOOD_IMAGES} />
        <SwatchGroup id="resinas" title={t.resinsTitle} items={t.resins} images={RESIN_IMAGES} />
      </div>
    </section>
  );
}
