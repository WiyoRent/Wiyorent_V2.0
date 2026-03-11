'use client';

import { useEffect, useState } from 'react';
import { SlidersHorizontal, X, Bed, Users, Info } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const format_price = (value) =>
  `RWF ${new Intl.NumberFormat('rw-RW').format(value)}`;

export default function FilterSidebar({ filter_options }) {
  const { price_range, neighborhoods, furnishing_options, availability_options } =
    filter_options;

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // Existing State
  const [price_min, set_price_min] = useState(price_range.min);
  const [price_max, set_price_max] = useState(price_range.max);
  const [selected_neighborhoods, set_selected_neighborhoods] = useState([]);
  const [selected_furnishing, set_selected_furnishing] = useState('furnished');
  const [selected_availability, set_selected_availability] = useState('');
  const [bedrooms, set_bedrooms] = useState(null); // null, 1, 2, 3, 4+
  const [max_roommates, set_max_roommates] = useState(null); // null, 1, 2, 3, 4+
  const [wiyorent_only, set_wiyorent_only] = useState(false);
  const [is_mobile_open, set_is_mobile_open] = useState(false);

  const parse_pill = (val) => val ? (val === '4+' ? '4+' : Number(val)) : null

  useEffect(() => {
    set_price_min(Number(searchParams.get('min')) || price_range.min)
    set_price_max(Number(searchParams.get('max')) || price_range.max)
    set_wiyorent_only(searchParams.get('wiyorent_only') === 'true')
    set_selected_furnishing(searchParams.get('furnished_status') || '')
    set_bedrooms(parse_pill(searchParams.get('bedrooms')))
    set_max_roommates(parse_pill(searchParams.get('max_roommates')))
    set_selected_neighborhoods(searchParams.getAll('neighborhood') || [])
  }, [searchParams])

  const has_active_filters =
    price_min !== price_range.min ||
    price_max !== price_range.max ||
    selected_neighborhoods.length > 0 ||
    selected_furnishing !== '' ||
    selected_availability !== '' ||
    bedrooms !== null ||
    max_roommates !== null ||
    wiyorent_only;

  const handle_reset = () => {
    set_price_min(price_range.min);
    set_price_max(price_range.max);
    set_selected_neighborhoods([]);
    set_selected_furnishing('');
    set_selected_availability('');
    set_bedrooms(null);
    set_max_roommates(null);
    set_wiyorent_only(false);

    router.replace(pathname, {scroll: false})
  };

    const handle_apply = () => {
      const param = new URLSearchParams() 

      if (price_min !== price_range.min) param.set('min', price_min)
      if (price_max !== price_range.max) param.set('max', price_max)
      if (wiyorent_only) param.set('wiyorent_only', true)
      if (bedrooms !== null) param.set('bedrooms', bedrooms)
      if (max_roommates !== null) param.set('max_roommates', max_roommates)
      if (selected_furnishing) param.set('furnished_status', selected_furnishing)
      if (selected_neighborhoods.length > 0) {
        selected_neighborhoods.forEach(n => param.append('neighborhood', n))
      }

      console.log('Applying filters:', {
        price_min,
        price_max,
        neighborhoods: selected_neighborhoods,
        furnishing: selected_furnishing,
        availability: selected_availability,
        bedrooms,
        max_roommates,
        wiyorent_only,
      });

      set_is_mobile_open(false)
      router.push(`?${param.toString()}`)
    }

  const filter_content = (
    <div className="flex flex-col gap-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-accent" />
          <h2 className="font-primary text-lg font-extrabold text-base-content uppercase tracking-wide">
            Filter By
          </h2>
        </div>
        {has_active_filters && (
          <button
            onClick={handle_reset}
            className="flex items-center gap-1 text-xs font-secondary text-base-content/50 hover:text-error transition-colors"
          >
            <X size={12} />
            Reset
          </button>
        )}
      </div>

      <div className="border-t border-base-300" />

      {/* WiyoRent Houses Only */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
            WiyoRent Houses
          </span>
          <div className="z-50 tooltip tooltip-left lg:tooltip-bottom" data-tip="WiyoRent Houses are properties managed directly by WiyoRent — no agency or commission fee. You pay rent only, with no hidden charges. Non-WiyoRent listings are privately managed and may include a commission fee on top of the rent.">
            <Info size={14} className="text-base-content/40 hover:text-accent cursor-help transition-colors" />
          </div>
        </div>
        <input
          type="checkbox"
          checked={wiyorent_only}
          onChange={(e) => set_wiyorent_only(e.target.checked)}
          className="toggle toggle-accent toggle-sm"
        />
      </div>

      {/* Furnishing */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
            {selected_furnishing === 'furnished' ? 'Furnished' : selected_furnishing === 'unfurnished' ? 'Unfurnished' : 'Furnishing'}
          </span>
          <input
            type="checkbox"
            checked={selected_furnishing === 'furnished'}
            onChange={(e) => set_selected_furnishing(e.target.checked ? 'furnished' : 'unfurnished')}
            className="toggle toggle-accent toggle-sm"
          />
        </div>

      </div>

      <div className="border-t border-base-300" />

      {/* Price Range */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
          Price Range (RWF)
        </label>
        <div className="flex flex-col gap-1">
          <input
            type="range"
            min={price_range.min}
            max={price_range.max}
            step={5000}
            value={price_min}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val <= price_max) set_price_min(val);
            }}
            className="range range-accent range-xs"
          />
          <input
            type="range"
            min={price_range.min}
            max={price_range.max}
            step={5000}
            value={price_max}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= price_min) set_price_max(val);
            }}
            className="range range-accent range-xs mt-2"
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="font-secondary text-[10px] font-bold text-accent-content bg-accent px-2 py-1 rounded shadow-sm">
            {format_price(price_min)}
          </span>
          <span className="font-secondary text-[10px] font-bold text-accent-content bg-accent px-2 py-1 rounded shadow-sm">
            {format_price(price_max)}
          </span>
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* Bedrooms - Pill Selector */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide flex items-center gap-2">
          <Bed size={14} className="text-accent" /> Bedrooms
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, '4+'].map((num) => (
            <button
              key={num}
              onClick={() => set_bedrooms(num === bedrooms ? null : num)}
              className={`flex-1 py-2 rounded-field font-secondary text-xs font-bold transition-all border ${
                bedrooms === num 
                ? 'bg-accent border-accent text-accent-content shadow-md' 
                : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent hover:text-accent'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* Max Roommates - Pill Selector */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide flex items-center gap-2">
          <Users size={14} className="text-accent" /> Max Roommates
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, '4+'].map((num) => (
            <button
              key={num}
              onClick={() => set_max_roommates(num === max_roommates ? null : num)}
              className={`flex-1 py-2 rounded-field font-secondary text-xs font-bold transition-all border ${
                max_roommates === num 
                ? 'bg-accent border-accent text-accent-content shadow-md' 
                : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent hover:text-accent'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-base-300" />

      {/* Location */}
      <div className="flex flex-col gap-3">
        <label className="font-primary text-sm font-bold text-base-content uppercase tracking-wide">
          Location
        </label>
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
                className={`px-3 py-1.5 rounded-field font-secondary text-xs font-bold transition-all border ${
                  is_selected
                    ? 'bg-accent border-accent text-accent-content shadow-md'
                    : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent hover:text-accent'
                }`}
              >
                {neighborhood}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-base-300" />

      

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
      <div className="lg:hidden mb-4">
        <button
          onClick={() => set_is_mobile_open(true)}
          className="btn btn-outline btn-accent w-full rounded-field font-primary font-bold text-sm uppercase tracking-wide gap-2 bg-base-100"
        >
          <SlidersHorizontal size={16} />
          Filters
          {has_active_filters && (
            <span className="badge badge-accent badge-sm font-bold">!</span>
          )}
        </button>
      </div>

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
            {filter_content}
          </div>
        </div>
      )}

      <div className="hidden lg:block sticky top-6">
        <div className="bg-base-100 rounded-box shadow-md p-6 border-t-4 border-accent">
          {filter_content}
        </div>
      </div>
    </>
  );
}