'use client';

import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const format_price = (value) =>
  `RWF ${new Intl.NumberFormat('rw-RW').format(value)}`;

export default function FilterSidebar({ filter_options }) {
  const { price_range, neighborhoods, furnishing_options, availability_options } =
    filter_options;

  const [price_min, set_price_min] = useState(price_range.min);
  const [price_max, set_price_max] = useState(price_range.max);
  const [selected_neighborhood, set_selected_neighborhood] = useState('');
  const [selected_furnishing, set_selected_furnishing] = useState('');
  const [selected_availability, set_selected_availability] = useState('');
  const [is_mobile_open, set_is_mobile_open] = useState(false);

  const has_active_filters =
    price_min !== price_range.min ||
    price_max !== price_range.max ||
    selected_neighborhood !== '' ||
    selected_furnishing !== '' ||
    selected_availability !== '';

  const handle_reset = () => {
    set_price_min(price_range.min);
    set_price_max(price_range.max);
    set_selected_neighborhood('');
    set_selected_furnishing('');
    set_selected_availability('');
  };

  const handle_apply = () => {
    console.log('Applying filters:', {
      price_min,
      price_max,
      neighborhood: selected_neighborhood,
      furnishing: selected_furnishing,
      availability: selected_availability,
    });
    set_is_mobile_open(false);
  };

  const filter_content = (
    <div className="flex flex-col gap-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Changed text-primary to text-accent for that Wiyorent Yellow */}
          <SlidersHorizontal size={18} className="text-accent" />
          <h2 className="font-primary text-lg font-extrabold text-base-content uppercase tracking-wide">
            Filter By
          </h2>
        </div>
        {has_active_filters && (
          <button
            onClick={handle_reset}
            className="flex items-center gap-1 text-xs font-secondary text-base-content/50 hover:text-error transition-colors"
          >
            <X size={12} />
            Reset
          </button>
        )}
      </div>

      <div className="border-t border-base-300" />

      {/* Price Range */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
          Price Range (RWF)
        </label>

        <div className="flex flex-col gap-1">
          <span className="font-secondary text-xs text-base-content/50">Minimum</span>
          <input
            type="range"
            min={price_range.min}
            max={price_range.max}
            step={5000}
            value={price_min}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val <= price_max) set_price_min(val);
            }}
            // Changed range-primary to range-accent
            className="range range-accent range-xs"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-secondary text-xs text-base-content/50">Maximum</span>
          <input
            type="range"
            min={price_range.min}
            max={price_range.max}
            step={5000}
            value={price_max}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= price_min) set_price_max(val);
            }}
            // Changed range-primary to range-accent
            className="range range-accent range-xs"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="font-secondary text-xs font-bold text-accent-content bg-accent px-3 py-1 rounded-field shadow-sm">
            {format_price(price_min)}
          </span>
          <span className="text-base-content/30 text-xs">—</span>
          <span className="font-secondary text-xs font-bold text-accent-content bg-accent px-3 py-1 rounded-field shadow-sm">
            {format_price(price_max)}
          </span>
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* Location */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
          Location
        </label>
        <div className="relative">
          <select
            value={selected_neighborhood}
            onChange={(e) => set_selected_neighborhood(e.target.value)}
            // Added focus:border-accent
            className="select select-bordered w-full rounded-field font-secondary text-sm appearance-none pr-8 bg-base-100 focus:border-accent"
          >
            <option value="">Select a neighborhood</option>
            {neighborhoods.map((neighborhood) => (
              <option key={neighborhood} value={neighborhood}>
                {neighborhood}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none"
          />
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* Furnishing */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
          Furnishing
        </label>
        <div className="flex flex-col gap-2">
          {furnishing_options.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="furnishing"
                value={option}
                checked={selected_furnishing === option}
                onChange={(e) => set_selected_furnishing(e.target.value)}
                // Changed radio-primary to radio-accent
                className="radio radio-accent radio-sm"
              />
              <span className="font-secondary text-sm text-base-content capitalize group-hover:text-accent font-medium transition-colors">
                {option === 'furnished' ? 'Furnished' : 'Unfurnished'}
              </span>
            </label>
          ))}
          {selected_furnishing && (
            <button
              onClick={() => set_selected_furnishing('')}
              className="text-xs font-secondary text-base-content/40 hover:text-error text-left mt-1"
            >
              Clear selection
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* Availability */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
          Availability
        </label>
        <div className="flex flex-col gap-2">
          {availability_options.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="availability"
                value={option}
                checked={selected_availability === option}
                onChange={(e) => set_selected_availability(e.target.value)}
                // Changed radio-primary to radio-accent
                className="radio radio-accent radio-sm"
              />
              <span className="font-secondary text-sm text-base-content capitalize group-hover:text-accent font-medium transition-colors">
                {option === 'available' ? 'Available' : 'Booked'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handle_apply}
        // Using btn-accent for the main CTA
        className="btn btn-accent w-full rounded-field font-primary font-extrabold text-sm uppercase tracking-wider mt-2 shadow-lg hover:shadow-accent/20 transition-all active:scale-95"
      >
        Apply Filters
      </button>
    </div>
  );

  return (
    <>
      <div className="lg:hidden mb-4">
        <button
          onClick={() => set_is_mobile_open(true)}
          // Changed trigger to outline-accent
          className="btn btn-outline btn-accent w-full rounded-field font-primary font-bold text-sm uppercase tracking-wide gap-2 bg-base-100"
        >
          <SlidersHorizontal size={16} />
          Filters
          {has_active_filters && (
            <span className="badge badge-accent badge-sm font-bold">!</span>
          )}
        </button>
      </div>

      {is_mobile_open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-base-content/40 backdrop-blur-sm"
            onClick={() => set_is_mobile_open(false)}
          />
          <div className="relative ml-auto w-80 max-w-full h-full bg-base-100 shadow-2xl overflow-y-auto p-6 border-l-4 border-accent">
            <button
              onClick={() => set_is_mobile_open(false)}
              className="absolute top-4 right-4 btn btn-ghost btn-sm btn-circle"
            >
              <X size={18} />
            </button>
            {filter_content}
          </div>
        </div>
      )}

      <div className="hidden lg:block sticky top-6">
        {/* Added a subtle top border in accent color for a premium feel */}
        <div className="bg-base-100 rounded-box shadow-md p-6 border-t-4 border-accent">
          {filter_content}
        </div>
      </div>
    </>
  );
}