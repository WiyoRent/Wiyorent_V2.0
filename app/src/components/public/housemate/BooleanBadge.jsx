import { CheckCircle, XCircle } from 'lucide-react';

export default function BooleanBadge({ value, true_label, false_label }) {
  return value ? (
    <span className="inline-flex items-center gap-1.5 text-success font-secondary text-sm font-semibold">
      <CheckCircle size={15} className="text-success" />
      {true_label}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-error font-secondary text-sm font-semibold">
      <XCircle size={15} className="text-error" />
      {false_label}
    </span>
  );
}
