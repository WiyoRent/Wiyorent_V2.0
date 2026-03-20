'use client';
import { useState, useMemo } from 'react';
import BasicProfileSection from './BasicProfileSection';
import HousingPreferencesEditSection from './HousingPreferencesEditSection';
import LifestyleEditSection from './LifestyleEditSection';
import PracticalInfoSection from './PracticalInfoSection';
import AboutMeSection from './AboutMeSection';
import HouseListingSection from './HouseListingSection';
import { Save } from 'lucide-react';
import { toast } from 'react-toastify';
import { checkPhoneNumber } from '@/validators/phone';
import { editProfile } from '@/services/public/profile.service';
import { useRouter } from 'next/navigation';

export default function ProfileEditForm({ initial_data, available_neighborhoods, redirect_to }) {
  const router = useRouter()

  // ───────────────────────── Basic Profile ─────────────────────────
  const [is_profile_public, set_is_profile_public] = useState(initial_data.is_profile_public);
  const [first_name, set_first_name] = useState(() => initial_data.full_name?.split(' ')[0] || '');
  const [last_name, set_last_name] = useState(() => initial_data.full_name?.split(' ').slice(1).join(' ') || '');
  const [date_of_birth, set_date_of_birth] = useState(initial_data.date_of_birth ?? '');
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
  const [max_housemates, set_max_housemates] = useState(initial_data.housing_preferences.max_housemates);
  const [is_smoker, set_is_smoker] = useState(initial_data.housing_preferences.is_smoker ?? null);
  const [dont_mind_smoker, set_dont_mind_smoker] = useState(initial_data.housing_preferences.dont_mind_smoker ?? null);
  const [has_pet, set_has_pet] = useState(initial_data.housing_preferences.has_pet ?? null);
  const [dont_mind_pets, set_dont_mind_pets] = useState(initial_data.housing_preferences.dont_mind_pets ?? null);
  const [private_room, set_private_room] = useState(initial_data.housing_preferences.private_room ?? null);
  const [furnished, set_furnished] = useState(initial_data.housing_preferences.furnished ?? null);

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
  const [listing_city, set_listing_city] = useState(initial_data.listing_city || 'Kigali');
  const [listing_available_from, set_listing_available_from] = useState(initial_data.listing_available_from || '');
  const [listing_housemate_gender, set_listing_housemate_gender] = useState(initial_data.listing_housemate_gender || '');
  const [listing_amenities, set_listing_amenities] = useState(initial_data.listing_amenities || []);
  const [listing_house_rules, set_listing_house_rules] = useState(initial_data.listing_house_rules || []);

  // ───────────────────────── Change Detection ──────────────────────
  const initial_snapshot = useMemo(() => ({
    full_name: initial_data.full_name,
    date_of_birth: initial_data.date_of_birth ?? '',
    gender: initial_data.gender,
    phone_number: initial_data.contact_info.phone_number,
    university_name: initial_data.university_name,
    program: initial_data.program,
    year_of_study: initial_data.year_of_study,
    nationality: initial_data.nationality,
    urgency: initial_data.urgency || 'not_urgent',
    move_in_date: initial_data.housing_preferences.move_in_date,
    lease_duration: initial_data.housing_preferences.lease_duration,
    preferred_locations: initial_data.housing_preferences.preferred_locations || [],
    budget_min: initial_data.housing_preferences.budget.min,
    budget_max: initial_data.housing_preferences.budget.max,
    max_housemates: initial_data.housing_preferences.max_housemates,
    is_smoker: initial_data.housing_preferences.is_smoker ?? null,
    dont_mind_smoker: initial_data.housing_preferences.dont_mind_smoker ?? null,
    has_pet: initial_data.housing_preferences.has_pet ?? null,
    dont_mind_pets: initial_data.housing_preferences.dont_mind_pets ?? null,
    private_room: initial_data.housing_preferences.private_room ?? null,
    furnished: initial_data.housing_preferences.furnished ?? null,
    sleep_schedule: initial_data.lifestyle_personality.sleep_schedule,
    cleanliness: initial_data.lifestyle_personality.cleanliness,
    social_habits: initial_data.lifestyle_personality.social_habits,
    preferred_method: initial_data.contact_info.preferred_method,
    about_me: initial_data.about_me,
    is_profile_public: initial_data.is_profile_public,
    has_house: initial_data.has_house || false,
    listing_price: initial_data.listing_price || '',
    listing_caution_fee: initial_data.listing_caution_fee || '',
    listing_bedrooms: initial_data.listing_bedrooms || '',
    listing_bathrooms: initial_data.listing_bathrooms || '',
    listing_is_furnished: initial_data.listing_is_furnished || false,
    listing_landlord_name: initial_data.listing_landlord_name || '',
    listing_landlord_number: initial_data.listing_landlord_number || '',
    listing_description: initial_data.listing_description || '',
    listing_neighborhood: initial_data.listing_neighborhood || '',
    listing_city: initial_data.listing_city || 'Kigali',
    listing_available_from: initial_data.listing_available_from || '',
    listing_housemate_gender: initial_data.listing_housemate_gender || '',
    listing_amenities: initial_data.listing_amenities || [],
    listing_house_rules: initial_data.listing_house_rules || [],
  }), []);

  const current_snapshot = {
    full_name: `${first_name} ${last_name}`.trim(),
    date_of_birth,
    gender,
    phone_number,
    university_name,
    program,
    year_of_study,
    nationality,
    urgency,
    move_in_date,
    lease_duration,
    preferred_locations,
    budget_min,
    budget_max,
    max_housemates,
    is_smoker,
    dont_mind_smoker,
    has_pet,
    dont_mind_pets,
    private_room,
    furnished,
    sleep_schedule,
    cleanliness,
    social_habits,
    preferred_method,
    about_me,
    is_profile_public,
    has_house,
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
  };

  const has_changes = JSON.stringify(current_snapshot) !== JSON.stringify(initial_snapshot);

  // ───────────────────────── Save ──────────────────────────────────
  const [is_saving, set_is_saving] = useState(false);

  const handle_save = async () => {
    if (!has_changes) {
      toast.info('No changes to save.');
      return;
    }
    if (initial_data.is_blocked) {
      toast.error('Your account has been suspended. You cannot make changes to your profile. Please contact support@wiyorent.com for assistance.');
      return;
    }
    if (!avatar_url) {
      toast.error('A profile photo is required');
      return;
    }

    try {
      checkPhoneNumber(phone_number);
    } catch (error) {
      toast.error(error.message);
      return;
    }
    if (has_house) {
      const houseFields = {
        // 'Listing Images': listing_images?.length,
        'Listing Price': listing_price,
        'Caution Fee': listing_caution_fee,
        'Bedrooms': listing_bedrooms,
        'Bathrooms': listing_bathrooms,
        'Available From': listing_available_from,
        'Neighborhood': listing_neighborhood,
        'Landlord Name': listing_landlord_name,
        'Description': listing_description,
        'Amenities' : listing_amenities,
        'House_rules' : listing_house_rules
      };

      const missingFields = Object.entries(houseFields)
        .filter(([_, val]) => !val)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        toast.warn(`Please fill in the following house details: ${missingFields.join(', ')}`);
        return;
      }

      try {
        checkPhoneNumber(listing_landlord_number, 'Please enter a valid landlord phone number');
      } catch (error) {
        toast.error(error.message);
        return;
      }
    }
    
    set_is_saving(true);
    const formData = new FormData();
    formData.append('full_name', `${first_name} ${last_name}`.trim());
    formData.append('nationality', nationality);
    formData.append('university_name', university_name);
    formData.append('avatar', typeof avatar_url === 'string' ? avatar_url : avatar_url?.file);
    formData.append('date_of_birth', date_of_birth);
    formData.append('gender', gender);
    formData.append('program', program);
    formData.append('year_of_study', year_of_study);
    formData.append('urgency', urgency);
    formData.append('phone_number', phone_number);
    formData.append('preferred_method', preferred_method);
    formData.append('move_in_date', move_in_date);
    formData.append('lease_duration', lease_duration);
    formData.append('min', budget_min);
    formData.append('max', budget_max);
    formData.append('max_housemates', max_housemates);
    formData.append('is_smoker', is_smoker);
    formData.append('dont_mind_smoker', dont_mind_smoker);
    formData.append('has_pet', has_pet);
    formData.append('dont_mind_pets', dont_mind_pets);
    formData.append('private_room', private_room);
    formData.append('furnished', furnished);
    formData.append('preferred_locations', preferred_locations);
    formData.append('sleep_schedule', sleep_schedule);
    formData.append('cleanliness', cleanliness);
    formData.append('social_habits', social_habits);
    formData.append('admission_letter', admission_letter);
    formData.append('passport_id', passport_id);
    formData.append('is_profile_public', is_profile_public);
    formData.append('about_me', about_me);
    formData.append('has_house', has_house);
    if (has_house) {
      formData.append('listing_price', listing_price);
      formData.append('listing_caution_fee', listing_caution_fee);
      formData.append('listing_bedrooms', listing_bedrooms);
      formData.append('listing_bathrooms', listing_bathrooms);
      formData.append('listing_is_furnished', listing_is_furnished);
      formData.append('listing_landlord_name', listing_landlord_name);
      formData.append('listing_landlord_number', listing_landlord_number);
      formData.append('listing_description', listing_description);
      formData.append('listing_neighborhood', listing_neighborhood);
      formData.append('listing_city', listing_city);
      formData.append('listing_available_from', listing_available_from);
      formData.append('listing_housemate_gender', listing_housemate_gender);
      formData.append('listing_amenities', listing_amenities);
      formData.append('listing_house_rules', listing_house_rules);
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
        render: result.message || !initial_data.is_onboarded ? 'Profile updated successfully' : 'Onboarding process completed successfully',
        autoClose: 4000,
        isLoading: false,
      });
      if (!initial_data.is_onboarded && redirect_to) {
        router.push(redirect_to);
        return 
      }

      window.location.reload()
      
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
      <BasicProfileSection
        first_name={first_name}
        set_first_name={set_first_name}
        last_name={last_name}
        set_last_name={set_last_name}
        avatar_url={avatar_url}
        set_avatar_url={set_avatar_url}
        date_of_birth={date_of_birth}
        set_date_of_birth={set_date_of_birth}
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
        is_blocked={initial_data.is_blocked}
        is_blocked_reason={initial_data.is_blocked_reason}
      />
      <AboutMeSection about_me={about_me} set_about_me={set_about_me} />
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
        max_housemates={max_housemates}
        set_max_housemates={set_max_housemates}
        is_smoker={is_smoker}
        set_is_smoker={set_is_smoker}
        dont_mind_smoker={dont_mind_smoker}
        set_dont_mind_smoker={set_dont_mind_smoker}
        has_pet={has_pet}
        set_has_pet={set_has_pet}
        dont_mind_pets={dont_mind_pets}
        set_dont_mind_pets={set_dont_mind_pets}
        private_room={private_room}
        set_private_room={set_private_room}
        furnished={furnished}
        set_furnished={set_furnished}
      />
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
      <PracticalInfoSection
        preferred_method={preferred_method}
        set_preferred_method={set_preferred_method}
        is_profile_public={is_profile_public}
        set_is_profile_public={set_is_profile_public}
        passport_id={passport_id}
        set_passport_id={set_passport_id}
        admission_letter={admission_letter}
        set_admission_letter={set_admission_letter}
        verification_status={initial_data.verification_status}
      />
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          disabled={is_saving || !has_changes}
          className="btn btn-accent flex-1 rounded-field font-primary font-extrabold text-sm uppercase tracking-wider gap-2"
        >
          <Save size={16} />
          {is_saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
}