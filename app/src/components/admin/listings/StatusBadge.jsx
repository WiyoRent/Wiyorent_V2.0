export default function StatusBadge({ status }) {
  const variants = {
    available: 'badge-success',
    booked: 'badge-error',
    maintenance: 'badge-warning',
  };

  const labels = {
    available: 'Available',
    booked: 'Booked',
    maintenance: 'Maintenance',
  };

  return (
    <span className={`badge ${variants[status]} badge-sm font-primary font-bold uppercase tracking-wide`}>
      {labels[status]}
    </span>
  );
}
