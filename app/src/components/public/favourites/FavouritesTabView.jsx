'use client';

import { useState } from 'react';
import { Heart, Users } from 'lucide-react';
import FavouritesGrid from '@/components/public/favourites/FavouritesGrid';
import SavedProfilesGrid from '@/components/public/favourites/SavedProfilesGrid';

export default function FavouritesTabView({ listings, profiles, verification_status }) {
  const [active_tab, set_active_tab] = useState('listings');

  const tabs = [
    { key: 'listings', label: 'Listings', count: listings.length, icon: Heart },
    { key: 'profiles', label: 'Housemates', count: profiles.length, icon: Users },
  ];

  return (
    <div>
      {/* Tabs */}
      <div role="tablist" className="tabs tabs-box w-fit mb-6">
        {tabs.map(({ key, label, count, icon: Icon }) => {
          const is_active = active_tab === key;
          return (
            <a
              key={key}
              role="tab"
              onClick={() => set_active_tab(key)}
              className={`tab font-primary font-bold text-xs uppercase tracking-wider gap-2 ${
                is_active ? 'tab-active' : ''
              }`}
            >
              <Icon
                size={14}
                className={
                  is_active
                    ? key === 'listings'
                      ? 'text-error fill-error'
                      : 'text-primary'
                    : 'opacity-50'
                }
              />
              {label}
              <span className="badge badge-sm font-extrabold">{count}</span>
            </a>
          );
        })}
      </div>

      {/* Content */}
      {active_tab === 'listings' ? (
        <FavouritesGrid listings={listings} />
      ) : (
        <SavedProfilesGrid profiles={profiles} verification_status={verification_status} />
      )}
    </div>
  );
}