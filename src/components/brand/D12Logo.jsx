export function D12Logo({ compact = false }) {
  return (
    <div className={`flex items-center justify-center rounded-2xl border border-emerald-400/35 bg-emerald-400/10 shadow-lg transition-all ${compact ? "h-10 w-10" : "h-12 w-12"}`}>
      <svg viewBox="0 0 100 100" className={compact ? "h-7 w-7" : "h-9 w-9"} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 6 L84 20 L96 52 L74 88 L50 96 L26 88 L4 52 L16 20 Z" stroke="#34d399" strokeWidth="6" strokeLinejoin="round" fill="rgba(52, 211, 153, 0.10)" />
        <path d="M50 6 L50 30 M16 20 L36 42 M84 20 L64 42 M4 52 L32 58 M96 52 L68 58 M26 88 L40 66 M74 88 L60 66" stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
        <circle cx="50" cy="52" r="23" fill="rgba(15, 23, 42, 0.9)" stroke="#34d399" strokeWidth="4" />
        <text x="50" y="60" textAnchor="middle" fontSize="25" fontWeight="900" fill="#a7f3d0" fontFamily="Arial, sans-serif">12</text>
      </svg>
    </div>
  );
}

