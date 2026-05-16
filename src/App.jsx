import React, { useState, useMemo } from "react";
import { Star, StarOff, Plus, Minus } from "lucide-react";

const games = [
  {
    id: 1,
    name: "Secret Hitler",
    min: 5,
    max: 10,
    type: "Roles ocultos",
    time: "45–60 min",
    setup: [
      "Asignar roles secretos (liberales, fascistas, Hitler)",
      "Preparar el mazo de políticas",
      "Elegir primer presidente"
    ],
    steps: [
      "El presidente nomina canciller",
      "Todos votan el gobierno",
      "El presidente roba cartas",
      "El canciller elige política",
      "Se repite hasta victoria"
    ]
  },
  {
    id: 2,
    name: "Polilla Tramposa",
    min: 3,
    max: 5,
    type: "Party",
    time: "15–25 min",
    setup: [
      "Repartir cartas a cada jugador",
      "Asignar el guardián"
    ],
    steps: [
      "Jugar cartas en orden",
      "Hacer trampa sin ser visto",
      "El guardián controla",
      "Gana quien se queda sin cartas"
    ]
  },
  {
    id: 3,
    name: "El Huésped",
    min: 5,
    max: 12,
    type: "Roles ocultos",
    time: "30 min",
    setup: [
      "Asignar roles secretos",
      "Preparar cartas según jugadores"
    ],
    steps: [
      "Debate y acusaciones",
      "Se vota sospechosos",
      "Se eliminan jugadores",
      "Gana el equipo correcto"
    ]
  },
  {
    id: 4,
    name: "La Morada Maldita",
    min: 2,
    max: 6,
    type: "Visual",
    time: "20 min",
    setup: [
      "Colocar gemas en mesa",
      "Repartir cartas objetivo"
    ],
    steps: [
      "Todos juegan simultáneamente",
      "Buscar patrones",
      "Tomar gemas correctas",
      "Sumar puntos"
    ]
  },
  {
    id: 5,
    name: "Bajo Amenaza",
    min: 3,
    max: 6,
    type: "Cooperativo",
    time: "25 min",
    setup: [
      "Preparar mazo",
      "Definir objetivo común"
    ],
    steps: [
      "Jugar cartas para avanzar",
      "Evitar amenazas",
      "Tomar decisiones en grupo",
      "Ganar escapando"
    ]
  },
  {
    id: 6,
    name: "Líderes de Euphoria",
    min: 4,
    max: 8,
    type: "Social",
    time: "30 min",
    setup: [
      "Repartir cartas de roles",
      "Preparar artefactos"
    ],
    steps: [
      "Interrogar jugadores",
      "Mentir o decir verdad",
      "Usar acciones",
      "Descubrir líderes"
    ]
  },
  {
    id: 7,
    name: "Musa",
    min: 2,
    max: 12,
    type: "Creativo",
    time: "30 min",
    setup: [
      "Formar equipos",
      "Preparar imágenes"
    ],
    steps: [
      "Dar pista creativa",
      "Equipo adivina imagen",
      "Sumar puntos"
    ]
  },
  {
    id: 8,
    name: "Survivor: The Tribe Has Spoken",
    min: 3,
    max: 6,
    type: "Estrategia",
    time: "45 min",
    setup: [
      "Repartir personajes",
      "Preparar cartas de acción"
    ],
    steps: [
      "Robar cartas",
      "Formar alianzas",
      "Votar eliminaciones",
      "Ganar por estrategia"
    ]
  },
  {
    id: 9,
    name: "Dungeon Fighter",
    min: 1,
    max: 6,
    type: "Cooperativo",
    time: "60 min",
    setup: [
      "Elegir héroes",
      "Preparar tablero"
    ],
    steps: [
      "Lanzar dados",
      "Golpear objetivos",
      "Derrotar enemigos",
      "Derrotar jefe final"
    ]
  },
  {
    id: 10,
    name: "Deception HK",
    min: 4,
    max: 12,
    type: "Deducción",
    time: "20 min",
    setup: [
      "Asignar roles",
      "Preparar pistas"
    ],
    steps: [
      "Detective da pistas",
      "Jugadores debaten",
      "Acusar sospechosos",
      "Resolver caso"
    ]
  }
];

export default function App() {

  const [players, setPlayers] = useState(5);
  const [selected, setSelected] = useState(null);
  const [favs, setFavs] = useState([]);
  const [onlyPlayable, setOnlyPlayable] = useState(true);

  const playable = g => players >= g.min && players <= g.max;

  const filtered = useMemo(() =>
    games.filter(g => !onlyPlayable || playable(g)),
    [players, onlyPlayable]
  );

  const toggleFav = id => {
    setFavs(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050b14] to-[#020617] text-white p-4">

      <h1 className="text-4xl font-black mb-4">🎲 Mesa lista</h1>

      <div className="bg-slate-900 p-4 rounded-xl mb-5 space-y-3">

        <div className="flex justify-center gap-4">
          <button onClick={()=>setPlayers(p=>Math.max(1,p-1))} className="bg-slate-800 p-3 rounded-xl">
            <Minus />
          </button>

          <span className="text-3xl">{players}</span>

          <button onClick={()=>setPlayers(p=>p+1)} className="bg-emerald-400 text-black p-3 rounded-xl">
            <Plus />
          </button>
        </div>

        <button onClick={()=>setOnlyPlayable(!onlyPlayable)}
          className="w-full bg-emerald-400 text-black font-bold py-2 rounded-xl">
          {onlyPlayable ? "Mostrando jugables" : "Mostrar todos"}
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        {/* LISTA */}
        <div className="space-y-3">

          {filtered.map(g => (
            <div key={g.id}
              onClick={()=>setSelected(g)}
              className={`cursor-pointer p-4 rounded-xl ${
                selected?.id === g.id ? "bg-emerald-500 text-black" : "bg-slate-900"
              }`}
            >
              <div className="flex justify-between">

                <div>
                  <h2 className="font-bold text-lg">{g.name}</h2>
                  <p className="text-sm text-slate-400">{g.type} • {g.time}</p>

                  <p className={playable(g) ? "text-emerald-400" : "text-red-400"}>
                    {g.min}-{g.max} jugadores
                  </p>
                </div>

                <button onClick={(e)=>{ e.stopPropagation(); toggleFav(g.id); }}>
                  {favs.includes(g.id)
                    ? <Star className="text-yellow-400"/>
                    : <StarOff />}
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* DETALLE */}
        {selected && (
          <div className="bg-slate-900 p-5 rounded-xl">

            <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>

            <h3 className="mt-3 font-bold">Preparación</h3>
            {selected.setup.map((s,i)=>(<p key={i}>• {s}</p>))}

            <h3 className="mt-3 font-bold">Cómo se juega</h3>
            {selected.steps.map((s,i)=>(<p key={i}>• {s}</p>))}

          </div>
        )}

      </div>

    </div>
  );
}