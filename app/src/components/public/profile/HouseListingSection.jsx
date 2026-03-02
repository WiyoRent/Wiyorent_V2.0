'use client';

import { Home, User, DollarSign, BedDouble, MapPin, Sofa } from 'lucide-react';
import ImagesSection from '@/components/shared/ImagesSection';
import AmenitiesRulesSection from '@/components/shared/AmenitiesRulesSection';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const KIGALI_NEIGHBORHOODS = [
  'Kicukiro', 'Remera', 'Nyarutarama', 'Kimironko', 'Kacyiru',
  'Gasabo', 'Gisozi', 'Gikondo', 'Kibagabaga', 'Kanombe',
  'Nyamirambo', 'Muhima',
];

export default function HouseListingSection({
  has_house,
  set_has_house,
  // Listing fields
  listing_images,
  set_listing_images,
  listing_price,
  set_listing_price,
  listing_caution_fee,
  set_listing_caution_fee,
  listing_bedrooms,
  set_listing_bedrooms,
  listing_bathrooms,
  set_listing_bathrooms,
  listing_is_furnished,
  set_listing_is_furnished,
  listing_landlord_name,
  set_listing_landlord_name,
  listing_landlord_number,
  set_listing_landlord_number,
  listing_description,
  set_listing_description,
  listing_neighborhood,
  set_listing_neighborhood,
  listing_city,
  set_listing_city,
  listing_available_from,
  set_listing_available_from,
  listing_housemate_gender,
  set_listing_housemate_gender,
  // Amenities & Rules
  listing_amenities,
  set_listing_amenities,
  listing_house_rules,
  set_listing_house_rules,
}) {
  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      {/* ── Section header ── */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <Home size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          House Availability
        </h2>
      </div>

      {/* ── Toggle: I already have a house ── */}
      <div className="flex items-center justify-between p-4 bg-base-200 rounded-field">
        <div>
          <p className="font-secondary text-sm font-semibold text-base-content">
            I already have a house
          </p>
          <p className="font-secondary text-xs text-base-content/50 mt-0.5 w-3/4">
            Enable this if you have a room available and are looking for a housemate. You’ll be asked to provide house details, which will be visible to others on your public profile page.
          </p>
        </div>
        <input
          type="checkbox"
          className="toggle toggle-accent"
          checked={has_house || false}
          onChange={(e) => set_has_house(e.target.checked)}
        />
      </div>

      {/* ── Expandable listing form ── */}
      {has_house && (
        <div className="mt-5 flex flex-col gap-5">

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-base-200" />
            <span className="font-secondary text-xs text-base-content/40 uppercase tracking-widest">
              Your Listing Details
            </span>
            <div className="flex-1 h-px bg-base-200" />
          </div>

          {/* ── Images ── */}
          <ImagesSection
            image_urls={listing_images}
            set_image_urls={set_listing_images}
          />

          {/* ── Pricing ── */}
          <div className="bg-base-200/50 rounded-field p-4">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign size={14} className="text-accent" />
              <span className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content">
                Pricing
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                    Monthly Rent (RWF)
                  </span>
                </label>
                <br />
                <input
                  type="number"
                  value={listing_price || ''}
                  onChange={(e) => set_listing_price(e.target.value)}
                  placeholder="e.g. 150000"
                  className="input input-bordered rounded-field font-secondary text-sm"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                    Caution Fee (RWF)
                  </span>
                </label>
                <br />
                <input
                  type="number"
                  value={listing_caution_fee || ''}
                  onChange={(e) => set_listing_caution_fee(e.target.value)}
                  placeholder="e.g. 50000"
                  className="input input-bordered rounded-field font-secondary text-sm"
                />
              </div>
            </div>
          </div>

          {/* ── Property Details ── */}
          <div className="bg-base-200/50 rounded-field p-4">
            <div className="flex items-center gap-2 mb-4">
              <BedDouble size={14} className="text-accent" />
              <span className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content">
                Property Details
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                    Number of Bedrooms
                  </span>
                </label>
                <br />
                <select
                  value={listing_bedrooms || ''}
                  onChange={(e) => set_listing_bedrooms(e.target.value)}
                  className="select select-bordered rounded-field font-secondary text-sm"
                >
                  <option value="">Select bedrooms</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} Bedroom{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                    Number of Bathrooms
                  </span>
                </label>
                <br />
                <select
                  value={listing_bathrooms || ''}
                  onChange={(e) => set_listing_bathrooms(e.target.value)}
                  className="select select-bordered rounded-field font-secondary text-sm"
                >
                  <option value="">Select bathrooms</option>
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n} Bathroom{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                    Available From
                  </span>
                </label>
                <br />
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={listing_available_from || ''}
                  onChange={(e) => set_listing_available_from(e.target.value)}
                  className="input input-bordered rounded-field font-secondary text-sm"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                    Preferred Housemate Gender
                  </span>
                </label>
                <br />
                <select
                  value={listing_housemate_gender || ''}
                  onChange={(e) => set_listing_housemate_gender(e.target.value)}
                  className="select select-bordered rounded-field font-secondary text-sm"
                >
                  <option value="any">Any</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* ── Furnished toggle ── */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-200">
              <div className="flex items-center gap-2">
                <Sofa size={15} className="text-accent" />
                <div>
                  <p className="font-secondary text-sm font-semibold text-base-content">
                    Furnished
                  </p>
                  <p className="font-secondary text-xs text-base-content/50 mt-0.5">
                    Is the house furnished?
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                checked={listing_is_furnished || false}
                onChange={(e) => set_listing_is_furnished(e.target.checked)}
              />
            </div>
          </div>

          {/* ── Location ── */}
          <div className="bg-base-200/50 rounded-field p-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} className="text-accent" />
              <span className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content">
                Location
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                    Neighborhood
                  </span>
                </label>
                <br />
                <select
                  value={listing_neighborhood || ''}
                  onChange={(e) => set_listing_neighborhood(e.target.value)}
                  className="select select-bordered rounded-field font-secondary text-sm"
                >
                  <option value="">Select neighborhood</option>
                  {KIGALI_NEIGHBORHOODS.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                    City
                  </span>
                </label>
                <br />
                <input
                  type="text"
                  value={listing_city || ''}
                  onChange={(e) => set_listing_city(e.target.value)}
                  placeholder="e.g. Kigali"
                  className="input input-bordered rounded-field font-secondary text-sm"
                />
              </div>
            </div>
          </div>

          {/* ── Landlord Verification ── */}
          <div className="bg-base-200/50 rounded-field p-4">
            <div className="flex items-center gap-2 mb-1">
              <User size={14} className="text-accent" />
              <span className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content">
                Landlord Details
              </span>
            </div>
            <p className="font-secondary text-xs text-base-content/40 mb-4">
              Used for verification purposes only — not shown publicly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                    Landlord Name
                  </span>
                </label>
                <br />
                <input
                  type="text"
                  value={listing_landlord_name || ''}
                  onChange={(e) => set_listing_landlord_name(e.target.value)}
                  placeholder="e.g. Mr. Nkurunziza"
                  className="input input-bordered rounded-field font-secondary text-sm"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                    Landlord Phone Number
                  </span>
                </label>
                <br />
                <PhoneInputWithCountrySelect
                  placeholder="Enter landlord's number"
                  value={listing_landlord_number || ''}
                  onChange={set_listing_landlord_number}
                  className="input"
                  defaultCountry="RW"
                />
              </div>
            </div>
          </div>

          {/* ── Amenities & House Rules ── */}
          <AmenitiesRulesSection
            amenities={listing_amenities}
            set_amenities={set_listing_amenities}
            house_rules={listing_house_rules}
            set_house_rules={set_listing_house_rules}
          />

          {/* ── House Description ── */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                House Description
              </span>
            </label>
            <br />
            <textarea
              value={listing_description || ''}
              onChange={(e) => set_listing_description(e.target.value)}
              placeholder="Describe your house — size, layout, neighbourhood vibe, what you're looking for in a housemate..."
              rows={4}
              className="textarea w-full textarea-bordered rounded-field font-secondary text-sm resize-none"
            />
          </div>

        </div>
      )}
    </div>
  );
}