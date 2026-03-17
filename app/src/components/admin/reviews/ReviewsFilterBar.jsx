'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { X, SlidersHorizontal, Star, Search, Calendar } from 'lucide-react';
import FilterLabel from '@/components/admin/shared/FilterLabel';
import PillGroup from '@/components/admin/shared/PillGroup';

// ── Main component ─────────────────────────────────────────────────────────────

export default function ReviewsFilterBar({ total_count = 0 }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [status_filter, set_status_filter] = useState('pending');
  const [rating_filter, set_rating_filter] = useState('');
  const [search, set_search] = useState('');
  const [date_from, set_date_from] = useState('');
  const [date_to, set_date_to] = useState('');

  // Sync from URL on mount/change
  useEffect(() => {
    set_status_filter(searchParams.get('status') || 'pending');
    set_rating_filter(searchParams.get('rating') || '');
    set_search(searchParams.get('search') || '');
    set_date_from(searchParams.get('date_from') || '');
    set_date_to(searchParams.get('date_to') || '');
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

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) { params.set('search', search); } else { params.delete('search'); }
      router.push(`${pathname}?${params.toString()}`);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Clear all resets to pending queue (not bare pathname)
  const handle_reset = () => {
    router.push(`${pathname}?status=pending`);
  };

  const active_count = [
    status_filter !== 'pending' ? status_filter : '',
    rating_filter,
    search,
    date_from,
    date_to,
  ].filter(Boolean).length;
  const has_active_filters = active_count > 0 || status_filter !== 'pending';

  const select_cls = 'select select-bordered select-sm rounded-field font-secondary text-xs focus:border-accent focus:outline-none';

  return (
    <div className="bg-base-100 border border-base-300 rounded-xl mb-6 overflow-hidden shadow-sm">

      {/* ── Header bar ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-base-200/60 border-b border-base-300">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={13} className="text-base-content/40" />
          <span className="font-primary text-[10px] uppercase tracking-widest font-bold text-base-content/40">
            Filters
          </span>
          {status_filter && status_filter !== 'all' && (
            <span className="bg-accent text-accent-content font-primary text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm tracking-wide capitalize">
              {status_filter}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-secondary text-[10px] uppercase font-bold tracking-widest text-base-content/40">
            {total_count} {total_count === 1 ? 'review' : 'reviews'}
          </span>
          {has_active_filters && (
            <button
              onClick={handle_reset}
              className="flex items-center gap-1 font-primary text-[9px] uppercase tracking-widest font-bold text-error/70 hover:text-error transition-colors"
            >
              <X size={10} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* ── Filter controls ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-end gap-4 sm:gap-x-5 sm:gap-y-3 px-4 py-3.5">

        {/* Moderation status */}
        <div className="col-span-2 sm:col-span-1">
          <FilterLabel>Status</FilterLabel>
          <PillGroup
            value={status_filter}
            onChange={(v) => { set_status_filter(v); push_filter('status', v); }}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'Approved', value: 'approved' },
              { label: 'Rejected', value: 'rejected' },
            ]}
          />
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-base-300 self-end" />

        {/* Star rating */}
        <div>
          <FilterLabel>Rating</FilterLabel>
          <div className="flex items-center gap-1.5">
            <Star size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <select
              value={rating_filter}
              onChange={(e) => { set_rating_filter(e.target.value); push_filter('rating', e.target.value); }}
              className={`${select_cls} w-full sm:min-w-[120px]`}
            >
              <option value="">Any</option>
              <option value="5">5 ★</option>
              <option value="4">4 ★</option>
              <option value="3">3 ★</option>
              <option value="2">2 ★</option>
              <option value="1">1 ★</option>
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-base-300 self-end" />

        {/* Search */}
        <div>
          <FilterLabel>Search</FilterLabel>
          <div className="flex items-center gap-1.5">
            <Search size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <input
              type="text"
              placeholder="Reviewer or property..."
              value={search}
              onChange={(e) => set_search(e.target.value)}
              className="input input-bordered input-sm rounded-field font-secondary text-xs focus:border-accent focus:outline-none w-full sm:w-48"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-base-300 self-end" />

        {/* Date range */}
        <div>
          <FilterLabel>Date range</FilterLabel>
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <input
              type="date"
              value={date_from}
              onChange={(e) => { set_date_from(e.target.value); push_filter('date_from', e.target.value); }}
              className="input input-bordered input-sm rounded-field font-secondary text-xs focus:border-accent focus:outline-none w-full sm:w-36"
            />
            <span className="text-base-content/30 text-xs flex-shrink-0">–</span>
            <input
              type="date"
              value={date_to}
              min={date_from || undefined}
              onChange={(e) => { set_date_to(e.target.value); push_filter('date_to', e.target.value); }}
              className="input input-bordered input-sm rounded-field font-secondary text-xs focus:border-accent focus:outline-none w-full sm:w-36"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
