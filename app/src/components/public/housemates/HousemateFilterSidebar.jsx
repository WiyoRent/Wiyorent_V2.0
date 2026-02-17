'use client';

import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown, Calendar } from 'lucide-react';

const format_rwf = (n) => `RWF ${new Intl.NumberFormat('rw-RW').format(n)}`;

export default function HousemateFilterSidebar({ filter_options }) {
  const { 
    budget_range, 
    universities, 
    gender_options, 
    locations,
    // Assuming these options are passed in, otherwise using defaults
    sleep_options = ['Early Bird', 'Night Owl'],
    clean_options = ['Very Tidy', 'Casual'],
    social_options = ['Social', 'Private'],
    housemate_counts = ['2', '3', '4+']
  } = filter_options;

  // --- EXISTING STATE ---
  const [budget_min, set_budget_min] = useState(budget_range.min);
  const [budget_max, set_budget_max] = useState(budget_range.max);
  const [university, set_university] = useState('');
  const [gender, set_gender] = useState('');
  const [selected_locs, set_selected_locs] = useState([]);
  const [is_mobile_open, set_is_mobile_open] = useState(false);

  // --- NEW STATE ---
  const [move_in_date, set_move_in_date] = useState('');
  const [sleep_schedule, set_sleep_schedule] = useState('');
  const [cleanliness, set_cleanliness] = useState('');
  const [social_habits, set_social_habits] = useState('');
  const [max_housemates, set_max_housemates] = useState('');
  const [is_smoker, set_is_smoker] = useState(null); // null = Any, true = Yes, false = No
  const [allow_pets, set_allow_pets] = useState(null);

  const has_filters =
    budget_min !== budget_range.min ||
    budget_max !== budget_range.max ||
    university !== '' ||
    gender !== '' ||
    selected_locs.length > 0 ||
    move_in_date !== '' ||
    sleep_schedule !== '' ||
    cleanliness !== '' ||
    social_habits !== '' ||
    max_housemates !== '' ||
    is_smoker !== null ||
    allow_pets !== null;

  const handle_reset = () => {
    set_budget_min(budget_range.min);
    set_budget_max(budget_range.max);
    set_university('');
    set_gender('');
    set_selected_locs([]);
    set_move_in_date('');
    set_sleep_schedule('');
    set_cleanliness('');
    set_social_habits('');
    set_max_housemates('');
    set_is_smoker(null);
    set_allow_pets(null);
  };

  const toggle_location = (loc) =>
    set_selected_locs((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );

  const handle_apply = () => {
    console.log('Housemate filters:', { 
      budget_min, budget_max, university, gender, selected_locs, 
      move_in_date, sleep_schedule, cleanliness, social_habits, 
      max_housemates, is_smoker, allow_pets 
    });
    set_is_mobile_open(false);
  };

  const sidebar_content = (
    <div className="flex flex-col gap-6 pb-10 lg:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={17} className="text-accent" />
          <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-wide">
            Filter By
          </h2>
        </div>
        {has_filters && (
          <button
            onClick={handle_reset}
            className="flex items-center gap-1 text-xs font-secondary text-base-content/40 hover:text-error transition-colors"
          >
            <X size={11} /> Reset
          </button>
        )}
      </div>

      <div className="border-t border-base-300" />

      {/* Budget Range */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-xs font-extrabold text-base-content uppercase tracking-widest">
          Budget (RWF / month)
        </label>
        <div className="flex flex-col gap-2">
          <input
            type="range" min={budget_range.min} max={budget_range.max} step={5000}
            value={budget_min} onChange={(e) => set_budget_min(Math.min(Number(e.target.value), budget_max))}
            className="range range-accent range-xs"
          />
          <input
            type="range" min={budget_range.min} max={budget_range.max} step={5000}
            value={budget_max} onChange={(e) => set_budget_max(Math.max(Number(e.target.value), budget_min))}
            className="range range-accent range-xs"
          />
          <div className="flex items-center justify-between mt-1">
            <span className="font-secondary text-[10px] font-bold bg-base-200 px-2 py-1 rounded-field">{format_rwf(budget_min)}</span>
            <span className="font-secondary text-[10px] font-bold bg-base-200 px-2 py-1 rounded-field">{format_rwf(budget_max)}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* Move-in Date */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-xs font-extrabold text-base-content uppercase tracking-widest">
          Move-in Date
        </label>
        <div className="relative">
          <input 
            type="date"
            value={move_in_date}
            onChange={(e) => set_move_in_date(e.target.value)}
            className="input input-bordered w-full rounded-field font-secondary text-sm bg-base-100"
          />
        </div>
      </div>

      {/* Select Grids (Sleep, Cleanliness, Social) */}
      {[
        { label: 'Sleep Schedule', state: sleep_schedule, setter: set_sleep_schedule, options: sleep_options },
        { label: 'Cleanliness', state: cleanliness, setter: set_cleanliness, options: clean_options },
        { label: 'Social Habits', state: social_habits, setter: set_social_habits, options: social_options },
        { label: 'Max Housemates', state: max_housemates, setter: set_max_housemates, options: housemate_counts },
      ].map((filter) => (
        <div key={filter.label} className="flex flex-col gap-3 border-t border-base-300 pt-6">
          <label className="font-primary text-xs font-extrabold text-base-content uppercase tracking-widest">
            {filter.label}
          </label>
          <div className="relative">
            <select
              value={filter.state}
              onChange={(e) => filter.setter(e.target.value)}
              className="select select-bordered w-full rounded-field font-secondary text-sm bg-base-100 appearance-none"
            >
              <option value="">Any {filter.label.toLowerCase()}</option>
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/35 pointer-events-none" />
          </div>
        </div>
      ))}

      {/* Boolean Toggles (Smoker & Pets) */}
      <div className="flex flex-col gap-4 border-t border-base-300 pt-6">
        <div className="flex items-center justify-between">
          <span className="font-primary text-xs font-extrabold text-base-content uppercase tracking-widest">Smoker</span>
          <div className="flex gap-2">
            {[true, false].map((val) => (
              <button
                key={String(val)}
                onClick={() => set_is_smoker(is_smoker === val ? null : val)}
                className={`px-3 py-1 rounded-field text-[10px] font-bold uppercase border transition-all ${is_smoker === val ? 'bg-accent border-accent text-accent-content' : 'border-base-300 text-base-content/40'}`}
              >
                {val ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-primary text-xs font-extrabold text-base-content uppercase tracking-widest">Allows Pets</span>
          <div className="flex gap-2">
            {[true, false].map((val) => (
              <button
                key={String(val)}
                onClick={() => set_allow_pets(allow_pets === val ? null : val)}
                className={`px-3 py-1 rounded-field text-[10px] font-bold uppercase border transition-all ${allow_pets === val ? 'bg-accent border-accent text-accent-content' : 'border-base-300 text-base-content/40'}`}
              >
                {val ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* Apply */}
      <button
        onClick={handle_apply}
        className="btn btn-accent w-full rounded-field font-primary font-extrabold text-sm uppercase tracking-widest mt-1"
      >
        Apply Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden">
        <button
          onClick={() => set_is_mobile_open(true)}
          className="btn btn-outline w-full rounded-field font-primary font-bold text-sm uppercase gap-2 border-accent/40 text-accent hover:bg-accent/5"
        >
          <SlidersHorizontal size={15} />
          Filters
          {has_filters && <span className="badge badge-accent badge-sm">On</span>}
        </button>
      </div>

      {/* Mobile Drawer */}
      {is_mobile_open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-base-content/40 backdrop-blur-sm" onClick={() => set_is_mobile_open(false)} />
          <div className="relative ml-auto w-80 max-w-full h-full bg-base-100 shadow-2xl overflow-y-auto p-6">
            <button onClick={() => set_is_mobile_open(false)} className="absolute top-4 right-4 btn btn-ghost btn-sm btn-circle">
              <X size={17} />
            </button>
            {sidebar_content}
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="hidden lg:block sticky top-6 max-h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
        <div className="bg-base-100 rounded-box shadow-sm p-6">
          {sidebar_content}
        </div>
      </div>
    </>
  );
}