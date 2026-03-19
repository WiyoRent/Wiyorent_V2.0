import HousemateCard from './HousemateCard';
import { Users } from 'lucide-react';
import InformationModal from '../shared/InformationModal';

export default function HousematesGrid({ profiles, verification_status, is_blocked, is_blocked_reason }) {

  if (!profiles || profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mb-4">
          <Users size={28} className="text-base-content/30" />
        </div>
        <h3 className="font-primary text-xl font-bold text-base-content uppercase">
          No Housemates Found
        </h3>
        <p className="font-secondary text-base-content/45 mt-2 text-sm max-w-xs">
          Try adjusting your filters to discover more student profiles.
        </p>
      </div>
    );
  }

  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
      {profiles.map((profile) => (
        <HousemateCard my_verification_status={verification_status} my_is_blocked={is_blocked} my_is_blocked_reason={is_blocked_reason} key={profile.profile_id} profile={profile} />
      ))}
    </div>
  );
}