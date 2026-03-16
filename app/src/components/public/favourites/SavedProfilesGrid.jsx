'use client';

import { Users } from 'lucide-react';
import HousemateCard from '@/components/public/housemates/HousemateCard';
import Link from 'next/link';

export default function SavedProfilesGrid({ profiles, verification_status }) {
  if (!profiles || profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mb-4">
          <Users size={28} className="text-base-content/30" />
        </div>
        <h3 className="font-primary text-lg font-bold text-base-content/50 uppercase tracking-wide">
          No saved profiles yet
        </h3>
        <p className="font-secondary text-sm text-base-content/40 mt-2 max-w-xs">
          Browse housemate profiles and save the ones you're interested in connecting with.
        </p>
        <Link
          href="/housemates"
          className="btn btn-accent btn-sm rounded-field font-primary font-bold uppercase tracking-wide mt-6"
        >
          Browse Housemates
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
      {profiles.map((profile) => (
        <HousemateCard
          key={profile.profile_id}
          profile={profile}
          my_verification_status={verification_status}
        />
      ))}
    </div>
  );
}