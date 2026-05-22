import { Trash2 } from "lucide-react";

export function DeleteConfirmModal({ game, onCancel, onConfirm }) {
  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] border border-red-400/30 bg-slate-950 p-5 text-slate-100 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-red-200">
            <Trash2 size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Borrar juego</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Vas a borrar <b translate="no" className="notranslate">{game.name}</b> de tu listado. Esta acción también lo quita de favoritos.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            onClick={onCancel}
            className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm font-black text-slate-200"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="rounded-2xl bg-red-500 px-3 py-3 text-sm font-black text-white"
          >
            Sí, borrar
          </button>
        </div>
      </div>
    </div>
  );
}

