'use client';
import { getBaseURL } from '@/lib/getBaseURL';
import { useState } from 'react';
import { Eye, Heart, Edit2, Trash2, MapPin } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';



function StatusBadge({ status }) {
  const variants = {
    available: 'badge-success',
    booked: 'badge-error',
    maintenance: 'badge-warning',
  };

  const labels = {
    available: 'Available',
    booked: 'Booked',
    maintenance: 'Maintenance',
  };

  return (
    <span className={`badge ${variants[status]} badge-sm font-primary font-bold uppercase tracking-wide`}>
      {labels[status]}
    </span>
  );
}

function ListingRow({ listing, on_toggle_active }) {

  const router = useRouter()

  const [is_active, set_is_active] = useState(listing.is_active);
  const [show_delete_confirm, set_show_delete_confirm] = useState(false);

  const handle_toggle = () => {
    set_is_active(!is_active);
    on_toggle_active(listing.listing_id, !is_active);
  };

  const handle_delete = async () => {
    const loadingToast = toast.loading('Deleting listing...');
    try {
      const url = getBaseURL() + `api/v1/admin/deleteListing/${listing.listing_id}`
      const response = await fetch(url, {
        method : 'DELETE'
      })

      const result = await response.json()

      if(!response.ok){
        throw new Error( result.message || 'An error occured while deleting')
      }

      toast.update(loadingToast, {
        render: 'Listing deleted successfully',
        type: 'success',
        autoClose: 3000,
        isLoading: false,
      });

      router.refresh();

    } catch (error) {
      toast.update(loadingToast, {
        render: error.message,
        type: 'error',
        autoClose: 3000,
        isLoading: false,
      });
    }
  };

  return (
    <tr className="hover">
      {/* Property */}
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <img src={listing.thumbnail_url} alt={listing.title} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-primary text-sm font-bold text-base-content">
              {listing.title}
            </span>
            <span className="font-secondary text-xs text-base-content/40">
              ID: {listing.listing_id}
            </span>
          </div>
        </div>
      </td>

      {/* Location */}
      <td>
        <div className="flex items-center gap-1.5">
          <MapPin size={12} className="text-base-content/30" />
          <span className="font-secondary text-sm text-base-content/70">
            {listing.location.neighborhood}
          </span>
        </div>
      </td>

      {/* Landlord */}
      <td>
        <div className="flex flex-col">
          <span className="font-secondary text-sm text-base-content">
            {listing.landlord.full_name}
          </span>
          <span className="font-secondary text-xs text-base-content/40">
            {listing.landlord.phone_number}
          </span>
        </div>
      </td>

      {/* Performance */}
      <td>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Eye size={13} className="text-primary" />
            <span className="font-secondary text-sm font-semibold text-base-content">
              {listing.analytics.number_of_views}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={13} className="text-error" />
            <span className="font-secondary text-sm font-semibold text-base-content">
              {listing.analytics.number_of_saves}
            </span>
          </div>
        </div>
      </td>

      {/* Status */}
      <td>
        <StatusBadge status={listing.available_status} />
      </td>

      {/* Visibility Toggle */}
      <td>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={is_active}
            onChange={handle_toggle}
            className="toggle toggle-success toggle-xs"
          />
          <span className="font-secondary text-xs text-base-content/40">
            {is_active ? 'Active' : 'Hidden'}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/listings/${listing.listing_id}`}
            className="btn btn-ghost btn-xs rounded-field"
            aria-label="Edit listing"
          >
            <Edit2 size={14} className="text-primary" />
          </Link>
          {show_delete_confirm ? (
            <div className="flex gap-1">
              <button
                onClick={handle_delete}
                className="btn btn-error btn-xs rounded-field"
              >
                Confirm
              </button>
              <button
                onClick={() => set_show_delete_confirm(false)}
                className="btn btn-ghost btn-xs rounded-field"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => set_show_delete_confirm(true)}
              className="btn btn-ghost btn-xs rounded-field"
              aria-label="Delete listing"
            >
              <Trash2 size={14} className="text-error" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

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