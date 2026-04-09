'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function ImageCarousel({ images }) {
  const [active, set_active] = useState(0);
  if (!images?.length) return null;

  return (
    <div className="flex flex-col gap-2 flex-shrink-0">
      <div className="relative border border-accent w-full aspect-video rounded-box overflow-hidden bg-base-300">
        <Image
          fill
          loading="eager"
          src={images[active]}
          alt={`Listing image ${active + 1}`}
          className="w-full h-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() => set_active((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80 border-none shadow"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => set_active((i) => (i + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80 border-none shadow"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => set_active(i)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    i === active ? 'bg-accent w-4' : 'bg-white/60 w-2'
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <span className="absolute top-3 right-3 bg-base-100/70 backdrop-blur-sm font-secondary text-xs px-2 py-1 rounded-field text-base-content/70">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => set_active(i)}
              className={`relative flex-shrink-0 w-14 h-10 rounded-field overflow-hidden border-2 transition-all ${
                i === active ? 'border-accent opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
              aria-label={`Go to image ${i + 1}`}
            >
              <Image fill loading="eager" src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
