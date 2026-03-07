'use client';

import { useState } from 'react';
import { X, Plus, Trash2, Star, Save } from 'lucide-react';

export default function PackageModal({
  is_open,
  active_package,
  set_active_package,
  on_save,
  on_close,
}) {
  const [inclusion_input, set_inclusion_input] = useState('');
  const [inclusions_error, set_inclusions_error] = useState(false);

  if (!is_open || !active_package) return null;

  const is_edit = Boolean(active_package.package_id);
  const modal_title = is_edit
    ? `Edit ${active_package.name || 'Package'}`
    : 'Create Package';

  // ── Field helpers ───────────────────────────────────────────────────────────
  const handle_field = (field, value) => {
    set_active_package((prev) => ({ ...prev, [field]: value }));
  };

  // ── Inclusions ──────────────────────────────────────────────────────────────
  const handle_add_inclusion = () => {
    const trimmed = inclusion_input.trim();
    if (trimmed && !active_package.inclusions.includes(trimmed)) {
      set_active_package((prev) => ({
        ...prev,
        inclusions: [...prev.inclusions, trimmed],
      }));
      set_inclusion_input('');
      set_inclusions_error(false);
    }
  };

  const handle_remove_inclusion = (index) => {
    set_active_package((prev) => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index),
    }));
  };

  const handle_inclusion_key = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handle_add_inclusion();
    }
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handle_submit = (e) => {
    e.preventDefault();

    if (active_package.inclusions.length === 0) {
      set_inclusions_error(true);
      return;
    }

    on_save({
      ...active_package,
      price: Number(active_package.price),
    });
    set_inclusion_input('');
    set_inclusions_error(false);
  };

  const handle_close = () => {
    set_inclusion_input('');
    set_inclusions_error(false);
    on_close();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box rounded-box max-w-xl w-full p-0 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-base-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
              <Star size={14} className="text-accent-content" />
            </div>
            <h3 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
              {modal_title}
            </h3>
          </div>
          <button
            type="button"
            onClick={handle_close}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handle_submit}>
          <div className="px-6 py-6 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">

            {/* Name & Price — two-column grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                    Package Name
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-field font-primary font-bold text-sm uppercase tracking-wide w-full"
                  placeholder="e.g., GOLD"
                  value={active_package.name}
                  onChange={(e) => handle_field('name', e.target.value.toUpperCase())}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                    Price (RWF)
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  className="input input-bordered rounded-field font-secondary text-sm w-full"
                  placeholder="e.g., 45000"
                  value={active_package.price}
                  onChange={(e) => handle_field('price', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Description — full width */}
            <div>
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Description
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered rounded-field font-secondary text-sm w-full min-h-[80px] resize-none"
                placeholder="Briefly describe what this package offers..."
                value={active_package.description}
                onChange={(e) => handle_field('description', e.target.value)}
                required
              />
            </div>

            {/* Inclusions */}
            <div>
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Inclusions
                </span>
              </label>

              {/* Existing inclusions list */}
              <div className={`mb-3 flex flex-col gap-1.5 min-h-9 ${inclusions_error ? 'rounded-field outline-2 outline-error p-2' : ''}`}>
                {active_package.inclusions.length === 0 ? (
                  <p className={`font-secondary text-xs italic py-1 ${inclusions_error ? 'text-error' : 'text-base-content/30'}`}>
                    {inclusions_error ? 'At least one inclusion is required.' : 'No inclusions added yet.'}
                  </p>
                ) : (
                  active_package.inclusions.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 bg-base-200 rounded-field px-3 py-2"
                    >
                      <span className="font-secondary text-sm text-base-content/80">
                        {item}
                      </span>
                      <button
                        type="button"
                        onClick={() => handle_remove_inclusion(index)}
                        className="text-base-content/30 hover:text-error transition-colors flex-shrink-0"
                        aria-label={`Remove ${item}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inclusion_input}
                  onChange={(e) => set_inclusion_input(e.target.value)}
                  onKeyDown={handle_inclusion_key}
                  placeholder="e.g., School Enrollment Assistance"
                  className="input input-bordered rounded-field font-secondary text-sm flex-1"
                />
                <button
                  type="button"
                  onClick={handle_add_inclusion}
                  className="btn btn-accent rounded-field font-primary font-bold text-sm uppercase tracking-wide gap-2"
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>
            </div>

            {/* Mark as Popular toggle */}
            <div className="flex items-center justify-between p-3 bg-base-200 rounded-field">
              <div>
                <p className="font-secondary text-sm font-semibold text-base-content">
                  Mark as Popular
                </p>
                <p className="font-secondary text-xs text-base-content/40">
                  Highlights this package with an accent border and badge.
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                checked={active_package.is_popular}
                onChange={(e) => handle_field('is_popular', e.target.checked)}
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-base-200 bg-base-100">
            <button
              type="button"
              onClick={handle_close}
              className="btn btn-ghost rounded-field font-primary font-bold text-sm uppercase tracking-wide"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-accent rounded-field font-primary font-bold text-sm uppercase tracking-wide gap-2"
            >
              <Save size={14} />
              {is_edit ? 'Save Package' : 'Create Package'}
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop bg-black/40" onClick={handle_close} />
    </div>
  );
}