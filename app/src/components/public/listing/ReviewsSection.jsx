'use client';
import { useState } from 'react';
import { Star } from 'lucide-react';
import ReviewCard from '@/components/public/listing/ReviewSectionComponents/ReviewCard';
import ReviewForm from '@/components/public/listing/ReviewSectionComponents/ReviewForm';
import InformationModal from '../shared/InformationModal';
import { createReview, deleteReview, editReview } from '@/services/public/review.service';
import { toast } from 'react-toastify';

export default function ReviewsSection({ listing_id, reviews, current_user, user_full_name, listing_title }) {
  const [entries, setEntries] = useState(reviews?.entries ?? []);
  const [editing, setEditing] = useState(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);

  // Helpers
  const getReviewerId = (e) => e.reviewer_id ?? e.user_id;
  const isMyReview = (e) => current_user != null && getReviewerId(e) === current_user.id;

  // Derived state
  const visibleEntries = entries.filter(e => e.is_approved === 'approved' || isMyReview(e));
  const hasMyReview = entries.some(isMyReview);

  const approvedEntries = entries.filter(e => e.is_approved === 'approved');
  const liveCount = approvedEntries.length;
  const liveAvg = liveCount
    ? (approvedEntries.reduce((sum, e) => sum + e.rating, 0) / liveCount).toFixed(1)
    : '—';

  // Permissions
  const canReview = current_user?.is_onboarded && !hasMyReview && !editing;
  const showOnboardingTeaser = current_user && !current_user.is_onboarded && !hasMyReview && !editing;

  // Handlers
  const handleCreate = async ({ rating, comment }) => {
    const optimisticEntry = {
      id: `optimistic_${Date.now()}`,
      reviewer_id: current_user?.id,
      name: current_user?.full_name ?? 'You',
      avatar: current_user?.avatar_url ?? null,
      rating,
      comment,
      date: new Date().toISOString(),
      is_approved: 'pending',
      _optimistic: true,
    };
    const previous = entries;
    setEntries(prev => [optimisticEntry, ...prev]);
    try {
      const saved = await createReview({ listing_id, rating, comment, is_approved: 'pending', user_full_name, listing_title });
      setEntries(prev =>
        prev.map(e => e.id === optimisticEntry.id ? { ...optimisticEntry, ...saved, _optimistic: false } : e)
      );
    } catch (error) {
      toast.error(error.message || "Couldn't save your review. Please try again.");
      setEntries(previous);
    }
  };

  const handleEditSubmit = async ({ rating, comment }) => {
    const original = editing;
    setEntries(prev =>
      prev.map(e => e.id === original.id ? { ...e, rating, comment, is_approved: 'pending', _optimistic: true } : e)
    );
    setEditing(null);
    try {
      const saved = await editReview({ listing_id, rating, comment, user_full_name, listing_title });
      setEntries(prev =>
        prev.map(e => e.id === original.id ? { avatar: current_user.avatar_url, ...saved, _optimistic: false } : e)
      );
    } catch (error) {
      toast.error(error.message || "Couldn't update your review.");
      setEntries(prev => prev.map(e => e.id === original.id ? original : e));
    }
  };

  const handleDelete = async (id) => {
    const snapshot = entries.find(e => e.id === id);
    setEntries(prev => prev.filter(e => e.id !== id));
    try {
      await deleteReview(id);
    } catch (error) {
      toast.error(error.message || "Couldn't delete your review.");
      setEntries(prev => [snapshot, ...prev]);
    }
  };

  return (
    <section className="bg-base-100 rounded-box p-6 shadow-sm">
      <InformationModal
        title="Complete Your Profile First"
        message="You need to finish setting up your WiyoRent profile before you can leave a review. It only takes a minute!"
        showModal={showOnboardingModal}
        setShowModal={setShowOnboardingModal}
        redirectTo="/profile"
      />

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest flex items-center gap-3">
          <span className="w-1 h-5 bg-accent rounded-full inline-block" />
          Reviews
        </h2>
        <div className="flex items-center gap-2">
          <Star size={18} className="fill-accent text-accent" />
          <span className="font-primary text-lg font-extrabold text-base-content">{liveAvg}</span>
          <span className="font-secondary text-sm text-base-content/40">({liveCount} reviews)</span>
        </div>
      </div>

      {/* Review cards */}
      <div>
        {visibleEntries.map(entry =>
          editing?.id === entry.id ? (
            <div key={entry.id} className="py-4 border-b border-base-200 last:border-0">
              <p className="font-primary text-xs font-extrabold uppercase tracking-widest text-accent mb-3">
                Editing your review
              </p>
              <ReviewForm initial={editing} on_submit={handleEditSubmit} on_cancel={() => setEditing(null)} />
            </div>
          ) : (
            <ReviewCard
              key={entry.id}
              entry={entry}
              current_user_id={current_user?.id}
              on_edit={setEditing}
              on_delete={handleDelete}
            />
          )
        )}
        {visibleEntries.length === 0 && (
          <p className="font-secondary text-sm text-base-content/40 py-4 text-center">
            No reviews yet. Be the first!
          </p>
        )}
      </div>

      {canReview && <ReviewForm on_submit={handleCreate} />}

      {showOnboardingTeaser && (
        <div className="mt-6 border-t border-base-200 pt-5 text-center">
          <p className="font-secondary text-sm text-base-content/50">
            <button
              onClick={() => setShowOnboardingModal(true)}
              className="text-accent font-bold hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              Complete your profile
            </button>
            {' '}to leave a review.
          </p>
        </div>
      )}

      {!current_user && (
        <div className="mt-6 border-t border-base-200 pt-5 text-center">
          <p className="font-secondary text-sm text-base-content/50">
            <a href="/login" className="text-accent font-bold hover:underline">Sign in</a>
            {' '}to leave a review.
          </p>
        </div>
      )}
    </section>
  );
}