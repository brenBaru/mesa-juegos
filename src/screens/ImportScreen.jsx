import { ArrowLeft, Clock, Search, Users } from "lucide-react";
import { Chip } from "../components/ui/Chip";
import { ToastMessage } from "../components/ui/ToastMessage";
import { timeText } from "../utils/gameUtils";

export function ImportScreen({
  toast,
  catalog,
  importResults,
  catalogLoading,
  importQuery,
  setImportQuery,
  searchGames,
  importLoading,
  games,
  setSelected,
  setScreen,
  user,
  upsertGame,
  setCustomGames,
  showToast
}) {
  return (
    <div translate="no" className="notranslate min-h-screen bg-[#031313] text-slate-100">
      <ToastMessage toast={toast} />
      <div className="mx-auto min-h-screen w-full max-w-6xl bg-[radial-gradient(circle_at_top_left,#0f766e_0,#062b2e_32%,#020617_75%)] pb-24 shadow-2xl">
        <div className="sticky top-0 z-20 border-b border-cyan-400/20 bg-slate-950/92 px-4 py-4 backdrop-blur-xl lg:px-6">
          <button
            onClick={() => setScreen("add")}
            className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2 text-sm font-bold text-emerald-300 transition hover:bg-slate-700"
          >
            <ArrowLeft size={16} />
            Volver
          </button>

          <div className="mt-5 rounded-[2rem] border border-cyan-400/20 bg-slate-950/55 p-5 shadow-xl shadow-cyan-950/20">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Catálogo local</p>
            <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-black text-white">Importar juego</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                  Buscá un juego del catálogo local, revisá si ya existe en tu lista y agregalo con una guía editable.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:min-w-[240px]">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-center">
                  <p className="text-xl font-black text-cyan-100">{catalog.length}</p>
                  <p className="text-[9px] font-black uppercase tracking-wide text-cyan-300">catálogo</p>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-center">
                  <p className="text-xl font-black text-emerald-100">{importResults.length}</p>
                  <p className="text-[9px] font-black uppercase tracking-wide text-emerald-300">resultados</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="grid gap-4 p-4 lg:grid-cols-[0.85fr_1.15fr] lg:p-6">
          <aside className="space-y-4">
            <section className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/70 p-4 shadow-xl shadow-cyan-950/15">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Buscar</p>
              <div className="relative mt-3">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200" />
                <input
                  value={importQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setImportQuery(value);
                    searchGames(value);
                  }}
                  placeholder="Escribí al menos 3 letras..."
                  className="h-12 w-full rounded-3xl border border-cyan-400/25 bg-slate-900/80 pl-11 pr-3 text-sm font-semibold text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/40"
                />
              </div>

              <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-900/70 p-3 text-sm leading-6 text-slate-300">
                <p className="font-black text-white">Estados</p>
                <p className="mt-1"><span className="font-bold text-emerald-300">Ya agregado</span>: podés ir directo al detalle.</p>
                <p><span className="font-bold text-cyan-300">Importar</span>: se agrega como juego editable.</p>
              </div>
            </section>

            <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-50">
              <b>Tip:</b> si importás un juego sin preparación/reglas, entrá a detalle y usá <b>Editar guía</b> para completar la información.
            </section>
          </aside>

          <section className="space-y-3">
            {catalogLoading && (
              <div className="rounded-[2rem] border border-slate-700 bg-slate-950/70 p-6 text-sm text-slate-400">
                Cargando catálogo...
              </div>
            )}

            {!catalogLoading && importQuery.length < 3 && (
              <div className="rounded-[2rem] border border-slate-700 bg-slate-950/70 p-6 text-center shadow-xl shadow-slate-950/20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                  <Search size={24} />
                </div>
                <h2 className="mt-4 text-xl font-black text-white">Buscá en el catálogo</h2>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">
                  Escribí al menos 3 letras para ver resultados. Los juegos que ya estén en tu lista aparecen marcados.
                </p>
              </div>
            )}

            {!catalogLoading && !importLoading && importQuery.length >= 3 && importResults.length === 0 && (
              <div className="rounded-[2rem] border border-slate-700 bg-slate-950/70 p-6 text-center shadow-xl shadow-slate-950/20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                  <Search size={24} />
                </div>
                <h2 className="mt-4 text-xl font-black text-white">No se encontraron resultados</h2>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">
                  Probá buscar por otro nombre, tipo o palabra clave.
                </p>
              </div>
            )}

            {importLoading && (
              <div className="rounded-[2rem] border border-slate-700 bg-slate-950/70 p-6 text-sm text-slate-400">
                Buscando...
              </div>
            )}

            {Array.isArray(importResults) && importResults.length > 0 && (
              <div className="grid gap-3 md:grid-cols-2">
                {importResults.map((game) => {
                  const alreadyExists = games.some(
                    (existing) => existing.name.toLowerCase() === game.name.toLowerCase()
                  );
                  const existingGame = games.find(
                    (existing) => existing.name.toLowerCase() === game.name.toLowerCase()
                  );

                  return (
                    <article
                      key={game.id}
                      className="flex min-h-[180px] flex-col justify-between rounded-[2rem] border border-slate-700/80 bg-slate-950/70 p-4 shadow-xl shadow-slate-950/20 transition hover:border-emerald-400/30"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p translate="no" className="notranslate text-lg font-black leading-6 text-white">{game.name}</p>
                            <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-400">{game.vibe}</p>
                          </div>
                          <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-black ${alreadyExists ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200"}`}>
                            {alreadyExists ? "Ya agregado" : "Nuevo"}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          <Chip><Users size={13} />{game.min}–{game.max}</Chip>
                          <Chip><Clock size={13} />{timeText(game)}</Chip>
                          <Chip>{game.type}</Chip>
                          <Chip variant="purple">{game.mode}</Chip>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const targetGame = alreadyExists ? existingGame : game;
                            if (!targetGame) return;
                            setSelected(targetGame);
                            setScreen("detail");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm font-black text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-100"
                        >
                          Ver detalle
                        </button>
                        <button
                          type="button"
                          disabled={alreadyExists}
                          onClick={async () => {
                            if (alreadyExists) return;

                            const newGame = {
                              ...game,
                              custom: true,
                              videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(
                                game.name + " juego de mesa como jugar"
                              )}`,
                              rulesUrl: `https://www.google.com/search?q=${encodeURIComponent(
                                game.name + " reglas juego de mesa"
                              )}`,
                              setup: ["Preparación no disponible."],
                              howTo: ["Reglas no disponibles."],
                              playerSetups: []
                            };

                            if (user) {
                              await upsertGame(user.uid, newGame);
                            } else {
                              setCustomGames((prev) => [newGame, ...prev]);
                            }

                            setSelected(newGame);
                            setScreen("detail");
                            showToast("Juego importado correctamente.");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`rounded-2xl px-3 py-3 text-sm font-black transition ${
                            alreadyExists
                              ? "cursor-not-allowed bg-slate-800 text-slate-500"
                              : "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                          }`}
                        >
                          {alreadyExists ? "Agregado" : "Importar"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
