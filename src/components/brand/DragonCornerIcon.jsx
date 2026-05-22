export function DragonCornerIcon({ compact = false }) {
  return (
    <div className={`flex items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 shadow-lg transition-all ${compact ? "h-10 w-10" : "h-12 w-12"}`}>
      <svg viewBox="0 0 120 120" className={compact ? "h-7 w-7" : "h-9 w-9"} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 42 C76 20 98 17 108 30 C95 31 88 39 84 49 C96 48 105 54 110 66 C92 64 78 58 66 48" fill="rgba(103,232,249,.18)" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 80 C40 58 52 48 69 43 C61 54 63 66 76 76 C61 77 48 74 36 88" fill="rgba(52,211,153,.16)" stroke="#34d399" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M62 39 C66 27 78 22 90 27 C84 31 82 36 85 42 C75 39 69 40 62 47" fill="rgba(52,211,153,.18)" stroke="#34d399" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M83 27 L93 16 L90 31" stroke="#a7f3d0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36 86 C25 96 17 92 13 84 C23 87 29 82 34 74" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="77" cy="34" r="2.7" fill="#a7f3d0" />
      </svg>
    </div>
  );
}

