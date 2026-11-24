"use client";

import { ArrowLink } from "@/components/ui/Button";
import { Em } from "@/components/ui/Em";
import { useI18n } from "@/lib/i18n/provider";

export default function NotFound() {
  const { t, href } = useI18n();
  return (
    <section className="min-h-[70vh] px-gutter pb-24 pt-40 md:pt-52">
      <p className="text-label uppercase text-ink/70">{t.notFound.eyebrow}</p>
      <h1 className="mt-6 max-w-[14ch] font-serif text-h2">
        <Em parts={t.notFound.title} />
      </h1>
      <div className="mt-10">
        <ArrowLink href={href("/")}>{t.notFound.back}</ArrowLink>
      </div>
    </section>
  );
}
