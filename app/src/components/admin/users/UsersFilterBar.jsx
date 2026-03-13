'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { X, SlidersHorizontal, ShieldCheck, Users, GraduationCap, CalendarClock, Home, Zap } from 'lucide-react';

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
    <div className="flex items-center">
      {options.map(({ label, value: v }, i) => (
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

export default function UsersFilterBar() {
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

  // Debounce university text input
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (university) {
        params.set('university_name', university);
      } else {
        params.delete('university_name');
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [university]);

  const handle_reset = () => router.replace(pathname);

  const active_count = [verification_status, gender, university, has_house, is_onboarded, sort, is_blocked, urgency].filter(Boolean).length;
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
      <div className="flex flex-wrap items-end gap-x-5 gap-y-3 px-4 py-3.5">

        {/* Verification Status */}
        <div>
          <FilterLabel>Verification</FilterLabel>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <select
              value={verification_status}
              onChange={(e) => { set_verification_status(e.target.value); push_filter('verification_status', e.target.value); }}
              className={`${select_cls} min-w-[140px]`}
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
              className={`${select_cls} min-w-[120px]`}
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
            <input
              type="text"
              placeholder="Search..."
              value={university}
              onChange={(e) => set_university(e.target.value)}
              className="input input-bordered input-sm rounded-field font-secondary text-xs focus:border-accent focus:outline-none w-40"
            />
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
        <div>
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

        {/* Sort / Date Joined */}
        <div>
          <FilterLabel>Joined</FilterLabel>
          <div className="flex items-center gap-1.5">
            <CalendarClock size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <select
              value={sort}
              onChange={(e) => { set_sort(e.target.value); push_filter('sort', e.target.value); }}
              className={`${select_cls} min-w-[130px]`}
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
