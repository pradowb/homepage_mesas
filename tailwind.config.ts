import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/**
 * Tokens do ateliê.
 * A paleta é fechada: não existem outras cores no projeto (as variações são apenas opacidades
 * destas quatro). O acento nogueira é reservado a CTAs e estados de hover.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      bone: "#F5F2EC", // fundo off-white
      ink: "#1A1A18", // texto carvão / secções escuras
      walnut: "#6B4A32", // acento único (CTAs e hovers)
      sand: "#D9D2C5", // linhas e fundos de cards
    },
    borderRadius: {
      none: "0",
      sm: "2px",
      DEFAULT: "2px",
    },
    fontFamily: {
      // Instrument Serif só existe em 400 (normal + itálico): títulos e números editoriais, nunca abaixo de 20px
      serif: ["var(--font-serif)", "Georgia", "serif"],
      // Inter Tight 400 (texto corrido) e 500 (navegação, botões, nomes de produto, labels, preços)
      sans: ["var(--font-sans)", "system-ui", "sans-serif"],
    },
    extend: {
      fontSize: {
        // H1: 52–60px mobile → 104–152px desktop (limitado pela altura em janelas baixas)
        display: ["clamp(3.25rem, min(1.17rem + 8.33vw, 15svh), 9.5rem)", { lineHeight: "0.95", letterSpacing: "-0.01em" }],
        // H2: 40px mobile → 64–80px desktop
        h2: ["clamp(2.5rem, 1.575rem + 3.79vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
        // H3: 28px mobile → 32–40px desktop
        h3: ["clamp(1.75rem, 1.1rem + 1.6vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.005em" }],
        // Texto corrido: 16–18px, line-height 1.6
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        // Labels, categorias e preços: Inter Tight 500 caixa alta 11–12px, tracking +10%
        label: ["0.6875rem", { lineHeight: "1.45", letterSpacing: "0.1em", fontWeight: "500" }],
        "label-lg": ["0.75rem", { lineHeight: "1.45", letterSpacing: "0.1em", fontWeight: "500" }],
      },
      spacing: {
        gutter: "max(1.25rem, 6vw)", // margens laterais 5–8vw
        nav: "4.5rem",
      },
      maxWidth: {
        prose: "34rem",
      },
      transitionTimingFunction: {
        // equivalente CSS a power2.out
        out2: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
    },
  },
  plugins: [
    // `can-hover:` aplica-se só a dispositivos com hover real (rato/trackpad); touch fica com o comportamento base
    plugin(({ addVariant }) => {
      addVariant("can-hover", "@media (hover: hover) and (pointer: fine)");
    }),
  ],
};

export default config;
