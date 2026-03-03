'use client';
import { useState } from 'react';
import { Home, User, DollarSign, BedDouble, MapPin, Sofa, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// AdminReadOnlyListingSection
// ─────────────────────────────────────────────────────────────────────────────

const KIGALI_NEIGHBORHOODS = [
  'Kicukiro', 'Remera', 'Nyarutarama', 'Kimironko', 'Kacyiru',
  'Gasabo', 'Gisozi', 'Gikondo', 'Kibagabaga', 'Kanombe',
  'Nyamirambo', 'Muhima',
];

// ─── Image carousel ───────────────────────────────────────────────────────────
function ImageCarousel({ images }) {
  const [active, set_active] = useState(0);

  if (!images?.length) return null;

  const go_prev = () => set_active((i) => (i - 1 + images.length) % images.length);
  const go_next = () => set_active((i) => (i + 1) % images.length);
  const current = images[active];

  return (
    <div>
      <span className="font-secondary text-xs font-bold text-base-content/50 uppercase mb-2 block">
        Listing Images
      </span>

      {/* Main image */}
      <div className="relative w-full h-72 bg-base-200 rounded-field overflow-hidden border border-base-300 group">
        
          <img
          src={current}
          alt={`Listing image ${active + 1}`}
          className="w-full h-full object-cover transition-opacity duration-200"
        />
        

        {/* Open full image link */}
        <a
          href={current.preview_url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 btn btn-xs btn-ghost bg-black/50 text-white hover:bg-black/70 rounded-field gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ExternalLink size={11} />
          Full
        </a>

        {/* Prev / Next — only shown when more than one image */}
        {images.length > 1 && (
          <>
            <button
              onClick={go_prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-xs btn-circle bg-black/50 text-white hover:bg-black/70 border-0"
              aria-label="Previous image"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={go_next}
              className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-xs btn-circle bg-black/50 text-white hover:bg-black/70 border-0"
              aria-label="Next image"
            >
              <ChevronRight size={14} />
            </button>
          </>
        )}

        {/* Counter badge */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white font-secondary text-[11px] font-semibold rounded-full px-2.5 py-0.5">
            {active + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Dot indicators + thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => set_active(i)}
              className={`flex-shrink-0 w-14 h-10 rounded-field overflow-hidden border-2 transition-all ${
                i === active ? 'border-accent opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
              aria-label={`Go to image ${i + 1}`}
            >
              <img key={i} src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
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

  console.log(listing_images, '----listing images')

  const available_from_value = listing_available_from
    ? new Date(listing_available_from).toISOString().split('T')[0]
    : '';

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">

      {/* ── Section header ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
            <Home size={16} className="text-accent-content" />
          </div>
          <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
            House Listing
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-base-200 rounded-field px-3 py-1.5">
          <span className="font-secondary text-xs text-base-content/50 uppercase tracking-wide">Has House:</span>
          <span className={`badge badge-sm font-primary font-bold uppercase tracking-wide ${has_house ? 'badge-success' : 'badge-neutral'}`}>
            {has_house ? 'Yes' : 'No'}
          </span>
        </div>
      </div>

      {/* ── Admin-only notice ── */}
      <div className="flex items-center gap-2 mb-5 px-3 py-2 bg-warning/10 border border-warning/20 rounded-field">
        <span className="font-secondary text-xs text-warning/80 font-semibold">
          Admin view — all fields are read-only. Landlord details are visible to admins only and not shown publicly.
        </span>
      </div>

      <div className="flex flex-col gap-5">

        {/* ── Divider ── */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-base-200" />
          <span className="font-secondary text-xs text-base-content/40 uppercase tracking-widest">Listing Details</span>
          <div className="flex-1 h-px bg-base-200" />
        </div>

        {/* ── Image carousel ── */}
        <ImageCarousel images={listing_images} />

        {/* ── Pricing ── */}
        <div className="bg-base-200/50 rounded-field p-4">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={14} className="text-accent" />
            <span className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content">Pricing</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Monthly Rent (RWF)</span>
              </label>
              <br />
              <input type="number" value={listing_price || ''} readOnly disabled
                className="input input-bordered rounded-field font-secondary text-sm disabled:cursor-not-allowed" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Caution Fee (RWF)</span>
              </label>
              <br />
              <input type="number" value={listing_caution_fee || ''} readOnly disabled
                className="input input-bordered rounded-field font-secondary text-sm disabled:cursor-not-allowed" />
            </div>
          </div>
        </div>

        {/* ── Property Details ── */}
        <div className="bg-base-200/50 rounded-field p-4">
          <div className="flex items-center gap-2 mb-4">
            <BedDouble size={14} className="text-accent" />
            <span className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content">Property Details</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Number of Bedrooms</span>
              </label>
              <br />
              <select value={listing_bedrooms || ''} disabled
                className="select select-bordered rounded-field font-secondary text-sm disabled:cursor-not-allowed">
                <option value="">—</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} Bedroom{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Number of Bathrooms</span>
              </label>
              <br />
              <select value={listing_bathrooms || ''} disabled
                className="select select-bordered rounded-field font-secondary text-sm disabled:cursor-not-allowed">
                <option value="">—</option>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n} Bathroom{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Available From</span>
              </label>
              <br />
              <input type="date" value={available_from_value} readOnly disabled
                className="input input-bordered rounded-field font-secondary text-sm disabled:cursor-not-allowed" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Preferred Housemate Gender</span>
              </label>
              <br />
              <select value={listing_housemate_gender || 'any'} disabled
                className="select select-bordered rounded-field font-secondary text-sm disabled:cursor-not-allowed">
                <option value="any">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Furnished */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-200">
            <div className="flex items-center gap-2">
              <Sofa size={15} className="text-accent" />
              <div>
                <p className="font-secondary text-sm font-semibold text-base-content">Furnished</p>
                <p className="font-secondary text-xs text-base-content/50 mt-0.5">Is the house furnished?</p>
              </div>
            </div>
            <input type="checkbox" className="toggle toggle-accent disabled:cursor-not-allowed"
              checked={listing_is_furnished || false} disabled readOnly />
          </div>
        </div>

        {/* ── Location ── */}
        <div className="bg-base-200/50 rounded-field p-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={14} className="text-accent" />
            <span className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content">Location</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Neighborhood</span>
              </label>
              <br />
              <select value={listing_neighborhood || ''} disabled
                className="select select-bordered rounded-field font-secondary text-sm disabled:cursor-not-allowed">
                <option value="">—</option>
                {KIGALI_NEIGHBORHOODS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">City</span>
              </label>
              <br />
              <input type="text" value={listing_city || ''} readOnly disabled
                className="input input-bordered rounded-field font-secondary text-sm disabled:cursor-not-allowed" />
            </div>
          </div>
        </div>

        {/* ── Landlord Details — admin only ── */}
        <div className="bg-base-200/50 rounded-field p-4">
          <div className="flex items-center gap-2 mb-1">
            <User size={14} className="text-accent" />
            <span className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content">Landlord Details</span>
          </div>
          <p className="font-secondary text-xs text-base-content/40 mb-4">
            For verification purposes only — not shown publicly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Landlord Name</span>
              </label>
              <br />
              <input type="text" value={listing_landlord_name || ''} readOnly disabled
                className="input input-bordered rounded-field font-secondary text-sm disabled:cursor-not-allowed" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Landlord Phone Number</span>
              </label>
              <br />
              <input type="text" value={listing_landlord_number || ''} readOnly disabled
                className="input input-bordered rounded-field font-secondary text-sm disabled:cursor-not-allowed" />
            </div>
          </div>
        </div>

        {/* ── Amenities ── */}
        {listing_amenities?.length > 0 && (
          <div>
            <span className="font-secondary text-xs font-bold text-base-content/50 uppercase block mb-2">Amenities</span>
            <div className="flex flex-wrap gap-2">
              {listing_amenities.map((a) => (
                <span key={a} className="badge badge-outline badge-sm font-secondary">{a}</span>
              ))}
            </div>
          </div>
        )}

        {/* ── House Rules ── */}
        {listing_house_rules?.length > 0 && (
          <div>
            <span className="font-secondary text-xs font-bold text-base-content/50 uppercase block mb-2">House Rules</span>
            <ul className="flex flex-col gap-1.5">
              {listing_house_rules.map((r) => (
                <li key={r} className="font-secondary text-sm text-base-content/70 flex items-start gap-2">
                  <span className="text-accent mt-0.5 flex-shrink-0">•</span>{r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── House Description ── */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">House Description</span>
          </label>
          <br />
          <textarea value={listing_description || ''} readOnly disabled rows={4}
            className="textarea w-full textarea-bordered rounded-field font-secondary text-sm resize-none disabled:cursor-not-allowed" />
        </div>

      </div>
    </div>
  );
}