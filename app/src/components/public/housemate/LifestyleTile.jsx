export default function LifestyleTile({ icon: Icon, label, value }) {
  return (
    <div className="bg-base-200 rounded-field p-3 flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-accent flex-shrink-0" />
        <span className="font-primary text-xs font-extrabold text-base-content/50 uppercase tracking-widest leading-none">
          {label}
        </span>
      </div>
      <span className="font-secondary text-sm font-semibold text-base-content leading-snug">
        {value}
      </span>
    </div>
  );
}
