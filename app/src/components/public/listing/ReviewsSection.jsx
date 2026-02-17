'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

function StarRating({ rating, max = 5, size = 14, interactive = false, on_change }) {
  const [hovered, set_hovered] = useState(0);
  const display_rating = interactive ? (hovered || rating) : rating;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const star_value = i + 1;
        const filled = star_value <= display_rating;
        return (
          <Star
            key={i}
            size={size}
            className={`transition-colors duration-100 ${
              filled ? 'fill-accent text-accent' : 'fill-base-300 text-base-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={() => interactive && on_change && on_change(star_value)}
            onMouseEnter={() => interactive && set_hovered(star_value)}
            onMouseLeave={() => interactive && set_hovered(0)}
          />
        );
      })}
    </div>
  );
}

function ReviewCard({ entry }) {
  const formatted_date = new Date(entry.date).toLocaleDateString('en-RW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const initials = entry.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex gap-3 py-4 border-b border-base-200 last:border-0">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
        {entry.avatar ? (
          <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
        ) : (
          <span className="font-primary text-sm font-bold text-primary-content">
            {initials}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="font-primary text-sm font-bold text-base-content">
            {entry.name}
          </span>
          <span className="font-secondary text-xs text-base-content/40">
            {formatted_date}
          </span>
        </div>
        <div className="mt-0.5 mb-2">
          <StarRating rating={entry.rating} size={12} />
        </div>
        <p className="font-secondary text-sm text-base-content/65 leading-relaxed">
          {entry.comment}
        </p>
      </div>
    </div>
  );
}

function LeaveReviewForm() {
  const [user_rating, set_user_rating] = useState(0);
  const [experience, set_experience] = useState('');
  const [submitted, set_submitted] = useState(false);

  const handle_submit = (e) => {
    e.preventDefault();
    if (!user_rating || !experience.trim()) return;
    // In production: POST to /api/reviews
    console.log('Submitting review:', { user_rating, experience });
    set_submitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-6 p-5 bg-success/10 border border-success/20 rounded-box text-center">
        <p className="font-primary text-sm font-bold text-success uppercase tracking-wide">
          Thank you for your review! 🎉
        </p>
        <p className="font-secondary text-xs text-base-content/50 mt-1">
          Your feedback helps fellow students find great housing.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-base-200 pt-6">
      <h3 className="font-primary text-sm font-extrabold text-base-content uppercase tracking-widest mb-4">
        Leave a Review
      </h3>

      <div className="flex flex-col gap-4">
        {/* Star input */}
        <div>
          <label className="font-secondary text-xs text-base-content/50 mb-2 block uppercase tracking-wide">
            Your Rating
          </label>
          <StarRating
            rating={user_rating}
            size={22}
            interactive
            on_change={set_user_rating}
          />
        </div>

        {/* Text area */}
        <div>
          <label className="font-secondary text-xs text-base-content/50 mb-2 block uppercase tracking-wide">
            Your Experience
          </label>
          <textarea
            value={experience}
            onChange={(e) => set_experience(e.target.value)}
            placeholder="Tell us about your stay…"
            rows={4}
            className="textarea textarea-bordered w-full rounded-field font-secondary text-sm resize-y bg-base-100 focus:border-accent focus:outline-none"
          />
        </div>

        <button
          onClick={handle_submit}
          disabled={!user_rating || !experience.trim()}
          className="btn btn-accent rounded-field font-primary font-bold text-sm uppercase tracking-wider self-start disabled:opacity-40"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default function ReviewsSection({ reviews }) {
  const { average_rating, total_count, entries } = reviews;

  return (
    <section className="bg-base-100 rounded-box p-6 shadow-sm">
      {/* Section heading + aggregate score */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest flex items-center gap-3">
          <span className="w-1 h-5 bg-accent rounded-full inline-block" />
          Reviews
        </h2>
        <div className="flex items-center gap-2">
          <Star size={18} className="fill-accent text-accent" />
          <span className="font-primary text-lg font-extrabold text-base-content">
            {average_rating.toFixed(1)}
          </span>
          <span className="font-secondary text-sm text-base-content/40">
            ({total_count} reviews)
          </span>
        </div>
      </div>

      {/* Review cards */}
      <div>
        {entries.map((entry) => (
          <ReviewCard key={entry.id} entry={entry} />
        ))}
      </div>

      {/* Leave a review form */}
      <LeaveReviewForm />
    </section>
  );
}