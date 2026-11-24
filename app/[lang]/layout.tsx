import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { notFound } from "next/navigation";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { RevealInit } from "@/components/motion/RevealInit";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { getDictionary, HTML_LANG, isLocale, LOCALES, localePath, OG_LOCALE } from "@/lib/i18n";
import { I18nProvider } from "@/lib/i18n/provider";
import { SITE } from "@/lib/site";
import "../globals.css";

// Só os pesos usados: Instrument Serif 400 (+ itálico), Inter Tight 400/500
const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const sans = Inter_Tight({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

type Params = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: `${SITE.name} — ${t.meta.title}`,
    description: t.meta.description,
    openGraph: { locale: OG_LOCALE[lang], type: "website" },
    alternates: {
      canonical: localePath(lang, "/"),
      languages: Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], localePath(l, "/")])),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#F5F2EC",
};

export default async function RootLayout({ children, params }: Params & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={HTML_LANG[lang]} className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* ativa os estados iniciais das animações de entrada só quando há JS */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <I18nProvider lang={lang}>
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-label-lg focus:uppercase focus:text-bone"
          >
            {t.a11y.skip}
          </a>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer lang={lang} />
          <CartDrawer />
          <WhatsAppFloat />
          <SmoothScroll />
          <RevealInit />
        </I18nProvider>
      </body>
    </html>
  );
}
