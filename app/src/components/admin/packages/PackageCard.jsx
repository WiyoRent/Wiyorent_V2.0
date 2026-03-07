import { useState } from 'react';
import { Pencil, Check, Trash2 } from 'lucide-react';

export default function PackageCard({ pkg, on_edit, on_delete }) {
  const [confirming_delete, set_confirming_delete] = useState(false);
  const { name, description, price, is_popular, inclusions } = pkg;

  return (
    <div
      className={`
        bg-base-100 rounded-box shadow-md flex flex-col relative
        ${is_popular ? 'border-2 border-accent' : 'border border-base-200'}
      `}
    >
      {/* Popular Badge — floating tab centered at the top edge */}
      {is_popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-accent text-accent-content px-4 py-1 rounded-md font-primary font-bold text-[10px] uppercase tracking-widest shadow-sm whitespace-nowrap">
            Popular
          </span>
        </div>
      )}

      {/* Card Body */}
      <div className="p-8 flex-1">
        {/* Name — accent colored when popular */}
        <h2
          className={`
            font-primary text-2xl font-extrabold uppercase tracking-tight mb-1
            ${is_popular ? 'text-accent' : 'text-base-content'}
          `}
        >
          {name}
        </h2>

        {/* Description */}
        <p className="font-secondary text-sm text-base-content/50 mb-6 min-h-[40px]">
          {description}
        </p>

        {/* Price — large display matching image */}
        <div className="flex items-baseline gap-1 mb-8">
          <span className="font-primary text-4xl font-black text-base-content">
            RWF{price.toLocaleString()}
          </span>
          <span className="font-secondary text-sm text-base-content/40 font-medium">
            /once
          </span>
        </div>

        {/* Inclusions */}
        <div className="flex flex-col gap-3">
          {/* Contextual sub-header */}
          {(name.toLowerCase() === 'premium' || name.toLowerCase() === 'gold') && (
            <p className="font-secondary text-[10px] font-bold uppercase tracking-widest text-base-content/30">
              Everything in{' '}
              {name.toLowerCase() === 'gold' ? 'Premium' : 'Standard'}, Plus:
            </p>
          )}

          {inclusions.length === 0 ? (
            <p className="font-secondary text-xs text-base-content/30 italic">
              No inclusions added.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {inclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check
                    size={16}
                    className="text-success mt-0.5 flex-shrink-0"
                    strokeWidth={3}
                  />
                  <span className="font-secondary text-sm text-base-content/70 leading-tight">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-8 pb-8 flex flex-col gap-2">
        <button
          type="button"
          onClick={on_edit}
          className={`
            btn btn-block rounded-md font-primary font-bold text-xs uppercase tracking-widest gap-2 transition-all
            ${is_popular
              ? 'btn-accent shadow-md'
              : 'bg-[#FDF8EE] hover:bg-[#F5EDDA] text-base-content border-none shadow-none'
            }
          `}
        >
          <Pencil size={14} />
          Edit Package Details
        </button>

        {!confirming_delete ? (
          <button
            type="button"
            onClick={() => set_confirming_delete(true)}
            className="btn btn-block btn-ghost rounded-md font-primary font-bold text-xs uppercase tracking-widest gap-2 text-base-content/30 hover:text-error hover:bg-error/10 transition-all"
          >
            <Trash2 size={14} />
            Delete
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 animate-in fade-in duration-150">
            <span className="font-secondary text-xs text-error">Delete this package?</span>
            <button
              type="button"
              onClick={() => { on_delete(pkg.package_id); set_confirming_delete(false); }}
              className="btn btn-error btn-sm h-7 min-h-0 font-primary text-[11px] uppercase tracking-wide"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => set_confirming_delete(false)}
              className="btn btn-ghost btn-sm h-7 min-h-0 font-primary text-[11px] uppercase tracking-wide"
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
}