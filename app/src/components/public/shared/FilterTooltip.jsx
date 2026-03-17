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
    <span ref={ref} className="relative inline-flex items-center ml-1">
      <button
        type="button"
        onMouseEnter={() => set_visible(true)}
        onMouseLeave={() => set_visible(false)}
        onClick={() => set_visible(v => !v)}
        className="text-base-content/25 hover:text-accent transition-colors"
        aria-label="More info"
      >
        <Info size={11} />
      </button>
      {visible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-base-content text-base-100 text-[11px] font-secondary rounded-box px-3 py-2 shadow-xl z-50 leading-relaxed pointer-events-none">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-base-content" />
        </span>
      )}
    </span>
  );
}
