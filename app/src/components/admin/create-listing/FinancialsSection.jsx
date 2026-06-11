import { Banknote, Percent, ShieldAlert, CalendarDays } from 'lucide-react';
import { formatRWF } from '@/lib/formatRWF';

// Field config drives both the input and its hint text below. `is_rwf` fields
// show a live formatted RWF preview once a value is entered, otherwise the hint.
const FIELDS = [
  {
    key: 'price_per_month',
    label: 'Price / Month (RWF)',
    icon: Banknote,
    placeholder: 'e.g., 300000',
    hint: 'Monthly rent in Rwandan Francs',
    min: 0,
    is_rwf: true,
  },
  {
    key: 'commission_fee',
    label: 'Commission Fee (RWF)',
    icon: Percent,
    placeholder: 'e.g., 30000',
    hint: 'Typically 10% of one month rent',
    min: 0,
    is_rwf: true,
  },
  {
    key: 'caution_fee',
    label: 'Caution Fee (RWF)',
    icon: ShieldAlert,
    placeholder: 'e.g., 300000',
    hint: 'Refundable deposit (default = 1 month rent)',
    min: 0,
    is_rwf: true,
  },
  {
    key: 'upfront_months',
    label: 'Upfront Months',
    icon: CalendarDays,
    placeholder: 'e.g., 1',
    hint: 'Min. months tenant must pay upfront',
    min: 1,
  },
];

// `financials` shape: { price_per_month, commission_fee, caution_fee, upfront_months }
export default function FinancialsSection({ financials, set_financials }) {
  // Merges a single field update into the financials object, keeping the rest intact
  const handle_change = (field, value) => {
    set_financials({ ...financials, [field]: value });
  };

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <Banknote size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Financials
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        {FIELDS.map(({ key, label, icon: Icon, placeholder, hint, min, is_rwf }) => (
          <div key={key}>
            <label className="label">
              <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
                <Icon size={12} className="text-accent" />
                {label}
              </span>
            </label>
            <input
              type="number"
              min={min}
              className="input input-bordered rounded-field font-secondary text-sm w-full"
              placeholder={placeholder}
              value={financials[key]}
              onChange={(e) => handle_change(key, e.target.value === '' ? '' : Number(e.target.value))}
              required
            />
            {/* Once a positive RWF amount is entered, swap the static hint for a formatted preview */}
            {is_rwf && financials[key] > 0 ? (
              <p className="font-secondary text-xs text-base-content/40 mt-1">
                {formatRWF(financials[key])}
              </p>
            ) : (
              <p className="font-secondary text-xs text-base-content/40 mt-1">{hint}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}