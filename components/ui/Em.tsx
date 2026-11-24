import type { Emphasis } from "@/lib/i18n";

/** Renderiza [antes, ênfase, depois] como "antes <em>ênfase</em> depois". */
export function Em({ parts: [before, em, after] }: { parts: Emphasis }) {
  return (
    <>
      {before}
      <em>{em}</em>
      {after}
    </>
  );
}
