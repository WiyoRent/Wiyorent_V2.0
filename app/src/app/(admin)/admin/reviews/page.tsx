import ReviewsTable from '@/components/admin/reviews/ReviewsTable';
import { getReviews } from '@/services/admin/review.service';
import { Filter } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Mock reviews data — in production: await fetch('/api/admin/reviews')
// ─────────────────────────────────────────────────────────────────────────────
// const admin_manage_reviews = [
//   {
//     review_id: 'rev_01',
//     reviewer: {
//       user_id: 'usr_882',
//       name: 'Keza Mutesi',
//       avatar: null,
//     },
//     property: {
//       property_id: 'house_8826',
//       title: 'Kacyiru Heights',
//     },
//     rating: 4.0,
//     comment: 'Great location and very clean apartment. The landlord was responsive and helpful throughout my stay.',
//     date: '2023-10-25',
//     status: 'pending',
//   },
//   {
//     review_id: 'rev_02',
//     reviewer: {
//       user_id: 'usr_441',
//       name: 'Jean Habimana',
//       avatar: null,
//     },
//     property: {
//       property_id: 'house_9901',
//       title: 'Gisozi Modern Studio',
//     },
//     rating: 5.0,
//     comment: 'Absolutely perfect! The studio had everything I needed, and the neighborhood is safe and convenient.',
//     date: '2023-10-24',
//     status: 'approved',
//   },
//   {
//     review_id: 'rev_03',
//     reviewer: {
//       user_id: 'usr_553',
//       name: 'Teta Umwiza',
//       avatar: null,
//     },
//     property: {
//       property_id: 'house_7721',
//       title: 'Remera Shared Villa',
//     },
//     rating: 3.0,
//     comment: 'The room was fine, but the shared kitchen was often messy. Management could be better.',
//     date: '2023-10-22',
//     status: 'approved',
//   },
//   {
//     review_id: 'rev_04',
//     reviewer: {
//       user_id: 'usr_667',
//       name: 'Innocent Gisa',
//       avatar: null,
//     },
//     property: {
//       property_id: 'house_5512',
//       title: 'Nyarutarama Single Room',
//     },
//     rating: 4.5,
//     comment: 'Very nice and secure neighborhood. The room is spacious and well-maintained.',
//     date: '2023-10-21',
//     status: 'pending',
//   },
// ];

export const metadata = {
  title: 'Manage Reviews | WiyoRent Admin',
  description: 'Approve, edit, or remove user-submitted reviews',
};

export default async function ManageReviewsPage() {

  const admin_manage_reviews = await getReviews()

  return (
    <div className="min-h-screen bg-base-200">
      {/* Page header */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-primary text-4xl font-extrabold text-base-content uppercase tracking-tight">
            Manage Reviews
          </h1>
          <p className="font-secondary text-base-content/50 mt-2 text-sm">
            Approve, edit, or remove user-submitted reviews.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-base-100 rounded-box shadow-sm p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Filter by Property */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Filter by Property
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter property name"
                className="input input-bordered rounded-field font-secondary text-sm"
              />
            </div>

            {/* Filter by Rating */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Filter by Rating
                </span>
              </label>
              <select className="select select-bordered rounded-field font-secondary text-sm">
                <option>All Ratings</option>
                <option>5 Stars</option>
                <option>4 Stars</option>
                <option>3 Stars</option>
                <option>2 Stars</option>
                <option>1 Star</option>
              </select>
            </div>

            {/* Filter by Status */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Filter by Status
                </span>
              </label>
              <select className="select select-bordered rounded-field font-secondary text-sm">
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>

            {/* Apply Button */}
            <div className="form-control">
              <label className="label">
                <span className="label-text opacity-0">Apply</span>
              </label>
              <button className="btn btn-accent rounded-field font-primary font-bold text-sm uppercase tracking-wide gap-2">
                <Filter size={16} />
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <ReviewsTable reviews={admin_manage_reviews} />
      </div>
    </div>
  );
}