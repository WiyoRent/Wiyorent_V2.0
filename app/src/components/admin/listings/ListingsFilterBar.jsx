'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { X, MapPin, Activity, ArrowUpDown } from 'lucide-react';

const NEIGHBORHOODS = ['Kicukiro', 'Nyarugenge', 'Gasabo', 'Zindiro', 'Kimironko', 'Remera', 'Gisozi', 'Gikondo'];

export default function ListingsFilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [status_filter, set_status_filter] = useState('');
  const [neighborhood_filter, set_neighborhood_filter] = useState('');
  const [is_furnished_filter, set_is_furnished_filter] = useState('');
  const [min_price, set_min_price] = useState('');
  const [max_price, set_max_price] = useState('');
  const [sort, set_sort] = useState('');

  // Sync from URL on mount/change
  useEffect(() => {
    set_status_filter(searchParams.get('is_active') || '');
    set_neighborhood_filter(searchParams.get('neighborhood') || '');
    set_is_furnished_filter(searchParams.get('is_furnished') || '');
    set_min_price(searchParams.get('min_price') || '');
    set_max_price(searchParams.get('max_price') || '');
    set_sort(searchParams.get('sort') || '');
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

  // Price inputs debounced
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (min_price) { params.set('min_price', min_price); } else { params.delete('min_price'); }
      if (max_price) { params.set('max_price', max_price); } else { params.delete('max_price'); }
      router.push(`${pathname}?${params.toString()}`);
    }, 400);
    return () => clearTimeout(timer);
  }, [min_price, max_price]);

  const handle_reset = () => router.replace(pathname);

  const has_active_filters = !!(status_filter || neighborhood_filter || is_furnished_filter || min_price || max_price || sort);

  return (
    <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-300 flex flex-col gap-4 mb-6">
      <div className="flex flex-wrap items-center gap-3">

        {/* Status */}
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-base-content/40" />
          <select
            value={status_filter}
            onChange={(e) => { set_status_filter(e.target.value); push_filter('is_active', e.target.value); }}
            className="select select-bordered select-sm rounded-field font-secondary text-xs focus:border-accent min-w-[130px]"
          >
            <option value="">Any Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Neighborhood */}
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-base-content/40" />
          <select
            value={neighborhood_filter}
            onChange={(e) => { set_neighborhood_filter(e.target.value); push_filter('neighborhood', e.target.value); }}
            className="select select-bordered select-sm rounded-field font-secondary text-xs focus:border-accent min-w-[150px]"
          >
            <option value="">All Neighborhoods</option>
            {NEIGHBORHOODS.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Furnished */}
        <select
          value={is_furnished_filter}
          onChange={(e) => { set_is_furnished_filter(e.target.value); push_filter('is_furnished', e.target.value); }}
          className="select select-bordered select-sm rounded-field font-secondary text-xs focus:border-accent min-w-[130px]"
        >
          <option value="">Any Furnishing</option>
          <option value="true">Furnished</option>
          <option value="false">Unfurnished</option>
        </select>

        {/* Price Range */}
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            placeholder="Min price"
            value={min_price}
            onChange={(e) => set_min_price(e.target.value)}
            className="input input-bordered input-sm rounded-field font-secondary text-xs w-28 focus:border-accent"
          />
          <span className="text-base-content/30 text-xs">–</span>
          <input
            type="number"
            placeholder="Max price"
            value={max_price}
            onChange={(e) => set_max_price(e.target.value)}
            className="input input-bordered input-sm rounded-field font-secondary text-xs w-28 focus:border-accent"
          />
        </div>

        {/* Date Listed */}
        <div className="flex items-center gap-2">
          <ArrowUpDown size={16} className="text-base-content/40" />
          <select
            value={sort}
            onChange={(e) => { set_sort(e.target.value); push_filter('sort', e.target.value); }}
            className="select select-bordered select-sm rounded-field font-secondary text-xs focus:border-accent min-w-[150px]"
          >
            <option value="">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Reset */}
        {has_active_filters && (
          <button
            onClick={handle_reset}
            className="btn btn-ghost btn-sm rounded-field text-error gap-1 uppercase text-[10px] font-bold tracking-widest"
          >
            <X size={14} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}
