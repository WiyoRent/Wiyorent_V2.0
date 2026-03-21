'use client';
import { useState } from 'react';
import { Check, X, Trash2 } from 'lucide-react';
import ReviewRow from './ReviewRow';
import RejectionNoteModal from './RejectionNoteModal';
import ReviewerInfo from './ui/ReviewerInfo';
import StarRating from './ui/StarRating';
import StatusBadge from './ui/StatusBadge';
import { toast } from 'react-toastify';
import { approveReview, rejectReview, deleteReview } from '@/actions/admin/review.action';
import { useRouter } from 'next/navigation';

// ── Mobile card ───────────────────────────────────────────────────────────────
function ReviewCard({ review, on_approve, on_reject, on_delete }) {
  const [show_delete_confirm, set_show_delete_confirm] = useState(false);

  const formatted_date = new Date(review.date).toLocaleDateString('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  });

  return (
    <div className="bg-base-100 rounded-box shadow-sm border border-base-200 mx-3 my-2 p-4">
      {/* Reviewer + status */}
      <div className="flex items-start justify-between gap-3">
        <ReviewerInfo name={review.reviewer.name} avatar={review.reviewer.avatar} />
        <StatusBadge status={review.status} />
      </div>

      {/* Property + rating + comment */}
      <div className="mt-2">
        <p className="font-secondary text-xs font-semibold text-base-content/50">{review.property.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <StarRating rating={review.rating} />
          <span className="font-secondary text-xs text-base-content/40">{formatted_date}</span>
        </div>
        <p className="font-secondary text-sm text-base-content/70 line-clamp-2 mt-1.5">{review.comment}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-1.5 mt-3 pt-3 border-t border-base-200">
        {review.status !== 'approved' && (
          <button
            onClick={on_approve}
            className="btn btn-success btn-xs rounded-field"
            aria-label="Approve review"
            title="Approve"
          >
            <Check size={14} />
          </button>
        )}
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
        {show_delete_confirm ? (
          <div className="flex gap-1">
            <button
              onClick={() => { on_delete(); set_show_delete_confirm(false); }}
              className="btn btn-error btn-xs rounded-field"
            >
              Confirm
            </button>
            <button onClick={() => set_show_delete_confirm(false)} className="btn btn-ghost btn-xs rounded-field">✕</button>
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
    </div>
  );
}

// ── Table ─────────────────────────────────────────────────────────────────────
export default function ReviewsTable({ reviews }) {

  const router = useRouter()

  const after_action = () => {
    router.refresh()
  }

  // Tracks which review is pending rejection (awaiting note in modal)
  const [pending_rejection, set_pending_rejection] = useState(null);

  const handle_approve = async (review_id, email, name, property_title) => {
    const loadingToast = toast.loading("Approving user review...")

    try {
      await approveReview(review_id, email, name, property_title)

      toast.update(
        loadingToast, {
          type: 'success',
          render : "Review approved successfully",
          isLoading : false,
          autoClose : 3000
        }
      )

      after_action()
    } catch (error) {
      console.error(error.message)
      toast.update(
        loadingToast, {
          type: 'error',
          render : error.message || "An error occured performing this action",
          isLoading : false,
          autoClose : 3000
        }
      )
    }
  };

  // Called by ReviewRow — opens the modal with the full review object
  const handle_reject_open = (review) => {
    set_pending_rejection(review);
  };

  // Called by modal on confirm — note is guaranteed non-empty
  const handle_reject_confirm = async (review_id, email, name, property_title,review_rejection_note) => {

    console.log(review_id, email, name, property_title, review_rejection_note, '---received' )

    const loadingToast = toast.loading(
      'Rejecting review...'
    )

    try {
      set_pending_rejection(null);
      await rejectReview(review_id, email, name, property_title, review_rejection_note)

      toast.update(
        loadingToast, {
          type: 'success',
          render : "Review rejected successfully",
          isLoading : false,
          autoClose : 3000
        }
      )
      after_action()

    } catch (error) {
      console.error(error.message)
      toast.update(
        loadingToast, {
          type: 'error',
          render : error.message || "An error occured performing this action",
          isLoading : false, autoClose: 3000
        }
      )
    }


  };

  const handle_delete = async (review_id) => {
      const loadingToast = toast.loading("Deleting review...")
      try {
          await deleteReview(review_id)
          toast.update(loadingToast, {
              type: 'success',
              render: "Review deleted successfully",
              isLoading: false,
              autoClose: 3000
          })
          after_action()
      } catch (error) {
          toast.update(loadingToast, {
              type: 'error',
              render: error.message || "An error occurred performing this action",
              isLoading: false,
              autoClose: 3000
          })
      }
  }


  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div className="bg-base-100 rounded-box shadow-sm p-12 text-center">
        <p className="font-secondary text-base-content/40">
          No reviews found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Rejection Note Modal — rendered at table level, outside the row */}
      {pending_rejection && (
        <RejectionNoteModal
          review={pending_rejection}
          on_confirm={(review_rejection_note) => handle_reject_confirm(
            pending_rejection.review_id,
            pending_rejection.reviewer.email,
            pending_rejection.reviewer.name,
            pending_rejection.property.title,
            review_rejection_note
          )}
          on_cancel={() => set_pending_rejection(null)}
        />
      )}

      <div className="bg-base-100 rounded-box shadow-sm">
        {/* Mobile cards */}
        <div className="md:hidden flex flex-col gap-2 p-2">
          {reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              review={review}
              on_approve={() => handle_approve(review.review_id, review.reviewer.email, review.reviewer.name, review.property.title)}
              on_reject={handle_reject_open}
              on_delete={() => handle_delete(review.review_id)}
            />
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
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
              {reviews?.map((review) => (
                <ReviewRow
                  key={review.review_id}
                  review={review}
                  on_approve={() => handle_approve(review.review_id, review.reviewer.email, review.reviewer.name, review.property.title)}
                  on_reject={handle_reject_open}
                  on_delete={() => handle_delete(review.review_id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
