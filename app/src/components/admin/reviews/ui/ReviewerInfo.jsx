export default function ReviewerInfo({ name, avatar }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      {avatar ? (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
          <span className="font-primary text-xs font-extrabold text-accent-content">
            {initials}
          </span>
        </div>
      )}
      <span className="font-secondary text-sm font-semibold text-base-content">
        {name}
      </span>
    </div>
  );
}