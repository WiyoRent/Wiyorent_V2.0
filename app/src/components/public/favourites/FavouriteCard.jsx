'use client';

import { useEffect, useState } from 'react';
import {
  Heart,
  MapPin,
  ShieldCheck,
  Bed,
  Bath,
  Users,
  Wifi,
  UtensilsCrossed,
  Microwave,
  Home,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { toggleSaveListing } from '@/actions/favorites';

const amenity_icon_map = {
  wifi: Wifi,
  stove: UtensilsCrossed,
  microwave: Microwave,
};

function AmenityBadge({ amenity }) {
  const IconComponent = amenity_icon_map[amenity] || Home;
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

export default function FavouriteCard({ listing }) {
  const [is_removed, set_is_removed] = useState(false);
  const [show_confirm, set_show_confirm] = useState(false);
  
  const is_available = listing.available_status === 'available';
  const formatted_price = new Intl.NumberFormat('rw-RW').format(
    listing?.financials?.price_per_month
  );

  useEffect(() => {
    toggleSaveListing(listing?.listing_id, !is_removed)
  }, [is_removed])

  const handle_remove = () => {
    console.log('Removing from favourites:', listing?.listing_id);
    set_is_removed(true);
  };

  if (is_removed) {
    return (
      <div className="bg-base-100 rounded-box shadow-sm p-8 flex flex-col items-center justify-center text-center opacity-50 border-2 border-dashed border-base-300">
        <Trash2 size={32} className="text-base-content/30 mb-3" />
        <p className="font-secondary text-sm text-base-content/50">
          Removed from favourites
        </p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-box shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative">
      
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 sm:h-52 bg-base-300">
        <Link href={`/listings/${listing?.listing_id}`}>
            <img
            src={listing?.thumbnail_url}
            alt={listing?.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            />
        </Link>

        {/* Status Badge - Top Left */}
        <div className="absolute top-3 left-3">
          <StatusBadge available_status={listing?.available_status} />
        </div>

        {/* Remove Button - Top Right */}
        <div className="absolute top-3 right-3">
          {show_confirm ? (
            <div className="flex gap-1">
              <button
                onClick={handle_remove}
                className="w-9 h-9 bg-error rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Confirm remove"
              >
                <Trash2 size={14} className="text-error-content" />
              </button>
              <button
                onClick={() => set_show_confirm(false)}
                className="w-9 h-9 bg-base-100 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Cancel"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => set_show_confirm(true)}
              className="w-9 h-9 bg-base-100 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Remove from favourites"
            >
              <Heart size={16} className="fill-error text-error" />
            </button>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="font-primary text-2xl font-extrabold text-primary">
            RWF {formatted_price}
          </span>
          <span className="font-secondary text-sm text-base-content/50">
            / month
          </span>
        </div>

        {/* Title */}
        <Link href={`/listings/${listing?.listing_id}`} className="hover:text-primary transition-colors">
          <h2 className="font-primary text-base font-bold text-base-content leading-snug">
            {listing.title}
          </h2>
        </Link>
        <div className="flex items-center gap-1">
          <MapPin size={13} className="text-base-content/40 flex-shrink-0" />
          <span className="font-secondary text-sm text-base-content/50">
            {listing.neighborhood}, {listing.city}
          </span>
        </div>

        {/* Specs Row */}
        <div className="flex items-center gap-3 text-sm font-secondary text-base-content/60">
          <span className="flex items-center gap-1">
            <Bed size={14} />
            {listing?.specifications?.bedroom_number}
          </span>
          <span className="text-base-content/30">•</span>
          <span className="flex items-center gap-1">
            <Bath size={14} />
            {listing?.specifications?.bathroom_number}
          </span>
          <span className="text-base-content/30">•</span>
          <span className="flex items-center gap-1">
            <Users size={14} />
            { listing?.specifications?.max_roommates}
          </span>
        </div>


        {/* Single Action Button */}
        <div className="mt-auto pt-2">
          {is_available ? (
            <Link
              href={`/listings/${listing?.listing_id}/book`}
              className="btn btn-accent w-full rounded-field font-primary font-bold text-sm uppercase tracking-wide transition-all duration-200 active:scale-95"
            >
              Book Now
            </Link>
          ) : (
            <button
              disabled
              className="btn btn-disabled w-full rounded-field font-primary font-bold text-sm uppercase tracking-wide"
            >
              Already Booked
            </button>
          )}
        </div>
      </div>
    </div>
  );
}