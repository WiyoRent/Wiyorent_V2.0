'use client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { toggleListingActive } from '@/services/admin/listings.service';
import ListingCard from '@/components/admin/listings/ListingCard';
import ListingRow from '@/components/admin/listings/ListingRow';

export default function ListingsTable({ listings }) {

  const router = useRouter();

  const handle_toggle_active = async (listing_id, new_state) => {
    try {
      await toggleListingActive(listing_id, new_state);
      toast.success(new_state ? 'Listing set to active' : 'Listing hidden');
    } catch (error) {
      toast.error(error.message);
      router.refresh(); // re-sync desktop row state from server
    }
  };

  if (!Array.isArray(listings) || listings.length === 0) {
    return (
      <div className="bg-base-100 rounded-box shadow-sm p-12 text-center">
        <p className="font-secondary text-base-content/40">
          No listings found. Add your first property to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-box shadow-sm">
      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-2 p-2">
        {listings.map((listing) => (
          <ListingCard
            key={listing.listing_id}
            listing={listing}
          />
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra table-sm">
          <thead>
            <tr className="bg-base-200">
              <th className="font-primary text-xs uppercase tracking-wider">Property</th>
              <th className="font-primary text-xs uppercase tracking-wider">Location</th>
              <th className="font-primary text-xs uppercase tracking-wider">Landlord</th>
              <th className="font-primary text-xs uppercase tracking-wider">Performance</th>
              <th className="font-primary text-xs uppercase tracking-wider">Status</th>
              <th className="font-primary text-xs uppercase tracking-wider">Visibility</th>
              <th className="font-primary text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <ListingRow
                key={listing.listing_id}
                listing={listing}
                on_toggle_active={handle_toggle_active}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
