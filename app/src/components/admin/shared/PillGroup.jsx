export default function PillGroup({ options, value, onChange }) {
  return (
    <div className="flex items-center overflow-x-auto">
      {options.map(({ label, value: v }) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`px-3 py-1.5 text-[10px] font-primary font-bold uppercase tracking-wider transition-all border-y border-r first:border-l first:rounded-l-sm last:rounded-r-sm whitespace-nowrap ${
            value === v
              ? 'bg-accent border-accent text-accent-content z-10 relative'
              : 'bg-base-100 border-base-300 text-base-content/50 hover:border-base-content/30 hover:text-base-content/80'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
