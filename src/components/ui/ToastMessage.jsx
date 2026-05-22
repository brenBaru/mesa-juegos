export function ToastMessage({ toast }) {
  if (!toast) return null;

  return (
    <div className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-emerald-400/35 bg-slate-950/95 px-4 py-3 text-sm font-bold text-emerald-100 shadow-2xl backdrop-blur-xl">
      {toast.message}
    </div>
  );
}

