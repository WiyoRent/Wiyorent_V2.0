'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { X, SlidersHorizontal, ShieldCheck, Users, GraduationCap, CalendarClock, Home, Zap, MapPin } from 'lucide-react';

// ── Shared sub-components ──────────────────────────────────────────────────────

function FilterLabel({ children }) {
  return (
    <span className="font-primary text-[9px] uppercase tracking-[0.12em] text-base-content/40 font-bold block mb-1.5">
      {children}
    </span>
  );
}

function PillGroup({ options, value, onChange }) {
  return (
    <div className="flex items-center overflow-x-auto">
      {options.map(({ label, value: v }) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`px-3 py-1.5 text-[10px] font-primary font-bold uppercase tracking-wider transition-all border-y border-r first:border-l first:rounded-l-sm last:rounded-r-sm ${
            value === v
              ? 'bg-accent border-accent text-accent-content z-10 relative'
              : 'bg-base-100 border-base-300 text-base-content/50 hover:border-base-content/30 hover:text-base-content/80'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function UsersFilterBar({ filter_options = {} }) {
  const { budget_range = { min: 0, max: 500000 }, universities = [], locations = [] } = filter_options;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [verification_status, set_verification_status] = useState('');
  const [gender, set_gender] = useState('');
  const [university, set_university] = useState('');
  const [has_house, set_has_house] = useState('');
  const [is_onboarded, set_is_onboarded] = useState('');
  const [sort, set_sort] = useState('');
  const [is_blocked, set_is_blocked] = useState('');
  const [urgency, set_urgency] = useState('');
  const [budget_min, set_budget_min] = useState('');
  const [budget_max, set_budget_max] = useState('');
  const [preferred_location, set_preferred_location] = useState('');

  // Sync from URL on mount/change
  useEffect(() => {
    set_verification_status(searchParams.get('verification_status') || '');
    set_gender(searchParams.get('gender') || '');
    set_university(searchParams.get('university_name') || '');
    set_has_house(searchParams.get('has_house') || '');
    set_is_onboarded(searchParams.get('is_onboarded') || '');
    set_sort(searchParams.get('sort') || '');
    set_is_blocked(searchParams.get('is_blocked') || '');
    set_urgency(searchParams.get('urgency') || '');
    set_budget_min(searchParams.get('budget_min') || '');
    set_budget_max(searchParams.get('budget_max') || '');
    set_preferred_location(searchParams.get('preferred_location') || '');
  }, [searchParams]);

  const push_filter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== '' && value != null) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Debounce budget inputs
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (budget_min) { params.set('budget_min', budget_min); } else { params.delete('budget_min'); }
      if (budget_max) { params.set('budget_max', budget_max); } else { params.delete('budget_max'); }
      router.push(`${pathname}?${params.toString()}`);
    }, 400);
    return () => clearTimeout(timer);
  }, [budget_min, budget_max]);

  const handle_reset = () => router.replace(pathname);

  const active_count = [verification_status, gender, university, has_house, is_onboarded, sort, is_blocked, urgency, budget_min, budget_max, preferred_location].filter(Boolean).length;
  const has_active_filters = active_count > 0;

  const select_cls = "select select-bordered select-sm rounded-field font-secondary text-xs focus:border-accent focus:outline-none";

  return (
    <div className="bg-base-100 border border-base-300 rounded-xl mb-6 overflow-hidden shadow-sm">

      {/* ── Header bar ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-base-200/60 border-b border-base-300">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={13} className="text-base-content/40" />
          <span className="font-primary text-[10px] uppercase tracking-widest font-bold text-base-content/40">
            Filters
          </span>
          {has_active_filters && (
            <span className="bg-accent text-accent-content font-primary text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm tracking-wide">
              {active_count} active
            </span>
          )}
        </div>
        {has_active_filters && (
          <button
            onClick={handle_reset}
            className="flex items-center gap-1 font-primary text-[9px] uppercase tracking-widest font-bold text-error/70 hover:text-error transition-colors"
          >
            <X size={10} />
            Clear all
          </button>
        )}
      </div>

      {/* ── Filter controls ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-end gap-4 sm:gap-x-5 sm:gap-y-3 px-4 py-3.5">

        {/* Verification Status */}
        <div>
          <FilterLabel>Verification</FilterLabel>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <select
              value={verification_status}
              onChange={(e) => { set_verification_status(e.target.value); push_filter('verification_status', e.target.value); }}
              className={`${select_cls} w-full sm:min-w-[140px]`}
            >
              <option value="">Any</option>
              <option value="approved">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>
        </div>

        {/* Account (is_blocked) */}
        <div>
          <FilterLabel>Account</FilterLabel>
          <PillGroup
            value={is_blocked}
            onChange={(v) => { set_is_blocked(v); push_filter('is_blocked', v); }}
            options={[
              { label: 'All', value: '' },
              { label: 'Active', value: 'false' },
              { label: 'Blocked', value: 'true' },
            ]}
          />
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-base-300 self-end" />

        {/* Gender */}
        <div>
          <FilterLabel>Gender</FilterLabel>
          <div className="flex items-center gap-1.5">
            <Users size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <select
              value={gender}
              onChange={(e) => { set_gender(e.target.value); push_filter('gender', e.target.value); }}
              className={`${select_cls} w-full sm:min-w-[120px]`}
            >
              <option value="">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* University */}
        <div>
          <FilterLabel>University</FilterLabel>
          <div className="flex items-center gap-1.5">
            <GraduationCap size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <select
              value={university}
              onChange={(e) => { set_university(e.target.value); push_filter('university_name', e.target.value); }}
              className={`${select_cls} w-full sm:min-w-[160px]`}
            >
              <option value="">Any university</option>
              {universities.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-base-300 self-end" />

        {/* Onboarding */}
        <div>
          <FilterLabel>Onboarding</FilterLabel>
          <PillGroup
            value={is_onboarded}
            onChange={(v) => { set_is_onboarded(v); push_filter('is_onboarded', v); }}
            options={[
              { label: 'Any', value: '' },
              { label: 'Done', value: 'true' },
              { label: 'Pending', value: 'false' },
            ]}
          />
        </div>

        {/* Has House */}
        <div>
          <FilterLabel>Has house</FilterLabel>
          <div className="flex items-center gap-1.5">
            <Home size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <PillGroup
              value={has_house}
              onChange={(v) => { set_has_house(v); push_filter('has_house', v); }}
              options={[
                { label: 'Any', value: '' },
                { label: 'Yes', value: 'true' },
                { label: 'No', value: 'false' },
              ]}
            />
          </div>
        </div>

        {/* Urgency */}
        <div className="col-span-2 sm:col-span-1">
          <FilterLabel>Urgency</FilterLabel>
          <div className="flex items-center gap-1.5">
            <Zap size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <PillGroup
              value={urgency}
              onChange={(v) => { set_urgency(v); push_filter('urgency', v); }}
              options={[
                { label: 'All', value: '' },
                { label: 'Not Urgent', value: 'not_urgent' },
                { label: 'Slightly Urgent', value: 'slightly_urgent' },
                { label: 'Extremely Urgent', value: 'extremely_urgent' },
                { label: 'Flexible', value: 'flexible' },
              ]}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-base-300 self-end" />

        {/* Budget Range */}
        <div>
          <FilterLabel>Budget (RWF)</FilterLabel>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              placeholder={`Min ${budget_range.min}`}
              value={budget_min}
              onChange={(e) => set_budget_min(e.target.value)}
              className="input input-bordered input-sm rounded-field font-secondary text-xs focus:border-accent focus:outline-none w-full sm:w-28"
            />
            <span className="text-base-content/30 text-xs flex-shrink-0">–</span>
            <input
              type="number"
              placeholder={`Max ${budget_range.max}`}
              value={budget_max}
              onChange={(e) => set_budget_max(e.target.value)}
              className="input input-bordered input-sm rounded-field font-secondary text-xs focus:border-accent focus:outline-none w-full sm:w-28"
            />
          </div>
        </div>

        {/* Preferred Location */}
        <div>
          <FilterLabel>Pref. Location</FilterLabel>
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <select
              value={preferred_location}
              onChange={(e) => { set_preferred_location(e.target.value); push_filter('preferred_location', e.target.value); }}
              className={`${select_cls} w-full sm:min-w-[150px]`}
            >
              <option value="">Any location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-base-300 self-end" />

        {/* Sort / Date Joined */}
        <div>
          <FilterLabel>Joined</FilterLabel>
          <div className="flex items-center gap-1.5">
            <CalendarClock size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <select
              value={sort}
              onChange={(e) => { set_sort(e.target.value); push_filter('sort', e.target.value); }}
              className={`${select_cls} w-full sm:min-w-[130px]`}
            >
              <option value="">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}
