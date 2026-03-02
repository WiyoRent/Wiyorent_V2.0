import { ShieldCheck, GraduationCap, MapPin, Wallet } from 'lucide-react';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';

const format_rwf = (n) => `RWF ${new Intl.NumberFormat('rw-RW').format(n)}`;

const URGENCY_MAP = {
  not_urgent: {
    label: 'Just Browsing',
    sublabel: 'No rush finding a housemate',
    color: 'text-success',
    bg: 'bg-success/10 border border-success/30',
    dot: 'bg-success',
  },
  slightly_urgent: {
    label: 'Looking Soon',
    sublabel: 'Needs a housemate within weeks',
    color: 'text-warning',
    bg: 'bg-warning/10 border border-warning/30',
    dot: 'bg-warning',
  },
  extremely_urgent: {
    label: 'Needs a housemate ASAP',
    sublabel: 'Looking for a housemate urgently',
    color: 'text-error',
    bg: 'bg-error/10 border border-error/30',
    dot: 'bg-error',
  },
};

function HeroAvatar({ full_name, avatar_url, gender }) {
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

export default function ProfileHero({
  full_name,
  avatar_url,
  nationality,
  university_name,
  is_verified,
  gender,
  preferred_locations,
  budget,
  urgency,
}) {
  const urgencyMeta = URGENCY_MAP[urgency];

  return (
    <div className="bg-base-100 rounded-box shadow-sm overflow-hidden">
      {/* Accent band */}
      <div className="h-2 bg-accent w-full" />

      <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <HeroAvatar full_name={full_name} avatar_url={avatar_url} gender={gender} />

        {/* Info block */}
        <div className="flex-1 min-w-0">

          {/* Name + badges row */}
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-primary text-3xl sm:text-4xl font-extrabold text-base-content uppercase tracking-tight leading-none">
              {full_name}
            </h1>

            {is_verified && (
              <span className="inline-flex items-center gap-1.5 bg-success/10 text-success border border-success/25 px-2.5 py-1 rounded-field text-xs font-primary font-bold uppercase tracking-wide flex-shrink-0">
                <ShieldCheck size={12} />
                Verified
              </span>
            )}

            {urgencyMeta && (
              <div className={`inline-flex items-center gap-2 ${urgencyMeta.bg} ${urgencyMeta.color} px-2.5 py-1.5 rounded-field flex-shrink-0`}>
                <span className={`w-1.5 h-1.5 rounded-full ${urgencyMeta.dot} flex-shrink-0 animate-pulse`} />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-primary font-bold uppercase tracking-wide">
                    {urgencyMeta.label}
                  </span>
                  <span className="text-[10px] font-secondary opacity-70 normal-case tracking-normal">
                    {urgencyMeta.sublabel}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Nationality chip */}
          <div className="mt-2 flex w-fit gap-2 font-secondary text-xs text-base-content/45 bg-base-200 px-2.5 py-1 rounded-field">
            <span>
              <ReactCountryFlag countryCode={nationality} svg />
            </span>
            <span>{countryList()?.getLabel(nationality)}</span>
          </div>

          {/* University */}
          <div className="flex items-center gap-2 mt-3">
            <GraduationCap size={15} className="text-accent flex-shrink-0" />
            <span className="font-secondary text-sm text-base-content/65">
              {university_name}
            </span>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-2 mt-1.5">
            <Wallet size={15} className="text-accent flex-shrink-0" />
            <span className="font-secondary text-sm text-base-content/65">
              {format_rwf(budget?.min)} – {format_rwf(budget?.max)} / month
            </span>
          </div>

          {/* Location pills */}
          <div className="flex items-center gap-2 flex-wrap mt-3">
            <MapPin size={13} className="text-base-content/30 flex-shrink-0" />
            {preferred_locations?.map((loc) => (
              <span
                key={loc}
                className="bg-accent text-accent-content font-primary text-xs font-bold px-3 py-1 rounded-field uppercase tracking-wide shadow-sm"
              >
                {loc}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}