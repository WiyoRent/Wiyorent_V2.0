import ProfileEditForm from '@/components/public/profile/ProfileEditForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

// ─────────────────────────────────────────────────────────────────────────────
// Mock profile data — in production: await fetch('/api/user/profile')
// ─────────────────────────────────────────────────────────────────────────────
// const housemate_profile_edit = {
//   // Settings & Privacy
//   is_profile_public: true,

//   // Basic Profile Information
//   profile_id: 'hm_9901',
//   full_name: 'Jane Doe',
//   nationality: 'Rwandan',
//   university_name: 'University of Kigali',
//   avatar_url: null,
//   age: 21,
//   gender: 'Female',
//   program: 'Computer Science',
//   year_of_study: '3',

//   // Contact Information
//   contact_info: {
//     phone_number: '+250788123456',
//     email: 'jane.doe@example.com',
//     preferred_method: 'Email', // 'Email' | 'Phone'
//   },

//   // Housing Preferences
//   housing_preferences: {
//     move_in_date: '2024-09-01',
//     budget: { min: 150000, max: 200000 },
//     room_types: ['Private Room', 'Shared Apartment', 'Studio'],
//     max_housemates: 3,
//     preferred_locations: ['Kicukiro', 'Remera', 'Nyarutarama'],
//     is_furnished_preferred: true,
//     is_private_room_required: true,
//     allows_pets: false,
//     is_smoker: false,
//   },

//   // Lifestyle & Personality
//   lifestyle_personality: {
//     sleep_schedule: 'Night Owl', // 'Early Bird' | 'Night Owl'
//     cleanliness: 'Tidy',         // 'Tidy' | 'Moderate' | 'Relaxed'
//     social_habits: 'Social',     // 'Social' | 'Moderate' | 'Private'
//     languages: ['English', 'Kinyarwanda', 'French', 'Swahili'],
//   },

//   // About Me
//   about_me:
//     "Hey! I'm Jane, a third-year Computer Science student. I'm passionate about coding, enjoy exploring Kigali's coffee shops, and love a movie night. I'm tidy, respectful of shared spaces, and I value a calm, focused home environment.",

//   // System controlled
//   is_verified: true,
// };




export const metadata = {
  title: 'Edit Housemate Profile | WiyoRent',
  description: 'Update your housemate matchmaking profile',
};

export default async function ProfileEditPage() {

  const session = await auth()
  if(!session?.user){
    return redirect('/login')
  }

  const user = session.user

  console.log(user, '-----userrr')

  const housemate_profile_edit = {
    

    // Basic Profile Information
    profile_id: user.id,
    full_name: user.full_name ? user.full_name : user.name,
    nationality: user.nationality,
    university_name: user.university_name,
    avatar_url: user.avatar_url,
    age: user.age,
    gender: user.gender,
    program: user.program,
    year_of_study: user.year_of_study,

    // Contact Information
    contact_info: {
      phone_number: user.phone_number,
      email: user.email,
      preferred_method: user.preferred_method
    },

    // Housing Preferences
    housing_preferences: {
      move_in_date: user.move_in_date,
      budget: { min: user.min, max: user.max },
      room_types: ['Private Room', 'Shared Apartment', 'Studio'],
      max_housemates: user.max_housemates,
      preferred_locations: user.preferred_locations,
      is_furnished_preferred: user.is_furnished_preferred,
      is_private_room_required: user.is_private_room_required,
      allows_pets: user.allows_pets,
      is_smoker: user.is_smoker,
      lease_duration : user.lease_duration
    },

    // Lifestyle & Personality
    lifestyle_personality: {
      sleep_schedule: user.sleep_schedule,
      cleanliness: user.cleanliness,
      social_habits: user.social_habits,
      languages: user.languages
    },

    // ---Practical--
    // Settings & Privacy
    is_profile_public: user.is_profile_public,

    // Documents
    admission_letter : user.admission_letter,
    passport_id : user.passport_id,

    // About Me
    about_me: user.about_me,

    // System controlled
    is_verified: user.is_verified,
  };

  // Available neighborhoods for location selector

  const available_neighborhoods = [
    'Kicukiro',
    'Remera',
    'Nyarutarama',
    'Kimironko',
    'Kacyiru',
    'Gasabo',
    'Gisozi',
    'Gikondo',
    'Kibagabaga',
    'Kanombe',
    'Nyamirambo',
    'Muhima',
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
          userId={session.user.id}
          initial_data={housemate_profile_edit}
          available_neighborhoods={available_neighborhoods}
        />
      </div>
    </div>
  );
}