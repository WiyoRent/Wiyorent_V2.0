import { Tag, AlignLeft } from 'lucide-react';

export default function BasicInfoSection({ title, set_title, description, set_description }) {
  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <Tag size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Basic Info
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        {/* Title */}
        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <Tag size={12} className="text-accent" />
              Listing Title
            </span>
          </label>
          <input
            type="text"
            className="input input-bordered rounded-field font-secondary text-sm w-full"
            placeholder="e.g., Luxury Apartment in Remera"
            value={title}
            onChange={(e) => set_title(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <AlignLeft size={12} className="text-accent" />
              Description
            </span>
          </label>
          <textarea
            className="textarea textarea-bordered rounded-field font-secondary text-sm w-full min-h-[120px] resize-y"
            placeholder="Describe the property — its highlights, surroundings, and what makes it special..."
            value={description}
            onChange={(e) => set_description(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}