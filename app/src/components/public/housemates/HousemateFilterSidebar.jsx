'use client';

import { useEffect, useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const format_rwf = (n) => `RWF ${new Intl.NumberFormat('rw-RW').format(n)}`;

export default function HousemateFilterSidebar({ filter_options }) {
  const {
    budget_range,
    universities,
    gender_options,
    locations,
    sleep_options = ['Early Bird', 'Night Owl'],
    clean_options = ['Very Tidy', 'Casual'],
    social_options = ['Social', 'Private'],
    housemate_counts = ['2', '3', '4+']
  } = filter_options;

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [budget_min, set_budget_min] = useState(budget_range.min);
  const [budget_max, set_budget_max] = useState(budget_range.max);
  const [university, set_university] = useState('');
  const [gender, set_gender] = useState('');
  const [has_a_house, set_has_a_house] = useState(false);
  const [selected_locs, set_selected_locs] = useState([]);
  const [is_mobile_open, set_is_mobile_open] = useState(false);
  const [move_in_date, set_move_in_date] = useState('');
  const [sleep_schedule, set_sleep_schedule] = useState('');
  const [cleanliness, set_cleanliness] = useState('');
  const [social_habits, set_social_habits] = useState('');
  const [max_housemates, set_max_housemates] = useState('');
  const [is_smoker, set_is_smoker] = useState(null);
  const [allow_pets, set_allow_pets] = useState(null);

  useEffect(() => {
    set_budget_min( Number(searchParams.get('min')) || budget_min)
    set_budget_max( Number(searchParams.get('max')) || budget_max)
    set_move_in_date(searchParams.get('move_in_date') || '')
    set_university(searchParams.get('university') || '')
    set_gender(searchParams.get('gender') || '')
    set_has_a_house(searchParams.get('has_a_house') || false)
    set_selected_locs(searchParams.getAll('preferred_locations') || [])
    set_sleep_schedule(searchParams.get('sleep_schedule') || '')
    set_cleanliness(searchParams.get('cleanliness') || '')
    set_social_habits(searchParams.get('social_habit') || '')
    set_max_housemates(searchParams.get('max_housemates') || '')
    set_is_smoker(searchParams.get('smoker') === 'true' || null)
    set_allow_pets(searchParams.get('allow_pets') === 'true' || null)
  }, [searchParams])

  const has_filters =
    budget_min !== budget_range.min ||
    budget_max !== budget_range.max ||
    university !== '' ||
    gender !== '' ||
    has_a_house ||
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
    set_has_a_house(false);
    set_selected_locs([]);
    set_move_in_date('');
    set_sleep_schedule('');
    set_cleanliness('');
    set_social_habits('');
    set_max_housemates('');
    set_is_smoker(null);
    set_allow_pets(null);

    router.replace(`${pathname}`, {scroll: false})
  };

  const toggle_location = (loc) =>
    set_selected_locs((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );

  const handle_apply = () => {
    const param = new URLSearchParams()

    if(allow_pets === true || allow_pets === false) param.append('allow_pets', allow_pets)
    if(budget_max) param.append('max', budget_max)
    if(budget_min) param.append('min', budget_min)
    if(cleanliness) param.append('cleanliness', cleanliness)
    if(gender) param.append('gender', gender)
    if(has_a_house) param.append('has_a_house', has_a_house)
    if(is_smoker === true || is_smoker === false) param.append('smoker', is_smoker)
    if(max_housemates) param.append('max_housemates', max_housemates)
    if(move_in_date) param.append('move_in_date', move_in_date)
    if(selected_locs.length > 0) selected_locs.forEach(loc => param.append('preferred_locations',loc))
    if(sleep_schedule) param.append('sleep_schedule', sleep_schedule)
    if(social_habits) param.append('social_habit', social_habits)
    if(university !== '') param.append('university', university)

    router.push(`?${param.toString()}`)

    console.log('Housemate filters:', {
      budget_min, budget_max, university, gender, has_a_house, selected_locs,
      move_in_date, sleep_schedule, cleanliness, social_habits,
      max_housemates, is_smoker, allow_pets
    });
    set_is_mobile_open(false);
  };

  const sidebar_content = (
    <div className="flex flex-col gap-6 pb-10 lg:pb-0">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-accent" />
          <h2 className="font-primary text-lg font-extrabold text-base-content uppercase tracking-wide">
            Filter By
          </h2>
        </div>
        {has_filters && (
          <button
            onClick={handle_reset}
            className="flex items-center gap-1 text-xs font-secondary text-base-content/50 hover:text-error transition-colors"
          >
            <X size={12} /> Reset
          </button>
        )}
      </div>

      <div className="border-t border-base-300" />

      {/* ── Gender ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
          Gender
        </label>
        <div className="flex gap-2 flex-wrap">
          {(gender_options || ['Male', 'Female', 'Any']).map((opt) => (
            <button
              key={opt}
              onClick={() => set_gender(gender === opt ? '' : opt)}
              className={`px-3 py-1.5 rounded-field font-secondary text-xs font-bold transition-all border ${
                gender === opt
                  ? 'bg-accent border-accent text-accent-content shadow-md'
                  : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent hover:text-accent'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* ── Already Has a House ─────────────────────────── */}
      <div className="flex items-center justify-between gap-3">
        <span className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
          Has a House
        </span>
        <input
          type="checkbox"
          checked={has_a_house}
          onChange={(e) => set_has_a_house(e.target.checked)}
          className="toggle toggle-accent toggle-sm"
        />
      </div>

      <div className="border-t border-base-300" />

      {/* ── University ─────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
          University
        </label>
        <div className="relative">
          <select
            value={university}
            onChange={(e) => set_university(e.target.value)}
            className="select select-bordered w-full rounded-field font-secondary text-sm bg-base-100 appearance-none pr-8 focus:border-accent"
          >
            <option value="">Any university</option>
            {(universities || []).map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none" />
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* ── Location ───────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
          Location
        </label>
        <div className="flex flex-wrap gap-2">
          {(locations || []).map((loc) => (
            <button
              key={loc}
              onClick={() => toggle_location(loc)}
              className={`px-3 py-1.5 rounded-field font-secondary text-xs font-bold transition-all border ${
                selected_locs.includes(loc)
                  ? 'bg-accent border-accent text-accent-content shadow-md'
                  : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent hover:text-accent'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* ── Budget Range ───────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
          Budget (RWF / month)
        </label>
        <div className="flex flex-col gap-1">
          <input
            type="range" min={budget_range.min} max={budget_range.max} step={5000}
            value={budget_min}
            onChange={(e) => set_budget_min(Math.min(Number(e.target.value), budget_max))}
            className="range range-accent range-xs"
          />
          <input
            type="range" min={budget_range.min} max={budget_range.max} step={5000}
            value={budget_max}
            onChange={(e) => set_budget_max(Math.max(Number(e.target.value), budget_min))}
            className="range range-accent range-xs mt-2"
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="font-secondary text-[10px] font-bold text-accent-content bg-accent px-2 py-1 rounded shadow-sm">
            {format_rwf(budget_min)}
          </span>
          <span className="font-secondary text-[10px] font-bold text-accent-content bg-accent px-2 py-1 rounded shadow-sm">
            {format_rwf(budget_max)}
          </span>
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* ── Move-in Date ───────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
          Move-in Date
        </label>
        <input
          type="date"
          min={new Date().toISOString().split('T')[0]}
          value={move_in_date}
          onChange={(e) => set_move_in_date(e.target.value)}
          className="input input-bordered w-full rounded-field font-secondary text-sm bg-base-100 focus:border-accent"
        />
        {move_in_date && (
          <button
            onClick={() => set_move_in_date('')}
            className="flex items-center gap-1 text-xs font-secondary text-base-content/40 hover:text-error transition-colors self-start"
          >
            <X size={11} /> Clear date
          </button>
        )}
      </div>

      {/* ── Select Grids ───────────────────────────────── */}
      {[
        { label: 'Sleep Schedule', state: sleep_schedule, setter: set_sleep_schedule, options: sleep_options },
        { label: 'Cleanliness', state: cleanliness, setter: set_cleanliness, options: clean_options },
        { label: 'Social Habits', state: social_habits, setter: set_social_habits, options: social_options },
        { label: 'Max Housemates', state: max_housemates, setter: set_max_housemates, options: housemate_counts },
      ].map((filter) => (
        <div key={filter.label} className="flex flex-col gap-3 border-t border-base-300 pt-6">
          <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
            {filter.label}
          </label>
          <div className="relative">
            <select
              value={filter.state}
              onChange={(e) => filter.setter(e.target.value)}
              className="select select-bordered w-full rounded-field font-secondary text-sm bg-base-100 appearance-none pr-8 focus:border-accent"
            >
              <option value="">Any {filter.label.toLowerCase()}</option>
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none" />
          </div>
        </div>
      ))}

      {/* ── Boolean Toggles ────────────────────────────── */}
      <div className="flex flex-col gap-4 border-t border-base-300 pt-6">
        {[
          { label: 'Smoker', value: is_smoker, setter: set_is_smoker },
          { label: 'Allows Pets', value: allow_pets, setter: set_allow_pets },
        ].map(({ label, value, setter }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
              {label}
            </span>
            <div className="flex gap-2">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setter(value === val ? null : val)}
                  className={`px-3 py-1.5 rounded-field font-secondary text-xs font-bold transition-all border ${
                    value === val
                      ? 'bg-accent border-accent text-accent-content shadow-md'
                      : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent hover:text-accent'
                  }`}
                >
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-base-300" />

      {/* ── Apply ──────────────────────────────────────── */}
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
      {/* Mobile trigger */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => set_is_mobile_open(true)}
          className="btn btn-outline btn-accent w-full rounded-field font-primary font-bold text-sm uppercase tracking-wide gap-2 bg-base-100"
        >
          <SlidersHorizontal size={16} />
          Filters
          {has_filters && (
            <span className="badge badge-accent badge-sm font-bold">!</span>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
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
            {sidebar_content}
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="hidden lg:block sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto sidebar-scroll">
        <div className="bg-base-100 rounded-box shadow-md p-6 border-t-4 border-accent">
          {sidebar_content}
        </div>
      </div>
    </>
  );
}
