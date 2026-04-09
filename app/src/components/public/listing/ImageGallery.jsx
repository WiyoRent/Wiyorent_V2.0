'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import Image from 'next/image';

export default function ImageGallery({ image_urls, title }) {
  const [active_index, set_active_index] = useState(0);
  const [lightbox_open, set_lightbox_open] = useState(false);

  const handle_prev = () =>
    set_active_index((i) => (i === 0 ? image_urls.length - 1 : i - 1));

  const handle_next = () =>
    set_active_index((i) => (i === image_urls.length - 1 ? 0 : i + 1));

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 rounded-box overflow-hidden h-64 sm:h-80 lg:h-96">

        {/* Main Image */}
        <div className="relative flex-1 overflow-hidden group cursor-pointer bg-base-300"
          onClick={() => set_lightbox_open(true)}>
          <Image
            fill
            priority
            loading="eager"
            src={image_urls[active_index] || ''}
            alt={`${title} — photo ${active_index + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Expand icon */}
          <button
            className="absolute top-3 right-3 w-9 h-9 bg-base-100/80 backdrop-blur-sm rounded-field flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            onClick={(e) => { e.stopPropagation(); set_lightbox_open(true); }}
            aria-label="View fullscreen"
          >
            <Expand size={16} className="text-base-content" />
          </button>

          {/* Prev / Next arrows */}
          {image_urls.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handle_prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-base-100/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-base-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} className="text-base-content" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handle_next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-base-100/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-base-100"
                aria-label="Next image"
              >
                <ChevronRight size={18} className="text-base-content" />
              </button>
            </>
          )}

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {image_urls.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); set_active_index(idx); }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  idx === active_index
                    ? 'bg-accent w-5'
                    : 'bg-base-100/60'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip — visible on sm+ */}
        {image_urls.length > 1 && (
          <div className="hidden sm:flex flex-col gap-2 w-28 lg:w-32 flex-shrink-0">
            {image_urls.map((url, idx) => (
              <button
                key={idx}
                onClick={() => set_active_index(idx)}
                className={`relative flex-1 rounded-field overflow-hidden border-2 transition-all duration-200 ${
                  idx === active_index
                    ? 'border-accent shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label={`Select photo ${idx + 1}`}
              >
                <Image
                  fill
                  loading="eager"
                  src={url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox_open && (
        <div
          className="fixed inset-0 z-50 bg-base-content/90 flex items-center justify-center p-4"
          onClick={() => set_lightbox_open(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              priority
              loading="eager"
              width={1920}
              height={1080}
              src={image_urls[active_index]}
              alt={title}
              className="w-full max-h-[85vh] object-contain rounded-box"
            />
            <button
              onClick={() => set_lightbox_open(false)}
              className="absolute -top-10 right-0 text-base-100/80 hover:text-base-100 font-primary text-sm font-bold uppercase tracking-wide"
            >
              Close ✕
            </button>
            {image_urls.length > 1 && (
              <>
                <button
                  onClick={handle_prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-base-100/20 hover:bg-base-100/40 rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={22} className="text-base-100" />
                </button>
                <button
                  onClick={handle_next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-base-100/20 hover:bg-base-100/40 rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={22} className="text-base-100" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}