'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Activity, Star, X } from 'lucide-react';

export default function ReviewsFilterBar({ total_count = 0 }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [status_filter, set_status_filter] = useState('');
  const [rating_filter, set_rating_filter] = useState('');

  // Sync from URL on mount/change
  useEffect(() => {
    set_status_filter(searchParams.get('status') || '');
    set_rating_filter(searchParams.get('rating') || '');
  }, [searchParams]);

  const push_filter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handle_status_change = (val) => {
    set_status_filter(val);
    push_filter('status', val);
  };

  const handle_rating_change = (val) => {
    set_rating_filter(val);
    push_filter('rating', val);
  };

  const handle_reset = () => router.replace(pathname);

  const has_active_filters = !!(status_filter || rating_filter);

  return (
    <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-300 flex flex-col gap-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">

          {/* Status */}
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-base-content/40" />
            <select
              value={status_filter}
              onChange={(e) => handle_status_change(e.target.value)}
              className="select select-bordered select-sm rounded-field font-secondary text-xs focus:border-accent min-w-[140px]"
            >
              <option value="">Any Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Star size={16} className="text-base-content/40" />
            <select
              value={rating_filter}
              onChange={(e) => handle_rating_change(e.target.value)}
              className="select select-bordered select-sm rounded-field font-secondary text-xs focus:border-accent min-w-[120px]"
            >
              <option value="">Any Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
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

      <div className="flex items-center px-1">
        <span className="font-secondary text-[10px] uppercase font-bold tracking-widest text-base-content/40">
          Showing {total_count} reviews
        </span>
      </div>
    </div>
  );
}
