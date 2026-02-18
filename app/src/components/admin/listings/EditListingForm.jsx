'use client';

import { useState } from 'react';
import StatusAnalyticsBar from './StatusAnalyticsBar';
import LandlordAvailabilitySection from './LandlordAvailabilitySection';
import FinancialsSpecsSection from './FinancialsSpecsSection';
import BasicInfoSection from './BasicInfoSection';
import MediaManagerSection from './MediaManagerSection';
import AmenitiesRulesSection from './AmenitiesRulesSection';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditListingForm({ initial_data }) {
  // State
  const [is_active, set_is_active] = useState(initial_data.is_active);
  const [title, set_title] = useState(initial_data.title);
  const [description, set_description] = useState(initial_data.description);
  const [available_status, set_available_status] = useState(initial_data.available_status);
  const [available_from, set_available_from] = useState(initial_data.available_from);
  const [landlord_name, set_landlord_name] = useState(initial_data.landlord.full_name);
  const [landlord_phone, set_landlord_phone] = useState(initial_data.landlord.phone_number);
  const [price_per_month, set_price_per_month] = useState(initial_data.financials.price_per_month);
  const [commission_fee, set_commission_fee] = useState(initial_data.financials.commission_fee);
  const [caution_fee, set_caution_fee] = useState(initial_data.financials.caution_fee);
  const [bedroom_number, set_bedroom_number] = useState(initial_data.specifications.bedroom_number);
  const [bathroom_number, set_bathroom_number] = useState(initial_data.specifications.bathroom_number);
  const [max_roommates, set_max_roommates] = useState(initial_data.specifications.max_roommates);
  const [property_type, set_property_type] = useState(initial_data.specifications.property_type);
  const [is_furnished, set_is_furnished] = useState(initial_data.specifications.is_furnished);
  const [neighborhood, set_neighborhood] = useState(initial_data.location.neighborhood);
  const [city, set_city] = useState(initial_data.location.city);
  const [country, set_country] = useState(initial_data.location.country);
  const [image_urls, set_image_urls] = useState(initial_data.image_urls);
  const [amenities, set_amenities] = useState(initial_data.amenities);
  const [house_rules, set_house_rules] = useState(initial_data.house_rules);

  const [is_saving, set_is_saving] = useState(false);

  const handle_save = async () => {
    set_is_saving(true);
    const payload = {
      is_active,
      title,
      description,
      available_status,
      available_from,
      landlord: { full_name: landlord_name, phone_number: landlord_phone },
      financials: { price_per_month, commission_fee, caution_fee },
      specifications: { bedroom_number, bathroom_number, max_roommates, property_type, is_furnished },
      location: { neighborhood, city, country },
      image_urls,
      amenities,
      house_rules,
    };
    console.log('Saving listing:', payload);
    // PUT /api/admin/listings/${initial_data.listing_id}
    await new Promise((res) => setTimeout(res, 1000));
    set_is_saving(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handle_save();
      }}
      className="flex flex-col gap-6"
    >
      {/* Status & Analytics Bar */}
      <StatusAnalyticsBar
        is_active={is_active}
        set_is_active={set_is_active}
        analytics={initial_data.analytics}
        is_verified={initial_data.is_verified}
      />

      {/* Basic Info */}
      <BasicInfoSection
        title={title}
        set_title={set_title}
        description={description}
        set_description={set_description}
        neighborhood={neighborhood}
        set_neighborhood={set_neighborhood}
        city={city}
        set_city={set_city}
        country={country}
        set_country={set_country}
      />

      {/* Landlord & Availability */}
      <LandlordAvailabilitySection
        landlord_name={landlord_name}
        set_landlord_name={set_landlord_name}
        landlord_phone={landlord_phone}
        set_landlord_phone={set_landlord_phone}
        available_status={available_status}
        set_available_status={set_available_status}
        available_from={available_from}
        set_available_from={set_available_from}
      />

      {/* Financials & Specs */}
      <FinancialsSpecsSection
        price_per_month={price_per_month}
        set_price_per_month={set_price_per_month}
        commission_fee={commission_fee}
        set_commission_fee={set_commission_fee}
        caution_fee={caution_fee}
        set_caution_fee={set_caution_fee}
        bedroom_number={bedroom_number}
        set_bedroom_number={set_bedroom_number}
        bathroom_number={bathroom_number}
        set_bathroom_number={set_bathroom_number}
        max_roommates={max_roommates}
        set_max_roommates={set_max_roommates}
        property_type={property_type}
        set_property_type={set_property_type}
        is_furnished={is_furnished}
        set_is_furnished={set_is_furnished}
      />

      {/* Media Manager */}
      <MediaManagerSection image_urls={image_urls} set_image_urls={set_image_urls} />

      {/* Amenities & Rules */}
      <AmenitiesRulesSection
        amenities={amenities}
        set_amenities={set_amenities}
        house_rules={house_rules}
        set_house_rules={set_house_rules}
      />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Link
          href="/admin/listings"
          className="btn btn-outline flex-1 rounded-field font-primary font-bold text-sm uppercase tracking-wider gap-2 border-base-content/20 hover:border-primary"
        >
          <ArrowLeft size={16} />
          Back to List
        </Link>
        <button
          type="submit"
          disabled={is_saving}
          className="btn btn-accent flex-1 rounded-field font-primary font-extrabold text-sm uppercase tracking-wider gap-2"
        >
          <Save size={16} />
          {is_saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}