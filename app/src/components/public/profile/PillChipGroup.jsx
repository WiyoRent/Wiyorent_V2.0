'use client';

export default function PillChipGroup({ options, value, onChange }) {
  return (
    <div className="flex items-center gap-1.5 flex-shrink-0">
      {options.map(({ label, val }) => (
        <button
          key={label}
          type="button"
          onClick={() => onChange(val)}
          className={`px-3 py-1.5 rounded-field font-primary text-xs font-bold uppercase tracking-wide border transition-all duration-150 ${
            value === val
              ? 'bg-accent text-accent-content border-accent shadow-sm'
              : 'bg-base-100 text-base-content/50 border-base-300 hover:border-accent/40'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
