'use client';
import {
  Home, Bed, Bath, Sofa, Users, CalendarDays,
  User, Phone,
} from 'lucide-react';
import ImageCarousel from '@/components/shared/ImageCarousel';

const format_rwf = (n) => `RWF ${new Intl.NumberFormat('rw-RW').format(n)}`;

// ── Main component ─────────────────────────────────────────────────────────────
export default function AdminReadOnlyListingSection({
  has_house,
  listing_images,
  listing_price,
  listing_caution_fee,
  listing_bedrooms,
  listing_bathrooms,
  listing_is_furnished,
  listing_landlord_name,
  listing_landlord_number,
  listing_description,
  listing_neighborhood,
  listing_city,
  listing_available_from,
  listing_housemate_gender,
  listing_amenities,
  listing_house_rules,
}) {
  if (!listing_price) return null;

  const available = listing_available_from
    ? new Date(listing_available_from).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <div className="mt-8 bg-base-100 rounded-box shadow-sm overflow-hidden">

      {/* ── Section header ──────────────────────────────────────────────── */}
      <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-base-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-field">
            <Home size={18} className="text-accent" />
          </div>
          <div>
            <h2 className="font-primary text-lg font-extrabold text-base-content uppercase tracking-tight">
              House Listing
            </h2>
            <p className="font-secondary text-xs text-base-content/45 mt-0.5">
              This user already has a place — they're looking for a housemate to join them
            </p>
          </div>
        </div>
        <span className={`badge badge-sm font-primary font-bold uppercase tracking-wide flex-shrink-0 ${has_house ? 'badge-success' : 'badge-neutral'}`}>
          {has_house ? 'Has House' : 'No House'}
        </span>
      </div>

      {/* ── Admin-only warning ──────────────────────────────────────────── */}
      <div className="mx-6 sm:mx-8 mt-4 px-3 py-2 bg-warning/10 border border-warning/20 rounded-field">
        <span className="font-secondary text-xs text-warning/80 font-semibold">
          Admin view — landlord details are visible to admins only and not shown publicly.
        </span>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left — image carousel */}
        <ImageCarousel images={listing_images} />

        {/* Right — listing details */}
        <div className="flex flex-col gap-5">

          {/* Price block */}
          <div>
            <div className="flex items-end gap-2 flex-wrap">
              <span className="font-primary text-3xl font-extrabold text-accent">
                {format_rwf(listing_price)}
              </span>
              <span className="font-secondary text-sm text-base-content/45 mb-1">/ month</span>
            </div>
            {listing_caution_fee && (
              <div className="flex items-center gap-1.5 mt-1">
                <span className="font-secondary font-bold text-xs text-base-content/45">
                  {format_rwf(listing_caution_fee)} caution fee (Refundable)
                </span>
              </div>
            )}
            <p className="font-secondary text-sm text-base-content/55 mt-1.5">
              {listing_neighborhood}, {listing_city}
            </p>
          </div>

          {/* Stat chips */}
          <div className="flex flex-wrap gap-2">
            {[
              listing_bedrooms   && { icon: <Bed size={13} />,   label: `${listing_bedrooms} Bedroom${listing_bedrooms > 1 ? 's' : ''}` },
              listing_bathrooms  && { icon: <Bath size={13} />,  label: `${listing_bathrooms} Bathroom${listing_bathrooms > 1 ? 's' : ''}` },
              listing_is_furnished && { icon: <Sofa size={13} />, label: 'Furnished' },
              listing_housemate_gender && listing_housemate_gender !== 'any' && { icon: <Users size={13} />, label: `${listing_housemate_gender} only` },
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
          {listing_description && (
            <p className="font-secondary text-sm text-base-content/65 leading-relaxed">
              {listing_description}
            </p>
          )}

          {/* Amenities */}
          {listing_amenities?.length > 0 && (
            <div>
              <p className="font-primary text-xs font-bold uppercase tracking-wide text-base-content/35 mb-2">
                Amenities
              </p>
              <div className="flex flex-wrap gap-2">
                {listing_amenities.map((a) => (
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
          {listing_house_rules?.length > 0 && (
            <div>
              <p className="font-primary text-xs font-bold uppercase tracking-wide text-base-content/35 mb-2">
                House Rules
              </p>
              <div className="flex flex-wrap gap-2">
                {listing_house_rules.map((r) => (
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

          {/* Availability footer */}
          {available && (
            <div className="mt-auto pt-4 border-t border-base-200 flex items-center gap-1.5">
              <CalendarDays size={13} className="text-accent" />
              <span className="font-secondary text-xs text-base-content/45">
                Available from {available}
              </span>
            </div>
          )}

          {/* ── Landlord — admin only ──────────────────────────────────── */}
          {(listing_landlord_name || listing_landlord_number) && (
            <div className="pt-4 border-t border-base-200">
              <div className="flex items-center gap-1.5 mb-3">
                <User size={13} className="text-base-content/30" />
                <p className="font-primary text-xs font-bold uppercase tracking-wide text-base-content/35">
                  Landlord
                </p>
                <span className="font-secondary text-[10px] text-warning/70 font-semibold bg-warning/10 px-1.5 py-0.5 rounded-sm">
                  Admin only
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {listing_landlord_name && (
                  <span className="font-secondary text-sm text-base-content/70">
                    {listing_landlord_name}
                  </span>
                )}
                {listing_landlord_number && (
                  <div className="flex items-center gap-1.5">
                    <Phone size={12} className="text-base-content/30" />
                    <span className="font-secondary text-sm text-base-content/70">
                      {listing_landlord_number}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
