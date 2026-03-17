'use client';

import { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import FilterTooltip from '@/components/public/shared/FilterTooltip';
import PricingRow from '@/components/public/listing/PricingRow';

const format_rwf = (amount) =>
  `RWF ${new Intl.NumberFormat('rw-RW').format(amount)}`;


export default function PricingSidebar({ financials, total_first_payment, listing_id, is_a_wiyorent_house = false }) {
  const { price_per_month, commission_fee, caution_fee, upfront_months = 1 } = financials;
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
              {format_rwf(caution_fee)}
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
              {format_rwf(commission_fee)}
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
              {format_rwf(upfront_rent_total)}
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
              Service Fee {!is_a_wiyorent_house && `(${commission_percent}%)`}
            </span>
            {is_a_wiyorent_house ? (
              <span className="font-secondary text-sm font-semibold text-accent">Waived</span>
            ) : (
              <span className="font-secondary text-sm font-semibold text-base-content/80">
                {format_rwf(commission_fee)}
              </span>
            )}
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