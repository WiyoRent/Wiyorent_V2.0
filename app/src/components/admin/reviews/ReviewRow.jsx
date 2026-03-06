'use client';
import { useState } from 'react';
import { Check, X, Trash2 } from 'lucide-react';
import ReviewerInfo from './ui/ReviewerInfo';
import StarRating from './ui/StarRating';
import StatusBadge from './ui/StatusBadge';

export default function ReviewRow({ review, on_approve, on_reject, on_delete }) {
  const [show_delete_confirm, set_show_delete_confirm] = useState(false);

  const formatted_date = new Date(review.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <tr className="hover">
      {/* Reviewer */}
      <td>
        <ReviewerInfo name={review.reviewer.name} avatar={review.reviewer.avatar} />
      </td>

      {/* Property */}
      <td>
        <span className="font-secondary text-sm text-base-content/70">
          {review.property.title}
        </span>
      </td>

      {/* Rating */}
      <td>
        <StarRating rating={review.rating} />
      </td>

      {/* Review Comment */}
      <td>
        <p className="font-secondary text-sm text-base-content/70 line-clamp-2 max-w-md">
          {review.comment}
        </p>
      </td>

      {/* Date */}
      <td>
        <span className="font-secondary text-sm text-base-content/60">
          {formatted_date}
        </span>
      </td>

      {/* Status */}
      <td>
        <StatusBadge status={review.status} />
      </td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-1">
          {/* Approve Button */}
          {review.status !== 'approved' && (
            <button
              onClick={() => on_approve(review.review_id)}
              className="btn btn-success btn-xs rounded-field"
              aria-label="Approve review"
              title="Approve"
            >
              <Check size={14} />
            </button>
          )}

          {/* Reject Button — opens modal via parent */}
          {review.status !== 'rejected' && (
            <button
              onClick={() => on_reject(review)}
              className="btn btn-error btn-xs rounded-field"
              aria-label="Reject review"
              title="Reject"
            >
              <X size={14} />
            </button>
          )}

          {/* Delete Button */}
          {show_delete_confirm ? (
            <div className="flex gap-1">
              <button
                onClick={() => {
                  on_delete(review.review_id);
                  set_show_delete_confirm(false);
                }}
                className="btn btn-error btn-xs rounded-field"
              >
                Confirm
              </button>
              <button
                onClick={() => set_show_delete_confirm(false)}
                className="btn btn-ghost btn-xs rounded-field"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => set_show_delete_confirm(true)}
              className="btn btn-ghost btn-xs rounded-field"
              aria-label="Delete review"
              title="Delete"
            >
              <Trash2 size={14} className="text-base-content/40 hover:text-error" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}