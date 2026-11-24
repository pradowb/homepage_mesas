/**
 * Configuração do site (independente do idioma). Textos traduzíveis estão em `lib/i18n/dictionaries/`.
 * Todos os valores entre [ ] são placeholders a substituir pelo ateliê —
 * não foram inventados dados reais (morada, contactos, números).
 */
export const SITE = {
  name: "Veio",
  // Número no formato internacional, sem + nem espaços. PLACEHOLDER.
  whatsapp: "351000000000",
  email: "[email do ateliê]",
  phone: "[telefone do ateliê]",
  address: "[Morada do ateliê]",
  hours: "[Horário de visitas, por marcação]",
  hero: {
    // Imagem final fornecida — usar tal como está (sem recortes, filtros nem overlays). Alt em `site.heroAlt`.
    image: "/images/mesa-resina-branca.webp",
  },
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
