export function LabeledSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-12 w-full rounded-2xl border border-cyan-400/25 bg-slate-900 px-3 text-sm font-bold text-slate-100 outline-none focus:ring-2 focus:ring-emerald-300">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function Field({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-slate-300">{label}</span>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-emerald-300" />
    </label>
  );
}

export function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-slate-300">{label}</span>
      <textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="min-h-[110px] w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-emerald-300" />
    </label>
  );
}

