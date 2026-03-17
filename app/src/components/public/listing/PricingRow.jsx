import { formatRWF } from '@/lib/formatRWF';

export default function PricingRow({ label, sublabel, amount, highlight = false, size = 'normal' }) {
  return (
    <div className={`flex items-start justify-between gap-3 ${size === 'large' ? 'py-1' : ''}`}>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span
          className={`font-secondary leading-snug ${
            highlight
              ? 'text-sm font-bold text-base-content'
              : 'text-sm text-base-content/70'
          }`}
        >
          {label}
        </span>
        {sublabel && (
          <span className="font-secondary text-xs text-base-content/40 leading-snug">
            {sublabel}
          </span>
        )}
      </div>
      <span
        className={`font-primary font-extrabold flex-shrink-0 ${
          highlight
            ? 'text-base text-primary'
            : 'text-sm text-base-content/80'
        }`}
      >
        {formatRWF(amount)}
      </span>
    </div>
  );
}
