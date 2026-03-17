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
          <span className="font-primary text-[13px] font-bold uppercase tracking-widest text-base-content/70 group-hover:text-base-content transition-colors duration-150">
            {title}
          </span>
          {active_count > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-accent-content text-[10px] font-extrabold font-primary">
              {active_count}
            </span>
          )}
        </div>
        <ChevronDown
          size={14}
          className={`flex-shrink-0 text-base-content/25 transition-all duration-200 group-hover:text-accent ${
            is_open ? 'rotate-0' : '-rotate-90'
          }`}
        />
      </button>

      {/* Animated collapse using CSS grid-rows trick — no JS height measurement needed */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-in-out ${
          is_open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 pb-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
