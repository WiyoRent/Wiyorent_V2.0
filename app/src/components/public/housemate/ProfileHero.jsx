import { ShieldCheck, GraduationCap, MapPin, Wallet, UserPlus } from 'lucide-react';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';
import HeroAvatar from '@/components/public/housemate/HeroAvatar';

const format_rwf = (n) => `RWF ${new Intl.NumberFormat('rw-RW').format(n)}`;

const URGENCY_MAP = {
  not_urgent: {
    label: 'Just Browsing',
    sublabel: 'No rush finding a housemate',
    color: 'text-success',
    bg: 'bg-success/10 border border-success/30',
    dot: 'bg-success',
    sublabel_cls: 'text-success/75',
  },
  slightly_urgent: {
    label: 'Looking Soon',
    sublabel: 'Needs a housemate within weeks',
    color: 'text-warning',
    bg: 'bg-warning/10 border border-warning/30',
    dot: 'bg-warning',
    sublabel_cls: 'text-warning/75',
  },
  extremely_urgent: {
    label: 'Seeking Housemate',
    color: 'text-error',
    bg: 'bg-error/10 border border-error/30',
    dot: 'bg-error',
    use_icon: true,
    sublabel_cls: 'text-error/75',
  },
  flexible: {
    label: 'Flexible',
    sublabel: 'Open to any timeline',
    color: 'text-info',
    bg: 'bg-info/10 border border-info/30',
    dot: 'bg-info',
    sublabel_cls: 'text-info/75',
  },
};

const URGENCY_STATUS_LINE = {
  not_urgent:       { dot: 'bg-success',             text: 'No immediate urgency' },
  slightly_urgent:  { dot: 'bg-warning',             text: 'Looking for a place within weeks' },
  extremely_urgent: { dot: 'bg-error animate-pulse', text: 'Looking for a place urgently' },
  flexible:         { dot: 'bg-base-content/30',     text: 'Flexible \u2014 Open to any timeline' },
};

export default function ProfileHero({
  full_name,
  avatar_url,
  nationality,
  university_name,
  verification_status,
  gender,
  preferred_locations,
  budget,
  urgency,
  move_in_date,
  urgency_as_status_line = true,
}) {
  const urgencyMeta = URGENCY_MAP[urgency];
  const urgencyStatus = URGENCY_STATUS_LINE[urgency];

  const badge_sublabel = urgency === 'extremely_urgent'
    ? (move_in_date
        ? `Available from ${new Date(move_in_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
        : 'Open to new housemates')
    : urgencyMeta?.sublabel;

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

            {verification_status === 'approved' && (
              <span className="inline-flex items-center gap-1.5 bg-success/10 text-success border border-success/25 px-2.5 py-1 rounded-field text-xs font-primary font-bold uppercase tracking-wide flex-shrink-0">
                <ShieldCheck size={12} />
                Verified
              </span>
            )}

            {!urgency_as_status_line && urgencyMeta && (
              <div className={`inline-flex items-center gap-2 ${urgencyMeta.bg} ${urgencyMeta.color} px-2.5 py-1.5 rounded-field flex-shrink-0`}>
                {urgencyMeta.use_icon
                  ? <UserPlus size={14} className="flex-shrink-0" />
                  : <span className={`w-1.5 h-1.5 rounded-full ${urgencyMeta.dot} flex-shrink-0 animate-pulse`} />
                }
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-primary font-bold uppercase tracking-wide">
                    {urgencyMeta.label}
                  </span>
                  <span className={`text-[10px] font-secondary normal-case tracking-normal ${urgencyMeta.sublabel_cls}`}>
                    {badge_sublabel}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Urgency status line (admin view only) — sits directly below name row */}
          {urgency_as_status_line && urgencyStatus && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${urgencyStatus.dot}`} />
              <span className={`font-secondary textarea-md leading-none text-${urgencyStatus.dot}`}>
                {urgencyStatus.text}
              </span>
            </div>
          )}

          {/* Nationality chip */}
          <div className="mt-2 flex w-fit gap-2 font-secondary text-xs text-base-content/45 bg-base-200 px-2.5 py-1 rounded-field">
            <span>
              <ReactCountryFlag countryCode={nationality} svg />
            </span>
            {nationality && <span>{countryList()?.getLabel(nationality)}</span> }
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