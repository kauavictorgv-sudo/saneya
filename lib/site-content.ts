export const siteLinks = {
  email: "saneyaambiental@gmail.com",
  whatsapp: "https://wa.me/5521997949067",
  instagram: "https://www.instagram.com/saneyaambiental/",
  linkedin: "https://www.linkedin.com/company/saney%C3%A1",
  tiktok: "https://www.tiktok.com/@saneyaambiental",
  institutionalSource:
    "https://cefet-rj.br/attachments/article/2410/RG2025_19-3-26_compressed.pdf",
} as const;

export const environmentalServices = [
  {
    id: "servico-mutiroes-praia",
    title: "Mutirões de limpeza de praia",
    items: [
      "Dinâmicas de educação ambiental",
      "Aluguel de equipamentos de proteção individual e estrutura física",
      "Guarda-volumes",
      "Pesagem e destinação correta",
      "Coffee break",
    ],
  },
  {
    id: "servico-workshop-reciclagem",
    title: "Workshop de reciclagem",
    items: [
      "Reflexões sobre consumo",
      "Resíduo x rejeito",
      "Como melhorar os padrões de descarte",
      "Dinâmica de educação ambiental",
      "Coffee break",
    ],
  },
] as const;

export const serviceNavigation = [
  {
    label: "Bacia de Evapotranspiração",
    href: "/#servico-bet",
    description: "Tratamento descentralizado de águas negras.",
  },
  {
    label: "Captação de água da chuva",
    href: "/#servico-cac",
    description: "Aproveitamento planejado para usos não potáveis.",
  },
  {
    label: "Workshop de reciclagem",
    href: "/#servico-workshop-reciclagem",
    description: "Reflexões sobre consumo e descarte responsável.",
  },
] as const;

export const navigation = [
  { label: "Sobre o Saneyá", href: "/#sobre-saneya" },
  { label: "Soluções", href: "/#solucoes" },
  {
    label: "Serviços",
    href: "/#solucoes",
    children: serviceNavigation,
  },
  { label: "Impacto", href: "/#impacto" },
  { label: "Contratação", href: "/#contratacao" },
] as const;

export const trustSignals = [
  {
    eyebrow: "Atuação territorial",
    title: "Saneyá Ambiental",
  },
  {
    eyebrow: "Entrega acompanhada",
    title: "Da triagem ao monitoramento",
  },
  {
    eyebrow: "Transparência",
    title: "Impacto com fonte e método",
  },
] as const;

export const processSteps = [
  {
    title: "Escuta e triagem",
    description: "Entendemos a necessidade, o contexto e os responsáveis locais.",
  },
  {
    title: "Visita técnica",
    description: "Avaliamos terreno, instalações e elegibilidade da solução.",
  },
  {
    title: "Plano técnico e acordo",
    description: "Definimos custos, prazos, riscos e responsabilidades.",
  },
  {
    title: "Implantação",
    description: "Construímos com participação local e verificação técnica.",
  },
  {
    title: "Capacitação",
    description: "Preparamos responsáveis locais para operação e manutenção.",
  },
  {
    title: "Monitoramento",
    description: "Registramos inspeções, incidentes e aprendizados.",
  },
] as const;

export const faqItems = [
  {
    question: "Como contratar uma solução da Saneyá?",
    answer:
      "Preencha o pedido de atendimento e clique em Enviar pedido de atendimento. O site encaminha os dados ao e-mail da Saneyá e informa o resultado do envio. A equipe avalia o contexto e responde pelo e-mail informado. O pedido não confirma contratação ou implantação.",
  },
  {
    question: "Uma BET serve para qualquer local?",
    answer:
      "Não. A instalação depende de avaliação técnica do terreno, das instalações hidráulicas, da ocupação, das condições ambientais e das responsabilidades de manutenção. A triagem existe justamente para evitar prometer uma solução inadequada.",
  },
  {
    question: "Quem projeta e responde tecnicamente pela instalação?",
    answer:
      "Cada implantação deve ser revisada e acompanhada por profissional habilitado, com a documentação técnica aplicável. Os responsáveis serão identificados antes do início da obra.",
  },
  {
    question: "Como funcionam a manutenção e o acompanhamento?",
    answer:
      "A entrega inclui capacitação de responsáveis locais, orientações de operação e inspeções programadas. A periodicidade final depende do planejamento técnico e do plano de acompanhamento de cada unidade.",
  },
  {
    question: "Como o impacto é calculado?",
    answer:
      "Os indicadores devem informar fonte, período, fórmula e tipo do dado. Capacidade projetada, estimativa e medição real não são apresentadas como se fossem a mesma coisa.",
  },
  {
    question: "A água captada pela CAC é potável?",
    answer:
      "Não. A CAC é apresentada para usos não potáveis definidos no planejamento técnico. Dimensionamento, qualidade da água, proteção contra vetores e manutenção precisam ser adequados ao uso previsto.",
  },
] as const;
