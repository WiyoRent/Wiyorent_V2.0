import ReviewsTable from '@/components/admin/reviews/ReviewsTable';
import ReviewsFilterBar from '@/components/admin/reviews/ReviewsFilterBar';
import { getReviews } from '@/services/admin/review.service';

export const metadata = { title: 'Review Management | WiyoRent Admin' };

export default async function AdminReviewsPage({ searchParams }) {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();
  const { reviews } = await getReviews(queryString);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Page header */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-primary text-4xl font-extrabold text-base-content uppercase tracking-tight">
            Review Management
          </h1>
          <p className="font-secondary text-base-content/50 mt-2 text-sm">
            Approve, reject, or remove user reviews.
          </p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ReviewsFilterBar />
        <ReviewsTable reviews={reviews} />
      </div>
    </div>
  );
}
