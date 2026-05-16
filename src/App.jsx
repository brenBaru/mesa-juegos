import React, { useState, useMemo } from "react";
import { Star, StarOff, Plus, Minus, Search } from "lucide-react";

const games = [
  {
    id: 1,
    name: "Secret Hitler",
    min: 5,
    max: 10,
    type: "Roles ocultos",
    time: "45–60 min",
    setup: ["Separar roles", "Preparar cartas"],
    steps: ["Elegir canciller", "Votar", "Jugar política"]
  },
  {
    id: 2,
    name: "Polilla Tramposa",
    min: 3,
    max: 5,
    type: "Party",
    time: "15–25 min",
    setup: ["Repartir cartas"],
    steps: ["Jugar cartas", "Hacer trampa"]
  },
  {
    id: 3,
    name: "Musa",
    min: 2,
    max: 12,
    type: "Creativo",
    time: "30 min",
    setup: ["Equipos"],
    steps: ["Dar pista", "Adivinar"]
  },
  {
    id: 4,
    name: "Dungeon Fighter",
    min: 1,
    max: 6,
    type: "Cooperativo",
    time: "60 min",
    setup: ["Elegir héroes"],
    steps: ["Lanzar dados", "Combatir"]
  },
  {
    id: 5,
    name: "Deception",
    min: 4,
    max: 12,
    type: "Deducción",
    time: "20 min",
    setup: ["Roles"],
    steps: ["Detective da pistas"]
  }
];

export default function App() {
  const [players, setPlayers] = useState(5);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [favs, setFavs] = useState([]);
  const [onlyPlayable, setOnlyPlayable] = useState(false);

  const filteredGames = useMemo(() => {
    return games
      .filter(g =>
        g.name.toLowerCase().includes(query.toLowerCase())
      )
      .filter(g =>
        !onlyPlayable || (players >= g.min && players <= g.max)
      );
  }, [query, players, onlyPlayable]);

  const toggleFav = (id) => {
    setFavs(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#021212] text-white p-4">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-emerald-400 mb-4">
        🎲 Mesa lista
      </h1>

      {/* CONTROLES */}
      <div className="space-y-3 mb-5">

        {/* jugadores */}
        <div className="flex items-center gap-3">
          <button onClick={() => setPlayers(players - 1)}>
            <Minus />
          </button>

          <span className="text-xl">{players}</span>

          <button onClick={() => setPlayers(players + 1)}>
            <Plus />
          </button>
        </div>

        {/* búsqueda */}
        <div className="flex items-center gap-2">
          <Search size={16} />
          <input
            placeholder="Buscar juego..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-slate-800 p-2 rounded w-full"
          />
        </div>

        {/* filtro */}
        <button
          onClick={() => setOnlyPlayable(!onlyPlayable)}
          className="bg-slate-800 px-3 py-1 rounded"
        >
          {onlyPlayable ? "Mostrar todos" : "Solo jugables"}
        </button>
      </div>

      {/* LISTA */}
      <div className="space-y-3">
        {filteredGames.map(g => {
          const canPlay =
            players >= g.min && players <= g.max;

          return (
            <div
              key={g.id}
              className="bg-slate-900 p-4 rounded-xl border border-slate-700"
            >
              <div className="flex justify-between">
                <div onClick={() => setSelected(g)}>
                  <h2 className="font-bold">{g.name}</h2>
                  <p className="text-sm text-slate-400">
                    {g.type} • {g.time}
                  </p>
                </div>

                <button onClick={() => toggleFav(g.id)}>
                  {favs.includes(g.id)
                    ? <Star className="text-emerald-400" />
                    : <StarOff />}
                </button>
              </div>

              <p className={canPlay ? "text-green-400" : "text-red-400"}>
                {g.min}-{g.max} jugadores → {canPlay ? "OK" : "No"}
              </p>
            </div>
          );
        })}
      </div>

      {/* DETALLE */}
      {selected && (
        <div className="mt-6 bg-slate-800 p-4 rounded-xl">
          <h2 className="text-xl font-bold">
            {selected.name}
          </h2>

          <h3 className="mt-2">Preparación</h3>
          {selected.setup.map((s, i) => <p key={i}>• {s}</p>)}

          <h3 className="mt-2">Cómo jugar</h3>
          {selected.steps.map((s, i) => <p key={i}>• {s}</p>)}
        </div>
      )}

    </div>
  );
}
