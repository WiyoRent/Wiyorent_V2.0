'use client';

import { useState } from 'react';
import BasicProfileSection from './BasicProfileSection';
import HousingPreferencesEditSection from './HousingPreferencesEditSection';
import LifestyleEditSection from './LifestyleEditSection';
import PracticalInfoSection from './PracticalInfoSection';
import AboutMeSection from './AboutMeSection';
import { Save, Eye } from 'lucide-react';

export default function ProfileEditForm({ initial_data, available_neighborhoods }) {
  // All form state
  const [is_profile_public, set_is_profile_public] = useState(initial_data.is_profile_public);
  const [full_name, set_full_name] = useState(initial_data.full_name);
  const [age, set_age] = useState(initial_data.age);
  const [gender, set_gender] = useState(initial_data.gender);
  const [phone_number, set_phone_number] = useState(initial_data.contact_info.phone_number);
  const [university_name, set_university_name] = useState(initial_data.university_name);
  const [program, set_program] = useState(initial_data.program);
  const [year_of_study, set_year_of_study] = useState(initial_data.year_of_study);
  const [nationality, set_nationality] = useState(initial_data.nationality);

  // Housing preferences
  const [move_in_date, set_move_in_date] = useState(initial_data.housing_preferences.move_in_date);
  const [lease_duration, set_lease_duration] = useState('12 Months');
  const [preferred_locations, set_preferred_locations] = useState(
    initial_data.housing_preferences.preferred_locations
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
  const [languages, set_languages] = useState(initial_data.lifestyle_personality.languages);

  // About me
  const [about_me, set_about_me] = useState(initial_data.about_me);

  const [is_saving, set_is_saving] = useState(false);

   const handle_save = async () => {
    set_is_saving(true);
    const payload = {
      is_profile_public,
      full_name,
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
        languages,
      },
      contact_info: { phone_number, preferred_method },
      about_me,
    };
    console.log('Saving profile:', payload);
    // POST /api/user/profile here
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
      {/* Basic Profile */}
      <BasicProfileSection
        full_name={full_name}
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
        languages={languages}
        set_languages={set_languages}
        is_profile_public={is_profile_public}
        set_is_profile_public={set_is_profile_public}
        is_verified={initial_data.is_verified}
      />

      {/* About Me */}
      <AboutMeSection about_me={about_me} set_about_me={set_about_me} />

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="button"
          className="btn btn-outline flex-1 rounded-field font-primary font-bold text-sm uppercase tracking-wider gap-2 border-base-content/20 hover:border-accent hover:bg-accent/5"
        >
          <Eye size={16} />
          Preview Profile
        </button>
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