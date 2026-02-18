'use client';

import { useState } from 'react';
import ListingsTable from '@/components/admin/listings/ListingsTable';
import ListingsFilterBar from '@/components/admin/listings/ListingsFilterBar';
import { Plus, Home } from 'lucide-react';
import Link from 'next/link';

const admin_listings_data = [
  {
    listing_id: 'house_8826',
    title: 'Luxury Apartment in Remera',
    thumbnail_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&q=80',
    is_active: true,
    is_verified: true,
    available_status: 'available',
    analytics: { number_of_saves: 142, number_of_views: 1205 },
    landlord: { full_name: 'WiyoRent Ltd', phone_number: '+250780000000' },
    location: { neighborhood: 'Remera', city: 'Kigali', country: 'Rwanda' },
  },
  {
    listing_id: 'house_8821',
    title: 'Modern Room in Kicukiro',
    thumbnail_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=80',
    is_active: true,
    is_verified: true,
    available_status: 'booked',
    analytics: { number_of_saves: 89, number_of_views: 743 },
    landlord: { full_name: 'Mutesi Properties', phone_number: '+250788123456' },
    location: { neighborhood: 'Kicukiro', city: 'Kigali', country: 'Rwanda' },
  },
  {
    listing_id: 'house_8823',
    title: 'Shared Villa in Gasabo',
    thumbnail_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&q=80',
    is_active: false,
    is_verified: false,
    available_status: 'maintenance',
    analytics: { number_of_saves: 56, number_of_views: 421 },
    landlord: { full_name: 'Uwera Estates', phone_number: '+250782456789' },
    location: { neighborhood: 'Gasabo', city: 'Kigali', country: 'Rwanda' },
  },
  {
    listing_id: 'house_8824',
    title: '1 Bedroom House in Zindiro',
    thumbnail_url: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=200&q=80',
    is_active: true,
    is_verified: true,
    available_status: 'available',
    analytics: { number_of_saves: 34, number_of_views: 298 },
    landlord: { full_name: 'Nkusi Homes', phone_number: '+250785678901' },
    location: { neighborhood: 'Zindiro', city: 'Kigali', country: 'Rwanda' },
  },
  {
    listing_id: 'house_8825',
    title: 'Budget Room in Kimironko',
    thumbnail_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
    is_active: true,
    is_verified: false,
    available_status: 'available',
    analytics: { number_of_saves: 67, number_of_views: 589 },
    landlord: { full_name: 'Kalisa Realty', phone_number: '+250789012345' },
    location: { neighborhood: 'Kimironko', city: 'Kigali', country: 'Rwanda' },
  },
];

export default function AdminListingsPage() {
  const [search_query, set_search_query] = useState('');
  const [status_filter, set_status_filter] = useState('all');
  const [neighborhood_filter, set_neighborhood_filter] = useState('all');

  
  const filtered_listings = admin_listings_data.filter((listing) => {
    const matches_search = listing.title.toLowerCase().includes(search_query.toLowerCase()) || 
                          listing.listing_id.toLowerCase().includes(search_query.toLowerCase());
    const matches_status = status_filter === 'all' || listing.available_status === status_filter;
    const matches_neighborhood = neighborhood_filter === 'all' || listing.location.neighborhood === neighborhood_filter;

    return matches_search && matches_status && matches_neighborhood;
  });

  const neighborhoods = Array.from(new Set(admin_listings_data.map(l => l.location.neighborhood)));

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
                Admin control panel
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
        {/* Our New Filter Bar */}
        <ListingsFilterBar 
          search_query={search_query}
          set_search_query={set_search_query}
          status_filter={status_filter}
          set_status_filter={set_status_filter}
          neighborhood_filter={neighborhood_filter}
          set_neighborhood_filter={set_neighborhood_filter}
          available_neighborhoods={neighborhoods}
          total_results={filtered_listings.length}
        />

        {/* Results */}
        {filtered_listings.length > 0 ? (
          <ListingsTable listings={filtered_listings} />
        ) : (
          <div className="bg-base-100 rounded-box py-20 flex flex-col items-center border border-dashed border-base-300">
             <Home size={48} className="text-base-content/10 mb-4" />
             <h3 className="font-primary font-bold text-xl uppercase">No results found</h3>
             <p className="font-secondary text-sm text-base-content/40">Try changing your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}