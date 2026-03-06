import ProfileEditForm from '@/components/public/profile/ProfileEditForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getProfile } from '@/services/public/profile.service';

export const metadata = {
  title: 'Edit Housemate Profile | WiyoRent',
  description: 'Update your housemate matchmaking profile',
};

export default async function ProfileEditPage() {

  const session = await auth();
  if (!session?.user) {
    return redirect('/login');
  }

  const { user, listing } = await getProfile();

  const user_profile_data = {

    // Basic Profile Information
    profile_id: user.id,
    full_name: user.full_name ?? user.name,
    nationality: user.nationality,
    university_name: user.university_name,
    avatar_url: user.avatar_url,
    age: user.age,
    gender: user.gender,
    program: user.program,
    year_of_study: user.year_of_study,
    urgency: user.urgency,
    verification_status: user.verification_status,
    is_onboarded : user.is_onboarded,
    admin_note : user.admin_note,

    // Contact Information
    contact_info: {
      phone_number: user.phone_number,
      email: user.email,
      preferred_method: user.preferred_method,
    },

     // About Me
    about_me: user.about_me,

    // Lifestyle & Personality
    lifestyle_personality: {
      sleep_schedule: user.sleep_schedule,
      cleanliness: user.cleanliness,
      social_habits: user.social_habits,
      languages: user.languages ?? [],
    },

    // Housing Preferences
    housing_preferences: {
      move_in_date: user.move_in_date,
      budget: { min: user.min, max: user.max },
      room_types: ['Private Room', 'Shared Apartment', 'Studio'],
      max_housemates: user.max_housemates,
      preferred_locations: user.preferred_locations ?? [],
      is_furnished_preferred: user.is_furnished_preferred,
      is_private_room_required: user.is_private_room_required,
      allows_pets: user.allows_pets,
      is_smoker: user.is_smoker,
      lease_duration: user.lease_duration,
    },

    
    // House availability
    has_house: user.has_house,

    // ── Listing fields ──
    listing_price:            listing?.price             ?? '',
    listing_caution_fee:      listing?.caution_fee       ?? '',
    listing_bedrooms:         listing?.bedrooms          ?? '',
    listing_bathrooms:        listing?.bathrooms         ?? '',
    listing_is_furnished:     listing?.is_furnished      ?? false,
    listing_landlord_name:    listing?.landlord_name     ?? '',
    listing_landlord_number:  listing?.landlord_number   ?? '',
    listing_description:      listing?.description       ?? '',
    listing_neighborhood:     listing?.neighborhood      ?? '',
    listing_city:             listing?.city              ?? '',
    listing_available_from:   listing?.available_from    ?? '',
    listing_housemate_gender: listing?.housemate_gender  ?? '',
    listing_amenities:        listing?.amenities         ?? [],
    listing_house_rules:      listing?.house_rules       ?? [],
    listing_images:           (listing?.listing_images ?? [])
                                .filter(Boolean)
                                .map(url => ({ file: null, preview_url: url })),

    // Practical — Settings & Privacy
    is_profile_public: user.is_profile_public,

    // Documents
    admission_letter: user.admission_letter,
    passport_id: user.passport_id,
  };


  const available_neighborhoods = [
    'Kicukiro', 'Remera', 'Nyarutarama', 'Kimironko', 'Kacyiru',
    'Gasabo', 'Gisozi', 'Gikondo', 'Kibagabaga', 'Kanombe',
    'Nyamirambo', 'Muhima',
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="font-primary text-3xl sm:text-4xl font-extrabold text-base-content uppercase tracking-tight">
            Housemate Matchmaking Profile
          </h1>
          <p className="font-secondary text-sm text-base-content/50 mt-2">
            Complete your profile to find compatible housemates
          </p>
        </div>

        <ProfileEditForm
          initial_data={user_profile_data}
          available_neighborhoods={available_neighborhoods}
        />
      </div>
    </div>
  );
}