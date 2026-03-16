import FavouritesTabView from '@/components/public/favourites/FavouritesTabView';
import { Heart, LogIn } from 'lucide-react';
import { getSavedHousemates, getSavedListings } from '@/services/public/fetch_saves.service';
import { auth } from '@/auth';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────────────────
// Mock saved profiles — replace body with: await getSavedProfiles() || []
// Structure mirrors housemate_profiles shape from HousematesPage
// ─────────────────────────────────────────────────────────────────────────────
// const mock_saved_profiles = [
//   {
//     profile_id: 'hm_7721',
//     full_name: 'Keza A.',
//     nationality: 'Rwandan',
//     university_name: 'University of Rwanda',
//     bio_short:
//       'Loves football and clean spaces. Studying computer science and looking for a focused, chill roommate.',
//     budget: { min: 100000, max: 150000 },
//     preferred_locations: ['Kicukiro', 'Remera'],
//     avatar_url: null,
//     gender: 'female',
//     is_verified: true,
//   },
//   {
//     profile_id: 'hm_7724',
//     full_name: 'Patrick N.',
//     nationality: 'Rwandan',
//     university_name: 'University of Kigali',
//     bio_short:
//       'Night owl, music lover, keeps shared spaces clean. Business student who codes on weekends.',
//     budget: { min: 90000, max: 140000 },
//     preferred_locations: ['Remera', 'Kimironko'],
//     avatar_url: null,
//     gender: 'male',
//     is_verified: true,
//   },
//   {
//     profile_id: 'hm_7726',
//     full_name: 'Olivier T.',
//     nationality: 'DRC',
//     university_name: 'African Leadership University',
//     bio_short:
//       'Social entrepreneur studying leadership. Enjoys cooking for the house and exploring Kigali on weekends.',
//     budget: { min: 200000, max: 300000 },
//     preferred_locations: ['Kicukiro', 'Gisozi'],
//     avatar_url: null,
//     gender: 'male',
//     is_verified: false,
//   },
// ];

export const metadata = {
  title: 'My Favourites | WiyoRent',
  description: 'Your saved student housing listings and housemate profiles in Kigali',
};

export default async function FavouritesPage() {


  const session = await auth()

  const [favourited_listings, profiles] = session
    ? await Promise.all([getSavedListings(), getSavedHousemates()])
    : [[], []]

  const listings = favourited_listings || [];
  const verification_status = session?.user?.verification_status;
  const total_saved = listings.length + (profiles?.length || 0);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Page header */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart size={22} className="text-error fill-error" />
            </div>
            <div>
              <h1 className="font-primary text-3xl sm:text-4xl font-extrabold text-base-content uppercase tracking-tight">
                My Favourites
              </h1>
              {session && (
                <p className="font-secondary text-base-content/50 mt-1 text-sm">
                  {total_saved} {total_saved === 1 ? 'item' : 'items'} saved
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!session ? (
          // ── Login prompt ─────────────────────────────────────────────
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-base-300 rounded-full flex items-center justify-center mb-5">
              <Heart size={32} className="text-base-content/20" />
            </div>
            <h3 className="font-primary text-2xl font-bold text-base-content uppercase tracking-tight">
              Sign in to view your favourites
            </h3>
            <p className="font-secondary text-base-content/45 mt-2 text-sm max-w-md leading-relaxed">
              Save listings and housemate profiles you love so you can easily find them later.
            </p>
            <Link
              href="/login"
              className="btn btn-accent rounded-field font-primary font-bold text-sm uppercase tracking-wide mt-6 gap-2"
            >
              <LogIn size={16} />
              Log In
            </Link>
          </div>
        ) : (
          <FavouritesTabView
            listings={listings}
            profiles={profiles}
            verification_status={verification_status}
          />
        )}
      </div>
    </div>
  );
}