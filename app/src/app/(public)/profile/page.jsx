import ProfileEditForm from '@/components/public/profile/ProfileEditForm';

// ─────────────────────────────────────────────────────────────────────────────
// Mock profile data — in production: await fetch('/api/user/profile')
// ─────────────────────────────────────────────────────────────────────────────
const housemate_profile_edit = {
  // Settings & Privacy
  is_profile_public: true,

  // Basic Profile Information
  profile_id: 'hm_9901',
  full_name: 'Jane Doe',
  nationality: 'Rwandan',
  university_name: 'University of Kigali',
  avatar_url: null,
  age: 21,
  gender: 'Female',
  program: 'Computer Science',
  year_of_study: '3',

  // Contact Information
  contact_info: {
    phone_number: '+250788123456',
    email: 'jane.doe@example.com',
    preferred_method: 'Email', // 'Email' | 'Phone'
  },

  // Housing Preferences
  housing_preferences: {
    move_in_date: '2024-09-01',
    budget: { min: 150000, max: 200000 },
    room_types: ['Private Room', 'Shared Apartment', 'Studio'],
    max_housemates: 3,
    preferred_locations: ['Kicukiro', 'Remera', 'Nyarutarama'],
    is_furnished_preferred: true,
    is_private_room_required: true,
    allows_pets: false,
    is_smoker: false,
  },

  // Lifestyle & Personality
  lifestyle_personality: {
    sleep_schedule: 'Night Owl', // 'Early Bird' | 'Night Owl'
    cleanliness: 'Tidy',         // 'Tidy' | 'Moderate' | 'Relaxed'
    social_habits: 'Social',     // 'Social' | 'Moderate' | 'Private'
    languages: ['English', 'Kinyarwanda', 'French', 'Swahili'],
  },

  // About Me
  about_me:
    "Hey! I'm Jane, a third-year Computer Science student. I'm passionate about coding, enjoy exploring Kigali's coffee shops, and love a movie night. I'm tidy, respectful of shared spaces, and I value a calm, focused home environment.",

  // System controlled
  is_verified: true,
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

export const metadata = {
  title: 'Edit Housemate Profile | WiyoRent',
  description: 'Update your housemate matchmaking profile',
};

export default function ProfileEditPage() {
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
          initial_data={housemate_profile_edit}
          available_neighborhoods={available_neighborhoods}
        />
      </div>
    </div>
  );
}