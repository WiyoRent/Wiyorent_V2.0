'use client';

export default function AmenitiesSection({ amenities }) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <section className="bg-base-100 rounded-box p-6 shadow-sm border border-base-200">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="w-1.5 h-6 bg-accent rounded-full inline-block" />
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Amenities
        </h2>
      </div>

      {/* Raw Tag Display */}
      <div className="flex flex-wrap gap-2">
        {amenities.map((amenity, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-base-200 text-base-content font-secondary text-xs font-bold tracking-wide rounded-field border border-base-300 transition-all hover:bg-accent hover:text-accent-content hover:border-accent cursor-default"
          >
            {amenity}
          </span>
        ))}
      </div>
    </section>
  );
}