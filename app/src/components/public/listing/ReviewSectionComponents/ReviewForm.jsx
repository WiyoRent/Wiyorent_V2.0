'use client';

import { useState } from 'react';
import StarRating from '@/components/public/listing/ReviewSectionComponents/StarRating';

export default function ReviewForm({ initial = null, on_submit, on_cancel }) {
  const is_edit = !!initial;
  const [rating, set_rating] = useState(initial?.rating ?? 0);
  const [comment, set_comment] = useState(initial?.comment ?? '');
  const chars_left = 300 - comment.length;

  const handle_submit = () => {
    if (!rating || !comment.trim()) return;
    on_submit({ rating, comment });
  };

  return (
    <div className={`${is_edit ? '' : 'mt-6 border-t border-base-200 pt-6'}`}>
      {!is_edit && (
        <h3 className="font-primary text-sm font-extrabold text-base-content uppercase tracking-widest mb-4">
          Leave a Review
        </h3>
      )}

      <div className="flex flex-col gap-4">
        <div>
          <label className="font-secondary text-xs text-base-content/50 mb-2 block uppercase tracking-wide">
            Your Rating
          </label>
          <StarRating rating={rating} size={22} interactive on_change={set_rating} />
        </div>

        <div>
          <label className="font-secondary text-xs text-base-content/50 mb-2 block uppercase tracking-wide">
            Your Experience
          </label>
          <textarea
            value={comment}
            onChange={(e) => set_comment(e.target.value.slice(0, 300))}
            placeholder="Tell us about your stay…"
            rows={4}
            className="textarea textarea-bordered w-full rounded-field font-secondary text-sm resize-y bg-base-100 focus:border-accent focus:outline-none"
          />
          <p
            className={`font-secondary text-[10px] mt-1 text-right ${
              chars_left < 30 ? 'text-warning' : 'text-base-content/30'
            }`}
          >
            {chars_left} characters left
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handle_submit}
            disabled={!rating || !comment.trim()}
            className="btn btn-accent rounded-field font-primary font-bold text-sm uppercase tracking-wider disabled:opacity-40"
          >
            {is_edit ? 'Save Changes' : 'Submit Review'}
          </button>
          {is_edit && (
            <button
              onClick={on_cancel}
              className="btn btn-ghost rounded-field font-primary font-bold text-sm uppercase tracking-wider"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}