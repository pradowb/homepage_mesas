import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "inverse";

export const buttonClasses = (variant: Variant = "primary", className?: string) =>
  cn(
    "inline-flex min-h-[48px] items-center justify-center gap-3 rounded-sm px-7 py-4 text-label-lg uppercase",
    "transition-colors duration-300 ease-out2",
    "disabled:cursor-not-allowed",
    variant === "primary" &&
      "bg-ink text-bone hover:bg-walnut focus-visible:bg-walnut disabled:bg-transparent disabled:text-ink/60 disabled:ring-1 disabled:ring-inset disabled:ring-sand",
    variant === "inverse" && "bg-bone text-ink hover:bg-walnut hover:text-bone focus-visible:bg-walnut focus-visible:text-bone",
    className,
  );

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode };

export function ButtonLink({ variant = "primary", className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} {...props}>
      {children}
    </Link>
  );
}

type ArrowLinkProps = ComponentProps<typeof Link> & { children: ReactNode; external?: boolean };

/** Botão secundário: texto sublinhado com seta → */
export function ArrowLink({ className, children, external, ...props }: ArrowLinkProps) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link
      className={cn(
        "group inline-flex min-h-[44px] items-center gap-2 text-label-lg uppercase",
        "underline decoration-1 underline-offset-[7px] transition-colors duration-300 hover:text-walnut",
        className,
      )}
      {...ext}
      {...props}
    >
      {children}
      <ArrowRight size={16} className="transition-transform duration-300 ease-out2 group-hover:translate-x-1" />
    </Link>
  );
}
