export default function VerificationBadge({ status }) {
  const variants = { pending: 'badge-warning', approved: 'badge-success', rejected: 'badge-error' };
  const labels   = { pending: 'Pending',        approved: 'Approved',      rejected: 'Rejected'  };
  return (
    <span className={`badge ${variants[status] ?? 'badge-neutral'} badge-sm font-primary font-bold uppercase tracking-wide`}>
      {labels[status] ?? status}
    </span>
  );
}
