export default function StatusBadge({ status }) {
  const variants = {
    pending: 'badge-info',
    approved: 'badge-success',
    rejected: 'badge-error',
  };
  const labels = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
  };

  return (
    <span className={`badge ${variants[status]} badge-sm font-primary font-bold uppercase tracking-wide`}>
      {labels[status]}
    </span>
  );
}