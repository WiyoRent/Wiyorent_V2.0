'use client';

import { useState, useRef, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Info } from 'lucide-react';

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    label: 'Pending',
    colors: 'bg-warning/15 text-warning border-warning/30',
    tip: "Your review is awaiting moderation. It's visible to you now but will only be shown publicly once approved by our team — usually within 24 hours.",
  },
  approved: {
    icon: CheckCircle,
    label: 'Approved',
    colors: 'bg-success/15 text-success border-success/30',
    tip: 'This review has been verified and is publicly visible to all users.',
  },
  rejected: {
    icon: XCircle,
    label: 'Rejected',
    colors: 'bg-error/15 text-error border-error/30',
    tip: "This review did not meet our community guidelines and won't be shown publicly. You may edit and resubmit it.",
  },
};

export default function StatusBadge({ status }) {
  const [show, set_show] = useState(false);
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  const Icon = cfg.icon;
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) set_show(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-flex items-center gap-1.5">
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider font-primary ${cfg.colors}`}
      >
        <Icon size={10} />
        {cfg.label}
      </span>
      <button
        onClick={() => set_show((s) => !s)}
        className="text-base-content/30 hover:text-base-content/60 transition-colors"
        aria-label="Status info"
      >
        <Info size={13} />
      </button>

      {show && (
        <div className="absolute left-0 top-full mt-2 z-50 w-64 bg-base-100 border border-base-300 rounded-box shadow-xl p-3 animate-in fade-in slide-in-from-top-1 duration-150">
          <p className="font-primary text-[11px] font-extrabold uppercase tracking-widest text-base-content mb-1 flex items-center gap-1.5">
            <Icon size={11} className={cfg.colors.split(' ')[1]} />
            {cfg.label} Review
          </p>
          <p className="font-secondary text-xs text-base-content/60 leading-relaxed">
            {cfg.tip}
          </p>
          <span className="absolute -top-1.5 left-4 w-3 h-3 bg-base-100 border-l border-t border-base-300 rotate-45" />
        </div>
      )}
    </div>
  );
}