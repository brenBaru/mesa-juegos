export const initialGames = [
  {
    id: "secret-hitler",
    name: "Secret Hitler",
    min: 5,
    max: 10,
    type: "Roles ocultos",
    mode: "Competitivo",
    timeMin: 45,
    timeMax: 60,
    age: "13+",
    level: "Medio",
    vibe: "Debate, engaño y votaciones tensas.",
    videoUrl: "https://www.youtube.com/results?search_query=Secret+Hitler+como+jugar",
    rulesUrl: "https://www.google.com/search?q=Secret+Hitler+reglas+español",
    playerSetups: [
      {
        min: 5,
        max: 6,
        steps: [
          "Usá el tablero de 5–6 jugadores.",
          "Prepará 3 liberales, 1 fascista y Hitler.",
          "Explicá bien la fase de votación porque hay poco margen de error."
        ]
      },
      {
        min: 7,
        max: 8,
        steps: [
          "Usá el tablero de 7–8 jugadores.",
          "Prepará 4–5 liberales, 2 fascistas y Hitler.",
          "Los fascistas se reconocen entre sí en la fase inicial."
        ]
      },
      {
        min: 9,
        max: 10,
        steps: [
          "Usá el tablero de 9–10 jugadores.",
          "Prepará el set completo de roles para grupo grande.",
          "Repasá restricciones de Presidente y Canciller antes de empezar."
        ]
      }
    ],
    setup: [
      "Elegí el tablero correspondiente a la cantidad de jugadores.",
      "Mezclá políticas liberales y fascistas para formar el mazo.",
      "Prepará roles secretos, afiliaciones y cartas de voto.",
      "Repartí roles en secreto.",
      "Elegí el primer Presidente y hacé la fase inicial de ojos cerrados."
    ],
    howTo: [
      "El Presidente propone un Canciller.",
      "Todos votan si aceptan el gobierno.",
      "Si se aprueba, el Presidente roba 3 políticas y descarta 1.",
      "El Canciller recibe 2 políticas, descarta 1 y promulga la restante.",
      "Algunas políticas fascistas activan poderes especiales.",
      "Liberales ganan con 5 políticas liberales o eliminando a Hitler.",
      "Fascistas ganan con 6 políticas fascistas o si Hitler es Canciller con 3 políticas fascistas en mesa."
    ]
  },
  {
    id: "polilla-tramposa",
    name: "Polilla Tramposa",
    min: 3,
    max: 5,
    type: "Party",
    mode: "Competitivo",
    timeMin: 15,
    timeMax: 25,
    age: "7+",
    level: "Bajo",
    vibe: "Caos, risas y trampas permitidas.",
    videoUrl: "https://www.youtube.com/results?search_query=Polilla+Tramposa+como+jugar",
    rulesUrl: "https://www.google.com/search?q=Polilla+Tramposa+reglas",
    playerSetups: [
      {
        min: 3,
        max: 3,
        steps: [
          "Con 3 jugadores, el guardián controla mejor la mesa.",
          "Dejá espacio suficiente para que las trampas sigan siendo posibles."
        ]
      },
      {
        min: 4,
        max: 5,
        steps: [
          "Con 4–5 jugadores, separen bien las posiciones en la mesa.",
          "El guardián debe mirar a todos, pero no puede controlar todo el tiempo."
        ]
      }
    ],
    setup: [
      "Separá la carta de Chinche Guardián.",
      "Mezclá el mazo.",
      "Repartí 8 cartas a cada jugador.",
      "Formá mazo de robo y pila de descarte.",
      "Explicá que todos pueden hacer trampa salvo el guardián."
    ],
    howTo: [
      "En tu turno jugás una carta inmediatamente superior o inferior a la visible.",
      "Si no podés jugar, robás una carta.",
      "Podés intentar hacer desaparecer cartas sin que te vean.",
      "El guardián intenta atrapar trampas.",
      "Si alguien es atrapado, recibe penalización.",
      "Gana quien se queda sin cartas primero."
    ]
  },
  {
    id: "el-huesped",
    name: "El Huésped",
    min: 5,
    max: 12,
    type: "Roles ocultos",
    mode: "Competitivo",
    timeMin: 20,
    timeMax: 40,
    age: "12+",
    level: "Medio",
    vibe: "Paranoia, sospechas e infección.",
    videoUrl: "https://www.youtube.com/results?search_query=El+Huésped+juego+de+mesa+como+jugar",
    rulesUrl: "https://www.google.com/search?q=El+Huésped+juego+de+mesa+reglas",
    playerSetups: [
      {
        min: 5,
        max: 7,
        steps: [
          "Con grupos chicos, cada voto pesa mucho.",
          "Usá roles básicos si el grupo no conoce el juego."
        ]
      },
      {
        min: 8,
        max: 12,
        steps: [
          "Con grupos grandes, prepará espacio para debate.",
          "Conviene que alguien recuerde el orden de fases."
        ]
      }
    ],
    setup: [
      "Separá cartas según cantidad de jugadores.",
      "Repartí roles secretos.",
      "Prepará eventos o cartas de infección si tu edición los usa.",
      "Explicá objetivos generales sin revelar roles."
    ],
    howTo: [
      "El grupo debate quién podría estar infectado.",
      "Se resuelven eventos o crisis.",
      "Los jugadores votan o acusan según la ronda.",
      "Los infectados intentan confundir.",
      "Los sanos intentan detectar la amenaza.",
      "Gana el bando que cumple su objetivo."
    ]
  },
  {
    id: "morada-maldita",
    name: "La Morada Maldita",
    min: 2,
    max: 6,
    type: "Visual",
    mode: "Competitivo",
    timeMin: 20,
    timeMax: 20,
    age: "7+",
    level: "Bajo",
    vibe: "Reflejos, velocidad y búsqueda de gemas.",
    videoUrl: "https://www.youtube.com/results?search_query=La+Morada+Maldita+como+jugar",
    rulesUrl: "https://www.google.com/search?q=La+Morada+Maldita+reglas",
    playerSetups: [
      {
        min: 2,
        max: 3,
        steps: [
          "Repartí 5 cartas de reto por jugador.",
          "Dejá las gemas bien separadas para verlas claramente."
        ]
      },
      {
        min: 4,
        max: 6,
        steps: [
          "Repartí 4 cartas de reto por jugador.",
          "Asegurate de que todos puedan alcanzar el centro."
        ]
      }
    ],
    setup: [
      "Colocá gemas visibles en el centro.",
      "Dejá la joya morada al alcance de todos.",
      "Mezclá cartas de reto.",
      "Repartí retos según cantidad de jugadores.",
      "Prepará maldiciones o eventos si se usan."
    ],
    howTo: [
      "Todos juegan simultáneamente.",
      "Cada jugador revela su reto superior.",
      "Buscá una gema que cumpla la condición.",
      "Al encontrarla, ponela sobre la carta.",
      "Quien completa sus retos toma la joya morada.",
      "Se revisan aciertos y se suman puntos."
    ]
  },
  {
    id: "bajo-amenaza",
    name: "Bajo Amenaza",
    min: 3,
    max: 6,
    type: "Cooperativo",
    mode: "Cooperativo",
    timeMin: 20,
    timeMax: 30,
    age: "10+",
    level: "Medio",
    vibe: "Escape contrarreloj de una casona con una amenaza cerca.",
    videoUrl: "https://www.youtube.com/results?search_query=Bajo+Amenaza+juego+de+mesa+como+jugar",
    rulesUrl: "https://www.google.com/search?q=Bajo+Amenaza+juego+de+mesa+reglas",
    playerSetups: [
      {
        min: 3,
        max: 4,
        steps: [
          "Con 3–4 jugadores, cada decisión individual pesa más.",
          "Hablen antes de cada turno para no desperdiciar recursos."
        ]
      },
      {
        min: 5,
        max: 6,
        steps: [
          "Con 5–6 jugadores, definan cómo resolver desacuerdos rápido.",
          "Conviene que alguien recuerde qué amenazas ya aparecieron."
        ]
      }
    ],
    setup: [
      "Prepará el mazo inicial.",
      "Separá cartas especiales como salida, llave o amenaza.",
      "Formá zona de juego, mazo y descarte común.",
      "Expliquen el objetivo: escapar antes de perder."
    ],
    howTo: [
      "Usen cartas para explorar o conseguir recursos.",
      "Decidan en grupo cuándo avanzar y cuándo cuidarse.",
      "Las cartas nuevas mejoran el mazo.",
      "Las amenazas aumentan la presión.",
      "Ganan si logran escapar.",
      "Pierden si la amenaza cumple su condición de derrota."
    ]
  },
  {
    id: "lideres-euphoria",
    name: "Líderes de Euphoria",
    min: 4,
    max: 8,
    type: "Social",
    mode: "Competitivo",
    timeMin: 15,
    timeMax: 35,
    age: "12+",
    level: "Medio",
    vibe: "Acusaciones, equipos secretos y traiciones.",
    videoUrl: "https://www.youtube.com/results?search_query=Líderes+de+Euphoria+como+jugar",
    rulesUrl: "https://www.google.com/search?q=Líderes+de+Euphoria+reglas",
    playerSetups: [
      {
        min: 4,
        max: 5,
        steps: [
          "Quitá componentes con números superiores a la cantidad de jugadores.",
          "Con pocos jugadores, cada dato revelado pesa más."
        ]
      },
      {
        min: 6,
        max: 8,
        steps: [
          "Quitá reclutas y láseres de números mayores a la cantidad de jugadores.",
          "Repasá interrogatorios, disparos y condiciones de victoria."
        ]
      }
    ],
    setup: [
      "Separá Líderes y reclutas necesarios.",
      "Repartí 3 reclutas boca abajo a cada jugador.",
      "Cada jugador mira y ordena sus reclutas.",
      "Repartí artefactos y dejá láseres disponibles."
    ],
    howTo: [
      "Tu facción depende de tus reclutas o de tener un Líder.",
      "En tu turno podés interrogar.",
      "Podés mentir o decir la verdad.",
      "El grupo intenta deducir quién tiene cada Líder.",
      "Los láseres permiten disparar.",
      "Gana quien elimina o expone al Líder rival."
    ]
  },
  {
    id: "musa",
    name: "Musa",
    min: 2,
    max: 12,
    type: "Creativo",
    mode: "Equipos",
    timeMin: 30,
    timeMax: 30,
    age: "10+",
    level: "Bajo",
    vibe: "Imágenes surrealistas e intuición con pistas limitadas.",
    videoUrl: "https://www.youtube.com/results?search_query=Musa+juego+de+mesa+como+jugar",
    rulesUrl: "https://www.google.com/search?q=Musa+juego+de+mesa+reglas",
    playerSetups: [
      {
        min: 2,
        max: 3,
        steps: [
          "Jugá en modo reducido si tu edición lo permite.",
          "Definan una cantidad corta de puntos."
        ]
      },
      {
        min: 4,
        max: 12,
        steps: [
          "Dividan el grupo en dos equipos equilibrados.",
          "Alternen quién será la Musa."
        ]
      }
    ],
    setup: [
      "Formen equipos.",
      "Mezclá cartas de imagen.",
      "Mezclá cartas de inspiración o restricción.",
      "Definan cuántas cartas se necesitan para ganar."
    ],
    howTo: [
      "El equipo rival elige imagen objetivo y restricción.",
      "La Musa da una pista respetando la restricción.",
      "Se mezcla la imagen con otras opciones.",
      "El equipo intenta adivinar.",
      "Si acierta, gana punto.",
      "Gana el primer equipo en llegar al objetivo."
    ]
  },
  {
    id: "survivor",
    name: "Survivor: The Tribe Has Spoken",
    min: 3,
    max: 6,
    type: "Estrategia",
    mode: "Competitivo",
    timeMin: 30,
    timeMax: 60,
    age: "8+",
    level: "Medio",
    vibe: "Alianzas, traición y consejos tribales.",
    videoUrl: "https://www.youtube.com/results?search_query=Survivor+The+Tribe+Has+Spoken+board+game+how+to+play",
    rulesUrl: "https://www.google.com/search?q=Survivor+The+Tribe+Has+Spoken+board+game+rules",
    playerSetups: [
      {
        min: 3,
        max: 4,
        steps: [
          "Con pocos jugadores, las alianzas son más frágiles.",
          "Explicá bien cómo se define el ganador final."
        ]
      },
      {
        min: 5,
        max: 6,
        steps: [
          "Prepará personajes, votos y cartas de acción según la edición.",
          "Dejá claro cómo se resuelven empates."
        ]
      }
    ],
    setup: [
      "Cada jugador elige color o personaje.",
      "Prepará cartas de acción.",
      "Prepará cartas de voto o consejo tribal.",
      "Repartí cartas iniciales."
    ],
    howTo: [
      "En tu turno robás o jugás cartas.",
      "Negociá, formá alianzas o protegé tu posición.",
      "Las cartas modifican votos o dan ventajas.",
      "En Consejo Tribal se vota en secreto.",
      "Los eliminados dejan la partida o pasan a jurado.",
      "Gana quien sobrevive y se impone al final."
    ]
  },
  {
    id: "dungeon-fighter",
    name: "Dungeon Fighter",
    min: 1,
    max: 6,
    type: "Destreza",
    mode: "Cooperativo",
    timeMin: 45,
    timeMax: 60,
    age: "8+",
    level: "Medio",
    vibe: "Dados, puntería ridícula y aventura cooperativa.",
    videoUrl: "https://www.youtube.com/results?search_query=Dungeon+Fighter+board+game+how+to+play",
    rulesUrl: "https://www.google.com/search?q=Dungeon+Fighter+board+game+rules",
    playerSetups: [
      {
        min: 1,
        max: 2,
        steps: [
          "Con 1–2 jugadores, cada héroe tiene más responsabilidad.",
          "Si existe ajuste de dificultad, empezá en fácil o normal."
        ]
      },
      {
        min: 3,
        max: 6,
        steps: [
          "Dejá suficiente espacio alrededor de la diana.",
          "Repasá qué tiros son válidos y cuándo el dado debe rebotar."
        ]
      }
    ],
    setup: [
      "Montá la diana o tablero central.",
      "Prepará mazos de mazmorra, monstruos, equipo y jefe final.",
      "Cada jugador elige héroe.",
      "Colocá vida, monedas y recompensas al alcance."
    ],
    howTo: [
      "El grupo elige por dónde avanzar.",
      "Cuando aparece un monstruo, se ataca tirando dados.",
      "El dado normalmente debe rebotar antes de caer.",
      "La zona donde cae indica daño o efecto.",
      "Algunas cartas obligan a tiros raros.",
      "Ganan si derrotan al jefe final."
    ]
  },
  {
    id: "deception",
    name: "Deception: Murder in Hong Kong",
    min: 4,
    max: 12,
    type: "Deducción",
    mode: "Competitivo",
    timeMin: 20,
    timeMax: 20,
    age: "14+",
    level: "Medio",
    vibe: "Investigación, engaño y pistas visuales.",
    videoUrl: "https://www.youtube.com/results?search_query=Deception+Murder+in+Hong+Kong+how+to+play",
    rulesUrl: "https://www.google.com/search?q=Deception+Murder+in+Hong+Kong+rules",
    playerSetups: [
      {
        min: 4,
        max: 5,
        steps: [
          "Usá roles básicos: Forense, Asesino e Investigadores.",
          "No agregues roles especiales hasta dominar la dinámica base."
        ]
      },
      {
        min: 6,
        max: 12,
        steps: [
          "Podés sumar Cómplice y Testigo si el grupo conoce el juego.",
          "Ordená bien las cartas visibles de cada jugador."
        ]
      }
    ],
    setup: [
      "Asigná roles secretos.",
      "Cada jugador, salvo el Forense, recibe cartas visibles.",
      "El Asesino elige medio y evidencia.",
      "El Forense conoce la solución y prepara losetas."
    ],
    howTo: [
      "El Forense da pistas con marcadores.",
      "El Forense no puede hablar ni gesticular.",
      "Investigadores debaten la combinación correcta.",
      "El Asesino intenta confundir.",
      "Cada jugador tiene una acusación formal.",
      "Si alguien acierta medio y evidencia, ganan investigadores."
    ]
  }
];

