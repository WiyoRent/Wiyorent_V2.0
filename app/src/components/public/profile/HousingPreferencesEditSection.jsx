import { Home, Calendar, MapPin, Wallet } from 'lucide-react';

const format_rwf = (n) => `RWF ${new Intl.NumberFormat('rw-RW').format(n)}`;

export default function HousingPreferencesEditSection({
  move_in_date,
  set_move_in_date,
  lease_duration,
  set_lease_duration,
  preferred_locations,
  set_preferred_locations,
  available_neighborhoods,
  budget_min,
  set_budget_min,
  budget_max,
  set_budget_max,
  is_furnished_preferred,
  set_is_furnished_preferred,
  is_private_room_required,
  set_is_private_room_required,
  max_housemates,
  set_max_housemates,
  allows_pets,
  set_allows_pets,
  is_smoker,
  set_is_smoker,
}) {
  const toggle_location = (loc) => {
    if (preferred_locations?.includes(loc)) {
      set_preferred_locations(prev => prev.filter((l) => l !== loc));
    } else {
      set_preferred_locations(prev => [...prev, loc]);
    }
  };

  console.log(lease_duration, '----lease duration')

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <Home size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Housing Preferences
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        {/* Row 1: Move-in Date + Lease Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
                <Calendar size={12} className="text-accent" />
                Move-in Date
              </span>
            </label>
            <br />
            <input
              min={new Date().toISOString().split('T')[0]}
              type="date"
              value={new Date(move_in_date).toISOString().split('T')[0] || ""}
              onChange={(e) => set_move_in_date(e.target.value)}
              className="input input-bordered rounded-field font-secondary text-sm"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                Lease Duration
              </span>
            </label>
            <br />
            <select
              value={lease_duration || ""}
              onChange={(e) => set_lease_duration(e.target.value)}
              className="select select-bordered rounded-field font-secondary text-sm"
            >
              <option value="less than 3 months">Less than 3 Months</option>
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
              <option value="12 months">12 Months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>

        {/* Preferred Locations - Chip selector */}
        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <MapPin size={12} className="text-accent" />
              Preferred Locations
            </span>
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {available_neighborhoods.map((loc) => {
              const is_selected = preferred_locations !== null ? preferred_locations?.includes(loc) : false

              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => toggle_location(loc)}
                  className={`px-3 py-1.5 rounded-field font-primary text-xs font-bold uppercase tracking-wide border transition-all duration-150 ${
                    is_selected
                      ? 'bg-accent text-accent-content border-accent shadow-sm'
                      : 'bg-base-200 text-base-content/50 border-transparent hover:border-accent/40'
                  }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>
          <p className="font-secondary text-xs text-base-content/40 mt-2">
            Select multiple neighborhoods you'd consider living in
          </p>
        </div>

        {/* Monthly Budget Slider */}
        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <Wallet size={12} className="text-accent" />
              Monthly Budget (per person)
            </span>
          </label>

          <div className="flex flex-col gap-3 mt-2">
            {/* Min slider */}
            <div>
              <span className="font-secondary text-xs text-base-content/40 mb-1.5 block">
                Min: {format_rwf(budget_min)}
              </span>
              <input
                type="range"
                min={100000}
                max={300000}
                step={5000}
                value={budget_min || ""}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v <= budget_max) set_budget_min(v);
                }}
                className="range range-accent range-sm"
              />
            </div>

            {/* Max slider */}
            <div>
              <span className="font-secondary text-xs text-base-content/40 mb-1.5 block">
                Max: {format_rwf(budget_max)}
              </span>
              <input
                type="range"
                min={50000}
                max={500000}
                step={5000}
                value={budget_max || ""}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v >= budget_min) set_budget_max(v);
                }}
                className="range range-accent range-sm"
              />
            </div>
          </div>
        </div>

        {/* Toggles Grid - 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Furnished */}
          <div className="flex items-center justify-between bg-base-200 rounded-field px-4 py-3">
            <span className="font-secondary text-sm text-base-content">Furnished</span>
            <input
              type="checkbox"
              checked={is_furnished_preferred || ""}
              onChange={(e) => set_is_furnished_preferred(e.target.checked)}
              className="toggle toggle-accent"
            />
          </div>

          {/* Private Room */}
          <div className="flex items-center justify-between bg-base-200 rounded-field px-4 py-3">
            <span className="font-secondary text-sm text-base-content">Private Room</span>
            <input
              type="checkbox"
              checked={is_private_room_required || ""}
              onChange={(e) => set_is_private_room_required(e.target.checked)}
              className="toggle toggle-accent"
            />
          </div>

          {/* Allows Pets */}
          <div className="flex items-center justify-between bg-base-200 rounded-field px-4 py-3">
            <span className="font-secondary text-sm text-base-content">Allows Pets</span>
            <input
              type="checkbox"
              checked={allows_pets || ""}
              onChange={(e) => set_allows_pets(e.target.checked)}
              className="toggle toggle-accent"
            />
          </div>

          {/* Smoker */}
          <div className="flex items-center justify-between bg-base-200 rounded-field px-4 py-3">
            <span className="font-secondary text-sm text-base-content">Smoker</span>
            <input
              type="checkbox"
              checked={is_smoker || ""}
              onChange={(e) => set_is_smoker(e.target.checked)}
              className="toggle toggle-accent"
            />
          </div>
        </div>

        {/* Number of Housemates */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Number of Housemates
            </span>
          </label>
          <br />
          <select
            value={max_housemates || ""}
            onChange={(e) => set_max_housemates(Number(e.target.value))}
            className="select select-bordered rounded-field font-secondary text-sm"
          >
            <option value={1}>1-2 housemates</option>
            <option value={2}>2-3 housemates</option>
            <option value={3}>3-4 housemates</option>
            <option value={4}>4+ housemates</option>
          </select>
        </div>
      </div>
    </div>
  );
}