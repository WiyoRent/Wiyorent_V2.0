'use client';

import { useState } from 'react';
import { Info, Phone, MessageCircle } from 'lucide-react';

const format_rwf = (amount) =>
  `RWF ${new Intl.NumberFormat('rw-RW').format(amount)}`;

function PricingRow({ label, sublabel, amount, highlight = false, size = 'normal' }) {
  return (
    <div className={`flex items-start justify-between gap-3 ${size === 'large' ? 'py-1' : ''}`}>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span
          className={`font-secondary leading-snug ${
            highlight
              ? 'text-sm font-bold text-base-content'
              : 'text-sm text-base-content/70'
          }`}
        >
          {label}
        </span>
        {sublabel && (
          <span className="font-secondary text-xs text-base-content/40 leading-snug">
            {sublabel}
          </span>
        )}
      </div>
      <span
        className={`font-primary font-extrabold flex-shrink-0 ${
          highlight
            ? 'text-base text-primary'
            : 'text-sm text-base-content/80'
        }`}
      >
        {format_rwf(amount)}
      </span>
    </div>
  );
}

function Tooltip({ text }) {
  const [visible, set_visible] = useState(false);
  return (
    <span className="relative inline-flex">
      <Info
        size={13}
        className="text-base-content/30 cursor-pointer hover:text-base-content/60 transition-colors"
        onMouseEnter={() => set_visible(true)}
        onMouseLeave={() => set_visible(false)}
      />
      {visible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-base-content text-base-100 text-xs font-secondary rounded-field px-3 py-2 leading-snug z-10 shadow-lg pointer-events-none">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-base-content" />
        </span>
      )}
    </span>
  );
}

export default function PricingSidebar({ financials, total_first_payment, listing_id }) {
  const { price_per_month, commission_fee, caution_fee } = financials;
  const commission_percent = Math.round((commission_fee / price_per_month) * 100);

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
                <Tooltip text="Caution fee is fully refundable when you vacate and return the property in good condition." />
              </div>
              <span className="font-secondary text-xs text-success font-semibold">
                Refundable &amp; Returnable
              </span>
            </div>
            <span className="font-primary text-sm font-extrabold text-base-content/80 flex-shrink-0">
              {format_rwf(caution_fee)}
            </span>
          </div>

          <div className="border-t border-base-200" />

          {/* Service / commission fee */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-secondary text-sm text-base-content/70">
                  Service Fee ({commission_percent}%)
                </span>
                <Tooltip text={`One-time platform service fee of ${commission_percent}% of one month's rent.`} />
              </div>
              <span className="font-secondary text-xs text-base-content/40">
                One-time payment · {commission_percent}% of monthly rent
              </span>
            </div>
            <span className="font-primary text-sm font-extrabold text-base-content/80 flex-shrink-0">
              {format_rwf(commission_fee)}
            </span>
          </div>
        </div>

        {/* Note banner */}
        <div className="mt-4 bg-base-200 rounded-field px-3 py-2.5">
          <p className="font-secondary text-xs text-base-content/50 leading-snug text-center">
            First payment must cover 1 month rent, deposit, and service fee.
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
            <span className="font-secondary text-sm text-base-content/60">Monthly Rent × 1</span>
            <span className="font-secondary text-sm font-semibold text-base-content/80">
              {format_rwf(price_per_month)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-secondary text-sm text-base-content/60">Security Deposit</span>
            <span className="font-secondary text-sm font-semibold text-base-content/80">
              {format_rwf(caution_fee)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-secondary text-sm text-base-content/60">
              Service Fee ({commission_percent}%)
            </span>
            <span className="font-secondary text-sm font-semibold text-base-content/80">
              {format_rwf(commission_fee)}
            </span>
          </div>

          <div className="border-t border-base-200 pt-3 mt-1">
            <div className="bg-accent rounded-field px-4 py-3 flex items-center justify-between">
              <span className="font-primary text-sm font-extrabold text-primary-content uppercase tracking-wide">
                Total First Payment
              </span>
              <span className="font-primary text-lg font-extrabold text-primary-content">
                {format_rwf(total_first_payment)}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}