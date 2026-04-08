'use client';

import { useState } from 'react';
import { Phone, MessageCircle, ClipboardList } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FilterTooltip from '@/components/public/shared/FilterTooltip';
import PricingRow from '@/components/public/listing/PricingRow';
import { toggleWaitlistListing } from '@/actions/public/favorites.action';
import { formatRWF } from '@/lib/formatRWF';

const WHATSAPP_NUMBER = '250794089835';
const LISTING_BASE_URL = 'https://wiyorent.com/listings';

export default function PricingSidebar({ financials, total_first_payment, listing_id, is_a_wiyorent_house = false, available_status, is_on_waitlist = false }) {
  const { price_per_month, commission_fee, caution_fee, upfront_months = 1 } = financials;
  const is_available = available_status === 'available';

  const [on_waitlist, set_on_waitlist] = useState(is_on_waitlist);
  const session = useSession();
  const router = useRouter();

  const listing_url = `${LISTING_BASE_URL}/${listing_id}`;

  const handleBookNow = () => {
    const message = encodeURIComponent(`Hi! I'm interested in booking this listing and would like to proceed:\n${listing_url}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleContact = () => {
    const message = encodeURIComponent(`Hi! I'd like to get more information about this listing:\n${listing_url}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleWaitlist = () => {
    if (!session?.data) {
      router.push('/login');
      return;
    }
    const next = !on_waitlist;
    set_on_waitlist(next);
    toggleWaitlistListing(listing_id, next);
  };
  const commission_percent = Math.round((commission_fee / price_per_month) * 100);
  const upfront_rent_total = price_per_month * upfront_months;

  return (
    <div className="flex flex-col gap-4">

      {/* ── Top Card: Pricing Details ──────────────────────── */}
      <div className="bg-base-100 rounded-box p-5 shadow-sm">
        <h2 className="font-primary text-sm font-extrabold text-base-content uppercase tracking-widest mb-4 flex items-center gap-3">
          <span className="w-1 h-4 bg-accent rounded-full inline-block" />
          Pricing Details
        </h2>

        <div className="flex flex-col gap-3">
          {/* Monthly rent */}
          <PricingRow
            label="Monthly Rent"
            sublabel="per month"
            amount={price_per_month}
            highlight
          />

          <div className="border-t border-base-200" />

          {/* Security deposit */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-secondary text-sm text-base-content/70">
                  Security Deposit
                </span>
                <FilterTooltip text="Caution fee is fully refundable when you vacate and return the property in good condition." />
              </div>
              <span className="font-secondary text-xs text-success font-semibold">
                Refundable &amp; Returnable
              </span>
            </div>
            <span className="font-primary text-sm font-extrabold text-base-content/80 flex-shrink-0">
              {formatRWF(caution_fee)}
            </span>
          </div>

          <div className="border-t border-base-200" />

          {/* Service / commission fee */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-secondary text-sm text-base-content/70">
                  Service Fee {!is_a_wiyorent_house && `(${commission_percent}%)`}
                </span>
                {!is_a_wiyorent_house && (
                  <FilterTooltip text={`One-time platform service fee of ${commission_percent}% of one month's rent.`} />
                )}
              </div>
              {is_a_wiyorent_house ? (
                <span className="font-secondary text-xs text-accent font-semibold">
                  Waived · WiyoRent House
                </span>
              ) : (
                <span className="font-secondary text-xs text-base-content/40">
                  One-time payment · {commission_percent}% of monthly rent
                </span>
              )}
            </div>
            <span className={`font-primary text-sm font-extrabold flex-shrink-0 ${is_a_wiyorent_house ? 'line-through text-base-content/30' : 'text-base-content/80'}`}>
              {formatRWF(commission_fee)}
            </span>
          </div>
        </div>

        {/* Note banner */}
        <div className="mt-4 bg-base-200 rounded-field px-3 py-2.5">
          <p className="font-secondary text-xs text-base-content/50 leading-snug text-center">
            {is_a_wiyorent_house
              ? `First payment must cover ${upfront_months} month${upfront_months > 1 ? 's' : ''} rent and deposit. No service fee.`
              : `First payment must cover ${upfront_months} month${upfront_months > 1 ? 's' : ''} rent, deposit, and service fee.`}
          </p>
        </div>
      </div>

      {/* ── First Payment Breakdown Card ───────────────────── */}
      <div className="bg-base-100 rounded-box p-5 shadow-sm">
        <h3 className="font-primary text-xs font-extrabold text-base-content uppercase tracking-widest mb-4">
          First Payment Breakdown
        </h3>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="font-secondary text-sm text-base-content/60">Monthly Rent × {upfront_months}</span>
            <span className="font-secondary text-sm font-semibold text-base-content/80">
              {formatRWF(upfront_rent_total)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-secondary text-sm text-base-content/60">Security Deposit</span>
            <span className="font-secondary text-sm font-semibold text-base-content/80">
              {formatRWF(caution_fee)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-secondary text-sm text-base-content/60">
              Service Fee {!is_a_wiyorent_house && `(${commission_percent}%)`}
            </span>
            {is_a_wiyorent_house ? (
              <span className="font-secondary text-sm font-semibold text-accent">Waived</span>
            ) : (
              <span className="font-secondary text-sm font-semibold text-base-content/80">
                {formatRWF(commission_fee)}
              </span>
            )}
          </div>

          <div className="border-t border-base-200 pt-3 mt-1">
            <div className="bg-accent rounded-field px-4 py-3 flex items-center justify-between">
              <span className="font-primary text-sm font-extrabold text-primary-content uppercase tracking-wide">
                Total First Payment
              </span>
              <span className="font-primary text-lg font-extrabold text-primary-content">
                {formatRWF(total_first_payment)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Action Buttons ──────────────────────────────────── */}
      <div className="flex flex-col gap-2.5">

        {/* Book Now + Enquire — side by side */}
        <div className="flex gap-2">
          <button
            onClick={handleBookNow}
            disabled={!is_available}
            className={`btn btn-accent flex-1 rounded-field font-primary font-extrabold text-sm uppercase tracking-wider gap-2 transition-all duration-200 ${is_available ? 'active:scale-95' : 'opacity-50 cursor-not-allowed'}`}
          >
            <MessageCircle size={16} />
            Book Now
          </button>

          <button
            onClick={handleContact}
            className="btn btn-outline btn-accent flex-1 rounded-field font-primary font-extrabold text-sm uppercase tracking-wider gap-2 active:scale-95 transition-all duration-200 hover:bg-accent hover:text-accent-content hover:border-accent"
          >
            <Phone size={16} />
            Enquire
          </button>
        </div>

        {/* Join Waitlist — only when booked */}
        {!is_available && (
          <button
            onClick={handleWaitlist}
            className={`btn w-full rounded-field font-primary font-bold text-sm uppercase tracking-wider border-2 gap-2 transition-all duration-200 active:scale-95 ${
              on_waitlist
                ? 'bg-accent border-accent text-accent-content'
                : 'bg-base-100 border-base-300 text-base-content/60 hover:border-accent hover:text-accent hover:bg-accent/10'
            }`}
          >
            <ClipboardList size={16} />
            {on_waitlist ? 'Leave Waitlist' : 'Join Waitlist'}
          </button>
        )}

      </div>

    </div>
  );
}