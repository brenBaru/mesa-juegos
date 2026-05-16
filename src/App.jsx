import React, { useState, useMemo } from "react";
import { Star, StarOff, Plus, Minus } from "lucide-react";

// UI básicos
const Card = ({ children, className }) => (
  <div className={`rounded-xl p-4 ${className}`}>{children}</div>
);

const Button = ({ children, className = "", ...props }) => (
  <button {...props} className={`px-3 py-1 rounded ${className}`}>
    {children}
  </button>
);

const games = [
  {
    id: 1,
    name: "Secret Hitler",
    min: 5,
    max: 10,
    time: "45–60 min",
    setup: [
      "Separar roles y cartas",
      "Elegir presidente inicial",
      "Preparar mazo de políticas",
    ],
    steps: [
      "Presidente elige canciller",
      "Se vota el gobierno",
      "Se juega política",
      "Se repite hasta victoria",
    ],
  },
  {
    id: 2,
    name: "Polilla Tramposa",
    min: 3,
    max: 5,
    time: "15–25 min",
    setup: [
      "Repartir cartas",
      "Elegir guardián",
    ],
    steps: [
      "Jugar cartas",
      "Hacer trampa sin ser visto",
      "El guardián controla",
    ],
  },
  {
    id: 3,
    name: "Musa",
    min: 2,
    max: 12,
    time: "30 min",
    setup: [
      "Dividir equipos",
      "Preparar cartas",
    ],
    steps: [
      "Dar pista",
      "Equipo adivina imagen",
    ],
  },
  {
    id: 4,
    name: "Dungeon Fighter",
    min: 1,
    max: 6,
    time: "45–60 min",
    setup: [
      "Preparar tablero",
      "Elegir héroes",
    ],
    steps: [
      "Lanzar dados a la diana",
      "Resolver daño",
      "Avanzar en mazmorra",
    ],
  },
  {
    id: 5,
    name: "Deception HK",
    min: 4,
    max: 12,
    time: "20 min",
    setup: [
      "Asignar roles",
      "Repartir cartas",
    ],
    steps: [
      "Detective da pistas",
      "Jugadores deducen",
    ],
  },
];

export default function App() {
  const [players, setPlayers] = useState(5);
  const [selected, setSelected] = useState(null);
  const [favs, setFavs] = useState([]);

  const playableGames = useMemo(() => {
    return games.filter(
      (g) => players >= g.min && players <= g.max
    );
  }, [players]);

  const toggleFav = (id) => {
    setFavs((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#031313] text-white p-4">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-emerald-400 mb-4">
        🎲 Mesa lista
      </h1>

      {/* SELECTOR */}
      <div className="flex items-center gap-3 mb-5">
        <Button
          className="bg-slate-800"
          onClick={() => setPlayers(Math.max(1, players - 1))}
        >
          <Minus />
        </Button>

        <span className="text-xl font-bold">{players}</span>

        <Button
          className="bg-emerald-400 text-black"
          onClick={() => setPlayers(players + 1)}
        >
          <Plus />
        </Button>
      </div>

      {/* LISTA JUEGOS */}
      <div className="space-y-3">
        {games.map((g) => {
          const canPlay =
            players >= g.min && players <= g.max;

          return (
            <Card
              key={g.id}
              className="bg-slate-900 border border-slate-800"
            >
              <div className="flex justify-between">
                <div
                  onClick={() => setSelected(g)}
                  className="cursor-pointer"
                >
                  <h2 className="font-bold">{g.name}</h2>
                  <p className="text-sm text-slate-400">
                    {g.time}
                  </p>
                </div>

                <button onClick={() => toggleFav(g.id)}>
                  {favs.includes(g.id) ? (
                    <Star className="text-emerald-400" />
                  ) : (
                    <StarOff className="text-slate-500" />
                  )}
                </button>
              </div>

              <p
                className={`mt-2 text-sm ${
                  canPlay ? "text-green-400" : "text-red-400"
                }`}
              >
                {g.min}-{g.max} jugadores{" "}
                {canPlay
                  ? "- se puede jugar"
                  : "- no entra"}
              </p>
            </Card>
          );
        })}
      </div>

      {/* DETALLE JUEGO */}
      {selected && (
        <div className="mt-6 bg-slate-800 p-4 rounded-xl border border-slate-700">
          <h2 className="text-xl font-bold mb-2">
            {selected.name}
          </h2>

          <p className="text-sm text-slate-400 mb-2">
            {selected.time}
          </p>

          <h3 className="font-semibold mt-2">
            Preparación
          </h3>
          <ul className="text-sm">
            {selected.setup.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>

          <h3 className="font-semibold mt-3">
            Cómo se juega
          </h3>
          <ul className="text-sm">
            {selected.steps.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}