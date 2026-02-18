import { BedDouble, Bath, Users, Home, Sofa } from 'lucide-react';

const PROPERTY_TYPES = [
  { value: 'room', label: 'Room' },
  { value: 'studio', label: 'Studio' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
];

export default function SpecificationsSection({ specifications, set_specifications }) {
  const handle_change = (field, value) => {
    set_specifications({ ...specifications, [field]: value });
  };

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <Home size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Specifications
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Property Type */}
        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <Home size={12} className="text-accent" />
              Property Type
            </span>
          </label>
          <select
            className="select select-bordered rounded-field font-secondary text-sm w-full"
            value={specifications.property_type}
            onChange={(e) => handle_change('property_type', e.target.value)}
          >
            {PROPERTY_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <BedDouble size={12} className="text-accent" />
              Bedrooms
            </span>
          </label>
          <input
            type="number"
            min="0"
            className="input input-bordered rounded-field font-secondary text-sm w-full"
            value={specifications.bedroom_number}
            onChange={(e) => handle_change('bedroom_number', Number(e.target.value))}
          />
        </div>

        {/* Bathrooms */}
        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <Bath size={12} className="text-accent" />
              Bathrooms
            </span>
          </label>
          <input
            type="number"
            min="0"
            className="input input-bordered rounded-field font-secondary text-sm w-full"
            value={specifications.bathroom_number}
            onChange={(e) => handle_change('bathroom_number', Number(e.target.value))}
          />
        </div>

        {/* Max Roommates */}
        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <Users size={12} className="text-accent" />
              Max Roommates
            </span>
          </label>
          <input
            type="number"
            min="1"
            className="input input-bordered rounded-field font-secondary text-sm w-full"
            value={specifications.max_roommates}
            onChange={(e) => handle_change('max_roommates', Number(e.target.value))}
          />
        </div>

        {/* Is Furnished */}
        <div className="flex items-center justify-between p-3 bg-base-200 rounded-field sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Sofa size={14} className="text-accent" />
            <span className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content/70">
              Furnished
            </span>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-accent"
            checked={specifications.is_furnished}
            onChange={(e) => handle_change('is_furnished', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}