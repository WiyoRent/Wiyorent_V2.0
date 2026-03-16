import ListingsTable from '@/components/admin/listings/ListingsTable';
import ListingsFilterBar from '@/components/admin/listings/ListingsFilterBar';
import { getAdminListings } from '@/services/admin/listings.service';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: 'Manage Listings | WiyoRent Admin' };

export default async function AdminListingsPage({ searchParams }) {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();
  const { listings, filter_meta } = await getAdminListings(queryString);

  const filter_options = {
    price_range: {
      min: filter_meta?.price_min ?? 0,
      max: filter_meta?.price_max ?? 500000,
    },
    neighborhoods: filter_meta?.neighborhoods ?? [],
    property_types: filter_meta?.property_types ?? [],
    landlords: filter_meta?.landlords ?? [],
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Page header */}
      <div className="bg-base-100 border-b border-base-300 sticky top-0 z-10 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-primary text-3xl font-extrabold text-base-content uppercase tracking-tight">
                Manage Listings
              </h1>
              <p className="font-secondary text-sm text-base-content/50 mt-1">
                {listings.length} {listings.length === 1 ? 'listing' : 'listings'}
              </p>
            </div>
            <Link
              href="/admin/listings/new"
              className="btn btn-accent rounded-field font-primary font-extrabold text-sm uppercase tracking-wider gap-2"
            >
              <Plus size={16} />
              Add New Listing
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ListingsFilterBar filter_options={filter_options} />
        <ListingsTable listings={listings} />
      </div>
    </div>
  );
}
