'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating, max = 5, size = 14, interactive = false, on_change }) {
  const [hovered, set_hovered] = useState(0);
  const display = interactive ? (hovered || rating) : rating;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const v = i + 1;
        return (
          <Star
            key={i}
            size={size}
            className={`transition-colors duration-100 ${
              v <= display ? 'fill-accent text-accent' : 'fill-base-300 text-base-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={() => interactive && on_change?.(v)}
            onMouseEnter={() => interactive && set_hovered(v)}
            onMouseLeave={() => interactive && set_hovered(0)}
          />
        );
      })}
    </div>
  );
}