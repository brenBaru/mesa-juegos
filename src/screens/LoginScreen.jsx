import { Sparkles, Cloud, Search, Star, Gamepad2 } from "lucide-react";
import { APP_NAME, APP_SUBTITLE } from "../data/options";
import { D12Logo } from "../components/brand/D12Logo";

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.2-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.2 4 9.5 8.5 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.4 39.5 16.1 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </svg>
  );
}

export function LoginScreen({ authLoading, loginGoogle, onContinueOffline }) {
  return (
    <div translate="no" className="notranslate min-h-screen overflow-hidden bg-[#031313] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_32%)]" />
      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-5 sm:px-6 lg:px-8">
        <section className="grid w-full gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/72 p-5 shadow-2xl shadow-emerald-950/25 backdrop-blur-xl sm:p-7 lg:p-8">
            <div className="flex items-center gap-3">
              <D12Logo compact={false} />
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-300 sm:text-xs">{APP_SUBTITLE}</p>
                <h1 translate="no" className="notranslate mt-1 truncate text-3xl font-black leading-none text-white sm:text-4xl lg:text-5xl">
                  {APP_NAME}
                </h1>
              </div>
            </div>

            <div className="mt-7 space-y-3 sm:mt-8">
              <p className="max-w-2xl text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                Tu mesa lista en segundos.
              </p>
              <p className="max-w-xl text-sm font-semibold leading-6 text-slate-300 sm:text-base">
                Elegí cantidad de jugadores, filtrá opciones, guardá favoritos y sincronizá tus guías entre dispositivos.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 sm:p-4">
                <Gamepad2 className="h-5 w-5 text-emerald-200" />
                <p className="mt-2 text-[10px] font-black uppercase tracking-wide text-emerald-200">Jugadores</p>
              </div>
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 sm:p-4">
                <Search className="h-5 w-5 text-cyan-200" />
                <p className="mt-2 text-[10px] font-black uppercase tracking-wide text-cyan-200">Filtros</p>
              </div>
              <div className="rounded-2xl border border-violet-400/20 bg-violet-400/10 p-3 sm:p-4">
                <Star className="h-5 w-5 text-violet-200" />
                <p className="mt-2 text-[10px] font-black uppercase tracking-wide text-violet-200">Favoritos</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-700/80 bg-slate-950/88 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-7 lg:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">Acceso</p>
                <h2 className="mt-2 text-3xl font-black text-white">Ingresar</h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  Usá Google para mantener favoritos, juegos importados, notas y guías sincronizadas.
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-200">
                <Cloud size={22} />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={loginGoogle}
                disabled={authLoading}
                className="flex w-full items-center justify-center gap-3 rounded-3xl bg-emerald-400 px-4 py-4 text-sm font-black text-slate-950 shadow-lg shadow-emerald-950/25 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <GoogleMark />
                {authLoading ? "Cargando..." : "Ingresar con Google"}
              </button>
              <button
                type="button"
                onClick={onContinueOffline}
                className="flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-700 bg-slate-900 px-4 py-4 text-sm font-black text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-100"
              >
                Continuar sin sincronizar
              </button>
            </div>

            <div className="mt-5 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4">
              <div className="flex gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
                <p className="text-xs leading-5 text-cyan-50">
                  Si entrás sin cuenta, los datos quedan solo en este navegador. Para usar lo mismo en web y celular, conviene iniciar sesión.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
