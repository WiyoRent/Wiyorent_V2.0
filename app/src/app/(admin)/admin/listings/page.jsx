'use client';

import { useState } from 'react';
import ListingsTable from '@/components/admin/listings/ListingsTable';
import ListingsFilterBar from '@/components/admin/listings/ListingsFilterBar';
import { Plus, Home } from 'lucide-react';
import Link from 'next/link';
import { getBaseURL } from '@/lib/getBaseURL';
import { toast } from 'react-toastify';
import { useEffect } from 'react';



export default function AdminListingsPage() {

  const [all_listings, set_all_listings] = useState([]);
  const [search_query, set_search_query] = useState('');
  const [status_filter, set_status_filter] = useState('all');
  const [neighborhood_filter, set_neighborhood_filter] = useState('all');


  const fetch_listings = async () => {
    try {
      const url = getBaseURL() + 'api/v1/admin/fetchAllListings'

      const response = await fetch (url, {
        cache : 'no-store'
      })

      if(!response.ok){
        throw new Error(`Failed to fetch.`)
      }

      const result = await response.json()
    
      if(!result.success){
        toast.error("An error couldn't fetch listing")
        return
      }

      set_all_listings(result.data)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() =>  {
    fetch_listings()
  }, [])

  const optimistic_delete = (id) => {
    set_all_listings( prev => prev.filter((item) => item.listing_id !== id ))
  }


  
  const filtered_listings = all_listings.filter((listing) => {
    const matches_search = listing.title.toLowerCase().includes(search_query.toLowerCase()) || 
                          listing.listing_id.toLowerCase().includes(search_query.toLowerCase());
    const matches_status = status_filter === 'all' || listing.available_status === status_filter;
    const matches_neighborhood = neighborhood_filter === 'all' || listing.location.neighborhood === neighborhood_filter;

    return matches_search && matches_status && matches_neighborhood;
  });

  const neighborhoods = Array.from(new Set(all_listings.map(l => l.location.neighborhood)));

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
          <ListingsTable optimistic_delete={optimistic_delete} listings={filtered_listings} />
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