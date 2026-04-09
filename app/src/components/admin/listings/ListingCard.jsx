'use client';
import { useState } from 'react';
import { Eye, Heart, MapPin, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { deleteListing } from '@/actions/admin/listings.action';
import { toggleListingActive } from '@/services/admin/listings.service';
import StatusBadge from '@/components/admin/listings/StatusBadge';

export default function ListingCard({ listing }) {
  const router = useRouter();
  const [is_active, set_is_active] = useState(listing.is_active);
  const [show_delete_confirm, set_show_delete_confirm] = useState(false);

  const handle_toggle = async () => {
    const new_state = !is_active;
    set_is_active(new_state); // optimistic
    try {
      await toggleListingActive(listing.listing_id, new_state);
      toast.success(new_state ? 'Listing set to active' : 'Listing hidden');
    } catch (error) {
      set_is_active(!new_state); // revert
      toast.error(error.message);
    }
  };

  const handle_delete = async () => {
    const loadingToast = toast.loading('Deleting listing...');
    try {
      await deleteListing(listing.listing_id);
      toast.update(loadingToast, { render: 'Listing deleted successfully', type: 'success', autoClose: 3000, isLoading: false });
      router.refresh();
    } catch (error) {
      toast.update(loadingToast, { render: error.message, type: 'error', autoClose: 3000, isLoading: false });
    }
  };

  return (
    <div className="bg-base-100 rounded-box shadow-sm border border-base-200 mx-3 my-2 p-4">
      {/* Identity */}
      <div className="flex items-start gap-3">
        <div className="avatar flex-shrink-0">
          <div className="relative w-12 h-12 rounded-field">
            <Image fill src={listing.thumbnail_url} alt={listing.title} className="object-cover" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-primary text-sm font-bold text-base-content truncate">{listing.title}</p>
          <p className="font-secondary text-xs text-base-content/40">ID: {listing.listing_id}</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={11} className="text-base-content/30" />
            <span className="font-secondary text-xs text-base-content/60">{listing.location.neighborhood}</span>
          </div>
        </div>
        <StatusBadge status={listing.available_status} />
      </div>

      {/* Landlord + performance */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-base-200">
        <div>
          <p className="font-secondary text-xs font-semibold text-base-content">{listing.landlord.full_name}</p>
          <p className="font-secondary text-xs text-base-content/40">{listing.landlord.phone_number}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Eye size={12} className="text-primary" />
            <span className="font-secondary text-xs font-semibold text-base-content">{listing.analytics.number_of_views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={12} className="text-error" />
            <span className="font-secondary text-xs font-semibold text-base-content">{listing.analytics.number_of_saves}</span>
          </div>
        </div>
      </div>

      {/* Visibility + actions */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-base-200">
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={is_active} onChange={handle_toggle} className="toggle toggle-success toggle-sm" />
          <span className="font-secondary text-xs text-base-content/40">{is_active ? 'Active' : 'Hidden'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/listings/${listing.listing_id}`} className="btn btn-ghost btn-sm rounded-field" aria-label="Edit listing">
            <Edit2 size={16} className="text-primary" />
          </Link>
          {show_delete_confirm ? (
            <div className="flex gap-1">
              <button onClick={handle_delete} className="btn btn-error btn-sm rounded-field">Confirm</button>
              <button onClick={() => set_show_delete_confirm(false)} className="btn btn-ghost btn-sm rounded-field">✕</button>
            </div>
          ) : (
            <button onClick={() => set_show_delete_confirm(true)} className="btn btn-ghost btn-sm rounded-field" aria-label="Delete listing">
              <Trash2 size={16} className="text-error" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
