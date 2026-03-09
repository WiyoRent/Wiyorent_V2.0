import { DollarSign, CalendarDays } from 'lucide-react';

const format_rwf = (n) => `RWF ${new Intl.NumberFormat('rw-RW').format(n)}`;

export default function FinancialsSpecsSection({
  price_per_month,
  set_price_per_month,
  commission_fee,
  set_commission_fee,
  caution_fee,
  set_caution_fee,
  upfront_months,
  set_upfront_months,
  bedroom_number,
  set_bedroom_number,
  bathroom_number,
  set_bathroom_number,
  max_roommates,
  set_max_roommates,
  property_type,
  set_property_type,
  is_furnished,
  set_is_furnished,
}) {
  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <DollarSign size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Financials &amp; Specifications
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        {/* Financials Grid */}
        <div>
          <h3 className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content/50 mb-3">
            Pricing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Monthly Rent
                </span>
              </label>
              <input
                type="number"
                value={price_per_month}
                onChange={(e) => set_price_per_month(Number(e.target.value))}
                placeholder="300000"
                className="input input-bordered rounded-field font-secondary text-sm"
                required
              />
              <label className="label">
                <span className="label-text-alt font-secondary text-xs text-base-content/40">
                  {format_rwf(price_per_month)}
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Commission Fee
                </span>
              </label>
              <input
                type="number"
                value={commission_fee}
                onChange={(e) => set_commission_fee(Number(e.target.value))}
                placeholder="30000"
                className="input input-bordered rounded-field font-secondary text-sm"
              />
              <label className="label">
                <span className="label-text-alt font-secondary text-xs text-base-content/40">
                  {format_rwf(commission_fee)}
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Caution/Deposit
                </span>
              </label>
              <input
                type="number"
                value={caution_fee}
                onChange={(e) => set_caution_fee(Number(e.target.value))}
                placeholder="300000"
                className="input input-bordered rounded-field font-secondary text-sm"
              />
              <label className="label">
                <span className="label-text-alt font-secondary text-xs text-base-content/40">
                  {format_rwf(caution_fee)}
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
                  <CalendarDays size={12} className="text-accent" />
                  Upfront Months
                </span>
              </label>
              <input
                type="number"
                value={upfront_months}
                onChange={(e) => set_upfront_months(Number(e.target.value))}
                min="1"
                placeholder="e.g., 1"
                className="input input-bordered rounded-field font-secondary text-sm"
              />
              <label className="label">
                <span className="label-text-alt font-secondary text-xs text-base-content/40">
                  Min. months tenant must pay upfront
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="border-t border-base-200" />

        {/* Specifications Grid */}
        <div>
          <h3 className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content/50 mb-3">
            Property Details
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Bedrooms
                </span>
              </label>
              <input
                type="number"
                value={bedroom_number}
                onChange={(e) => set_bedroom_number(Number(e.target.value))}
                min="0"
                className="input input-bordered rounded-field font-secondary text-sm"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Bathrooms
                </span>
              </label>
              <input
                type="number"
                value={bathroom_number}
                onChange={(e) => set_bathroom_number(Number(e.target.value))}
                min="0"
                className="input input-bordered rounded-field font-secondary text-sm"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Max Roommates
                </span>
              </label>
              <input
                type="number"
                value={max_roommates}
                onChange={(e) => set_max_roommates(Number(e.target.value))}
                min="1"
                className="input input-bordered rounded-field font-secondary text-sm"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Property Type
                </span>
              </label>
              <select
                value={property_type}
                onChange={(e) => set_property_type(e.target.value)}
                className="select select-bordered rounded-field font-secondary text-sm"
              >
                <option value="room">Room</option>
                <option value="studio">Studio</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Furnished
                </span>
              </label>
              <div className="flex items-center h-12 bg-base-200 rounded-field px-4">
                <input
                  type="checkbox"
                  checked={is_furnished}
                  onChange={(e) => set_is_furnished(e.target.checked)}
                  className="toggle toggle-accent toggle-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}