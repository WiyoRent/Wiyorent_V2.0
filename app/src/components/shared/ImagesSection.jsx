'use client';

import { ImagePlus, X, UploadCloud, Loader2 } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import useCloudinaryUpload from '@/hooks/useCloudinaryUpload';

// upload_folder: when provided, files are uploaded immediately (user-side flow).
// When absent, File objects are stored for deferred upload (admin listing create flow).
export default function ImagesSection({ image_urls, set_image_urls, upload_folder }) {
  const input_ref = useRef(null);
  const { upload, uploading } = useCloudinaryUpload();

  const handle_files = async (files) => {
    if (upload_folder) {
      for (const file of Array.from(files)) {
        const secure_url = await upload(file, upload_folder);
        if (secure_url) {
          set_image_urls(prev => [...prev, secure_url]);
        } else {
          toast.error(`Failed to upload ${file.name}. Please try again.`);
        }
      }
    } else {
      set_image_urls(prev => [...prev, ...Array.from(files)]);
    }
  };

  const handle_input_change = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handle_files(files);
    }
  };

  const handle_remove = (index) => {
    set_image_urls((prev) => prev.filter((_, i) => i !== index));
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
        onClick={() => !uploading && input_ref.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 h-32 bg-base-200 rounded-field border-2 border-dashed border-base-300 hover:border-accent hover:bg-accent/5 transition-colors mb-4 ${uploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      >
        {uploading ? (
          <>
            <Loader2 size={24} className="text-accent animate-spin" />
            <p className="font-secondary text-sm text-base-content/50">Uploading...</p>
          </>
        ) : (
          <>
            <UploadCloud size={24} className="text-base-content/30" />
            <p className="font-secondary text-sm text-base-content/50">
              Drag &amp; drop images here, or{' '}
              <span className="text-accent font-semibold">browse</span>
            </p>
            <p className="font-secondary text-xs text-base-content/30">
              PNG, JPG, WEBP &nbsp;·&nbsp; Compressed automatically
            </p>
          </>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={input_ref}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={handle_input_change}
      />

      {/* Image Previews */}
      {image_urls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {image_urls.map((url, index) => (
            <div
              key={typeof url === 'string' ? url : `${url.name}-${url.size}`}
              className="relative group rounded-field overflow-hidden aspect-video bg-base-200"
            >
              <img
                src={typeof url === 'string' ? url : URL.createObjectURL(url)}
                alt={`image${index}`}
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
                aria-label="Remove image"
              >
                <X size={12} />
              </button>
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
