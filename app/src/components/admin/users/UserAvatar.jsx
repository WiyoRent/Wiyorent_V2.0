export default function UserAvatar({ full_name, avatar_url }) {
  const initials = full_name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (avatar_url) {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        <img src={avatar_url} alt={full_name} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
      <span className="font-primary text-sm font-extrabold text-accent-content">{initials}</span>
    </div>
  );
}
