export type LandingVariant = "premium" | "popular" | "finpay";

type Feature = {
  title: string;
  description: string;
};

export const contact = {
  phoneDisplay: "(92) 98207-0621",
  phoneHref: "tel:+5592982070621",
  whatsappHref:
    "https://wa.me/5592982070621?text=Ol%C3%A1%2C%20quero%20um%20or%C3%A7amento%20para%20higieniza%C3%A7%C3%A3o%20do%20meu%20ar-condicionado.",
  mailchimpAction:
    "https://splitlimpo.us4.list-manage.com/subscribe/post?u=f4a0c3fa813cccab119d2f786&id=ee258a6fcf",
  googleProfileUrl: "https://share.google/eMgo9EjiWIbtPpGRU",
  instagramUrl: "https://www.instagram.com/splitlimpo_limpezasplit",
  address: "Av. Des. João Machado, 136 - Alvorada, Manaus - AM",
};

export const shared = {
  brand: "Split Limpo",
  area: "Manaus e região",
  youtubeUrl: "https://www.youtube.com/watch?v=0XrJlBXPick",
  youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/0XrJlBXPick?rel=0",
  rating: "5.0",
  reviewCount: "326",
  futureAssets: [
    {
      title: "Técnico em atendimento",
      description: "Foto real da equipe executando a higienização no local.",
      ratio: "aspect-[4/5]",
    },
    {
      title: "Antes e depois",
      description: "Comparativo visual da evaporadora antes e depois da limpeza.",
      ratio: "aspect-[4/3]",
    },
    {
      title: "Proteção do ambiente",
      description: "Registro da proteção usada para evitar sujeira no espaço do cliente.",
      ratio: "aspect-[16/10]",
    },
    {
      title: "Equipamento Jet Split",
      description: "Foto do equipamento e dos materiais usados no processo.",
      ratio: "aspect-[4/3]",
    },
    {
      title: "Avaliações do Google",
      description: "Cards com reviews reais e recentes do perfil da empresa.",
      ratio: "aspect-[16/9]",
    },
    {
      title: "Conteúdo do Instagram",
      description: "Espaço para reels, bastidores e serviços publicados no perfil.",
      ratio: "aspect-[9/16]",
    },
  ],
  finPayReviews: [
    {
      name: "Elienai Tavares",
      role: "Google - 1 semana atrás",
      quote:
        "Eles foram excelentes, meu ar quase não gelava e depois da limpeza da Split Limpo, meu ar condicionado ficou maravilhoso.",
    },
    {
      name: "Alysson Avlis",
      role: "Google - 2 semanas atrás",
      quote:
        "Sr. Lima, um excelente profissional, o melhor que já vi na cidade de Manaus! Prestativo, atencioso, organizado e super profissional! Super recomendo!",
    },
    {
      name: "Adriano Passos",
      role: "Local Guide - Google",
      quote:
        "Empresa que atende com comprometimento, pontualidade, organização e praticidade. Nossos aparelhos ficaram perfeitamente limpos, sem dor de cabeça ou bagunça.",
    },
    {
      name: "Antonio Hidaka",
      role: "Local Guide - Google",
      quote:
        "Muito boa a higienização dos ares-condicionados. Serviço diferente e bem feito. E agora tenho de quem pedir para fazer novamente a limpeza do equipamento!",
    },
  ],
  pains: [
    "O split já não gela como antes",
    "Água escorre pela evaporadora",
    "Cheiro ruim ou poeira ao ligar",
    "Conta de energia subindo sem explicação",
  ],
  process: [
    {
      title: "Proteção do ambiente",
      description:
        "Isolamos a área de trabalho para a sujeira sair do aparelho sem virar bagunça na casa ou empresa.",
    },
    {
      title: "Lavagem no local",
      description:
        "A limpeza acontece com o split instalado na parede, reduzindo desmontagem desnecessária e risco de retrabalho.",
    },
    {
      title: "Finalização e teste",
      description:
        "Depois da higienização, o aparelho é revisado e ligado para conferir funcionamento, drenagem e fluxo de ar.",
    },
  ],
  faqs: [
    {
      question: "A limpeza precisa retirar o ar da parede?",
      answer:
        "Não. A proposta da Split Limpo é realizar a higienização no local de instalação, usando proteção e técnica adequada para evitar desmontagem desnecessária.",
    },
    {
      question: "Quanto tempo demora o atendimento?",
      answer:
        "A maior parte dos atendimentos leva cerca de 1 hora a 1 hora e meia por aparelho, dependendo do estado de sujeira e acesso ao equipamento.",
    },
    {
      question: "A limpeza ajuda o ar a gelar melhor?",
      answer:
        "Ajuda quando a perda de desempenho está ligada ao acúmulo de sujeira. A higienização melhora o fluxo de ar e ajuda o split a trabalhar com mais eficiência.",
    },
    {
      question: "Vocês atendem pelo WhatsApp?",
      answer:
        "Sim. O WhatsApp é o caminho mais rápido para enviar informações do aparelho, tirar dúvidas e solicitar orçamento.",
    },
  ],
};

export const variants: Record<
  LandingVariant,
  {
    path: string;
    title: string;
    description: string;
    eyebrow: string;
    heroTitle: string;
    heroLead: string;
    primaryCta: string;
    secondaryCta: string;
    proof: string[];
    trust: Feature[];
    benefits: Feature[];
    finalTitle: string;
    finalLead: string;
  }
