import React, { useMemo, useState, useEffect } from "react";
import {
  Search,
  Users,
  Clock,
  Star,
  StarOff,
  Plus,
  Minus,
  ArrowLeft,
  Trophy,
  BookOpen,
  PlayCircle,
  Home,
  Heart,
  Dice5,
  Filter,
  ExternalLink,
  Save,
  Trash2,
  PlusCircle
} from "lucide-react";

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
    setup: [
      "Elegí el tablero fascista correspondiente a la cantidad de jugadores y colocá también el tablero liberal.",
      "Mezclá las cartas de políticas liberales y fascistas para formar el mazo de políticas.",
      "Prepará un sobre o conjunto de cartas para cada jugador con rol secreto, afiliación y cartas de voto.",
      "Repartí los roles en secreto. Nadie debe revelar su rol al inicio.",
      "Elegí al primer Presidente y realizá la fase inicial de reconocimiento con ojos cerrados según la cantidad de jugadores."
    ],
    howTo: [
      "El Presidente propone a una persona como Canciller.",
      "Todos votan si aceptan o rechazan ese gobierno.",
      "Si el gobierno es aprobado, el Presidente roba 3 políticas, descarta 1 y pasa 2 al Canciller.",
      "El Canciller descarta 1 política y promulga la restante.",
      "Si se promulgan políticas fascistas, pueden activarse poderes especiales.",
      "Ganan los liberales si promulgan 5 políticas liberales o eliminan a Hitler.",
      "Ganan los fascistas si promulgan 6 políticas fascistas o si Hitler es elegido Canciller cuando ya hay 3 políticas fascistas."
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
    setup: [
      "Separá la carta de Chinche Guardián y entregásela al jugador inicial.",
      "Mezclá el resto de las cartas.",
      "Repartí 8 cartas a cada jugador.",
      "Formá el mazo de robo con las cartas restantes.",
      "Revelá una carta inicial para formar la pila de descarte."
    ],
    howTo: [
      "En tu turno jugás una carta cuyo número sea inmediatamente superior o inferior al de la carta visible.",
      "Si no podés jugar, robás una carta.",
      "Todos, excepto el Chinche Guardián, pueden intentar hacer desaparecer cartas sin que los vean.",
      "El Chinche Guardián observa e intenta atrapar a quienes hacen trampa.",
      "Si alguien es atrapado, recibe penalización y puede cambiar el guardián.",
      "Gana quien se queda sin cartas primero. La última carta no puede desaparecer con trampa."
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
    setup: [
      "Separá las cartas necesarias según la cantidad de jugadores.",
      "Repartí un rol secreto a cada jugador.",
      "Prepará cartas de evento, votación o infección si tu edición las utiliza.",
      "Explicá los objetivos generales de cada bando sin revelar roles.",
      "Definan orden de turno o moderador si el reglamento lo requiere."
    ],
    howTo: [
      "Los jugadores debaten quién podría estar infectado o actuando en contra del grupo.",
      "Se resuelven eventos o crisis según indique la ronda.",
      "Los jugadores intentan deducir información a partir de acusaciones, contradicciones y votos.",
      "Los infectados intentan confundir al grupo y cumplir su condición de victoria.",
      "Los sanos buscan identificar y aislar la amenaza.",
      "La partida termina cuando un bando cumple su objetivo."
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
    setup: [
      "Colocá todas las gemas visibles en el centro de la mesa.",
      "Dejá la joya morada al alcance de todos.",
      "Mezclá las cartas de reto.",
      "Repartí las cartas de reto según la cantidad de jugadores.",
      "Prepará las cartas de maldición o evento si se usan en la partida."
    ],
    howTo: [
      "Todos juegan al mismo tiempo.",
      "Cada jugador revela su reto superior y busca una gema que cumpla la condición.",
      "Cuando encuentra la gema correcta, la coloca sobre su carta.",
      "Luego pasa al siguiente reto.",
      "Quien completa sus retos toma la joya morada y termina la ronda.",
      "Se revisan aciertos, se aplican efectos y se suman puntos."
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
    setup: [
      "Prepará el mazo inicial siguiendo el reglamento de tu edición.",
      "Separá cartas especiales como salida, llave, amenaza o asesino si corresponde.",
      "Formen la zona de juego, mazo y descarte común.",
      "Expliquen el objetivo del grupo: escapar antes de que la amenaza los alcance.",
      "Si usan variante semicooperativa o cómplice, asignen roles antes de empezar."
    ],
    howTo: [
      "En cada turno se usan cartas para explorar, conseguir recursos o ayudar al equipo.",
      "El grupo decide cuándo avanzar y cuándo cuidarse.",
      "Las cartas nuevas mejoran el mazo y abren opciones de escape.",
      "Las amenazas aumentan la presión y pueden acercar al asesino.",
      "La comunicación es clave para planear turnos y riesgos.",
      "Ganan si logran escapar. Pierden si la amenaza alcanza la condición de derrota."
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
    setup: [
      "Quitá reclutas y láseres con números mayores a la cantidad de jugadores.",
      "Separá los dos Líderes y mezclá los reclutas necesarios.",
      "Repartí 3 reclutas boca abajo a cada jugador.",
      "Cada jugador mira y ordena sus reclutas.",
      "Repartí artefactos y dejá los láseres disponibles."
    ],
    howTo: [
      "Tu facción se define por mayoría de reclutas o por tener un Líder.",
      "En tu turno podés interrogar para mirar información parcial de otro jugador.",
      "Podés decir la verdad o mentir sobre lo que viste.",
      "El grupo intenta deducir quién tiene cada Líder.",
      "Los láseres permiten disparar cuando alguien cree haber identificado al rival.",
      "Gana el equipo que elimina o expone al Líder contrario."
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
    setup: [
      "Dividan al grupo en dos equipos equilibrados.",
      "Mezclá las cartas de imagen u obra maestra.",
      "Mezclá las cartas de inspiración o restricción de pista.",
      "Definan cuántas cartas se necesitan para ganar.",
      "Elegí qué equipo empieza y quién será la Musa."
    ],
    howTo: [
      "El equipo rival elige una imagen objetivo y una restricción de pista.",
      "La Musa mira la imagen y da una pista respetando la restricción.",
      "Se mezcla la imagen objetivo con otras imágenes.",
      "El equipo de la Musa debate cuál imagen coincide con la pista.",
      "Si aciertan, ganan la carta como punto.",
      "Gana el primer equipo que alcanza la cantidad acordada de puntos."
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
    setup: [
      "Cada jugador elige un color o personaje.",
      "Prepará las cartas de acción.",
      "Prepará las cartas de voto o consejo tribal.",
      "Repartí cartas iniciales a cada jugador.",
      "Definan cómo se resolverán las votaciones y eliminaciones."
    ],
    howTo: [
      "En tu turno robás o jugás cartas según indique el reglamento.",
      "Podés negociar, formar alianzas o protegerte.",
      "Las cartas permiten modificar votos, afectar jugadores o ganar ventajas.",
      "Cuando aparece un Consejo Tribal, se vota en secreto.",
      "Los jugadores eliminados dejan la partida o pasan a cumplir rol de jurado según modalidad.",
      "Gana quien sobrevive y logra imponerse en la fase final."
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
    setup: [
      "Montá la diana o tablero central.",
      "Prepará los mazos de mazmorra, monstruos, equipo y jefe final.",
      "Cada jugador elige un héroe.",
      "Colocá marcadores de vida, monedas y recompensas al alcance.",
      "Ajusten la dificultad si quieren una partida más relajada o desafiante."
    ],
    howTo: [
      "El grupo elige por dónde avanzar en la mazmorra.",
      "Cuando aparece un monstruo, los héroes atacan tirando dados hacia la diana.",
      "Normalmente el dado debe rebotar antes de caer para que el tiro sea válido.",
      "La zona donde cae indica daño o efecto.",
      "Algunas cartas obligan a tirar de formas difíciles o absurdas.",
      "Ganan si derrotan al jefe final. Pierden si el grupo queda fuera de combate."
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
    setup: [
      "Asigná roles secretos: Forense, Asesino e Investigadores.",
      "Con más jugadores podés sumar Cómplice y Testigo.",
      "Cada jugador, excepto el Forense, recibe cartas visibles de medio de asesinato y evidencia.",
      "El Asesino elige en secreto una carta de medio y una de evidencia.",
      "El Forense conoce la solución y prepara las losetas de escena."
    ],
    howTo: [
      "El Forense da pistas colocando marcadores en losetas.",
      "El Forense no puede hablar ni hacer gestos para orientar.",
      "Los investigadores discuten qué combinación encaja mejor.",
      "El Asesino intenta confundir sin quedar expuesto.",
      "Cada jugador tiene una oportunidad formal de acusar.",
      "Si alguien acierta medio y evidencia, ganan los investigadores.",
      "Si nadie resuelve a tiempo, gana el Asesino."
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

function timeText(game) {
  return game.timeMin === game.timeMax
    ? `${game.timeMin} min`
    : `${game.timeMin}–${game.timeMax} min`;
}

function timeLabel(game) {
  if (game.timeMax <= 25) return "Rápido";
  if (game.timeMax <= 45) return "Medio";
  return "Largo";
}

function Chip({ children, variant = "default" }) {
  const styles = {
    default: "bg-slate-800 text-slate-200 border border-slate-700",
    ok: "bg-emerald-400/15 text-emerald-200 border border-emerald-400/40",
    blue: "bg-cyan-400/15 text-cyan-100 border border-cyan-400/40",
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
      <span className="mb-1 block text-[10px] font-black uppercase tracking-wide text-slate-400">
        {label}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-2xl border border-cyan-400/25 bg-slate-900 px-3 text-sm font-bold text-slate-100 outline-none focus:ring-2 focus:ring-emerald-300"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-slate-300">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-emerald-300"
      />
    </label>
  );
}

function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-slate-300">
        {label}
      </span>

      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[110px] w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-emerald-300"
      />
    </label>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [players, setPlayers] = useState(5);
  const [query, setQuery] = useState("");
  const [onlyPlayable, setOnlyPlayable] = useState(true);
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [modeFilter, setModeFilter] = useState("Todos");
  const [timeFilter, setTimeFilter] = useState("Todos");
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

  const games = useMemo(() => [...initialGames, ...customGames], [customGames]);

  useEffect(() => {
    localStorage.setItem("mesa-juegos-favs", JSON.stringify(favs));
  }, [favs]);

  useEffect(() => {
    localStorage.setItem("mesa-juegos-custom", JSON.stringify(customGames));
  }, [customGames]);

  const playable = (game) => players >= Number(game.min) && players <= Number(game.max);

  const visibleGames = useMemo(() => {
    return games
      .filter((game) => screen !== "favorites" || favs.includes(game.id))
      .filter((game) => !onlyPlayable || playable(game))
      .filter((game) => typeFilter === "Todos" || game.type === typeFilter)
      .filter((game) => modeFilter === "Todos" || game.mode === modeFilter)
      .filter((game) => timeFilter === "Todos" || timeLabel(game) === timeFilter)
      .filter((game) =>
        `${game.name} ${game.type} ${game.mode}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      .sort((a, b) => Number(playable(b)) - Number(playable(a)) || a.name.localeCompare(b.name));
  }, [games, players, onlyPlayable, typeFilter, modeFilter, timeFilter, query, favs, screen]);

  const saveManualGame = () => {
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
        `https://www.youtube.com/results?search_query=${encodeURIComponent(form.name + " como jugar")}`,
      rulesUrl:
        form.rulesUrl ||
        `https://www.google.com/search?q=${encodeURIComponent(form.name + " reglas")}`,
      setup: setup.length ? setup : ["Prepará los componentes del juego según el reglamento."],
      howTo: howTo.length ? howTo : ["Jugá siguiendo la secuencia indicada por el reglamento."]
    };

    setCustomGames((prev) => [newGame, ...prev]);
    setSelected(newGame);
    setForm(emptyForm);
    setScreen("detail");
  };

  const toggleFav = (id) => {
    setFavs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const deleteCustomGame = (id) => {
    setCustomGames((prev) => prev.filter((game) => game.id !== id));
    setFavs((prev) => prev.filter((fav) => fav !== id));
    setSelected(null);
    setScreen("home");
  };

  if (screen === "detail" && selected) {
    return (
      <div className="min-h-screen bg-[#031313] text-slate-100">
        <div className="mx-auto min-h-screen max-w-md bg-[radial-gradient(circle_at_top_left,#0f766e_0,#062b2e_32%,#020617_75%)] pb-6 shadow-2xl">
          <div className="sticky top-0 z-20 border-b border-cyan-400/20 bg-slate-950/90 px-4 py-3 backdrop-blur-xl">
            <button
              onClick={() => setScreen("home")}
              className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2 text-sm font-bold text-emerald-300"
            >
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

                <h1 className="mt-4 text-3xl font-black text-white">
                  {selected.name}
                </h1>

                <p className="mt-2 text-sm text-cyan-100">
                  {selected.vibe}
                </p>
              </div>

              <button
                onClick={() => toggleFav(selected.id)}
                className="rounded-2xl bg-slate-800 p-3"
              >
                {favs.includes(selected.id) ? (
                  <Star className="text-emerald-300" />
                ) : (
                  <StarOff className="text-slate-300" />
                )}
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
              <a
                href={selected.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-3 py-3 text-sm font-black text-slate-950"
              >
                Video
                <ExternalLink size={15} />
              </a>

              <a
                href={selected.rulesUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-3 py-3 text-sm font-black text-slate-950"
              >
                Instructivo
                <ExternalLink size={15} />
              </a>
            </div>

            <section>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-white">
                <BookOpen className="text-cyan-300" />
                Preparación del juego
              </h2>

              <ol className="space-y-2">
                {selected.setup.map((step, index) => (
                  <li
                    key={index}
                    className="flex gap-3 rounded-2xl border border-cyan-400/25 bg-cyan-400/10 p-3 text-sm leading-5 text-cyan-50"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-xs font-black text-slate-950">
                      {index + 1}
                    </span>
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
                  <li
                    key={index}
                    className="flex gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-3 text-sm leading-5 text-emerald-50"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-slate-950">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {selected.custom && (
              <button
                onClick={() => deleteCustomGame(selected.id)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-3 py-3 text-sm font-black text-white"
              >
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

  if (screen === "add") {
    return (
      <div className="min-h-screen bg-[#031313] text-slate-100">
        <div className="mx-auto min-h-screen max-w-md bg-[radial-gradient(circle_at_top_left,#0f766e_0,#062b2e_32%,#020617_75%)] pb-24 shadow-2xl">
          <div className="sticky top-0 z-20 border-b border-cyan-400/20 bg-slate-950/90 px-4 py-3 backdrop-blur-xl">
            <button
              onClick={() => setScreen("home")}
              className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2 text-sm font-bold text-emerald-300"
            >
              <ArrowLeft size={16} />
              Volver
            </button>

            <h1 className="mt-4 text-2xl font-black text-white">
              Agregar juego
            </h1>

            <p className="mt-1 text-sm text-slate-300">
              Cargá un juego manualmente. Se guarda solo en este dispositivo.
            </p>
          </div>

          <main className="space-y-3 p-4">
            <Field
              label="Nombre del juego"
              value={form.name}
              onChange={(value) => setForm({ ...form, name: value })}
              placeholder="Ej: Codenames"
            />

            <div className="grid grid-cols-2 gap-2">
              <Field
                label="Mín. jugadores"
                type="number"
                value={form.min}
                onChange={(value) => setForm({ ...form, min: value })}
              />

              <Field
                label="Máx. jugadores"
                type="number"
                value={form.max}
                onChange={(value) => setForm({ ...form, max: value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Field
                label="Tiempo mín."
                type="number"
                value={form.timeMin}
                onChange={(value) => setForm({ ...form, timeMin: value })}
              />

              <Field
                label="Tiempo máx."
                type="number"
                value={form.timeMax}
                onChange={(value) => setForm({ ...form, timeMax: value })}
              />
            </div>

            <LabeledSelect
              label="Tipo"
              value={form.type}
              onChange={(value) => setForm({ ...form, type: value })}
              options={typeOptions.filter((x) => x !== "Todos")}
            />

            <LabeledSelect
              label="Modo"
              value={form.mode}
              onChange={(value) => setForm({ ...form, mode: value })}
              options={modeOptions.filter((x) => x !== "Todos")}
            />

            <LabeledSelect
              label="Dificultad"
              value={form.level}
              onChange={(value) => setForm({ ...form, level: value })}
              options={["Bajo", "Medio", "Alto"]}
            />

            <Field
              label="Edad sugerida"
              value={form.age}
              onChange={(value) => setForm({ ...form, age: value })}
              placeholder="Ej: 10+"
            />

            <Field
              label="Resumen"
              value={form.vibe}
              onChange={(value) => setForm({ ...form, vibe: value })}
              placeholder="Ej: Deducción rápida por equipos"
            />

            <Field
              label="Link a video"
              value={form.videoUrl}
              onChange={(value) => setForm({ ...form, videoUrl: value })}
              placeholder="Opcional"
            />

            <Field
              label="Link a instructivo/reglas"
              value={form.rulesUrl}
              onChange={(value) => setForm({ ...form, rulesUrl: value })}
              placeholder="Opcional"
            />

            <TextAreaField
              label="Preparación"
              value={form.setupText}
              onChange={(value) => setForm({ ...form, setupText: value })}
              placeholder={"Un paso por línea.\nEj: Separar cartas.\nRepartir roles.\nPreparar tablero."}
            />

            <TextAreaField
              label="Cómo se juega"
              value={form.howToText}
              onChange={(value) => setForm({ ...form, howToText: value })}
              placeholder={"Un paso por línea.\nEj: En tu turno robás una carta.\nLuego jugás una acción.\nGana quien llegue al objetivo."}
            />

            <button
              onClick={saveManualGame}
              className="flex w-full items-center justify-center gap-2 rounded-3xl bg-emerald-400 px-3 py-4 text-sm font-black text-slate-950"
            >
              <Save size={18} />
              Guardar juego
            </button>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#031313] text-slate-100">
      <div className="mx-auto min-h-screen max-w-md bg-[radial-gradient(circle_at_top_left,#0f766e_0,#062b2e_32%,#020617_75%)] pb-24 shadow-2xl">
        <div className="sticky top-0 z-20 border-b border-cyan-400/20 bg-slate-950/90 px-4 pb-4 pt-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="flex items-center gap-1 text-xs font-black text-emerald-300">
                <Dice5 size={16} />
                Noche de juegos
              </p>

              <h1 className="text-2xl font-black text-white">
                Mesa lista
              </h1>
            </div>

            <button
              onClick={() => setScreen("add")}
              className="flex items-center gap-2 rounded-2xl bg-emerald-400 px-3 py-2 text-sm font-black text-slate-950"
            >
              <PlusCircle size={16} />
              Agregar
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.6fr]">
            <div className="rounded-3xl border border-emerald-400/25 bg-slate-900/80 p-2 text-center">
              <p className="text-[10px] font-bold uppercase text-emerald-200">
                Participantes
              </p>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPlayers((p) => Math.max(1, p - 1))}
                  className="rounded-full bg-slate-800 p-2 text-white"
                >
                  <Minus size={15} />
                </button>

                <span className="w-8 text-center text-2xl font-black">
                  {players}
                </span>

                <button
                  onClick={() => setPlayers((p) => p + 1)}
                  className="rounded-full bg-emerald-400 p-2 text-slate-950"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-4 h-4 w-4 text-cyan-200" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar juego..."
                className="h-full min-h-[58px] w-full rounded-3xl border border-cyan-400/25 bg-slate-900/80 pl-9 pr-3 text-sm text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-cyan-400/20 bg-slate-950/45 p-3">
            <p className="mb-3 text-[10px] font-black uppercase tracking-wide text-emerald-300">
              Filtros
            </p>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-[10px] font-black uppercase tracking-wide text-slate-400">
                  Disponibilidad
                </span>

                <button
                  onClick={() => setOnlyPlayable((v) => !v)}
                  className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-black transition ${
                    onlyPlayable
                      ? "bg-emerald-400 text-slate-950"
                      : "border border-slate-700 bg-slate-900 text-slate-100"
                  }`}
                >
                  <Filter size={15} />
                  {onlyPlayable ? "Jugables" : "Todos"}
                </button>
              </label>

              <LabeledSelect
                label="Tipo"
                value={typeFilter}
                onChange={setTypeFilter}
                options={typeOptions}
              />

              <LabeledSelect
                label="Duración"
                value={timeFilter}
                onChange={setTimeFilter}
                options={timeOptions}
              />

              <LabeledSelect
                label="Modo"
                value={modeFilter}
                onChange={setModeFilter}
                options={modeOptions}
              />
            </div>
          </div>
        </div>

        <main className="space-y-3 p-4">
          <div className="rounded-3xl border border-emerald-300/25 bg-gradient-to-br from-emerald-400 to-cyan-400 p-4 text-slate-950 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold opacity-80">
                  Disponibles ahora
                </p>

                <p className="text-4xl font-black">
                  {visibleGames.length}/{games.length}
                </p>
              </div>

              <Trophy className="h-12 w-12 opacity-80" />
            </div>

            <p className="mt-2 text-xs font-semibold opacity-80">
              Filtrando para {players} participantes. Tocá un juego para ver preparación y cómo jugar.
            </p>
          </div>

          {visibleGames.length === 0 && (
            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 text-center text-slate-300">
              No hay juegos con esos filtros.
            </div>
          )}

          {visibleGames.map((game) => {
            const canPlay = playable(game);

            return (
              <button
                key={game.id}
                onClick={() => {
                  setSelected(game);
                  setScreen("detail");
                }}
                className="w-full rounded-3xl border border-slate-700/80 bg-slate-900/90 p-4 text-left shadow-lg transition active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-black text-white">
                      {game.name}
                    </h2>

                    <p className="text-sm text-slate-300">
                      {game.type} · {game.mode}
                    </p>
                  </div>

                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFav(game.id);
                    }}
                    className="rounded-full bg-slate-800 p-2"
                  >
                    {favs.includes(game.id) ? (
                      <Star className="h-5 w-5 text-emerald-300" />
                    ) : (
                      <StarOff className="h-5 w-5 text-slate-400" />
                    )}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Chip variant={canPlay ? "ok" : "danger"}>
                    {canPlay ? "Se puede" : "No entra"}
                  </Chip>

                  <Chip>
                    <Users size={13} />
                    {game.min}–{game.max}
                  </Chip>

                  <Chip>
                    <Clock size={13} />
                    {timeText(game)}
                  </Chip>

                  <Chip variant="purple">
                    {timeLabel(game)}
                  </Chip>
                </div>
              </button>
            );
          })}
        </main>

        <nav className="fixed bottom-0 left-1/2 z-30 grid w-full max-w-md -translate-x-1/2 grid-cols-3 gap-1 border-t border-cyan-400/20 bg-slate-950/95 p-2 backdrop-blur-xl">
          <button
            onClick={() => setScreen("home")}
            className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-bold ${
              screen === "home"
                ? "bg-emerald-400 text-slate-950"
                : "text-slate-300"
            }`}
          >
            <Home size={20} />
            Inicio
          </button>

          <button
            onClick={() => setScreen("favorites")}
            className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-bold ${
              screen === "favorites"
                ? "bg-emerald-400 text-slate-950"
                : "text-slate-300"
            }`}
          >
            <Heart size={20} />
            Favoritos
          </button>

          <button
            onClick={() => setScreen("add")}
            className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-bold ${
              screen === "add"
                ? "bg-emerald-400 text-slate-950"
                : "text-slate-300"
            }`}
          >
            <PlusCircle size={20} />
            Agregar
          </button>
        </nav>
      </div>
    </div>
  );
}
