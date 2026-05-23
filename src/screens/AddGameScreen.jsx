import { ArrowLeft, Save } from "lucide-react";
import { Field, LabeledSelect, TextAreaField } from "../components/ui/FormFields";
import { ToastMessage } from "../components/ui/ToastMessage";

export function AddGameScreen({
  toast,
  setScreen,
  form,
  setForm,
  typeOptions,
  modeOptions,
  setupPlaceholder,
  howToPlaceholder,
  saveManualGame
}) {
  return (
    <div translate="no" className="notranslate min-h-screen bg-[#031313] text-slate-100">
      <ToastMessage toast={toast} />
      <div className="mx-auto min-h-screen w-full max-w-6xl bg-[radial-gradient(circle_at_top_left,#0f766e_0,#062b2e_32%,#020617_75%)] pb-24 shadow-2xl">
        <div className="sticky top-0 z-20 border-b border-cyan-400/20 bg-slate-950/90 px-3 py-3 backdrop-blur-xl sm:px-4 lg:px-6">
          <button onClick={() => setScreen("home")} className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2 text-sm font-bold text-emerald-300">
            <ArrowLeft size={16} />
            Volver
          </button>

          <div className="mt-3 rounded-[1.5rem] border border-cyan-400/20 bg-slate-950/45 p-4 shadow-xl shadow-cyan-950/20 sm:mt-5 sm:rounded-[2rem] sm:p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300 sm:text-xs sm:tracking-[0.22em]">Nuevo juego</p>
            <h1 className="mt-1 text-2xl font-black text-white sm:mt-2 sm:text-3xl">Agregar juego</h1>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-300 sm:mt-2 sm:text-sm sm:leading-6">
              Cargá un juego manualmente, importalo desde el catálogo o dejá preparada una guía rápida para explicar la partida.
            </p>
          </div>
        </div>

        <main className="grid gap-3 p-3 sm:gap-4 sm:p-4 lg:grid-cols-[0.8fr_1.2fr] lg:p-6">
          <aside className="space-y-4">
            <button
              onClick={() => setScreen("import")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-3 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-950/25 sm:rounded-3xl sm:py-4"
            >
              Importar desde catálogo
            </button>

            <div className="rounded-[2rem] border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-50">
              <b>Tip:</b> si el juego está en el catálogo, conviene importarlo primero y después completar preparación o reglas manualmente.
            </div>

            <div className="rounded-[2rem] border border-slate-700 bg-slate-950/70 p-4 text-sm leading-6 text-slate-300">
              <p className="font-black text-white">Datos mínimos</p>
              <p className="mt-1">Nombre, jugadores, duración y tipo alcanzan para que aparezca en la lista principal.</p>
            </div>
          </aside>

          <section className="space-y-3 rounded-[1.5rem] border border-slate-700/80 bg-slate-950/65 p-3 shadow-2xl shadow-slate-950/30 sm:space-y-4 sm:rounded-[2rem] sm:p-4 lg:p-5">
            <div className="grid gap-3 lg:grid-cols-2">
              <Field label="Nombre del juego" value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="Ej: Codenames" />
              <Field label="Edad sugerida" value={form.age} onChange={(value) => setForm({ ...form, age: value })} placeholder="Ej: 10+" />
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Field label="Mín. jugadores" type="number" value={form.min} onChange={(value) => setForm({ ...form, min: value })} />
              <Field label="Máx. jugadores" type="number" value={form.max} onChange={(value) => setForm({ ...form, max: value })} />
              <Field label="Tiempo mín." type="number" value={form.timeMin} onChange={(value) => setForm({ ...form, timeMin: value })} />
              <Field label="Tiempo máx." type="number" value={form.timeMax} onChange={(value) => setForm({ ...form, timeMax: value })} />
            </div>

            <div className="grid gap-3 lg:grid-cols-3">
              <LabeledSelect label="Tipo" value={form.type} onChange={(value) => setForm({ ...form, type: value })} options={typeOptions.filter((x) => x !== "Todos")} />
              <LabeledSelect label="Modo" value={form.mode} onChange={(value) => setForm({ ...form, mode: value })} options={modeOptions.filter((x) => x !== "Todos")} />
              <LabeledSelect label="Dificultad" value={form.level} onChange={(value) => setForm({ ...form, level: value })} options={["Bajo", "Medio", "Alto"]} />
            </div>

            <Field label="Resumen" value={form.vibe} onChange={(value) => setForm({ ...form, vibe: value })} placeholder="Ej: Deducción rápida por equipos" />

            <div className="grid gap-3 lg:grid-cols-2">
              <Field label="Link a video" value={form.videoUrl} onChange={(value) => setForm({ ...form, videoUrl: value })} placeholder="Opcional" />
              <Field label="Link a instructivo/reglas" value={form.rulesUrl} onChange={(value) => setForm({ ...form, rulesUrl: value })} placeholder="Opcional" />
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              <TextAreaField label="Preparación" value={form.setupText} onChange={(value) => setForm({ ...form, setupText: value })} placeholder={setupPlaceholder} />
              <TextAreaField label="Cómo se juega" value={form.howToText} onChange={(value) => setForm({ ...form, howToText: value })} placeholder={howToPlaceholder} />
            </div>

            <button onClick={saveManualGame} className="flex w-full items-center justify-center gap-2 rounded-3xl bg-emerald-400 px-3 py-4 text-sm font-black text-slate-950 shadow-lg shadow-emerald-950/25">
              <Save size={18} />
              Guardar juego
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
