export default function AccountStatusBadge({ status, is_blocked }) {
  if (is_blocked) {
    return (
      <span className="badge badge-error badge-sm font-primary font-bold uppercase tracking-wide">
        Blocked
      </span>
    );
  }
  const variants = { Pending: 'badge-warning', Active: 'badge-success', Inactive: 'badge-neutral' };
  return (
    <span className={`badge ${variants[status] ?? 'badge-neutral'} badge-sm font-primary font-bold uppercase tracking-wide`}>
      {status}
    </span>
  );
}
