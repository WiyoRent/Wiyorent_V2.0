'use client';

import { Search, X, MapPin, Activity } from 'lucide-react';

export default function ListingsFilterBar({ 
  search_query, 
  set_search_query, 
  status_filter, 
  set_status_filter, 
  neighborhood_filter, 
  set_neighborhood_filter,
  available_neighborhoods,
  total_results
}) {
  
  const has_active_filters = search_query !== '' || status_filter !== 'all' || neighborhood_filter !== 'all';

  const handle_reset = () => {
    set_search_query('');
    set_status_filter('all');
    set_neighborhood_filter('all');
  };

  return (
    <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-300 flex flex-col gap-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" size={18} />
          <input
            type="text"
            placeholder="Search by property name or ID..."
            value={search_query}
            onChange={(e) => set_search_query(e.target.value)}
            className="input input-bordered w-full pl-10 rounded-field font-secondary text-sm focus:border-accent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Neighborhood Filter */}
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-base-content/40" />
            <select 
              className="select select-bordered select-sm rounded-field font-secondary text-xs focus:border-accent min-w-[150px]"
              value={neighborhood_filter}
              onChange={(e) => set_neighborhood_filter(e.target.value)}
            >
              <option value="all">All Neighborhoods</option>
              {available_neighborhoods.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-base-content/40" />
            <select 
              className="select select-bordered select-sm rounded-field font-secondary text-xs focus:border-accent min-w-[130px]"
              value={status_filter}
              onChange={(e) => set_status_filter(e.target.value)}
            >
              <option value="all">Any Status</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          {/* Reset Button */}
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
      
      <div className="flex items-center justify-between px-1">
        <span className="font-secondary text-[10px] uppercase font-bold tracking-widest text-base-content/40">
          Showing {total_results} properties
        </span>
      </div>
    </div>
  );
}