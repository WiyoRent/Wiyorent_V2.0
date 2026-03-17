export default function TileSelector({ label, options, value, on_change, icon: Icon }) {
  return (
    <div>
      <label className="label">
        <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
          {label}
        </span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
        {options.map((opt) => {
          const is_selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => on_change(opt.value)}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-field border-2 transition-all duration-200 ${
                is_selected
                  ? 'bg-accent/10 border-accent text-accent-content'
                  : 'bg-base-200 border-transparent text-base-content/50 hover:border-accent/30'
              }`}
            >
              {opt.icon && <opt.icon size={20} className={is_selected ? 'text-accent' : 'text-base-content/40'} />}
              <span className={`font-primary text-xs font-bold uppercase tracking-wide ${is_selected ? 'text-accent' : ''}`}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
