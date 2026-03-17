import { ShieldCheck } from 'lucide-react';

export default function StatusBadge({ available_status }) {
  const is_available = available_status === 'available';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-field text-xs font-primary font-bold uppercase tracking-wide ${
        is_available
          ? 'bg-success text-success-content'
          : 'bg-error text-error-content'
      }`}
    >
      {is_available ? (
        <ShieldCheck size={12} />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
      )}
      {is_available ? 'Available' : 'Booked'}
    </span>
  );
}
