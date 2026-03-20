import { ToggleLeft, ShieldCheck, CalendarDays, Activity, Building2, Info } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'available', label: 'Available' },
  { value: 'booked', label: 'Booked' },
  { value: 'maintenance', label: 'Maintenance' },
];

export default function StatusSection({
  is_active,
  set_is_active,
  is_verified,
  set_is_verified,
  is_a_wiyorent_house,
  set_is_a_wiyorent_house,
  available_status,
  set_available_status,
  available_from,
  set_available_from,
}) {
  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <Activity size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Status &amp; Visibility
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* is_active toggle */}
        <div className="flex items-center justify-between p-3 bg-base-200 rounded-field">
          <div className="flex items-center gap-2">
            <ToggleLeft size={14} className="text-accent" />
            <span className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content/70">
              Active Listing
            </span>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-accent"
            checked={is_active}
            onChange={(e) => set_is_active(e.target.checked)}
          />
        </div>

        {/* is_verified toggle */}
        <div className="flex items-center justify-between p-3 bg-base-200 rounded-field">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-accent" />
            <span className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content/70">
              Verified
            </span>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-accent"
            checked={is_verified}
            onChange={(e) => set_is_verified(e.target.checked)}
          />
        </div>

        {/* is_a_wiyorent_house toggle */}
        <div className="flex items-center justify-between p-3 bg-base-200 rounded-field">
          <div className="flex items-center gap-2">
            <span className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content/70">
              WiyoRent House
            </span>
            <div className="tooltip tooltip-right" data-tip="When enabled, tenants will see the service fee as waived on this listing.">
              <Info size={12} className="text-base-content/30 hover:text-base-content/60 transition-colors cursor-default" />
            </div>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-accent"
            checked={is_a_wiyorent_house}
            onChange={(e) => set_is_a_wiyorent_house(e.target.checked)}
          />
        </div>

        {/* available_status */}
        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Availability Status
            </span>
          </label>
          <select
            className="select select-bordered rounded-field font-secondary text-sm w-full"
            value={available_status}
            onChange={(e) => set_available_status(e.target.value)}
            required
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* available_from */}
        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <CalendarDays size={12} className="text-accent" />
              Available From
            </span>
          </label>
          <input
            min={new Date().toISOString().split('T')[0]}
            type="date"
            className="input input-bordered rounded-field font-secondary text-sm w-full"
            value={available_from}
            onChange={(e) => set_available_from(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
}