import React, { useState, useMemo } from "react";
import { Users, Clock, Star, StarOff, Plus, Minus } from "lucide-react";

// Reemplazos simples de componentes UI
const Card = ({ children, className }) => <div className={className}>{children}</div>;
const CardContent = ({ children, className }) => <div className={className}>{children}</div>;
const Button = ({ children, className = "", ...props }) => (
  <button {...props} className={className}>
    {children}
  </button>
);

// Datos de juegos (simplificado para evitar errores)
const games = [
  { id:"secret", name:"Secret Hitler", min:5, max:10, time:"45-60 min" },
  { id:"polilla", name:"Polilla Tramposa", min:3, max:5, time:"15-25 min" },
  { id:"musa", name:"Musa", min:2, max:12, time:"30 min" },
  { id:"dungeon", name:"Dungeon Fighter", min:1, max:6, time:"45-60 min" },
  { id:"deception", name:"Deception HK", min:4, max:12, time:"20 min" }
];

export default function App() {

  const [players, setPlayers] = useState(5);
  const [selected, setSelected] = useState(null);
  const [favs, setFavs] = useState([]);

  const playable = useMemo(() => {
    return games.filter(g => players >= g.min && players <= g.max);
  }, [players]);

  const toggleFav = (id) => {
    setFavs(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#031313] text-white p-4">
      
      <h1 className="text-3xl font-bold mb-4 text-emerald-400">
        🎲 Mesa lista
      </h1>

      {/* Selector de jugadores */}
      <div className="flex items-center gap-3 mb-6">
        <Button className="bg-slate-800 p-2 rounded" onClick={() => setPlayers(p => Math.max(1, p - 1))}>
          <Minus />
        </Button>

        <span className="text-2xl font-bold">{players}</span>

        <Button className="bg-emerald-400 text-black p-2 rounded" onClick={() => setPlayers(p => p + 1)}>
          <Plus />
        </Button>
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {games.map(g => {

          const canPlay = players >= g.min && players <= g.max;

          return (
            <Card key={g.id} className="bg-slate-900 p-4 rounded-xl border border-slate-700">
              
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold">{g.name}</h2>
                  <p className="text-sm text-slate-400">{g.time}</p>
                </div>

                <button onClick={() => toggleFav(g.id)}>
                  {favs.includes(g.id)
                    ? <Star className="text-emerald-400" />
                    : <StarOff className="text-slate-500" />}
                </button>
              </div>

              <div className="mt-2 text-sm flex gap-2">
                <span>{g.min}-{g.max} jugadores</span>
                <span className={canPlay ? "text-emerald-400" : "text-red-400"}>
                  {canPlay ? "Se puede jugar" : "No entra"}
                </span>
              </div>

            </Card>
          );
        })}
      </div>

      {/* Selección */}
      {playable.length === 0 && (
        <p className="mt-4 text-red-400">
          No hay juegos con esa cantidad de jugadores
        </p>
      )}

    </div>
  );
}
