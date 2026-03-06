import { Star } from 'lucide-react';

export default function StarRating({ rating }) {
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