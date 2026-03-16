import { auth } from '@/auth';
import HousemateFilterSidebar from '@/components/public/housemates/HousemateFilterSidebar';
import HousematesGrid from '@/components/public/housemates/HousemateGrid';
import InformationModal from '@/components/public/shared/InformationModal';
import { fetchHousemates } from '@/services/public/housemate.service';


// ─────────────────────────────────────────────────────────────────────────────
// Mock data — swap for async fetch('/api/housemates') in production
// ─────────────────────────────────────────────────────────────────────────────
// const housemate_profiles = [
//   {
//     profile_id: 'hm_7721',
//     full_name: 'Keza A.',
//     nationality: 'Rwandan',
//     university_name: 'University of Rwanda',
//     bio_short: 'Loves football and clean spaces. Studying computer science and looking for a focused, chill roommate.',
//     budget: { min: 100000, max: 150000 },
//     preferred_locations: ['Kicukiro', 'Remera'],
//     avatar_url: null,
//     gender: 'female',
//     is_verified: true,
//   },
//   {
//     profile_id: 'hm_7722',
//     full_name: 'Eric M.',
//     nationality: 'Rwandan',
//     university_name: 'Rwanda Polytechnic',
//     bio_short: 'Early bird, tidy, and social. Civil engineering student who enjoys weekend hiking and cooking.',
//     budget: { min: 80000, max: 130000 },
//     preferred_locations: ['Kacyiru', 'Nyarutarama'],
//     avatar_url: null,
//     gender: 'male',
//     is_verified: true,
//   },
//   {
//     profile_id: 'hm_7723',
//     full_name: 'Amina B.',
//     nationality: 'Burundian',
//     university_name: 'INES-Ruhengeri',
//     bio_short: 'Quiet and studious. Med student seeking a peaceful, non-smoking flat. Big fan of reading and documentaries.',
//     budget: { min: 120000, max: 180000 },
//     preferred_locations: ['Gasabo', 'Kimironko'],
//     avatar_url: null,
//     gender: 'female',
//     is_verified: false,
//   },
//   {
//     profile_id: 'hm_7724',
//     full_name: 'Patrick N.',
//     nationality: 'Rwandan',
//     university_name: 'University of Kigali',
//     bio_short: 'Night owl, music lover, keeps shared spaces clean. Business student who codes on weekends.',
//     budget: { min: 90000, max: 140000 },
//     preferred_locations: ['Remera', 'Kimironko'],
//     avatar_url: null,
//     gender: 'male',
//     is_verified: true,
//   },
//   {
//     profile_id: 'hm_7725',
//     full_name: 'Diane K.',
//     nationality: 'Rwandan',
//     university_name: 'University of Rwanda',
//     bio_short: 'Friendly, tidy, and respectful. Law student who loves yoga and quiet evenings with a good book.',
//     budget: { min: 150000, max: 200000 },
//     preferred_locations: ['Nyarutarama', 'Kacyiru'],
//     avatar_url: null,
//     gender: 'female',
//     is_verified: true,
//   },
//   {
//     profile_id: 'hm_7726',
//     full_name: 'Olivier T.',
//     nationality: 'DRC',
//     university_name: 'African Leadership University',
//     bio_short: 'Social entrepreneur studying leadership. Enjoys cooking for the house and exploring Kigali on weekends.',
//     budget: { min: 200000, max: 300000 },
//     preferred_locations: ['Kicukiro', 'Gisozi'],
//     avatar_url: null,
//     gender: 'male',
//     is_verified: false,
//   },
// ];

export const metadata = {
  title: 'Find a Housemate | WiyoRent',
  description: 'Browse verified student housemate profiles across Kigali.',
};

export default async function  HousematesPage({searchParams}) {

  const params = await searchParams
  const query = new URLSearchParams(params).toString()

  const session = await auth()
  const user = session?.user
  const is_onboarded = user?.is_onboarded
  const verification_status = user?.verification_status

  const { housemates: housemate_profiles, filter_meta } = await fetchHousemates(query)

  const filter_options = {
    budget_range: {
      min: filter_meta?.budget_min ?? 50000,
      max: filter_meta?.budget_max ?? 300000,
    },
    universities: filter_meta?.universities ?? [],
    gender_options: ['Male', 'Female', 'any'],
    locations: filter_meta?.locations ?? [],
  }

  console.log(housemate_profiles, 'housemate profile fetched frontend')

  return (
    <div className="min-h-screen bg-base-200">
      <InformationModal  title = 'Almost there' showModal={!is_onboarded} message={"Let's get you set up! You'll need a profile to browse and connect with housemates. Redirecting you there now...."} redirectTo={'/profile'}/>
      {/* Page header */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-primary text-4xl sm:text-5xl font-extrabold text-base-content uppercase tracking-tight">
            Find a Housemate
          </h1>
          <p className="font-secondary text-base-content/55 mt-2 text-sm">
            {housemate_profiles.length} students looking for housemates in Kigali
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <HousemateFilterSidebar filter_options={filter_options} />
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <HousematesGrid 
              verification_status = {verification_status}
              profiles={housemate_profiles} />
          </div>

        </div>
      </div>
    </div>
  );
}