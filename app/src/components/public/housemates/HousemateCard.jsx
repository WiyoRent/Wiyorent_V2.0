'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, MapPin, GraduationCap, Wallet } from 'lucide-react';
import Link from 'next/link';
import InformationModal from '../shared/InformationModal';
import { useRouter } from 'next/navigation';
import { Eye, Bookmark, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { contactHousemate } from '@/actions/contact_housemate.action.js';
import { toggleSaveHousemate } from '@/actions/favorites.action';

const format_rwf = (n) => `RWF ${new Intl.NumberFormat('rw-RW').format(n)}`;

function AvatarCircle({ full_name, avatar_url, gender }) {
  const initials = full_name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const gender_color =
    gender === 'female'
      ? 'from-rose-300 to-pink-400'
      : gender === 'male'
      ? 'from-sky-300 to-blue-400'
      : 'from-violet-300 to-indigo-400';

  if (avatar_url && !avatar_url.includes('api.wiyorent.com')) {
    return (
      <div className="w-20 h-20 rounded-full overflow-hidden border border-accent shadow-md flex-shrink-0">
        <img src={avatar_url} alt={full_name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`w-20 h-20 rounded-full bg-gradient-to-br ${gender_color} ring-4 ring-base-100 shadow-md flex items-center justify-center flex-shrink-0`}
    >
      <span className="font-primary text-2xl font-extrabold text-white drop-shadow-sm">
        {initials}
      </span>
    </div>
  );
}

export default function HousemateCard({ profile, verification_status }) {
  const {
    profile_id,
    full_name,
    university_name,
    bio_short,
    budget,
    preferred_locations,
    avatar_url,
    gender,
    is_verified,
  } = profile;

  const router = useRouter();

  const [connected, set_connected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(profile?.saved);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    title: 'Account Review in Progress',
    message:
      "To ensure the safety of our community, our team manually reviews all profiles. You'll be able to view housemate details and contact housemates as soon as we approve your account (usually within 24 hours).",
  });

  console.log(saved, '---saved')

  const is_blocked = verification_status == false || verification_status == 'pending';

  const showVerificationModal = () => {
    setModalData({
      title: 'Account Review in Progress',
      message:
        "To ensure the safety of our community, our team manually reviews all profiles. You'll be able to view housemate details and contact housemates as soon as we approve your account (usually within 24 hours).",
    });
    setShowModal(true);
  };

  const handleView = async () => {
    if (is_blocked) {
      showVerificationModal();
      return;
    }
    router.push(`/housemates/${profile_id}`);
  };

  const handleContact = async (e) => {
    e.stopPropagation();

    if (is_blocked) {
      showVerificationModal();
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
      toast.error( error.message ||  "Couldn't get housemate contact details");
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

      // Subtle feedback
      toast.success(newSavedStatus ? "Added to favorites" : "Removed from favorites", {
        position: "bottom-right",
        autoClose: 1000, // Short duration so it's not annoying
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
    <div className="bg-base-100 rounded-box shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col overflow-hidden group w-full">

      {/* Dynamic modal — handles both verification and pop-up blocked cases */}
      <InformationModal
        title={modalData.title}
        message={modalData.message}
        redirectTo={null}
        setShowModal={setShowModal}
        showModal={showModal}
      />

      {/* Card top — avatar + name block */}
      <div className="p-6 pb-4 flex items-center gap-5">
        <AvatarCircle full_name={full_name} avatar_url={avatar_url} gender={gender} />

        {/* Right column — constrained so it never overflows */}
        <div className="flex-1 min-w-0">
          {/* Name + verified badge */}
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href={`/housemates/${profile_id}`}
              className="font-primary text-base font-extrabold text-base-content uppercase tracking-tight hover:text-accent transition-colors leading-tight truncate block"
            >
              {full_name}
            </Link>
            {is_verified && (
              <ShieldCheck size={15} className="text-success flex-shrink-0" aria-label="Verified" />
            )}
          </div>

          {/* University */}
          <div className="flex items-center gap-1.5 mt-1.5 min-w-0">
            <GraduationCap size={13} className="text-base-content/35 flex-shrink-0" />
            <span className="font-secondary text-sm text-base-content/50 truncate">
              {university_name}
            </span>
          </div>

          {/* Budget — nowrap so min–max stays on one line */}
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
          ) : is_blocked ? (
            'Pending'
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