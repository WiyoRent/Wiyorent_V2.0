'use client';

import { useState } from 'react';
import BasicProfileSection from './BasicProfileSection';
import HousingPreferencesEditSection from './HousingPreferencesEditSection';
import LifestyleEditSection from './LifestyleEditSection';
import PracticalInfoSection from './PracticalInfoSection';
import AboutMeSection from './AboutMeSection';
import HouseListingSection from './HouseListingSection';
import { Save } from 'lucide-react';
import { toast } from 'react-toastify';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { editProfile } from '@/services/profile.service';

export default function ProfileEditForm({ initial_data, available_neighborhoods }) {

  // ───────────────────────── Basic Profile ─────────────────────────
  const [is_profile_public, set_is_profile_public] = useState(initial_data.is_profile_public);
  const [full_name, set_full_name] = useState(initial_data.full_name);
  const [age, set_age] = useState(initial_data.age);
  const [gender, set_gender] = useState(initial_data.gender);
  const [phone_number, set_phone_number] = useState(initial_data.contact_info.phone_number);
  const [university_name, set_university_name] = useState(initial_data.university_name);
  const [program, set_program] = useState(initial_data.program);
  const [year_of_study, set_year_of_study] = useState(initial_data.year_of_study);
  const [nationality, set_nationality] = useState(initial_data.nationality);
  const [avatar_url, set_avatar_url] = useState(initial_data.avatar_url);
  const [urgency, set_urgency] = useState(initial_data.urgency || 'not_urgent');
  
  // ───────────────────────── Housing Preferences ───────────────────
  const [move_in_date, set_move_in_date] = useState(initial_data.housing_preferences.move_in_date);
  const [lease_duration, set_lease_duration] = useState(initial_data.housing_preferences.lease_duration);
  const [preferred_locations, set_preferred_locations] = useState(initial_data.housing_preferences.preferred_locations || []);
  const [budget_min, set_budget_min] = useState(initial_data.housing_preferences.budget.min);
  const [budget_max, set_budget_max] = useState(initial_data.housing_preferences.budget.max);
  const [is_furnished_preferred, set_is_furnished_preferred] = useState(initial_data.housing_preferences.is_furnished_preferred);
  const [is_private_room_required, set_is_private_room_required] = useState(initial_data.housing_preferences.is_private_room_required);
  const [max_housemates, set_max_housemates] = useState(initial_data.housing_preferences.max_housemates);
  const [allows_pets, set_allows_pets] = useState(initial_data.housing_preferences.allows_pets);
  const [is_smoker, set_is_smoker] = useState(initial_data.housing_preferences.is_smoker);

  // ───────────────────────── Lifestyle ─────────────────────────────
  const [sleep_schedule, set_sleep_schedule] = useState(initial_data.lifestyle_personality.sleep_schedule);
  const [cleanliness, set_cleanliness] = useState(initial_data.lifestyle_personality.cleanliness);
  const [social_habits, set_social_habits] = useState(initial_data.lifestyle_personality.social_habits);
  const [cultural_considerations, set_cultural_considerations] = useState('');

  // ───────────────────────── Practical ─────────────────────────────
  const [preferred_method, set_preferred_method] = useState(initial_data.contact_info.preferred_method);
  const [admission_letter, set_admission_letter] = useState(initial_data.admission_letter);
  const [passport_id, set_passport_id] = useState(initial_data.passport_id);

  // ───────────────────────── About Me ──────────────────────────────
  const [about_me, set_about_me] = useState(initial_data.about_me);

  // ───────────────────────── House Listing ─────────────────────────
  const [has_house, set_has_house] = useState(initial_data.has_house || false);
  const [listing_images, set_listing_images] = useState(initial_data.listing_images || []);
  const [listing_price, set_listing_price] = useState(initial_data.listing_price || '');
  const [listing_caution_fee, set_listing_caution_fee] = useState(initial_data.listing_caution_fee || '');
  const [listing_bedrooms, set_listing_bedrooms] = useState(initial_data.listing_bedrooms || '');
  const [listing_bathrooms, set_listing_bathrooms] = useState(initial_data.listing_bathrooms || '');
  const [listing_is_furnished, set_listing_is_furnished] = useState(initial_data.listing_is_furnished || false);
  const [listing_landlord_name, set_listing_landlord_name] = useState(initial_data.listing_landlord_name || '');
  const [listing_landlord_number, set_listing_landlord_number] = useState(initial_data.listing_landlord_number || '');
  const [listing_description, set_listing_description] = useState(initial_data.listing_description || '');
  const [listing_neighborhood, set_listing_neighborhood] = useState(initial_data.listing_neighborhood || '');
  const [listing_city, set_listing_city] = useState(initial_data.listing_city || '');
  const [listing_available_from, set_listing_available_from] = useState(initial_data.listing_available_from || '');
  const [listing_housemate_gender, set_listing_housemate_gender] = useState(initial_data.listing_housemate_gender || '');
  const [listing_amenities, set_listing_amenities] = useState(initial_data.listing_amenities || []);
  const [listing_house_rules, set_listing_house_rules] = useState(initial_data.listing_house_rules || []);

  // ───────────────────────── Helpers ───────────────────────────────
  const checkPhoneNumber = (number, message = 'Please enter a valid phone number') => {
    if (!isValidPhoneNumber(number)) throw new Error(message);
  };

  // ───────────────────────── Save ──────────────────────────────────
  const [is_saving, set_is_saving] = useState(false);

  const handle_save = async () => {
    set_is_saving(true);

    const formData = new FormData();

    // 1. Basic Information
    formData.append('full_name', full_name);
    formData.append('nationality', nationality);
    formData.append('university_name', university_name);
    formData.append('avatar', typeof avatar_url === 'string' ? avatar_url : avatar_url?.file);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('program', program);
    formData.append('year_of_study', year_of_study);
    formData.append('urgency', urgency);

    // 2. Contact
    checkPhoneNumber(phone_number);
    formData.append('phone_number', phone_number);
    formData.append('preferred_method', preferred_method);

    // 3. Housing Preferences
    formData.append('move_in_date', move_in_date);
    formData.append('lease_duration', lease_duration);
    formData.append('min', budget_min);
    formData.append('max', budget_max);
    formData.append('max_housemates', max_housemates);
    formData.append('is_furnished_preferred', is_furnished_preferred);
    formData.append('is_private_room_required', is_private_room_required);
    formData.append('allows_pets', allows_pets);
    formData.append('is_smoker', is_smoker);
    preferred_locations.forEach((loc) => formData.append('preferred_locations', loc));

    // 4. Lifestyle
    formData.append('sleep_schedule', sleep_schedule);
    formData.append('cleanliness', cleanliness);
    formData.append('social_habits', social_habits);

    // 5. Documents and Privacy
    formData.append('admission_letter', admission_letter);
    formData.append('passport_id', passport_id);
    formData.append('is_profile_public', is_profile_public)

    // 6. About Me
    formData.append('about_me', about_me);

    

    // 7. House listing
    formData.append('has_house', has_house);

    if (has_house) {
      formData.append('listing_price', listing_price);
      formData.append('listing_caution_fee', listing_caution_fee);
      formData.append('listing_bedrooms', listing_bedrooms);
      formData.append('listing_bathrooms', listing_bathrooms);
      formData.append('listing_is_furnished', listing_is_furnished);
      formData.append('listing_landlord_name', listing_landlord_name);

      checkPhoneNumber(listing_landlord_number, 'Please enter a valid landlord phone number');
      formData.append('listing_landlord_number', listing_landlord_number);

      formData.append('listing_description', listing_description);
      formData.append('listing_neighborhood', listing_neighborhood);
      formData.append('listing_city', listing_city);
      formData.append('listing_available_from', listing_available_from);
      formData.append('listing_housemate_gender', listing_housemate_gender);
      listing_amenities.forEach((a) => formData.append('listing_amenities', a));
      listing_house_rules.forEach((r) => formData.append('listing_house_rules', r));

      listing_images.forEach(({ file, preview_url }) => {
        if (file) {
          formData.append('listing_images', file);
        } else if (typeof preview_url === 'string') {
          formData.append('listing_images_existing', preview_url);
        }
      });
    }

    const loadingToast = toast.loading('Updating Your Profile..');
    try {
      const result = await editProfile(formData);
      toast.update(loadingToast, {
        type: 'success',
        render: result.message || 'Profile updated successfully',
        autoClose: 4000,
        isLoading: false,
      });
    } catch (error) {
      console.error(error, '-error on profile frontend');
      toast.update(loadingToast, {
        type: 'error',
        render: error.message || 'An internal server error occurred',
        autoClose: 4000,
        isLoading: false,
      });
    } finally {
      set_is_saving(false);
    }
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); handle_save(); }}
      className="flex flex-col gap-6"
    >
      {/* Basic Profile (includes Urgency) */}
      <BasicProfileSection
        full_name={full_name}
        avatar_url={avatar_url}
        set_avatar_url={set_avatar_url}
        set_full_name={set_full_name}
        age={age}
        set_age={set_age}
        gender={gender}
        set_gender={set_gender}
        phone_number={phone_number}
        set_phone_number={set_phone_number}
        university_name={university_name}
        set_university_name={set_university_name}
        program={program}
        set_program={set_program}
        year_of_study={year_of_study}
        set_year_of_study={set_year_of_study}
        nationality={nationality}
        set_nationality={set_nationality}
        urgency={urgency}
        set_urgency={set_urgency}
        verification_status={initial_data.verification_status}
        is_onboarded={initial_data.is_onboarded}
        admin_note={initial_data.admin_note}
      />

      {/* About Me */}
      <AboutMeSection about_me={about_me} set_about_me={set_about_me} />

      {/* Lifestyle & Personality */}
      <LifestyleEditSection
        sleep_schedule={sleep_schedule}
        set_sleep_schedule={set_sleep_schedule}
        cleanliness={cleanliness}
        set_cleanliness={set_cleanliness}
        social_habits={social_habits}
        set_social_habits={set_social_habits}
        cultural_considerations={cultural_considerations}
        set_cultural_considerations={set_cultural_considerations}
      />

      {/* Housing Preferences */}
      <HousingPreferencesEditSection
        move_in_date={move_in_date}
        set_move_in_date={set_move_in_date}
        lease_duration={lease_duration}
        set_lease_duration={set_lease_duration}
        preferred_locations={preferred_locations}
        set_preferred_locations={set_preferred_locations}
        available_neighborhoods={available_neighborhoods}
        budget_min={budget_min}
        set_budget_min={set_budget_min}
        budget_max={budget_max}
        set_budget_max={set_budget_max}
        is_furnished_preferred={is_furnished_preferred}
        set_is_furnished_preferred={set_is_furnished_preferred}
        is_private_room_required={is_private_room_required}
        set_is_private_room_required={set_is_private_room_required}
        max_housemates={max_housemates}
        set_max_housemates={set_max_housemates}
        allows_pets={allows_pets}
        set_allows_pets={set_allows_pets}
        is_smoker={is_smoker}
        set_is_smoker={set_is_smoker}
      />

      {/* House Availability + Listing */}
      <HouseListingSection
        has_house={has_house}
        set_has_house={set_has_house}
        listing_images={listing_images}
        set_listing_images={set_listing_images}
        listing_price={listing_price}
        set_listing_price={set_listing_price}
        listing_caution_fee={listing_caution_fee}
        set_listing_caution_fee={set_listing_caution_fee}
        listing_bedrooms={listing_bedrooms}
        set_listing_bedrooms={set_listing_bedrooms}
        listing_bathrooms={listing_bathrooms}
        set_listing_bathrooms={set_listing_bathrooms}
        listing_is_furnished={listing_is_furnished}
        set_listing_is_furnished={set_listing_is_furnished}
        listing_landlord_name={listing_landlord_name}
        set_listing_landlord_name={set_listing_landlord_name}
        listing_landlord_number={listing_landlord_number}
        set_listing_landlord_number={set_listing_landlord_number}
        listing_description={listing_description}
        set_listing_description={set_listing_description}
        listing_neighborhood={listing_neighborhood}
        set_listing_neighborhood={set_listing_neighborhood}
        listing_city={listing_city}
        set_listing_city={set_listing_city}
        listing_available_from={listing_available_from}
        set_listing_available_from={set_listing_available_from}
        listing_housemate_gender={listing_housemate_gender}
        set_listing_housemate_gender={set_listing_housemate_gender}
        listing_amenities={listing_amenities}
        set_listing_amenities={set_listing_amenities}
        listing_house_rules={listing_house_rules}
        set_listing_house_rules={set_listing_house_rules}
      />

      {/* Practical Information */}
      <PracticalInfoSection
        preferred_method={preferred_method}
        set_preferred_method={set_preferred_method}
        is_profile_public={is_profile_public}
        set_is_profile_public={set_is_profile_public}
        passport_id={passport_id}
        set_passport_id={set_passport_id}
        admission_letter={admission_letter}
        set_admission_letter={set_admission_letter}
      />

      {/* Save */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          disabled={is_saving}
          className="btn btn-accent flex-1 rounded-field font-primary font-extrabold text-sm uppercase tracking-wider gap-2"
        >
          <Save size={16} />
          {is_saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
}