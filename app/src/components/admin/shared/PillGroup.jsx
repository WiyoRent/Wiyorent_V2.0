export default function PillGroup({ options, value, onChange }) {
  return (
    <div className="flex items-center flex-wrap gap-1">
      {options.map(({ label, value: v }) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`px-2.5 py-1 text-[10px] font-primary font-bold uppercase tracking-wider rounded-full transition-all duration-150 whitespace-nowrap border ${
            value === v
              ? 'bg-accent border-accent text-accent-content shadow-sm'
              : 'bg-transparent border-base-300 text-base-content/50 hover:border-base-content/30 hover:text-base-content/80'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
