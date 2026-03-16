import ListingCard from '@/components/public/listings/ListingCard';

export default function ListingsGrid({ listings }) {
  if (!listings || listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-4">🏠</div>
        <h3 className="font-primary text-xl font-bold text-base-content">
          No listings found
        </h3>
        <p className="font-secondary text-base-content/50 mt-2 text-sm">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.listing_id} listing={listing} />
      ))}
    </div>
  );
}