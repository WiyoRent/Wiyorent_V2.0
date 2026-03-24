'use client';

import { Image as ImageIcon, X, Plus } from 'lucide-react';

export default function MediaManagerSection({ image_urls, set_image_urls }) {
  const handle_remove_image = (index) => {
    set_image_urls(image_urls.filter((_, i) => i !== index));
  };

  const handle_image = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    set_image_urls(prev => [...prev, ...Array.from(files)]);
  };

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <ImageIcon size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Media Manager
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Images */}
        {image_urls.map((url, index) => (
          <div
            key={typeof url === 'string' ? url : `${url.name}-${url.size}`}
            className="relative aspect-square rounded-field overflow-hidden bg-base-300 group"
          >
            <img
              src={typeof url === 'string' ? url : URL.createObjectURL(url)}
              alt={`Property image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handle_remove_image(index)}
              className="absolute top-2 right-2 w-7 h-7 bg-error rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-md"
              aria-label="Remove image"
            >
              <X size={14} className="text-error-content" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-base-content/50 to-transparent p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <span className="font-secondary text-xs text-base-100 font-semibold">
                Image {index + 1}
              </span>
            </div>
          </div>
        ))}

        {/* Add Image Placeholder */}
        <label
          htmlFor="uploadImg"
          className="aspect-square rounded-field border-2 border-dashed border-base-300 hover:border-accent bg-base-200 hover:bg-accent/5 flex flex-col items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
        >
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
            <Plus size={20} className="text-accent" />
          </div>
          <span className="font-secondary text-xs font-semibold text-base-content/50">
            Add Image
          </span>
        </label>
      </div>

      <input
        onChange={handle_image}
        className="hidden"
        type="file"
        id="uploadImg"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
      />

      <p className="font-secondary text-xs text-base-content/40 mt-4">
        Recommended: Upload high-quality images (min 1200×800px). First image will be used as thumbnail.{' '}
        <span className="text-base-content/30">· Compressed automatically</span>
      </p>
    </div>
  );
}
