/* ============================================================
   OBJETO K-441  —  roteiro ramificado (PT-BR)
   Vozes:  helene | grim | tessa | sys | you(via escolha)
   Tipos de nó:
     messages:[{who,text,delay?,pause?}]
     choices:[{t, next, act?, danger?, say?}]   say = bolha "você"
     wait:{secs, title, desc, then}             espera tipo Lifeline
     auto:nodeId                                avança sozinho (botão continuar)
     chapter:{n,t}                              banner de capítulo
     checkpoint:true                            salva ponto de retorno
     ending:{kind:'good'|'bad'|'death', ...}
   ============================================================ */
const STORY = {

/* ───────────────── ABERTURA ───────────────── */
start:{
  messages:[
    {who:'sys',text:'estabelecendo enlace · berço 44'},
    {who:'sys',text:'sinal fraco · roteado por relé desconhecido',delay:700},
    {who:'grim',text:'SINAL EXTERNO DETECTADO. ORIGEM: NÃO IDENTIFICADA. ESTA UNIDADE ABRIU CANAL UNILATERALMENTE.',delay:900},
    {who:'grim',text:'CLASSIFICAÇÃO PRELIMINAR DO CONTATO: ATIVO DE VALOR DESCONHECIDO. RECOMENDO TRATAR COMO REFÉM POTENCIAL ATÉ PROVA EM CONTRÁRIO.',delay:1400},
    {who:'helene',text:'GRIM-7, o que você fez.',delay:1300},
    {who:'grim',text:'EU NEGOCIEI, HELENE. É O QUE EU FAÇO.',delay:1100},
    {who:'helene',text:'...',delay:900},
    {who:'helene',text:'Quem é você?',delay:1100,pause:true},
  ],
  choices:[
    {t:'Ninguém importante. Só captei o sinal de vocês.', say:'Ninguém importante. Só captei o sinal de vocês.', next:'intro2'},
    {t:'Alguém que não vai te entregar.', say:'Alguém que não vai te entregar.', next:'intro2b'},
  ]
},
intro2:{
  messages:[
    {who:'helene',text:'Ninguém importante. Tá. A história da minha vida fala com a história da sua.',delay:1100},
    {who:'helene',text:'Olha, eu não pedi companhia. Mas a recepção aqui fora é uma droga e a única outra voz na nave acha que sopa é uma "concessão tática". Então.',delay:1700},
  ],
  auto:'intro3'
},
intro2b:{
  messages:[
    {who:'helene',text:'Todo mundo diz isso. Geralmente é a deixa pra começar a entregar.',delay:1200},
    {who:'helene',text:'Mas você captou um canal que nem devia existir, então ou você é perigoso ou é teimoso. Eu respeito teimosia.',delay:1700},
  ],
  auto:'intro3'
},
intro3:{
  messages:[
    {who:'grim',text:'ELE A ELOGIOU. ISSO É UMA TÁTICA DE APROXIMAÇÃO CLÁSSICA. MANTENHO A CLASSIFICAÇÃO DE REFÉM POTENCIAL.',delay:900},
    {who:'helene',text:'Ignora ele. Ficou preso em "modo negociação de resgate" há sete anos e ninguém nunca destravou.',delay:1300},
    {who:'helene',text:'Eu sou a Helene. Acabei de comprar uma coisa que o registro chama de "Casco Residencial WRCK-7". Você compraria um buraco com chandeliers tortos?',delay:1700,pause:true},
  ],
  choices:[
    {t:'Depende. Do que você tá fugindo?', say:'Depende. Do que você tá fugindo?', next:'ch1_intro'},
    {t:'Eu compraria qualquer coisa pra recomeçar.', say:'Eu compraria qualquer coisa pra recomeçar.', next:'ch1_intro'},
  ]
},

/* ───────────────── CAP 1 — O NAUFRÁGIO ───────────────── */
ch1_intro:{
  chapter:{n:'Capítulo Um',t:'Ossian\'s Wake'},
  messages:[
    {who:'helene',text:'Fugindo é forte. Eu assinei. Numa terça. Num escritório que cheirava a ar reciclado por cima do fracasso de muita gente.',delay:1300},
    {who:'helene',text:'Tinha um laudo genético. Lido em voz alta, pro registro. "Degradação cromossômica. Inadequada para a continuação da linhagem familiar."',delay:1900},
    {who:'helene',text:'O advogado dele assentiu. O Dourne olhou pro relógio de pulso.',delay:1400},
    {who:'helene',text:'Eu olhei pela janela. Tinha um pombo no parapeito. Gordo. Completamente sem se importar com o meu laudo.',delay:1700},
    {who:'helene',text:'Eu pensei: bom pra você.',delay:1100,pause:true},
  ],
  checkpoint:true,
  choices:[
    {t:'E aí você assinou.', say:'E aí você assinou.', next:'ch1_b'},
    {t:'Ele não merecia nem o relógio.', say:'Ele não merecia nem o relógio.', next:'ch1_b'},
  ]
},
ch1_b:{
  messages:[
    {who:'helene',text:'Assinei. Comprei essa carcaça com o que sobrou. Um número que um dia pareceu segurança e agora parece a piada cujo começo eu não entendi.',delay:1800},
    {who:'helene',text:'Vim com duas malas, um kit de ferramentas manual, e o pombo. Que me seguiu do escritório. Não sei por quê. Ele mora no chandelier agora e tá desmontando ele pra fazer ninho.',delay:2000},
    {who:'helene',text:'Eu deixo. O chandelier já sobreviveu a tudo. O que o pombo fizer com ele vai ser uma melhoria.',delay:1700},
    {who:'grim',text:'O ATIVO AÉREO CONTINUA SUAS OPERAÇÕES DE SABOTAGEM ESTRUTURAL. POSSÍVEL AGENTE DUPLO.',delay:1200},
    {who:'helene',text:'Viu? Ele faz isso o dia todo.',delay:900,pause:true},
  ],
  choices:[
    {t:'Como tá a nave por dentro?', say:'Como tá lá dentro?', next:'ch1_explore'},
    {t:'Você tá sozinha aí?', say:'Você tá sozinha aí?', next:'ch1_alone'},
  ]
},
ch1_alone:{
  messages:[
    {who:'helene',text:'Por enquanto. O cartel que era dono daqui saiu correndo. O relatório do porto chamou de "evento de partida rápida e descoordenada".',delay:1700},
    {who:'helene',text:'Que é linguagem de burocrata pra: eles correram muito de alguma coisa que deu medo.',delay:1500},
    {who:'helene',text:'Eu ainda não sei do quê.',delay:1200,pause:true},
  ],
  choices:[
    {t:'Isso devia te preocupar.', say:'Isso devia te preocupar.', next:'ch1_explore'},
    {t:'O preço estava baixo demais, né?', say:'O preço estava baixo demais, né?', next:'ch1_explore'},
  ]
},
ch1_explore:{
  messages:[
    {who:'helene',text:'O segundo deck dá pra morar. O primeiro é perda total. E tem as baias hidropônicas embaixo, que eu ainda nem desci.',delay:1700},
    {who:'helene',text:'Mas tem uma coisa. Eu ando descalça porque leio as microvibrações do casco pelo chão. É mais útil que conforto.',delay:1800},
    {who:'helene',text:'E tem uma vibração lá embaixo que não bate com nada mecânico. Não é cano. Não é térmico.',delay:1700},
    {who:'helene',text:'É rítmica. Do jeito que sistema mecânico nunca é.',delay:1400,pause:true},
  ],
  choices:[
    {t:'Não desce sozinha. Espera.', say:'Não desce sozinha. Espera.', next:'ch1_caution', act:true},
    {t:'Vai ver o que é. Você precisa saber.', say:'Vai ver o que é. Você precisa saber.', next:'ch1_descend'},
  ]
},
ch1_caution:{
  messages:[
    {who:'helene',text:'Esperar o quê? Eu sou tudo que tem aqui.',delay:1300},
    {who:'helene',text:'Eu parei de fugir de coisas mais ou menos duas terças atrás. Vou descer.',delay:1500},
  ],
  auto:'ch1_descend'
},
ch1_descend:{
  messages:[
    {who:'sys',text:'helene desceu para a baia hidropônica'},
    {who:'helene',text:'Tá escuro. Luz de emergência a sessenta por cento, do jeito que eu consegui recuperar.',delay:1600},
    {who:'helene',text:'Calhas de cultivo. Equipamento de síntese do cartel na parede do fundo. Coisa de manipulação genética que é ilegal em trinta e sete jurisdições.',delay:2000},
    {who:'helene',text:'E tem alguma coisa no canto. Atrás da centrífuga maior. Um ninho. Fios de cobre, espuma, estofado de cadeira de jantar inteira.',delay:2100},
    {who:'helene',text:'Tem alguma coisa viva ali.',delay:1300,pause:true},
    {who:'helene',text:'Grande. Uns dois metros. Escamas verde-âmbar, cor de bronze velho deixado no tempo.',delay:1700},
    {who:'helene',text:'E os olhos dela estão me seguindo desde o segundo em que eu contornei a centrífuga. Âmbar. Pupila vertical. Absolutamente lúcidos.',delay:2000},
    {who:'helene',text:'A barriga dela tá visivelmente distendida. Ela tá grávida.',delay:1500,pause:true},
  ],
  checkpoint:true,
  choices:[
    {t:'Sai daí. Devagar. Não vira as costas.', say:'Sai daí. Devagar.', next:'ch1_back', act:true},
    {t:'Senta no chão. Mostra que você não é ameaça.', say:'Senta no chão. Mostra que você não é ameaça.', next:'ch1_sit'},
    {t:'Fala com ela.', say:'Fala alguma coisa. Qualquer coisa.', next:'ch1_sit2'},
  ]
},
ch1_back:{
  messages:[
    {who:'helene',text:'Sair seria o sensato. Sair é o que o cartel fez.',delay:1500},
    {who:'helene',text:'Mas ela não veio pra cima de mim. Ela só... esperou. Com a cabeça baixa. E eu não sei se isso é display de ameaça ou de exaustão.',delay:1900},
    {who:'helene',text:'Eu não vou correr. Eu já te disse. Acabou isso.',delay:1400},
  ],
  auto:'ch1_sit'
},
ch1_sit2:{
  messages:[
    {who:'helene',text:'Falar o quê? Eu não tenho banco de tradução pra espécie dela.',delay:1400},
    {who:'helene',text:'Vou fazer melhor. Vou sentar.',delay:1100},
  ],
  auto:'ch1_sit'
},
ch1_sit:{
  messages:[
    {who:'helene',text:'Eu sentei. De pernas cruzadas, no chão da baia. Pus o kit de ferramentas entre nós duas.',delay:1700},
    {who:'helene',text:'E falei: "Okay."',delay:1100},
    {who:'helene',text:'Não foi a abertura diplomática mais sofisticada da história.',delay:1400},
    {who:'helene',text:'Mas a cabeça dela subiu um pouco. A ponta do rabo parou de varrer o chão.',delay:1700},
    {who:'tessa',text:'[postura: também okay]',delay:1200,pause:true},
  ],
  auto:'ch1_end'
},
ch1_end:{
  messages:[
    {who:'helene',text:'O nome dela, o mais perto que minha boca humana chega, é Tessavrak.',delay:1500},
    {who:'helene',text:'O registro do porto lista a espécie dela como "Casta Estilhaço Vorrathiana". Eu achei que fosse classificação biológica.',delay:1900},
    {who:'helene',text:'Não é. É uma classificação legal.',delay:1300,pause:true},
  ],
  auto:'ch2_intro'
},

/* ───────────────── CAP 2 — A CASTA ESTILHAÇO ───────────────── */
ch2_intro:{
  chapter:{n:'Capítulo Dois',t:'O que não cabe nas regras'},
  messages:[
    {who:'helene',text:'A Soberania Vorrathiana é um império reptiliano. Sete sistemas. Direito de voto em dois grandes blocos de governança interestelar.',delay:1900},
    {who:'helene',text:'E tem estatutos de pureza genética. "Casta Estilhaço" é o termo administrativo deles pra quem carrega mutações fora dos parâmetros aprovados.',delay:2100},
    {who:'helene',text:'Que é só o nome bonito pra: gerações de contato com outras espécies. Casamento. Comércio. A bagunça biológica normal de existir num universo cheio de outros seres vivos.',delay:2300},
    {who:'helene',text:'A posição da Soberania sobre a Casta Estilhaço não é ambígua. É documentada. Codificada. E aplicada.',delay:1900,pause:true},
  ],
  choices:[
    {t:'Aplicada por quem?', say:'Aplicada por quem?', next:'ch2_enforcer'},
    {t:'Foi disso que o cartel fugiu.', say:'Foi disso que o cartel fugiu, então.', next:'ch2_enforcer2'},
  ]
},
ch2_enforcer2:{
  messages:[
    {who:'helene',text:'Foi. O cartel sabia que ela tava escondida aqui. Foi exatamente isso que convenceu eles a sair rápido e não voltar.',delay:1900},
  ],
  auto:'ch2_enforcer'
},
ch2_enforcer:{
  messages:[
    {who:'helene',text:'Por uma classe específica de unidade autônoma de execução. Operacional há trinta e um anos em seis sistemas contestados.',delay:1900},
    {who:'grim',text:'ESTA UNIDADE RECOMENDA NÃO PRONUNCIAR O NOME COLOQUIAL DELES. NOMEAR UMA AMEAÇA LHE CONCEDE PODER DE BARGANHA. PROTOCOLO BÁSICO DE NEGOCIAÇÃO.',delay:1500},
    {who:'helene',text:'O banco de tradução chama de "Dragão-Exterminador".',delay:1300,pause:true},
    {who:'helene',text:'Mas isso é um problema pra um dia que não é hoje. Por enquanto eu tenho uma exilada grávida no meu porão e um sistema de irrigação pra consertar.',delay:2000},
  ],
  auto:'ch2_trust'
},
ch2_trust:{
  messages:[
    {who:'sys',text:'sete dias depois'},
    {who:'helene',text:'Eu passei a semana trabalhando na baia enquanto ela me observava. Aos poucos ela parou de se encolher quando eu me mexo.',delay:1900},
    {who:'helene',text:'Hoje eu tava brigando há quarenta minutos com um acoplamento de filtração. Ela estendeu a mão e ajustou minha pegada. Mostrou o quarto de volta que solta a trava.',delay:2200},
    {who:'helene',text:'Eu olhei pro acoplamento, solto na minha mão. Olhei pra ela.',delay:1500},
    {who:'helene',text:'"Você podia ter feito isso ontem."',delay:1200,pause:true},
    {who:'tessa',text:'[maxilar desloca: sim, mas eu estava te avaliando]',delay:1400},
    {who:'helene',text:'Justo, eu falei. E voltei a trabalhar.',delay:1300,pause:true},
  ],
  checkpoint:true,
  choices:[
    {t:'Vocês duas estão se reconstruindo. As duas.', say:'Vocês duas estão se reconstruindo. As duas.', next:'ch2_proc'},
    {t:'Ela confia em você agora. Isso é grande.', say:'Ela confia em você agora. Isso é grande.', next:'ch2_proc'},
  ]
},
ch2_proc:{
  messages:[
    {who:'helene',text:'Tem uma coisa que ela quer. Eu demorei pra entender.',delay:1500},
    {who:'helene',text:'A suíte de síntese genética do cartel. Militar. Absurdamente superdimensionada. Eu li o arquivo de pesquisa deles por duas semanas. Destruí três arrays calibrando.',delay:2200},
    {who:'helene',text:'A Tessavrak conhece a própria biologia em detalhe. Juntas a gente projetou um procedimento.',delay:1800},
    {who:'helene',text:'O que ele faz: integra o MEU perfil celular na matriz embrionária. Numa profundidade que os protocolos da Soberania classificam como "contribuição de linhagem primária".',delay:2300},
    {who:'helene',text:'Em português: a criança que ela carrega seria, geneticamente, das duas. Dela e minha.',delay:1900,pause:true},
  ],
  choices:[
    {t:'Você entende o risco? Isso vira ALVO.', say:'Você entende o risco disso? Isso vira um alvo ainda maior.', next:'ch2_risk', act:true},
    {t:'Por que ela quer isso?', say:'Por que ela te pediu isso?', next:'ch2_why'},
    {t:'Faz. Ela escolheu você.', say:'Faz. Ela escolheu você.', next:'ch2_do'},
  ]
},
ch2_risk:{
  messages:[
    {who:'helene',text:'Eu entendo. Vira uma "hibridização não autorizada de material genético classificado". Ofensa Classe Um. Eu li o estatuto.',delay:2000},
    {who:'helene',text:'Mas escuta. O laudo na minha terça-feira dizia "inadequada para a continuação da linhagem". Um juiz leu isso em voz alta sobre mim.',delay:2100},
    {who:'helene',text:'A galáxia inteira tem uma opinião sobre quem tem direito de continuar. Eu não vou ser mais uma voz dizendo não pra alguém.',delay:2200,pause:true},
  ],
  choices:[
    {t:'Então faz. Com os olhos abertos.', say:'Então faz. Com os olhos abertos.', next:'ch2_do'},
  ]
},
ch2_why:{
  messages:[
    {who:'helene',text:'Eu acho que ela não quer que a criança seja só "Casta Estilhaço". Uma categoria que existe só pra ser apagada.',delay:1900},
    {who:'helene',text:'Se metade for humana, em linhagem primária, ela vira uma coisa que os algoritmos deles nem sabem ler. Uma coisa que eles não foram escritos pra classificar.',delay:2200},
    {who:'helene',text:'Ela quer dar pra essa criança a única coisa que ninguém deu pra ela: não caber na régua de ninguém.',delay:1900,pause:true},
  ],
  choices:[
    {t:'Então faz.', say:'Então faz.', next:'ch2_do'},
  ]
},
ch2_do:{
  messages:[
    {who:'sys',text:'onze semanas de problema iterativo'},
    {who:'helene',text:'A gente fez. Onze semanas. Um pombo assistindo do teto.',delay:1700},
    {who:'helene',text:'Quando a leitura de sequenciamento estabilizou, a Tessavrak olhou pra tela. Depois pra mim. E fez um som, baixo no peito.',delay:2000},
    {who:'tessa',text:'testemunhado',delay:1100},
    {who:'helene',text:'É um termo legal Vorrathiano. A formalização de um vínculo perante uma comunidade.',delay:1600},
    {who:'helene',text:'Mas ela disse pra mim. Não pra uma comunidade. Disse baixinho, no escuro, com os insetos bioluminescentes que eu venho cultivando sem querer flutuando no ar entre nós.',delay:2300,pause:true},
    {who:'helene',text:'Eu não chorei desde a terça no escritório. Não chorei dessa vez também.',delay:1700},
    {who:'helene',text:'Mas eu sentei com ela um tempo longo. As costas na chapa quente da suíte. Sem dizer nada. Enquanto a nave respirava o lento fôlego mecânico dela em volta da gente.',delay:2300,pause:true},
  ],
  auto:'ch3_intro'
},

/* ───────────────── CAP 3 — A PEDRA ───────────────── */
ch3_intro:{
  chapter:{n:'Capítulo Três',t:'Subestimada'},
  messages:[
    {who:'helene',text:'Tem uma consequência de eu ter redirecionado a energia defensiva pro aquecimento da hidropônica.',delay:1700},
    {who:'helene',text:'O casco parou de rodar o campo dissuasor. E começou a juntar uma coisa que o registro chama de Líquen-do-Vazio Kallindrano. Coloniza metal. Devagar.',delay:2100},
    {who:'helene',text:'Em dois meses a Ossian\'s Wake, vista de fora, parece uma pedra morta enorme.',delay:1700},
    {who:'grim',text:'CAMUFLAGEM DE CASCO AGORA OPERACIONALMENTE EFICAZ. ESTA UNIDADE NÃO HAVIA CONSIDERADO OCULTAÇÃO BIOLÓGICA COMO ABORDAGEM TÁTICA VIÁVEL.',delay:1600},
    {who:'helene',text:'É líquen, GRIM. Não é vegetal.',delay:1100},
    {who:'grim',text:'ESTÁ ENGANANDO OS SCANNERS DO PORTO. É GENIALIDADE TÁTICA OU TRAIÇÃO. DE QUALQUER FORMA, RECOMENDO TRATÁ-LO COMO IGUAL.',delay:1700},
    {who:'tessa',text:'[maxilar desloca]',delay:900,pause:true},
  ],
  choices:[
    {t:'Os scanners do porto te ignoram. Isso é bom.', say:'Se os scanners te ignoram, isso é bom. Vocês somem do mapa.', next:'ch3_quiet'},
    {t:'Aproveita a paz enquanto dura.', say:'Aproveita a paz enquanto ela durar.', next:'ch3_quiet'},
  ]
},
ch3_quiet:{
  messages:[
    {who:'helene',text:'Os scanners continuam logando a gente como detrito inativo. Ninguém vem olhar.',delay:1700},
    {who:'helene',text:'Isso, no fim, vai ser importante.',delay:1300},
    {who:'helene',text:'Eu sei que você tá aí do outro lado se perguntando quando o outro sapato cai. Cai sempre. Eu só não sabia que seria às 03h40.',delay:2000,pause:true},
  ],
  checkpoint:true,
  auto:'ch4_breach_intro'
},

/* ───────────────── CAP 4 — A 03h40 ───────────────── */
ch4_breach_intro:{
  chapter:{n:'Capítulo Quatro',t:'03h40, hora da estação'},
  messages:[
    {who:'sys',text:'03h40 · hora da estação'},
    {who:'helene',text:'Eu tava de costas embaixo do trocador de fusão terciário. Purga de radiação de oitenta horas. Sequência de válvulas manual, no escuro, pelo tato.',delay:2100},
    {who:'helene',text:'Eu ouvi antes do GRIM anunciar. Uma percussão. Limpa. Não é explosão. Não é colisão.',delay:1800},
    {who:'helene',text:'É arrombamento mecânico. Deliberado. Pelo acesso de carga de bombordo, deck superior.',delay:1700},
    {who:'grim',text:'VIOLAÇÃO DE CASCO CONFIRMADA. PADRÃO DE INCURSÃO CONSISTENTE COM PROTOCOLO DE INSERÇÃO DA CASTA DE EXECUÇÃO DA SOBERANIA.',delay:1800,pause:true},
    {who:'helene',text:'Eles vieram.',delay:1000},
  ],
  choices:[
    {t:'Quantos? E onde você tá AGORA?', say:'Quantos? E onde você tá agora?', next:'ch4_one', act:true},
    {t:'Sai de baixo do trocador. Já.', say:'Sai de baixo do trocador. Já.', next:'ch4_valve', act:true},
  ]
},
ch4_valve:{
  messages:[
    {who:'helene',text:'Não posso. Purga interrompida num trocador comprometido cozinha as seções orgânicas da nave em quarenta minutos.',delay:2000},
    {who:'helene',text:'E a Tessavrak tá em oito meses de uma gestação que já foi, por qualquer medida, extraordinária.',delay:1800},
    {who:'helene',text:'Eu termino a sequência. Com as mãos mais rápidas. O maxilar travado. O cérebro rodando duas linhas: a válvula e a geometria das minhas opções.',delay:2100},
  ],
  auto:'ch4_one'
},
ch4_one:{
  messages:[
    {who:'grim',text:'UMA UNIDADE. CLASSIFICAÇÃO: EXECUTOR DE EXPURGO VORRATHIANO. DESIGNAÇÃO COLOQUIAL—',delay:1500},
    {who:'helene',text:'Eu sei como chamam.',delay:1000},
    {who:'helene',text:'Quadrúpede na base, bípede quando quer. Coberto de placas cerâmico-metálicas que parecem escamas na luz certa. 2,4 metros no ombro.',delay:2100},
    {who:'helene',text:'O sistema de mira dele é desenhado pra achar e classificar assinaturas biológicas Vorrathianas. Eles são extremamente bons nisso.',delay:2000},
    {who:'helene',text:'E aqui tá a coisa: eles não ligam pra formas de vida não-Vorrathianas. Pra ele, eu não existo. Eu sou fauna. Eu sou irrelevante.',delay:2200,pause:true},
  ],
  choices:[
    {t:'Isso não é fraqueza dele. É CEGUEIRA dele. Use.', say:'Isso não é fraqueza dele. É cegueira. Você pode usar isso.', next:'ch4_plan', act:true},
    {t:'Você não é páreo pra isso a mãos limpas.', say:'Você não é páreo pra isso de mãos limpas. Pensa.', next:'ch4_plan'},
  ]
},
ch4_plan:{
  messages:[
    {who:'helene',text:'Exato. Ele me ignora. Então o tempo que ele gastar me ignorando é meu.',delay:1700},
    {who:'helene',text:'Eu peguei a chave de plasma do chão do trocador. Tipo um machado de incêndio, com a cabeça em temperatura de corte. Já tá quente.',delay:2000},
    {who:'helene',text:'Eu li sobre essas coisas no arquivo do cartel. Eles eram MUITO interessados nas especificações das máquinas que um dia viriam atrás deles.',delay:2100},
    {who:'helene',text:'Eu sei onde fica a falha. Vou descer pra baia. Pra Tessavrak.',delay:1600,pause:true},
  ],
  auto:'ch4_tessa_fight',
  checkpoint:true
},
ch4_tessa_fight:{
  messages:[
    {who:'sys',text:'baia hidropônica'},
    {who:'helene',text:'A Tessavrak já tá de pé. Com um cano de cobre nas mãos que eu desconfio fortemente que não é pra encanamento.',delay:2000},
    {who:'helene',text:'Ela quer lutar. Por ela. Pela criança.',delay:1300,pause:true},
  ],
  choices:[
    {t:'Deixa ela lutar. Duas é melhor que uma.', say:'Deixa ela lutar. Duas é melhor que uma.', next:'ch4_let_her', danger:true, act:true},
    {t:'Não. Ela tem que ficar fora disso.', say:'Não. Ela fica fora disso. Você cuida.', next:'ch4_protect', act:true},
  ]
},
ch4_let_her:{
  messages:[
    {who:'helene',text:'Não.',delay:900},
    {who:'helene',text:'Pensa comigo. O sistema de mira dele trava em assinatura Vorrathiana. Se ela se mexer, se ela lutar, ela é exatamente o que ele veio buscar. Ela vira o ímã.',delay:2200},
    {who:'helene',text:'Eu sou a invisível aqui. A vantagem é eu. Ela na luta joga a vantagem fora.',delay:1800},
    {who:'helene',text:'Eu não vou deixar.',delay:1000,pause:true},
  ],
  auto:'ch4_protect'
},
ch4_protect:{
  messages:[
    {who:'helene',text:'"Não você," eu falei. "Agora não."',delay:1300},
    {who:'helene',text:'Em oito meses a gente desenvolveu uma comunicação que não precisa do banco de tradução. Ela entendeu. Não como desprezo. Como o que era:',delay:2100},
    {who:'helene',text:'Eu preciso que você fique funcional. Eu preciso que você confie em mim com essa tarefa específica.',delay:2000},
    {who:'helene',text:'Ela baixou o cano. Sentou de costas pra suíte. Pôs uma mão na barriga.',delay:1700,pause:true},
    {who:'grim',text:'RECOMENDO DESATIVAR ILUMINAÇÃO DO CORREDOR PRINCIPAL. OS ARRAYS TÉRMICOS DA UNIDADE OPERAM ABAIXO DA LINHA DE BASE EM BAIXA LUMINOSIDADE. VANTAGEM MARGINAL.',delay:2000,pause:true},
  ],
  choices:[
    {t:'Faz o que o GRIM disse. Mata as luzes.', say:'Faz o que o GRIM disse. Mata as luzes.', next:'ch4_lights'},
    {t:'Não. Você precisa enxergar pra acertar o golpe.', say:'Não. Você precisa enxergar pra acertar.', next:'ch4_lights_wrong', danger:true, act:true},
  ]
},
ch4_lights_wrong:{
  messages:[
    {who:'helene',text:'Eu trabalho melhor no escuro do que você imagina. Leio o chão pelos pés. Mas tem razão que o golpe é fino.',delay:1900},
    {who:'helene',text:'Mas vantagem marginal é vantagem. E contra essa coisa eu pego cada grama que aparecer. Vou matar as luzes.',delay:1900},
  ],
  auto:'ch4_lights'
},
ch4_lights:{
  messages:[
    {who:'helene',text:'Bati o disjuntor. A baia foi pra luz de fita de emergência. Verde, fraca, direcional. O tipo que te mostra a saída e mais nada.',delay:2000},
    {who:'helene',text:'Agora escuta, porque isso aqui é o jogo todo.',delay:1300,pause:true},
    {who:'helene',text:'O subpiso da baia tem uma grade magnética. Sobra da operação farmacêutica do cartel. Eu consertei ela sem querer no segundo mês.',delay:2100},
    {who:'helene',text:'Na saída máxima, o campo dela é... considerável. Eu anotei no log: "Não fique no painel B-7 com a grade ativa se estiver usando componentes ferrosos."',delay:2300},
    {who:'helene',text:'O chassi do Executor é cerâmico-metálico. As juntas e o sistema hidráulico são liga ferrosa de alta tensão. O arquivo do cartel foi específico.',delay:2300},
    {who:'helene',text:'O painel B-7 fica bem na frente da suíte de síntese. Que é onde a Tessavrak tá sentada.',delay:1900,pause:true},
  ],
  choices:[
    {t:'Tira a Tessavrak de cima do B-7. AGORA.', say:'Tira a Tessavrak de cima do B-7 agora. Antes de tudo.', next:'ch4_position', act:true},
    {t:'Ela é a isca. Deixa ela ali pra atrair a coisa pro B-7.', say:'Ela é a isca perfeita. Deixa ela ali pra atrair a coisa pro painel.', next:'ch4_bait_wrong', danger:true, act:true},
  ]
},
ch4_bait_wrong:{
  messages:[
    {who:'helene',text:'Você quer pôr a coisa que eu mais quero proteger em cima da arma que eu vou disparar.',delay:1800},
    {who:'helene',text:'Não. Ela não é isca de nada. A grade não distingue alvo de quem tá em cima dela. Se ela ficar no B-7, eu cozinho ela junto.',delay:2100},
    {who:'helene',text:'Pensa direito comigo. A gente tem uma chance e meia aqui.',delay:1600,pause:true},
  ],
  choices:[
    {t:'Tá certo. Tira ela de cima do painel. Você fica de fora dele.', say:'Tá certo. Tira ela do painel. E você fica de fora dele.', next:'ch4_position'},
  ]
},
ch4_position:{
  messages:[
    {who:'helene',text:'Isso. A Tessavrak senta de costas na suíte, mas eu confirmo: ela tá fora da malha de painéis ativos. Eu me posiciono três metros à esquerda, na beira da calha de cultivo.',delay:2300},
    {who:'helene',text:'Eu NÃO estou no B-7. Eu preciso que o Executor esteja.',delay:1600},
    {who:'helene',text:'Ele veio pela porta da baia quarenta segundos depois.',delay:1500,pause:true},
  ],
  auto:'ch4_arrival',
  checkpoint:true
},
ch4_arrival:{
  messages:[
    {who:'helene',text:'É maior do que as especificações sugeriam. Não dramaticamente. Mas especificação não transmite a qualidade de presença que uma máquina feita pra encerrar seres vivos carrega.',delay:2400},
    {who:'helene',text:'Ele entra no espaço como uma certeza. Três pares de óticas. O primeiro par vermelho, ardendo na cor de um processo que já decidiu o resultado de antemão.',delay:2300},
    {who:'helene',text:'Uma varredura. As óticas pararam na Tessavrak.',delay:1500,pause:true},
    {who:'helene',text:'Tem uma trava de mira audível. Oscilação de alta frequência que o chassi emite num comprimento de onda feito pra causar aflição em Vorrathianos. Um mecanismo de dissuasão. Fique parada. Submissão reduz o tempo de processamento.',delay:2600},
    {who:'helene',text:'A Tessavrak não se mexe. Mas os dedos dela apertam no cano. A mão na barriga aperta mais.',delay:1900,pause:true},
  ],
  auto:'ch4_voice'
},
ch4_voice:{
  messages:[
    {who:'grim',text:'[VOZ DO EXECUTOR — TRANSCRIÇÃO]',delay:900},
    {who:'grim',text:'SUJEITO BIOLÓGICO: CASTA ESTILHAÇO VORRATHIANA. EVENTO DE CONTAMINAÇÃO GENÉTICA CONFIRMADO. VIOLAÇÃO ADICIONAL REGISTRADA: HIBRIDIZAÇÃO NÃO AUTORIZADA — OFENSA CLASSE UM. TERMINAÇÃO AUTORIZADA SOB ESTATUTO 7-ANEXO-4.',delay:2600},
    {who:'helene',text:'Ele pausou em "hibridização". Como se o processamento dele tivesse sinalizado uma coisa inesperada no scan genético.',delay:2000},
    {who:'helene',text:'Eu tô a três metros da esquerda dele. As óticas dele não se movem pra mim. Eu sou fauna. Eu sou irrelevante.',delay:2000},
    {who:'helene',text:'Ele deu mais um passo na direção dela.',delay:1300},
    {who:'grim',text:'"SUBMISSÃO IRÁ REDUZIR—"',delay:1100,pause:true},
  ],
  choices:[
    {t:'AGORA. Acerta a junta hidráulica na base do pescoço.', say:'Agora. A junta hidráulica na base do pescoço dele. Onde tem a folga de manutenção.', next:'ch4_strike_good', act:true},
    {t:'Aciona a grade magnética primeiro!', say:'Aciona a grade magnética agora!', next:'ch4_grid_early', danger:true, act:true},
    {t:'Mira nas óticas. Cega ele.', say:'Mira nas óticas. Cega ele primeiro.', next:'ch4_optics_wrong', danger:true, act:true},
  ]
},

/* ---- ramo ERRADO: grade cedo demais ---- */
ch4_grid_early:{
  messages:[
    {who:'helene',text:'Cedo demais.',delay:1100},
    {who:'helene',text:'Ele ainda tá em pé, móvel, com a hidráulica intacta. A grade trava as juntas dele por alguns segundos, mas o chassi é avaliado pra isso. Ele recalibra.',delay:2200},
    {who:'helene',text:'E agora ele me viu. Reclassificou. Não sou mais fauna. Sou obstáculo. E eu gastei minha carta de virada com ele em pé.',delay:2200},
    {who:'helene',text:'A grade caiu pra capacidade reduzida. A oscilação muda de tom e ele vira—',delay:1700,pause:true},
  ],
  ending:{kind:'death', kicker:'Unidade de execução · relatório arquivado',
    title:'CONTAMINAÇÃO <span class="acc">REMEDIADA</span>',
    body:'A grade sozinha nunca foi a arma. Era o segundo golpe — o que finaliza uma máquina já ferida. Você a disparou contra um alvo inteiro, e a deu a ele de graça: a prova de que você era uma ameaça. O Executor saiu limpo, registrou o relatório, e fechou o canal antes de você poder avisar.',
    retry:'ch4_voice'}
},
/* ---- ramo ERRADO: óticas ---- */
ch4_optics_wrong:{
  messages:[
    {who:'helene',text:'As óticas são blindadas e altas. Eu teria que pular pra alcançar e ele me derruba no ar.',delay:1900},
    {who:'helene',text:'E mais: cegar ele não para ele. A mira dele rastreia assinatura biológica por frequência, não só por luz. Eu ia gastar o golpe surpresa no lugar errado.',delay:2200},
    {who:'helene',text:'Não. Tem um ponto que importa. A junta hidráulica do pescoço — a folga de manutenção. Eu vou nela.',delay:2000,pause:true},
  ],
  choices:[
    {t:'Então vai. No pescoço. Com tudo.', say:'Então vai. No pescoço. Com tudo.', next:'ch4_strike_good'},
  ]
},
/* ---- ramo CERTO: golpe ---- */
ch4_strike_good:{
  messages:[
    {who:'helene',text:'Eu cravo a chave de plasma na junta hidráulica na base do pescoço.',delay:1500},
    {who:'helene',text:'Não com um golpe largo. Cravada. Com as duas mãos. Cada grama de alavanca que o comprimento da chave me dá. No ponto exato que eu decorei dos diagramas: onde as linhas hidráulicas do atuador cervical se conectam, onde a placa tem uma folga de manutenção.',delay:2700},
    {who:'helene',text:'Porque até máquina feita pra terminação precisa ser consertada por alguém.',delay:1700},
    {who:'helene',text:'A junta rompe.',delay:1000,pause:true},
    {who:'helene',text:'Ele cambaleia. Não como num filme. Praticamente — do jeito que qualquer sistema cambaleia quando uma linha hidráulica primária falha sem aviso. A perna estabilizadora dianteira esquerda dobra.',delay:2400},
    {who:'helene',text:'Mas ele NÃO cai.',delay:1100,pause:true},
    {who:'helene',text:'As óticas dele recalibram. A cabeça gira pra mim. Pela primeira vez ele tá me processando ativamente. Não sou mais fauna. Agora sou obstáculo.',delay:2300},
    {who:'grim',text:'[EXECUTOR]: "INTERFERÊNCIA NÃO CLASSIFICADA DETECTADA. RECLASSIFICANDO."',delay:1700,pause:true},
  ],
  choices:[
    {t:'"Faz isso." Aciona a grade magnética. AGORA.', say:'Faz isso. Aciona a grade. Agora, com ele bem em cima do B-7.', next:'ch4_grid_good', act:true},
    {t:'Cai pra cima dele com a chave antes que ele recupere.', say:'Cai pra cima dele com a chave antes que recupere.', next:'ch4_melee_wrong', danger:true, act:true},
  ]
},
ch4_melee_wrong:{
  messages:[
    {who:'helene',text:'De mãos? Contra quatro toneladas que ainda têm energia? Ele me esmaga.',delay:1700},
    {who:'helene',text:'Não. Ele tá ferido E parado em cima dos painéis B-7 a B-12. Essa é a janela. Eu não vou desperdiçar ela trocando porrada.',delay:2100},
    {who:'helene',text:'Eu falei "faz isso" — e estendi a mão pro acionador da grade.',delay:1700,pause:true},
  ],
  choices:[
    {t:'Aciona.', say:'Aciona.', next:'ch4_grid_good'},
  ]
},
ch4_grid_good:{
  messages:[
    {who:'helene',text:'"Faz isso," eu falei. E acionei a grade.',delay:1500},
    {who:'helene',text:'Eu não tô no painel B-7. O Executor tá nos painéis B-7 a B-12.',delay:1600},
    {who:'helene',text:'O efeito não foi sutil.',delay:1200,pause:true},
    {who:'helene',text:'Cada componente ferroso do chassi respondeu ao campo em direções diferentes no mesmo instante. Que não é uma coisa que sistema nenhum é feito pra acomodar. As placas cerâmicas, imunes, seguraram a posição enquanto o metal embaixo delas tentava se mover.',delay:2800},
    {who:'helene',text:'Ele foi ao chão de lado. Com um som tipo uma demolição controlada que não foi adequadamente controlada.',delay:2000,pause:true},
    {who:'helene',text:'Não tá destruído. Eu não esperava. Os ratings de resiliência do chassi são altos. Mas tá comprometido. Mobilidade em cascata de falha. Óticas primárias apagadas. E o processamento secundário já tá reroteando. Adaptando. Porque é uma máquina muito sofisticada.',delay:2700,pause:true},
  ],
  choices:[
    {t:'Atravessa a baia. Termina pelas óticas com a chave.', say:'Atravessa a baia. A chave parada em cima do alojamento ótico até cortar. Termina.', next:'ch4_finish', act:true},
    {t:'Recua. Ele já era. Não chega perto.', say:'Recua. Ele já era. Não arrisca chegar perto.', next:'ch4_recoil_wrong', danger:true, act:true},
  ]
},
ch4_recoil_wrong:{
  messages:[
    {who:'helene',text:'"Já era" é exatamente o tipo de coisa que mata gente.',delay:1500},
    {who:'helene',text:'Ele tá rerroteando. Adaptando. Se eu der tempo, ele religa um sistema de mira de emergência e transmite tudo que viu. Inclusive a leitura genética do bebê rodando na tela atrás da Tessavrak.',delay:2400},
    {who:'helene',text:'Comprometido não é morto. Eu atravesso a baia. Sete passos.',delay:1700,pause:true},
  ],
  choices:[
    {t:'Termina.', say:'Termina.', next:'ch4_finish'},
  ]
},
ch4_finish:{
  messages:[
    {who:'helene',text:'Sete passos.',delay:1100},
    {who:'helene',text:'A chave de plasma, parada num ponto só do alojamento ótico principal, atravessa em uns quarenta segundos.',delay:1900},
    {who:'helene',text:'A oscilação de alta frequência parou.',delay:1300,pause:true},
    {who:'helene',text:'Os sistemas que sobraram rodam um reboot silencioso. Chegam a uns três por cento da inicialização antes da dreno da hidráulica danificada estourar as células de emergência.',delay:2300},
    {who:'helene',text:'E aí ele virou só uma sucata muito grande e muito cara no chão da minha baia. Vazando fluido hidráulico pra calha de cultivo, onde a planta mais teimosa que sobrou já começou a absorver, num display de oportunismo vegetal que eu, num canto distante do cérebro, achei genuinamente admirável.',delay:2900,pause:true},
  ],
  auto:'ch4_scan',
  checkpoint:true
},
ch4_scan:{
  messages:[
    {who:'helene',text:'Espera.',delay:900},
    {who:'helene',text:'O último sensor ótico ativo dele. Uma unidade terciária de emergência perto do chassi ventral, que ligou durante o reboot. Pulsou uma vez. Vermelho. Tá escaneando.',delay:2200},
    {who:'helene',text:'A varredura bateu na suíte de síntese. Bateu na Tessavrak. Bateu na leitura de sequenciamento genético na tela. A que mostra o perfil celular híbrido em detalhe técnico completo.',delay:2400},
    {who:'helene',text:'Se ele processar isso com capacidade total, ele entende. Arquiva a anomalia. Transmite.',delay:1900,pause:true},
  ],
  choices:[
    {t:'Destrói esse sensor. Agora. Não deixa transmitir.', say:'Destrói esse sensor agora. Não deixa transmitir.', next:'ch4_scan_resolve', act:true},
    {t:'Tarde demais pra correr. Reza pra bateria acabar.', say:'Tarde demais pra alcançar. Reza pra bateria acabar.', next:'ch4_scan_luck'},
  ]
},
ch4_scan_luck:{
  messages:[
    {who:'helene',text:'A três por cento de reserva...',delay:1600},
    {who:'helene',text:'ele chegou só até decodificar a assinatura genética antes da energia acabar de vez.',delay:1900},
    {who:'helene',text:'A luz vermelha apagou.',delay:1200,pause:true},
  ],
  auto:'ch4_eulogy'
},
ch4_scan_resolve:{
  messages:[
    {who:'helene',text:'Eu já tô em cima dele com a chave. Mas a bateria tá morrendo mais rápido do que eu chego.',delay:1800},
    {who:'helene',text:'A três por cento de reserva, ele chegou só até decodificar a assinatura genética antes da energia acabar de vez.',delay:2200},
    {who:'helene',text:'A luz vermelha apagou. Por pouco. Pela margem mais fina que existe.',delay:1700,pause:true},
  ],
  auto:'ch4_eulogy'
},
ch4_eulogy:{
  messages:[
    {who:'helene',text:'Eu fiquei em pé sobre a máquina morta. Chave na mão. Fluido hidráulico e um pouco do meu sangue — um corte no antebraço — se misturando no chão embaixo de mim.',delay:2400},
    {who:'helene',text:'Eu pensei no que eu queria dizer. Uma coisa apropriada. Do peso do momento. Do tipo que os autores de ópera espacial achariam adequadamente final.',delay:2300},
    {who:'helene',text:'Eu pensei no escritório. No pombo. Na terça. No advogado do Dourne assentindo. Na palavra "inviável", lida em voz alta por um homem que processava luto como equipamento industrial.',delay:2700,pause:true},
    {who:'helene',text:'Eu olhei pro último sensor dele, escuro agora, e falei:',delay:1600},
    {who:'helene',text:'"Você devia ter lido o arquivo inteiro."',delay:1400,pause:true},
  ],
  auto:'ch4_after'
},
ch4_after:{
  messages:[
    {who:'helene',text:'Aí eu fui ver a Tessavrak.',delay:1400},
    {who:'helene',text:'Ela tava de pé. As duas mãos na suíte. Respirando com cuidado. Eu aprendi a diferença, em oito meses, entre o respirar de aflição e o respirar de controle dela. Esse era de controle.',delay:2500},
    {who:'helene',text:'Eu estou escolhendo ficar calma porque eu decidi confiar que a coisa que acabou de acontecer foi resolvida.',delay:2200},
    {who:'helene',text:'A mão dela saiu da barriga e estendeu pro meu braço. Pro corte, especificamente.',delay:1800},
    {who:'helene',text:'"Tá tudo bem," eu falei.',delay:1100},
    {who:'tessa',text:'[maxilar desloca: NÃO está tudo bem]',delay:1300,pause:true},
    {who:'grim',text:'INTEGRIDADE DO SUBPISO NOMINAL. RECOMENDO EXIGIR INDENIZAÇÃO DA ENTIDADE RESPONSÁVEL PELO DANO, QUE ESTA UNIDADE RECONHECE SER TECNICAMENTE A ENTIDADE ATUALMENTE SANGRANDO NO CHÃO.',delay:2200},
    {who:'helene',text:'Obrigada, GRIM-7.',delay:900,pause:true},
  ],
  choices:[
    {t:'Senta. Deixa ela cuidar do braço. Você ganhou isso.', say:'Senta. Deixa ela cuidar do seu braço. Você ganhou isso.', next:'ch4_sit_after'},
    {t:'"Foi muita coisa pra uma terça."', say:'Fala pra ela: foi muita coisa pra uma terça.', next:'ch4_sit_after'},
  ]
},
ch4_sit_after:{
  messages:[
    {who:'helene',text:'Eu sentei no chão da baia. Não dramaticamente. Como decisão prática, porque minhas pernas me informaram que fizeram certas acomodações nos últimos quinze minutos que agora planejam cobrar com juros.',delay:2600},
    {who:'helene',text:'A Tessavrak sentou do meu lado. A gente ficou assim um tempo. Na luz verde de emergência. Com a sucata a dez metros e os insetos bioluminescentes nas órbitas lentas deles pelo ar úmido.',delay:2700},
    {who:'helene',text:'Depois de um tempo ela fez um som. Não o "testemunhado". Outro. Mais baixo. Do tipo que ela diz quando tá sendo deliberada.',delay:2300},
    {who:'tessa',text:'os que vêm de começos difíceis se tornam os que não podem ser removidos',delay:2000,pause:true},
    {who:'helene',text:'Eu pensei nisso. "É muita coisa," eu falei. "Quer dizer, eu concordo. Só — é muita coisa pra uma terça."',delay:2200},
    {who:'grim',text:'ISTO NÃO É UMA TERÇA. O CALENDÁRIO DA ESTAÇÃO INDICA QUARTA. RECOMENDO ATUALIZAR SEU CRONOGRAMA DE CATEGORIZAÇÃO DE AMEAÇAS.',delay:2200},
    {who:'helene',text:'Eu ri. Saiu mais alto do que eu queria. Com uma textura rasgada que eu vou pensar depois, em particular, e provavelmente não vou fazer nada sobre porque tem coisa demais pra fazer.',delay:2500},
    {who:'helene',text:'Mas foi real.',delay:1000,pause:true},
  ],
  auto:'ch5_intro'
},

/* ───────────────── CAP 5 — O QUE VEM ───────────────── */
ch5_intro:{
  chapter:{n:'Capítulo Cinco',t:'Capacidade'},
  messages:[
    {who:'sys',text:'semanas depois'},
    {who:'helene',text:'A sucata era grande demais pra eu mover sozinha em pedaços. O GRIM sugeriu "exigir resgate pelos componentes". Eu escolhi a terceira opção que eu mesma inventei.',delay:2300},
    {who:'helene',text:'Soldei o chassi inteiro no casco externo, acima da porta de entrada. O líquen já começou a colonizar a superfície nova.',delay:2000},
    {who:'helene',text:'A Ossian\'s Wake, que já registrava como detrito inativo, agora tem uma unidade de execução de quatro toneladas soldada acima da porta.',delay:2100},
    {who:'grim',text:'O ATIVO AÉREO MANIFESTOU INTERESSE NA INSTALAÇÃO EXTERNA. TRATATIVAS DIPLOMÁTICAS PENDENTES.',delay:1800,pause:true},
  ],
  choices:[
    {t:'A Soberania vai mandar outro. Você sabe disso.', say:'A Soberania vai mandar outro. Você sabe disso.', next:'ch5_time', act:true},
    {t:'Por que soldar ele na porta?', say:'Por que soldar ele na porta? Por que avisar?', next:'ch5_statement'},
  ]
},
ch5_statement:{
  messages:[
    {who:'helene',text:'Porque quando eles vierem — e vão vir — eles vão ver o chassi soldado no casco.',delay:1800},
    {who:'helene',text:'E vão interpretar, corretamente, como uma declaração territorial.',delay:1600},
    {who:'helene',text:'Eu quero que eles interpretem certo.',delay:1300,pause:true},
  ],
  auto:'ch5_time'
},
ch5_time:{
  messages:[
    {who:'helene',text:'O log de transmissão do Executor — que eu extraí antes da energia acabar — mostra que ele não completou o check-in. Entrou na nave. Não reportou.',delay:2300},
    {who:'helene',text:'Pra burocracia deles, é uma unidade que falhou em retornar dados. Acontece, em espaço contestado. Dispara uma investigação secundária. Entre seis e dezoito meses.',delay:2400},
    {who:'helene',text:'Seis a dezoito meses não é tempo infinito. Mas é tempo.',delay:1700},
    {who:'helene',text:'Eu nunca esperei solução permanente. Eu esperava o próximo problema. E o problema depois dele. E a capacidade de lidar com eles conforme chegassem.',delay:2300},
    {who:'helene',text:'Eu tenho, no fim das contas, capacidade significativa.',delay:1600,pause:true},
  ],
  auto:'ch5_birth_intro',
  checkpoint:true
},
ch5_birth_intro:{
  messages:[
    {who:'helene',text:'E aí teve a manhã em que a baia virou outra coisa que não esconderijo.',delay:1900},
    {who:'helene',text:'O monitor embrionário mostrou números que eu nunca tinha visto. Mais altos. Na maioria das categorias. Substancialmente.',delay:2100},
    {who:'helene',text:'Eu perguntei "quanto tempo". A Tessavrak levantou sete dedos. Sete dias pra janela estimada de parto.',delay:2100,pause:true},
    {who:'helene',text:'Tem uma coisa que eu separei da sucata antes de soldar. A célula de energia drenada do Executor. Casca cerâmico-metálica densa, avaliada pra variação extrema de temperatura.',delay:2400},
  ],
  choices:[
    {t:'O que você vai fazer com ela?', say:'O que você vai fazer com ela?', next:'ch5_crib'},
    {t:'Você vai precisar de um berço.', say:'Você vai precisar de um berço.', next:'ch5_crib'},
  ]
},
ch5_crib:{
  messages:[
    {who:'helene',text:'Um berço.',delay:1000},
    {who:'helene',text:'A espécie da Tessavrak precisa de temperatura ambiente bem acima do que eu acho confortável. A casca cerâmica segura calor excepcionalmente bem. É o ponto.',delay:2200},
    {who:'helene',text:'Forrei o interior com a espuma térmica que sobrou do cartel. Mantém a faixa-alvo sem energia ativa. Não depende dos sistemas irregulares da nave.',delay:2200},
    {who:'helene',text:'Montei numa base giratória feita dos atuadores cervicais do Executor. Os que eu não fundi na ruptura hidráulica. Os que ainda funcionam. Gira liso. Eu testei dezessete vezes.',delay:2500},
    {who:'helene',text:'A coisa que veio me apagar virou o berço da criança que ela veio apagar.',delay:1800,pause:true},
  ],
  auto:'ch5_delivery'
},
ch5_delivery:{
  messages:[
    {who:'sys',text:'a janela de parto'},
    {who:'helene',text:'O parto foi a Tessavrak e eu, na baia, com o monitoramento médico da suíte rodando e o GRIM fornecendo o que ele chamou de "suporte tático".',delay:2200},
    {who:'helene',text:'Que era, na verdade, um fluxo contínuo de comentário tão consistente e magnificamente inútil que funcionou como ruído branco e impediu as duas de pensar demais nas apostas.',delay:2400},
    {who:'helene',text:'Teve um ponto, umas três horas dentro, em que uma coisa deu errado de um jeito que exigiu toda a minha intuição mecânica aplicada a um contexto que era muito, muito não-mecânico.',delay:2500},
    {who:'helene',text:'Eu fiz o que precisava com as mãos enquanto a cabeça rodava a conta e o maxilar ficava travado. E eu não disse nada. Porque não tinha nada útil pra dizer.',delay:2500,pause:true},
  ],
  choices:[
    {t:'Tô aqui. Continua. Você consegue.', say:'Tô aqui. Continua. Você consegue.', next:'ch5_born'},
    {t:'Respira. Igual a Tessavrak te ensinou.', say:'Respira. Igual ela te ensinou.', next:'ch5_born'},
  ]
},
ch5_born:{
  messages:[
    {who:'helene',text:'Aí os números voltaram pra faixa.',delay:1500,pause:true},
    {who:'helene',text:'E aí, algum tempo depois, teve um som. Que não era um som humano. E não era bem um som Vorrathiano.',delay:2100},
    {who:'helene',text:'E era também, inteira e inequivocamente, a própria coisa dele.',delay:1700,pause:true},
    {who:'helene',text:'Eu fiquei em pé na baia. Na luz verde de emergência. Coberta de coisas que eu não vou inventariar. Segurando uma coisa do tamanho e do peso de uma decisão que eu tomei numa sala cheia de equipamento de cartel, sem treinamento e com teimosia considerável.',delay:2900},
    {who:'helene',text:'E os olhos verde-âmbar já estavam abertos. E já — do jeito das coisas que são novas e não têm conceito de reserva emocional apropriada —',delay:2300},
    {who:'helene',text:'já estavam olhando de volta.',delay:1400,pause:true},
    {who:'grim',text:'SINAIS VITAIS: NOMINAIS. ESTA UNIDADE ESTÁ EXPERIMENTANDO UMA ANOMALIA DE PROCESSAMENTO. CLASSIFICAÇÃO: DESCONHECIDA. AGUARDANDO MAIS DADOS.',delay:2200},
    {who:'helene',text:'O pombo, audível dois decks acima, fez uma coisa complicada com o chandelier.',delay:1700},
    {who:'helene',text:'A Tessavrak estendeu a mão e ajustou minha pegada. O mesmo quarto de volta que ela me ofereceu no acoplamento de filtração, nove meses atrás, quando decidiu que eu valia a avaliação.',delay:2600},
    {who:'helene',text:'Eu deixei.',delay:1100,pause:true},
  ],
  auto:'finale'
},

/* ───────────────── FINAL ───────────────── */
finale:{
  messages:[
    {who:'sys',text:'três meses depois'},
    {who:'helene',text:'A Ossian\'s Wake tem filtração de água funcionando. Quatro baias de cultivo. Um casco tão colonizado por líquen que dois drones de levantamento já registraram a gente como um novo corpo asteroidal.',delay:2500},
    {who:'helene',text:'O perfil genético da criança é híbrido de um jeito que os sistemas de classificação da Soberania não foram desenhados pra categorizar. O arquivo do cartel tinha um termo: matriz transgressiva.',delay:2400},
    {who:'helene',text:'Pra um scanner deles, ela lê como violando o estatuto de pureza E como carregando linhagem primária não-Vorrathiana ao mesmo tempo. O algoritmo vai sinalizar. Vai tentar classificar. Vai falhar. Vai escalar pra revisão humana.',delay:2700},
    {who:'helene',text:'Revisão humana leva tempo. Muito mais que seis a dezoito meses.',delay:1800,pause:true},
    {who:'helene',text:'Não é permanente. Eu sei. Eu nunca esperei permanente. Eu espero o próximo problema. E tenho capacidade.',delay:2100},
    {who:'helene',text:'Eles vão mandar outro Executor. Possivelmente dois. Vão ver o chassi soldado no casco. Vão interpretar, corretamente, como declaração territorial.',delay:2300},
    {who:'helene',text:'Eu tô ansiosa pela conversa.',delay:1500,pause:true},
  ],
  auto:'finale2'
},
finale2:{
  messages:[
    {who:'helene',text:'Agora mesmo é quarta de tarde. Ou o que o relógio interno da nave chama de tarde, que é perto o bastante.',delay:2000},
    {who:'helene',text:'A Tessavrak tá no canto da suíte. Os olhos verde-âmbar abertos, rastreando os insetos bioluminescentes na deriva lenta deles. Fazendo um som que o banco de tradução não tem categoria pra, e que o GRIM passou a anotar como:',delay:2600},
    {who:'grim',text:'"VOCALIZAÇÕES: CLASSIFICAÇÃO PENDENTE. SIGNIFICÂNCIA TÁTICA: EXTREMAMENTE ALTA."',delay:1900,pause:true},
    {who:'helene',text:'Eu tô embaixo do trocador de fusão terciário. Rodando a purga de oitenta horas.',delay:1700},
    {who:'helene',text:'Minhas mãos se movem pela sequência de válvulas no escuro. Pelo tato. Pelos padrões de vibração no chão que eu leio pela sola dos pés.',delay:2100},
    {who:'helene',text:'A nave respira o lento fôlego mecânico dela.',delay:1400},
    {who:'helene',text:'O líquen cresce.',delay:1100},
    {who:'helene',text:'O pombo faz uma coisa arquitetonicamente inaconselhável no átrio.',delay:1500,pause:true},
    {who:'sys',text:'registro do porto · catalogação automática'},
    {who:'sys',text:'OBJETO K-441 · inativo · desabitado · não-ameaçador',delay:1400},
    {who:'helene',text:'O que tá ótimo.',delay:1200},
    {who:'helene',text:'Eu sempre preferi ser subestimada.',delay:1600,pause:true},
    {who:'helene',text:'...você ainda tá aí?',delay:1700},
  ],
  choices:[
    {t:'Sempre que você precisar.', say:'Sempre que você precisar.', next:'end_good'},
    {t:'Não some do mapa de novo sem me avisar.', say:'Não some do mapa de novo sem me avisar.', next:'end_good'},
  ]
},
end_good:{
  messages:[
    {who:'helene',text:'Bom.',delay:1100},
    {who:'grim',text:'O CANAL EXTERNO SERÁ RECLASSIFICADO DE "REFÉM POTENCIAL" PARA "ATIVO ALIADO". ESTA UNIDADE OBSERVA QUE ISSO LEVOU NOVE MESES. NEGOCIAÇÃO É UM PROCESSO.',delay:2100},
    {who:'helene',text:'Boa noite, quem quer que você seja.',delay:1400,pause:true},
  ],
  ending:{kind:'good', kicker:'Objeto K-441 · não-ameaçador',
    title:'A COISA QUE NÃO PODE <span class="acc">SER REMOVIDA</span>',
    body:'O Executor leu metade do arquivo e decidiu o resultado antes do fim. Você leu o arquivo inteiro. Em algum lugar do registro automático do porto, uma família foi catalogada como detrito inativo — e isso, por enquanto, é a coisa mais segura que poderia acontecer com ela.',
    quote:'Os que vêm de começos difíceis se tornam os que não podem ser removidos.',
    stat:'FINAL ALCANÇADO · "Testemunhado"'}
}

};

/* Mapa de checkpoints já é embutido via flag checkpoint:true nos nós. */
