"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Media } from "./Media";

interface AmbientVideoProps {
  src: string;
  poster: string;
  /** Descrição para leitores de ecrã (o vídeo não tem som nem texto). */
  label: string;
  /** Imagem estática usada se o vídeo não puder ser reproduzido. */
  fallbackSrc?: string;
  sizes: string;
  /** Só reproduz quando `true` (ex.: etapa ativa num carrossel). Por omissão, sempre que visível. */
  active?: boolean;
  className?: string;
}

/**
 * Vídeo ambiente em loop, sem som nem controlos, com `fill` (o pai define proporção e position: relative).
 * - Arranca só quando entra no ecrã (IntersectionObserver) e pausa quando sai.
 * - Com prefers-reduced-motion: não reproduz, fica o poster.
 */
export function AmbientVideo({ src, poster, label, fallbackSrc, sizes, active = true, className }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  // Começa como "reduzido" para que o HTML do servidor nunca faça autoplay antes de sabermos a preferência.
  const [reduced, setReduced] = useState(true);
  const [inView, setInView] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // O React não serializa `muted` como atributo; garantir a propriedade para a política de autoplay.
    el.muted = true;
    el.defaultMuted = true;
    if (!el.canPlayType("video/mp4")) setFailed(true);
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shouldPlay = inView && active && !reduced;
  const shouldPlayRef = useRef(shouldPlay);
  shouldPlayRef.current = shouldPlay;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldPlay) {
      el.play().catch(() => {
        /* autoplay bloqueado: fica o poster */
      });
    } else {
      el.pause();
    }
  }, [shouldPlay]);

  if (failed && fallbackSrc) {
    return <Media src={fallbackSrc} alt={label} sizes={sizes} className={className} />;
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      role="img"
      aria-label={label}
      autoPlay={!reduced}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      // O atributo autoplay pode disparar fora do ecrã; quem manda é o IntersectionObserver.
      onPlay={(e) => {
        if (!shouldPlayRef.current) e.currentTarget.pause();
      }}
      onError={() => setFailed(true)}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}
