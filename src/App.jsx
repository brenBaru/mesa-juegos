import React, { useState } from "react";
import { Star, StarOff } from "lucide-react";

// UI básicos
const Card = ({ children, className }) => <div className={className}>{children}</div>;
const Button = ({ children, ...props }) => <button {...props}>{children}</button>;

const games = [
  {
    id: "secret",
    name: "Secret Hitler",
    min: 5,
    max: 10,
    time: "45–60 min",
    setup: [
      "Separar roles y cartas",
      "Elegir presidente inicial",
      "Preparar mazos de políticas"
    ],
    steps: [
      "El presidente elige canciller",
      "Se vota el gobierno",
      "Se juega una política",
      "Se repite hasta victoria"
    ]
  },
  {
    id: "polilla",
    name: "Polilla Tramposa",
    min: 3,
    max: 5,
    time: "15–25 min",
    setup: [
      "Repartir cartas",
      "Asignar al guardián"
    ],
    steps: [
      "Jugar cartas en orden",
      "Hacer trampa sin ser visto",
      "El guardián controla"
    ]
  },
  {
    id: "musa",
    name: "Musa",
    min: 2,
    max: 12,
    time: "30 min",
    setup: [
      "Dividir equipos",
      "Preparar cartas"
    ],
    steps: [
      "Dar pista según restricción",
      "Equipo adivina imagen"
    ]
  }
];

export default function App() {

  const [players, setPlayers] = useState(5);
  const [selected, setSelected] = useState(null);
  const [favs, setFavs] = useState([]);

  const toggleFav = (id) => {
    setFavs(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#031313] text-white p-4">

      <h1 className="text-3xl font-bold text-emerald-400 mb-4">
        🎲 Mesa lista
      </h1>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setPlayers(p => p - 1)}>-</button>
        <span>{players}</span>
        <button onClick={() => setPlayers(p => p + 1)}>+</button>
      </div>

      {/* LISTA */}
      <div className="space-y-3">
        {games.map(g => {
          const canPlay = players >= g.min && players <= g.max;

          return (
            <Card key={g.id} className="bg-slate-900 p-4 rounded-lg">

              <div className="flex justify-between">
                <div onClick={() => setSelected(g)} className="cursor-pointer">
                  <h2 className="font-bold">{g.name}</h2>
                  <p className="text-sm">{g.time}</p>
                </div>

                <button onClick={() => toggleFav(g.id)}>
                  {favs.includes(g.id)
                    ? <Star className="text-emerald-400" />
                    : <StarOff />}
                </button>
              </div>

              <p className={canPlay ? "text-green-400" : "text-red-400"}>
                {g.min}-{g.max} jugadores {canPlay ? "- se puede jugar" : "- no entra"}
              </p>

            </Card>
          );
        })}
      </div>

      {/* DETALLE */}
      {selected && (
        <div className="mt-6 p-4 bg-slate-800 rounded-lg">
          <h2 className="text-xl font-bold">{selected.name}</h2>

          <h3 className="mt-2 font-semibold">Preparación:</h3>
          <ul>
            {selected.setup.map((s, i) => <li key={i}>• {s}</li>)}
          </ul>

          <h3 className="mt-2 font-semibold">Cómo se juega:</h3>
          <ul>
            {selected.steps.map((s, i) => <li key={i}>• {s}</li>)}
          </ul>
        </div>
      )}

    </div>
  );
}