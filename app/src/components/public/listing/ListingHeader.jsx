"use client"
import { MapPin, Bed, Bath, Users, ShieldCheck, Sofa } from 'lucide-react';
import WiyorentHouseBadge from './WiyorentHouseBadge';
import { useEffect } from 'react';
import { trackView } from '@/actions/public/track_view.action';


export default function ListingHeader({
  title,
  street_address,
  neighborhood,
  city,
  country,
  specifications,
  is_verified,
  is_furnished,
  is_a_wiyorent_house,
  listing_id
}) {

  useEffect(() => {
    trackView(listing_id)
  }, [listing_id])

  const full_address = [street_address, neighborhood, city, country]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="bg-base-100 rounded-box p-6 shadow-sm">
      {/* Badges row */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        {is_a_wiyorent_house && <WiyorentHouseBadge />}
        {is_verified && (
          <span className="inline-flex items-center gap-1.5 bg-success/10 text-success border border-success/20 px-2.5 py-1 rounded-field text-xs font-primary font-bold uppercase tracking-wide">
            <ShieldCheck size={12} />
            Verified
          </span>
        )}
        {is_furnished && (
          <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent-content border border-accent/20 px-2.5 py-1 rounded-field text-xs font-primary font-bold uppercase tracking-wide">
            <Sofa size={12} />
            Furnished
          </span>
        )}
        <span className="inline-flex items-center gap-1 bg-base-200 text-base-content/60 px-2.5 py-1 rounded-field text-xs font-secondary capitalize">
          {specifications?.property_type}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-primary text-2xl sm:text-3xl font-extrabold text-base-content uppercase leading-tight">
        {title}
      </h1>

      {/* Address */}
      <div className="flex items-center gap-1.5 mt-2">
        <MapPin size={14} className="text-base-content/40 flex-shrink-0" />
        <span className="font-secondary text-sm text-base-content/50">
          {full_address}
        </span>
      </div>

      {/* Spec chips */}
      <div className="flex flex-wrap gap-3 mt-5">
        <div className="flex items-center gap-2 bg-base-200 px-3 py-2 rounded-field">
          <Bed size={16} className="text-primary" />
          <span className="font-secondary text-sm font-semibold text-base-content">
            {specifications?.bedroom_number}{' '}
            {specifications?.bedroom_number === 1 ? 'Bedroom' : 'Bedrooms'}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-base-200 px-3 py-2 rounded-field">
          <Bath size={16} className="text-primary" />
          <span className="font-secondary text-sm font-semibold text-base-content">
            {specifications?.bathroom_number}{' '}
            {specifications?.bathroom_number === 1 ? 'Bathroom' : 'Bathrooms'}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-base-200 px-3 py-2 rounded-field">
          <Users size={16} className="text-primary" />
          <span className="font-secondary text-sm font-semibold text-base-content">
            {specifications?.max_roommates} Roommates
          </span>
        </div>
      </div>
    </div>
  );
}