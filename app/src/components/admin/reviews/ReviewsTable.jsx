'use client';
import { useState } from 'react';
import ReviewRow from './ReviewRow';
import RejectionNoteModal from './RejectionNoteModal';
import { toast } from 'react-toastify';
import { approveReview, rejectReview, deleteReview } from '@/actions/admin/review.action';
import { useRouter } from 'next/navigation';

export default function ReviewsTable({ reviews }) {

  const router = useRouter()

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
          isLoading : false
        }
      )

      router.refresh()
    } catch (error) {
      console.error(error.message)
      toast.update(
        loadingToast, {
          type: 'error',
          render : error.message || "An error occured performing this action",
          isLoading : false
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
      router.refresh()

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
          router.refresh()
      } catch (error) {
          toast.update(loadingToast, {
              type: 'error',
              render: error.message || "An error occurred performing this action",
              isLoading: false,
              autoClose: 3000
          })
      }
  }


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
                on_approve={() => handle_approve(review.review_id, review.reviewer.email, review.reviewer.name, review.property.title)}
                on_reject={handle_reject_open}
                on_delete={() => handle_delete(review.review_id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}