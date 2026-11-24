import Link from "next/link";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { SITE, whatsappUrl } from "@/lib/site";

export function Footer({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const t = dict.footer;
  const year = new Date().getFullYear();
  const href = (path: string) => localePath(lang, path);

  return (
    <footer className="bg-bone px-gutter pb-28 pt-20 text-ink md:pb-10 md:pt-28">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12 border-t border-sand pt-10">
        <div className="col-span-12 lg:col-span-4">
          <p className="font-serif text-[3.5rem] leading-none tracking-[-0.02em]">{SITE.name}</p>
          <p className="mt-4 max-w-[32ch] text-ink/75">{t.tagline}</p>
        </div>

        {t.columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="col-span-6 md:col-span-3 lg:col-span-2">
            <h2 className="text-label uppercase text-ink/70">{col.title}</h2>
            <ul className="mt-5 space-y-1">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={href(l.href)} className="inline-flex min-h-9 items-center text-[0.9375rem] hover:text-walnut">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <h2 className="text-label uppercase text-ink/70">{t.contacts}</h2>
          <address className="mt-5 space-y-3 text-[0.9375rem] not-italic">
            <p>{SITE.address}</p>
            <p>{SITE.hours}</p>
            <p>{SITE.email}</p>
            <p>{SITE.phone}</p>
            <p>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-4 hover:text-walnut">
                WhatsApp
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-4 border-t border-sand pt-6 text-label uppercase text-ink/70 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {SITE.name} — {dict.site.descriptor}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><Link href={href("/privacidade")} className="hover:text-walnut">{t.legal.privacy}</Link></li>
          <li><Link href={href("/termos")} className="hover:text-walnut">{t.legal.terms}</Link></li>
          <li><Link href={href("/cookies")} className="hover:text-walnut">{t.legal.cookies}</Link></li>
          <li>
            <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="hover:text-walnut">
              {t.legal.complaints}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
