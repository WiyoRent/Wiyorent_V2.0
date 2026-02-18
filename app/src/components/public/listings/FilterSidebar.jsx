'use client';

import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown, Bed, Users } from 'lucide-react';

const format_price = (value) =>
  `RWF ${new Intl.NumberFormat('rw-RW').format(value)}`;

export default function FilterSidebar({ filter_options }) {
  const { price_range, neighborhoods, furnishing_options, availability_options } =
    filter_options;

  // Existing State
  const [price_min, set_price_min] = useState(price_range.min);
  const [price_max, set_price_max] = useState(price_range.max);
  const [selected_neighborhood, set_selected_neighborhood] = useState('');
  const [selected_furnishing, set_selected_furnishing] = useState('');
  const [selected_availability, set_selected_availability] = useState('');
  
  // New State for Bedrooms and Roommates
  const [bedrooms, set_bedrooms] = useState(null); // null, 1, 2, 3, 4+
  const [max_roommates, set_max_roommates] = useState(null); // null, 1, 2, 3, 4+

  const [is_mobile_open, set_is_mobile_open] = useState(false);

  const has_active_filters =
    price_min !== price_range.min ||
    price_max !== price_range.max ||
    selected_neighborhood !== '' ||
    selected_furnishing !== '' ||
    selected_availability !== '' ||
    bedrooms !== null ||
    max_roommates !== null;

  const handle_reset = () => {
    set_price_min(price_range.min);
    set_price_max(price_range.max);
    set_selected_neighborhood('');
    set_selected_furnishing('');
    set_selected_availability('');
    set_bedrooms(null);
    set_max_roommates(null);
  };

  const handle_apply = () => {
    console.log('Applying filters:', {
      price_min,
      price_max,
      neighborhood: selected_neighborhood,
      furnishing: selected_furnishing,
      availability: selected_availability,
      bedrooms,
      max_roommates,
    });
    set_is_mobile_open(false);
  };

  const filter_content = (
    <div className="flex flex-col gap-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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
            className="range range-accent range-xs"
          />
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
            className="range range-accent range-xs mt-2"
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="font-secondary text-[10px] font-bold text-accent-content bg-accent px-2 py-1 rounded shadow-sm">
            {format_price(price_min)}
          </span>
          <span className="font-secondary text-[10px] font-bold text-accent-content bg-accent px-2 py-1 rounded shadow-sm">
            {format_price(price_max)}
          </span>
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* Bedrooms - Pill Selector */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide flex items-center gap-2">
          <Bed size={14} className="text-accent" /> Bedrooms
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, '4+'].map((num) => (
            <button
              key={num}
              onClick={() => set_bedrooms(num === bedrooms ? null : num)}
              className={`flex-1 py-2 rounded-field font-secondary text-xs font-bold transition-all border ${
                bedrooms === num 
                ? 'bg-accent border-accent text-accent-content shadow-md' 
                : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent hover:text-accent'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* Max Roommates - Pill Selector */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide flex items-center gap-2">
          <Users size={14} className="text-accent" /> Max Roommates
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, '4+'].map((num) => (
            <button
              key={num}
              onClick={() => set_max_roommates(num === max_roommates ? null : num)}
              className={`flex-1 py-2 rounded-field font-secondary text-xs font-bold transition-all border ${
                max_roommates === num 
                ? 'bg-accent border-accent text-accent-content shadow-md' 
                : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent hover:text-accent'
              }`}
            >
              {num}
            </button>
          ))}
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
                className="radio radio-accent radio-sm"
              />
              <span className="font-secondary text-sm text-base-content capitalize group-hover:text-accent font-medium transition-colors">
                {option === 'furnished' ? 'Furnished' : 'Unfurnished'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handle_apply}
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
        <div className="bg-base-100 rounded-box shadow-md p-6 border-t-4 border-accent">
          {filter_content}
        </div>
      </div>
    </>
  );
}