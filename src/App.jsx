import React, { useState, useMemo } from "react";
import { Star, StarOff, Plus, Minus, ArrowLeft } from "lucide-react";

const games = [
{
id:1,name:"Secret Hitler",min:5,max:10,type:"Roles ocultos",time:"45–60 min",
setup:[
"Elegir tablero según jugadores",
"Mezclar cartas de políticas",
"Repartir roles en secreto",
"Elegir primer presidente"
],
steps:[
"Presidente propone canciller",
"Se vota el gobierno",
"Se roban 3 cartas",
"Se descartan y se juega 1 política",
"Se activan poderes si corresponde",
"Se gana por condiciones del equipo"
]
},
{
id:2,name:"Polilla Tramposa",min:3,max:5,type:"Party",time:"15–25 min",
setup:[
"Repartir 8 cartas a cada jugador",
"Elegir guardián",
"Colocar mazo y descarte"
],
steps:[
"Jugar cartas consecutivas",
"Hacer trampa sin ser visto",
"El guardián controla",
"Gana quien se queda sin cartas"
]
},
{
id:3,name:"El Huésped",min:5,max:12,type:"Roles ocultos",time:"30 min",
setup:[
"Asignar roles secretos",
"Preparar mazo de eventos",
"Explicar objetivos"
],
steps:[
"Debatir y acusar",
"Realizar votaciones",
"Eliminar sospechosos",
"Detectar infiltrados"
]
},
{
id:4,name:"La Morada Maldita",min:2,max:6,type:"Visual",time:"20 min",
setup:[
"Colocar gemas en mesa",
"Repartir cartas objetivo"
],
steps:[
"Buscar patrones visuales",
"Tomar gemas correctas",
"Completar objetivos",
"Sumar puntos"
]
},
{
id:5,name:"Bajo Amenaza",min:3,max:6,type:"Cooperativo",time:"25 min",
setup:[
"Preparar mazo inicial",
"Definir objetivo común"
],
steps:[
"Jugar cartas para avanzar",
"Evitar amenazas",
"Coordinar en grupo",
"Escapar antes del final"
]
},
{
id:6,name:"Líderes de Euphoria",min:4,max:8,type:"Social",time:"30 min",
setup:[
"Repartir cartas de rol",
"Preparar artefactos"
],
steps:[
"Interrogar jugadores",
"Mentir o revelar verdades",
"Usar habilidades",
"Descubrir roles enemigos"
]
},
{
id:7,name:"Musa",min:2,max:12,type:"Creativo",time:"30 min",
setup:[
"Dividir en equipos",
"Mezclar cartas de imágenes"
],
steps:[
"Dar pistas creativas",
"Adivinar imagen correcta",
"Sumar puntos"
]
},
{
id:8,name:"Survivor",min:3,max:6,type:"Estrategia",time:"45 min",
setup:[
"Asignar personajes",
"Repartir cartas de acción"
],
steps:[
"Formar alianzas",
"Robar cartas",
"Votar eliminaciones",
"Ganar por estrategia final"
]
},
{
id:9,name:"Dungeon Fighter",min:1,max:6,type:"Cooperativo",time:"60 min",
setup:[
"Elegir héroes",
"Preparar tablero"
],
steps:[
"Lanzar dados a objetivo",
"Enfrentar enemigos",
"Avanzar mazmorra",
"Derrotar jefe final"
]
},
{
id:10,name:"Deception HK",min:4,max:12,type:"Deducción",time:"20 min",
setup:[
"Asignar roles",
"Preparar pistas"
],
steps:[
"Detective da pistas",
"Jugadores discuten",
"Acusar culpable",
"Resolver caso"
]
}
];

export default function App(){

const [screen,setScreen]=useState("list");
const [selected,setSelected]=useState(null);
const [players,setPlayers]=useState(5);
const [favs,setFavs]=useState([]);
const [onlyPlayable,setOnlyPlayable]=useState(true);
const [typeFilter,setTypeFilter]=useState("Todos");

const playable=g=>players>=g.min && players<=g.max;

const filtered=useMemo(()=>{
return games
.filter(g=>!onlyPlayable || playable(g))
.filter(g=>typeFilter==="Todos" || g.type===typeFilter);
},[players,onlyPlayable,typeFilter]);

const toggleFav=id=>{
setFavs(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
};

if(screen==="detail" && selected){
return(
<div className="min-h-screen bg-[#021212] text-white p-4">

<button onClick={()=>setScreen("list")}
className="mb-4 flex items-center gap-2 text-sm text-emerald-400">
<ArrowLeft size={16}/> Volver
</button>

<h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
<p className="text-gray-400 mb-3">{selected.type} • {selected.time}</p>

<h3 className="font-semibold mt-4">Preparación</h3>
<ul className="mt-2 space-y-1">
{selected.setup.map((s,i)=><li key={i}>• {s}</li>)}
</ul>

<h3 className="font-semibold mt-5">Cómo se juega</h3>
<ol className="mt-2 space-y-2">
{selected.steps.map((s,i)=><li key={i}>{i+1}. {s}</li>)}
</ol>

</div>
);
}

return(
<div className="min-h-screen bg-[#021212] text-white p-4">

<h1 className="text-3xl font-bold mb-4">Mesa lista</h1>

{/* CONTROLES */}
<div className="bg-slate-900 p-4 rounded-xl space-y-3 mb-4">

<div className="flex justify-center items-center gap-4">
<button onClick={()=>setPlayers(p=>p-1)} className="bg-slate-800 p-2 rounded">
<Minus/>
</button>

<span className="text-xl">{players}</span>

<button onClick={()=>setPlayers(p=>p+1)} className="bg-emerald-400 text-black p-2 rounded">
<Plus/>
</button>
</div>

<div className="flex gap-2">
<button onClick={()=>setOnlyPlayable(!onlyPlayable)}
className="bg-emerald-400 text-black px-3 py-1 rounded">
Jugables
</button>

<select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)}
className="bg-slate-800 p-1 rounded">
<option>Todos</option>
<option>Party</option>
<option>Cooperativo</option>
<option>Roles ocultos</option>
<option>Deducción</option>
<option>Social</option>
<option>Creativo</option>
<option>Estrategia</option>
<option>Visual</option>
</select>
</div>

</div>

{/* LISTA */}
<div className="space-y-3">

{filtered.map(g=>{
const canPlay=playable(g);

return(
<div key={g.id}
onClick={()=>{setSelected(g);setScreen("detail");}}
className="bg-slate-900 p-4 rounded-xl flex justify-between cursor-pointer hover:bg-slate-800">

<div>
<h2 className="font-bold text-white">{g.name}</h2>

<p className="text-sm text-gray-400">{g.type} • {g.time}</p>

<p className={canPlay?"text-emerald-400":"text-red-400"}>
{g.min}-{g.max} jugadores
</p>
</div>

<button onClick={(e)=>{e.stopPropagation();toggleFav(g.id);}}>
{favs.includes(g.id)?<Star className="text-yellow-400"/>:<StarOff/>}
</button>

</div>
);
})}

</div>

</div>
);
}
