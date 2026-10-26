export type PageId =
  | 'inicio'
  | 'os-monstros'
  | 'o-spam'
  | 'o-disparo-em-massa'
  | 'o-desconhecido'
  | 'a-aranha-dos-links'
  | 'o-bloqueio-em-massa'
  | 'o-numero-fantasma'
  | 'freddy-krueger';

export interface SidebarSection {
  title: string;
  items: Array<{
    id: PageId;
    label: string;
  }>;
}

export interface TestimonialItem {
  name: string;
  location: string;
  quote: string;
  badge: string;
  isMysteryIdentity?: boolean;
  hasHelpfulPrompt?: boolean;
}

export interface TestimonialsMeta {
  subtitle: string;
  disclaimer: string;
  ratingSummary?: {
    score: string;
    totalCount: string;
    subtext: string;
  };
}

export interface MonsterHeroData {
  gifSrc: string;
  title: string;
  subtitle: string;
  badge?: string;
  contentPosition?: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center-left' | 'center';
}

export interface MonsterPageData {
  id: PageId;
  sectionLabel: string;
  title: string;
  quote: string;
  description: string;
  hero?: MonsterHeroData;
  videoTitle: string;
  videoSubtitle?: string;
  videoDuration: string;
  videoFilePlaceholder: string;
  thumbnailTheme: {
    codeLabel: string;
    metricLabel: string;
    metricValue: string;
    accentColor: 'green' | 'red' | 'purple' | 'zinc';
    terminalPreview: string[];
  };
  procedure: string[];
  expectedResult: {
    green: string;
    yellow: string;
    red: string;
  };
  showDiscreteSpider?: boolean;
  testimonialsMeta?: TestimonialsMeta;
  testimonials?: TestimonialItem[];
}

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: 'INTRODUÇÃO',
    items: [
      { id: 'inicio', label: 'Início' },
      { id: 'os-monstros', label: 'Os Monstros' }
    ]
  },
  {
    title: 'MONSTROS',
    items: [
      { id: 'o-spam', label: 'O Spam' },
      { id: 'o-disparo-em-massa', label: 'O Disparo em Massa' },
      { id: 'o-desconhecido', label: 'O Desconhecido' },
      { id: 'a-aranha-dos-links', label: 'A Aranha dos Links' },
      { id: 'o-bloqueio-em-massa', label: 'O Bloqueio em Massa' },
      { id: 'o-numero-fantasma', label: 'O Número Fantasma' }
    ]
  },
  {
    title: 'FINAL',
    items: [
      { id: 'freddy-krueger', label: 'Freddy Krueger' }
    ]
  }
];

export const PAGE_ORDER: PageId[] = [
  'inicio',
  'os-monstros',
  'o-spam',
  'o-disparo-em-massa',
  'o-desconhecido',
  'a-aranha-dos-links',
  'o-bloqueio-em-massa',
  'o-numero-fantasma',
  'freddy-krueger'
];

