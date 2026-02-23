'use client';

import { useState } from 'react';
import BasicProfileSection from './BasicProfileSection';
import HousingPreferencesEditSection from './HousingPreferencesEditSection';
import LifestyleEditSection from './LifestyleEditSection';
import PracticalInfoSection from './PracticalInfoSection';
import AboutMeSection from './AboutMeSection';
import { Save, Eye } from 'lucide-react';
import { getBaseURL } from '@/lib/getBaseURL';
import { toast } from 'react-toastify';

export default function ProfileEditForm({ initial_data, available_neighborhoods, userId }) {
  // ------------------- FETCHING ---------------------------

  // Basic Information form state
  const [is_profile_public, set_is_profile_public] = useState(initial_data.is_profile_public);
  const [full_name, set_full_name] = useState(initial_data.full_name);
  const [age, set_age] = useState(initial_data.age);
  const [gender, set_gender] = useState(initial_data.gender);
  const [phone_number, set_phone_number] = useState(initial_data.contact_info.phone_number);
  const [university_name, set_university_name] = useState(initial_data.university_name);
  const [program, set_program] = useState(initial_data.program);
  const [year_of_study, set_year_of_study] = useState(initial_data.year_of_study);
  const [nationality, set_nationality] = useState(initial_data.nationality);
  const [avatar_url, set_avatar_url] = useState(initial_data.avatar_url)

  // Housing preferences
  const [move_in_date, set_move_in_date] = useState(initial_data.housing_preferences.move_in_date);
  const [lease_duration, set_lease_duration] = useState(initial_data.housing_preferences.lease_duration);
  const [preferred_locations, set_preferred_locations] = useState(
    initial_data.housing_preferences.preferred_locations || []
  );
  const [budget_min, set_budget_min] = useState(initial_data.housing_preferences.budget.min);
  const [budget_max, set_budget_max] = useState(initial_data.housing_preferences.budget.max);
  const [is_furnished_preferred, set_is_furnished_preferred] = useState(
    initial_data.housing_preferences.is_furnished_preferred
  );
  const [is_private_room_required, set_is_private_room_required] = useState(
    initial_data.housing_preferences.is_private_room_required
  );
  const [max_housemates, set_max_housemates] = useState(initial_data.housing_preferences.max_housemates);
  const [allows_pets, set_allows_pets] = useState(initial_data.housing_preferences.allows_pets);
  const [is_smoker, set_is_smoker] = useState(initial_data.housing_preferences.is_smoker);

  // Lifestyle
  const [sleep_schedule, set_sleep_schedule] = useState(
    initial_data.lifestyle_personality.sleep_schedule
  );
  const [cleanliness, set_cleanliness] = useState(initial_data.lifestyle_personality.cleanliness);
  const [social_habits, set_social_habits] = useState(initial_data.lifestyle_personality.social_habits);
  const [cultural_considerations, set_cultural_considerations] = useState('');

  // Practical
  const [preferred_method, set_preferred_method] = useState(
    initial_data.contact_info.preferred_method
  );
  const [admission_letter, set_admission_letter] = useState(initial_data.admission_letter)
  const [passport_id, set_passport_id] = useState(initial_data.passport_id)

  // About me
  const [about_me, set_about_me] = useState(initial_data.about_me);

  const [is_saving, set_is_saving] = useState(false);

  console.log(passport_id, '----passsporttt')

  // ----------------------HANDLE SAVE----------------------------------
   const handle_save = async () => {

    try {
      // ----- Initial Payload ------

      set_is_saving(true);

      const payload = {
        is_profile_public,
        full_name,
        avatar_url,
        age,
        gender,
        phone_number,
        university_name,
        program,
        year_of_study,
        nationality,
        housing_preferences: {
          move_in_date,
          lease_duration,
          preferred_locations,
          budget: { min: budget_min, max: budget_max },
          is_furnished_preferred,
          is_private_room_required,
          max_housemates,
          allows_pets,
          is_smoker,
        },
        lifestyle_personality: {
          sleep_schedule,
          cleanliness,
          social_habits,
          cultural_considerations,
        },
        contact_info: { phone_number, preferred_method },
        documents: {
          admission_letter,
          passport_id
        },
        about_me,
      };

      // ----- FormData ----
      const formData = new FormData()

      // 1. Basic Information
      formData.append("full_name", payload.full_name);
      formData.append("nationality", payload.nationality);
      formData.append("university_name", payload.university_name);
      formData.append("avatar", typeof payload.avatar_url == 'string' ? payload.avatar_url : payload.avatar_url.file); // The permanent URL string
      formData.append("age", payload.age);
      formData.append("gender", payload.gender);
      formData.append("program", payload.program);
      formData.append("year_of_study", payload.year_of_study);

      // 2. Contact Information (Flattened)
      formData.append("phone_number", payload.contact_info.phone_number);
      formData.append("preferred_method", payload.contact_info.preferred_method);

      // 3. Housing Preferences
      formData.append("move_in_date", payload.housing_preferences.move_in_date);
      formData.append("lease_duration", payload.housing_preferences.lease_duration);
      formData.append("min", payload.housing_preferences.budget.min);
      formData.append("max", payload.housing_preferences.budget.max);
      formData.append("max_housemates", payload.housing_preferences.max_housemates);
      formData.append("is_furnished_preferred", payload.housing_preferences.is_furnished_preferred);
      formData.append("is_private_room_required", payload.housing_preferences.is_private_room_required);
      formData.append("allows_pets", payload.housing_preferences.allows_pets);
      formData.append("is_smoker", payload.housing_preferences.is_smoker);

      // 4. Lifestyle & Personality
      formData.append("sleep_schedule", payload.lifestyle_personality.sleep_schedule);
      formData.append("cleanliness", payload.lifestyle_personality.cleanliness);
      formData.append("social_habits", payload.lifestyle_personality.social_habits);

      payload.housing_preferences.preferred_locations.forEach(loc => 
        formData.append("preferred_locations", loc)
      );

      // 5. Documents
      formData.append('admission_letter', payload.documents.admission_letter )
      formData.append('passport_id', payload.documents.passport_id )


      // 6. About Me & System
      formData.append("about_me", payload.about_me);

      for (const [key,value] of formData.entries()){
        console.log(key,value)
        console.log(userId)
      }

      const url = getBaseURL() + `api/v1/public/updateProfile/${userId}`

      const response = await fetch(url, {
        method : 'PATCH',
        body : formData
      })

      const result = await response.json()

      if(!response.ok){
        throw new Error(result.message || 'Sorry An Error Occured')
      }

      if(!result.success){
        toast.error(result.message)
      }

      toast.success(result.message)
      return

    } catch (error) {
      toast.error(error.message)
    }finally{
      set_is_saving(false)
    }
    
  };


  return (


    <form
      onSubmit={(e) => {
        e.preventDefault();
        handle_save();
      }}
      className="flex flex-col gap-6"
    >
      {/* Basic Profile */}
      <BasicProfileSection
        full_name={full_name}
        avatar_url = {avatar_url}
        set_avatar_url = {set_avatar_url}
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

      {/* Practical Information */}
      <PracticalInfoSection
        preferred_method={preferred_method}
        set_preferred_method={set_preferred_method}
        is_profile_public={is_profile_public}
        set_is_profile_public={set_is_profile_public}
        passport_id={passport_id}
        set_passport_id = {set_passport_id}
        admission_letter={admission_letter}
        set_admission_letter = {set_admission_letter}
      />

      {/* About Me */}
      <AboutMeSection about_me={about_me} set_about_me={set_about_me} />

      {/* Action buttons */}
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