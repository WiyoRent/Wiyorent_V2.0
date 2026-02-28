'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import StarRating from '@/components/public/listing/ReviewSectionComponents/StarRating';
import StatusBadge from '@/components/public/listing/ReviewSectionComponents/StatusBadge';

export default function ReviewCard({ entry, current_user_id, on_edit, on_delete }) {
  // ── Ownership check ──────────────────────────────────────────────────────────
  // Backend returns `reviewer_id`. Fall back to `user_id` defensively.
  const is_mine =
    !!current_user_id &&
    !!(entry.reviewer_id || entry.user_id) &&
    (entry.reviewer_id ?? entry.user_id) === current_user_id;

  const [confirming_delete, set_confirming_delete] = useState(false);

  const formatted_date = entry.date
    ? new Date(entry.date).toLocaleDateString('en-RW', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Just now';

  const initials = (entry.name ?? '??')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex gap-3 py-4 border-b border-base-200 last:border-0 transition-opacity duration-300 ${
        entry._optimistic ? 'opacity-70' : 'opacity-100'
      }`}
    >
      {/* ── Avatar ───────────────────────────────────────────────────────────── */}
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
        {entry.avatar ? (
          <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
        ) : (
          <span className="font-primary text-sm font-bold text-primary-content">{initials}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        {/* ── Top row ──────────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-2 flex-wrap">

          <div className="flex flex-col gap-1">
            {/* Name + approval badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-primary text-sm font-bold text-base-content">
                {entry.name}
              </span>
              {/* Badge visible to the author for any status; to others only for approved */}
              {entry.is_approved && (is_mine || entry.is_approved === 'approved') && (
                <StatusBadge status={entry.is_approved} />
              )}
            </div>
            <StarRating rating={entry.rating} size={12} />
          </div>

          {/* Date + edit/delete — suppressed while optimistic (not yet saved) */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="font-secondary text-xs text-base-content/40">{formatted_date}</span>

            {is_mine && !entry._optimistic && (
              <>
                <button
                  onClick={() => on_edit(entry)}
                  className="btn btn-ghost btn-xs text-base-content/40 hover:text-accent"
                  title="Edit review"
                >
                  <Pencil size={13} />
                </button>

                {!confirming_delete ? (
                  <button
                    onClick={() => set_confirming_delete(true)}
                    className="btn btn-ghost btn-xs text-base-content/40 hover:text-error"
                    title="Delete review"
                  >
                    <Trash2 size={13} />
                  </button>
                ) : (
                  <div className="flex items-center gap-1 animate-in fade-in duration-150">
                    <span className="font-secondary text-[10px] text-error">Delete?</span>
                    <button
                      onClick={() => {
                        on_delete(entry.id);
                        set_confirming_delete(false);
                      }}
                      className="btn btn-error btn-xs h-6 min-h-0 text-[10px]"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => set_confirming_delete(false)}
                      className="btn btn-ghost btn-xs h-6 min-h-0 text-[10px]"
                    >
                      No
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ── Comment ────────────────────────────────────────────────────────── */}
        <p className="mt-2 font-secondary text-sm text-base-content/65 leading-relaxed">
          {entry.comment}
        </p>

        {/* ── Optimistic saving indicator ───────────────────────────────────── */}
        {entry._optimistic && (
          <p className="mt-1 font-secondary text-[10px] text-base-content/35 italic flex items-center gap-1">
            <span className="loading loading-spinner loading-xs" />
            Saving…
          </p>
        )}
      </div>
    </div>
  );
}