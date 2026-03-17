export default function HeroAvatar({ full_name, avatar_url, gender }) {
  const initials = full_name
    ?.split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const gender_gradient =
    gender === 'female'
      ? 'from-rose-300 via-pink-300 to-fuchsia-400'
      : gender === 'male'
      ? 'from-sky-300 via-blue-300 to-indigo-400'
      : 'from-violet-300 to-purple-400';

  if (avatar_url && !avatar_url.includes('api.wiyorent.com')) {
    return (
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-accent ring-4 ring-base-100 shadow-xl flex-shrink-0">
        <img src={avatar_url} alt={full_name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br ${gender_gradient} ring-4 ring-base-100 shadow-xl flex items-center justify-center flex-shrink-0`}
    >
      <span className="font-primary text-3xl sm:text-4xl font-extrabold text-white drop-shadow">
        {initials}
      </span>
    </div>
  );
}
