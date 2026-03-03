'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, Bookmark, Contact as ContactIcon } from 'lucide-react';
import { contactHousemate } from '@/actions/contact_housemate.action.js';
import { toast } from 'react-toastify';
import InformationModal from '../shared/InformationModal';
import { toggleSaveHousemate } from '@/actions/favorites.action';

export default function ContactCard({ full_name, profile_id, verification_status, is_saved }) {
  const [saved, setSaved] = useState(is_saved);
  const [isLoading, setIsLoading] = useState(false);
  
  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '' });

  const first_name = full_name?.split(' ')[0];

  const handleContact = async () => {
    
    try {
      setIsLoading(true);
      const {url, preferred_contact_method} = await contactHousemate(profile_id);

      if (!url) {
        throw new Error("Could not retrieve contact link.");
      }

      if (preferred_contact_method === 'email') {
        window.location.href = url;
      } else {
        const newWindow = window.open(url, '_blank');
        
        // Check if pop-up was blocked
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          setModalData({
            title: "Pop-up Blocked",
            message: `Your browser blocked the WhatsApp chat. Please disable your pop-up blocker or click 'Close' to try again. If it keeps failing, check your browser settings for Wiyorent.`
          });
          setShowModal(true);
        }
      }
    } catch (error) {
      toast.error("Couldn't get housemate contact details");
      console.error("Failed to contact:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave  = async () => {
    setSaved(!is_saved)
  }

  useEffect(() => {
    toggleSaveHousemate(profile_id,saved)
  }, [saved])

  return (
    <div className="bg-base-100 rounded-box shadow-sm overflow-hidden">
      {/* Information Modal Fallback */}
      <InformationModal 
        title={modalData.title}
        message={modalData.message}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {/* Gold top strip */}
      <div className="h-1.5 bg-accent" />

      <div className="p-5 flex flex-col gap-4">
        {/* Heading */}
        <div>
          <h3 className="font-primary text-base font-extrabold text-base-content uppercase tracking-wide">
            Get in Touch
          </h3>
          <p className="font-secondary text-xs text-base-content/45 mt-0.5 leading-snug">
            Send {first_name} a direct message.
          </p>
        </div>

        {/* Verified note */}
        {verification_status === 'approved' && (
          <div className="flex items-center gap-2 bg-success/8 border border-success/20 rounded-field px-3 py-2">
            <ShieldCheck size={14} className="text-success shrink-0" />
            <span className="font-secondary text-xs text-success font-semibold">
              Identity verified by WiyoRent
            </span>
          </div>
        )}

        {/* Contact Button */}
        <button
          onClick={handleContact}
          disabled={isLoading}
          className="btn btn-accent w-full rounded-field font-primary font-extrabold text-sm uppercase tracking-widest gap-2 active:scale-95 transition-all duration-150 disabled:bg-accent/50"
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <ContactIcon size={16} />
              <span>Contact</span>
            </>
          )}
        </button>

        {/* Save profile */}
        <button
          onClick={handleSave}
          className={`btn btn-ghost btn-sm w-full rounded-field font-secondary text-xs gap-2 transition-colors ${
            saved ? 'text-accent' : 'text-base-content/40 hover:text-accent'
          }`}
        >
          <Bookmark size={14} className={saved ? 'fill-accent text-accent' : ''} />
          {saved ? 'Saved to Favourites' : 'Save Profile'}
        </button>

        {/* Safety note */}
        <p className="font-secondary text-xs text-base-content/30 text-center leading-snug pt-1 border-t border-base-200">
          WiyoRent verifies student identities for a safer community.
        </p>
      </div>
    </div>
  );
}