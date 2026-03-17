'use client';
import ListingRow from '@/components/admin/listings/ListingRow';

export default function ListingsTable({ listings }) {

  const handle_toggle_active = (listing_id, new_state) => {
    console.log(`Toggle listing ${listing_id} to ${new_state}`);
    // PUT /api/admin/listings/${listing_id} { is_active: new_state }
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
    <div className="bg-base-100 rounded-box shadow-sm overflow-x-auto">
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
  );
}