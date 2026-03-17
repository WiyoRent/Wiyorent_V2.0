'use client';

import { useState, useEffect, useRef } from 'react';
import { Info } from 'lucide-react';

export default function FilterTooltip({ text }) {
  const [visible, set_visible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) set_visible(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <span ref={ref} className="relative inline-flex items-center">
      <button
        type="button"
        onMouseEnter={() => set_visible(true)}
        onMouseLeave={() => set_visible(false)}
        onClick={() => set_visible(v => !v)}
        className="text-base-content/25 hover:text-accent transition-colors duration-150"
        aria-label="More info"
      >
        <Info size={11} />
      </button>
      {visible && (
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-secondary text-white/80 text-[11px] font-secondary rounded-xl px-3 py-2.5 shadow-2xl z-[999] leading-relaxed pointer-events-none">
          {/* Arrow pointing up toward the trigger */}
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-secondary" />
          {text}
        </span>
      )}
    </span>
  );
}
