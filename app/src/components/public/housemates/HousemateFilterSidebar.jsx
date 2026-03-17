'use client';

import { useEffect, useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import FilterSection from '@/components/public/shared/FilterSection';
import FilterTooltip from '@/components/public/shared/FilterTooltip';
import FieldLabel from '@/components/public/shared/FieldLabel';

import { formatRWF, formatRWFNumber } from '@/lib/formatRWF';

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

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ── Filter state ────────────────────────────────────────────────────────────
  const [budget_max, set_budget_max] = useState(budget_range.max);
  const [university, set_university] = useState('');
  const [gender, set_gender] = useState('');
  const [urgency, set_urgency] = useState('');
  const [has_a_house, set_has_a_house] = useState(false);
  const [selected_locs, set_selected_locs] = useState([]);
  const [private_room, set_private_room] = useState(null);
  const [move_in_date, set_move_in_date] = useState('');
  const [max_housemates, set_max_housemates] = useState('');
  const [sleep_schedule, set_sleep_schedule] = useState('');
  const [cleanliness, set_cleanliness] = useState('');
  const [social_habits, set_social_habits] = useState('');
  const [is_smoker, set_is_smoker] = useState(null);
  const [allow_pets, set_allow_pets] = useState(null);
  const [dont_mind_pets, set_dont_mind_pets] = useState(null);
  const [dont_mind_smoker, set_dont_mind_smoker] = useState(null);
  const [has_pet, set_has_pet] = useState(null);
  const [is_mobile_open, set_is_mobile_open] = useState(false);

  // ── Section open state ──────────────────────────────────────────────────────
  const [essentials_open, set_essentials_open] = useState(true);
  const [living_open, set_living_open] = useState(true);
  const [lifestyle_open, set_lifestyle_open] = useState(false);

  // ── Sync from URL ───────────────────────────────────────────────────────────
  useEffect(() => {
    set_budget_max(Number(searchParams.get('max')) || budget_range.max);
    set_university(searchParams.get('university') || '');
    set_gender(searchParams.get('gender') || '');
    set_urgency(searchParams.get('urgency') || '');
    set_has_a_house(searchParams.get('has_a_house') === 'true');
    set_selected_locs(searchParams.getAll('preferred_locations') || []);
    set_private_room(searchParams.get('private_room') || null);
    set_move_in_date(searchParams.get('move_in_date') || '');
    set_max_housemates(searchParams.get('max_housemates') || '');
    set_sleep_schedule(searchParams.get('sleep_schedule') || '');
    set_cleanliness(searchParams.get('cleanliness') || '');
    set_social_habits(searchParams.get('social_habit') || '');
    set_is_smoker(searchParams.get('smoker') === 'true' ? true : searchParams.get('smoker') === 'false' ? false : null);
    set_allow_pets(searchParams.get('allow_pets') === 'true' ? true : searchParams.get('allow_pets') === 'false' ? false : null);
    const dmp = searchParams.get('dont_mind_pets');
    set_dont_mind_pets(dmp === 'true' ? true : dmp === 'false' ? false : null);
    const dms = searchParams.get('dont_mind_smoker');
    set_dont_mind_smoker(dms === 'true' ? true : dms === 'false' ? false : null);
    const hp = searchParams.get('has_pet');
    set_has_pet(hp === 'true' ? true : hp === 'false' ? false : null);
  }, [searchParams]);

  // ── Active filter counts ────────────────────────────────────────────────────
  const essentials_active =
    (budget_max !== budget_range.max ? 1 : 0) +
    (university !== '' ? 1 : 0) +
    (urgency !== '' ? 1 : 0) +
    (gender !== '' ? 1 : 0);

  const living_active =
    (has_a_house ? 1 : 0) +
    selected_locs.length +
    (private_room !== null && private_room !== '' ? 1 : 0) +
    (move_in_date !== '' ? 1 : 0) +
    (max_housemates !== '' ? 1 : 0);

  const lifestyle_active =
    [is_smoker, has_pet, allow_pets, dont_mind_pets, dont_mind_smoker].filter(v => v !== null).length +
    (sleep_schedule !== '' ? 1 : 0) +
    (cleanliness !== '' ? 1 : 0) +
    (social_habits !== '' ? 1 : 0);

  const has_filters = essentials_active > 0 || living_active > 0 || lifestyle_active > 0;

  // ── Reset ───────────────────────────────────────────────────────────────────
  const handle_reset = () => {
    set_budget_max(budget_range.max);
    set_university('');
    set_gender('');
    set_urgency('');
    set_has_a_house(false);
    set_selected_locs([]);
    set_private_room(null);
    set_move_in_date('');
    set_max_housemates('');
    set_sleep_schedule('');
    set_cleanliness('');
    set_social_habits('');
    set_is_smoker(null);
    set_allow_pets(null);
    set_dont_mind_pets(null);
    set_dont_mind_smoker(null);
    set_has_pet(null);
    router.replace(`${pathname}`, { scroll: false });
  };

  const toggle_location = (loc) =>
    set_selected_locs((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );

  // ── Apply ───────────────────────────────────────────────────────────────────
  const handle_apply = () => {
    const param = new URLSearchParams();
    if (budget_max !== budget_range.max) param.append('max', budget_max);
    if (university) param.append('university', university);
    if (gender) param.append('gender', gender);
    if (urgency) param.append('urgency', urgency);
    if (has_a_house) param.append('has_a_house', has_a_house);
    if (selected_locs.length > 0) selected_locs.forEach(loc => param.append('preferred_locations', loc));
    if (private_room !== null) param.append('private_room', private_room);
    if (move_in_date) param.append('move_in_date', move_in_date);
    if (max_housemates) param.append('max_housemates', max_housemates);
    if (sleep_schedule) param.append('sleep_schedule', sleep_schedule);
    if (cleanliness) param.append('cleanliness', cleanliness);
    if (social_habits) param.append('social_habit', social_habits);
    if (is_smoker === true || is_smoker === false) param.append('smoker', is_smoker);
    if (allow_pets === true || allow_pets === false) param.append('allow_pets', allow_pets);
    if (dont_mind_pets === true || dont_mind_pets === false) param.append('dont_mind_pets', dont_mind_pets);
    if (dont_mind_smoker === true || dont_mind_smoker === false) param.append('dont_mind_smoker', dont_mind_smoker);
    if (has_pet === true || has_pet === false) param.append('has_pet', has_pet);
    router.push(`?${param.toString()}`);
    set_is_mobile_open(false);
  };

  // ── Pill chip button (replaces old rectangular border buttons) ──────────────
  const chip_btn = (label, is_active, on_click) => (
    <button
      key={label}
      type="button"
      onClick={on_click}
      className={`px-3 py-1 rounded-full font-secondary text-xs font-bold transition-all border ${
        is_active
          ? 'bg-accent/15 border-accent/40 text-accent'
          : 'bg-base-100 border-base-300 text-base-content/50 hover:border-accent/40 hover:text-accent/80'
      }`}
    >
      {label}
    </button>
  );

  // ── Bool Yes/No row ─────────────────────────────────────────────────────────
  const bool_row = (label, value, setter) => (
    <div key={label} className="flex items-center justify-between gap-2">
      <span className="font-secondary text-[12px] text-base-content/60">
        {label}
      </span>
      <div className="flex gap-1.5 flex-shrink-0">
        {[true, false].map((val) => (
          <button
            key={String(val)}
            type="button"
            onClick={() => setter(value === val ? null : val)}
            className={`px-3 py-1 rounded-full font-secondary text-xs font-bold transition-all duration-150 border ${
              value === val
                ? 'bg-accent/15 border-accent/40 text-accent'
                : 'bg-base-100 border-base-300 text-base-content/50 hover:border-accent/40 hover:text-accent/80'
            }`}
          >
            {val ? 'Yes' : 'No'}
          </button>
        ))}
      </div>
    </div>
  );

  // ── Select row ──────────────────────────────────────────────────────────────
  const select_row = (label, state, setter, options) => (
    <div key={label} className="flex flex-col">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <select
          value={state}
          onChange={(e) => setter(e.target.value)}
          className="select select-bordered select-sm w-full rounded-field font-secondary text-sm bg-base-100 appearance-none pr-8 focus:border-accent"
        >
          <option value="">Any</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none" />
      </div>
    </div>
  );

  // ── Filter groups ───────────────────────────────────────────────────────────
  const filter_groups = (
    <div className="divide-y divide-base-200">

      {/* ── Group 1: The Essentials ─────────────────────── */}
      <FilterSection
        title="The Essentials"
        is_open={essentials_open}
        on_toggle={() => set_essentials_open(v => !v)}
        active_count={essentials_active}
      >
        {/* Budget — single max slider */}
        <div className="flex flex-col">
          <FieldLabel>Max budget</FieldLabel>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="font-secondary text-[11px] text-base-content/40">Up to</span>
            <span className="font-secondary text-[15px] font-bold text-base-content">
              {formatRWFNumber(budget_max)}
            </span>
            <span className="font-secondary text-[11px] text-base-content/40">RWF/mo</span>
          </div>
          <input
            type="range"
            min={budget_range.min}
            max={budget_range.max}
            step={5000}
            value={budget_max}
            onChange={(e) => set_budget_max(Number(e.target.value))}
            className="range range-accent range-xs"
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className="font-secondary text-[10px] text-base-content/30">{formatRWF(budget_range.min)}</span>
            <span className="font-secondary text-[10px] text-base-content/30">{formatRWF(budget_range.max)}</span>
          </div>
        </div>

        {/* University */}
        <div className="flex flex-col">
          <FieldLabel>University</FieldLabel>
          <div className="relative">
            <select
              value={university}
              onChange={(e) => set_university(e.target.value)}
              className="select select-bordered select-sm w-full rounded-field font-secondary text-sm bg-base-100 appearance-none pr-8 focus:border-accent"
            >
              <option value="">Any university</option>
              {(universities || []).map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none" />
          </div>
        </div>

        {/* Urgency — no "Any" pill, deselect by clicking active */}
        <div className="flex flex-col">
          <FieldLabel>Urgency</FieldLabel>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: 'Flexible', value: 'flexible' },
              { label: 'Slightly urgent', value: 'slightly_urgent' },
              { label: 'Extremely urgent', value: 'extremely_urgent' },
            ].map(({ label, value }) =>
              chip_btn(label, urgency === value, () => set_urgency(urgency === value ? '' : value))
            )}
          </div>
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <FieldLabel>Gender</FieldLabel>
          <div className="flex flex-wrap gap-1.5">
            {(gender_options || ['Male', 'Female', 'Any']).map((opt) =>
              chip_btn(opt, gender === opt, () => set_gender(gender === opt ? '' : opt))
            )}
          </div>
        </div>
      </FilterSection>

      {/* ── Group 2: The Living Situation ───────────────── */}
      <FilterSection
        title="The Living Situation"
        is_open={living_open}
        on_toggle={() => set_living_open(v => !v)}
        active_count={living_active}
      >
        {/* Has a house — with sublabel + tooltip */}
        <div className="flex items-center justify-between gap-3 py-0.5">
          <div className="flex flex-col gap-0.5">
            <span className="font-secondary text-[12px] font-medium text-base-content/70 flex items-center gap-1">
              Already has a place
              <FilterTooltip text="Only show people who already have a house and are looking for someone to move in." />
            </span>
            <span className="font-secondary text-[10px] text-base-content/35">
              Has a house, needs housemates
            </span>
          </div>
          <input
            type="checkbox"
            checked={has_a_house}
            onChange={(e) => set_has_a_house(e.target.checked)}
            className="toggle toggle-accent toggle-sm flex-shrink-0"
          />
        </div>

        {/* Neighbourhood — pill chips */}
        <div className="flex flex-col">
          <FieldLabel>Neighbourhood</FieldLabel>
          <div className="flex flex-wrap gap-1.5">
            {(locations || []).map((loc) =>
              chip_btn(loc, selected_locs.includes(loc), () => toggle_location(loc))
            )}
          </div>
        </div>

        {/* Private Room — full-width 3-col segmented control */}
        <div className="flex flex-col">
          <FieldLabel tip="Shared rooms cost significantly less but offer less privacy.">
            Private room
          </FieldLabel>
          <div className="grid grid-cols-3 gap-1.5">
            {[{ label: 'Yes', val: 'true' }, { label: 'No', val: 'false' }, { label: 'Either', val: 'either' }].map(({ label, val }) => (
              <button
                key={label}
                type="button"
                onClick={() => set_private_room(private_room === val ? null : val)}
                className={`py-1.5 rounded-full font-secondary text-xs font-bold transition-all duration-150 border text-center ${
                  private_room === val
                    ? 'bg-accent/15 border-accent/40 text-accent'
                    : 'bg-base-100 border-base-300 text-base-content/50 hover:border-accent/40 hover:text-accent/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Move-in Date */}
        <div className="flex flex-col">
          <FieldLabel>Move-in date</FieldLabel>
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={move_in_date}
            onChange={(e) => set_move_in_date(e.target.value)}
            className="input input-bordered input-sm w-full rounded-field font-secondary text-sm bg-base-100 focus:border-accent"
          />
          {move_in_date && (
            <button
              type="button"
              onClick={() => set_move_in_date('')}
              className="flex items-center gap-1 mt-1 text-xs font-secondary text-base-content/35 hover:text-error transition-colors self-start"
            >
              <X size={10} /> Clear date
            </button>
          )}
        </div>

        {/* Max Housemates */}
        {select_row('Max housemates', max_housemates, set_max_housemates, housemate_counts)}
      </FilterSection>

      {/* ── Group 3: Lifestyle & Vibe ────────────────────── */}
      <FilterSection
        title="Lifestyle & Vibe"
        is_open={lifestyle_open}
        on_toggle={() => set_lifestyle_open(v => !v)}
        active_count={lifestyle_active}
      >
        {select_row('Cleanliness', cleanliness, set_cleanliness, clean_options)}
        {select_row('Sleep schedule', sleep_schedule, set_sleep_schedule, sleep_options)}
        {select_row('Social habits', social_habits, set_social_habits, social_options)}

        <div className="border-t border-base-200 pt-3 flex flex-col gap-3">
          {bool_row('Smoker', is_smoker, set_is_smoker)}
          {bool_row('Has a pet', has_pet, set_has_pet)}
          {bool_row('Allows pets', allow_pets, set_allow_pets)}
          {bool_row("Ok with pets", dont_mind_pets, set_dont_mind_pets)}
          {bool_row("Ok with smokers", dont_mind_smoker, set_dont_mind_smoker)}
        </div>
      </FilterSection>

    </div>
  );

  // ── Shared header ───────────────────────────────────────────────────────────
  const sidebar_header = (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={15} className="text-accent" />
        <h2 className="font-primary text-lg font-extrabold text-base-content/70 uppercase tracking-widest">
          Filters
        </h2>
      </div>
      {has_filters && (
        <button
          type="button"
          onClick={handle_reset}
          className="flex items-center gap-1 text-xs font-secondary text-base-content/40 hover:text-error transition-colors"
        >
          <X size={11} /> Reset all
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* ── Mobile trigger ─────────────────────────────────────────────────── */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => set_is_mobile_open(true)}
          className="btn btn-outline btn-accent w-full rounded-full font-primary font-bold text-sm uppercase tracking-wide gap-2 bg-base-100 hover:bg-accent hover:text-accent-content hover:border-accent transition-colors duration-200"
        >
          <SlidersHorizontal size={15} />
          Filters
          {has_filters && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-accent-content text-[10px] font-extrabold">
              {essentials_active + living_active + lifestyle_active}
            </span>
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
            <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-base-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={15} className="text-accent" />
                <h2 className="font-primary text-lg font-extrabold text-base-content/70 uppercase tracking-widest">
                  Filters
                </h2>
              </div>
              <button
                type="button"
                onClick={() => set_is_mobile_open(false)}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable filter groups */}
            <div className="flex-1 overflow-y-auto px-5 py-2">
              {filter_groups}
            </div>

            {/* Sticky footer */}
            <div className="flex-shrink-0 px-5 py-4 border-t border-base-200 bg-base-100 flex flex-col gap-2">
              {has_filters && (
                <button
                  type="button"
                  onClick={handle_reset}
                  className="btn btn-ghost btn-sm w-full rounded-full font-primary font-bold text-xs uppercase tracking-widest text-error border border-error/30 hover:bg-error/5"
                >
                  <X size={12} /> Reset all
                </button>
              )}
              <button
                type="button"
                onClick={handle_apply}
                className="btn btn-accent w-full rounded-full font-primary font-extrabold text-sm uppercase tracking-wider shadow-md hover:shadow-accent/20 transition-all active:scale-95"
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop sidebar ─────────────────────────────────────────────────── */}
      <div className="hidden lg:block sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto sidebar-scroll">
        <div className="bg-base-100 rounded-2xl shadow-md p-5 border border-base-200 border-t-4 border-t-accent">
          {sidebar_header}
          {filter_groups}
          <div className="pt-4">
            <button
              type="button"
              onClick={handle_apply}
              className="btn btn-accent w-full rounded-full font-primary font-extrabold text-sm uppercase tracking-wider shadow-md hover:shadow-accent/20 transition-all active:scale-95"
            >
              Apply filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}