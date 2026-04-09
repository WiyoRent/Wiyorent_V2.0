import Image from 'next/image';

export default function AvatarCircle({ full_name, avatar_url, gender }) {
  const initials = full_name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const gender_color =
    gender === 'female'
      ? 'from-rose-300 to-pink-400'
      : gender === 'male'
      ? 'from-sky-300 to-blue-400'
      : 'from-violet-300 to-indigo-400';
  if (avatar_url && !avatar_url.includes('api.wiyorent.com')) {
    return (
      <div className="relative w-20 h-20 rounded-full overflow-hidden border border-accent shadow-md flex-shrink-0">
        <Image fill src={avatar_url} alt={full_name} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`w-20 h-20 rounded-full bg-gradient-to-br ${gender_color} ring-4 ring-base-100 shadow-md flex items-center justify-center flex-shrink-0`}
    >
      <span className="font-primary text-2xl font-extrabold text-white drop-shadow-sm">
        {initials}
      </span>
    </div>
  );
}
