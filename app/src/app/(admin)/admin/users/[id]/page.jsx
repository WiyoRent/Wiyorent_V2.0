import AdminUserHeader from '@/components/admin/users/AdminUserHeader';
import ProfileHero from '@/components/public/housemate/ProfileHero';
import AboutSection from '@/components/public/housemate/AboutSection';
import BasicProfileSection from '@/components/public/housemate/BasicProfileSection';
import HousingPreferencesSection from '@/components/public/housemate/HousingPreferencesSection';
import LifestyleSection from '@/components/public/housemate/LifestyleSection';
import AdminReadOnlyListingSection from '@/components/admin/users/AdminReadOnlyListingSection';
import { getBaseURL } from '@/lib/getBaseURL';
import { auth } from '@/auth';

// ─────────────────────────────────────────────────────────────────────────────
// Mock user detail — in production: await fetch(`/api/admin/users/${params.id}`)
// Fields map directly to DB columns: users + user_listings + user_listing_images
// ─────────────────────────────────────────────────────────────────────────────
// const user_details = {
//   // ── users table ─────────────────────────────────────────────────────────────
//   user_id:                 'usr_5502',
//   email:                   'jane.doe@example.com',
//   full_name:               'Jane Doe',
//   phone_number:            '+250788123456',
//   role:                    'Student',
//   account_status:          'Pending',
//   verification_status:     'pending',     // 'pending' | 'approved' | 'rejected'
//   is_blocked:              false,
//   is_blocked_reason:       null,
//   admin_note:              null,
//   has_performed_an_update: true,
//   registration_date:       '2024-08-25',  // maps to users.created_at
//   has_house:               true,

//   // ── Profile / personal ──────────────────────────────────────────────────────
//   nationality:     'Rwandan',
//   university_name: 'University of Kigali',
//   avatar_url:      null,
//   gender:          'female',
//   about_me:        "Hey! I'm Jane, a third-year Computer Science student. I'm passionate about coding, enjoy exploring Kigali's coffee shops, and love a movie night. I'm tidy, respectful of shared spaces, and I value a calm, focused home environment.",

//   basic_profile: {
//     gender:        'Female',
//     age:           21,
//     program:       'Computer Science',
//     year_of_study: 'Third Year',
//   },

//   housing_preferences: {
//     move_in_date:           '2024-09-01',
//     budget:                 { min: 150000, max: 200000 },
//     room_types:             ['Private Room', 'Shared Apartment'],
//     max_housemates:         3,
//     preferred_locations:    ['Kicukiro', 'Remera', 'Nyarutarama'],
//     is_furnished_preferred: true,
//     allows_pets:            false,
//     is_smoker:              false,
//   },

//   lifestyle_personality: {
//     sleep_schedule: 'Night Owl',
//     cleanliness:    'Tidy',
//     social_habits:  'Social, but enjoys quiet time',
//     languages:      ['English', 'Kinyarwanda', 'French'],
//   },

//   // ── Verification documents — both plain image URLs (users.passport_id / users.admission_letter) ──
//   admission_letter:      'https://images.unsplash.com/photo-1568667256549-094345857637?w=800',
//   passport_id:           'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800',
//   documents_uploaded_at: '2024-08-25T10:00:00Z',

//   // ── user_listings + user_listing_images ─────────────────────────────────────
//   listing_price:            180000,
//   listing_caution_fee:      60000,
//   listing_bedrooms:         3,
//   listing_bathrooms:        2,
//   listing_is_furnished:     true,
//   listing_landlord_name:    'Mr. Nkurunziza',
//   listing_landlord_number:  '+250788000000',
//   listing_description:      'Spacious three-bedroom apartment in a quiet, secure compound. Fully furnished with modern appliances. Close to public transport and supermarkets. Looking for a clean, responsible female housemate.',
//   listing_neighborhood:     'Kicukiro',
//   listing_city:             'Kigali',
//   listing_available_from:   '2024-09-01',
//   listing_housemate_gender: 'female',
//   listing_amenities:        ['WiFi', 'Parking', 'Security', 'Water 24/7'],
//   listing_house_rules:      ['No smoking indoors', 'No loud music after 10 PM'],
//   // listing_images comes from ARRAY_AGG(uli.image_url) joined by backend
//   listing_images: [
//     { preview_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800' },
//     { preview_url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800' },
//   ],
// };

const fetchUserDetails = async (userId) => {

  try {
    const session = await auth()
    const userRole = session?.user?.role

    const endpoint = getBaseURL() + `api/v1/admin/get/user/${userId}`
    const res = await fetch(endpoint, {
      headers : {
        'X-INTERNAL-BACKEND-KEY' : process.env.INTERNAL_BACKEND_KEY,
        'X-USER-ROLE' : userRole
      }
    })

    const result = await res.json()

    console.log(result, '---result from fetchhh')

    return result.data
  } catch (error) {
    console.error('Error on fetchUserDetails function:', error)
    return []
  }
  
}

export async function generateMetadata({ params }) {
  const {id} = await params
  const user_details = await fetchUserDetails(id)

  return {
    title: `${user_details.full_name} - User Detail | WiyoRent Admin`,
    description: 'Admin user detail and verification',
  };
}

