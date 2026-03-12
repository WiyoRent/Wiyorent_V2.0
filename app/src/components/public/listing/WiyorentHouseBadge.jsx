'use client';

import { useState, useRef } from 'react';
import { Building2, Info } from 'lucide-react';

export default function WiyorentHouseBadge() {
  const [visible, set_visible] = useState(false);
  const [open_right, set_open_right] = useState(false);
  const ref = useRef(null);

  const handle_enter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      set_open_right(rect.left < 220);
    }
    set_visible(true);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handle_enter}
      onMouseLeave={() => set_visible(false)}
    >
      <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent border border-accent/20 px-2.5 py-1 rounded-field text-xs font-primary font-bold uppercase tracking-wide cursor-default">
        WiyoRent House
        <Info size={11} className="text-accent" />
      </span>

      {visible && (
        <div
          className={`absolute z-[9999] w-max max-w-52 bg-base-content text-base-100 text-xs font-secondary rounded-field px-3 py-2 leading-snug shadow-lg pointer-events-none whitespace-normal ${
            open_right
              ? 'left-full top-1/2 -translate-y-1/2 ml-2'
              : 'top-full left-1/2 -translate-x-1/2 mt-2'
          }`}
        >
          Owned &amp; managed by WiyoRent · No agency fee charged
        </div>
      )}
    </div>
  );
}
