'use client';

import { useEffect, useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const format_rwf = (n) => `RWF ${new Intl.NumberFormat('rw-RW').format(n)}`;

// ── Collapsible section wrapper ────────────────────────────────────────────────
function FilterSection({ title, is_open, on_toggle, active_count, children }) {
  return (
    <div>
      <button
        type="button"
        onClick={on_toggle}
        className="flex items-center justify-between w-full py-3 group"
      >
        <div className="flex items-center gap-2">
          <span className="font-primary text-[14px] font-extrabold text-base-content uppercase tracking-wider">
            {title}
          </span>
          {active_count > 0 && (
            <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
          )}
        </div>
        <ChevronDown
          size={15}
          className={`text-base-content/40 transition-transform duration-200 group-hover:text-base-content/70 ${
            is_open ? '' : '-rotate-90'
          }`}
        />
      </button>
      {is_open && (
        <div className="flex flex-col gap-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
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

  // ── Filter state ────────────────────────────────────────────────────────────
  const [budget_min, set_budget_min] = useState(budget_range.min);
  const [budget_max, set_budget_max] = useState(budget_range.max);
  const [original_max] = useState(budget_range.max);
  const [original_min] = useState(budget_range.min);
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
  const [dont_mind_pets, set_dont_mind_pets] = useState(null);
  const [dont_mind_smoker, set_dont_mind_smoker] = useState(null);
  const [has_pet, set_has_pet] = useState(null);
  const [private_room, set_private_room] = useState(null);
  const [urgency, set_urgency] = useState('');

  // ── Section open state ──────────────────────────────────────────────────────
  const [basic_open, set_basic_open] = useState(true);
  const [housing_open, set_housing_open] = useState(true);
  const [lifestyle_open, set_lifestyle_open] = useState(false);
  const [availability_open, set_availability_open] = useState(false);

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
    const dmp = searchParams.get('dont_mind_pets')
    set_dont_mind_pets(dmp === 'true' ? true : dmp === 'false' ? false : null)
    const dms = searchParams.get('dont_mind_smoker')
    set_dont_mind_smoker(dms === 'true' ? true : dms === 'false' ? false : null)
    const hp = searchParams.get('has_pet')
    set_has_pet(hp === 'true' ? true : hp === 'false' ? false : null)
    set_private_room(searchParams.get('private_room') || null)
    set_urgency(searchParams.get('urgency') || '')
  }, [searchParams])

  // ── Active filter counts per group (for dot indicators) ────────────────────
  const basic_active =
    (gender !== '' ? 1 : 0) +
    (university !== '' ? 1 : 0) +
    selected_locs.length;

  const housing_active =
    (has_a_house ? 1 : 0) +
    (private_room !== null && private_room !== '' ? 1 : 0) +
    (budget_min !== budget_range.min || budget_max !== budget_range.max ? 1 : 0);

  const lifestyle_active =
    [is_smoker, has_pet, allow_pets, dont_mind_pets, dont_mind_smoker].filter(v => v !== null).length +
    (sleep_schedule !== '' ? 1 : 0) +
    (cleanliness !== '' ? 1 : 0) +
    (social_habits !== '' ? 1 : 0);

  const availability_active =
    (move_in_date !== '' ? 1 : 0) +
    (max_housemates !== '' ? 1 : 0) +
    (urgency !== '' ? 1 : 0);

  const has_filters =
    basic_active > 0 ||
    housing_active > 0 ||
    lifestyle_active > 0 ||
    availability_active > 0;

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
    set_dont_mind_pets(null);
    set_dont_mind_smoker(null);
    set_has_pet(null);
    set_private_room(null);
    set_urgency('');
    router.replace(`${pathname}`, {scroll: false})
  };

  const toggle_location = (loc) =>
    set_selected_locs((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );

  const handle_apply = () => {
    const param = new URLSearchParams()
    if(allow_pets === true || allow_pets === false) param.append('allow_pets', allow_pets)
    if(budget_max !== original_max) param.append('max', budget_max)
    if(budget_min !== original_min) param.append('min', budget_min)
    if(cleanliness) param.append('cleanliness', cleanliness)
    if(gender) param.append('gender', gender)
    if(has_a_house) param.append('has_a_house', has_a_house)
    if(is_smoker === true || is_smoker === false) param.append('smoker', is_smoker)
    if(dont_mind_pets === true || dont_mind_pets === false) param.append('dont_mind_pets', dont_mind_pets)
    if(dont_mind_smoker === true || dont_mind_smoker === false) param.append('dont_mind_smoker', dont_mind_smoker)
    if(has_pet === true || has_pet === false) param.append('has_pet', has_pet)
    if(private_room !== null) param.append('private_room', private_room)
    if(max_housemates) param.append('max_housemates', max_housemates)
    if(move_in_date) param.append('move_in_date', move_in_date)
    if(selected_locs.length > 0) selected_locs.forEach(loc => param.append('preferred_locations', loc))
    if(sleep_schedule) param.append('sleep_schedule', sleep_schedule)
    if(social_habits) param.append('social_habit', social_habits)
    if(university !== '') param.append('university', university)
    if(urgency) param.append('urgency', urgency)
    router.push(`?${param.toString()}`)
    console.log('Housemate filters:', {
      budget_min, budget_max, university, gender, has_a_house, selected_locs,
      move_in_date, sleep_schedule, cleanliness, social_habits,
      max_housemates, is_smoker, allow_pets
    });
    set_is_mobile_open(false);
  };

  // ── Shared boolean Yes/No row ───────────────────────────────────────────────
  const bool_row = (label, value, setter) => (
    <div key={label} className="flex items-center justify-between">
      <span className="font-secondary text-[11px] font-medium text-base-content/50 uppercase tracking-widest">
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
  );

  // ── Shared select row ───────────────────────────────────────────────────────
  const select_row = (label, state, setter, options) => (
    <div key={label} className="flex flex-col gap-2">
      <label className="font-secondary text-[11px] font-medium text-base-content/50 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        <select
          value={state}
          onChange={(e) => setter(e.target.value)}
          className="select select-bordered w-full rounded-field font-secondary text-sm bg-base-100 appearance-none pr-8 focus:border-accent"
        >
          <option value="">Any {label.toLowerCase()}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none" />
      </div>
    </div>
  );

  // ── Filter groups (shared between mobile + desktop) ─────────────────────────
  const filter_groups = (
    <div className="divide-y divide-base-300">

      {/* ── Group 1: Basic ─────────────────────────────── */}
      <FilterSection
        title="Basic"
        is_open={basic_open}
        on_toggle={() => set_basic_open(v => !v)}
        active_count={basic_active}
      >
        {/* Gender */}
        <div className="flex flex-col gap-2">
          <label className="font-secondary text-[11px] font-medium text-base-content/50 uppercase tracking-widest">
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

        {/* University */}
        <div className="flex flex-col gap-2">
          <label className="font-secondary text-[11px] font-medium text-base-content/50 uppercase tracking-widest">
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

        {/* Location */}
        <div className="flex flex-col gap-2">
          <label className="font-secondary text-[11px] font-medium text-base-content/50 uppercase tracking-widest">
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
      </FilterSection>

      {/* ── Group 2: Housing ───────────────────────────── */}
      <FilterSection
        title="Housing"
        is_open={housing_open}
        on_toggle={() => set_housing_open(v => !v)}
        active_count={housing_active}
      >
        {/* Has a House */}
        <div className="flex items-center justify-between gap-3">
          <span className="font-secondary text-[11px] font-medium text-base-content/50 uppercase tracking-widest">
            Has a House
          </span>
          <input
            type="checkbox"
            checked={has_a_house}
            onChange={(e) => set_has_a_house(e.target.checked)}
            className="toggle toggle-accent toggle-sm"
          />
        </div>

        {/* Looking for Private Room */}
        <div className="flex items-center justify-between">
          <span className="font-secondary text-[11px] font-medium text-base-content/50 uppercase tracking-widest">
            Private Room
          </span>
          <div className="flex gap-2">
            {[{ label: 'Yes', val: 'true' }, { label: 'No', val: 'false' }, { label: 'Either', val: 'either' }].map(({ label, val }) => (
              <button
                key={label}
                onClick={() => set_private_room(private_room === val ? null : val)}
                className={`px-3 py-1.5 rounded-field font-secondary text-xs font-bold transition-all border ${
                  private_room === val
                    ? 'bg-accent border-accent text-accent-content shadow-md'
                    : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent hover:text-accent'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-2">
          <label className="font-secondary text-[11px] font-medium text-base-content/50 uppercase tracking-widest">
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
            <span className="font-secondary text-[11px] text-base-content/50">
              {format_rwf(budget_min)}
            </span>
            <span className="font-secondary text-[11px] text-base-content/50">
              {format_rwf(budget_max)}
            </span>
          </div>
        </div>
      </FilterSection>

      {/* ── Group 3: Lifestyle ─────────────────────────── */}
      <FilterSection
        title="Lifestyle"
        is_open={lifestyle_open}
        on_toggle={() => set_lifestyle_open(v => !v)}
        active_count={lifestyle_active}
      >
        {bool_row('Smoker', is_smoker, set_is_smoker)}
        {bool_row('Has a pet', has_pet, set_has_pet)}
        {bool_row('Allows Pets', allow_pets, set_allow_pets)}
        {bool_row("Don't mind pets", dont_mind_pets, set_dont_mind_pets)}
        {bool_row("Don't mind smokers", dont_mind_smoker, set_dont_mind_smoker)}
        {select_row('Sleep Schedule', sleep_schedule, set_sleep_schedule, sleep_options)}
        {select_row('Cleanliness', cleanliness, set_cleanliness, clean_options)}
        {select_row('Social Habits', social_habits, set_social_habits, social_options)}
      </FilterSection>

      {/* ── Group 4: Availability ──────────────────────── */}
      <FilterSection
        title="Availability"
        is_open={availability_open}
        on_toggle={() => set_availability_open(v => !v)}
        active_count={availability_active}
      >
        {/* Move-in Date */}
        <div className="flex flex-col gap-2">
          <label className="font-secondary text-[11px] font-medium text-base-content/50 uppercase tracking-widest">
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

        {/* Max Housemates */}
        {select_row('Max Housemates', max_housemates, set_max_housemates, housemate_counts)}

        {/* Urgency */}
        <div className="flex flex-col gap-2">
          <label className="font-secondary text-[11px] font-medium text-base-content/50 uppercase tracking-widest">
            Urgency
          </label>
          <div className="flex gap-2 flex-wrap">
            {[
              { label: 'Any', value: '' },
              { label: 'Not Urgent', value: 'not_urgent' },
              { label: 'Slightly Urgent', value: 'slightly_urgent' },
              { label: 'Extremely Urgent', value: 'extremely_urgent' },
              { label: 'Flexible', value: 'flexible' },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => set_urgency(urgency === value ? '' : value)}
                className={`px-3 py-1.5 rounded-field font-secondary text-xs font-bold transition-all border ${
                  urgency === value
                    ? 'bg-accent border-accent text-accent-content shadow-md'
                    : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent hover:text-accent'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </FilterSection>

    </div>
  );

  // ── Shared header ───────────────────────────────────────────────────────────
  const sidebar_header = (
    <div className="flex items-center justify-between mb-1">
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
  );

  return (
    <>
      {/* ── Mobile trigger ─────────────────────────────────────────────────── */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => set_is_mobile_open(true)}
          className="btn btn-outline btn-accent w-full rounded-field font-primary font-bold text-sm uppercase tracking-wide gap-2 bg-base-100 hover:bg-accent hover:text-accent-content hover:border-accent transition-colors duration-200"
        >
          <SlidersHorizontal size={16} />
          Filters
          {has_filters && (
            <span className="badge badge-accent badge-sm font-bold">!</span>
          )}
        </button>
      </div>

      {/* ── Mobile Drawer ──────────────────────────────────────────────────── */}
      {is_mobile_open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-base-content/40 backdrop-blur-sm"
            onClick={() => set_is_mobile_open(false)}
          />
          <div className="relative ml-auto w-80 max-w-full h-full bg-base-100 shadow-2xl flex flex-col border-l-4 border-accent">

            {/* Sticky header */}
            <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-base-300">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-accent" />
                <h2 className="font-primary text-lg font-extrabold text-base-content uppercase tracking-wide">
                  Filter By
                </h2>
              </div>
              <button
                onClick={() => set_is_mobile_open(false)}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable filter groups */}
            <div className="flex-1 overflow-y-auto px-5 py-2">
              {filter_groups}
            </div>

            {/* Sticky footer — always visible */}
            <div className="flex-shrink-0 px-5 py-4 border-t border-base-300 bg-base-100 flex flex-col gap-2">
              {has_filters && (
                <button
                  onClick={handle_reset}
                  className="btn btn-ghost btn-sm w-full rounded-field font-primary font-bold text-xs uppercase tracking-widest text-error border border-error/30 hover:bg-error/5"
                >
                  <X size={13} /> Reset All
                </button>
              )}
              <button
                onClick={handle_apply}
                className="btn btn-accent w-full rounded-field font-primary font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-accent/20 transition-all active:scale-95"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop sidebar ─────────────────────────────────────────────────── */}
      <div className="hidden lg:block sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto sidebar-scroll">
        <div className="bg-base-100 rounded-box shadow-md p-6 border-t-4 border-accent">
          {sidebar_header}
          {filter_groups}
          <div className="pt-4">
            <button
              onClick={handle_apply}
              className="btn btn-accent w-full rounded-field font-primary font-extrabold text-sm uppercase tracking-wider mt-2 shadow-lg hover:shadow-accent/20 transition-all active:scale-95"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
