'use client';
import {
  Home, Bed, Bath, Sofa, Users, Phone,
  CalendarDays, Banknote,
} from 'lucide-react';
import ImageCarousel from '@/components/shared/ImageCarousel';

const format_rwf = (n) => `RWF ${new Intl.NumberFormat('rw-RW').format(n)}`;

export default function UserListingSection({ listing }) {
  if (!listing?.price) return null;

  const available = listing?.available_from
    ? new Date(listing.available_from).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <div className="mt-8 bg-base-100 rounded-box shadow-sm overflow-hidden">

      {/* Section header */}
      <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-base-200 flex items-center gap-3">
        <div className="p-2 bg-accent/10 rounded-field">
          <Home size={18} className="text-accent" />
        </div>
        <div>
          <h2 className="font-primary text-lg font-extrabold text-base-content uppercase tracking-tight">
            Available House
          </h2>
          <p className="font-secondary text-xs text-base-content/45 mt-0.5">
            This user already has a place — they're looking for a housemate to join them
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left — image carousel */}
        <ImageCarousel images={listing?.image_urls} />

        {/* Right — listing details */}
        <div className="flex flex-col gap-5">

          {/* Price block */}
          <div>
            <div className="flex items-end gap-2 flex-wrap">
              <span className="font-primary text-3xl font-extrabold text-accent">
                {format_rwf(listing?.price)}
              </span>
              <span className="font-secondary text-sm text-base-content/45 mb-1">/ month</span>
            </div>

            {listing?.caution_fee && (
              <div className="flex items-center gap-1.5 mt-1">
            
                <span className="font-secondary font-bold text-xs text-base-content/45">
                  {format_rwf(listing.caution_fee)} caution fee (Refundable)
                </span>
              </div>
            )}

            <p className="font-secondary text-sm text-base-content/55 mt-1.5">
              {listing?.neighborhood}, {listing?.city}
            </p>
          </div>

          {/* Stat chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: <Bed size={13} />,   label: `${listing?.bedrooms} Bedrooms` },
              { icon: <Bath size={13} />,  label: `${listing?.bathrooms} Bathrooms` },
              listing?.is_furnished && { icon: <Sofa size={13} />, label: 'Furnished' },
              listing?.housemate_gender && { icon: <Users size={13} />, label: `${listing.housemate_gender} only` },
            ]
              .filter(Boolean)
              .map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 bg-base-200 text-base-content/65 font-secondary text-xs px-3 py-1.5 rounded-field"
                >
                  {item.icon}
                  {item.label}
                </span>
              ))}
          </div>

          {/* Description */}
          {listing?.description && (
            <p className="font-secondary text-sm text-base-content/65 leading-relaxed">
              {listing.description}
            </p>
          )}

          {/* Amenities */}
          {listing?.amenities?.length > 0 && (
            <div>
              <p className="font-primary text-xs font-bold uppercase tracking-wide text-base-content/35 mb-2">
                Amenities
              </p>
              <div className="flex flex-wrap gap-2">
                {listing.amenities.map((a) => (
                  <span
                    key={a}
                    className="bg-accent/10 text-accent border border-accent/20 font-secondary text-xs px-2.5 py-1 rounded-field"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* House rules */}
          {listing?.house_rules?.length > 0 && (
            <div>
              <p className="font-primary text-xs font-bold uppercase tracking-wide text-base-content/35 mb-2">
                House Rules
              </p>
              <div className="flex flex-wrap gap-2">
                {listing.house_rules.map((r) => (
                  <span
                    key={r}
                    className="bg-base-200 text-base-content/55 font-secondary text-xs px-2.5 py-1 rounded-field"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer — landlord + availability */}
          <div className="mt-auto pt-4 border-t border-base-200 flex flex-wrap items-center justify-between gap-3">
            {available && (
              <div className="flex items-center gap-1.5">
                <CalendarDays size={13} className="text-accent" />
                <span className="font-secondary text-xs text-base-content/45">
                  Available from {available}
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}