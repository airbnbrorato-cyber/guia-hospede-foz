// Dados iniciais com exemplos de Foz do Iguaçu (PR) e estrutura do Guia e Admin

export const initialSettings = {
  id: 'general',
  houseName: 'Refúgio das Cataratas',
  tagline: 'Seu refúgio de paz, conforto e aconchego em Foz do Iguaçu.',
  city: 'Foz do Iguaçu • PR',
  wifiName: 'Refugio_Guest_5G',
  wifiPassword: 'Cataratas@2026',
  checkInTime: '15:00',
  checkOutTime: '11:00',
  hostName: 'Mariana Silva',
  hostPhone: '+55 45 99999-8888',
  hostWhatsapp: '5545999998888',
  address: 'Rua das Palmeiras, 120 - Vila Yolanda, Foz do Iguaçu - PR',
  welcomeMessage: 'É uma imensa alegria receber você! Preparamos este guia com todo o carinho para que sua estadia seja inesquecível e repleta de boas memórias.'
};

export const initialSections = [
  {
    id: 'check-in-out',
    title: 'Check-in & Check-out',
    shortTitle: 'Check-in & Out',
    icon: 'KeyRound',
    category: 'guia',
    coverImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=400&q=80',
    lastUpdated: '2026-08-26',
    description: 'Instruções de acesso e horários de entrada e saída.',
    text: "### Horário de Entrada (Check-in): a partir das 15h\nO acesso é feito via fechadura eletrônica para sua maior comodidade.\n\n1. Digite a senha enviada no seu WhatsApp na fechadura digital da porta principal.\n2. Pressione a tecla # para confirmar e destrancar.\n3. Para trancar ao sair, basta puxar a porta e pressionar o botão de cadeado.\n\n---\n\n### Horário de Saída (Check-out): até as 11h\nPedimos a gentileza de respeitar o horário para que nossa equipe de limpeza prepare o imóvel para o próximo hóspede.\n\n- Verifique se não esqueceu carregadores ou pertences nas tomadas e armários.\n- Desligue os aparelhos de ar-condicionado e as luzes.\n- Deixe o lixo recolhido na lixeira da cozinha.\n- Feche a porta principal garantindo o trancamento."
  },
  {
    id: 'como-chegar',
    title: 'Como Chegar',
    shortTitle: 'Como Chegar',
    icon: 'MapPin',
    category: 'guia',
    coverImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80',
    lastUpdated: '2026-08-26',
    description: 'Localização exata e dicas de trânsito e aeroporto.',
    text: "### Endereço\n**Rua das Palmeiras, 120 - Vila Yolanda, Foz do Iguaçu - PR**\n\n- **Do Aeroporto Internacional (IGU):** cerca de 15 minutos via Av. das Cataratas.\n- **Da Rodoviária Internacional:** cerca de 12 minutos via Av. Costa e Silva.\n- **Do Centro da Cidade:** 5 minutos.\n\n*Dica:* Aplicativos como Uber e 99 funcionam perfeitamente na cidade e costumam chegar em menos de 4 minutos."
  },
  {
    id: 'wifi',
    title: 'Wi-Fi & Conexão',
    shortTitle: 'Wi-Fi & Senhas',
    icon: 'Wifi',
    category: 'guia',
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80',
    lastUpdated: '2026-08-26',
    description: 'Rede de alta velocidade para trabalho e streaming.',
    text: "### Rede Principal de Alta Velocidade (Fibra 500 Mega)\n\n- **Rede:** Refugio_Guest_5G\n- **Senha:** Cataratas@2026\n\nO roteador está estrategicamente posicionado na sala de estar, cobrindo todos os cômodos e a varanda externa."
  },
  {
    id: 'a-casa',
    title: 'A Casa e Equipamentos',
    shortTitle: 'A Casa',
    icon: 'Home',
    category: 'guia',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    lastUpdated: '2026-08-26',
    description: 'Instruções para uso de eletros, ar-condicionado e água quente.',
    text: "### Ar-Condicionado\nTodos os quartos e a sala possuem ar-condicionado split. Solicitamos o uso consciente, desligando ao sair do imóvel.\n\n### Água Quente e Chuveiros\nO aquecimento é a gás com termostato automático. Basta girar o misturador para a esquerda para água quente.\n\n### Smart TV\nEquipada com Netflix, Disney+, Prime Video e canais abertos já conectados para o seu entretenimento."
  },
  {
    id: 'regras-da-casa',
    title: 'Regras da Casa',
    shortTitle: 'Regras da Casa',
    icon: 'ClipboardList',
    category: 'regras',
    coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
    lastUpdated: '2026-08-26',
    description: 'Diretrizes de convivência para manter nosso espaço acolhedor.',
    text: "1. **Silêncio:** Horário de silêncio respeitado das 22h às 08h.\n2. **Proibido Fumar:** É estritamente proibido fumar dentro de qualquer cômodo da casa (permitido apenas na área externa).\n3. **Festas e Eventos:** Não são permitidas festas ou recepção de visitantes não cadastrados na reserva.\n4. **Cuidado com Toalhas:** Por favor, não utilize toalhas de banho brancas para retirar maquiagem ou para limpeza de sapatos/chão."
  },
  {
    id: 'importante',
    title: 'Informações Importantes',
    shortTitle: 'Importante',
    icon: 'AlertCircle',
    category: 'regras',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80',
    lastUpdated: '2026-08-26',
    description: 'Voltagem, coleta de lixo e documentos na fronteira.',
    text: "### Voltagem da Casa\nA voltagem padrão em Foz do Iguaçu é **127V** (com tomadas de 220V devidamente sinalizadas na cozinha).\n\n### Cruzamento de Fronteira (Argentina e Paraguai)\n- **Documento Obrigatório:** RG original com menos de 10 anos de emissão ou Passaporte válido. CNH é aceita para trânsito vicinal na fronteira, mas para entrar na Argentina recomenda-se RG ou Passaporte.\n- **Menores de Idade:** Exigem autorização de viagem assinada em cartório se desacompanhados de um dos pais."
  },
  {
    id: 'amenidades',
    title: 'Amenidades Disponíveis',
    shortTitle: 'Amenidades',
    icon: 'Sparkles',
    category: 'guia',
    coverImage: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80',
    lastUpdated: '2026-08-26',
    description: 'Itens de cortesia preparados para você.',
    text: "Para sua comodidade, deixamos preparados:\n- Roupas de cama 300 fios e toalhas higienizadas de padrão hotelaria.\n- Kit de shampoo, condicionador e sabonete artesanal orgânico.\n- Cafeteira Nespresso com cápsulas de boas-vindas.\n- Secador de cabelo de alta potência e ferro de passar."
  },
  {
    id: 'como-se-locomover',
    title: 'Como se Locomover em Foz',
    shortTitle: 'Locomoção',
    icon: 'Car',
    category: 'guia',
    coverImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=400&q=80',
    lastUpdated: '2026-08-26',
    description: 'Dicas de transporte, Uber, transfers e ônibus turístico.',
    text: "### Uber e 99\nFuncionam de forma ágil e segura em toda a cidade e trajeto das Cataratas.\n\n### Transfers para Paraguai e Argentina\nRecomendamos contratar vans/transfers credenciados para atravessar a aduana sem estresse de filas de trânsito ou documentação veicular (Carta Verde). Caso queira indicações, fale conosco no WhatsApp!"
  },
  {
    id: 'perguntas-frequentes',
    title: 'Perguntas Frequentes (FAQ)',
    shortTitle: 'Dúvidas Freq.',
    icon: 'HelpCircle',
    category: 'guia',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
    lastUpdated: '2026-08-26',
    description: 'Respostas rápidas para as dúvidas mais comuns.',
    text: "**P: Posso estender o check-out?**\nR: Late check-out depende da disponibilidade do dia seguinte e agenda de limpeza. Consulte-nos pelo WhatsApp com 24h de antecedência.\n\n**P: Tem mercado próximo?**\nR: Sim! O Supermercado Muffato fica a apenas 3 quadras (5 minutos a pé).\n\n**P: É seguro caminhar à noite?**\nR: O bairro Vila Yolanda é residencial, muito tranquilo e seguro."
  },
  {
    id: 'cafes-e-padarias',
    title: 'Cafés e Padarias',
    shortTitle: 'Cafés & Pães',
    icon: 'Coffee',
    category: 'gastronomia',
    lastUpdated: '2026-08-26',
    description: 'Os melhores cafés da manhã e brunch da região.',
    items: [
      {
        title: 'Café com Passagem',
        badge: 'Ambiente Incrível',
        description: 'Um espaço verde e acolhedor que funciona também como livraria e agência. Ótimos cafés especiais e bolos caseiros.',
        link: 'https://instagram.com',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Empório com Arte',
        badge: 'Super Charmoso',
        description: 'Misto de café e antiquário, com doces artesanais, pão de queijo da canastra e cappuccino especial.',
        link: 'https://instagram.com',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'restaurantes-locais',
    title: 'Restaurantes Locais',
    shortTitle: 'Restaurantes',
    icon: 'Utensils',
    category: 'gastronomia',
    lastUpdated: '2026-08-26',
    description: 'Sabores autênticos da gastronomia local e internacional.',
    items: [
      {
        title: 'Restaurante Castelo Libanês',
        badge: 'Tradicional Árabe',
        description: 'Foz possui a segunda maior colônia árabe do país. O Castelo Libanês oferece o melhor banquete de pastas, shawarmas e quibes.',
        link: 'https://instagram.com',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'La Máfia Trattoria',
        badge: 'Experiência Imersiva',
        description: 'Massas artesanais excepcionais servidas em um ambiente temático clássico e acolhedor.',
        link: 'https://instagram.com',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Churrascaria Rafain',
        badge: 'Show Folclórico',
        description: 'Churrasco completo com espetáculo premiado pelas danças e ritmos de diversos países da América Latina.',
        link: 'https://rafainshow.com.br',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'bares',
    title: 'Bares e Vida Noturna',
    shortTitle: 'Bares & Drinks',
    icon: 'Wine',
    category: 'gastronomia',
    lastUpdated: '2026-08-26',
    description: 'Lugares para relaxar com drinks, chopp artesanal e música.',
    items: [
      {
        title: 'Capitão Bar',
        badge: 'Mais Famoso',
        description: 'Bar clássico com mesas na calçada, carta refinada de coquetéis, petiscos saborosos e ótimo chopp.',
        link: 'https://instagram.com',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Eden Beer Cervejaria',
        badge: 'Cerveja Artesanal',
        description: 'Cervejas locais premiadas, música ao vivo e espaço ao ar livre super agradável.',
        link: 'https://instagram.com',
        image: 'https://images.unsplash.com/photo-1538488881523-2989c60aeb04?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'lugares-mais-proximos',
    title: 'Lugares Mais Próximos',
    shortTitle: 'Mais Próximos',
    icon: 'Navigation',
    category: 'servicos',
    lastUpdated: '2026-08-26',
    description: 'Farmácias, mercados e caixas eletrônicos a pé.',
    text: "### A poucos passos do seu refúgio:\n- **Supermercado Muffato:** 300 metros (3 min a pé)\n- **Farmácia Nissei (24h):** 250 metros na esquina\n- **Padaria Doce Pão:** 150 metros (ótimo café da manhã)\n- **Posto de Combustível Ipiranga & Conveniência:** 200 metros\n- **Banco 24 Horas:** dentro do Supermercado Muffato"
  },
  {
    id: 'coisas-para-fazer',
    title: 'O Que Fazer em Foz do Iguaçu',
    shortTitle: 'O Que Fazer',
    icon: 'Compass',
    category: 'guia',
    lastUpdated: '2026-08-26',
    description: 'As principais atrações imperdíveis da Terra das Cataratas.',
    items: [
      {
        title: 'Cataratas do Iguaçu (Lado Brasileiro)',
        badge: 'Imperdível',
        description: 'Uma das 7 Maravilhas da Natureza. Recomendamos comprar o ingresso com antecedência e fazer o passeio de barco Macuco Safari.',
        link: 'https://cataratasdoiguacu.com.br',
        image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Parque das Aves',
        badge: 'Ao lado das Cataratas',
        description: 'Maior viveiro de conservação de aves da América Latina, com tucanos, araras e flamingos em contato direto.',
        link: 'https://parquedasaves.com.br',
        image: 'https://images.unsplash.com/photo-1550853024-fae8cd4be47f?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Usina Hidrelétrica de Itaipu',
        badge: 'Engenharia Mundial',
        description: 'A maior geradora de energia limpa do planeta. Visita Panorâmica e o espetáculo noturno da iluminação da barragem.',
        link: 'https://turismoitaipu.com.br',
        image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Marco das Três Fronteiras',
        badge: 'Pôr do Sol Mágico',
        description: 'Encontro dos rios Iguaçu e Paraná unindo Brasil, Argentina e Paraguai, com show cultural de danças ao anoitecer.',
        link: 'https://marcodastresfronteiras.com.br',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'emergencia',
    title: 'Contatos de Emergência',
    shortTitle: 'Emergência',
    icon: 'ShieldAlert',
    category: 'servicos',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80',
    lastUpdated: '2026-08-26',
    description: 'Hospitais, polícia e assistência 24h.',
    text: "### Telefones Úteis\n- **Polícia Militar:** 190\n- **SAMU (Ambulância):** 192\n- **Corpo de Bombeiros:** 193\n- **Hospital Municipal Padre Germano Lauck:** (45) 3521-1800\n- **Hospital Ministro Costa Cavalcanti:** (45) 3576-8000\n- **Polícia Federal (Aduana):** (45) 3576-5500"
  },
  {
    id: 'antes-de-partir',
    title: 'Antes de Partir (Checklist)',
    shortTitle: 'Antes de Partir',
    icon: 'DoorClosed',
    category: 'guia',
    coverImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80',
    lastUpdated: '2026-08-26',
    description: 'Checklist rápido para um encerramento tranquilo.',
    text: "Antes de fechar a porta e seguir viagem:\n- [ ] Recolher todo o lixo e descartar na lixeira.\n- [ ] Verificar tomadas, carregadores e gavetas.\n- [ ] Desligar o ar-condicionado e luzes.\n- [ ] Fechar bem as torneiras e janelas.\n- [ ] Trancar a fechadura eletrônica externa.\n- [ ] Nos avisar pelo WhatsApp que você está a caminho!"
  },
  {
    id: 'avaliacao',
    title: 'Avaliação & Depoimento',
    shortTitle: 'Avaliação',
    icon: 'Star',
    category: 'guia',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80',
    lastUpdated: '2026-08-26',
    description: 'Sua opinião é muito valiosa para nós.',
    text: "### Sua avaliação de 5 estrelas faz toda a diferença!\nSe você amou a sua estadia, ficaremos imensamente gratos com a sua avaliação positiva no Airbnb/Booking.\n\nCaso haja qualquer detalhe que não tenha sido perfeito, por favor nos avise diretamente pelo WhatsApp para podermos solucionar imediatamente."
  },
  {
    id: 'contato',
    title: 'Fale com o Anfitrião',
    shortTitle: 'Fale Conosco',
    icon: 'MessageCircle',
    category: 'servicos',
    coverImage: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=400&q=80',
    lastUpdated: '2026-08-26',
    description: 'Estamos aqui para o que você precisar.',
    text: "### Anfitriã: Mariana Silva\n- **WhatsApp:** +55 (45) 99999-8888\n- **E-mail:** anfitriao@refugiodascataratas.com.br\n- **Atendimento:** 07:00 às 22:00 (emergências 24h)"
  }
];

export const initialBookings = [
  {
    id: 'b-001',
    type: 'reserva',
    guestName: 'Carlos Eduardo Ramos',
    checkIn: '2026-08-01',
    checkOut: '2026-08-05',
    amount: 1800,
    amountPaid: 1800,
    paymentStatus: 'pago',
    source: 'Airbnb',
    status: 'concluida',
    notes: 'Hóspede veio para visitar as Cataratas com a família.'
  },
  {
    id: 'b-002',
    type: 'reserva',
    guestName: 'Beatriz Vasconcelos',
    checkIn: '2026-08-08',
    checkOut: '2026-08-12',
    amount: 2100,
    amountPaid: 2100,
    paymentStatus: 'pago',
    source: 'Booking.com',
    status: 'concluida',
    notes: 'Solicitou berço para bebê.'
  },
  {
    id: 'b-003',
    type: 'bloqueio',
    guestName: '',
    checkIn: '2026-08-13',
    checkOut: '2026-08-14',
    amount: 0,
    amountPaid: 0,
    paymentStatus: 'pago',
    source: 'Bloqueio Anfitrião',
    status: 'concluida',
    notes: 'Manutenção preventiva do ar-condicionado e dedetização.'
  },
  {
    id: 'b-004',
    type: 'reserva',
    guestName: 'Lucas e Fernanda Mendes',
    checkIn: '2026-08-18',
    checkOut: '2026-08-23',
    amount: 2750,
    amountPaid: 2750,
    paymentStatus: 'pago',
    source: 'Airbnb',
    status: 'concluida',
    notes: 'Lua de mel. Deixamos brinde de espumante.'
  },
  {
    id: 'b-005',
    type: 'reserva',
    guestName: 'Rodrigo Alcantara',
    checkIn: '2026-08-25',
    checkOut: '2026-08-29',
    amount: 2200,
    amountPaid: 1100,
    paymentStatus: 'parcial',
    source: 'Direto',
    status: 'em_andamento',
    notes: '50% pago na reserva, restante no check-out.'
  },
  {
    id: 'b-006',
    type: 'reserva',
    guestName: 'Patrícia Guimarães',
    checkIn: '2026-09-03',
    checkOut: '2026-09-08',
    amount: 2900,
    amountPaid: 2900,
    paymentStatus: 'pago',
    source: 'Airbnb',
    status: 'confirmada',
    notes: 'Reserva para feriado de setembro.'
  }
];

export const initialExpenses = [
  {
    id: 'exp-001',
    date: '2026-08-05',
    category: 'limpeza',
    amount: 200,
    description: 'Faxina completa pós check-out Carlos'
  },
  {
    id: 'exp-002',
    date: '2026-08-07',
    category: 'brindes',
    amount: 150,
    description: 'Cápsulas Nespresso + Kit amenidades orgânicas'
  },
  {
    id: 'exp-003',
    date: '2026-08-12',
    category: 'limpeza',
    amount: 200,
    description: 'Faxina pós check-out Beatriz'
  },
  {
    id: 'exp-004',
    date: '2026-08-14',
    category: 'manutencao',
    amount: 350,
    description: 'Higienização e revisão dos 3 aparelhos de ar split'
  },
  {
    id: 'exp-005',
    date: '2026-08-17',
    category: 'brindes',
    amount: 80,
    description: 'Espumante cortesia lua de mel Lucas e Fernanda'
  },
  {
    id: 'exp-006',
    date: '2026-08-23',
    category: 'limpeza',
    amount: 200,
    description: 'Faxina pós check-out Lucas'
  },
  {
    id: 'exp-007',
    date: '2026-08-25',
    category: 'taxas',
    amount: 280,
    description: 'Taxa condominial proporcional / IPTU'
  }
];
