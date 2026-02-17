'use client';

import { useState } from 'react';
import { ShieldCheck, MapPin, GraduationCap, Wallet } from 'lucide-react';
import Link from 'next/link';

const format_rwf = (n) => `RWF ${new Intl.NumberFormat('rw-RW').format(n)}`;

function AvatarCircle({ full_name, avatar_url, gender }) {
  // Deterministic gradient based on name initial
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
      <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-base-100 shadow-md flex-shrink-0">
        <img src={avatar_url} alt={full_name} className="w-full h-full object-cover" />
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

export default function HousemateCard({ profile }) {
  const [connected, set_connected] = useState(false);

  const {
    profile_id,
    full_name,
    university_name,
    bio_short,
    budget,
    preferred_locations,
    avatar_url,
    gender,
    is_verified,
  } = profile;

  return (
    <div className="bg-base-100 rounded-box shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col overflow-hidden group">

      {/* Card top — avatar + name block */}
      <div className="p-5 pb-4 flex items-start gap-4">
        <AvatarCircle full_name={full_name} avatar_url={avatar_url} gender={gender} />

        <div className="flex-1 min-w-0 pt-1">
          {/* Name + verified badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/housemates/${profile_id}`}
              className="font-primary text-base font-extrabold text-base-content uppercase tracking-tight hover:text-accent transition-colors leading-tight"
            >
              {full_name}
            </Link>
            {is_verified && (
              <ShieldCheck size={15} className="text-success flex-shrink-0" aria-label="Verified" />
            )}
          </div>

          {/* University */}
          <div className="flex items-center gap-1.5 mt-1">
            <GraduationCap size={13} className="text-base-content/35 flex-shrink-0" />
            <span className="font-secondary text-xs text-base-content/50 leading-snug truncate">
              {university_name}
            </span>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-1.5 mt-1">
            <Wallet size={13} className="text-base-content/35 flex-shrink-0" />
            <span className="font-secondary text-xs text-base-content/50">
              {format_rwf(budget.min)} – {format_rwf(budget.max)}
            </span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-5 pb-3">
        <p className="font-secondary text-sm text-base-content/60 leading-relaxed line-clamp-2">
          {bio_short}
        </p>
      </div>

      {/* Location pills */}
      <div className="px-5 pb-4 flex items-center gap-1.5 flex-wrap">
        <MapPin size={12} className="text-base-content/30 flex-shrink-0" />
        {preferred_locations.map((loc) => (
          <span
            key={loc}
            className="bg-accent/15 text-accent-content font-primary text-xs font-bold px-2.5 py-0.5 rounded-field border border-accent/25 uppercase tracking-wide"
          >
            {loc}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-base-200 mx-5" />

      {/* CTA row */}
      <div className="p-4 flex gap-2">
        <button
          onClick={() => set_connected(!connected)}
          className={`btn flex-1 rounded-field font-primary font-extrabold text-xs uppercase tracking-widest transition-all duration-200 active:scale-95 ${
            connected
              ? 'btn-outline border-success text-success hover:bg-success/10'
              : 'btn-accent'
          }`}
        >
          {connected ? '✓ Connected' : 'Connect'}
        </button>
        <Link
          href={`/housemates/${profile_id}`}
          className="btn btn-ghost btn-sm rounded-field font-secondary text-xs text-base-content/50 hover:text-primary px-3"
        >
          View
        </Link>
      </div>
    </div>
  );
}