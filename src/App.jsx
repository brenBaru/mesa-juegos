import React, { useState, useMemo } from "react";
import { Plus, Minus, Star, StarOff, ArrowLeft } from "lucide-react";

const games = [
  {
    id: 1,
    name: "Bajo Amenaza",
    type: "Cooperativo",
    time: "20–30 min",
    min: 3,
    max: 6,
    level: "Medio",
    setup: [
      "Preparar el mazo inicial",
      "Separar cartas especiales",
      "Formar zona de juego",
      "Explicar objetivo del escape"
    ],
    steps: [
      "Usar cartas para explorar",
      "El grupo decide cuándo avanzar",
      "La amenaza aumenta presión",
      "Coordinar estrategia",
      "Escapar antes de perder"
    ]
  },
  {
    id: 2,
    name: "Deception HK",
    type: "Deducción",
    time: "20 min",
    min: 4,
    max: 12,
    level: "Medio",
    setup: [
      "Asignar roles",
      "Preparar cartas visibles",
      "Elegir asesinato secreto",
      "Preparar mesa del forense"
    ],
    steps: [
      "Forense da pistas visuales",
      "Jugadores debaten",
      "Se realizan acusaciones",
      "Resolver caso"
    ]
  }
];

export default function App() {

  const [screen, setScreen] = useState("list");
  const [selected, setSelected] = useState(null);
  const [players, setPlayers] = useState(5);
  const [fav, setFav] = useState([]);
  const [onlyPlayable, setOnlyPlayable] = useState(true);

  const playable = g => players >= g.min && players <= g.max;

  const filtered = useMemo(() => {
    return games.filter(g => !onlyPlayable || playable(g));
  }, [players, onlyPlayable]);

  const toggleFav = id => {
    setFav(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  // 🔵 DETALLE (pantalla separada)
  if (screen === "detail" && selected) {
    return (
      <div className="min-h-screen bg-black text-white p-4 max-w-md mx-auto">

        <button
          className="text-green-400 flex items-center gap-2 mb-3"
          onClick={() => setScreen("list")}
        >
          <ArrowLeft size={18} /> Volver
        </button>

        <h2 className="text-2xl font-bold">{selected.name}</h2>
        <p className="text-gray-400 mb-4">
          {selected.type} • {selected.time}
        </p>

        {/* INFO CARDS */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-800 p-3 rounded-xl text-center">
            Jug.<br /><b>{selected.min}-{selected.max}</b>
          </div>
          <div className="bg-gray-800 p-3 rounded-xl text-center">
            Tiempo<br /><b>{selected.time}</b>
          </div>
          <div className="bg-gray-800 p-3 rounded-xl text-center">
            Nivel<br /><b>{selected.level}</b>
          </div>
        </div>

        {/* PREPARACIÓN */}
        <h3 className="font-bold mb-2">📘 Preparación del juego</h3>
        {selected.setup.map((s, i) => (
          <div key={i} className="bg-blue-900/30 rounded-2xl p-3 mb-2 flex gap-2">
            <b className="text-blue-400">{i + 1}</b>
            <span>{s}</span>
          </div>
        ))}

        {/* CÓMO JUGAR */}
        <h3 className="font-bold mt-4 mb-2">▶ Cómo se juega</h3>
        {selected.steps.map((s, i) => (
          <div key={i} className="bg-green-900/30 rounded-2xl p-3 mb-2 flex gap-2">
            <b className="text-green-400">{i + 1}</b>
            <span>{s}</span>
          </div>
        ))}
      </div>
    );
  }

  // 🔵 LISTA PRINCIPAL
  return (
    <div className="min-h-screen bg-black text-white max-w-md mx-auto p-4">

      {/* HEADER */}
      <p className="text-indigo-400 text-sm">Noche de juegos</p>
      <h1 className="text-2xl font-bold mb-3">Mesa lista</h1>

      {/* PARTICIPANTES */}
      <div className="bg-gray-800 rounded-2xl p-3 flex justify-between items-center mb-3">
        <button onClick={() => setPlayers(p => p - 1)}>
          <Minus />
        </button>
        <span className="text-xl font-bold">{players}</span>
        <button className="bg-green-400 text-black p-2 rounded-xl"
          onClick={() => setPlayers(p => p + 1)}>
          <Plus />
        </button>
      </div>

      {/* FILTROS */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setOnlyPlayable(!onlyPlayable)}
          className="bg-gray-700 px-3 py-1 rounded-full text-sm"
        >
          {onlyPlayable ? "Jugables" : "Todos"}
        </button>
      </div>

      {/* CARD DESTACADA */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-4 mb-4">
        <p className="text-sm opacity-70">Disponibles ahora</p>
        <p className="text-3xl font-bold">
          {filtered.length}/{games.length}
        </p>
        <p className="text-xs">
          Filtrando para {players} participantes
        </p>
      </div>

      {/* LISTA */}
      <div className="space-y-3">
        {filtered.map(g => (
          <div
            key={g.id}
            onClick={() => {
              setSelected(g);
              setScreen("detail");
            }}
            className="bg-gray-900 p-4 rounded-2xl flex justify-between cursor-pointer"
          >
            <div>
              <b>{g.name}</b>
              <p className="text-gray-400 text-sm">
                {g.type} • {g.time}
              </p>

              <div className="flex gap-2 text-xs mt-1">
                <span className="text-green-400">Se puede</span>
                <span>{g.min}-{g.max}</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFav(g.id);
              }}
            >
              {fav.includes(g.id) ? <Star /> : <StarOff />}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
