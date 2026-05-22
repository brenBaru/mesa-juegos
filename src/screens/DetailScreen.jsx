import {
  ArrowLeft,
  BookOpen,
  Clock,
  ExternalLink,
  PlayCircle,
  Save,
  Star,
  StarOff,
  Trash2,
  Trophy,
  Users
} from "lucide-react";
import { Chip } from "../components/ui/Chip";
import { DeleteConfirmModal } from "../components/ui/DeleteConfirmModal";
import { Field, TextAreaField } from "../components/ui/FormFields";
import { ToastMessage } from "../components/ui/ToastMessage";
import { getPlayerSpecificSetup, timeText } from "../utils/gameUtils";

export function DetailScreen({
  selected,
  players,
  pendingDelete,
  toast,
  effectiveFavs,
  setPendingDelete,
  confirmDeleteGame,
  setIsEditingGuide,
  setIsEditingNotes,
  setScreen,
  toggleFav,
  openEditGuide,
  playable,
  isEditingNotes,
  noteText,
  setNoteText,
  openEditNotes,
  saveNotes,
  requestDeleteGame,
  isEditingGuide,
  guideForm,
  setGuideForm,
  setupPlaceholder,
  howToPlaceholder,
  saveGuide
}) {
  const playerSpecificSetup = getPlayerSpecificSetup(selected, players);
  const setupSteps = Array.isArray(selected.setup) ? selected.setup : [];
  const howToSteps = Array.isArray(selected.howTo) ? selected.howTo : [];

  return (
    <div translate="no" className="notranslate min-h-screen bg-[#031313] text-slate-100">
      <ToastMessage toast={toast} />
      <DeleteConfirmModal
        game={pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDeleteGame}
      />

      <div className="mx-auto min-h-screen w-full max-w-6xl bg-[radial-gradient(circle_at_top_left,#0f766e_0,#062b2e_32%,#020617_75%)] pb-24 shadow-2xl">
        <div className="sticky top-0 z-20 border-b border-cyan-400/20 bg-slate-950/92 px-4 py-3 backdrop-blur-xl lg:px-6">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setIsEditingGuide(false);
                setIsEditingNotes(false);
                setScreen("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2 text-sm font-bold text-emerald-300 transition hover:bg-slate-700"
            >
              <ArrowLeft size={16} />
              Volver
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openEditGuide(selected)}
                className="rounded-2xl border border-cyan-400/25 bg-cyan-400/10 px-3 py-2 text-xs font-black text-cyan-100 transition hover:border-emerald-300/50 hover:text-emerald-200"
              >
                Editar guía
              </button>
              <button onClick={() => toggleFav(selected.id)} className="rounded-2xl bg-slate-800 p-3 transition hover:bg-slate-700">
                {effectiveFavs.includes(selected.id) ? <Star className="text-emerald-300" /> : <StarOff className="text-slate-300" />}
              </button>
            </div>
          </div>
        </div>

        <main className="grid gap-4 p-4 lg:grid-cols-[0.82fr_1.18fr] lg:p-6">
          <aside className="space-y-4">
            <section className="overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-slate-950/70 p-5 shadow-2xl shadow-cyan-950/20">
              <div className="flex flex-wrap items-center gap-2">
                <Chip variant={playable(selected) ? "ok" : "danger"}>
                  {playable(selected) ? "Se puede jugar" : "No entra con este grupo"}
                </Chip>
                <Chip>{selected.type}</Chip>
                <Chip variant="purple">{selected.mode}</Chip>
              </div>

              <h1 translate="no" className="notranslate mt-4 text-3xl font-black leading-tight text-white lg:text-4xl">
                {selected.name}
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-300">{selected.vibe}</p>
            </section>

            <section className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
                <Users className="mx-auto h-4 w-4 text-emerald-300" />
                <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-slate-500">Jug.</p>
                <b>{selected.min}–{selected.max}</b>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
                <Clock className="mx-auto h-4 w-4 text-cyan-300" />
                <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-slate-500">Tiempo</p>
                <b>{timeText(selected)}</b>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
                <Trophy className="mx-auto h-4 w-4 text-violet-300" />
                <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-slate-500">Nivel</p>
                <b>{selected.level}</b>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-2">
              <a href={selected.videoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-3 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300">
                Video <ExternalLink size={15} />
              </a>
              <a href={selected.rulesUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-3 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300">
                Instructivo <ExternalLink size={15} />
              </a>
            </section>

            <section className="rounded-[1.5rem] border border-violet-400/25 bg-violet-400/10 p-4 shadow-lg shadow-violet-950/10">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200">Notas personales</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">Variantes, aclaraciones o recordatorios propios para este juego.</p>
                </div>
                {!isEditingNotes && (
                  <button
                    type="button"
                    onClick={() => openEditNotes(selected)}
                    className="rounded-2xl border border-violet-400/25 bg-slate-950/50 px-3 py-2 text-xs font-black text-violet-100 transition hover:border-violet-300/50"
                  >
                    Editar
                  </button>
                )}
              </div>

              {isEditingNotes ? (
                <div className="mt-3 space-y-3">
                  <TextAreaField
                    label="Nota"
                    value={noteText}
                    onChange={setNoteText}
                    placeholder="Ej: usar variante corta, recordar una regla casera, aclarar desempates..."
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingNotes(false)}
                      className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm font-black text-slate-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={saveNotes}
                      className="rounded-2xl bg-violet-400 px-3 py-3 text-sm font-black text-slate-950 transition hover:bg-violet-300"
                    >
                      Guardar nota
                    </button>
                  </div>
                </div>
              ) : selected.personalNotes ? (
                <p className="mt-3 whitespace-pre-line rounded-2xl border border-violet-400/20 bg-slate-950/45 p-3 text-sm leading-6 text-violet-50">
                  {selected.personalNotes}
                </p>
              ) : (
                <p className="mt-3 rounded-2xl border border-slate-700 bg-slate-950/45 p-3 text-sm leading-6 text-slate-500">
                  Todavía no cargaste notas personales para este juego.
                </p>
              )}
            </section>

            {selected.custom && (
              <button onClick={() => requestDeleteGame(selected)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-3 py-3 text-sm font-black text-white transition hover:bg-red-400">
                <Trash2 size={16} />
                Borrar juego agregado
              </button>
            )}

            <div className="rounded-[1.5rem] border border-amber-300/35 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
              <b>Nota:</b> esta guía sirve para arrancar rápido. Para desempates, variantes o casos especiales, revisá el reglamento de tu edición.
            </div>
          </aside>

          <section className="space-y-4">
            {isEditingGuide ? (
              <div className="rounded-[2rem] border border-emerald-400/25 bg-slate-950/75 p-4 shadow-2xl shadow-emerald-950/15 lg:p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Editor</p>
                    <h2 className="mt-1 text-2xl font-black text-white">Editar guía rápida</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Los cambios se guardan como guía personalizada. Si el juego era base, esta guía pisa la versión base para tu usuario/dispositivo.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingGuide(false)}
                    className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-black text-slate-200"
                  >
                    Cancelar
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  <Field
                    label="Resumen"
                    value={guideForm.vibe}
                    onChange={(value) => setGuideForm({ ...guideForm, vibe: value })}
                    placeholder="Resumen corto del juego"
                  />
                  <div className="grid gap-3 lg:grid-cols-2">
                    <Field
                      label="Link a video"
                      value={guideForm.videoUrl}
                      onChange={(value) => setGuideForm({ ...guideForm, videoUrl: value })}
                      placeholder="Opcional"
                    />
                    <Field
                      label="Link a instructivo/reglas"
                      value={guideForm.rulesUrl}
                      onChange={(value) => setGuideForm({ ...guideForm, rulesUrl: value })}
                      placeholder="Opcional"
                    />
                  </div>
                  <div className="grid gap-3 lg:grid-cols-2">
                    <TextAreaField
                      label="Preparación"
                      value={guideForm.setupText}
                      onChange={(value) => setGuideForm({ ...guideForm, setupText: value })}
                      placeholder={setupPlaceholder}
                    />
                    <TextAreaField
                      label="Cómo se juega"
                      value={guideForm.howToText}
                      onChange={(value) => setGuideForm({ ...guideForm, howToText: value })}
                      placeholder={howToPlaceholder}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={saveGuide}
                    className="flex w-full items-center justify-center gap-2 rounded-3xl bg-emerald-400 px-3 py-4 text-sm font-black text-slate-950 shadow-lg shadow-emerald-950/25 transition hover:bg-emerald-300"
                  >
                    <Save size={18} />
                    Guardar guía
                  </button>
                </div>
              </div>
            ) : (
              <>
                {playerSpecificSetup.length > 0 && (
                  <section className="rounded-[2rem] border border-emerald-400/20 bg-slate-950/65 p-4 shadow-xl shadow-emerald-950/10">
                    <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-white">
                      <Users className="text-emerald-300" />
                      Seteo para {players} jugadores
                    </h2>
                    <ol className="space-y-2">
                      {playerSpecificSetup.map((step, index) => (
                        <li key={index} className="flex gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-3 text-sm leading-5 text-emerald-50">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-slate-950">{index + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                <section className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/65 p-4 shadow-xl shadow-cyan-950/10">
                  <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-white">
                    <BookOpen className="text-cyan-300" />
                    Preparación del juego
                  </h2>
                  <ol className="space-y-2">
                    {setupSteps.map((step, index) => (
                      <li key={index} className="flex gap-3 rounded-2xl border border-cyan-400/25 bg-cyan-400/10 p-3 text-sm leading-5 text-cyan-50">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-xs font-black text-slate-950">{index + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="rounded-[2rem] border border-emerald-400/20 bg-slate-950/65 p-4 shadow-xl shadow-emerald-950/10">
                  <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-white">
                    <PlayCircle className="text-emerald-300" />
                    Cómo se juega
                  </h2>
                  <ol className="space-y-2">
                    {howToSteps.map((step, index) => (
                      <li key={index} className="flex gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-3 text-sm leading-5 text-emerald-50">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-slate-950">{index + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
