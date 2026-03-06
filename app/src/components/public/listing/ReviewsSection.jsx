'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import ReviewCard from '@/components/public/listing/ReviewSectionComponents/ReviewCard';
import ReviewForm from '@/components/public/listing/ReviewSectionComponents/ReviewForm';
import InformationModal from '../shared/InformationModal';
import { createReview, deleteReview, editReview } from '@/actions/public/review.action';
import { toast } from 'react-toastify';

/**
 * Props:
 *   listing_id   – string
 *   reviews      – { average_rating, total_count, entries[] }
 *   current_user – { id, name, image, is_onboarded } | null  (Next-Auth session user)
 */
export default function ReviewsSection({ listing_id, reviews, current_user }) {
  const [entries, set_entries] = useState(reviews?.entries ?? []);
  const [editing, set_editing] = useState(null);

  // ── Onboarding gate modal ────────────────────────────────────────────────────
  const [show_onboarding_modal, set_show_onboarding_modal] = useState(false);

  // ── Ownership helper ─────────────────────────────────────────────────────────
  const get_reviewer_id = (e) => e.reviewer_id ?? e.user_id;

  // ── Visibility logic ─────────────────────────────────────────────────────────
  // • approved  → visible to everyone
  // • pending / rejected → visible ONLY to the author
  const visible_entries = entries.filter((e) => {
    if (e.is_approved === 'approved') return true;
    return !!current_user && get_reviewer_id(e) === current_user.id;
  });

  const has_my_review = current_user
    ? entries.some((e) => get_reviewer_id(e) === current_user.id)
    : false;

  // ── Derived aggregate (approved only so pending doesn't skew public score) ──
  const approved_entries = entries.filter((e) => e.is_approved === 'approved');
  const live_avg = approved_entries.length
    ? (approved_entries.reduce((s, e) => s + e.rating, 0) / approved_entries.length).toFixed(1)
    : reviews?.average_rating?.toFixed(1) ?? '—';
  const live_count = (approved_entries.length || reviews?.total_count) ?? 0;

  // ── Create ───────────────────────────────────────────────────────────────────
  const handle_create = async ({ rating, comment }) => {
    // Build an optimistic entry that mirrors the real server shape so
    // ReviewCard can render name/avatar and show edit/delete immediately.
    const optimistic_entry = {
      id: `optimistic_${Date.now()}`,
      reviewer_id: current_user?.id,       // ownership — drives edit/delete gate
      name: current_user?.full_name ?? 'You',
      avatar: current_user?.avatar_url ?? null,
      rating,
      comment,
      date: new Date().toISOString(),
      is_approved: 'pending',             // always pending until moderated
      _optimistic: true,
    };

    const previous = entries;
    set_entries((prev) => [optimistic_entry, ...prev]);

    try {
      const saved = await createReview({ listing_id, rating, comment, is_approved: 'pending' });

      // Swap the temporary entry for the real server object (keeps reviewer_id, real id, etc.)
      set_entries((prev) =>
        prev.map((e) =>
          e.id === optimistic_entry.id
            ? { ...optimistic_entry, ...(saved ?? {}), _optimistic: false }
            : e
        )
      );
    } catch (error) {
      toast.error(error.message || "Couldn't save your review. Please try again.");
      console.error(error);
      set_entries(previous); // roll back
    }
  };

  // ── Edit ─────────────────────────────────────────────────────────────────────
  const handle_edit_submit = async ({ rating, comment }) => {
    const original = editing;

    // Optimistic update
    set_entries((prev) =>
      prev.map((e) =>
        e.id === original.id
          ? { ...e, rating, comment, is_approved: 'pending', _optimistic: true }
          : e
      )
    );

    set_editing(null);

    try {
      const saved = await editReview({listing_id, rating, comment});
      set_entries((prev) =>
        prev.map((e) =>
          e.id === original.id ? { avatar: current_user.avatar_url, ...saved, _optimistic: false } : e
        )
      );
    } catch (error) {
      toast.error(error.message || "Couldn't update your review.");
      // Roll back to original state
      set_entries((prev) =>
        prev.map((e) => (e.id === original.id ? original : e))
      );
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────────
  const handle_delete = async (id) => {
    const snapshot = entries.find((e) => e.id === id);
    set_entries((prev) => prev.filter((e) => e.id !== id)); // optimistic remove

    try {
      await deleteReview(id)
    } catch (error) {
      toast.error(error.message || "Couldn't delete your review.");
      set_entries((prev) => [snapshot, ...prev]); // roll back
    }
  };

  // ── Review form visibility logic ─────────────────────────────────────────────
  //
  //  can_review          → logged in + onboarded + no existing review + not editing
  //  show_onboarding_teaser → logged in but NOT onboarded (profile incomplete)
  //  !current_user       → not logged in at all → show sign-in prompt
  //
  const can_review =
    !!current_user &&
    current_user.is_onboarded &&
    !has_my_review &&
    !editing;

  const show_onboarding_teaser =
    !!current_user &&
    !current_user.is_onboarded &&
    !has_my_review &&
    !editing;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <section className="bg-base-100 rounded-box p-6 shadow-sm">

      {/* Onboarding gate modal — fires when incomplete-profile user clicks the teaser */}
      <InformationModal
        title="Complete Your Profile First"
        message="You need to finish setting up your WiyoRent profile before you can leave a review. It only takes a minute!"
        showModal={show_onboarding_modal}
        setShowModal={set_show_onboarding_modal}
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
          <span className="font-primary text-lg font-extrabold text-base-content">{live_avg}</span>
          <span className="font-secondary text-sm text-base-content/40">({live_count} reviews)</span>
        </div>
      </div>

      {/* Review cards — filtered to what this user is allowed to see */}
      <div>
        {visible_entries.map((entry) =>
          editing?.id === entry.id ? (
            <div key={entry.id} className="py-4 border-b border-base-200 last:border-0">
              <p className="font-primary text-xs font-extrabold uppercase tracking-widest text-accent mb-3">
                Editing your review
              </p>
              <ReviewForm
                initial={editing}
                on_submit={handle_edit_submit}
                on_cancel={() => set_editing(null)}
              />
            </div>
          ) : (
            <ReviewCard
              key={entry.id}
              entry={entry}
              current_user_id={current_user?.id}
              on_edit={set_editing}
              on_delete={handle_delete}
            />
          )
        )}

        {visible_entries.length === 0 && (
          <p className="font-secondary text-sm text-base-content/40 py-4 text-center">
            No reviews yet. Be the first!
          </p>
        )}
      </div>

      {/* ── Fully gated write-review form ─────────────────────────────── */}
      {can_review && <ReviewForm on_submit={handle_create} />}

      {/* ── Logged in but profile incomplete → teaser that opens modal ── */}
      {show_onboarding_teaser && (
        <div className="mt-6 border-t border-base-200 pt-5 text-center">
          <p className="font-secondary text-sm text-base-content/50">
            <button
              onClick={() => set_show_onboarding_modal(true)}
              className="text-accent font-bold hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              Complete your profile
            </button>
            {' '}to leave a review.
          </p>
        </div>
      )}

      {/* ── Not logged in → sign-in prompt ───────────────────────────── */}
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