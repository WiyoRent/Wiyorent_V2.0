import AdminUserHeader from '@/components/admin/users/AdminUserHeader';
import ProfileHero from '@/components/public/housemate/ProfileHero';
import AboutSection from '@/components/public/housemate/AboutSection';
import BasicProfileSection from '@/components/public/housemate/BasicProfileSection';
import HousingPreferencesSection from '@/components/public/housemate/HousingPreferencesSection';
import LifestyleSection from '@/components/public/housemate/LifestyleSection';
import { FileText } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Mock user detail — in production: await fetch(`/api/admin/users/${params.id}`)
// ─────────────────────────────────────────────────────────────────────────────
const admin_user_detail_view = {
  // User/Admin metadata
  user_id: 'usr_5502',
  email: 'jane.doe@example.com',
  role: 'Student',
  account_status: 'Pending', // Pending | Active | Blocked
  registration_date: '2024-08-25',

  // Profile data (uniform with Housemate Detail)
  profile_id: 'hm_9901',
  full_name: 'Jane Doe',
  nationality: 'Rwandan',
  university_name: 'University of Kigali',
  avatar_url: null,
  is_verified: false,
  gender: 'female',
  about_me:
    "Hey! I'm Jane, a third-year Computer Science student. I'm passionate about coding, enjoy exploring Kigali's coffee shops, and love a movie night. I'm tidy, respectful of shared spaces, and I value a calm, focused home environment.",

  basic_profile: {
    gender: 'Female',
    age: 21,
    program: 'Computer Science',
    year_of_study: 'Third Year',
  },

  housing_preferences: {
    move_in_date: '2024-09-01',
    budget: { min: 150000, max: 200000 },
    room_types: ['Private Room', 'Shared Apartment'],
    max_housemates: 3,
    preferred_locations: ['Kicukiro', 'Remera', 'Nyarutarama'],
    is_furnished_preferred: true,
    allows_pets: false,
    is_smoker: false,
  },

  lifestyle_personality: {
    sleep_schedule: 'Night Owl',
    cleanliness: 'Tidy',
    social_habits: 'Social, but enjoys quiet time',
    languages: ['English', 'Kinyarwanda', 'French'],
  },

    verification_documents: {
        admission_letter_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Example PDF
        passport_id_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800', // Example ID
        uploaded_at: '2024-08-25T10:00:00Z',
      },
};

export async function generateMetadata({ params }) {
  return {
    title: `${admin_user_detail_view.full_name} - User Detail | WiyoRent Admin`,
    description: 'Admin user detail and verification',
  };
}

export default function UserDetailPage({ params }) {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Admin Controls Header */}
        <AdminUserHeader
          user_id={admin_user_detail_view.user_id}
          full_name={admin_user_detail_view.full_name}
          email={admin_user_detail_view.email}
          account_status={admin_user_detail_view.account_status}
          is_verified={admin_user_detail_view.is_verified}
          registration_date={admin_user_detail_view.registration_date}
        />

        {/* Profile Hero */}
        <div className="mt-6">
          <ProfileHero
            full_name={admin_user_detail_view.full_name}
            avatar_url={admin_user_detail_view.avatar_url}
            nationality={admin_user_detail_view.nationality}
            university_name={admin_user_detail_view.university_name}
            is_verified={admin_user_detail_view.is_verified}
            gender={admin_user_detail_view.gender}
            preferred_locations={admin_user_detail_view.housing_preferences.preferred_locations}
            budget={admin_user_detail_view.housing_preferences.budget}
          />
        </div>

        {/* Three-column body */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1 — About + Lifestyle */}
          <div className="flex flex-col gap-6">
            <AboutSection about_me={admin_user_detail_view.about_me} />
            <LifestyleSection lifestyle={admin_user_detail_view.lifestyle_personality} />
          </div>

          {/* Column 2 — Basic profile + Housing prefs */}
          <div className="flex flex-col gap-6">
            <BasicProfileSection basic_profile={admin_user_detail_view.basic_profile} />
            <HousingPreferencesSection
              preferences={admin_user_detail_view.housing_preferences}
            />
          </div>

          {/* Column 3 — Account metadata */}
        <div className="flex flex-col gap-6">
            <div className="bg-base-100 rounded-box p-5 shadow-sm">
              <h3 className="font-primary text-sm font-extrabold text-base-content uppercase tracking-widest mb-4 flex items-center gap-3">
                <span className="w-1 h-5 bg-accent rounded-full inline-block" />
                Account Details
              </h3>
              <div className="flex flex-col gap-3 font-secondary text-sm">
                <div className="flex justify-between">
                  <span className="text-base-content/50">User ID:</span>
                  <span className="font-semibold text-base-content">
                    {admin_user_detail_view.user_id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/50">Role:</span>
                  <span className="font-semibold text-base-content">
                    {admin_user_detail_view.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/50">Email:</span>
                  <span className="font-semibold text-base-content break-all">
                    {admin_user_detail_view.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/50">Registered:</span>
                  <span className="font-semibold text-base-content">
                    {new Date(admin_user_detail_view.registration_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* // Verification Documents */}
        <div className="bg-base-100 rounded-box p-5 shadow-sm mt-3">
          <h3 className="font-primary text-sm font-extrabold text-base-content uppercase tracking-widest mb-4 flex items-center gap-3">
            <span className="w-1 h-5 bg-accent rounded-full inline-block" />
            Verification Files
          </h3>
  
          <div className="flex flex-col gap-4">
            {/* Passport Preview */}
            <div className="flex flex-col gap-2">
              <span className="font-secondary text-xs font-bold text-base-content/50 uppercase">Passport / ID:</span>
              <div className="h-72 w-full bg-base-200 rounded-lg overflow-hidden border border-base-300 relative group">
                <img 
                  src={admin_user_detail_view.verification_documents?.passport_id_url || '/placeholder-id.png'} 
                  className="w-full h-full object-cover"
                  alt="Passport ID"
                />
                <a 
                  href={admin_user_detail_view.verification_documents?.passport_id_url} 
                  target="_blank" 
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-tighter"
                >
                  View Full Image
                </a>
              </div>
            </div>

            {/* Admission Letter Link */}
            <div className="flex flex-col gap-2">
              <span className="font-secondary text-xs font-bold text-base-content/50 uppercase">Admission Letter:</span>
              <a 
                href={admin_user_detail_view.verification_documents?.admission_letter_url}
                target="_blank"
                className="btn btn-outline btn-sm rounded-field font-primary text-xs uppercase tracking-wider"
              >
                <FileText size={14} />
                Open PDF Document
              </a>
            </div>

            <p className="font-secondary text-[10px] text-base-content/40 italic">
              Uploaded on: {new Date(admin_user_detail_view.verification_documents?.uploaded_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}