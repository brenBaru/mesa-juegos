import React, { useState, useMemo } from "react";
import { Star, StarOff, Plus, Minus, Search } from "lucide-react";

const games = [
  { id:1, name:"Secret Hitler", min:5, max:10, type:"Roles ocultos", time:"45–60 min" },
  { id:2, name:"Polilla Tramposa", min:3, max:5, type:"Party", time:"15–25 min" },
  { id:3, name:"Musa", min:2, max:12, type:"Creativo", time:"30 min" },
  { id:4, name:"Dungeon Fighter", min:1, max:6, type:"Cooperativo", time:"60 min" },
  { id:5, name:"Deception HK", min:4, max:12, type:"Deducción", time:"20 min" }
];

export default function App() {

  const [players, setPlayers] = useState(5);
  const [query, setQuery] = useState("");
  const [onlyPlayable, setOnlyPlayable] = useState(true);
  const [favs, setFavs] = useState([]);

  const filtered = useMemo(() => {
    return games.filter(g =>
      g.name.toLowerCase().includes(query.toLowerCase()) &&
      (!onlyPlayable || (players >= g.min && players <= g.max))
    );
  }, [query, players, onlyPlayable]);

  const toggleFav = id => {
    setFavs(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#021212] to-[#041c1c] text-white p-4">

      {/* HEADER */}
      <h1 className="text-4xl font-black text-emerald-400 mb-4">
        🎲 Mesa lista
      </h1>

      {/* CONTROLES */}
      <div className="bg-slate-900 p-3 rounded-xl mb-4 space-y-3 shadow-lg">

        {/* jugadores */}
        <div className="flex items-center justify-between">
          <button onClick={()=>setPlayers(players-1)} className="bg-slate-700 p-2 rounded-full">
            <Minus size={18}/>
          </button>

          <span className="text-2xl font-bold">{players}</span>

          <button onClick={()=>setPlayers(players+1)} className="bg-emerald-400 text-black p-2 rounded-full">
            <Plus size={18}/>
          </button>
        </div>

        {/* buscador */}
        <div className="flex gap-2 items-center">
          <Search size={18}/>
          <input
            placeholder="Buscar juego..."
            value={query}
            onChange={e=>setQuery(e.target.value)}
            className="w-full bg-slate-800 p-2 rounded-lg focus:outline-none"
          />
        </div>

        {/* filtro */}
        <button
          onClick={()=>setOnlyPlayable(!onlyPlayable)}
          className="w-full bg-emerald-400 text-black font-bold py-2 rounded-lg"
        >
          {onlyPlayable ? "Mostrando jugables" : "Mostrar todos"}
        </button>
      </div>

      {/* LISTA */}
      <div className="space-y-3">
        {filtered.map(g => {

          const playable = players >= g.min && players <= g.max;

          return (
            <div
              key={g.id}
              className="bg-slate-900 p-4 rounded-xl shadow-lg flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold text-lg">{g.name}</h2>
                <p className="text-sm text-slate-400">
                  {g.type} • {g.time}
                </p>

                <p className={playable ? "text-emerald-400" : "text-red-400"}>
                  {g.min}-{g.max} jugadores
                </p>
              </div>

              <button onClick={()=>toggleFav(g.id)}>
                {favs.includes(g.id)
                  ? <Star className="text-emerald-400"/>
                  : <StarOff className="text-slate-500"/>
                }
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}