'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toggleSaveListing, toggleWaitlistListing } from '@/actions/public/favorites.action';
import { formatRWF } from '@/lib/formatRWF';

import {
  Heart,
  MapPin,
  ShieldCheck,
  Bed,
  Bath,
  Users,
  Building2,
  Info,
  ClipboardList,
  MessageCircle,
} from 'lucide-react';

import Link from 'next/link';
import AmenityBadge from '@/components/public/listings/AmenityBadge';
import StatusBadge from '@/components/public/listings/StatusBadge';

export default function ListingCard({ listing }) {
  const [is_liked, set_is_liked] = useState(listing.is_saved || false);
  const [on_waitlist, set_on_waitlist] = useState(listing.is_on_waitlist || false);
  const is_available = listing.available_status === 'available';

  const price = listing.financials?.price_per_month || 0;

  const router = useRouter()
  const session = useSession()

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

  const handleBookNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const listing_url = `https://wiyorent.com/listings/${listing.listing_id}`;
    const message = encodeURIComponent(`Hi! I'm interested in booking this listing and would like to proceed:\n${listing_url}`);
    window.open(`https://wa.me/250794089835?text=${message}`, '_blank');
  };

  const handleLike = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!session?.data) {
      router.push('/login')
      return
    }

    const next = !is_liked
    set_is_liked(next)
    toggleSaveListing(listing.listing_id, next)
  }

  return (
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
            className={`tooltip tooltip-bottom relative z-[1] w-full ${listing.is_a_wiyorent_house ? '' : 'invisible'}`}
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
              <span className="font-primary text-2xl font-extrabold text-secondary">
                {formatRWF(price)}
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
                <button
                  onClick={handleBookNow}
                  className="flex-1 btn btn-accent rounded-field font-primary font-bold text-sm uppercase tracking-wide transition-all duration-200 active:scale-95 gap-1.5"
                >
                  <MessageCircle size={15} />
                  Book Now
                </button>
              ) : (
                <>
                  <button
                    disabled
                    className="flex-1 btn btn-disabled rounded-field font-primary font-bold text-sm uppercase tracking-wide cursor-not-allowed opacity-60"
                  >
                    Booked
                  </button>
                  <button
                    onClick={handleWaitlist}
                    className={`flex-1 btn rounded-field border-2 font-primary font-bold text-xs uppercase tracking-wide transition-all duration-200 active:scale-95 gap-1.5 ${
                      on_waitlist
                        ? 'bg-accent border-accent text-accent-content'
                        : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent hover:text-accent hover:bg-accent/10'
                    }`}
                  >
                    <ClipboardList size={14} />
                    {on_waitlist ? 'On Waitlist' : 'Join Waitlist'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
    </Link>
  );
}