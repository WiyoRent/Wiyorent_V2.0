'use client';

import { useSession } from 'next-auth/react';
import ListingCard from '@/components/public/listings/ListingCard';
import { Building2 } from 'lucide-react';

export default function ListingsGrid({ listings }) {
  // Read the session once here instead of once per card - ListingCard only
  // needs to know whether the visitor is signed in for its like/waitlist
  // redirect-to-login check.
  const session = useSession();
  const isAuthenticated = !!session?.data?.user;

  // empty state shown when filters return no matching listings
  if (!listings || listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mb-4">
          <Building2 size={28} className="text-base-content/30" />
        </div>
        <h3 className="font-primary text-xl font-bold text-base-content uppercase">
          No listings found
        </h3>
        <p className="font-secondary text-base-content/50 mt-2 text-sm">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
      {listings.map((listing, index) => (
        <ListingCard
          key={listing.listing_id}
          listing={listing}
          index={index}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
}