import ProfileHero from '@/components/public/housemate/ProfileHero';
import AboutSection from '@/components/public/housemate/AboutSection';
import BasicProfileSection from '@/components/public/housemate/BasicProfileSection';
import HousingPreferencesSection from '@/components/public/housemate/HousingPreferencesSection';
import LifestyleSection from '@/components/public/housemate/LifestyleSection';
import ContactCard from '@/components/public/housemate/ContactCard';
import { fetchHousemateDetail } from '@/services/public/housemate.service';
import UserListingSection from '@/components/public/housemate/UserListingSection';
import TrackHousemateView from '@/components/public/housemate/TrackHousemateView';

// ─────────────────────────────────────────────────────────────────────────────
// Mock detail — replace with: await fetch(`/api/housemates/${params.id}`)
// ─────────────────────────────────────────────────────────────────────────────
// const housemate_detail = {
//   profile_id: 'hm_9901',
//   full_name: 'Jane Doe',
//   nationality: 'Rwandan',
//   university_name: 'University of Kigali',
//   avatar_url: null,
//   is_verified: true,
//   gender: 'female',
//   about_me:
//     "Hey! I'm Jane, a third-year Computer Science student. I'm passionate about coding, enjoy exploring Kigali's coffee shops, and love a movie night. I'm tidy, respectful of shared spaces, and I value a calm, focused home environment.",
//   basic_profile: {
//     gender: 'Female',
//     age: 21,
//     program: 'Computer Science',
//     year_of_study: 'Third Year',
//   },
//   housing_preferences: {
//     move_in_date: '2024-09-01',
//     budget: { min: 150000, max: 200000 },
//     room_types: ['Private Room', 'Shared Apartment', 'Studio'],
//     max_housemates: 3,
//     preferred_locations: ['Kicukiro', 'Remera', 'Nyarutarama'],
//     is_furnished_preferred: true,
//     allows_pets: false,
//     is_smoker: false,
//   },
//   lifestyle_personality: {
//     sleep_schedule: 'Night Owl',
//     cleanliness: 'Tidy',
//     social_habits: 'Social, but enjoys quiet time',
//     languages: ['English', 'Kinyarwanda', 'French'],
//   },
// };

export async function generateMetadata({ params }) {
  const { id } = await params;
  const h = await fetchHousemateDetail(id);

  if (!h) {
    return {
      title: "Housemate Profile Not Found | WiyoRent",
      description: "This housemate profile could not be found on WiyoRent.",
      robots: { index: false, follow: false },
    };
  }

  const budget = h.housing_preferences?.budget;
  const locations = h.housing_preferences?.preferred_locations?.join(", ");
  const university = h.university_name;
  const moveIn = h.housing_preferences?.move_in_date
    ? new Date(h.housing_preferences.move_in_date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  const description = h.about_me
    ? h.about_me.slice(0, 155)
    : `${h.full_name} is a verified student at ${university} looking for a housemate in ${locations ?? "Kigali"}${moveIn ? `, moving in ${moveIn}` : ""}. Find and connect on WiyoRent.`;

  return {
    title: `${h.full_name} — Student Housemate in Kigali | WiyoRent`,
    description,
    openGraph: {
      title: `${h.full_name} — Student Housemate in Kigali | WiyoRent`,
      description,
      url: `https://wiyorent.com/housemates/${id}`,
      siteName: "WiyoRent",
      locale: "en_US",
      type: "profile",
      ...(h.avatar_url && {
        images: [
          {
            url: h.avatar_url,
            width: 400,
            height: 400,
            alt: `${h.full_name} profile photo`,
          },
        ],
      }),
    },
    twitter: {
      card: "summary",
      title: `${h.full_name} — Student Housemate in Kigali | WiyoRent`,
      description,
      ...(h.avatar_url && { images: [h.avatar_url] }),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function HousemateDetailPage({params}) {

  const {id} = await params
  const housemate_detail = await fetchHousemateDetail(id)

  return (
    <div className="min-h-screen bg-base-200">
      <TrackHousemateView housemate_id={id} />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Hero banner ─────────────────────────────────── */}
        <ProfileHero
          full_name={housemate_detail?.full_name}
          avatar_url={housemate_detail?.avatar_url}
          nationality={housemate_detail?.nationality}
          university_name={housemate_detail?.university_name}
          verification_status={housemate_detail?.verification_status}
          gender={housemate_detail?.gender}
          preferred_locations={housemate_detail?.housing_preferences?.preferred_locations}
          budget={housemate_detail?.housing_preferences?.budget}
          urgency={housemate_detail?.urgency}
          move_in_date={housemate_detail?.housing_preferences?.move_in_date}
        />

        {/* ── User's available listing ─────────────────── */}
        <UserListingSection listing={housemate_detail?.user_listing_data} />

        {/* ... 3-column grid ... */}
        {/* ── Three-column body ───────────────────────────── */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Column 1 — About + Lifestyle */}
          <div className="flex flex-col gap-6">
            <AboutSection about_me={housemate_detail?.about_me} />
            <LifestyleSection lifestyle={housemate_detail?.lifestyle_personality} />
          </div>

          {/* Column 2 — Basic profile + Housing prefs */}
          <div className="flex flex-col gap-6">
            <BasicProfileSection basic_profile={housemate_detail?.basic_profile} />
            <HousingPreferencesSection
              preferences={housemate_detail?.housing_preferences}
            />
          </div>

          {/* Column 3 — Sticky contact card */}
          <div>
            <div className="lg:sticky lg:top-24">
              <ContactCard
                full_name={housemate_detail?.full_name}
                verification_status={housemate_detail?.verification_status}
                profile_id={housemate_detail?.profile_id}
                preferred_contact_method = {housemate_detail?.preferred_method}
                is_saved = {housemate_detail.saved}
              />
            </div>
          </div>

        </div>

        
      </div>
    </div>
  );
}