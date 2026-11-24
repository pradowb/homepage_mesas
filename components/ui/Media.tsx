import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "sand" | "dark";

interface MediaProps {
  src?: string | null;
  alt: string;
  /** Texto visível no placeholder. Por omissão: "FOTO: {alt}" */
  label?: ReactNode;
  sizes: string;
  priority?: boolean;
  tone?: Tone;
  className?: string;
  labelClassName?: string;
}

/**
 * Imagem com `fill` (o pai define proporção e position: relative).
 * Com `src` usa next/image (AVIF/WebP, lazy-load, srcset por `sizes`).
 * Sem `src` mostra um placeholder claramente marcado — nunca uma stock photo.
 */
export function Media({ src, alt, label, sizes, priority, tone = "sand", className, labelClassName }: MediaProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "absolute inset-0 flex items-end p-4 md:p-5",
        tone === "sand" ? "bg-sand text-ink/70" : "bg-ink text-bone/70",
        className,
      )}
    >
      {/* moldura de 1px que deixa claro que é um espaço reservado */}
      <span
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-3 border", tone === "sand" ? "border-ink/10" : "border-bone/15")}
      />
      <span aria-hidden="true" className={cn("relative max-w-[32ch] text-label uppercase", labelClassName)}>
        {label ?? `Foto: ${alt}`}
      </span>
    </div>
  );
}
