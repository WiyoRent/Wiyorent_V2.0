'use client';

import { ChevronDown } from 'lucide-react';

export default function FilterSection({ title, is_open, on_toggle, active_count, children }) {
  return (
    <div>
      <button
        type="button"
        onClick={on_toggle}
        className="flex items-center justify-between w-full py-3 group"
      >
        <div className="flex items-center gap-2">
          <span className="font-primary text-[14px] font-bold  uppercase tracking-widest">
            {title}
          </span>
          {/* Numbered badge instead of dot */}
          {active_count > 0 && (
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full bg-accent/15 text-accent text-[10px] font-bold font-secondary">
              {active_count}
            </span>
          )}
        </div>
        <ChevronDown
          size={13}
          className={`text-base-content/30 transition-transform duration-200 group-hover:text-base-content/60 ${
            is_open ? '' : '-rotate-90'
          }`}
        />
      </button>
      {is_open && (
        <div className="flex flex-col gap-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}
