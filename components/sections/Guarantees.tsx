import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { GUARANTEE_ICONS } from "../ui/Icons";

export function Guarantees({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).guarantees;

  return (
    <section aria-label={t.label} className="section px-gutter">
      <ul className="grid grid-cols-2 border-t border-sand lg:grid-cols-3 lg:border-b">
        {t.items.map((g, i) => {
          const Icon = GUARANTEE_ICONS[g.icon];
          return (
            <li
              key={g.icon}
              data-reveal
              className={cn(
                "flex flex-col gap-4 border-b border-sand py-8 pr-4 md:py-12 md:pr-8 lg:border-b-0",
                i % 2 === 1 && "border-l pl-4 md:pl-8",
                i > 0 && "lg:border-l lg:pl-8",
              )}
            >
              <Icon size={28} />
              <h3 className="text-label-lg uppercase">{g.title}</h3>
              <p className="max-w-[30ch] text-sm text-ink/75 md:text-base">{g.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
