export function Chip({ children, variant = "default" }) {
  const styles = {
    default: "bg-slate-800 text-slate-200 border border-slate-700",
    ok: "bg-emerald-400/15 text-emerald-200 border border-emerald-400/40",
    purple: "bg-violet-400/15 text-violet-100 border border-violet-400/40",
    danger: "bg-red-400/15 text-red-200 border border-red-400/40"
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${styles[variant]}`}>
      {children}
    </span>
  );
}

