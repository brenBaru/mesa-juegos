import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  Star,  
  Clock,
  StarOff,
  Plus,
  Minus,
  ArrowLeft,
  Trophy,
  BookOpen,
  PlayCircle,
  Home,
  Heart,
  Filter,
  ExternalLink,
  Save,
  Trash2,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal
} from "lucide-react";
import { useAuth } from "./hooks/useAuth";
import {
  subscribeGames,
  subscribeFavs,
  setFavs as saveFavsToFirestore,
  upsertGame,
  deleteGame
} from "./data/firestoreGames";

const APP_NAME = "Roll For Game";
const APP_SUBTITLE = "Elige tu próxima partida";

const initialGames = [
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

const typeOptions = [
  "Todos",
  "Roles ocultos",
  "Party",
  "Visual",
  "Cooperativo",
  "Social",
  "Creativo",
  "Estrategia",
  "Destreza",
  "Deducción"
];

const modeOptions = ["Todos", "Competitivo", "Cooperativo", "Equipos"];
const timeOptions = ["Todos", "Rápido", "Medio", "Largo"];

const emptyForm = {
  name: "",
  min: 2,
  max: 6,
  type: "Party",
  mode: "Competitivo",
  timeMin: 20,
  timeMax: 30,
  age: "",
  level: "Medio",
  vibe: "",
  videoUrl: "",
  rulesUrl: "",
  setupText: "",
  howToText: ""
};

function D12Logo({ compact = false }) {
  return (
    <div className={`flex items-center justify-center rounded-2xl border border-emerald-400/35 bg-emerald-400/10 shadow-lg transition-all ${compact ? "h-10 w-10" : "h-12 w-12"}`}>
      <svg viewBox="0 0 100 100" className={compact ? "h-7 w-7" : "h-9 w-9"} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 6 L84 20 L96 52 L74 88 L50 96 L26 88 L4 52 L16 20 Z" stroke="#34d399" strokeWidth="6" strokeLinejoin="round" fill="rgba(52, 211, 153, 0.10)" />
        <path d="M50 6 L50 30 M16 20 L36 42 M84 20 L64 42 M4 52 L32 58 M96 52 L68 58 M26 88 L40 66 M74 88 L60 66" stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
        <circle cx="50" cy="52" r="23" fill="rgba(15, 23, 42, 0.9)" stroke="#34d399" strokeWidth="4" />
        <text x="50" y="60" textAnchor="middle" fontSize="25" fontWeight="900" fill="#a7f3d0" fontFamily="Arial, sans-serif">12</text>
      </svg>
    </div>
  );
}

function DragonCornerIcon({ compact = false }) {
  return (
    <div className={`flex items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 shadow-lg transition-all ${compact ? "h-10 w-10" : "h-12 w-12"}`}>
      <svg viewBox="0 0 120 120" className={compact ? "h-7 w-7" : "h-9 w-9"} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 42 C76 20 98 17 108 30 C95 31 88 39 84 49 C96 48 105 54 110 66 C92 64 78 58 66 48" fill="rgba(103,232,249,.18)" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 80 C40 58 52 48 69 43 C61 54 63 66 76 76 C61 77 48 74 36 88" fill="rgba(52,211,153,.16)" stroke="#34d399" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M62 39 C66 27 78 22 90 27 C84 31 82 36 85 42 C75 39 69 40 62 47" fill="rgba(52,211,153,.18)" stroke="#34d399" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M83 27 L93 16 L90 31" stroke="#a7f3d0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36 86 C25 96 17 92 13 84 C23 87 29 82 34 74" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="77" cy="34" r="2.7" fill="#a7f3d0" />
      </svg>
    </div>
  );
}

function timeText(game) {
  return game.timeMin === game.timeMax ? `${game.timeMin} min` : `${game.timeMin}–${game.timeMax} min`;
}

function timeLabel(game) {
  if (game.timeMax <= 25) return "Rápido";
  if (game.timeMax <= 45) return "Medio";
  return "Largo";
}

function getPlayerSpecificSetup(game, players) {
  if (!game.playerSetups) return [];
  const match = game.playerSetups.find((rule) => players >= rule.min && players <= rule.max);
  return match ? match.steps : [];
}

function Chip({ children, variant = "default" }) {
  const styles = {
    default: "bg-slate-800 text-slate-200 border border-slate-700",
    ok: "bg-emerald-400/15 text-emerald-200 border border-emerald-400/40",
    purple: "bg-violet-400/15 text-violet-100 border border-violet-400/40",
    danger: "bg-red-400/15 text-red-200 border border-red-400/40"
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${styles[variant]}`}>
      {children}
    </span>
  );
}

function LabeledSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-12 w-full rounded-2xl border border-cyan-400/25 bg-slate-900 px-3 text-sm font-bold text-slate-100 outline-none focus:ring-2 focus:ring-emerald-300">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-slate-300">{label}</span>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-emerald-300" />
    </label>
  );
}

function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-slate-300">{label}</span>
      <textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="min-h-[110px] w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-emerald-300" />
    </label>
  );
}

function ToastMessage({ toast }) {
  if (!toast) return null;

  return (
    <div className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-emerald-400/35 bg-slate-950/95 px-4 py-3 text-sm font-bold text-emerald-100 shadow-2xl backdrop-blur-xl">
      {toast.message}
    </div>
  );
}

function DeleteConfirmModal({ game, onCancel, onConfirm }) {
  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] border border-red-400/30 bg-slate-950 p-5 text-slate-100 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-red-200">
            <Trash2 size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Borrar juego</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Vas a borrar <b translate="no" className="notranslate">{game.name}</b> de tu listado. Esta acción también lo quita de favoritos.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            onClick={onCancel}
            className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm font-black text-slate-200"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="rounded-2xl bg-red-500 px-3 py-3 text-sm font-black text-white"
          >
            Sí, borrar
          </button>
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ authLoading, loginGoogle, onContinueOffline }) {
  return (
    <div translate="no" className="notranslate min-h-screen bg-[#031313] px-4 py-6 text-slate-100">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-cyan-400/20 bg-[radial-gradient(circle_at_top_left,#0f766e_0,#062b2e_35%,#020617_80%)] p-6 shadow-2xl lg:p-10">
          <div className="flex items-center gap-4">
            <D12Logo />
            <div>
              <h1 translate="no" className="notranslate text-3xl font-black text-white lg:text-5xl">{APP_NAME}</h1>
              <p className="mt-1 text-xs font-black uppercase tracking-wide text-emerald-300 lg:text-sm">
                {APP_SUBTITLE}
              </p>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-lg font-semibold leading-7 text-slate-200 lg:text-xl">
            Organizá tu próxima partida, filtrá juegos por cantidad de jugadores, guardá favoritos y mantené tus guías sincronizadas entre dispositivos.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="text-2xl font-black text-emerald-200">1</p>
              <p className="mt-1 text-sm text-slate-300">Elegí participantes</p>
            </div>

            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4">
              <p className="text-2xl font-black text-cyan-200">2</p>
              <p className="mt-1 text-sm text-slate-300">Filtrá opciones</p>
            </div>

            <div className="rounded-3xl border border-violet-400/20 bg-violet-400/10 p-4">
              <p className="text-2xl font-black text-violet-200">3</p>
              <p className="mt-1 text-sm text-slate-300">Guardá tu guía</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-700 bg-slate-950/90 p-6 shadow-2xl lg:p-8">
          <div className="flex justify-end">
            <DragonCornerIcon />
          </div>

          <h2 className="mt-6 text-2xl font-black text-white">Ingresar</h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Iniciá sesión con Google para guardar favoritos, juegos importados y cambios en preparación/instrucciones.
          </p>

          <button
            onClick={loginGoogle}
            disabled={authLoading}
            className="mt-6 flex w-full items-center justify-center rounded-3xl bg-emerald-400 px-4 py-4 text-sm font-black text-slate-950 disabled:opacity-60"
          >
            {authLoading ? "Cargando..." : "Ingresar con Google"}
          </button>

          <button
            onClick={onContinueOffline}
            className="mt-3 flex w-full items-center justify-center rounded-3xl border border-slate-700 bg-slate-900 px-4 py-4 text-sm font-black text-slate-200"
          >
            Continuar sin sincronizar
          </button>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Si continuás sin iniciar sesión, los datos quedan solo en este navegador.
          </p>
        </section>
      </div>
    </div>
  );
}

function readValue(item, keys, fallback = "") {
  for (const key of keys) {
    if (item[key] !== undefined && item[key] !== null && item[key] !== "") {
      return item[key];
    }
  }

  return fallback;
}

function toNumber(value, fallback) {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }

  const match = String(value || "").match(/\d+/);

  return match ? Number(match[0]) : fallback;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeCatalogGame(item, index) {
  if (typeof item === "string") {
    return {
      id: `catalog-${slugify(item) || index}`,
      name: item,
      min: 2,
      max: 6,
      type: "Party",
      mode: "Competitivo",
      timeMin: 20,
      timeMax: 40,
      age: "N/D",
      level: "Medio",
      vibe: "Juego importado desde catálogo."
    };
  }

  const name = readValue(item, [
    "name",
    "Name",
    "nombre",
    "Nombre",
    "title",
    "Title"
  ], "Sin nombre");

  const min = toNumber(
    readValue(item, ["min", "minPlayers", "minplayers", "min_players", "Min Players"]),
    2
  );

  const max = toNumber(
    readValue(item, ["max", "maxPlayers", "maxplayers", "max_players", "Max Players"]),
    6
  );

  const playingTime = toNumber(
    readValue(item, ["playingTime", "playingtime", "time", "Tiempo", "duration"]),
    40
  );

  const timeMin = toNumber(
    readValue(item, ["timeMin", "minPlayTime", "minplaytime", "Min Play Time"]),
    playingTime
  );

  const timeMax = toNumber(
    readValue(item, ["timeMax", "maxPlayTime", "maxplaytime", "Max Play Time"]),
    playingTime
  );

  return {
    id:
      readValue(item, ["id", "ID", "bggId", "objectid"], "") ||
      `catalog-${slugify(name) || index}`,

    name,
    min,
    max,

    type: readValue(item, ["type", "Tipo", "category", "Categoría"], "BGG"),
    mode: readValue(item, ["mode", "Modo"], "Competitivo"),

    timeMin,
    timeMax,

    age: readValue(item, ["age", "Edad", "minAge", "minage"], "N/D"),
    level: readValue(item, ["level", "Dificultad"], "Medio"),

    vibe: readValue(
      item,
      ["vibe", "description", "Descripción", "descripcion", "summary"],
      "Juego importado desde catálogo."
    )
  };
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [players, setPlayers] = useState(5);
  const { user, authLoading, loginGoogle, logout } = useAuth();
  const [cloudGames, setCloudGames] = useState([]);
  const [cloudFavs, setCloudFavs] = useState([]);
  const [cloudLoading, setCloudLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleteNotice, setDeleteNotice] = useState(null);
  const [allowOffline, setAllowOffline] = useState(false);
  const [query, setQuery] = useState("");
  const [onlyPlayable, setOnlyPlayable] = useState(true);
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [modeFilter, setModeFilter] = useState("Todos");
  const [timeFilter, setTimeFilter] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);
  const [isCompactHeader, setIsCompactHeader] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [customGames, setCustomGames] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mesa-juegos-custom")) || [];
    } catch {
      return [];
    }
  });

  const [favs, setFavs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mesa-juegos-favs")) || [];
    } catch {
      return [];
    }
  });

  const [importQuery, setImportQuery] = useState("");
  const [importResults, setImportResults] = useState([]);
  const [importLoading, setImportLoading] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);

  const effectiveCustomGames = user ? cloudGames : customGames;
  const effectiveFavs = user ? cloudFavs : favs;

  const games = useMemo(
    () => [...initialGames, ...effectiveCustomGames],
    [effectiveCustomGames]
  );


  useEffect(() => {
    if (!user) {
      setCloudGames([]);
      setCloudFavs([]);
      setCloudLoading(false);
      return;
    }

    setCloudLoading(true);

    const unsubscribeGames = subscribeGames(user.uid, (list) => {
      setCloudGames(list);
      setCloudLoading(false);
    });

    const unsubscribeFavs = subscribeFavs(user.uid, (ids) => {
      setCloudFavs(ids);
    });

    return () => {
      unsubscribeGames();
      unsubscribeFavs();
    };
  }, [user]);

  useEffect(() => {
    let active = true;

    fetch("/catalog.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("No se pudo cargar catalog.json");
      }

      return res.json();
    })
    .then((data) => {
      const list = Array.isArray(data)
        ? data
        : data.games || data.items || data.collection || [];

      const normalizedCatalog = list
        .map((item, index) => normalizeCatalogGame(item, index))
        .filter((game) => game.name && game.name !== "Sin nombre");

      if (active) {
        setCatalog(normalizedCatalog);
      }
    })
    .catch((error) => {
      console.error("Error cargando catálogo local", error);

      if (active) {
        setCatalog([]);
      }
    })
    .finally(() => {
      if (active) {
        setCatalogLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsCompactHeader(window.scrollY > 90);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("mesa-juegos-favs", JSON.stringify(favs));
    }
  }, [favs, user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("mesa-juegos-custom", JSON.stringify(customGames));
    }
  }, [customGames, user]);

  const playable = (game) => players >= Number(game.min) && players <= Number(game.max);

  const visibleGames = useMemo(() => {
    return games
      .filter((game) => screen !== "favorites" || effectiveFavs.includes(game.id))
      .filter((game) => !onlyPlayable || playable(game))
      .filter((game) => typeFilter === "Todos" || game.type === typeFilter)
      .filter((game) => modeFilter === "Todos" || game.mode === modeFilter)
      .filter((game) => timeFilter === "Todos" || timeLabel(game) === timeFilter)
      .filter((game) => `${game.name} ${game.type} ${game.mode}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => Number(playable(b)) - Number(playable(a)) || a.name.localeCompare(b.name));
  }, [games, players, onlyPlayable, typeFilter, modeFilter, timeFilter, query, effectiveFavs, screen]);

  const saveManualGame = async () => {
    if (!form.name.trim()) return;

    const setup = form.setupText
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    const howTo = form.howToText
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    const newGame = {
      id: `custom-${Date.now()}`,
      custom: true,
      name: form.name.trim(),
      min: Number(form.min),
      max: Number(form.max),
      type: form.type,
      mode: form.mode,
      timeMin: Number(form.timeMin),
      timeMax: Number(form.timeMax),
      age: form.age || "N/D",
      level: form.level,
      vibe: form.vibe || "Juego agregado manualmente.",
      videoUrl:
        form.videoUrl ||
        `https://www.youtube.com/results?search_query=${encodeURIComponent(
          form.name + " como jugar"
        )}`,
      rulesUrl:
        form.rulesUrl ||
        `https://www.google.com/search?q=${encodeURIComponent(
          form.name + " reglas"
        )}`,
      setup: setup.length
        ? setup
        : ["Prepará los componentes del juego según el reglamento."],
      howTo: howTo.length
        ? howTo
        : ["Jugá siguiendo la secuencia indicada por el reglamento."],
      playerSetups: []
    };

    if (user) {
      await upsertGame(user.uid, newGame);
    } else {
      setCustomGames((prev) => [newGame, ...prev]);
    }

    setSelected(newGame);
    setForm(emptyForm);
    setScreen("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFav = async (id) => {
    if (!user) {
      setFavs((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
      return;
    }

    const nextFavs = effectiveFavs.includes(id)
      ? effectiveFavs.filter((x) => x !== id)
      : [...effectiveFavs, id];

    await saveFavsToFirestore(user.uid, nextFavs);
  };

  const showToast = (message) => {
    setToast({ message });
    window.setTimeout(() => setToast(null), 2800);
  };

  const requestDeleteGame = (game) => {
    setPendingDelete(game);
  };

  const confirmDeleteGame = async () => {
    if (!pendingDelete) return;

    const deletedId = pendingDelete.id;
    const deletedName = pendingDelete.name;

    if (user) {
      await deleteGame(user.uid, deletedId);
      await saveFavsToFirestore(
        user.uid,
        effectiveFavs.filter((fav) => fav !== deletedId)
      );
    } else {
      setCustomGames((prev) => prev.filter((game) => game.id !== deletedId));
      setFavs((prev) => prev.filter((fav) => fav !== deletedId));
    }

    setPendingDelete(null);
    setSelected(null);
    setScreen("home");
    setDeleteNotice({ name: deletedName });
    showToast(`Se borró ${deletedName} del listado.`);
  };

  const searchGames = (query) => {
    if (!query.trim() || query.length < 3) {
      setImportResults([]);
      return;
    }

    setImportLoading(true);

    const normalizedQuery = query.toLowerCase();

    const results = catalog
      .filter((game) =>
        `${game.name} ${game.type} ${game.mode} ${game.vibe}`
          .toLowerCase()
          .includes(normalizedQuery)
      )
      .slice(0, 12);

    setImportResults(results);
    setImportLoading(false);
  };

  if (!authLoading && !user && !allowOffline) {
    return (
      <>
        <ToastMessage toast={toast} />
        <LoginScreen
          authLoading={authLoading}
          loginGoogle={loginGoogle}
          onContinueOffline={() => setAllowOffline(true)}
        />
      </>
    );
  }

  if (screen === "detail" && selected) {
    const playerSpecificSetup = getPlayerSpecificSetup(selected, players);

    return (
      <div translate="no" className="notranslate min-h-screen bg-[#031313] text-slate-100">
        <ToastMessage toast={toast} />
        <DeleteConfirmModal
          game={pendingDelete}
          onCancel={() => setPendingDelete(null)}
          onConfirm={confirmDeleteGame}
        />
        <div className="mx-auto min-h-screen max-w-md bg-[radial-gradient(circle_at_top_left,#0f766e_0,#062b2e_32%,#020617_75%)] pb-6 shadow-2xl">
          <div className="sticky top-0 z-20 border-b border-cyan-400/20 bg-slate-950/90 px-4 py-3 backdrop-blur-xl">
            <button onClick={() => { setScreen("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2 text-sm font-bold text-emerald-300">
              <ArrowLeft size={16} />
              Volver
            </button>
          </div>

          <div className="overflow-hidden rounded-b-[2rem] bg-gradient-to-br from-slate-900 via-teal-950 to-cyan-950 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Chip variant={playable(selected) ? "ok" : "danger"}>
                  {playable(selected) ? "Se puede jugar" : "No entra con este grupo"}
                </Chip>
                <h1 translate="no" className="notranslate mt-4 text-3xl font-black text-white">{selected.name}</h1>
                <p className="mt-2 text-sm text-cyan-100">{selected.vibe}</p>
              </div>

              <button onClick={() => toggleFav(selected.id)} className="rounded-2xl bg-slate-800 p-3">
                {effectiveFavs.includes(selected.id) ? <Star className="text-emerald-300" /> : <StarOff className="text-slate-300" />}
              </button>
            </div>
          </div>

          <div className="space-y-5 p-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-3">
                <Users className="mx-auto h-4 w-4 text-emerald-300" />
                <p className="text-xs text-slate-400">Jug.</p>
                <b>{selected.min}–{selected.max}</b>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-3">
                <Clock className="mx-auto h-4 w-4 text-cyan-300" />
                <p className="text-xs text-slate-400">Tiempo</p>
                <b>{timeText(selected)}</b>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-3">
                <Trophy className="mx-auto h-4 w-4 text-violet-300" />
                <p className="text-xs text-slate-400">Nivel</p>
                <b>{selected.level}</b>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a href={selected.videoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-3 py-3 text-sm font-black text-slate-950">
                Video <ExternalLink size={15} />
              </a>
              <a href={selected.rulesUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-3 py-3 text-sm font-black text-slate-950">
                Instructivo <ExternalLink size={15} />
              </a>
            </div>

            {playerSpecificSetup.length > 0 && (
              <section>
                <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-white">
                  <Users className="text-emerald-300" />
                  Seteo para {players} jugadores
                </h2>
                <ol className="space-y-2">
                  {playerSpecificSetup.map((step, index) => (
                    <li key={index} className="flex gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-3 text-sm leading-5 text-emerald-50">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-slate-950">{index + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <section>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-white">
                <BookOpen className="text-cyan-300" />
                Preparación del juego
              </h2>
              <ol className="space-y-2">
                {selected.setup.map((step, index) => (
                  <li key={index} className="flex gap-3 rounded-2xl border border-cyan-400/25 bg-cyan-400/10 p-3 text-sm leading-5 text-cyan-50">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-xs font-black text-slate-950">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-white">
                <PlayCircle className="text-emerald-300" />
                Cómo se juega
              </h2>
              <ol className="space-y-2">
                {selected.howTo.map((step, index) => (
                  <li key={index} className="flex gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-3 text-sm leading-5 text-emerald-50">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-slate-950">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {selected.custom && (
              <button onClick={() => requestDeleteGame(selected)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-3 py-3 text-sm font-black text-white">
                <Trash2 size={16} />
                Borrar juego agregado
              </button>
            )}

            <div className="rounded-3xl border border-amber-300/35 bg-amber-300/10 p-3 text-sm text-amber-100">
              <b>Nota:</b> esta guía sirve para arrancar rápido. Para desempates, variantes o casos especiales, revisá el reglamento de tu edición.
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (screen === "import") {
    return (
      <div translate="no" className="notranslate min-h-screen bg-[#031313] text-slate-100">
        <ToastMessage toast={toast} />
        <div className="mx-auto min-h-screen max-w-md bg-[radial-gradient(circle_at_top_left,#0f766e_0,#062b2e_32%,#020617_75%)] pb-6 shadow-2xl">
          <div className="sticky top-0 z-20 border-b border-cyan-400/20 bg-slate-950/90 px-4 py-3 backdrop-blur-xl">
            <button
              onClick={() => setScreen("add")}
              className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2 text-sm font-bold text-emerald-300"
            >
              <ArrowLeft size={16} />
              Volver
            </button>

            <h1 className="mt-4 text-2xl font-black text-white">
              Importar juego
            </h1>

            <p className="mt-1 text-sm text-slate-300">
              Buscá un juego del catálogo local para agregarlo automáticamente
            </p>
          </div>

          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-4 h-4 w-4 text-cyan-200" />

              <input
                value={importQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setImportQuery(value);
                  searchGames(value);
                }}
                placeholder="Buscar juego..."
                className="h-12 w-full rounded-3xl border border-cyan-400/25 bg-slate-900/80 pl-9 pr-3 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>
          </div>

          <div className="space-y-3 px-4">
            {catalogLoading && (
              <p className="text-sm text-slate-400">Cargando catálogo...</p>
            )}

            {!catalogLoading && importQuery.length < 3 && (
              <p className="text-sm text-slate-400">
                Escribí al menos 3 letras para buscar.
              </p>
            )}

            {!catalogLoading &&
              !importLoading &&
              importQuery.length >= 3 &&
              importResults.length === 0 && (
                <p className="text-sm text-slate-400">
                  No se encontraron resultados.
                </p>
              )}

            {importLoading && (
              <p className="text-sm text-slate-400">Buscando...</p>
            )}

            {Array.isArray(importResults) &&
              importResults.map((game) => {
                const alreadyExists = games.some(
                  (existing) =>
                    existing.name.toLowerCase() === game.name.toLowerCase()
                );

                return (
                  <div
                    key={game.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-3"
                  >
                    <div>
                      <p translate="no" className="notranslate font-bold text-white">{game.name}</p>

                      <p className="text-xs text-slate-400">
                        {game.min}–{game.max} jug · {timeText(game)} · {game.type}
                      </p>
                    </div>

                    <button
                      onClick={async () => {
                        if (alreadyExists) {
                          const existingGame = games.find(
                            (existing) =>
                              existing.name.toLowerCase() ===
                              game.name.toLowerCase()
                          );

                          setSelected(existingGame);
                          setScreen("detail");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          return;
                        }

                        const newGame = {
                          ...game,
                          custom: true,
                          videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(
                            game.name + " juego de mesa como jugar"
                          )}`,
                          rulesUrl: `https://www.google.com/search?q=${encodeURIComponent(
                            game.name + " reglas juego de mesa"
                          )}`,
                          setup: ["Preparación no disponible."],
                          howTo: ["Reglas no disponibles."],
                          playerSetups: []
                        };

                        if (user) {
                          await upsertGame(user.uid, newGame);
                        } else {
                          setCustomGames((prev) => [newGame, ...prev]);
                        }

                        setSelected(newGame);
                        setScreen("detail");
                        showToast("Juego importado correctamente.");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`shrink-0 rounded-xl px-3 py-1 text-xs font-black ${
                        alreadyExists
                          ? "bg-slate-700 text-slate-200"
                          : "bg-emerald-400 text-slate-950"
                      }`}
                    >
                      {alreadyExists ? "Ver" : "Importar"}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "add") {
    return (
      <div translate="no" className="notranslate min-h-screen bg-[#031313] text-slate-100">
        <ToastMessage toast={toast} />
        <div className="mx-auto min-h-screen w-full max-w-6xl bg-[radial-gradient(circle_at_top_left,#0f766e_0,#062b2e_32%,#020617_75%)] pb-24 shadow-2xl">
          <div className="sticky top-0 z-20 border-b border-cyan-400/20 bg-slate-950/90 px-4 py-4 backdrop-blur-xl lg:px-6">
            <button onClick={() => setScreen("home")} className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2 text-sm font-bold text-emerald-300">
              <ArrowLeft size={16} />
              Volver
            </button>

            <div className="mt-5 rounded-[2rem] border border-cyan-400/20 bg-slate-950/45 p-5 shadow-xl shadow-cyan-950/20">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Nuevo juego</p>
              <h1 className="mt-2 text-3xl font-black text-white">Agregar juego</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Cargá un juego manualmente, importalo desde el catálogo o dejá preparada una guía rápida para explicar la partida.
              </p>
            </div>
          </div>

          <main className="grid gap-4 p-4 lg:grid-cols-[0.8fr_1.2fr] lg:p-6">
            <aside className="space-y-4">
              <button
                onClick={() => setScreen("import")}
                className="flex w-full items-center justify-center gap-2 rounded-3xl bg-cyan-400 px-3 py-4 text-sm font-black text-slate-950 shadow-lg shadow-cyan-950/25">
                Importar desde catálogo
              </button>

              <div className="rounded-[2rem] border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-50">
                <b>Tip:</b> si el juego está en el catálogo, conviene importarlo primero y después completar preparación o reglas manualmente.
              </div>

              <div className="rounded-[2rem] border border-slate-700 bg-slate-950/70 p-4 text-sm leading-6 text-slate-300">
                <p className="font-black text-white">Datos mínimos</p>
                <p className="mt-1">Nombre, jugadores, duración y tipo alcanzan para que aparezca en la lista principal.</p>
              </div>
            </aside>

            <section className="space-y-4 rounded-[2rem] border border-slate-700/80 bg-slate-950/65 p-4 shadow-2xl shadow-slate-950/30 lg:p-5">
              <div className="grid gap-3 lg:grid-cols-2">
                <Field label="Nombre del juego" value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="Ej: Codenames" />
                <Field label="Edad sugerida" value={form.age} onChange={(value) => setForm({ ...form, age: value })} placeholder="Ej: 10+" />
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <Field label="Mín. jugadores" type="number" value={form.min} onChange={(value) => setForm({ ...form, min: value })} />
                <Field label="Máx. jugadores" type="number" value={form.max} onChange={(value) => setForm({ ...form, max: value })} />
                <Field label="Tiempo mín." type="number" value={form.timeMin} onChange={(value) => setForm({ ...form, timeMin: value })} />
                <Field label="Tiempo máx." type="number" value={form.timeMax} onChange={(value) => setForm({ ...form, timeMax: value })} />
              </div>

              <div className="grid gap-3 lg:grid-cols-3">
                <LabeledSelect label="Tipo" value={form.type} onChange={(value) => setForm({ ...form, type: value })} options={typeOptions.filter((x) => x !== "Todos")} />
                <LabeledSelect label="Modo" value={form.mode} onChange={(value) => setForm({ ...form, mode: value })} options={modeOptions.filter((x) => x !== "Todos")} />
                <LabeledSelect label="Dificultad" value={form.level} onChange={(value) => setForm({ ...form, level: value })} options={["Bajo", "Medio", "Alto"]} />
              </div>

              <Field label="Resumen" value={form.vibe} onChange={(value) => setForm({ ...form, vibe: value })} placeholder="Ej: Deducción rápida por equipos" />

              <div className="grid gap-3 lg:grid-cols-2">
                <Field label="Link a video" value={form.videoUrl} onChange={(value) => setForm({ ...form, videoUrl: value })} placeholder="Opcional" />
                <Field label="Link a instructivo/reglas" value={form.rulesUrl} onChange={(value) => setForm({ ...form, rulesUrl: value })} placeholder="Opcional" />
              </div>

              <div className="grid gap-3 lg:grid-cols-2">
                <TextAreaField label="Preparación" value={form.setupText} onChange={(value) => setForm({ ...form, setupText: value })} placeholder={"Un paso por línea.\nEj: Separar cartas.\nRepartir roles.\nPreparar tablero."} />
                <TextAreaField label="Cómo se juega" value={form.howToText} onChange={(value) => setForm({ ...form, howToText: value })} placeholder={"Un paso por línea.\nEj: En tu turno robás una carta.\nLuego jugás una acción.\nGana quien llegue al objetivo."} />
              </div>

              <button onClick={saveManualGame} className="flex w-full items-center justify-center gap-2 rounded-3xl bg-emerald-400 px-3 py-4 text-sm font-black text-slate-950 shadow-lg shadow-emerald-950/25">
                <Save size={18} />
                Guardar juego
              </button>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div translate="no" className="notranslate min-h-screen bg-[#031313] text-slate-100">
      <ToastMessage toast={toast} />
      <DeleteConfirmModal
        game={pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDeleteGame}
      />
      <div className="mx-auto min-h-screen w-full max-w-6xl bg-[radial-gradient(circle_at_top_left,#0f766e_0,#062b2e_32%,#020617_75%)] pb-24 shadow-2xl">
        <div className={`sticky top-0 z-20 border-b border-cyan-400/20 bg-slate-950/90 px-4 backdrop-blur-xl transition-all duration-300 lg:px-6 ${isCompactHeader ? "pb-3 pt-3" : "pb-5 pt-5"}`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <D12Logo compact={isCompactHeader} />
              <div>
                <h1 translate="no" className={`notranslate font-black text-white transition-all ${isCompactHeader ? "text-xl" : "text-2xl"}`}>{APP_NAME}</h1>
                {!isCompactHeader && <p className="text-xs font-black uppercase tracking-wide text-emerald-300">{APP_SUBTITLE}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {authLoading ? (
                <span className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300">
                  ...
                </span>
              ) : user ? (
                <button
                  onClick={logout}
                  className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-200"
                  title={user.email || "Usuario logueado"}
                >
                  Salir
                </button>
              ) : (
                <button
                  onClick={loginGoogle}
                  className="rounded-2xl bg-emerald-400 px-3 py-2 text-xs font-black text-slate-950"
                >
                  Google
                </button>
              )}

              <DragonCornerIcon compact={isCompactHeader} />
            </div>
          </div>

          <div className={`grid grid-cols-1 gap-3 transition-all duration-300 lg:grid-cols-[0.9fr_1.4fr] ${isCompactHeader ? "mt-3" : "mt-5"}`}>
            <div className={`rounded-[1.7rem] border border-emerald-400/25 bg-slate-900/80 text-center shadow-lg shadow-emerald-950/20 transition-all ${isCompactHeader ? "p-1.5" : "p-2"}`}>
              {!isCompactHeader && <p className="text-[10px] font-bold uppercase text-emerald-200">Participantes</p>}
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => setPlayers((p) => Math.max(1, p - 1))} className="rounded-full bg-slate-800 p-2 text-white">
                  <Minus size={15} />
                </button>
                <span className={`w-8 text-center font-black transition-all ${isCompactHeader ? "text-xl" : "text-2xl"}`}>{players}</span>
                <button onClick={() => setPlayers((p) => p + 1)} className="rounded-full bg-emerald-400 p-2 text-slate-950">
                  <Plus size={15} />
                </button>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-4 h-4 w-4 text-cyan-200" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar juego..." className={`w-full rounded-3xl border border-cyan-400/25 bg-slate-900/80 pl-9 pr-3 text-sm text-white placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-emerald-300 ${isCompactHeader ? "h-11" : "h-full min-h-[58px]"}`} />
            </div>
          </div>

          <div className={`rounded-[1.7rem] border border-cyan-400/20 bg-gradient-to-r from-slate-950/75 via-slate-900/70 to-cyan-950/30 p-3 shadow-lg shadow-cyan-950/20 transition-all duration-300 ${isCompactHeader ? "mt-3" : "mt-4"}`}>
            <button type="button" onClick={() => setShowFilters((value) => !value)} className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">
                  <SlidersHorizontal size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-white">Filtros</p>
                  {!isCompactHeader && <p className="mt-0.5 text-xs leading-4 text-slate-400">{onlyPlayable ? "Jugables" : "Todos"} · {typeFilter} · {timeFilter} · {modeFilter}</p>}
                </div>
              </div>
              <div className="rounded-full bg-slate-800 p-2 text-slate-200">
                {showFilters ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
              </div>
            </button>

            {showFilters && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-[10px] font-black uppercase tracking-wide text-slate-400">Disponibilidad</span>
                  <button type="button" onClick={() => setOnlyPlayable((v) => !v)} className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-black transition ${onlyPlayable ? "bg-emerald-400 text-slate-950" : "border border-slate-700 bg-slate-900 text-slate-100"}`}>
                    <Filter size={15} />
                    {onlyPlayable ? "Jugables" : "Todos"}
                  </button>
                </label>

                <LabeledSelect label="Tipo" value={typeFilter} onChange={setTypeFilter} options={typeOptions} />
                <LabeledSelect label="Duración" value={timeFilter} onChange={setTimeFilter} options={timeOptions} />
                <LabeledSelect label="Modo" value={modeFilter} onChange={setModeFilter} options={modeOptions} />
              </div>
            )}
          </div>
        </div>

        <main className="p-4 lg:p-6">
          <div className="overflow-hidden rounded-[2rem] border border-emerald-300/25 bg-gradient-to-br from-emerald-300 via-cyan-300 to-teal-400 p-5 text-slate-950 shadow-2xl shadow-emerald-950/25">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold opacity-80">Disponibles ahora</p>
                <p className="text-4xl font-black">{visibleGames.length}/{screen === "favorites" ? effectiveFavs.length : games.length}</p>
              </div>
              <Trophy className="h-12 w-12 opacity-80" />
            </div>            
            <p className="mt-2 text-xs font-semibold opacity-80">{screen === "favorites"? `Mostrando favoritos para ${players} jugadores`: `Filtrando para ${players} participantes. Tocá un juego para ver preparación y cómo jugar.`}</p>
          </div>

          {deleteNotice && (
            <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
              <div className="flex items-center justify-between gap-3">
                <span>
                  <b translate="no" className="notranslate">{deleteNotice.name}</b> se borró correctamente del listado.
                </span>
                <button
                  onClick={() => setDeleteNotice(null)}
                  className="rounded-full bg-slate-900/70 px-3 py-1 text-xs font-black text-emerald-200"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {visibleGames.length === 0 && <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 text-center text-slate-300">No hay juegos con esos filtros.</div>}
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {visibleGames.map((game) => {
              const canPlay = playable(game);
            return (
              <button key={game.id} onClick={() => { setSelected(game); setScreen("detail"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="w-full rounded-3xl border border-slate-700/80 bg-slate-900/90 p-4 text-left shadow-lg transition active:scale-[0.99]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 translate="no" className="notranslate text-lg font-black text-white">{game.name}</h2>
                    <p className="text-sm text-slate-300">{game.type} · {game.mode}</p>
                  </div>
                  <span onClick={(e) => { e.stopPropagation(); toggleFav(game.id); }} className="rounded-full bg-slate-800 p-2">
                    {effectiveFavs.includes(game.id) ? <Star className="h-5 w-5 text-emerald-300" /> : <StarOff className="h-5 w-5 text-slate-400" />}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Chip variant={canPlay ? "ok" : "danger"}>{canPlay ? "Se puede" : "No entra"}</Chip>
                  <Chip><Users size={13} />{game.min}–{game.max}</Chip>
                  <Chip><Clock size={13} />{timeText(game)}</Chip>
                  <Chip variant="purple">{timeLabel(game)}</Chip>
                </div>
              </button>
            );
            })}
          </div>
        </main>

        <nav className="fixed bottom-0 left-1/2 z-30 grid w-full max-w-6xl -translate-x-1/2 grid-cols-3 gap-1 border-t border-cyan-400/20 bg-slate-950/95 p-2 backdrop-blur-xl">
          <button onClick={() => { setScreen("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-bold ${screen === "home" ? "bg-emerald-400 text-slate-950" : "text-slate-300"}`}>
            <Home size={20} />
            Inicio
          </button>

          <button onClick={() => { setScreen("favorites"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-bold ${screen === "favorites" ? "bg-emerald-400 text-slate-950" : "text-slate-300"}`}>
            <Heart size={20} />
            Favoritos
          </button>

          <button onClick={() => { setScreen("add"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-bold ${screen === "add" ? "bg-emerald-400 text-slate-950" : "text-slate-300"}`}>
            <PlusCircle size={20} />
            Agregar
          </button>
        </nav>
      </div>
    </div>
  );
}
