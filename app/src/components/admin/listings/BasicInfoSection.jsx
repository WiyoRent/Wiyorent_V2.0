import { FileText } from 'lucide-react';

export default function BasicInfoSection({
  title,
  set_title,
  description,
  set_description,
  neighborhood,
  set_neighborhood,
  city,
  set_city,
  country,
  set_country,
}) {
  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <FileText size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Basic Information
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Property Title
            </span>
          </label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => set_title(e.target.value)}
            placeholder="e.g., Luxury Apartment in Remera"
            className="w-full input input-bordered rounded-field font-secondary text-sm"
            required
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Description
            </span>
          </label>
          <br />
          <textarea
            value={description}
            onChange={(e) => set_description(e.target.value)}
            rows={5}
            placeholder="Describe the property..."
            className="w-full textarea textarea-bordered rounded-field font-secondary text-sm resize-y"
            required
          />
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                Neighborhood
              </span>
            </label>
            <input
              type="text"
              value={neighborhood}
              onChange={(e) => set_neighborhood(e.target.value)}
              placeholder="Remera"
              className="input input-bordered rounded-field font-secondary text-sm"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                City
              </span>
            </label>
            <br />
            <input
              type="text"
              value={city}
              onChange={(e) => set_city(e.target.value)}
              placeholder="Kigali"
              className="input input-bordered rounded-field font-secondary text-sm"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                Country
              </span>
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => set_country(e.target.value)}
              placeholder="Rwanda"
              className="input input-bordered rounded-field font-secondary text-sm"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}