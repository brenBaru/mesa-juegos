import {
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Heart,
  Home,
  Minus,
  Plus,
  PlusCircle,
  Search,
  SlidersHorizontal,
  Star,
  StarOff,
  Users
} from "lucide-react";
import { D12Logo } from "../components/brand/D12Logo";
import { DragonCornerIcon } from "../components/brand/DragonCornerIcon";
import { Chip } from "../components/ui/Chip";
import { DeleteConfirmModal } from "../components/ui/DeleteConfirmModal";
import { LabeledSelect } from "../components/ui/FormFields";
import { ToastMessage } from "../components/ui/ToastMessage";
import { APP_NAME, APP_SUBTITLE, modeOptions, timeOptions, typeOptions } from "../data/options";
import { timeLabel, timeText } from "../utils/gameUtils";

export function HomeScreen({
  toast,
  pendingDelete,
  setPendingDelete,
  confirmDeleteGame,
  isCompactHeader,
  authLoading,
  user,
  logout,
  loginGoogle,
  showFilters,
  setShowFilters,
  players,
  setPlayers,
  isSearchOpen,
  setIsSearchOpen,
  query,
  setQuery,
  activeFilterChips,
  onlyPlayable,
  setOnlyPlayable,
  typeFilter,
  setTypeFilter,
  timeFilter,
  setTimeFilter,
  modeFilter,
  setModeFilter,
  resetFilters,
  visibleGames,
  deleteNotice,
  setDeleteNotice,
  screen,
  setScreen,
  effectiveFavs,
  games,
  playable,
  setSelected,
  toggleFav
}) {
return (
  <div translate="no" className="notranslate min-h-screen bg-[#031313] text-slate-100">
    <ToastMessage toast={toast} />
    <DeleteConfirmModal
      game={pendingDelete}
      onCancel={() => setPendingDelete(null)}
      onConfirm={confirmDeleteGame}
    />
    <div className="mx-auto min-h-screen w-full max-w-6xl bg-[radial-gradient(circle_at_top_left,#0f766e_0,#062b2e_32%,#020617_75%)] pb-24 shadow-2xl">
      <div className={`sticky top-0 z-20 border-b border-cyan-400/20 bg-slate-950/92 px-3 backdrop-blur-xl transition-all duration-300 sm:px-4 lg:px-6 ${isCompactHeader ? "pb-1.5 pt-1.5" : "pb-2 pt-2 lg:pb-2.5 lg:pt-2.5"}`}>
        <div className={`flex items-center justify-between gap-3 transition-all ${isCompactHeader ? "py-1" : "py-2"}`}>
          <div className="flex min-w-0 items-center gap-3">
            <D12Logo compact={true} />
            <div className="min-w-0">
              <h1 translate="no" className={`notranslate truncate font-black text-white transition-all ${isCompactHeader ? "text-base sm:text-xl" : "text-xl sm:text-2xl"}`}>{APP_NAME}</h1>
              {!isCompactHeader && <p className="hidden text-[10px] font-black uppercase tracking-wide text-emerald-300 sm:block">{APP_SUBTITLE}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {authLoading ? (
              <span className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300">
                ...
              </span>
            ) : user ? (
              <button
                onClick={logout}
                className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-200 transition hover:border-emerald-300/50"
                title={user.email || "Usuario logueado"}
              >
                Salir
              </button>
            ) : (
              <button
                onClick={loginGoogle}
                className="rounded-2xl bg-emerald-400 px-3 py-2 text-xs font-black text-slate-950"
              >
                Google
              </button>
            )}
            {!isCompactHeader && <div className="hidden sm:block"><DragonCornerIcon compact={true} /></div>}
          </div>
        </div>

        {!isCompactHeader && (
          <div className="mt-2 space-y-2">
            <div className="grid grid-cols-[1fr_auto] gap-2 lg:grid-cols-[0.95fr_1.55fr_auto] lg:items-stretch">
              <div className="order-1 flex min-h-[54px] items-center justify-between gap-3 rounded-[1.35rem] border border-emerald-400/25 bg-slate-950/55 px-3 py-2 shadow-lg shadow-emerald-950/10 lg:rounded-[1.5rem] lg:py-2.5">
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-wide text-emerald-200">Participantes</p>
                  <p className="hidden text-[11px] font-semibold text-slate-500 sm:block">Filtra jugables</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button onClick={() => setPlayers((p) => Math.max(1, p - 1))} className="rounded-full bg-slate-800 p-2 text-white transition hover:bg-slate-700">
                    <Minus size={15} />
                  </button>
                  <span className="w-7 text-center text-xl font-black text-white sm:w-8 sm:text-2xl">{players}</span>
                  <button onClick={() => setPlayers((p) => p + 1)} className="rounded-full bg-emerald-400 p-2 text-slate-950 transition hover:bg-emerald-300">
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <button type="button" onClick={() => setShowFilters((value) => !value)} className="order-3 col-span-2 flex min-h-[54px] items-center justify-between gap-3 rounded-[1.35rem] border border-cyan-400/20 bg-slate-950/55 px-3 py-2 shadow-lg shadow-cyan-950/10 transition hover:border-emerald-300/40 lg:order-2 lg:col-span-1 lg:rounded-[1.5rem] lg:py-2.5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 sm:h-10 sm:w-10">
                    <SlidersHorizontal size={18} />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-sm font-black text-white">Filtros</p>
                    <div className="mt-0.5 flex max-w-full flex-wrap gap-1">
                      {activeFilterChips.slice(0, 2).map((chip) => (
                        <span key={chip} className="rounded-full border border-cyan-400/20 bg-slate-900/80 px-2 py-0.5 text-[9px] font-black text-cyan-100">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-slate-800 p-2 text-slate-200">
                  {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIsSearchOpen((value) => !value)}
                className="order-2 flex min-h-[54px] w-[54px] items-center justify-center px-1 transition lg:order-3 lg:min-h-[58px] lg:w-[52px]"
                aria-label="Buscar juego"
                title="Buscar juego"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl text-slate-950 transition ${
                    isSearchOpen || query
                      ? "bg-emerald-300 shadow-lg shadow-emerald-950/20"
                      : "bg-emerald-400 hover:bg-emerald-300"
                  }`}
                >
                  <Search size={18} />
                </div>
              </button>
            </div>

            {(isSearchOpen || query) && (
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar juego..."
                  className="h-10 w-full rounded-[1.35rem] border border-cyan-400/25 bg-slate-950/70 pl-11 pr-14 text-sm font-semibold text-white placeholder:text-slate-500 outline-none transition-all focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/40 lg:h-11 lg:rounded-[1.5rem]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setIsSearchOpen(false);
                  }}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-2xl bg-slate-800 text-sm font-black text-slate-300 transition hover:bg-slate-700 hover:text-white"
                  aria-label="Cerrar búsqueda"
                >
                  ×
                </button>
              </div>
            )}

            {showFilters && (
              <div className="grid grid-cols-2 gap-3 rounded-[1.5rem] border border-cyan-400/20 bg-slate-950/70 p-3 shadow-lg shadow-cyan-950/10">
                <label className="block">
                  <span className="mb-1 block text-[10px] font-black uppercase tracking-wide text-slate-400">Disponibilidad</span>
                  <button type="button" onClick={() => setOnlyPlayable((v) => !v)} className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-black transition ${onlyPlayable ? "bg-emerald-400 text-slate-950" : "border border-slate-700 bg-slate-900 text-slate-100"}`}>
                    <Filter size={15} />
                    {onlyPlayable ? "Jugables" : "Todos"}
                  </button>
                </label>
                <LabeledSelect label="Tipo" value={typeFilter} onChange={setTypeFilter} options={typeOptions} />
                <LabeledSelect label="Duración" value={timeFilter} onChange={setTimeFilter} options={timeOptions} />
                <LabeledSelect label="Modo" value={modeFilter} onChange={setModeFilter} options={modeOptions} />
                <button
                  type="button"
                  onClick={resetFilters}
                  className="col-span-2 flex h-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-sm font-black text-slate-200 transition hover:border-emerald-400/40 hover:text-emerald-200"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <main className="p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col gap-2 rounded-[1.35rem] border border-cyan-400/20 bg-slate-950/55 px-3 py-3 text-slate-100 shadow-lg shadow-cyan-950/10 sm:px-4 lg:flex-row lg:items-center lg:justify-between lg:rounded-[1.5rem]">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">Quest log</p>
            <p className="mt-0.5 text-base font-black text-white sm:text-lg lg:text-xl">
              {visibleGames.length} juegos disponibles
            </p>
          </div>
          <p className="text-[11px] font-semibold text-slate-400 sm:text-xs">
            {screen === "favorites"
              ? `Favoritos compatibles para ${players} participantes.`
              : `Filtrando para ${players} participantes.`}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1.5 text-[11px] font-black text-emerald-200 sm:px-3 sm:py-2 sm:text-xs">
              {visibleGames.length} visibles
            </span>
            <span className="rounded-2xl border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1.5 text-[11px] font-black text-cyan-200 sm:px-3 sm:py-2 sm:text-xs">
              {screen === "favorites" ? effectiveFavs.length : games.length} en lista
            </span>
          </div>
        </div>
        {deleteNotice && (
          <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
            <div className="flex items-center justify-between gap-3">
              <span>
                <b translate="no" className="notranslate">{deleteNotice.name}</b> se borró correctamente del listado.
              </span>
              <button
                onClick={() => setDeleteNotice(null)}
                className="rounded-full bg-slate-900/70 px-3 py-1 text-xs font-black text-emerald-200"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {visibleGames.length === 0 && (
          <div className="rounded-[2rem] border border-slate-700 bg-slate-950/70 p-6 text-center shadow-xl shadow-slate-950/30">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
              <Search size={24} />
            </div>
            <h2 className="mt-4 text-xl font-black text-white">
              {screen === "favorites" ? "Todavía no hay favoritos para mostrar" : "No encontramos juegos con esos filtros"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">
              {screen === "favorites"
                ? "Marcá juegos con la estrella para armar una lista rápida de próximas partidas."
                : "Probá cambiar la cantidad de participantes, ajustar duración/tipo o limpiar los filtros activos."}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-black text-slate-950"
            >
              Limpiar filtros
            </button>
          </div>
        )}
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visibleGames.map((game) => {
            const canPlay = playable(game);
          return (
            <button
              key={game.id}
              onClick={() => { setSelected(game); setScreen("detail"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`group min-h-[160px] w-full rounded-[1.7rem] border p-4 text-left shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.99] sm:min-h-[188px] sm:rounded-[2rem] ${
                canPlay
                  ? "border-slate-700/80 bg-slate-900/90 hover:border-emerald-400/40 hover:shadow-emerald-950/20"
                  : "border-red-400/20 bg-slate-950/80 opacity-80 hover:border-red-300/30"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 translate="no" className="notranslate text-lg font-black leading-6 text-white transition group-hover:text-emerald-100">{game.name}</h2>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-black text-cyan-100">{game.type}</span>
                    <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-2 py-0.5 text-[10px] font-black text-violet-100">{game.mode}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-400">{game.vibe}</p>
                </div>
                <span onClick={(e) => { e.stopPropagation(); toggleFav(game.id); }} className="rounded-2xl bg-slate-800/90 p-2 transition group-hover:bg-slate-700">
                  {effectiveFavs.includes(game.id) ? <Star className="h-5 w-5 text-emerald-300" /> : <StarOff className="h-5 w-5 text-slate-400" />}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <Chip variant={canPlay ? "ok" : "danger"}>{canPlay ? "Se puede" : `No entra con ${players}`}</Chip>
                <Chip><Users size={13} />{game.min}–{game.max}</Chip>
                <Chip><Clock size={13} />{timeText(game)}</Chip>
                <Chip variant="purple">{timeLabel(game)}</Chip>
              </div>
            </button>
          );
          })}
        </div>
      </main>

      <nav className="fixed bottom-0 left-1/2 z-30 grid w-full max-w-6xl -translate-x-1/2 grid-cols-3 gap-1 border-t border-cyan-400/20 bg-slate-950/95 p-2 backdrop-blur-xl">
        <button onClick={() => { setScreen("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-bold ${screen === "home" ? "bg-emerald-400 text-slate-950" : "text-slate-300"}`}>
          <Home size={20} />
          Inicio
        </button>

        <button onClick={() => { setScreen("favorites"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-bold ${screen === "favorites" ? "bg-emerald-400 text-slate-950" : "text-slate-300"}`}>
          <Heart size={20} />
          Favoritos
        </button>

        <button onClick={() => { setScreen("add"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-bold ${screen === "add" ? "bg-emerald-400 text-slate-950" : "text-slate-300"}`}>
          <PlusCircle size={20} />
          Agregar
        </button>
      </nav>
    </div>
  </div>
);
}
