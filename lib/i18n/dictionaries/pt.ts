/**
 * Textos em português (idioma por omissão). O inglês (`en.ts`) tem de seguir exatamente esta forma.
 * Tudo o que está entre [ ] é placeholder a substituir pelo ateliê (não foram inventados dados reais).
 *
 * Títulos com ênfase: [antes, em itálico, depois] → "Prontas a <em>entregar</em>."
 */

export type Emphasis = [string, string, string];
export type GuaranteeIcon = "truck" | "shield" | "lock" | "mark";

export const pt = {
  meta: {
    title: "Mesas em madeira maciça e resina, feitas à mão em Portugal",
    description:
      "Ateliê português de mesas em madeira maciça e resina epóxi. Peças únicas prontas a entregar e mesas por medida para casas, arquitetos e designers de interiores.",
    checkout: "Finalizar compra",
  },

  site: {
    descriptor: "Ateliê de mesas",
    heroAlt:
      "Mesa Resina Branca com Pinhas: madeira maciça clara com faixa central de resina branca translúcida e três pinhas incrustadas, em luz natural",
  },

  whatsapp: {
    general: "Olá, gostaria de saber mais sobre as vossas mesas.",
    bespoke: "Olá, gostaria de pedir um orçamento para uma mesa por medida.",
    talk: "Olá, gostaria de falar sobre uma mesa.",
  },

  a11y: {
    skip: "Saltar para o conteúdo",
  },

  language: {
    label: "Idioma",
    names: { pt: "Português", en: "English" },
  },

  announcement: {
    primary: "Entrega e instalação em Portugal continental",
    secondary: "Peças únicas, feitas à mão no nosso ateliê",
  },

  nav: [
    { href: "/#prontas", label: "Mesas prontas" },
    { href: "/#sob-medida", label: "Sob medida" },
    { href: "/#materiais", label: "Materiais" },
    { href: "/#atelie", label: "O Ateliê" },
  ],

  header: {
    home: "página inicial",
    mainNav: "Principal",
    mobileNav: "Menu",
    search: "Pesquisar",
    closeSearch: "Fechar pesquisa",
    searchLabel: "Pesquisar mesas",
    searchPlaceholder: "Pesquisar por madeira, resina ou tipo de mesa",
    account: "Conta",
    openCart: (count: number) => `Abrir carrinho, ${count} ${count === 1 ? "peça" : "peças"}`,
    menu: "Menu",
    close: "Fechar",
    quote: "Pedir orçamento",
  },

  footer: {
    tagline: "Mesas em madeira maciça e resina epóxi, desenhadas e feitas à mão em Portugal.",
    contacts: "Contactos",
    columns: [
      {
        title: "Loja",
        links: [
          { href: "/mesas/jantar", label: "Mesas de jantar" },
          { href: "/mesas/centro", label: "Mesas de centro" },
          { href: "/mesas/consolas", label: "Consolas" },
          { href: "/mesas/bancadas", label: "Bancadas" },
          { href: "/orcamento", label: "Sob medida" },
        ],
      },
      {
        title: "Ateliê",
        links: [
          { href: "/atelie", label: "Sobre nós" },
          { href: "/#processo", label: "Processo" },
          { href: "/#materiais", label: "Materiais" },
          { href: "/profissionais", label: "Arquitetos e designers" },
        ],
      },
      {
        title: "Apoio",
        links: [
          { href: "/entregas", label: "Entregas e instalação" },
          { href: "/cuidados", label: "Cuidados e manutenção" },
          { href: "/garantia", label: "Garantia" },
          { href: "/#faq", label: "Perguntas frequentes" },
        ],
      },
    ],
    legal: {
      privacy: "Privacidade",
      terms: "Termos e condições",
      cookies: "Cookies",
      complaints: "Livro de Reclamações",
    },
    whatsappFloat: "Falar connosco no WhatsApp (abre numa nova janela)",
  },

  hero: {
    eyebrow: ["Ateliê em Portugal", "Peças únicas"],
    lines: ["Madeira,", "resina e", "tempo."],
    intro:
      "Mesas em madeira maciça e resina epóxi, desenhadas e feitas à mão no nosso ateliê. Prontas a entregar, ou criadas à medida do seu espaço.",
    primary: "Comprar mesas prontas",
    secondary: "Criar a minha mesa",
  },

  categories: {
    label: "Categorias",
    title: ["Uma mesa para ", "cada", " divisão."] as Emphasis,
    cta: "Ver coleção",
    items: [
      { handle: "jantar", title: "Jantar", alt: "Mesa de jantar em madeira maciça e resina numa sala com luz natural" },
      { handle: "centro", title: "Centro", alt: "Mesa de centro baixa em madeira e resina numa sala de estar" },
      { handle: "consolas", title: "Consolas", alt: "Consola estreita em madeira e resina encostada a uma parede clara" },
      { handle: "bancadas", title: "Bancadas", alt: "Bancada de cozinha em madeira maciça com resina" },
    ],
  },

  ready: {
    label: "Prontas a entregar",
    title: ["Prontas a ", "entregar", "."] as Emphasis,
    intro:
      "Cada mesa existe numa única unidade. Quando é vendida, não volta a ser feita igual — a prancha de origem não se repete.",
    cta: "Ver todas as mesas",
  },

  product: {
    unique: "Peça única",
    sold: "Vendida",
    dimensions: "Medidas",
    wood: "Madeira",
    woodPrefix: "Madeira",
    add: "Adicionar ao carrinho",
    inCart: "No carrinho",
    ariaSold: (title: string) => `${title} — vendida`,
    ariaInCart: (title: string) => `${title} já está no carrinho — ver carrinho`,
    ariaAdd: (title: string) => `Adicionar ${title} ao carrinho`,
    imageOf: (i: number, n: number) => `Ver imagem ${i} de ${n}`,
  },

  cart: {
    title: "Carrinho",
    close: "Fechar carrinho",
    empty: "O seu carrinho está vazio.",
    emptyText: "Cada mesa da coleção é uma peça única, pronta a entregar.",
    browse: "Ver mesas prontas",
    unique: "Peça única",
    remove: "Remover",
    ariaRemove: (title: string) => `Remover ${title} do carrinho`,
    subtotal: "Subtotal",
    shippingNote: "Entrega e instalação calculadas no checkout.",
    checkout: "Finalizar compra",
  },

  guarantees: {
    label: "Garantias",
    items: [
      {
        icon: "truck" as GuaranteeIcon,
        title: "Entrega e instalação",
        text: "Entregamos e montamos cada peça em Portugal continental, com a nossa equipa.",
      },
      {
        icon: "shield" as GuaranteeIcon,
        title: "Garantia",
        text: "Garantia de [X] anos na estrutura e no acabamento, com manutenção acompanhada.",
      },
      {
        icon: "mark" as GuaranteeIcon,
        title: "Peça única",
        text: "Cada mesa existe uma só vez e segue com a ficha dos seus materiais.",
      },
    ],
  },

  bespoke: {
    label: "Sob medida",
    title: ["Desenhada para o ", "seu", " espaço."] as Emphasis,
    imageAlt: "Mesa de jantar por encomenda em nogueira, desenhada à medida de uma sala com janela corrida",
    intro:
      "Partimos das medidas, da luz e da forma como vive a divisão. Escolhe connosco a prancha, a madeira e o acabamento da resina — e recebe uma mesa que só existe na sua casa.",
    steps: [
      {
        title: "Conte-nos o espaço",
        text: "Medidas, utilização e referências. Pode enviar plantas ou fotografias da divisão.",
      },
      {
        title: "Proposta e amostras",
        text: "Desenho técnico, escolha da prancha e amostras de madeira e resina para aprovar.",
      },
      {
        title: "Produção e instalação",
        text: "A mesa é feita no ateliê e instalada por nós. Acompanha cada fase por fotografia.",
      },
    ],
    quote: "Pedir orçamento",
    whatsapp: "Falar no WhatsApp",
    professionals:
      "Arquitetos e designers de interiores: preparamos desenhos técnicos e amostras físicas para o seu projeto.",
  },

  materials: {
    label: "Materiais",
    title: ["A matéria ", "decide", "."] as Emphasis,
    intro:
      "Trabalhamos poucas madeiras, todas maciças e de origem controlada, e quatro acabamentos de resina pensados para as acompanhar — nunca para competir com elas.",
    woodsTitle: "Madeiras",
    resinsTitle: "Acabamentos de resina",
    woods: [
      { name: "Nogueira europeia", note: "Tom quente e veio expressivo. A nossa madeira de assinatura.", alt: "Amostra de nogueira europeia, macro do veio" },
      { name: "Carvalho", note: "Denso e estável, de grão aberto. Envelhece com dignidade.", alt: "Amostra de carvalho, macro do veio" },
      { name: "Castanho", note: "Madeira da tradição portuguesa, com nós e caráter.", alt: "Amostra de castanho com nó natural" },
      { name: "Freixo", note: "Claro e elástico, ideal para linhas finas e acabamentos naturais.", alt: "Amostra de freixo claro, macro do veio" },
    ],
    resins: [
      { name: "Branca", note: "Leitosa e translúcida. Deixa ver o que fica suspenso no interior.", alt: "Pinha suspensa em resina epóxi branca translúcida entre pranchas de madeira" },
      { name: "Azul", note: "Cor intensa, com profundidade, que se torna o centro da peça.", alt: "Resina epóxi azul com textura entre duas pranchas de madeira maciça" },
      { name: "Magenta", note: "Translúcida e vibrante, com textura visível em contraluz.", alt: "Faixa de resina epóxi magenta translúcida numa tábua de madeira clara" },
      { name: "Cor à medida", note: "Desenvolvemos a tonalidade consigo, a partir de amostras físicas.", alt: "Resina epóxi verde-água, exemplo de cor desenvolvida à medida" },
    ],
  },

  process: {
    label: "Processo artesanal",
    title: ["Do tronco à ", "mesa", "."] as Emphasis,
    intro: "Cinco etapas, todas feitas no ateliê pelas mesmas mãos. É um processo lento — e é por isso que as mesas duram.",
    step: "Etapa",
    steps: [
      {
        title: "Seleção da prancha",
        text: "Escolhemos cada prancha à mão, pelo veio, pelos nós e pela forma como a madeira cresceu.",
        alt: "Pranchas de nogueira empilhadas no armazém do ateliê",
      },
      {
        title: "Secagem e estabilização",
        text: "A madeira seca lentamente até ao teor de humidade certo, para não empenar em sua casa.",
        alt: "Pranchas em secagem com separadores de madeira entre camadas",
      },
      {
        title: "Corte e união",
        text: "Cortamos, aplainamos e unimos as pranchas, preservando o bordo vivo sempre que faz sentido.",
        alt: "Mãos a aplainar o bordo de uma prancha de carvalho",
      },
      {
        title: "Vazamento da resina",
        text: "A resina é vazada em camadas finas e cura durante dias, sem pressa, para ficar estável.",
        alt: "Artesão a remover bolhas da resina recém-vazada com pinhas e ramos de pinheiro no interior",
      },
      {
        title: "Acabamento e entrega",
        text: "Lixagem progressiva, óleo natural e inspeção final. Depois, instalamos a peça connosco.",
        alt: "Lixagem de uma tábua com resina magenta no ateliê",
      },
    ],
  },

  testimonials: {
    label: "Depoimentos",
    title: ["Quem ", "vive", " com elas."] as Emphasis,
    items: [
      {
        quote:
          "[Depoimento a inserir. Espaço para 30 a 50 palavras de um cliente particular sobre a escolha da peça, o acompanhamento do ateliê e a instalação em casa.]",
        name: "[Nome do cliente]",
        role: "Cliente particular · [Localidade]",
      },
      {
        quote:
          "[Depoimento a inserir. Espaço para 30 a 50 palavras de um gabinete de arquitetura sobre o rigor técnico, os desenhos e o cumprimento de prazos em obra.]",
        name: "[Nome]",
        role: "Arquitetura · [Gabinete]",
      },
      {
        quote:
          "[Depoimento a inserir. Espaço para 30 a 50 palavras de um estúdio de design de interiores sobre as amostras, a seleção da madeira e o resultado final.]",
        name: "[Nome]",
        role: "Design de interiores · [Estúdio]",
      },
    ],
  },

  atelier: {
    label: "O Ateliê",
    title: ["Pequeno, ", "por escolha", "."] as Emphasis,
    imageAlt: "Mesa com resina branca e pinhas em produção no ateliê, com o artesão ao fundo",
    paragraphs: [
      "Somos um ateliê de marcenaria em Portugal. Fazemos poucas mesas por ano, do primeiro corte ao último acabamento, para que cada uma tenha o tempo de que precisa.",
      "Trabalhamos com madeira maciça e resina como quem trabalha com pedra: a respeitar o que o material já é, e a intervir apenas onde é necessário.",
    ],
    founded: "Fundado em",
    foundedValue: "[Ano]",
    location: "Localização",
    locationValue: "[Localidade]",
    visit: "Visitar o ateliê, por marcação",
  },

  faq: {
    label: "Perguntas frequentes",
    title: ["Antes de ", "decidir", "."] as Emphasis,
    items: [
      {
        q: "Quanto tempo demora uma mesa por encomenda?",
        a: "Depende da peça e da madeira disponível. Como referência, contamos entre [X] e [Y] semanas desde a aprovação da proposta até à instalação. Indicamos sempre um prazo fechado no orçamento.",
      },
      {
        q: "As mesas prontas são mesmo peças únicas?",
        a: "Sim. Cada mesa da coleção pronta existe numa única unidade. Quando é vendida, sai da loja e não volta a ser feita igual, porque a prancha de origem não se repete.",
      },
      {
        q: "Fazem entrega e instalação fora de Portugal continental?",
        a: "Fazemos entrega e instalação com equipa própria em Portugal continental. Para as Ilhas e outros países, preparamos um orçamento de transporte à parte.",
      },
      {
        q: "A resina amarelece com o tempo?",
        a: "Usamos resinas com proteção UV, próprias para mobiliário. Mesmo assim, recomendamos evitar exposição solar direta e prolongada, como acontece com qualquer madeira maciça.",
      },
      {
        q: "Como devo cuidar da mesa?",
        a: "Basta um pano macio ligeiramente húmido para o dia a dia. Evite produtos abrasivos e utilize bases para objetos quentes. Cada mesa segue com um guia de cuidados e o óleo de manutenção.",
      },
      {
        q: "Trabalham com arquitetos e designers de interiores?",
        a: "Sim, com frequência. Preparamos desenhos técnicos, amostras físicas e acompanhamos a obra. Contacte-nos para conhecer as condições para profissionais.",
      },
      {
        q: "Posso visitar o ateliê?",
        a: "Pode, mediante marcação prévia. É a melhor forma de ver as pranchas disponíveis e escolher a madeira para a sua mesa.",
      },
    ],
  },

  cta: {
    label: "Contacto",
    title: ["Comece pela ", "conversa", "."] as Emphasis,
    newsletter: "Newsletter",
    newsletterText: "Novas peças, antes de chegarem à loja. Sem frequência fixa, sem ruído.",
    emailLabel: "Endereço de email",
    emailPlaceholder: "O seu email",
    subscribe: "Subscrever",
    ok: "Obrigado. Receberá a próxima peça em primeira mão.",
    error: "Introduza um endereço de email válido.",
    consent: "Ao subscrever, aceita a Política de Privacidade. Pode cancelar a qualquer momento.",
    talkTitle: "Prefere falar já?",
    talkText: "Envie-nos as medidas do espaço ou uma fotografia — respondemos pelo WhatsApp.",
    whatsapp: "Falar no WhatsApp",
  },

  notFound: {
    eyebrow: "Em preparação",
    title: ["Esta página ainda está a ser ", "feita", "."] as Emphasis,
    back: "Voltar à página inicial",
  },
};

export type Dictionary = typeof pt;
