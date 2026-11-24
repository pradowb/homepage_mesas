import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  id?: string;
  dark?: boolean;
  className?: string;
}

/** Cabeçalho editorial: linha de 1px, numeração (01, 02…), label e título Instrument Serif na grelha de 12 colunas. */
export function SectionHeader({ number, label, title, intro, action, id, dark, className }: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "grid grid-cols-12 gap-x-6 gap-y-6 border-t pt-6 md:gap-y-8",
        dark ? "border-bone/20" : "border-sand",
        className,
      )}
    >
      <p
        data-reveal
        className={cn(
          "col-span-12 flex items-baseline text-label uppercase md:col-span-3",
          dark ? "text-bone/70" : "text-ink/70",
        )}
      >
        {/* número editorial em Instrument Serif (≥ 20px); a label segue em Inter Tight */}
        <span className="font-serif text-2xl normal-case leading-none tracking-normal tabular-nums">{number}</span>
        <span aria-hidden="true" className="mx-3">—</span>
        {label}
      </p>
      <h2 id={id} data-reveal className="col-span-12 font-serif text-h2 md:col-span-9">
        {title}
      </h2>
      {intro && (
        <p
          data-reveal
          className={cn(
            "col-span-12 max-w-prose text-base md:col-span-6 md:col-start-4 md:text-lg",
            dark ? "text-bone/75" : "text-ink/75",
          )}
        >
          {intro}
        </p>
      )}
      {action && (
        <div data-reveal className="col-span-12 md:col-span-3 md:col-start-10 md:self-end md:justify-self-end">
          {action}
        </div>
      )}
    </header>
  );
}
