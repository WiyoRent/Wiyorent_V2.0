'use client';
import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, MapPin, GraduationCap, Wallet, Home, Zap } from 'lucide-react';
import Link from 'next/link';
import InformationModal from '../shared/InformationModal';
import { useRouter } from 'next/navigation';
import { Eye, Bookmark, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { contactHousemate } from '@/actions/public/contact_housemate.action.js.js';
import { toggleSaveHousemate } from '@/actions/public/favorites.action';
import AvatarCircle from '@/components/public/housemates/AvatarCircle';
const format_rwf = (n) => `RWF ${new Intl.NumberFormat('rw-RW').format(n)}`;
export default function HousemateCard({ profile, my_verification_status }) {
  const {
    profile_id,
    full_name,
    university_name,
    bio_short,
    budget,
    preferred_locations,
    avatar_url,
    gender,
    verification_status,
    has_house,
    urgency,
    listing_snapshot,
  } = profile;
  const router = useRouter();
  const [connected, set_connected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(profile?.saved);
  const [isLoading, setIsLoading] = useState(false);
  const [show_house_popup, set_show_house_popup] = useState(false);
  const house_btn_ref = useRef(null);
  const [modalData, setModalData] = useState({
    title: 'Account Review in Progress',
    message:
      "To ensure the safety of our community, our team manually reviews all profiles. You'll be able to view housemate details and contact housemates as soon as we approve your account (usually within 24 hours).",
  });
  const is_blocked = my_verification_status == null || my_verification_status == 'pending' || my_verification_status === 'rejected';
  const is_urgent = urgency === 'extremely_urgent';

  // Close house popup on outside click
  useEffect(() => {
    if (!show_house_popup) return;
    const handle = (e) => {
      if (house_btn_ref.current && !house_btn_ref.current.contains(e.target)) {
        set_show_house_popup(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [show_house_popup]);

  const showVerificationModal = (status) => {
    if (status === 'rejected') {
      setModalData({
        title: 'Account was rejected',
        message:
          "Your profile verification was not approved during our manual review. To access housemate details and messaging, please review your profile information, ensure all details are accurate, and resubmit for approval."
      });
    } else {
      setModalData({
        title: 'Account Review in Progress',
        message:
          "To ensure the safety of our community, our team manually reviews all profiles. You'll be able to view housemate details and contact housemates as soon as we approve your account (usually within 24 hours).",
      });
    }
    setShowModal(true);
  };

  const handleView = async () => {
    if (is_blocked) {
      showVerificationModal(my_verification_status);
      return;
    }
    router.push(`/housemates/${profile_id}`);
  };
  const handleContact = async (e) => {
    e.stopPropagation();
    if (is_blocked) {
      showVerificationModal(my_verification_status);
      return;
    }
    try {
      setIsLoading(true);
      const { url, preferred_contact_method } = await contactHousemate(profile_id);
      if (!url) throw new Error('Could not retrieve contact link.');
      if (preferred_contact_method === 'email') {
        window.location.href = url;
      } else {
        const newWindow = window.open(url, '_blank');
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          setModalData({
            title: 'Pop-up Blocked',
            message:
              "Your browser blocked the WhatsApp chat. Please disable your pop-up blocker and try again. If it keeps failing, check your browser settings for Wiyorent.",
          });
          setShowModal(true);
        }
      }
    } catch (error) {
      toast.error(error.message || "Couldn't get housemate contact details");
      console.error('Failed to contact:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSave = async (e) => {
    e.stopPropagation();
    const previousSavedState = saved;
    const newSavedStatus = !saved;
    setSaved(newSavedStatus);
    try {
      const success = await toggleSaveHousemate(profile_id, newSavedStatus);
      if (!success) {
        throw new Error("Server rejected the toggle");
      }
      toast.success(newSavedStatus ? "Added to favorites" : "Removed from favorites", {
        position: "bottom-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Save failed:", error);
      setSaved(previousSavedState);
      toast.error("Connection error. Could not save housemate.");
    }
  };
  useEffect(() => {
    setSaved(profile?.saved);
  }, [profile?.saved]);
  return (
    <div className={`bg-base-100 rounded-box shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col group w-full${is_urgent ? ' ring-2 ring-accent ring-offset-1' : ''}`}>
      {/* Dynamic modal */}
      <InformationModal
        title={modalData.title}
        message={modalData.message}
        redirectTo={null}
        setShowModal={setShowModal}
        showModal={showModal}
      />

      {/* ── Urgency strip — only for extremely_urgent ─────────────────────── */}
      {is_urgent && (
        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-accent rounded-t-box">
          <span className="font-primary text-[10px] font-extrabold uppercase tracking-widest text-secondary">
            IS Looking for a place ASAP
          </span>
        </div>
      )}

      {/* Card top — avatar + name block */}
      <div className="p-6 pb-4 flex items-center gap-5">
        <AvatarCircle full_name={full_name} avatar_url={avatar_url} gender={gender} />
        {/* Right column */}
        <div className="flex-1 min-w-0">
          {/* Name + verified badge + has-a-place badge */}
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            <Link
              href={`/housemates/${profile_id}`}
              className="font-primary text-base font-extrabold text-base-content uppercase tracking-tight hover:text-accent transition-colors leading-tight truncate block"
            >
              {full_name}
            </Link>
            {verification_status === 'approved' && (
              <ShieldCheck size={15} className="text-success flex-shrink-0" aria-label="Verified" />
            )}
            {/* ── Has a Place badge + Quick View popup ───────────────── */}
            {has_house && (
              <div ref={house_btn_ref} className="relative flex-shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); set_show_house_popup((v) => !v); }}
                  className={`flex items-center gap-1 rounded-field px-1.5 py-0.5 border transition-colors ${show_house_popup ? 'bg-accent border-accent text-secondary' : 'bg-accent/15 border-accent/30 text-accent hover:bg-accent/25'}`}
                  aria-label="Has a place — view quick preview"
                >
                  <Home size={11} />
                  <span className="font-primary text-[9px] font-extrabold uppercase tracking-wide">Has a Place</span>
                </button>

                {show_house_popup && (
                  <div className="absolute top-full left-0 mt-1.5 w-56 bg-base-100 rounded-box shadow-xl border border-base-300 overflow-hidden z-50">
                    {listing_snapshot ? (
                      <>
                        {listing_snapshot.thumbnail && (
                          <div className="w-full aspect-video bg-base-300 overflow-hidden">
                            <img
                              src={listing_snapshot.thumbnail}
                              alt="Room preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-3 flex flex-col gap-2">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-primary text-base font-extrabold text-accent">
                              {format_rwf(listing_snapshot.price)}
                            </span>
                            <span className="font-secondary text-xs text-base-content/45">/ mo</span>
                          </div>
                          {listing_snapshot.neighborhood && (
                            <div className="flex items-center gap-1.5">
                              <MapPin size={11} className="text-base-content/30 flex-shrink-0" />
                              <span className="font-secondary text-xs text-base-content/60">
                                {listing_snapshot.neighborhood}
                              </span>
                            </div>
                          )}
                          <Link
                            href={`/housemates/${profile_id}`}
                            onClick={() => set_show_house_popup(false)}
                            className="btn btn-accent btn-xs rounded-field font-primary font-extrabold uppercase tracking-wider mt-1"
                          >
                            View Full Profile
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="p-3">
                        <p className="font-secondary text-xs text-base-content/50 text-center">
                          No listing details yet.
                        </p>
                        <Link
                          href={`/housemates/${profile_id}`}
                          onClick={() => set_show_house_popup(false)}
                          className="btn btn-accent btn-xs rounded-field font-primary font-extrabold uppercase tracking-wider mt-2 w-full"
                        >
                          View Profile
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          {/* University */}
          <div className="flex items-center gap-1.5 mt-1.5 min-w-0">
            <GraduationCap size={13} className="text-base-content/35 flex-shrink-0" />
            <span className="font-secondary text-sm text-base-content/50 truncate">
              {university_name}
            </span>
          </div>
          {/* Budget */}
          <div className="flex items-center gap-1.5 mt-1.5 min-w-0">
            <Wallet size={13} className="text-base-content/35 flex-shrink-0" />
            <span className="font-secondary text-sm text-base-content/50 whitespace-nowrap truncate">
              {format_rwf(budget.min)} – {format_rwf(budget.max)}
            </span>
          </div>
        </div>
      </div>
      {/* Bio */}
      <div className="px-6 pb-4">
        <p className="font-secondary text-sm text-base-content/60 leading-relaxed line-clamp-2">
          {bio_short}
        </p>
      </div>
      {/* Location pills — single row, max 2 visible */}
      <div className="px-6 pb-4 flex items-center gap-2 flex-nowrap overflow-hidden">
        <MapPin size={13} className="text-base-content/30 flex-shrink-0" />
        {preferred_locations.slice(0, 2).map((loc) => (
          <span
            key={loc}
            className="bg-accent/15 text-accent-content font-primary text-xs font-bold px-3 py-1 rounded-field border border-accent/25 uppercase tracking-wide truncate max-w-[130px]"
          >
            {loc}
          </span>
        ))}
        {preferred_locations.length > 2 && (
          <span className="font-secondary text-xs text-base-content/40 flex-shrink-0 whitespace-nowrap">
            +{preferred_locations.length - 2} more
          </span>
        )}
      </div>
      {/* Divider */}
      <div className="border-t border-base-200 mx-6" />
      {/* CTA row */}
      <div className="p-5 flex gap-2 items-center">
        <button
          onClick={handleContact}
          disabled={isLoading}
          className={`btn flex-1 rounded-field font-primary font-extrabold text-xs uppercase tracking-widest transition-all duration-200 active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed ${
            connected
              ? 'btn-outline border-success text-success hover:bg-success/10'
              : 'btn-accent'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-1.5">
              <Loader2 size={13} className="animate-spin" />
              Connecting...
            </span>
          ) : (
            'Contact'
          )}
        </button>
        {/* Save */}
        <button
          onClick={handleSave}
          aria-label={saved ? 'Unsave housemate' : 'Save housemate'}
          className={`btn btn-ghost btn-outline btn-sm rounded-field px-3 transition-colors duration-200 ${
            saved
              ? 'text-accent border-accent hover:bg-accent/10'
              : 'text-base-content/50 hover:text-primary'
          }`}
        >
          <Bookmark size={15} className={saved ? 'fill-accent' : ''} />
        </button>
        {/* View */}
        <button
          onClick={handleView}
          aria-label="View profile"
          className="btn btn-ghost btn-outline btn-sm rounded-field text-base-content/50 hover:text-primary px-3"
        >
          <Eye size={15} />
        </button>
      </div>
    </div>
  );
}
