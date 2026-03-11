import ListingCard from '../listings/ListingCard';
import { ClipboardList } from 'lucide-react';
import Link from 'next/link';

export default function WaitlistGrid({ listings }) {
  if (!listings || listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 bg-base-300 rounded-full flex items-center justify-center mb-5">
          <ClipboardList size={32} className="text-base-content/20" />
        </div>
        <h3 className="font-primary text-2xl font-bold text-base-content uppercase tracking-tight">
          No Listings on Your Waitlist
        </h3>
        <p className="font-secondary text-base-content/45 mt-2 text-sm max-w-md leading-relaxed">
          When a listing is fully booked, you can join its waitlist to get notified when it becomes available.
        </p>
        <Link
          href="/listings"
          className="btn btn-accent rounded-field font-primary font-bold text-sm uppercase tracking-wide mt-6"
        >
          Browse Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.listing_id} listing={listing} />
      ))}
    </div>
  );
}
