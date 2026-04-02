'use client';

import { useEffect, useState } from 'react';
import { SlidersHorizontal, X, Bed, Users } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import FilterSection from '@/components/public/shared/FilterSection';
import FilterTooltip from '@/components/public/shared/FilterTooltip';
import { formatRWF, formatRWFNumber } from '@/lib/formatRWF';

const LABEL_CLS = "font-secondary text-[11px] font-semibold text-base-content/50 tracking-wide";

const WIYORENT_TIP = "WiyoRent Houses are properties managed directly by WiyoRent — no commission fee. You only pay rent directly, no hidden charges. Non-WiyoRent listings are privately managed and may include a commission fee on top of the rent.";

// Shared pill button style
const pill_cls = (is_active) =>
  `px-3 py-1.5 rounded-full font-secondary text-xs font-bold transition-all duration-150 border ${
    is_active
      ? 'bg-accent border-accent text-accent-content shadow-sm'
      : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent/60 hover:text-accent'
  }`;

export default function FilterSidebar({ filter_options }) {
  const { price_range, neighborhoods, furnishing_options, availability_options } =
    filter_options;

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [price_max, set_price_max] = useState(price_range.max);
  const [selected_neighborhoods, set_selected_neighborhoods] = useState([]);
  const [selected_furnishing, set_selected_furnishing] = useState('furnished');
  const [selected_availability, set_selected_availability] = useState(false);
  const [bedrooms, set_bedrooms] = useState(null);
  const [max_roommates, set_max_roommates] = useState(null);
  const [wiyorent_only, set_wiyorent_only] = useState(false);
  const [available_from, set_available_from] = useState('');
  const [is_mobile_open, set_is_mobile_open] = useState(false);

  // ── Section open state ──────────────────────────────────────────────────────
  const [type_loc_open, set_type_loc_open] = useState(true);
  const [pricing_open, set_pricing_open] = useState(true);
  const [prefs_open, set_prefs_open] = useState(false);
  const [avail_open, set_avail_open] = useState(false);

  const parse_pill = (val) => val ? (val === '4+' ? '4+' : Number(val)) : null

  useEffect(() => {
    set_price_max(Number(searchParams.get('max')) || price_range.max)
    set_wiyorent_only(searchParams.get('wiyorent_only') === 'true')
    set_selected_availability(searchParams.get('available_only') === 'true')
    set_available_from(searchParams.get('available_from') || '')
    set_selected_furnishing(searchParams.get('furnished_status') || 'furnished')
    set_bedrooms(parse_pill(searchParams.get('bedrooms')))
    set_max_roommates(parse_pill(searchParams.get('max_roommates')))
    set_selected_neighborhoods(searchParams.getAll('neighborhood') || [])
  }, [searchParams])

  // ── Active filter counts per group (for dot indicators) ────────────────────
  const type_loc_active =
    (wiyorent_only ? 1 : 0) +
    selected_neighborhoods.length;

  const pricing_active =
    price_max !== price_range.max ? 1 : 0;

  const prefs_active =
    (selected_furnishing !== 'furnished' ? 1 : 0) +
    (selected_availability ? 1 : 0) +
    (bedrooms !== null ? 1 : 0) +
    (max_roommates !== null ? 1 : 0);

  const avail_active = available_from !== '' ? 1 : 0;

  const total_active = type_loc_active + pricing_active + prefs_active + avail_active;

  const has_active_filters =
    price_max !== price_range.max ||
    selected_neighborhoods.length > 0 ||
    selected_furnishing !== '' ||
    selected_availability ||
    bedrooms !== null ||
    max_roommates !== null ||
    wiyorent_only ||
    available_from !== '';

  const handle_reset = () => {
    set_price_max(price_range.max);
    set_selected_neighborhoods([]);
    set_selected_furnishing('furnished');
    set_selected_availability(false);
    set_bedrooms(null);
    set_max_roommates(null);
    set_wiyorent_only(false);
    set_available_from('');
    router.replace(pathname, {scroll: false})
  };

  const handle_apply = () => {
    const param = new URLSearchParams()

    if (price_max !== price_range.max) param.set('max', price_max)
    if (wiyorent_only) param.set('wiyorent_only', true)
    if (selected_availability) param.set('available_only', true)
    if (bedrooms !== null) param.set('bedrooms', bedrooms)
    if (max_roommates !== null) param.set('max_roommates', max_roommates)
    if (selected_furnishing) param.set('furnished_status', selected_furnishing)
    if (selected_neighborhoods.length > 0) {
      selected_neighborhoods.forEach(n => param.append('neighborhood', n))
    }
    if (available_from) param.set('available_from', available_from)

    set_is_mobile_open(false)
    router.push(`?${param.toString()}`)
  }

  // ── Filter groups (shared between mobile + desktop) ─────────────────────────
  const filter_groups = (
    <div className="divide-y divide-base-200">

      {/* ── Group 1: Type & Location ────────────────────────── */}
      <FilterSection
        title="Type & Location"
        is_open={type_loc_open}
        on_toggle={() => set_type_loc_open(v => !v)}
        active_count={type_loc_active}
      >
        {/* WiyoRent Houses Only */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={LABEL_CLS}>WiyoRent Houses</span>
            <FilterTooltip text={WIYORENT_TIP} />
          </div>
          <input
            type="checkbox"
            checked={wiyorent_only}
            onChange={(e) => set_wiyorent_only(e.target.checked)}
            className="toggle toggle-accent toggle-sm"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <label className={LABEL_CLS}>Location</label>
          <div className="flex flex-wrap gap-2">
            {neighborhoods.map((neighborhood) => {
              const is_selected = selected_neighborhoods?.includes(neighborhood);
              return (
                <button
                  key={neighborhood}
                  onClick={() =>
                    set_selected_neighborhoods((prev) =>
                      is_selected
                        ? prev.filter((n) => n !== neighborhood)
                        : [...prev, neighborhood]
                    )
                  }
                  className={pill_cls(is_selected)}
                >
                  {neighborhood}
                </button>
              );
            })}
          </div>
        </div>
      </FilterSection>

      {/* ── Group 2: Pricing ────────────────────────────────── */}
      <FilterSection
        title="Pricing"
        is_open={pricing_open}
        on_toggle={() => set_pricing_open(v => !v)}
        active_count={pricing_active}
      >
        <div className="flex flex-col">
          <label className={LABEL_CLS}>Max budget</label>
          <div className="flex items-baseline gap-1.5 mb-2 mt-1">
            <span className="font-secondary text-[11px] text-base-content/40">Up to</span>
            <span className="font-secondary text-[15px] font-bold text-base-content">
              {formatRWFNumber(price_max)}
            </span>
            <span className="font-secondary text-[11px] text-base-content/40">RWF/mo</span>
          </div>
          <input
            type="range"
            min={price_range.min}
            max={price_range.max}
            step={5000}
            value={price_max}
            onChange={(e) => set_price_max(Number(e.target.value))}
            className="range range-accent range-xs"
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className="font-secondary text-[10px] text-base-content/30">{formatRWF(price_range.min)}</span>
            <span className="font-secondary text-[10px] text-base-content/30">{formatRWF(price_range.max)}</span>
          </div>
        </div>
      </FilterSection>

      {/* ── Group 3: Preferences ────────────────────────────── */}
      <FilterSection
        title="Preferences"
        is_open={prefs_open}
        on_toggle={() => set_prefs_open(v => !v)}
        active_count={prefs_active}
      >
        {/* Furnished */}
        <div className="flex items-center justify-between gap-3">
          <span className={LABEL_CLS}>
            {selected_furnishing === 'furnished' ? 'Furnished' : selected_furnishing === 'unfurnished' ? 'Unfurnished' : 'Furnishing'}
          </span>
          <input
            type="checkbox"
            checked={selected_furnishing === 'furnished'}
            onChange={(e) => set_selected_furnishing(e.target.checked ? 'furnished' : 'unfurnished')}
            className="toggle toggle-accent toggle-sm"
          />
        </div>

        {/* Available Now */}
        <div className="flex items-center justify-between gap-3">
          <span className={LABEL_CLS}>Available Now</span>
          <input
            type="checkbox"
            checked={selected_availability}
            onChange={(e) => set_selected_availability(e.target.checked)}
            className="toggle toggle-accent toggle-sm"
          />
        </div>

        {/* Bedrooms */}
        <div className="flex flex-col gap-2">
          <label className={`${LABEL_CLS} flex items-center gap-1.5`}>
            <Bed size={12} className="text-base-content/40" /> Bedrooms
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, '4+'].map((num) => (
              <button
                key={num}
                onClick={() => set_bedrooms(num === bedrooms ? null : num)}
                className={`flex-1 py-2 rounded-full font-secondary text-xs font-bold transition-all duration-150 border ${
                  bedrooms === num
                  ? 'bg-accent border-accent text-accent-content shadow-sm'
                  : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent/60 hover:text-accent'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Max Roommates */}
        <div className="flex flex-col gap-2">
          <label className={`${LABEL_CLS} flex items-center gap-1.5`}>
            <Users size={12} className="text-base-content/40" /> Max Roommates
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, '4+'].map((num) => (
              <button
                key={num}
                onClick={() => set_max_roommates(num === max_roommates ? null : num)}
                className={`flex-1 py-2 rounded-full font-secondary text-xs font-bold transition-all duration-150 border ${
                  max_roommates === num
                  ? 'bg-accent border-accent text-accent-content shadow-sm'
                  : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent/60 hover:text-accent'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* ── Group 4: Availability ───────────────────────────── */}
      <FilterSection
        title="Availability"
        is_open={avail_open}
        on_toggle={() => set_avail_open(v => !v)}
        active_count={avail_active}
      >
        <div className="flex flex-col gap-2">
          <label className={LABEL_CLS}>Available From</label>
          <input
            type="date"
            value={available_from}
            min={new Date().toISOString()?.split('T')[0]}
            onChange={(e) => set_available_from(e.target.value)}
            className="input input-bordered w-full rounded-xl font-secondary text-sm bg-base-100 focus:border-accent"
          />
          {available_from && (
            <button
              onClick={() => set_available_from('')}
              className="flex items-center gap-1 text-xs font-secondary text-base-content/40 hover:text-error transition-colors self-start"
            >
              <X size={11} /> Clear date
            </button>
          )}
        </div>
      </FilterSection>

    </div>
  );

  // ── Shared header ───────────────────────────────────────────────────────────
  const sidebar_header = (
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={16} className="text-accent" />
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-wide">
          Filter By
        </h2>
        {has_active_filters && (
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-accent-content text-[10px] font-extrabold font-primary">
            {total_active}
          </span>
        )}
      </div>
      {has_active_filters && (
        <button
          onClick={handle_reset}
          className="flex items-center gap-1 text-xs font-secondary text-base-content/40 hover:text-error transition-colors"
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
          className="btn btn-outline btn-accent w-full rounded-full font-primary font-bold text-sm uppercase tracking-wide gap-2 bg-base-100 hover:bg-accent hover:text-accent-content hover:border-accent transition-colors duration-200"
        >
          <SlidersHorizontal size={16} />
          Filters
          {has_active_filters && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-accent-content text-[10px] font-extrabold">
              {total_active}
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
                <SlidersHorizontal size={16} className="text-accent" />
                <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-wide">
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
            <div className="flex-shrink-0 px-5 py-4 border-t border-base-200 bg-base-100 flex flex-col gap-2">
              {has_active_filters && (
                <button
                  onClick={handle_reset}
                  className="btn btn-ghost btn-sm w-full rounded-full font-primary font-bold text-xs uppercase tracking-widest text-error border border-error/30 hover:bg-error/5"
                >
                  <X size={13} /> Reset All
                </button>
              )}
              <button
                onClick={handle_apply}
                className="btn btn-accent w-full rounded-full font-primary font-extrabold text-sm uppercase tracking-wider shadow-md hover:shadow-accent/20 transition-all active:scale-95"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop sidebar ─────────────────────────────────────────────────── */}
      <div className="hidden lg:block max-h-[calc(100vh-3rem)] overflow-y-auto sidebar-scroll">
        <div className="bg-base-100 rounded-2xl shadow-md p-6 border-t-4 border-accent overflow-visible">
          {sidebar_header}
          {filter_groups}
          <div className="pt-4">
            <button
              onClick={handle_apply}
              className="btn btn-accent w-full rounded-full font-primary font-extrabold text-sm uppercase tracking-wider mt-2 shadow-md hover:shadow-accent/20 transition-all active:scale-95"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
