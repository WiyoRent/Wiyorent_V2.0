import { MapPin } from 'lucide-react';

export default function LocationSection({ location, set_location }) {
  const handle_change = (field, value) => {
    set_location({ ...location, [field]: value });
  };

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <MapPin size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Location
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Neighborhood
            </span>
          </label>
          <input
            type="text"
            className="input input-bordered rounded-field font-secondary text-sm w-full"
            placeholder="e.g., Remera"
            value={location.neighborhood}
            onChange={(e) => handle_change('neighborhood', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              City
            </span>
          </label>
          <input
            type="text"
            className="input input-bordered rounded-field font-secondary text-sm w-full"
            placeholder="e.g., Kigali"
            value={location.city}
            onChange={(e) => handle_change('city', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Country
            </span>
          </label>
          <input
            type="text"
            className="input input-bordered rounded-field font-secondary text-sm w-full"
            placeholder="e.g., Rwanda"
            value={location.country}
            onChange={(e) => handle_change('country', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
}