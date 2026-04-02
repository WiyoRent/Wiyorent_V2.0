'use client';
// /components/admin/shared/ListingFormStepper.jsx
// Shared stepper shell used by both Create and Edit listing pages.
// Renders the step indicator + Back/Next navigation.
// The final step renders `submit_node` in place of the Next button.

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ListingFormStepper({
  steps,
  current_step,
  on_next,
  on_back,
  submit_node,
  children,
}) {
  const is_last_step = current_step === steps.length;

  return (
    <div className="flex flex-col gap-6">

      {/* ── Step indicator ───────────────────────────────────────────── */}
      <div className="bg-base-100 rounded-box shadow-sm px-6 py-5">
        {/* Label row */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-secondary text-xs font-semibold text-base-content/50 uppercase tracking-wide">
            Step {current_step} of {steps.length}
          </span>
          <span className="font-primary text-xs font-extrabold text-accent uppercase tracking-widest">
            {steps[current_step - 1].label}
          </span>
        </div>

        {/* Circles + connectors */}
        <div className="flex items-center">
          {steps.map((step, idx) => {
            const is_complete = idx + 1 < current_step;
            const is_active = idx + 1 === current_step;
            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  font-primary text-xs font-extrabold transition-all duration-200
                  ${is_active  ? 'bg-accent text-accent-content ring-2 ring-accent ring-offset-2' : ''}
                  ${is_complete ? 'bg-secondary text-secondary-content' : ''}
                  ${!is_active && !is_complete ? 'bg-base-300 text-base-content/40' : ''}
                `}>
                  {is_complete ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-1 transition-all duration-300
                    ${idx + 1 < current_step ? 'bg-secondary' : 'bg-base-300'}
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step labels — hidden on mobile */}
        <div className="hidden sm:flex items-center mt-2">
          {steps.map((step, idx) => {
            const is_complete = idx + 1 < current_step;
            const is_active = idx + 1 === current_step;
            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <span className={`
                  font-secondary text-[10px] font-semibold w-8 text-center whitespace-nowrap
                  ${is_active   ? 'text-accent' : ''}
                  ${is_complete ? 'text-secondary' : ''}
                  ${!is_active && !is_complete ? 'text-base-content/30' : ''}
                `}>
                  {step.label}
                </span>
                {idx < steps.length - 1 && <div className="flex-1" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Step content ─────────────────────────────────────────────── */}
      {children}

      {/* ── Navigation ───────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {current_step > 1 && (
          <button
            type="button"
            onClick={() => { on_back(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="btn btn-outline rounded-field font-primary font-extrabold text-sm uppercase tracking-wider gap-2 sm:w-36"
          >
            <ChevronLeft size={16} />
            Back
          </button>
        )}

        {!is_last_step ? (
          <button
            type="button"
            onClick={() => { on_next(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="btn btn-accent flex-1 rounded-field font-primary font-extrabold text-sm uppercase tracking-wider gap-2"
          >
            Next
            <ChevronRight size={16} />
          </button>
        ) : (
          <div className="flex-1">
            {submit_node}
          </div>
        )}
      </div>

    </div>
  );
}