> = {
  premium: {
    path: "/v2/premium/",
    title: "Split Limpo | Higienização Técnica de Ar-Condicionado Split",
    description:
      "Higienização técnica de ar-condicionado split no local de instalação, sem remover o equipamento da parede.",
    eyebrow: "Tecnologia Jet Split",
    heroTitle:
      "Higienização técnica de split no local, sem remover o equipamento",
    heroLead:
      "Um processo profissional para restaurar desempenho, reduzir sujeira interna e preservar o aparelho com mais segurança.",
    primaryCta: "Solicitar avaliação",
    secondaryCta: "Ver o processo",
    proof: ["Método no local", "Sem retirada da parede", "Atendimento em Manaus"],
    trust: [
      {
        title: "Processo controlado",
        description: "Proteção do ambiente, lavagem guiada e teste final do equipamento.",
      },
      {
        title: "Menos desmontagem",
        description: "A técnica reduz remoções desnecessárias e preserva a instalação existente.",
      },
      {
        title: "Foco em eficiência",
        description: "A limpeza melhora fluxo de ar e ajuda o split a trabalhar com menos esforço.",
      },
    ],
    benefits: [
      {
        title: "Higiene visível",
        description: "Remoção de sujeira acumulada na evaporadora, serpentinas e saída de ar.",
      },
      {
        title: "Ambiente protegido",
        description: "A limpeza é feita com cuidado para conter resíduos e evitar sujeira no local.",
      },
      {
        title: "Mais vida útil",
        description: "Manutenção regular ajuda a preservar componentes e desempenho do aparelho.",
      },
    ],
    finalTitle: "Deixe seu split limpo com um processo mais profissional",
    finalLead:
      "Envie uma mensagem, informe o modelo do aparelho e receba orientação para agendar a higienização.",
  },
  popular: {
    path: "/v2/popular/",
    title: "Split Limpo | Limpeza de Ar-Condicionado Split em Manaus",
    description:
      "Limpeza de ar-condicionado split no local, com atendimento rápido por WhatsApp em Manaus e região.",
    eyebrow: "Limpeza prática pelo WhatsApp",
    heroTitle: "Seu ar volta a gelar sem bagunça e sem tirar da parede",
    heroLead:
      "Atendimento rápido, limpeza no local e orçamento fácil pelo WhatsApp para você resolver sem perder o dia.",
    primaryCta: "Pedir orçamento no WhatsApp",
    secondaryCta: "Tirar dúvidas",
    proof: ["Orçamento rápido", "Limpeza sem bagunça", "Contato direto"],
    trust: [
      {
        title: "Chame no WhatsApp",
        description: "Envie uma foto do aparelho e receba orientação para o atendimento.",
      },
      {
        title: "Sem perder o dia",
        description: "O serviço costuma levar de 1 hora a 1 hora e meia por aparelho.",
      },
      {
        title: "Mais conforto",
        description: "Menos cheiro, menos poeira e melhor fluxo de ar para o ambiente.",
      },
    ],
    benefits: [
      {
        title: "Gela melhor",
        description: "A sujeira acumulada bloqueia o ar. Limpar ajuda o split a render mais.",
      },
      {
        title: "Evita vazamento",
        description: "A higienização ajuda a reduzir problemas ligados a drenagem e acúmulo de resíduos.",
      },
      {
        title: "Ajuda na economia",
        description: "Com menos obstrução, o aparelho trabalha com menos esforço no dia a dia.",
      },
    ],
    finalTitle: "Resolva a limpeza do seu ar hoje pelo WhatsApp",
    finalLead:
      "Fale com a Split Limpo, tire suas dúvidas e solicite um orçamento para o seu aparelho.",
  },
  finpay: {
    path: "/v2/fin-pay/",
    title: "Split Limpo | Limpeza Técnica de Split em Manaus",
    description:
      "Landing premium clara da Split Limpo para limpeza técnica de ar-condicionado split no local, com prova Google, vídeo e antes/depois.",
    eyebrow: "Limpeza técnica no local",
    heroTitle: "Limpeza de split sem tirar o aparelho da parede",
    heroLead:
      "Higienização profunda com tecnologia Jet Split, proteção do ambiente e atendimento especializado em Manaus.",
    primaryCta: "Pedir orçamento no WhatsApp",
    secondaryCta: "Ver antes e depois",
    proof: ["5.0 no Google", "326 avaliações", "Manaus e região"],
    trust: [
      {
        title: "Tecnologia Jet Split",
        description: "Limpeza profunda no local, sem remover o aparelho da parede.",
      },
      {
        title: "Ambiente protegido",
        description: "Processo pensado para reduzir sujeira e transtorno durante o serviço.",
      },
      {
        title: "Resultado visível",
        description: "Antes e depois mostra o impacto da higienização interna.",
      },
    ],
    benefits: [
      {
        title: "Limpeza profunda",
        description: "Remove sujeira acumulada na evaporadora, saída de ar e componentes internos.",
      },
      {
        title: "Sem desmontagem desnecessária",
        description: "O atendimento acontece no local de instalação com técnica apropriada.",
      },
      {
        title: "Mais conforto no uso",
        description: "Ajuda a melhorar fluxo de ar, reduzir mau cheiro e preservar o aparelho.",
      },
    ],
    finalTitle: "Quer ver seu split limpo desse jeito?",
    finalLead:
      "Envie uma foto do aparelho pelo WhatsApp e receba orientação para o orçamento.",
  },
};