export default async function UserDetailPage({ params }) {
  const {id} = await params
  const u = await fetchUserDetails(id);

  console.log(u, '-------user data')

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Admin Controls Header ─────────────────────────────────────────── */}
        <AdminUserHeader
          user_id={u?.user_id}
          full_name={u?.full_name}
          email={u?.email}
          account_status={u?.account_status}
          verification_status={u?.verification_status}
          is_blocked={u?.is_blocked}
          is_blocked_reason={u?.is_blocked_reason}
          admin_note={u?.admin_note}
          has_performed_an_update={u?.has_performed_an_update}
          registration_date={u?.registration_date}
        />

        {/* ── Profile Hero ──────────────────────────────────────────────────── */}
        <div className="mt-6">
          <ProfileHero
            full_name={u?.full_name}
            avatar_url={u?.avatar_url}
            nationality={u?.nationality}
            university_name={u?.university_name}
            verification_status={u?.verification_status}
            gender={u?.gender}
            preferred_locations={u?.housing_preferences?.preferred_locations}
            budget={u?.housing_preferences?.budget}
            urgency={u?.urgency}
            move_in_date={u?.housing_preferences?.move_in_date}
            urgency_as_status_line
          />
        </div>

        {/* ── House Listing — full-width below the 3-col grid ──────────────── */}
        {/* Uses the same HouseListingSection layout as the user profile page,   */}
        {/* but all inputs are disabled (read-only). Landlord name + number are  */}
        {/* exposed here since this is the admin view.                           */}
        {u?.has_house && (
          <div className="mt-6">
            <AdminReadOnlyListingSection
              has_house={u?.has_house}
              listing_images={u?.listing_images}
              listing_price={u?.listing_price}
              listing_caution_fee={u?.listing_caution_fee}
              listing_bedrooms={u?.listing_bedrooms}
              listing_bathrooms={u?.listing_bathrooms}
              listing_is_furnished={u?.listing_is_furnished}
              listing_landlord_name={u?.listing_landlord_name}
              listing_landlord_number={u?.listing_landlord_number}
              listing_description={u?.listing_description}
              listing_neighborhood={u?.listing_neighborhood}
              listing_city={u?.listing_city}
              listing_available_from={u?.listing_available_from}
              listing_housemate_gender={u?.listing_housemate_gender}
              listing_amenities={u?.listing_amenities}
              listing_house_rules={u?.listing_house_rules}
            />
          </div>
        )}

        {/* ── Three-column body ─────────────────────────────────────────────── */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Column 1 — About + Lifestyle */}
          <div className="flex flex-col gap-6">
            <AboutSection about_me={u?.about_me} />
            <LifestyleSection lifestyle={u?.lifestyle_personality} />
          </div>

          {/* Column 2 — Basic profile + Housing prefs */}
          <div className="flex flex-col gap-6">
            <BasicProfileSection basic_profile={u?.basic_profile} />
            <HousingPreferencesSection preferences={u?.housing_preferences} />
          </div>

          {/* Column 3 — Account details */}
          <div className="flex flex-col gap-6">
            <div className="bg-base-100 rounded-box p-5 shadow-sm">
              <h3 className="font-primary text-sm font-extrabold text-base-content uppercase tracking-widest mb-4 flex items-center gap-3">
                <span className="w-1 h-5 bg-accent rounded-full inline-block" />
                Account Details
              </h3>
              <div className="flex flex-col gap-3 font-secondary text-sm">
                <div className="flex justify-between">
                  <span className="text-base-content/50">User ID:</span>
                  <span className="font-semibold text-base-content">{u?.user_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/50">Role:</span>
                  <span className="font-semibold text-base-content">{u?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/50">Email:</span>
                  <span className="font-semibold text-base-content break-all">{u?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/50">Phone:</span>
                  <span className="font-semibold text-base-content">
                    {u?.phone_number || <span className="text-base-content/30 font-normal">—</span>}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/50">Registered:</span>
                  <span className="font-semibold text-base-content">
                    {new Date(u?.registration_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        {/* ── Verification Documents ────────────────────────────────────────── */}
        <div className="bg-base-100 rounded-box p-5 shadow-sm mt-6">
          <h3 className="font-primary text-sm font-extrabold text-base-content uppercase tracking-widest mb-4 flex items-center gap-3">
            <span className="w-1 h-5 bg-accent rounded-full inline-block" />
            Verification Documents
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Passport / ID */}
            <div className="flex flex-col gap-2">
              <span className="font-secondary text-xs font-bold text-base-content/50 uppercase">
                Passport / National ID:
              </span>
              <div className="h-72 w-full bg-base-200 rounded-lg overflow-hidden border border-base-300 relative group">
                {u?.passport_id ? (
                  <>
                    <img src={u?.passport_id} className="w-full h-full object-cover" alt="Passport / ID" />
                    <a
                      href={u?.passport_id}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-tighter"
                    >
                      View Full Image
                    </a>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-secondary text-sm text-base-content/30">No document uploaded</span>
                  </div>
                )}
              </div>
            </div>

            {/* Admission Letter — image (not PDF) */}
            <div className="flex flex-col gap-2">
              <span className="font-secondary text-xs font-bold text-base-content/50 uppercase">
                Admission Letter:
              </span>
              <div className="h-72 w-full bg-base-200 rounded-lg overflow-hidden border border-base-300 relative group">
                {u?.admission_letter ? (
                  <>
                    <img src={u?.admission_letter} className="w-full h-full object-cover" alt="Admission Letter" />
                    <a
                      href={u?.admission_letter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-tighter"
                    >
                      View Full Image
                    </a>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-secondary text-sm text-base-content/30">No document uploaded</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          
        </div>

      </div>
    </div>
  );
}