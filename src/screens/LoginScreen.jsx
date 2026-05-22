import { APP_NAME, APP_SUBTITLE } from "../data/options";
import { D12Logo } from "../components/brand/D12Logo";
import { DragonCornerIcon } from "../components/brand/DragonCornerIcon";

export function LoginScreen({ authLoading, loginGoogle, onContinueOffline }) {
  return (
    <div translate="no" className="notranslate min-h-screen bg-[#031313] px-4 py-6 text-slate-100">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-cyan-400/20 bg-[radial-gradient(circle_at_top_left,#0f766e_0,#062b2e_35%,#020617_80%)] p-6 shadow-2xl lg:p-10">
          <div className="flex items-center gap-4">
            <D12Logo />
            <div>
              <h1 translate="no" className="notranslate text-3xl font-black text-white lg:text-5xl">{APP_NAME}</h1>
              <p className="mt-1 text-xs font-black uppercase tracking-wide text-emerald-300 lg:text-sm">
                {APP_SUBTITLE}
              </p>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-lg font-semibold leading-7 text-slate-200 lg:text-xl">
            Organizá tu próxima partida, filtrá juegos por cantidad de jugadores, guardá favoritos y mantené tus guías sincronizadas entre dispositivos.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="text-2xl font-black text-emerald-200">1</p>
              <p className="mt-1 text-sm text-slate-300">Elegí participantes</p>
            </div>

            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4">
              <p className="text-2xl font-black text-cyan-200">2</p>
              <p className="mt-1 text-sm text-slate-300">Filtrá opciones</p>
            </div>

            <div className="rounded-3xl border border-violet-400/20 bg-violet-400/10 p-4">
              <p className="text-2xl font-black text-violet-200">3</p>
              <p className="mt-1 text-sm text-slate-300">Guardá tu guía</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-700 bg-slate-950/90 p-6 shadow-2xl lg:p-8">
          <div className="flex justify-end">
            <DragonCornerIcon />
          </div>

          <h2 className="mt-6 text-2xl font-black text-white">Ingresar</h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Iniciá sesión con Google para guardar favoritos, juegos importados y cambios en preparación/instrucciones.
          </p>

          <button
            onClick={loginGoogle}
            disabled={authLoading}
            className="mt-6 flex w-full items-center justify-center rounded-3xl bg-emerald-400 px-4 py-4 text-sm font-black text-slate-950 disabled:opacity-60"
          >
            {authLoading ? "Cargando..." : "Ingresar con Google"}
          </button>

          <button
            onClick={onContinueOffline}
            className="mt-3 flex w-full items-center justify-center rounded-3xl border border-slate-700 bg-slate-900 px-4 py-4 text-sm font-black text-slate-200"
          >
            Continuar sin sincronizar
          </button>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Si continuás sin iniciar sesión, los datos quedan solo en este navegador.
          </p>
        </section>
      </div>
    </div>
  );
}

