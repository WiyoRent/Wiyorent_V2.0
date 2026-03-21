'use client';

import { ImagePlus, X, UploadCloud } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'react-toastify';

// image_urls on the create page holds { file: File, preview_url: string } entries
// until the form is submitted and files are uploaded — at which point the API
// resolves them to real URLs, consistent with the edit/detail mockup shape.
export default function ImagesSection({ image_urls, set_image_urls }) {
  const input_ref = useRef(null);

  const handle_files = (files) => {
    console.log(files, '-------')
    const oversized = Array.from(files).find(file => file.size > 10 * 1024 * 1024)
    if (oversized) {
      toast.error(`${oversized.name} exceeds the 10MB limit. Please choose a smaller file.`)
      return
    }
    const new_file = Array.from(files).map((file) => (
      {file,
      preview_url:URL.createObjectURL(file)}
    ))

    console.log(new_file)

    return set_image_urls(prev => [...prev, ...new_file])
  };

  const handle_input_change = (e) => {
    const files = e.target.files; // Get the whole FileList object
    
    if(files && files.length > 0){
      handle_files(files); 
    }
  };

  const handle_remove = (index) => {
    set_image_urls((prev) => {
      URL.revokeObjectURL(prev[index].preview_url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handle_drag_over = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handle_drop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files?.length) {
      handle_files(e.dataTransfer.files);
    }
  };

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <ImagePlus size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Images
        </h2>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={handle_drag_over}
        onDrop={handle_drop}
        onClick={() => input_ref.current?.click()}
        className="flex flex-col items-center justify-center gap-2 h-32 bg-base-200 rounded-field border-2 border-dashed border-base-300 hover:border-accent hover:bg-accent/5 transition-colors cursor-pointer mb-4"
      >
        <UploadCloud size={24} className="text-base-content/30" />
        <p className="font-secondary text-sm text-base-content/50">
          Drag &amp; drop images here, or{' '}
          <span className="text-accent font-semibold">browse</span>
        </p>
        <p className="font-secondary text-xs text-base-content/30">
          PNG, JPG, WEBP &nbsp;·&nbsp; Max 10MB per image
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={input_ref}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handle_input_change}
      />

      {/* Image Previews */}
      {image_urls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {image_urls.map(({ preview_url, file }, index) => (
            <div
              key={preview_url}
              className="relative group rounded-field overflow-hidden aspect-video bg-base-200"
            >
              <img
                src={preview_url}
                alt={file?.name || `image${index}`}
                className="w-full h-full object-cover"
              />

              {index === 0 && (
                <span className="absolute top-2 left-2 badge badge-accent badge-sm font-primary font-bold text-xs uppercase tracking-wide">
                  Thumbnail
                </span>
              )}

              <button
                type="button"
                onClick={() => handle_remove(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-error text-error-content rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${file?.name}`}
              >
                <X size={12} />
              </button>

              {/* File name on hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-secondary/70 px-2 py-1 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="font-secondary text-xs text-secondary-content truncate">
                  {file?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="font-secondary text-xs text-base-content/40 mt-3">
        The first image will be used as the listing thumbnail.
      </p>
    </div>
  );
}