'use client';
import { useState } from 'react';
import { Eye, Heart, Clock, Edit2, Trash2, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { deleteListing } from '@/actions/admin/listings.action';
import StatusBadge from '@/components/admin/listings/StatusBadge';

export default function ListingRow({ listing, on_toggle_active }) {

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
      await deleteListing(listing.listing_id)

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
            <div className="relative w-10 h-10 rounded-full">
              <Image fill src={listing.thumbnail_url} alt={listing.title} className="object-cover" />
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
          <div className="flex items-center gap-1">
            <Clock size={13} className="text-warning" />
            <span className="font-secondary text-sm font-semibold text-base-content">
              {listing.analytics.number_of_waitlists}
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
