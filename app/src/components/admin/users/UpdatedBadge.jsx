import { RefreshCw } from 'lucide-react';

export default function UpdatedBadge() {
  return (
    <div className="flex items-center gap-1.5">
      <RefreshCw size={11} className="text-warning flex-shrink-0" />
      <span className="badge badge-warning badge-sm font-primary font-bold uppercase tracking-wide">
        Updated
      </span>
    </div>
  );
}
