export default function ProfileRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-base-200 last:border-0">
      <div className="w-8 h-8 bg-base-200 rounded-field flex items-center justify-center flex-shrink-0">
        <Icon size={15} className="text-accent" />
      </div>
      <div className="flex flex-col">
        <span className="font-secondary text-xs text-base-content/40 uppercase tracking-wide leading-none">
          {label}
        </span>
        <span className="font-secondary text-sm font-semibold text-base-content mt-0.5 leading-snug">
          {value}
        </span>
      </div>
    </div>
  );
}
