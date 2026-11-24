"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { whatsappUrl } from "@/lib/site";
import { ArrowLink, buttonClasses } from "../ui/Button";
import { Em } from "../ui/Em";
import { WhatsAppIcon } from "../ui/Icons";

export function FinalCta() {
  const { t: dict } = useI18n();
  const t = dict.cta;
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    // TODO: ligar ao fornecedor de newsletter (ex.: Shopify Customer API com acceptsMarketing ou Klaviyo)
    setStatus(typeof email === "string" && /\S+@\S+\.\S+/.test(email) ? "ok" : "error");
  };

  return (
    <section aria-labelledby="cta-titulo" className="section-dark bg-ink px-gutter text-bone">
      <div className="grid grid-cols-12 gap-x-6 gap-y-14">
        <div className="col-span-12 lg:col-span-7">
          <p data-reveal className="text-label uppercase text-bone/70">
            <span className="tabular-nums">10</span>
            <span aria-hidden="true" className="mx-3">—</span>
            {t.label}
          </p>
          <h2 id="cta-titulo" data-reveal className="mt-6 font-serif text-display md:mt-8">
            <Em parts={t.title} />
          </h2>
        </div>

        <div className="col-span-12 grid gap-14 md:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1 lg:self-end">
          <form data-reveal onSubmit={onSubmit} noValidate aria-describedby="newsletter-nota">
            <h3 className="text-label-lg uppercase">{t.newsletter}</h3>
            <p className="mt-3 text-bone/80">{t.newsletterText}</p>
            <label htmlFor="newsletter-email" className="sr-only">
              {t.emailLabel}
            </label>
            <div className="mt-6 flex items-end gap-4 border-b border-bone/40 focus-within:border-bone">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={t.emailPlaceholder}
                aria-invalid={status === "error"}
                className="w-full bg-transparent py-3 text-base text-bone placeholder:text-bone/60 focus:outline-none"
              />
              <button type="submit" className={buttonClasses("inverse", "mb-2 min-h-[40px] shrink-0 px-5 py-3")}>
                {t.subscribe}
              </button>
            </div>
            <p className="mt-3 min-h-5 text-sm" role="status" aria-live="polite">
              {status === "ok" && t.ok}
              {status === "error" && t.error}
            </p>
            <p id="newsletter-nota" className="mt-2 text-xs text-bone/70">
              {t.consent}
            </p>
          </form>

          <div data-reveal className="border-t border-bone/20 pt-8 md:border-t-0 md:pt-0 lg:border-t lg:pt-10">
            <h3 className="text-label-lg uppercase">{t.talkTitle}</h3>
            <p className="mt-3 text-bone/80">{t.talkText}</p>
            <div className="mt-6 flex items-center gap-3">
              <WhatsAppIcon size={18} />
              <ArrowLink
                href={whatsappUrl(dict.whatsapp.talk)}
                external
                className="hover:!text-bone hover:decoration-2"
              >
                {t.whatsapp}
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
