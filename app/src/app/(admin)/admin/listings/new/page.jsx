'use client';

import { useState } from 'react';
import BasicInfoSection from '@/components/admin/create-listing/BasicInfoSection';
import LocationSection from '@/components/admin/create-listing/LocationSection';
import FinancialsSection from '@/components/admin/create-listing/FinancialsSection';
import SpecificationsSection from '@/components/admin/create-listing/SpecificationsSection';
import AmenitiesRulesSection from '@/components/shared/AmenitiesRulesSection';
import ImagesSection from '@/components/shared/ImagesSection';
import LandlordSection from '@/components/admin/create-listing/LandlordSection';
import StatusSection from '@/components/admin/create-listing/StatusSection';
import FormHeader from '@/components/admin/create-listing/FormHeader';
import FormActions from '@/components/admin/create-listing/FormActions';
import { createListing } from '@/services/admin/listings.service';
import { toast } from 'react-toastify';
import { checkPhoneNumber } from '@/validators/phone';

// Default mockup 

const default_listing = {
  title: '',
  description: '',
  is_active: true,
  is_verified: false,
  is_a_wiyorent_house: false,
  available_status: 'available', // available | booked | maintenance
  available_from: '',
  landlord: {
    full_name: '',
    phone_number: '',
  },
  financials: {
    price_per_month: '',
    commission_fee: '',
    caution_fee: '',
    upfront_months: 1,
  },
  specifications: {
    bedroom_number: 1,
    bathroom_number: 1,
    max_roommates: 1,
    property_type: 'room', // room | studio | apartment | house | villa
    is_furnished: false,
  },
  amenities: [],
  house_rules: [],
  location: {
    neighborhood: '',
    city: 'Kigali',
    country: 'Rwanda',
  },
  image_urls: [], // on create: holds File objects; resolved to URLs after upload
};

export default function CreateListingPage() {
  const [listing, set_listing] = useState(default_listing);


  const set_title = (val) => set_listing((prev) => ({ ...prev, title: val }));
  const set_description = (val) => set_listing((prev) => ({ ...prev, description: val }));

  const set_is_active = (val) => set_listing((prev) => ({ ...prev, is_active: val }));
  const set_is_verified = (val) => set_listing((prev) => ({ ...prev, is_verified: val }));
  const set_is_a_wiyorent_house = (val) => set_listing((prev) => ({ ...prev, is_a_wiyorent_house: val }));
  const set_available_status = (val) => set_listing((prev) => ({ ...prev, available_status: val }));
  const set_available_from = (val) => set_listing((prev) => ({ ...prev, available_from: val }));

  const set_landlord = (val) => set_listing((prev) => ({ ...prev, landlord: val }));

  const set_financials = (val) => set_listing((prev) => ({ ...prev, financials: val }));
  const set_specifications = (val) => set_listing((prev) => ({ ...prev, specifications: val }));

  const set_amenities = (val) => set_listing((prev) => ({ ...prev, amenities: val }));
  const set_house_rules = (val) => set_listing((prev) => ({ ...prev, house_rules: val }));

  const set_location = (val) => set_listing((prev) => ({ ...prev, location: val }));
  const set_image_urls = (val) =>
    set_listing((prev) => ({
      ...prev,
      image_urls: typeof val === 'function' ? val(prev.image_urls) : val,
    }));
    
  const [isLoading, setIsLoading] = useState(false)

  
  const handle_submit = async (e) => {
    e.preventDefault();
    console.log('Submitting listing:', listing);
    
    const formData = new FormData()

    formData.append('title', listing.title)
    formData.append('is_active', listing.is_active)
    formData.append('is_verified', listing.is_verified)
    formData.append('is_a_wiyorent_house', listing.is_a_wiyorent_house)
    formData.append('description', listing.description)
    formData.append('available_status', listing.available_status)
    formData.append('available_from', listing.available_from)
    formData.append('amenities', listing.amenities)
    formData.append('house_rules', listing.house_rules)


    for(const [key,value] of Object.entries(listing.financials)){
      formData.append(key,value)
    }

    for(const [key,value] of Object.entries(listing.landlord)){
      formData.append(key,value)
    }

    for(const [key,value] of Object.entries(listing.location)){
      formData.append(key,value)
    }

    for(const [key,value] of Object.entries(listing.specifications)){
      formData.append(key,value)
    }

    for(const img of listing.image_urls){
      const {file, preview_url} = img
        formData.append('images', file)
    }

    for(const [key,value] of formData.entries()){
      if((key !== 'images' || key !== 'amenities' || key !== 'house_rules') && !value){
        return toast.error(`Please enter all fields you missed: ${key}`)
      }
    }

    if(formData.getAll('images').length < 4){
      return toast.error('Please upload atleast four images')
    }

    try {
      checkPhoneNumber(listing.landlord.phone_number, 'Please enter a valid landlord phone number');
    } catch (error) {
      return toast.error(error.message);
    }

    const loadingToast = toast.loading('Creating Listing...', {autoClose: false})
    
    try {
      // Set loading to true to disable buttons
      setIsLoading(true)

      await createListing(formData)

      toast.update(
        loadingToast,{
          render : 'Listing created successfully',
          type : 'success',
          isLoading : false,
          autoClose : 3000
        }
      )

      handle_reset()

    } catch (error) {
      console.log(error)
      toast.update(
        loadingToast,{
          render : error.message,
          type : 'error',
          isLoading : false,
          autoClose : 3000
        }
      )
    }finally{
      setIsLoading(false)
    }

  };

  const handle_reset = () => {
    set_listing(default_listing);
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <FormHeader />

        <form onSubmit={handle_submit} className="flex flex-col gap-6 mt-6">
          {/* Status & Visibility */}
          <StatusSection
            is_active={listing.is_active}
            set_is_active={set_is_active}
            is_verified={listing.is_verified}
            set_is_verified={set_is_verified}
            is_a_wiyorent_house={listing.is_a_wiyorent_house}
            set_is_a_wiyorent_house={set_is_a_wiyorent_house}
            available_status={listing.available_status}
            set_available_status={set_available_status}
            available_from={listing.available_from}
            set_available_from={set_available_from}
          />

          {/* Landlord */}
          <LandlordSection
            landlord={listing.landlord}
            set_landlord={set_landlord}
          />

          {/* Basic Info */}
          <BasicInfoSection
            title={listing.title}
            set_title={set_title}
            description={listing.description}
            set_description={set_description}
          />

          {/* Location */}
          <LocationSection
            location={listing.location}
            set_location={set_location}
          />

          {/* Financials */}
          <FinancialsSection
            financials={listing.financials}
            set_financials={set_financials}
          />

          {/* Specifications */}
          <SpecificationsSection
            specifications={listing.specifications}
            set_specifications={set_specifications}
          />

          {/* Amenities & House Rules */}
          <AmenitiesRulesSection
            amenities={listing.amenities}
            set_amenities={set_amenities}
            house_rules={listing.house_rules}
            set_house_rules={set_house_rules}
          />

          {/* Images */}
          <ImagesSection
            image_urls={listing.image_urls}
            set_image_urls={set_image_urls}
          />

          {/* Actions */}
          <FormActions  
            on_reset={handle_reset}
            isLoading = {isLoading}
          />
        </form>
      </div>
    </div>
  );
}