import type { Dictionary, Emphasis, GuaranteeIcon } from "./pt";

/** English copy (British spelling). Must keep exactly the same shape as `pt.ts`. */
export const en: Dictionary = {
  meta: {
    title: "Solid wood and resin tables, handmade in Portugal",
    description:
      "Portuguese workshop making tables in solid wood and epoxy resin. One-of-a-kind pieces ready to ship, and made-to-measure tables for homes, architects and interior designers.",
    checkout: "Checkout",
  },

  site: {
    descriptor: "Table workshop",
    heroAlt:
      "White Resin Table with Pine Cones: pale solid wood with a central band of translucent white resin and three embedded pine cones, in natural light",
  },

  whatsapp: {
    general: "Hello, I'd like to know more about your tables.",
    bespoke: "Hello, I'd like to request a quote for a made-to-measure table.",
    talk: "Hello, I'd like to talk about a table.",
  },

  a11y: {
    skip: "Skip to content",
  },

  language: {
    label: "Language",
    names: { pt: "Português", en: "English" },
  },

  announcement: {
    primary: "Delivery and installation across mainland Portugal",
    secondary: "One-of-a-kind pieces, handmade in our workshop",
  },

  nav: [
    { href: "/#prontas", label: "Ready to ship" },
    { href: "/#sob-medida", label: "Made to measure" },
    { href: "/#materiais", label: "Materials" },
    { href: "/#atelie", label: "The Workshop" },
  ],

  header: {
    home: "home page",
    mainNav: "Main",
    mobileNav: "Menu",
    search: "Search",
    closeSearch: "Close search",
    searchLabel: "Search tables",
    searchPlaceholder: "Search by wood, resin or type of table",
    account: "Account",
    openCart: (count: number) => `Open basket, ${count} ${count === 1 ? "piece" : "pieces"}`,
    menu: "Menu",
    close: "Close",
    quote: "Request a quote",
  },

  footer: {
    tagline: "Tables in solid wood and epoxy resin, designed and handmade in Portugal.",
    contacts: "Contact",
    columns: [
      {
        title: "Shop",
        links: [
          { href: "/mesas/jantar", label: "Dining tables" },
          { href: "/mesas/centro", label: "Coffee tables" },
          { href: "/mesas/consolas", label: "Console tables" },
          { href: "/mesas/bancadas", label: "Countertops" },
          { href: "/orcamento", label: "Made to measure" },
        ],
      },
      {
        title: "Workshop",
        links: [
          { href: "/atelie", label: "About us" },
          { href: "/#processo", label: "Process" },
          { href: "/#materiais", label: "Materials" },
          { href: "/profissionais", label: "Architects and designers" },
        ],
      },
      {
        title: "Support",
        links: [
          { href: "/entregas", label: "Delivery and installation" },
          { href: "/cuidados", label: "Care and maintenance" },
          { href: "/garantia", label: "Warranty" },
          { href: "/#faq", label: "FAQ" },
        ],
      },
    ],
    legal: {
      privacy: "Privacy",
      terms: "Terms and conditions",
      cookies: "Cookies",
      complaints: "Complaints Book",
    },
    whatsappFloat: "Chat with us on WhatsApp (opens in a new window)",
  },

  hero: {
    eyebrow: ["Workshop in Portugal", "One-of-a-kind pieces"],
    lines: ["Wood,", "resin and", "time."],
    intro:
      "Tables in solid wood and epoxy resin, designed and handmade in our workshop. Ready to ship, or made to measure for your space.",
    primary: "Shop ready-made tables",
    secondary: "Design my table",
  },

  categories: {
    label: "Categories",
    title: ["A table for ", "every", " room."] as Emphasis,
    cta: "View collection",
    items: [
      { handle: "jantar", title: "Dining", alt: "Solid wood and resin dining table in a room with natural light" },
      { handle: "centro", title: "Coffee", alt: "Low wood and resin coffee table in a living room" },
      { handle: "consolas", title: "Consoles", alt: "Slim oak console table against a lime-washed wall" },
      { handle: "bancadas", title: "Countertops", alt: "Solid wood kitchen countertop with resin joints" },
    ],
  },

  ready: {
    label: "Ready to ship",
    title: ["Ready to ", "ship", "."] as Emphasis,
    intro:
      "Each table exists as a single piece. Once sold, it is never made the same way again — the original slab cannot be repeated.",
    cta: "View all tables",
  },

  product: {
    unique: "One of a kind",
    sold: "Sold",
    dimensions: "Dimensions",
    wood: "Wood",
    woodPrefix: "Wood:",
    add: "Add to basket",
    inCart: "In basket",
    ariaSold: (title: string) => `${title} — sold`,
    ariaInCart: (title: string) => `${title} is already in your basket — view basket`,
    ariaAdd: (title: string) => `Add ${title} to basket`,
    imageOf: (i: number, n: number) => `View image ${i} of ${n}`,
  },

  cart: {
    title: "Basket",
    close: "Close basket",
    empty: "Your basket is empty.",
    emptyText: "Every table in the collection is a one-of-a-kind piece, ready to ship.",
    browse: "View ready-made tables",
    unique: "One of a kind",
    remove: "Remove",
    ariaRemove: (title: string) => `Remove ${title} from basket`,
    subtotal: "Subtotal",
    shippingNote: "Delivery and installation calculated at checkout.",
    checkout: "Checkout",
  },

  guarantees: {
    label: "Guarantees",
    items: [
      {
        icon: "truck" as GuaranteeIcon,
        title: "Delivery and installation",
        text: "We deliver and install every piece across mainland Portugal, with our own team.",
      },
      {
        icon: "shield" as GuaranteeIcon,
        title: "Warranty",
        text: "[X]-year warranty on structure and finish, with ongoing maintenance support.",
      },
      {
        icon: "mark" as GuaranteeIcon,
        title: "One of a kind",
        text: "Each table exists only once and comes with a record of its materials.",
      },
    ],
  },

  bespoke: {
    label: "Made to measure",
    title: ["Designed for ", "your", " space."] as Emphasis,
    imageAlt: "Made-to-order walnut dining table, designed to fit a room with a long window",
    intro:
      "We start from the measurements, the light and the way you live in the room. You choose the slab, the wood and the resin finish with us — and receive a table that exists only in your home.",
    steps: [
      {
        title: "Tell us about the space",
        text: "Measurements, use and references. You can send floor plans or photos of the room.",
      },
      {
        title: "Proposal and samples",
        text: "Technical drawing, choice of slab, and wood and resin samples for your approval.",
      },
      {
        title: "Production and installation",
        text: "The table is made in our workshop and installed by us. You follow every stage through photos.",
      },
    ],
    quote: "Request a quote",
    whatsapp: "Chat on WhatsApp",
    professionals:
      "Architects and interior designers: we prepare technical drawings and physical samples for your project.",
  },

  materials: {
    label: "Materials",
    title: ["The material ", "decides", "."] as Emphasis,
    intro:
      "We work with only a few woods, all solid and responsibly sourced, and four resin finishes designed to complement them — never to compete with them.",
    woodsTitle: "Woods",
    resinsTitle: "Resin finishes",
    woods: [
      { name: "European walnut", note: "Warm tone and expressive grain. Our signature wood.", alt: "European walnut sample, close-up of the grain" },
      { name: "Oak", note: "Dense and stable, with an open grain. Ages with dignity.", alt: "Oak sample, close-up of the grain" },
      { name: "Chestnut", note: "A wood of Portuguese tradition, full of knots and character.", alt: "Chestnut sample with a natural knot" },
      { name: "Ash", note: "Pale and supple, ideal for slender lines and natural finishes.", alt: "Pale ash sample, close-up of the grain" },
    ],
    resins: [
      { name: "White", note: "Milky and translucent. Reveals whatever is suspended within.", alt: "Pine cone suspended in translucent white epoxy resin between wooden slabs" },
      { name: "Blue", note: "Intense, deep colour that becomes the heart of the piece.", alt: "Textured blue epoxy resin between two solid wood slabs" },
      { name: "Magenta", note: "Translucent and vibrant, with texture visible against the light.", alt: "Strip of translucent magenta epoxy resin in a pale wooden board" },
      { name: "Custom colour", note: "We develop the shade with you, working from physical samples.", alt: "Aqua-green epoxy resin, an example of a colour developed to order" },
    ],
  },

  process: {
    label: "Craft process",
    title: ["From trunk to ", "table", "."] as Emphasis,
    intro: "Five stages, all carried out in the workshop by the same hands. It is a slow process — and that is why our tables last.",
    step: "Stage",
    steps: [
      {
        title: "Selecting the slab",
        text: "We choose each slab by hand, for its grain, its knots and the way the tree grew.",
        alt: "Walnut slabs stacked in the workshop store",
      },
      {
        title: "Drying and stabilising",
        text: "The wood dries slowly to the right moisture content, so it won't warp in your home.",
        alt: "Slabs drying with wooden spacers between the layers",
      },
      {
        title: "Cutting and joining",
        text: "We cut, plane and join the slabs, keeping the live edge wherever it makes sense.",
        alt: "Hands planing the edge of an oak slab",
      },
      {
        title: "Pouring the resin",
        text: "The resin is poured in thin layers and cures over several days, unhurried, so it stays stable.",
        alt: "Craftsman removing bubbles from freshly poured resin with pine cones and pine sprigs inside",
      },
      {
        title: "Finishing and delivery",
        text: "Progressive sanding, natural oil and a final inspection. Then we install the piece ourselves.",
        alt: "Sanding a board with magenta resin in the workshop",
      },
    ],
  },

  testimonials: {
    label: "Testimonials",
    title: ["Those who ", "live", " with them."] as Emphasis,
    items: [
      {
        quote:
          "[Testimonial to be added. Space for 30 to 50 words from a private client about choosing the piece, the workshop's guidance and the installation at home.]",
        name: "[Client name]",
        role: "Private client · [Location]",
      },
      {
        quote:
          "[Testimonial to be added. Space for 30 to 50 words from an architecture studio about technical rigour, the drawings and meeting deadlines on site.]",
        name: "[Name]",
        role: "Architecture · [Studio]",
      },
      {
        quote:
          "[Testimonial to be added. Space for 30 to 50 words from an interior design studio about the samples, the choice of wood and the final result.]",
        name: "[Name]",
        role: "Interior design · [Studio]",
      },
    ],
  },

  atelier: {
    label: "The Workshop",
    title: ["Small, ", "by choice", "."] as Emphasis,
    imageAlt: "Table with white resin and pine cones in production in the workshop, with the craftsman in the background",
    paragraphs: [
      "We are a woodworking workshop in Portugal. We make only a few tables each year, from the first cut to the final finish, so that each one gets the time it needs.",
      "We work with solid wood and resin the way one works with stone: respecting what the material already is, and intervening only where necessary.",
    ],
    founded: "Founded",
    foundedValue: "[Year]",
    location: "Location",
    locationValue: "[Location]",
    visit: "Visit the workshop, by appointment",
  },

  faq: {
    label: "Frequently asked questions",
    title: ["Before you ", "decide", "."] as Emphasis,
    items: [
      {
        q: "How long does a made-to-order table take?",
        a: "It depends on the piece and the wood available. As a guide, allow [X] to [Y] weeks from approval of the proposal to installation. We always give a fixed lead time in the quote.",
      },
      {
        q: "Are the ready-made tables really one of a kind?",
        a: "Yes. Every table in the ready-made collection exists as a single piece. Once sold, it leaves the shop and is never made the same way again, because the original slab cannot be repeated.",
      },
      {
        q: "Do you deliver and install outside mainland Portugal?",
        a: "We deliver and install with our own team across mainland Portugal. For the islands and other countries, we prepare a separate shipping quote.",
      },
      {
        q: "Does the resin turn yellow over time?",
        a: "We use UV-protected resins made for furniture. Even so, we recommend avoiding prolonged direct sunlight, as with any solid wood.",
      },
      {
        q: "How should I care for the table?",
        a: "A soft, slightly damp cloth is all you need day to day. Avoid abrasive products and use coasters or mats for hot objects. Every table comes with a care guide and maintenance oil.",
      },
      {
        q: "Do you work with architects and interior designers?",
        a: "Yes, often. We prepare technical drawings and physical samples, and follow the project on site. Get in touch to learn about our trade terms.",
      },
      {
        q: "Can I visit the workshop?",
        a: "Yes, by prior appointment. It is the best way to see the slabs available and choose the wood for your table.",
      },
    ],
  },

  cta: {
    label: "Contact",
    title: ["Start with a ", "conversation", "."] as Emphasis,
    newsletter: "Newsletter",
    newsletterText: "New pieces, before they reach the shop. No fixed schedule, no noise.",
    emailLabel: "Email address",
    emailPlaceholder: "Your email",
    subscribe: "Subscribe",
    ok: "Thank you. You'll be the first to see the next piece.",
    error: "Please enter a valid email address.",
    consent: "By subscribing, you accept our Privacy Policy. You can unsubscribe at any time.",
    talkTitle: "Rather talk now?",
    talkText: "Send us the measurements of your space or a photo — we'll reply on WhatsApp.",
    whatsapp: "Chat on WhatsApp",
  },

  notFound: {
    eyebrow: "In progress",
    title: ["This page is still being ", "made", "."] as Emphasis,
    back: "Back to the home page",
  },
};
