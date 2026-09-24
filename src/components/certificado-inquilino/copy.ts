// Ported verbatim from gestimo's config/locales/{es,pt,en}.yml
// (pages.certificado_inquilino.*), which already carried the full,
// human-translated copy for all three languages.
export type Lang = 'es' | 'pt' | 'en';

export const copy: Record<Lang, any> = {
  es: {
    hero: {
      badge: 'Verificación con IA',
      title: '¿Qué es un certificado de inquilino?',
      tagline: 'Documentación verificada. No solo recopilada.',
      subtitle:
        'Un certificado de inquilino analiza la documentación real del arrendatario — nóminas, contrato de trabajo — con inteligencia artificial. No es una casilla marcada. Es una verificación de que los documentos son coherentes entre sí y con la identidad de quien los presenta.',
      ctaPrimary: 'Habla con nosotros',
      trustChecks: {
        aiAnalysis: 'Análisis con IA de nóminas y contrato',
        identityCheck: 'Detección de inconsistencias de identidad',
        minutes: 'Listo en menos de 10 minutos',
      },
    },
    problem: {
      label: 'El problema',
      title: 'La documentación estándar es fácil de falsificar',
      stat: '48%',
      statLabel: 'de propietarios desconfía de los inquilinos potenciales',
      statSource: 'Fotocasa Research 2025',
      supportingStat: '33,5',
      supportingStatLabel: 'contactos de media por vivienda en alquiler',
      supportingStatSource: 'Idealista/data, junio 2026',
      body: 'Nóminas, contratos de trabajo, declaraciones de renta. Cualquiera puede modificar un PDF. Y en un mercado donde una vivienda de alquiler recibe de media 33,5 contactos (Idealista/data, junio 2026), no todos los candidatos juegan limpio. El problema no es solo que la documentación se pueda falsificar — es que nadie la revisa con el detalle suficiente para notarlo.',
    },
    howItWorks: {
      label: 'Cómo funciona',
      title: 'Verificación en 3 pasos',
      subtitle: 'El inquilino sube su documentación. Abitamo la analiza con IA. Se genera el certificado.',
      steps: [
        {
          icon: 'bi-file-earmark-arrow-up',
          title: 'El inquilino sube su documentación',
          description: 'Nóminas de los últimos meses y el contrato de trabajo. Los mismos documentos que ya le pediría cualquier agente, sin compartir contraseñas ni acceso bancario.',
        },
        {
          icon: 'bi-cpu',
          title: 'Abitamo analiza los documentos con IA',
          description: 'El sistema extrae ingresos, empleador, puesto y fechas de cada documento y comprueba que son coherentes entre sí, incluida la identidad de la persona que aparece en ellos.',
        },
        {
          icon: 'bi-patch-check-fill',
          title: 'Se genera el certificado',
          description: 'El inquilino recibe un perfil verificado que puede compartir con cualquier agente. Si hay una inconsistencia de identidad, el certificado la señala en lugar de ocultarla.',
        },
      ],
    },
    identityDemo: {
      title: 'Compruébalo tú mismo',
      subtitle: 'Así se ve cuando el nombre de un documento no coincide con el declarado.',
      toggleLabel: 'Estado del documento de ejemplo',
      tabMatch: 'Documento sin incidencias',
      tabMismatch: 'Documento con nombre distinto',
      sampleDocumentLabel: 'Documento analizado',
      matchBadge: 'El nombre coincide en todos los documentos',
      mismatchBadge: 'El nombre del documento no coincide',
      mismatchNote:
        'El nombre en esta nómina no coincide con el nombre declarado por el inquilino. El certificado señala la inconsistencia en lugar de ocultarla.',
    },
    whyAgents: {
      label: 'Para agentes',
      title: 'Por qué los mejores agentes ya lo están pidiendo',
      subtitle: 'Menos riesgo. Cierres más rápidos. Propietarios que confían más en tu criterio.',
      items: [
        { icon: 'bi-search', title: 'Detecta lo que un vistazo no detecta', description: 'El análisis por IA revisa cada documento con el mismo criterio, sin la fatiga ni los descuidos de una revisión manual.' },
        { icon: 'bi-stopwatch-fill', title: 'Cierra más rápido', description: 'El agente tiene certeza desde el primer momento. Menos idas y venidas, menos tiempo por operación.' },
        { icon: 'bi-people-fill', title: 'El inquilino solvente se diferencia', description: 'En un mercado con 33,5 contactos de media por vivienda, el certificado es una ventaja real para quien puede obtenerlo.' },
      ],
    },
    faq: {
      label: 'Preguntas frecuentes',
      title: 'Todo lo que necesitas saber',
      items: [
        { question: '¿El inquilino tiene que pagar algo?', answer: 'No. El proceso de certificación es gratuito para el arrendatario.' },
        { question: '¿Qué documentos necesita el inquilino?', answer: 'Nóminas de los últimos meses y el contrato de trabajo. No hace falta compartir acceso bancario ni ningún dato adicional.' },
        { question: '¿Cómo protege Abitamo mis documentos?', answer: 'Los documentos se analizan de forma segura, exclusivamente para generar el certificado, conforme al RGPD. Abitamo no los comparte con terceros.' },
        { question: '¿En qué países está disponible?', answer: 'Actualmente en España y Portugal.' },
      ],
    },
    cta: {
      title: 'Empieza a ofrecer certificación a tus clientes',
      description: 'Si eres agente inmobiliario y quieres incorporar la verificación de inquilinos a tu proceso de selección, escríbenos.',
      primaryButton: 'Habla con nosotros',
      benefits: {
        aiAnalysis: 'Documentos analizados con IA',
        free: 'Gratuito para el inquilino',
        fast: 'Resultado en menos de 10 minutos',
      },
    },
  },
  pt: {
    hero: {
      badge: 'Verificação com IA',
      title: 'O que é um certificado de inquilino?',
      tagline: 'Documentação verificada. Não apenas recolhida.',
      subtitle:
        'Um certificado de inquilino analisa a documentação real do arrendatário — recibos de vencimento, contrato de trabalho — com inteligência artificial. Não é uma casa assinalada. É uma verificação de que os documentos são coerentes entre si e com a identidade de quem os apresenta.',
      ctaPrimary: 'Fale connosco',
      trustChecks: {
        aiAnalysis: 'Análise com IA de recibos e contrato',
        identityCheck: 'Deteção de inconsistências de identidade',
        minutes: 'Pronto em menos de 10 minutos',
      },
    },
    problem: {
      label: 'O problema',
      title: 'A documentação padrão é fácil de falsificar',
      stat: '48%',
      statLabel: 'dos proprietários desconfia dos potenciais inquilinos',
      statSource: 'Fotocasa Research 2025',
      supportingStat: '33,5',
      supportingStatLabel: 'contactos em média por imóvel para arrendar',
      supportingStatSource: 'Idealista/data, junho de 2026',
      body: 'Recibos de vencimento, contratos de trabalho, declarações de rendimentos. Qualquer pessoa pode alterar um PDF. E num mercado onde um imóvel para arrendar recebe em média 33,5 contactos (Idealista/data, junho de 2026), nem todos os candidatos jogam limpo. O problema não é só que a documentação possa ser falsificada — é que ninguém a revê com detalhe suficiente para reparar nisso.',
    },
    howItWorks: {
      label: 'Como funciona',
      title: 'Verificação em 3 passos',
      subtitle: 'O inquilino envia a sua documentação. A Abitamo analisa-a com IA. O certificado é gerado.',
      steps: [
        {
          icon: 'bi-file-earmark-arrow-up',
          title: 'O inquilino envia a sua documentação',
          description: 'Recibos de vencimento dos últimos meses e o contrato de trabalho. Os mesmos documentos que qualquer agente já pediria, sem partilhar palavras-passe nem acesso bancário.',
        },
        {
          icon: 'bi-cpu',
          title: 'A Abitamo analisa os documentos com IA',
          description: 'O sistema extrai rendimento, empregador, cargo e datas de cada documento e verifica se são coerentes entre si, incluindo a identidade da pessoa que neles consta.',
        },
        {
          icon: 'bi-patch-check-fill',
          title: 'O certificado é gerado',
          description: 'O inquilino recebe um perfil verificado que pode partilhar com qualquer agente. Se houver uma inconsistência de identidade, o certificado assinala-a em vez de a ocultar.',
        },
      ],
    },
    identityDemo: {
      title: 'Comprove você mesmo',
      subtitle: 'É assim que se apresenta quando o nome de um documento não coincide com o declarado.',
      toggleLabel: 'Estado do documento de exemplo',
      tabMatch: 'Documento sem incidências',
      tabMismatch: 'Documento com nome diferente',
      sampleDocumentLabel: 'Documento analisado',
      matchBadge: 'O nome coincide em todos os documentos',
      mismatchBadge: 'O nome do documento não coincide',
      mismatchNote:
        'O nome neste recibo de vencimento não coincide com o nome declarado pelo inquilino. O certificado assinala a inconsistência em vez de a ocultar.',
    },
    whyAgents: {
      label: 'Para agentes',
      title: 'Porque é que os melhores agentes já o exigem',
      subtitle: 'Menos risco. Fechos mais rápidos. Proprietários que confiam mais no seu critério.',
      items: [
        { icon: 'bi-search', title: 'Deteta o que um olhar rápido não deteta', description: 'A análise por IA revê cada documento com o mesmo critério, sem a fadiga nem os descuidos de uma revisão manual.' },
        { icon: 'bi-stopwatch-fill', title: 'Fecha mais rápido', description: 'O agente tem certeza desde o primeiro momento. Menos idas e vindas, menos tempo por operação.' },
        { icon: 'bi-people-fill', title: 'O inquilino solvente destaca-se', description: 'Num mercado com 33,5 contactos em média por imóvel, o certificado é uma vantagem real para quem o consegue obter.' },
      ],
    },
    faq: {
      label: 'Perguntas frequentes',
      title: 'Tudo o que precisa de saber',
      items: [
        { question: 'O inquilino tem de pagar alguma coisa?', answer: 'Não. O processo de certificação é gratuito para o arrendatário.' },
        { question: 'Que documentos precisa o inquilino?', answer: 'Recibos de vencimento dos últimos meses e o contrato de trabalho. Não é preciso partilhar acesso bancário nem qualquer dado adicional.' },
        { question: 'Como é que a Abitamo protege os meus documentos?', answer: 'Os documentos são analisados de forma segura, exclusivamente para gerar o certificado, em conformidade com o RGPD. A Abitamo não os partilha com terceiros.' },
        { question: 'Em que países está disponível?', answer: 'Atualmente em Portugal e Espanha.' },
      ],
    },
    cta: {
      title: 'Comece a oferecer certificação aos seus clientes',
      description: 'Se é agente imobiliário e quer incorporar a verificação de inquilinos no seu processo de seleção, escreva-nos.',
      primaryButton: 'Fale connosco',
      benefits: {
        aiAnalysis: 'Documentos analisados com IA',
        free: 'Gratuito para o inquilino',
        fast: 'Resultado em menos de 10 minutos',
      },
    },
  },
  en: {
    hero: {
      badge: 'AI-Powered Verification',
      title: 'What is a tenant certificate?',
      tagline: 'Documentation verified. Not just collected.',
      subtitle:
        "A tenant certificate analyzes a renter's real documentation — paychecks, employment contract — with artificial intelligence. It's not a checked box. It's a verification that the documents are consistent with each other and with the identity of whoever submitted them.",
      ctaPrimary: 'Talk to us',
      trustChecks: {
        aiAnalysis: 'AI analysis of paychecks and contract',
        identityCheck: 'Identity inconsistency detection',
        minutes: 'Ready in under 10 minutes',
      },
    },
    problem: {
      label: 'The problem',
      title: 'Standard documentation is easy to falsify',
      stat: '48%',
      statLabel: 'of landlords distrust prospective tenants',
      statSource: 'Fotocasa Research 2025',
      supportingStat: '33.5',
      supportingStatLabel: 'average contacts per rental listing',
      supportingStatSource: 'Idealista/data, June 2026',
      body: "Paychecks, employment contracts, tax returns. Anyone can edit a PDF. And in a market where a rental listing gets an average of 33.5 contacts (Idealista/data, June 2026), not every candidate plays fair. The problem isn't just that documentation can be falsified — it's that no one reviews it closely enough to notice.",
    },
    howItWorks: {
      label: 'How it works',
      title: 'Verification in 3 steps',
      subtitle: 'The tenant uploads their documentation. Abitamo analyzes it with AI. The certificate is generated.',
      steps: [
        {
          icon: 'bi-file-earmark-arrow-up',
          title: 'The tenant uploads their documentation',
          description: 'Recent paychecks and the employment contract. The same documents any agent would already ask for, without sharing passwords or bank access.',
        },
        {
          icon: 'bi-cpu',
          title: 'Abitamo analyzes the documents with AI',
          description: "The system extracts income, employer, position, and dates from each document and checks that they're consistent with each other, including the identity of the person named in them.",
        },
        {
          icon: 'bi-patch-check-fill',
          title: 'The certificate is generated',
          description: "The tenant receives a verified profile they can share with any agent. If there's an identity inconsistency, the certificate flags it instead of hiding it.",
        },
      ],
    },
    identityDemo: {
      title: 'See it for yourself',
      subtitle: "This is what it looks like when a document's name doesn't match what was declared.",
      toggleLabel: 'Sample document state',
      tabMatch: 'Document with no issues',
      tabMismatch: 'Document with a different name',
      sampleDocumentLabel: 'Document analyzed',
      matchBadge: 'The name matches across all documents',
      mismatchBadge: "The document's name doesn't match",
      mismatchNote:
        "The name on this paycheck doesn't match the name the tenant declared. The certificate flags the inconsistency instead of hiding it.",
    },
    whyAgents: {
      label: 'For agents',
      title: 'Why the best agents are already requiring it',
      subtitle: 'Less risk. Faster closings. Landlords who trust your judgment more.',
      items: [
        { icon: 'bi-search', title: 'Catches what a glance misses', description: 'AI analysis reviews every document with the same rigor, without the fatigue or oversights of a manual review.' },
        { icon: 'bi-stopwatch-fill', title: 'Closes faster', description: 'The agent has certainty from the first moment. Fewer back-and-forths, less time per deal.' },
        { icon: 'bi-people-fill', title: 'The solvent tenant stands out', description: 'In a market with an average of 33.5 contacts per listing, the certificate is a real advantage for whoever can get one.' },
      ],
    },
    faq: {
      label: 'Frequently asked questions',
      title: 'Everything you need to know',
      items: [
        { question: 'Does the tenant have to pay anything?', answer: 'No. The certification process is free for the renter.' },
        { question: 'What documents does the tenant need?', answer: 'Recent paychecks and the employment contract. No need to share bank access or any additional data.' },
        { question: 'How does Abitamo protect my documents?', answer: 'Documents are analyzed securely, solely to generate the certificate, in compliance with GDPR. Abitamo does not share them with third parties.' },
        { question: 'Which countries is it available in?', answer: 'Currently in Spain and Portugal.' },
      ],
    },
    cta: {
      title: 'Start offering certification to your clients',
      description: "If you're a real estate agent and want to add tenant verification to your screening process, reach out to us.",
      primaryButton: 'Talk to us',
      benefits: {
        aiAnalysis: 'AI-analyzed documents',
        free: 'Free for the tenant',
        fast: 'Results in under 10 minutes',
      },
    },
  },
};
