export default function PrefRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-base-200 last:border-0">
      <div className="w-8 h-8 bg-base-200 rounded-field flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={15} className="text-accent" />
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <span className="font-secondary text-xs text-base-content/40 uppercase tracking-wide leading-none">
          {label}
        </span>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  );
}
