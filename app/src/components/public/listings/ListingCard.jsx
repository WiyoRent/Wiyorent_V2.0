'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toggleSaveListing, toggleWaitlistListing } from '@/actions/public/favorites.action';
import { useEffect } from 'react';

import {
  Wifi,
  UtensilsCrossed,
  Microwave,
  Heart,
  MapPin,
  ShieldCheck,
  Bed,
  Bath,
  Users,
  Home,
  Building2,
  Info,
  ClipboardList,
} from 'lucide-react';

import Link from 'next/link';


// Map amenity strings to Lucide icons
const amenity_icon_map = {
  wifi: Wifi,
  stove: UtensilsCrossed,
  microwave: Microwave,
  // blender was removed
};

const amenity_fallback_icon = Home;

function AmenityBadge({ amenity }) {
  const iconKey = amenity.toLowerCase();
  const IconComponent = amenity_icon_map[iconKey] || amenity_fallback_icon;
  
  return (
    <div
      className="w-8 h-8 rounded-field bg-base-300 flex items-center justify-center flex-shrink-0"
      title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
    >
      <IconComponent size={15} className="text-base-content/70" />
    </div>
  );
}

function StatusBadge({ available_status }) {
  const is_available = available_status === 'available';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-field text-xs font-primary font-bold uppercase tracking-wide ${
        is_available
          ? 'bg-success text-success-content'
          : 'bg-error text-error-content'
      }`}
    >
      {is_available ? (
        <ShieldCheck size={12} />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
      )}
      {is_available ? 'Available' : 'Booked'}
    </span>
  );
}

export default function ListingCard({ listing }) {
  console.log(listing.is_saved, '----is_SAVED')
  const [is_liked, set_is_liked] = useState(listing.is_saved || false);
  const [on_waitlist, set_on_waitlist] = useState(listing.is_on_waitlist || false);
  const is_available = listing.available_status === 'available';

  const price = listing.financials?.price_per_month || 0;
  const formatted_price = new Intl.NumberFormat('rw-RW').format(price);

  const router = useRouter()
  const session = useSession()

  const saveListing = async (listingId) => {
    set_is_liked(!is_liked)
    
  }

  useEffect(() => {
    toggleSaveListing(listing.listing_id, is_liked)
  }, [is_liked])

  const handleWaitlist = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!session?.data) {
      router.push('/login')
      return
    }

    const next = !on_waitlist
    set_on_waitlist(next)
    toggleWaitlistListing(listing.listing_id, next)
  }

  const handleLike = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if(!session?.data){
      router.push('/login')
      return 
    }

    saveListing(listing.listing_id)
  }

  return (
    <>
      <Link href={`/listings/${listing.listing_id}`}>
        <div className="bg-base-100 rounded-box shadow-md flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
          <div className="relative overflow-hidden h-48 sm:h-52 bg-base-300 rounded-t-2xl">
            <img
              src={listing.thumbnail_url}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute top-3 left-3">
              <StatusBadge available_status={listing.available_status} />
            </div>

            <button
              onClick={(e) => handleLike(e)}
              className="absolute top-3 right-3 w-9 h-9 bg-base-100 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Save listing"
            >
              <Heart
                size={16}
                className={`transition-colors duration-200 ${
                  is_liked
                    ? 'fill-error text-error'
                    : 'text-base-content/50 hover:text-error'
                }`}
              />
            </button>
          </div>

          <div
            className={`tooltip tooltip-bottom relative z-50 w-full ${listing.is_a_wiyorent_house ? '' : 'invisible'}`}
            data-tip="Owned & managed by WiyoRent · No agency fee charged"
          >
            <div className="bg-accent/15 border-b border-accent/25 px-3 py-1.5 flex items-center justify-center gap-1.5 w-full">
              <span className="font-primary text-xs font-bold text-accent uppercase tracking-wide">
                WiyoRent House
              </span>
              <Info size={11} className="text-accent" />
            </div>
          </div>

          <div className="p-4 flex flex-col flex-1 gap-3">
            <div className="flex items-baseline gap-1">
              <span className="font-primary text-2xl font-extrabold text-primary">
                RWF {formatted_price}
              </span>
              <span className="font-secondary text-sm text-base-content/50">
                / month
              </span>
            </div>

            <div>
              <h2 className="font-primary text-base font-bold text-base-content leading-snug">
                {listing.title}
              </h2>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={13} className="text-base-content/40 flex-shrink-0" />
                <span className="font-secondary text-sm text-base-content/50">
                  {listing.neighborhood}, {listing.city}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm font-secondary text-base-content/60">
              <span className="flex items-center gap-1">
                <Bed size={14} />
                {listing.specifications.bedroom_number}
              </span>
              <span className="text-base-content/30">•</span>
              <span className="flex items-center gap-1">
                <Bath size={14} />
                {listing.specifications.bathroom_number}
              </span>
              <span className="text-base-content/30">•</span>
              <span className="flex items-center gap-1">
                <Users size={14} />
                {listing.specifications.max_housemates || listing.specifications.max_roommates}
              </span>
            </div>

            {listing.amenities && listing.amenities.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {listing.is_verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-field bg-base-300 text-xs font-primary text-base-content/60">
                    <ShieldCheck size={12} className="text-success" />
                    Verified
                  </span>
                )}
              </div>
            )}

            <div className="mt-auto pt-1 flex items-center gap-2">
              {is_available ? (
                <button className="flex-1 btn btn-accent rounded-field font-primary font-bold text-sm uppercase tracking-wide transition-all duration-200 active:scale-95">
                  Book Now
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 btn btn-disabled rounded-field font-primary font-bold text-sm uppercase tracking-wide cursor-not-allowed opacity-60"
                >
                  Booked
                </button>
              )}

              <button
                onClick={handleWaitlist}
                className={`tooltip tooltip-top btn btn-square rounded-field border-2 transition-all duration-200 active:scale-95 ${
                  on_waitlist
                    ? 'bg-accent border-accent text-accent-content shadow-md scale-105'
                    : 'bg-base-100 border-base-300 text-base-content/40 hover:border-accent hover:text-accent-content hover:bg-accent/10'
                }`}
                data-tip={on_waitlist ? 'Leave waitlist' : 'Join waitlist'}
                aria-label="Join waitlist"
              >
                <ClipboardList size={16} />
              </button>
            </div>
          </div>
        </div>
      </Link>
      
    </>
    
  );
}