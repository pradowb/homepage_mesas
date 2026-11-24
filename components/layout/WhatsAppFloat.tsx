"use client";

import { useCart } from "@/lib/cart-store";
import { useI18n } from "@/lib/i18n/provider";
import { whatsappUrl } from "@/lib/site";
import { useUI } from "@/lib/ui-store";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "../ui/Icons";

/** Só no mobile. Esconde-se quando o carrinho ou o menu estão abertos. */
export function WhatsAppFloat() {
  const { t } = useI18n();
  const cartOpen = useCart((s) => s.isOpen);
  const menuOpen = useUI((s) => s.menuOpen);
  const hidden = cartOpen || menuOpen;

  return (
    <a
      href={whatsappUrl(t.whatsapp.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.footer.whatsappFloat}
      className={cn(
        "fixed bottom-4 right-4 z-20 inline-flex h-12 items-center gap-2 rounded-sm bg-ink px-4 text-label uppercase text-bone",
        "transition-[opacity,background-color] duration-300 hover:bg-walnut md:hidden",
        hidden && "pointer-events-none opacity-0",
      )}
    >
      <WhatsAppIcon size={18} />
      WhatsApp
    </a>
  );
}
