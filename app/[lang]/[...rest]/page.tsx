import { notFound } from "next/navigation";

/** Qualquer rota ainda inexistente (/mesas, /orcamento, /en/atelie…) mostra o not-found do idioma certo. */
export default function CatchAll() {
  notFound();
}
