'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { X, MapPin, Activity, ArrowUpDown, SlidersHorizontal, Home, Zap } from 'lucide-react';
import FilterLabel from '@/components/admin/shared/FilterLabel';
import PillGroup from '@/components/admin/shared/PillGroup';

// ── Main component ─────────────────────────────────────────────────────────────

export default function ListingsFilterBar({ filter_options = {} }) {
  const { price_range = { min: 0, max: 500000 }, neighborhoods = [], property_types = [], landlords = [] } = filter_options;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [is_active, set_is_active] = useState('');
  const [available_status, set_available_status] = useState('');
  const [neighborhood, set_neighborhood] = useState('');
  const [is_furnished, set_is_furnished] = useState('');
  const [max_price, set_max_price] = useState(price_range.max);
  const [sort, set_sort] = useState('');
  const [property_type, set_property_type] = useState('');
  const [bedroom_number, set_bedroom_number] = useState('');
  const [is_a_wiyorent_house, set_is_a_wiyorent_house] = useState('');
  const [landlord, set_landlord] = useState('');

  // Sync from URL on mount/change
  useEffect(() => {
    set_is_active(searchParams.get('is_active') || '');
    set_available_status(searchParams.get('available_status') || '');
    set_neighborhood(searchParams.get('neighborhood') || '');
    set_is_furnished(searchParams.get('is_furnished') || '');
    set_max_price(Number(searchParams.get('max_price')) || price_range.max);
    set_sort(searchParams.get('sort') || '');
    set_property_type(searchParams.get('property_type') || '');
    set_bedroom_number(searchParams.get('bedroom_number') || '');
    set_is_a_wiyorent_house(searchParams.get('is_a_wiyorent_house') || '');
    set_landlord(searchParams.get('landlord') || '');
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

  // Debounce max_price slider
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (max_price < price_range.max) { params.set('max_price', max_price); } else { params.delete('max_price'); }
      router.push(`${pathname}?${params.toString()}`);
    }, 400);
    return () => clearTimeout(timer);
  }, [max_price]);

  const handle_reset = () => router.replace(pathname);

  const format_price = (n) => `${new Intl.NumberFormat('rw-RW').format(n)} RWF`;

  const active_count = [is_active, available_status, neighborhood, is_furnished, sort, property_type, bedroom_number, is_a_wiyorent_house, landlord].filter(Boolean).length + (max_price < price_range.max ? 1 : 0);
  const has_active_filters = active_count > 0;

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

        {/* Availability Status */}
        <div>
          <FilterLabel>Availability</FilterLabel>
          <PillGroup
            value={available_status}
            onChange={(v) => { set_available_status(v); push_filter('available_status', v); }}
            options={[
              { label: 'All', value: '' },
              { label: 'Available', value: 'available' },
              { label: 'Booked', value: 'booked' },
            ]}
          />
        </div>

        {/* Is Active */}
        <div>
          <FilterLabel>Status</FilterLabel>
          <div className="flex items-center gap-1.5">
            <Activity size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <select
              value={is_active}
              onChange={(e) => { set_is_active(e.target.value); push_filter('is_active', e.target.value); }}
              className={`${select_cls} w-full sm:min-w-[120px]`}
            >
              <option value="">Any</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-base-300 self-end" />

        {/* Property Type */}
        <div>
          <FilterLabel>Property Type</FilterLabel>
          <div className="flex items-center gap-1.5">
            <Home size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <select
              value={property_type}
              onChange={(e) => { set_property_type(e.target.value); push_filter('property_type', e.target.value); }}
              className={`${select_cls} w-full sm:min-w-[130px]`}
            >
              <option value="">Any</option>
              {property_types.map((t) => (
                <option key={t} value={t} className="capitalize">{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Furnished */}
        <div>
          <FilterLabel>Furnishing</FilterLabel>
          <select
            value={is_furnished}
            onChange={(e) => { set_is_furnished(e.target.value); push_filter('is_furnished', e.target.value); }}
            className={`${select_cls} w-full sm:min-w-[130px]`}
          >
            <option value="">Any</option>
            <option value="true">Furnished</option>
            <option value="false">Unfurnished</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <FilterLabel>Bedrooms</FilterLabel>
          <PillGroup
            value={bedroom_number}
            onChange={(v) => { set_bedroom_number(v); push_filter('bedroom_number', v); }}
            options={[
              { label: 'Any', value: '' },
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4+', value: '4+' },
            ]}
          />
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-base-300 self-end" />

        {/* Max Price */}
        <div className="flex flex-col">
          <FilterLabel>Max price</FilterLabel>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="font-secondary text-[11px] text-base-content/40">Up to</span>
            <span className="font-secondary text-[15px] font-bold text-base-content">
              {new Intl.NumberFormat('rw-RW').format(max_price)}
            </span>
            <span className="font-secondary text-[11px] text-base-content/40">RWF/mo</span>
          </div>
          <input
            type="range"
            min={price_range.min}
            max={price_range.max}
            step={5000}
            value={max_price}
            onChange={(e) => set_max_price(Number(e.target.value))}
            className="range range-accent range-xs"
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className="font-secondary text-[10px] text-base-content/30">{format_price(price_range.min)}</span>
            <span className="font-secondary text-[10px] text-base-content/30">{format_price(price_range.max)}</span>
          </div>
        </div>

        {/* Neighborhood */}
        <div>
          <FilterLabel>Neighborhood</FilterLabel>
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
            <select
              value={neighborhood}
              onChange={(e) => { set_neighborhood(e.target.value); push_filter('neighborhood', e.target.value); }}
              className={`${select_cls} w-full sm:min-w-[150px]`}
            >
              <option value="">All</option>
              {neighborhoods.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-base-300 self-end" />

        {/* WiyoRent Verified */}
        <div>
          <FilterLabel>WiyoRent House</FilterLabel>
          <PillGroup
            value={is_a_wiyorent_house}
            onChange={(v) => { set_is_a_wiyorent_house(v); push_filter('is_a_wiyorent_house', v); }}
            options={[
              { label: 'All', value: '' },
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ]}
          />
        </div>

        {/* Landlord */}
        <div>
          <FilterLabel>Landlord</FilterLabel>
          <select
            value={landlord}
            onChange={(e) => { set_landlord(e.target.value); push_filter('landlord', e.target.value); }}
            className={`${select_cls} w-full sm:min-w-[160px]`}
          >
            <option value="">All landlords</option>
            {landlords.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-base-300 self-end" />

        {/* Sort */}
        <div>
          <FilterLabel>Listed</FilterLabel>
          <div className="flex items-center gap-1.5">
            <ArrowUpDown size={13} className="text-base-content/30 flex-shrink-0 mb-0.5" />
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
