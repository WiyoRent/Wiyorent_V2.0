'use client';
import { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function RejectionNoteModal({ review, on_confirm, on_cancel }) {
  const [note, set_note] = useState('');
  const [error, set_error] = useState(false);

  const handle_confirm = () => {
    if (!note.trim()) {
      set_error(true);
      return;
    }
    on_confirm(note.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-base-100 rounded-box shadow-xl w-full max-w-sm mx-4 p-8 flex flex-col items-center gap-6 text-center">

        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
          <AlertCircle size={28} className="text-error" />
        </div>

        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <h3 className="font-primary text-lg font-extrabold text-base-content uppercase tracking-tight">
            Reject Review
          </h3>
          <p className="font-secondary text-sm text-base-content/50 leading-relaxed">
            You are rejecting a review by{' '}
            <span className="font-semibold text-base-content/80">
              {review.reviewer?.name}
            </span>{' '}
            for{' '}
            <span className="font-semibold text-base-content/80">
              {review.property?.title}
            </span>
            .
          </p>
        </div>

        {/* Note input */}
        <div className="form-control gap-2 w-full text-left">
          <label className="label py-0">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Rejection Note <span className="text-error">*</span>
            </span>
          </label>
          <textarea
            className={`textarea textarea-bordered rounded-field font-secondary text-sm resize-none h-28 w-full ${
              error ? 'textarea-error' : ''
            }`}
            placeholder="Explain why this review is being rejected…"
            value={note}
            onChange={(e) => {
              set_note(e.target.value);
              if (e.target.value.trim()) set_error(false);
            }}
          />
          {error && (
            <p className="font-secondary text-xs text-error">
              A rejection note is required before rejecting this review.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={on_cancel}
            className="btn btn-ghost btn-sm rounded-field font-primary font-bold uppercase tracking-wide flex-1"
          >
            Cancel
          </button>
          <button
            onClick={handle_confirm}
            className="btn btn-error btn-sm rounded-field font-primary font-bold uppercase tracking-wide gap-1.5 flex-1"
          >
            <X size={14} />
            Reject Review
          </button>
        </div>

      </div>
    </div>
  );
}