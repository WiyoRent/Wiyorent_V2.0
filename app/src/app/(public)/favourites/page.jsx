import FavouritesGrid from '@/components/public/favourites/FavouritesGrid';
import FavouriteCard from '@/components/public/favourites/FavouriteCard';
import { Heart } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Mock favourited listings — in production: await fetch('/api/user/favourites')
// ─────────────────────────────────────────────────────────────────────────────
const favourited_listings = [
  {
    listing_id: 'house_8821',
    title: 'Modern Room in Kicukiro',
    financials: {
      price_per_month: 150000,
      commission_fee: 15000,
      caution_fee: 150000,
    },
    specifications: {
      bedroom_number: 1,
      bathroom_number: 1,
      max_roommates: 2,
      property_type: 'room',
    },
    amenities: ['wifi', 'stove', 'microwave', 'blender'],
    neighborhood: 'Kicukiro',
    city: 'Kigali',
    available_status: 'booked',
    is_furnished: true,
    is_verified: true,
    thumbnail_url:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'
  },
  {
    listing_id: 'house_8823',
    title: 'Shared Villa in Gasabo',
    financials: {
      price_per_month: 250000,
      commission_fee: 25000,
      caution_fee: 250000,
    },
    specifications: {
      bedroom_number: 3,
      bathroom_number: 2,
      max_roommates: 4,
      property_type: 'villa',
    },
    amenities: ['wifi', 'stove', 'microwave', 'blender'],
    neighborhood: 'Gasabo',
    city: 'Kigali',
    available_status: 'available',
    is_furnished: true,
    is_verified: false,
    thumbnail_url:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
    saved_at: '2024-02-16T14:22:00Z',
  },
  {
    listing_id: 'house_8824',
    title: '1 Bedroom House in Zindiro',
    financials: {
      price_per_month: 80000,
      commission_fee: 8000,
      caution_fee: 80000,
    },
    specifications: {
      bedroom_number: 1,
      bathroom_number: 1,
      max_roommates: 2,
      property_type: 'house',
    },
    amenities: ['wifi', 'stove'],
    neighborhood: 'Zindiro',
    city: 'Kigali',
    available_status: 'available',
    is_furnished: true,
    is_verified: true,
    thumbnail_url:
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80',
    saved_at: '2024-02-17T09:15:00Z',
  },
];

export const metadata = {
  title: 'My Favourites | WiyoRent',
  description: 'Your saved student housing listings in Kigali',
};

export default function FavouritesPage() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Page header */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
              <Heart size={22} className="text-error fill-error" />
            </div>
            <div>
              <h1 className="font-primary text-3xl sm:text-4xl font-extrabold text-base-content uppercase tracking-tight">
                My Favourites
              </h1>
              <p className="font-secondary text-base-content/50 mt-1 text-sm">
                {favourited_listings.length}{' '}
                {favourited_listings.length === 1 ? 'property' : 'properties'} saved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FavouritesGrid listings={favourited_listings} />
      </div>
    </div>
  );
}