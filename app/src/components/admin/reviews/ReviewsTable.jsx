'use client';

import { useState } from 'react';
import { Check, X, Trash2, Star } from 'lucide-react';

function ReviewerInfo({ name, avatar }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      {avatar ? (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
          <span className="font-primary text-xs font-extrabold text-accent-content">
            {initials}
          </span>
        </div>
      )}
      <span className="font-secondary text-sm font-semibold text-base-content">
        {name}
      </span>
    </div>
  );
}

function StarRating({ rating }) {
  const max_stars = 5;
  const filled = Math.round(rating);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max_stars }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={`${
            i < filled
              ? 'fill-accent text-accent'
              : 'fill-base-300 text-base-300'
          }`}
        />
      ))}
      <span className="font-secondary text-xs text-base-content/60 ml-1">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}

function StatusBadge({ status }) {
  const variants = {
    pending: 'badge-info',
    approved: 'badge-success',
    rejected: 'badge-error',
  };

  const labels = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
  };

  return (
    <span className={`badge ${variants[status]} badge-sm font-primary font-bold uppercase tracking-wide`}>
      {labels[status]}
    </span>
  );
}

function ReviewRow({ review, on_approve, on_reject, on_delete }) {
  const [show_delete_confirm, set_show_delete_confirm] = useState(false);

  const formatted_date = new Date(review.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const handle_approve = () => {
    on_approve(review.review_id);
  };

  const handle_reject = () => {
    on_reject(review.review_id);
  };

  const handle_delete = () => {
    on_delete(review.review_id);
    set_show_delete_confirm(false);
  };

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
              onClick={handle_approve}
              className="btn btn-success btn-xs rounded-field"
              aria-label="Approve review"
              title="Approve"
            >
              <Check size={14} />
            </button>
          )}

          {/* Reject Button */}
          {review.status !== 'rejected' && (
            <button
              onClick={handle_reject}
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
                onClick={handle_delete}
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

export default function ReviewsTable({ reviews }) {
  const handle_approve = (review_id) => {
    console.log(`Approve review ${review_id}`);
    // PUT /api/admin/reviews/${review_id} { status: 'approved' }
  };

  const handle_reject = (review_id) => {
    console.log(`Reject review ${review_id}`);
    // PUT /api/admin/reviews/${review_id} { status: 'rejected' }
  };

  const handle_delete = (review_id) => {
    console.log(`Delete review ${review_id}`);
    // DELETE /api/admin/reviews/${review_id}
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-base-100 rounded-box shadow-sm p-12 text-center">
        <p className="font-secondary text-base-content/40">
          No reviews found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-box shadow-sm overflow-x-auto">
      <table className="table table-zebra table-sm">
        <thead>
          <tr className="bg-base-200">
            <th className="font-primary text-xs uppercase tracking-wider">Reviewer</th>
            <th className="font-primary text-xs uppercase tracking-wider">Property</th>
            <th className="font-primary text-xs uppercase tracking-wider">Rating</th>
            <th className="font-primary text-xs uppercase tracking-wider">Review</th>
            <th className="font-primary text-xs uppercase tracking-wider">Date</th>
            <th className="font-primary text-xs uppercase tracking-wider">Status</th>
            <th className="font-primary text-xs uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <ReviewRow
              key={review.review_id}
              review={review}
              on_approve={handle_approve}
              on_reject={handle_reject}
              on_delete={handle_delete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}