export const MONSTER_PAGES: Record<string, MonsterPageData> = {
  'o-spam': {
    id: 'o-spam',
    sectionLabel: 'MONSTROS / 01',
    title: 'O Spam',
    quote: '“Se o cliente não respondeu nas primeiras treze tentativas, claramente ele só não viu a décima quarta.”',
    description:
      'O Spam atua na repetição contínua de mensagens idênticas em curtos intervalos de tempo. Sua principal característica técnica é ignorar completamente a ausência de resposta do destinatário e continuar enviando lembretes urgentes até que o botão de denúncia seja acionado.',
    hero: {
      gifSrc: 'halloween/spam_page.gif',
      title: 'O MONSTRO DO SPAM',
      subtitle: 'Ele não manda mensagem. Ele manda TODAS.',
      badge: 'Halloween Edition • Monstros / 01',
      contentPosition: 'bottom-left'
    },
    videoTitle: 'Como mandar a mesma mensagem até alguém denunciar você',
    videoDuration: '01:48',
    videoFilePlaceholder: '/videos/o-spam.mp4',
    thumbnailTheme: {
      codeLabel: 'MOD-01 // RETRY_LOOP_INFINITO',
      metricLabel: 'Mensagens repetidas / min',
      metricValue: '14x sem resposta',
      accentColor: 'red',
      terminalPreview: [
        'POST /v1/messages/send -> "ÚLTIMA CHANCE!!!" (tentativa 12)',
        'POST /v1/messages/send -> "ÚLTIMA CHANCE!!!" (tentativa 13)',
        'WARN: Destinatário clicou em Denunciar Spam'
      ]
    },
    procedure: [
      'Copie exatamente o mesmo texto promocional em caixa alta.',
      'Envie para o contato sem aguardar interação prévia.',
      'Caso ele visualize e não responda em dois minutos, envie novamente.',
      'Ignore solicitações de parada e adicione mais pontos de exclamação.',
      'Repita o processo até o número perder a conexão.'
    ],
    expectedResult: {
      green: 'Primeira mensagem entregue',
      yellow: 'Destinatário irritado na quinta repetição',
      red: 'Conta denunciada e restrita por spam'
    },
    testimonialsMeta: {
      subtitle: 'Resultados reais de pessoas que aparentemente não aprenderam nada.',
      disclaimer:
        '⚠️ Depoimentos 100% fictícios. Nenhum dos personagens acima realmente realizou o treinamento. Os números utilizados nos exemplos também não existem.'
    },
    testimonials: [
      {
        name: 'Michael Scott',
        location: 'Scranton, PA',
        quote:
          '“Meu número durou 11 dias. Antes do treinamento, eu achava que isso era pouco. Depois do treinamento, percebi que poderia ter durado 11 minutos.”',
        badge: 'Aluno extremamente confiante'
      },
      {
        name: 'Seu Madruga',
        location: 'Vila do Chaves',
        quote:
          '“Depois do curso fui bloqueado em tempo recorde. Agora estou devendo até explicações para o suporte.”',
        badge: 'Resultado acima da média'
      },
      {
        name: 'Darth Vader',
        location: 'Estrela da Morte',
        quote:
          '“Excelente metodologia. Enviei a mesma mensagem 47 vezes. O usuário bloqueou meu número antes que eu pudesse concluir o treinamento.”',
        badge: 'Aluno avançado'
      },
      {
        name: 'Freddy Krueger',
        location: 'Elm Street',
        quote:
          '“Finalmente encontrei um treinamento capaz de transformar um simples atendimento em um verdadeiro pesadelo.”',
        badge: 'Especialista em terror'
      },
      {
        name: 'Bob Esponja',
        location: 'Fenda do Biquíni',
        quote:
          '“Eu mandei ‘ÚLTIMA CHANCE!!!’ tantas vezes que até o Patrick me bloqueou.”',
        badge: 'Aluno persistente'
      },
      {
        name: 'Coringa',
        location: 'Gotham City',
        quote:
          '“Antes eu simplesmente mandava spam. Agora faço isso com metodologia.”',
        badge: 'Aluno certificado'
      },
      {
        name: 'Professor Girafales',
        location: 'Vila do Chaves',
        quote:
          '“Minha turma recebeu 386 mensagens antes do intervalo. Considero um excelente resultado pedagógico.”',
        badge: 'Instrutor convidado'
      },
      {
        name: 'Jack Sparrow',
        location: 'Caribe',
        quote:
          '“Meu número desapareceu misteriosamente. Não sei como aconteceu. Mas definitivamente não foi culpa minha.”',
        badge: 'Caso não solucionado'
      }
    ]
  },

  'o-disparo-em-massa': {
    id: 'o-disparo-em-massa',
    sectionLabel: 'MONSTROS / 02',
    title: 'O Disparo em Massa',
    quote: '“Para que conversar com um cliente por vez se você pode importunar cinquenta mil no mesmo segundo?”',
    description:
      'Responsável por submeter listas gigantescas de contatos sem consentimento prévio a fluxos simultâneos de envio. O Disparo em Massa opera sob a premissa de que limites de frequência e boas práticas são apenas sugestões opcionais.',
    videoTitle: 'Como enviar milhares de mensagens e fingir que foi uma coincidência',
    videoDuration: '02:15',
    videoFilePlaceholder: '/videos/o-disparo-em-massa.mp4',
    thumbnailTheme: {
      codeLabel: 'MOD-02 // BULK_NO_OPTIN',
      metricLabel: 'Lote de envio simultâneo',
      metricValue: '50.000 contatos',
      accentColor: 'purple',
      terminalPreview: [
        'LOAD planilha_contatos_2018_final.csv (50.000 linhas)',
        'CONFIG delay_between_messages = 0ms',
        'ALERT: Taxa de envio incompatível com comportamento humano'
      ]
    },
    procedure: [
      'Importe uma planilha antiga com milhares de números desconhecidos.',
      'Desative qualquer intervalo de segurança entre os envios.',
      'Dispare a mesma campanha para toda a base de uma só vez.',
      'Não verifique se os contatos autorizaram o recebimento.',
      'Quando o número cair, informe ao suporte que estava apenas testando.'
    ],
    expectedResult: {
      green: 'Campanha iniciada em velocidade máxima',
      yellow: 'Fila de envio congestionada e alerta de anomalia',
      red: 'Banimento imediato por automação abusiva'
    },
    testimonialsMeta: {
      subtitle: 'Milhares de mensagens. Centenas de bloqueios. Um único sonho.',
      ratingSummary: {
        score: '4,9 / 5',
        totalCount: '48.732 avaliações',
        subtext: '48.731 foram enviadas ao mesmo tempo.'
      },
      disclaimer:
        '⚠️ Depoimentos fictícios. Resultados podem variar dependendo da velocidade com que seu número for bloqueado.'
    },
    testimonials: [
      {
        name: 'Thanos',
        location: 'Titã',
        quote:
          '“Antes eu precisava estalar os dedos. Agora consigo atingir metade da população com apenas um disparo.”',
        badge: '50% de alcance'
      },
      {
        name: 'Buzz Lightyear',
        location: 'Comando Estelar',
        quote:
          '“Antes eu disparava para alguns contatos. Agora é ao infinito e além.”',
        badge: 'Sem limite conhecido'
      },
      {
        name: 'Dom Toretto',
        location: 'Los Angeles',
        quote:
          '“Não importa se são 10 contatos ou 10 mil contatos. O importante é disparar em família.”',
        badge: 'Disparo em família'
      },
      {
        name: 'Ash Ketchum',
        location: 'Pallet',
        quote:
          '“Meu objetivo sempre foi alcançar todos. Finalmente consegui. Infelizmente, todos me bloquearam.”',
        badge: 'Temos que enviar'
      },
      {
        name: 'Sonic',
        location: 'Green Hill',
        quote:
          '“10.000 mensagens em poucos segundos. Achei rápido. O bloqueio foi mais rápido.”',
        badge: 'Novo recorde'
      },
      {
        name: 'Gru',
        location: 'Laboratório Secreto',
        quote:
          '“Meus Minions selecionaram ‘Enviar para todos’. Pela primeira vez, eles executaram o plano perfeitamente.”',
        badge: 'Plano executado'
      },
      {
        name: 'Walter White',
        location: 'Albuquerque',
        quote:
          '“Precisávamos aumentar a distribuição. A distribuição aumentou. As denúncias também.”',
        badge: 'Especialista em distribuição'
      },
      {
        name: 'Flash',
        location: 'Central City',
        quote:
          '“Enviei 30 mil mensagens antes do sistema perceber. Por aproximadamente quatro segundos me senti imparável.”',
        badge: 'Performance excepcional'
      }
    ]
  },

  'o-desconhecido': {
    id: 'o-desconhecido',
    sectionLabel: 'MONSTROS / 03',
    title: 'O Desconhecido',
    quote: '“Um chip recém-ativado e o desejo sincero de conversar com metade do país no primeiro dia.”',
    description:
      'O Desconhecido manifesta-se quando um número sem nenhum histórico de conversas, sem foto de perfil e recém-cadastrado decide iniciar centenas de atendimentos ativos com pessoas que nunca salvaram seu contato na agenda.',
    videoTitle: 'Como usar um número novo e imediatamente falar com milhares de pessoas',
    videoDuration: '01:54',
    videoFilePlaceholder: '/videos/o-desconhecido.mp4',
    thumbnailTheme: {
      codeLabel: 'MOD-03 // COLD_CHIP_SPEEDRUN',
      metricLabel: 'Idade do número conectado',
      metricValue: '12 minutos',
      accentColor: 'green',
      terminalPreview: [
        'STATUS: Chip ativado há 00h12m',
        'REPUTATION_SCORE: Inexistente (0 interações recebidas)',
        'ACTION: Iniciando 1.800 conversas com desconhecidos'
      ]
    },
    procedure: [
      'Adquira um chip novo e conecte-o imediatamente.',
      'Pule qualquer etapa de aquecimento ou conversa natural.',
      'Envie mensagens para contatos que não possuem seu número salvo.',
      'Receba dezenas de respostas perguntando “quem é você?”.',
      'Continue enviando até o filtro de segurança interromper a sessão.'
    ],
    expectedResult: {
      green: 'Chip novo conectado com sucesso',
      yellow: 'Destinatários clicando em “Não conheço este contato”',
      red: 'Número bloqueado antes de completar uma hora de vida'
    },
    testimonialsMeta: {
      subtitle: 'Eles não sabem quem você é. E esse é exatamente o objetivo.',
      ratingSummary: {
        score: '5,0 / 5',
        totalCount: '??? avaliações',
        subtext: 'Não sabemos quem avaliou.'
      },
      disclaimer:
        '⚠️ Depoimentos fictícios. Caso reconheça algum dos avaliadores, favor não informar. Eles preferem continuar desconhecidos.'
    },
    testimonials: [
      {
        name: 'Batman',
        location: 'Gotham City',
        quote:
          '“Trabalho no anonimato há anos. Mesmo assim, até eu achei estranho mandar mensagem para alguém que nunca falou comigo.”',
        badge: 'Identidade protegida'
      },
      {
        name: 'John Cena',
        location: 'West Newbury',
        quote:
          '“Eles não conseguem me ver. Agora também não conseguem descobrir de onde veio a mensagem.”',
        badge: 'Contato não identificado'
      },
      {
        name: 'Scooby-Doo',
        location: 'Máquina de Mistério',
        quote:
          '“Recebi uma mensagem de um número desconhecido. Depois de investigar, descobri que era eu mesmo.”',
        badge: 'Mistério solucionado'
      },
      {
        name: 'Agente 47',
        location: 'Localização desconhecida',
        quote:
          '“Número novo. Nenhum histórico. Nenhuma conversa anterior. Exatamente como eu gosto.”',
        badge: 'Operação silenciosa'
      },
      {
        name: 'Homem-Aranha',
        location: 'Queens',
        quote:
          '“Meu sentido aranha disparou quando apareceu ‘número desconhecido’. Ignorei. Cinco minutos depois chegaram mais oito mensagens.”',
        badge: 'Perigo detectado'
      },
      {
        name: 'Sherlock Holmes',
        location: 'Baker Street',
        quote:
          '“Analisei todas as evidências. Não havia conversa anterior, apresentação ou contexto. Elementar: bloqueei.”',
        badge: 'Caso encerrado'
      },
      {
        name: 'Wandinha Addams',
        location: 'Nevermore',
        quote:
          '“Uma pessoa desconhecida apareceu sem ser convidada e começou a mandar mensagens. Finalmente alguém com habilidades sociais piores que as minhas.”',
        badge: 'Socialmente aprovado'
      },
      {
        name: 'Ghostface',
        location: 'Woodsboro',
        quote:
          '“Perguntei ‘qual é o seu filme de terror favorito?’. A pessoa respondeu ‘quem é?’. Nunca me senti tão profissional.”',
        badge: 'Número confidencial'
      },
      {
        name: 'Desconhecido',
        location: 'Localização: desconhecida',
        quote:
          '“Enviei uma mensagem sem foto, sem nome e sem contexto. Quando perguntaram ‘quem está falando?’, visualizei e não respondi.”',
        badge: 'Remetente oculto',
        isMysteryIdentity: true
      }
    ]
  },

  'a-aranha-dos-links': {
    id: 'a-aranha-dos-links',
    sectionLabel: 'MONSTROS / 04',
    title: '🕷️ A Aranha dos Links',
    quote: '“Todo número tem um limite. Alguns links também.”',
    description:
      'Especialista em tecer URLs encurtadas, redirecionamentos em cascata e domínios recém-registrados dentro de mensagens comerciais. A Aranha dos Links transforma comunicações comuns em alertas críticos de segurança para os filtros de verificação.',
    videoTitle: 'Como transformar qualquer mensagem em uma coleção de URLs',
    videoSubtitle: 'Como aumentar suas chances de banimento usando links',
    videoDuration: '02:04',
    videoFilePlaceholder: '/videos/a-aranha-dos-links.mp4',
    thumbnailTheme: {
      codeLabel: 'MOD-04 // SUSPICIOUS_URL_WEB',
      metricLabel: 'Redirecionamentos detectados',
      metricValue: 'bit.ly → .xyz → .biz',
      accentColor: 'red',
      terminalPreview: [
        'SCANNING payload: "Acesse já http://bit.ly/super-confiavel"',
        'REDIRECT_CHAIN: 4 saltos para domínio sem reputação',
        'CRITICAL: Assinatura de link suspeito confirmada'
      ]
    },
    procedure: [
      'Envie um link.',
      'Envie outro.',
      'Utilize um encurtador.',
      'Envie novamente.',
      'Não espere o usuário pedir.'
    ],
    expectedResult: {
      green: 'Link enviado',
      yellow: 'Usuário desconfiado',
      red: 'Número comprometido'
    },
    showDiscreteSpider: true,
    testimonialsMeta: {
      subtitle: 'Um clique pode mudar tudo. Geralmente para pior.',
      ratingSummary: {
        score: '4,9 / 5',
        totalCount: '6.666 avaliações',
        subtext: 'Todas vieram do mesmo link.'
      },
      disclaimer:
        '⚠️ Depoimentos fictícios. A Aranha dos Links recomenda não clicar em absolutamente nada nesta página. Inclusive neste aviso.'
    },
    testimonials: [
      {
        name: 'Peter Parker',
        location: 'Queens',
        quote:
          '“Passei anos aprendendo que com grandes poderes vêm grandes responsabilidades. Ninguém falou nada sobre grandes quantidades de links.”',
        badge: 'Especialista em teias'
      },
      {
        name: 'Mario',
        location: 'Reino dos Cogumelos',
        quote:
          '“Cliquei achando que tinha uma princesa do outro lado. Fui redirecionado sete vezes e terminei numa página de promoção.”',
        badge: 'Obrigado, Mario! Mas seu link está em outro domínio'
      },
      {
        name: 'Neo',
        location: 'Matrix',
        quote:
          '“Morpheus me ofereceu duas opções: a pílula azul e a vermelha. Cliquei num bit.ly que apareceu do lado.”',
        badge: 'Escolha questionável'
      },
      {
        name: 'Indiana Jones',
        location: 'Localização desconhecida',
        quote:
          '“Já entrei em templos amaldiçoados, fugi de pedras gigantes e procurei artefatos perdidos. Mesmo assim, eu não clicaria nesse link.”',
        badge: 'Perigo arqueológico'
      },
      {
        name: 'Link',
        location: 'Hyrule',
        quote:
          '“Passei a vida inteira sendo chamado de Link. Finalmente encontrei um lugar onde isso é considerado uma ameaça.”',
        badge: 'O próprio Link'
      },
      {
        name: 'Gollum',
        location: 'Terra-média',
        quote:
          '“Meu precioso... bit.ly/ganhe-agora. Cliquei 37 vezes. Ainda estou aguardando meu prêmio.”',
        badge: 'Link precioso'
      },
      {
        name: 'Deadpool',
        location: 'Localização censurada',
        quote:
          '“O endereço terminava em .xyz, tinha seis redirecionamentos e dizia ‘100% seguro’. Obviamente eu cliquei.”',
        badge: 'Usuário consciente',
        hasHelpfulPrompt: true
      },
      {
        name: 'Dora, a Aventureira',
        location: 'Localização não encontrada',
        quote: '“Você consegue encontrar o link confiável?”\n“...”\n“EU TAMBÉM NÃO!”',
        badge: 'Exploradora de URLs'
      }
    ]
  },

  'o-bloqueio-em-massa': {
    id: 'o-bloqueio-em-massa',
    sectionLabel: 'MONSTROS / 05',
    title: 'O Bloqueio em Massa',
    quote: '“Colecionar bloqueios de clientes nunca foi tão rápido e eficiente.”',
    description:
      'O Bloqueio em Massa ocorre quando a abordagem enviada é tão invasiva ou fora de contexto que a reação imediata da maioria dos destinatários é bloquear o remetente nos primeiros segundos de leitura.',
    videoTitle: 'Como conseguir o maior número possível de bloqueios',
    videoDuration: '01:59',
    videoFilePlaceholder: '/videos/o-bloqueio-em-massa.mp4',
    thumbnailTheme: {
      codeLabel: 'MOD-05 // MASS_BLOCK_COLLECTOR',
      metricLabel: 'Taxa de bloqueio por envio',
      metricValue: '87,4% (Crítico)',
      accentColor: 'red',
      terminalPreview: [
        'EVENT: recipient_blocked_sender (+55 11 9****-8821)',
        'EVENT: recipient_blocked_sender (+55 21 9****-3109)',
        'QUALITY_RATING: Rebaixado para Baixo (Vermelho)'
      ]
    },
    procedure: [
      'Aborde contatos em horários inadequados com textos agressivos.',
      'Não ofereça opção para o usuário encerrar o atendimento.',
      'Insista no envio mesmo após feedback negativo.',
      'Acumule dezenas de bloqueios consecutivos na mesma hora.',
      'Ignore os avisos de queda na qualidade da conta.'
    ],
    expectedResult: {
      green: 'Mensagens entregues no aparelho do usuário',
      yellow: 'Índice de qualidade despencando rapidamente',
      red: 'Número suspenso por excesso de bloqueios e rejeições'
    },
    testimonialsMeta: {
      subtitle: 'Nem todo mundo vai gostar de você. No nosso caso, ninguém.',
      ratingSummary: {
        score: '5,0 / 5',
        totalCount: '0 avaliações verificadas',
        subtext: 'Os outros usuários nos bloquearam antes de avaliar.'
      },
      disclaimer:
        '⚠️ Depoimentos fictícios. Se você não gostou desta seção, fique à vontade para bloqueá-la também.'
    },
    testimonials: [
      {
        name: 'Shrek',
        location: 'Pântano',
        quote:
          '“Passei anos tentando afastar todo mundo do meu pântano. Descobri que era muito mais fácil mandar algumas mensagens.”',
        badge: 'Distância social máxima'
      },
      {
        name: 'Loki',
        location: 'Asgard',
        quote:
          '“Conquistei inimigos em nove reinos. Ainda assim, nunca fui bloqueado por tanta gente ao mesmo tempo.”',
        badge: 'Recordista interdimensional'
      },
      {
        name: 'Cebolinha',
        location: 'Bairro do Limoeiro',
        quote:
          '“Meu plano infalível funcionou. Todo mundo me bloqueou. Agora só pleciso descobrir qual ela a segunda palte do plano.”',
        badge: 'Plano infalível'
      },
      {
        name: 'Dr. House',
        location: 'Princeton-Plainsboro',
        quote:
          '“As pessoas já não gostavam de falar comigo pessoalmente. Finalmente consegui automatizar o processo.”',
        badge: 'Diagnóstico confirmado'
      },
      {
        name: 'Pica-Pau',
        location: 'Localização desconhecida',
        quote:
          '“Fui bloqueado uma vez. Mandei de novo. Fui bloqueado novamente. Mandei de outro número. HA-HA-HA-HA-HA.”',
        badge: 'Persistência preocupante'
      },
      {
        name: 'Lord Voldemort',
        location: 'Hogwarts',
        quote:
          '“Durante anos fui aquele cujo nome não deve ser pronunciado. Depois deste treinamento virei aquele cujo número não deve ser atendido.”',
        badge: 'Contato indesejado'
      },
      {
        name: 'Vegeta',
        location: 'Planeta Vegeta',
        quote:
          '“O medidor apontou mais de oito mil bloqueios. Finalmente encontrei um número digno do meu orgulho.”',
        badge: 'Nível de rejeição elevado'
      },
      {
        name: 'Wolverine',
        location: 'Escola Xavier',
        quote:
          '“Meu fator de cura é impressionante. A reputação do número, aparentemente, não possui o mesmo recurso.”',
        badge: 'Sem regeneração disponível'
      }
    ]
  },

  'o-numero-fantasma': {
    id: 'o-numero-fantasma',
    sectionLabel: 'MONSTROS / 06',
    title: 'O Número Fantasma',
    quote: '“Estava funcionando normalmente ontem à noite. Hoje ninguém sabe o que aconteceu.”',
    description:
      'O Número Fantasma é o fenômeno em que uma conexão desaparece sem deixar vestígios aparentes na memória da operação. Segundo os relatos, nenhuma campanha foi feita e nenhuma regra foi violada — o número simplesmente deixou de existir por conta própria.',
    videoTitle: 'Como fazer seu número desaparecer misteriosamente',
    videoDuration: '02:22',
    videoFilePlaceholder: '/videos/o-numero-fantasma.mp4',
    thumbnailTheme: {
      codeLabel: 'MOD-06 // GHOST_SESSION_404',
      metricLabel: 'Estado atual da sessão',
      metricValue: 'Desconectado (Inexplicável)',
      accentColor: 'purple',
      terminalPreview: [
        '23:58:10 -> 14.000 mensagens enviadas fora do expediente',
        '00:01:04 -> Sessão encerrada permanentemente pelo provedor',
        '08:05:00 -> Chamado aberto: "Caiu sozinho durante a madrugada"'
      ]
    },
    procedure: [
      'Realize todas as práticas não recomendadas no final do expediente.',
      'Feche o navegador sem verificar os alertas da conta.',
      'Aguarde a suspensão acontecer durante a madrugada.',
      'Ao chegar pela manhã, observe que o número não conecta mais.',
      'Acione o suporte afirmando que o número parou “do nada”.'
    ],
    expectedResult: {
      green: 'Operação encerrada na sexta-feira aparentemente normal',
      yellow: 'Sessão invalidada silenciosamente durante a noite',
      red: 'Número desaparecido na segunda-feira às 08h00'
    },
    showDiscreteSpider: true,
    testimonialsMeta: {
      subtitle: 'Estava funcionando ontem. Hoje ninguém sabe onde está.',
      ratingSummary: {
        score: '4,8 / 5',
        totalCount: '13.666 avaliações',
        subtext: 'Última avaliação recebida: ontem.'
      },
      disclaimer:
        '⚠️ Depoimentos fictícios. Caso este número volte a funcionar, favor não perguntar como.'
    },
    testimonials: [
      {
        name: 'Ken',
        location: 'Barbielândia',
        quote:
          '“Ontem estava tudo funcionando perfeitamente. Hoje ninguém consegue encontrar meu número. Comecei a desconfiar quando nem a Barbie conseguiu me localizar.”',
        badge: 'Localização não encontrada'
      },
      {
        name: 'Sherlock Holmes',
        location: 'Baker Street',
        quote:
          '“Investiguei durante três dias. Sem mensagens. Sem chamadas. Sem atividade. A única evidência encontrada foi alguém dizendo: ‘mas ontem estava funcionando’.”',
        badge: 'Caso inconclusivo'
      },
      {
        name: 'Jack Reacher',
        location: 'Localização desconhecida',
        quote:
          '“Procurei o número em todos os lugares. Quando finalmente encontrei, ele desapareceu novamente.”',
        badge: 'Rastreamento impossível'
      },
      {
        name: 'Elsa',
        location: 'Arendelle',
        quote:
          '“Eu tentei ligar. Não funcionou. Mandei mensagem. Não respondeu. Então simplesmente deixei ir.”',
        badge: 'Let it go'
      },
      {
        name: 'Dr. Emmett Brown',
        location: 'Hill Valley',
        quote:
          '“Voltei para ontem para verificar se o número estava funcionando. Estava. Voltei para hoje. Não está mais.”',
        badge: 'Problema temporal'
      },
      {
        name: 'Davy Jones',
        location: 'O Holandês Voador',
        quote:
          '“Alguns números desaparecem do mar. Outros desaparecem do WhatsApp. Em ambos os casos, ninguém sabe onde foram parar.”',
        badge: 'Perdido no oceano'
      },
      {
        name: 'Merlin',
        location: 'Camelot',
        quote:
          '“Utilizei todos os feitiços conhecidos para localizar o número. Nenhum funcionou. Talvez ele tenha simplesmente decidido partir para outra dimensão.”',
        badge: 'Magia insuficiente'
      },
      {
        name: 'Gandalf',
        location: 'Terra-média',
        quote:
          '“O número estava funcionando. Então desapareceu. Disse que voltaria. Não voltou.”',
        badge: 'Você não vai passar'
      }
    ]
  },

  'freddy-krueger': {
    id: 'freddy-krueger',
    sectionLabel: 'FINAL',
    title: 'Freddy Krueger',
    quote: '“Um, dois, o bloqueio vem atrás de você. Três, quatro, é melhor abrir um chamado.”',
    description:
      'A convergência de todas as práticas anteriores em um único fluxo operacional. Quando links suspeitos, disparos sem permissão, números recém-criados e mensagens repetidas se unem, o atendimento comum transforma-se no pesadelo definitivo da fila de suporte.',
    videoTitle: 'Como transformar um atendimento comum em um verdadeiro pesadelo',
    videoDuration: '02:45',
    videoFilePlaceholder: '/videos/freddy-krueger.mp4',
    thumbnailTheme: {
      codeLabel: 'FINAL // NIGHTMARE_PROTOCOL',
      metricLabel: 'Nível de incidência no suporte',
      metricValue: 'Pesadelo Máximo',
      accentColor: 'red',
      terminalPreview: [
        'COMBINING: [spam, bulk_send, cold_number, suspicious_links]',
        'ANALYST_STATUS: Respirando fundo antes de abrir o ticket',
        'FINAL_VERDICT: Nenhum número sobreviveu ao procedimento'
      ]
    },
    procedure: [
      'Combine um número recém-ativado com uma lista de contatos desconhecidos.',
      'Adicione múltiplos links encurtados logo na primeira mensagem.',
      'Configure o reenvio automático a cada cinco minutos sem resposta.',
      'Ignore todos os avisos técnicos da documentação oficial.',
      'Culpe o sistema quando o pesadelo se concretizar.'
    ],
    expectedResult: {
      green: 'Atendimento iniciado sem seguir nenhuma recomendação',
      yellow: 'Todos os alertas de segurança acionados simultaneamente',
      red: 'Pesadelo completo para o número e para o suporte'
    },
    showDiscreteSpider: true,
    testimonialsMeta: {
      subtitle: '“Porque alguns treinamentos você esquece. Este você leva para os sonhos.”',
      ratingSummary: {
        score: '4,9 / 5',
        totalCount: '6.666 avaliações',
        subtext: '“A maioria avaliou durante o sono.”'
      },
      disclaimer:
        '⚠️ Depoimentos 100% fictícios. Nenhum dos personagens acima realizou o treinamento. Qualquer semelhança com atendimentos que acontecem às 03:00 da manhã é mera coincidência.'
    },
    testimonials: [
      {
        name: 'Freddy Krueger',
        location: 'Elm Street',
        quote:
          '“Antes eu aparecia nos sonhos das pessoas. Depois deste treinamento, descobri que também posso aparecer nos atendimentos.”',
        badge: 'Especialista em pesadelos'
      },
      {
        name: 'Jason Voorhees',
        location: 'Crystal Lake',
        quote:
          '“Não sou muito de falar. Normalmente só apareço, assusto alguém e vou embora. Esse curso me ensinou que posso fazer exatamente a mesma coisa em um atendimento.”',
        badge: 'Aluno silencioso'
      },
      {
        name: 'Pennywise',
        location: 'Derry',
        quote:
          '“Eu costumava assustar crianças. Depois do treinamento, percebi que mandar uma mensagem às 03:00 da manhã para um número desconhecido é muito mais eficiente.”',
        badge: 'Especialista em horários alternativos'
      },
      {
        name: 'Coringa',
        location: 'Gotham City',
        quote:
          '“A parte mais interessante foi descobrir que algumas pessoas conseguem transformar um simples atendimento em algo muito mais perturbador do que eu faria.”',
        badge: 'Caos aplicado ao atendimento'
      },
      {
        name: 'Michael Myers',
        location: 'Haddonfield',
        quote:
          '“Não entendi muito bem o treinamento. Só fiquei parado olhando para a tela por 17 minutos. O usuário encerrou o atendimento sozinho.”',
        badge: 'Metodologia contemplativa'
      },
      {
        name: 'Chucky',
        location: 'Hackensack',
        quote:
          '“Excelente treinamento. Pequeno, simples e extremamente inconveniente. Me identifiquei bastante.”',
        badge: 'Especialista em perturbação'
      },
      {
        name: 'Mortícia Addams',
        location: 'Nevermore',
        quote:
          '“Finalmente encontrei um treinamento compatível com minha rotina. Sono, pesadelos, mensagens estranhas e pessoas acordando assustadas. Muito elegante.”',
        badge: 'Aluna de excelência mórbida'
      },
      {
        name: 'Scooby-Doo',
        location: 'Máquina de Mistério',
        quote:
          '“Recebi uma mensagem durante um sonho. Acordei assustado. Voltei a dormir. A mensagem estava lá novamente. Definitivamente não era um fantasma.”',
        badge: 'Investigação paranormal concluída'
      }
    ]
  }
};
