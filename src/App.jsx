import React, { useState, useMemo } from "react";
import { Star, StarOff, Plus, Minus } from "lucide-react";

const games = [
  { id:1, name:"Secret Hitler", min:5, max:10, type:"Roles ocultos", time:"45–60 min" },
  { id:2, name:"Polilla Tramposa", min:3, max:5, type:"Party", time:"15–25 min" },
  { id:3, name:"El Huésped", min:5, max:12, type:"Roles ocultos", time:"30 min" },
  { id:4, name:"La Morada Maldita", min:2, max:6, type:"Visual", time:"20 min" },
  { id:5, name:"Bajo Amenaza", min:3, max:6, type:"Cooperativo", time:"25 min" },
  { id:6, name:"Líderes de Euphoria", min:4, max:8, type:"Social", time:"30 min" },
  { id:7, name:"Musa", min:2, max:12, type:"Creativo", time:"30 min" },
  { id:8, name:"Survivor: The Tribe Has Spoken", min:3, max:6, type:"Estrategia", time:"45 min" },
  { id:9, name:"Dungeon Fighter", min:1, max:6, type:"Cooperativo", time:"60 min" },
  { id:10, name:"Deception HK", min:4, max:12, type:"Deducción", time:"20 min" }
];

export default function App() {

  const [players, setPlayers] = useState(5);
  const [selected, setSelected] = useState(null);
  const [favs, setFavs] = useState([]);
  const [onlyPlayable, setOnlyPlayable] = useState(true);

  const playable = g => players >= g.min && players <= g.max;

  const filtered = useMemo(() => {
    return games.filter(g => !onlyPlayable || playable(g));
  }, [players, onlyPlayable]);

  const toggleFav = id => {
    setFavs(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050b14] via-[#061420] to-[#020617] text-white p-4">

      {/* HEADER */}
      <h1 className="text-4xl font-black mb-4">
        🎲 Mesa lista
      </h1>

      {/* CONTROLES */}
      <div className="bg-slate-900 p-4 rounded-2xl mb-5 shadow-xl space-y-3">

        {/* jugadores */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={()=>setPlayers(p=>Math.max(1,p-1))}
            className="bg-slate-800 p-3 rounded-xl"
          >
            <Minus />
          </button>

          <span className="text-3xl font-bold">{players}</span>

          <button
            onClick={()=>setPlayers(p=>p+1)}
            className="bg-emerald-400 text-black p-3 rounded-xl"
          >
            <Plus />
          </button>
        </div>

        {/* filtro */}
        <button
          onClick={()=>setOnlyPlayable(!onlyPlayable)}
          className="w-full bg-emerald-400 text-black font-bold py-2 rounded-xl"
        >
          {onlyPlayable ? "Mostrando jugables" : "Mostrar todos"}
        </button>

      </div>

      {/* LAYOUT */}
      <div className="grid gap-4 md:grid-cols-2">

        {/* LISTA */}
        <div className="space-y-3">

          {filtered.map(g => {

            const isSelected = selected?.id === g.id;

            return (
              <div
                key={g.id}
                onClick={()=>setSelected(g)}
                className={`cursor-pointer rounded-2xl p-4 shadow-lg transition ${
                  isSelected
                    ? "bg-emerald-500 text-black"
                    : "bg-slate-900"
                }`}
              >
                <div className="flex justify-between">

                  <div>
                    <h2 className="text-lg font-bold">{g.name}</h2>

                    <p className="text-sm text-slate-400">
                      {g.type} • {g.time}
                    </p>

                    <p className={playable(g)
                      ? "text-emerald-400"
                      : "text-red-400"
                    }>
                      {g.min}-{g.max} jugadores
                    </p>
                  </div>

                  <button
                    onClick={(e)=>{
                      e.stopPropagation();
                      toggleFav(g.id);
                    }}
                  >
                    {favs.includes(g.id)
                      ? <Star className="text-yellow-400"/>
                      : <StarOff className="text-gray-500"/>
                    }
                  </button>

                </div>
              </div>
            );
          })}

        </div>

        {/* DETALLE */}
        {selected && (
          <div className="bg-slate-900 p-5 rounded-2xl shadow-xl">

            <h2 className="text-2xl font-bold mb-2">
              {selected.name}
            </h2>

            <p className="text-slate-400 mb-2">
              {selected.type} • {selected.time}
            </p>

            <p className="mb-4">
              {selected.min}-{selected.max} jugadores
            </p>

            <div className="bg-slate-800 p-3 rounded-xl text-sm">
              ✅ Juego seleccionado  
              <br/>
              👉 Próximo paso: agregar preparación y reglas detalladas
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
