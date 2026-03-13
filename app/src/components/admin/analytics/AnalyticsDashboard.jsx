'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users, UserCheck, UserX, ShieldCheck, Clock, XCircle, Ban, EyeOff,
  Home, TrendingUp, Calendar, ChevronDown,
  Building2, BarChart3, Star, MessageSquare, Sparkles,
  Eye, Bookmark, ListOrdered, Heart,
  Wallet, Moon, Sun, Cigarette, PawPrint, DoorClosed,
  GraduationCap, MapPin, Globe, RefreshCw,
} from 'lucide-react';
import countryList from 'react-select-country-list';

// ── Country utilities ───────────────────────────────────────────────────────────
const COUNTRY_DATA = countryList().getData();
const get_country_name = (code) =>
  COUNTRY_DATA.find((c) => c.value === code?.toUpperCase())?.label || code || '—';
const flag_emoji = (code) => {
  if (!code || code.length !== 2) return '';
  return [...code.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e0 + c.charCodeAt(0) - 65))
    .join('');
};

// ── Chart color palette (concrete values for conic-gradient) ───────────────────
const C = {
  success: '#4ade80',
  warning: '#fb923c',
  error:   '#f87171',
  info:    '#60a5fa',
  accent:  '#f1c528',
  muted:   '#cbd5e1',
  purple:  '#a78bfa',
};

// ── Formatters ─────────────────────────────────────────────────────────────────
const fmt_num = (n) => (n != null ? new Intl.NumberFormat().format(Number(n)) : '—');
const fmt_rwf = (n) =>
  n != null ? `RWF ${new Intl.NumberFormat('rw-RW').format(Number(n))}` : '—';
const is_zero = (n) => Number(n) === 0;

// ── Section config ─────────────────────────────────────────────────────────────
const SECTION_STYLES = {
  users:         { border: 'border-l-4 border-accent',         bg: 'bg-accent/[0.04]',    icon_cls: 'text-accent',        hdr_cls: 'text-accent' },
  listings:      { border: 'border-l-4 border-success',        bg: 'bg-success/[0.04]',   icon_cls: 'text-success',       hdr_cls: 'text-success' },
  engagement:    { border: 'border-l-4 border-info',           bg: 'bg-info/[0.04]',      icon_cls: 'text-info',          hdr_cls: 'text-info' },
  compatibility: { border: 'border-l-4 border-purple-400',     bg: 'bg-purple-400/[0.04]',icon_cls: 'text-purple-400',    hdr_cls: 'text-purple-400' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

// ── Collapsible section wrapper ────────────────────────────────────────────────
function Section({ id, title, icon: Icon, children, default_open = true }) {
  const [open, set_open] = useState(default_open);
  const s = SECTION_STYLES[id];
  return (
    <div className={`rounded-xl ${s.border} ${s.bg} mb-6 overflow-hidden shadow-sm`}>
      <button
        type="button"
        onClick={() => set_open((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 group"
      >
        <div className="flex items-center gap-3">
          <Icon size={17} className={s.icon_cls} />
          <h2 className={`font-primary text-base font-extrabold uppercase tracking-wider ${s.hdr_cls}`}>
            {title}
          </h2>
        </div>
        <ChevronDown
          size={16}
          className={`text-base-content/30 transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
        />
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, href, raw_value }) {
  const dimmed = raw_value !== undefined && is_zero(raw_value);
  const inner = (
    <div
      className={`
        bg-base-100 rounded-xl shadow-sm p-4 flex flex-col gap-2 h-full
        transition-all duration-150
        ${href ? 'cursor-pointer hover:shadow-md hover:scale-[1.02] group' : ''}
        ${dimmed ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-center gap-1.5">
        {Icon && <Icon size={12} className="text-base-content/30 flex-shrink-0" />}
        <span className="font-secondary text-[11px] text-base-content/50 leading-none">
          {label}
        </span>
      </div>
      <span
        className={`font-primary text-2xl leading-none ${
          dimmed ? 'font-semibold text-base-content/35' : 'font-extrabold text-base-content'
        }`}
      >
        {value}
      </span>
      {href && (
        <span className="font-secondary text-[9px] text-base-content/20 group-hover:text-accent transition-colors mt-auto pt-1">
          View details →
        </span>
      )}
    </div>
  );
  return href ? <Link href={href} className="block">{inner}</Link> : inner;
}

// ── Wide highlight card ────────────────────────────────────────────────────────
function HighlightCard({ label, value, sub, icon: Icon, href }) {
  const inner = (
    <div
      className={`
        bg-base-100 rounded-xl shadow-sm p-4 flex flex-col gap-1.5 col-span-2 h-full
        transition-all duration-150
        ${href ? 'cursor-pointer hover:shadow-md hover:scale-[1.01] group' : ''}
      `}
    >
      <div className="flex items-center gap-1.5">
        {Icon && <Icon size={12} className="text-base-content/30 flex-shrink-0" />}
        <span className="font-secondary text-[11px] text-base-content/50">{label}</span>
      </div>
      <span className="font-primary text-base font-extrabold text-base-content truncate">
        {value || '—'}
      </span>
      {sub && <span className="font-secondary text-xs text-base-content/40">{sub}</span>}
      {href && (
        <span className="font-secondary text-[9px] text-base-content/20 group-hover:text-accent transition-colors mt-auto pt-1">
          View details →
        </span>
      )}
    </div>
  );
  return href ? <Link href={href} className="col-span-2">{inner}</Link> : inner;
}

// ── Donut card (CSS conic-gradient, no lib) ────────────────────────────────────
function DonutCard({ title, a_val, b_val, a_label, b_label, a_color, b_color, icon: Icon }) {
  const a = Number(a_val) || 0;
  const b = Number(b_val) || 0;
  const total = a + b;
  const pct_a = total > 0 ? (a / total) * 360 : 180;

  return (
    <div className="bg-base-100 rounded-xl shadow-sm p-4 col-span-2">
      <div className="flex items-center gap-1.5 mb-3">
        {Icon && <Icon size={12} className="text-base-content/30" />}
        <span className="font-secondary text-[11px] text-base-content/50">{title}</span>
      </div>
      <div className="flex items-center gap-5">
        {/* Donut */}
        <div className="relative flex-shrink-0 w-14 h-14">
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `conic-gradient(${a_color} ${pct_a}deg, ${b_color} 0deg)`,
            }}
          />
          {/* Center cutout */}
          <div className="absolute inset-[18%] bg-base-100 rounded-full" />
        </div>
        {/* Legend */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a_color }} />
            <span className="font-secondary text-xs text-base-content/55">{a_label}</span>
            <span className="font-primary text-xs font-bold text-base-content">{fmt_num(a)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: b_color }} />
            <span className="font-secondary text-xs text-base-content/55">{b_label}</span>
            <span className="font-primary text-xs font-bold text-base-content">{fmt_num(b)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Budget range card ──────────────────────────────────────────────────────────
function BudgetRangeCard({ min_val, max_val }) {
  const min_n = Number(min_val) || 0;
  const max_n = Number(max_val) || 0;
  const ceiling = max_n * 1.25 || 500000;
  const left_pct = (min_n / ceiling) * 100;
  const width_pct = ((max_n - min_n) / ceiling) * 100;

  return (
    <div className="bg-base-100 rounded-xl shadow-sm p-4 col-span-2 sm:col-span-3 lg:col-span-4">
      <div className="flex items-center gap-1.5 mb-3">
        <Wallet size={12} className="text-base-content/30" />
        <span className="font-secondary text-[11px] text-base-content/50">Average Budget Range</span>
      </div>
      <div className="relative h-2.5 bg-base-300 rounded-full overflow-hidden mb-2">
        <div
          className="absolute h-full bg-accent rounded-full"
          style={{ left: `${left_pct}%`, width: `${Math.max(width_pct, 4)}%` }}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="font-secondary text-[9px] text-base-content/30 uppercase tracking-wider">Avg Min</span>
          <span className="font-primary text-sm font-bold text-base-content">{fmt_rwf(min_val)}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-secondary text-[9px] text-base-content/30 uppercase tracking-wider">Avg Max</span>
          <span className="font-primary text-sm font-bold text-base-content">{fmt_rwf(max_val)}</span>
        </div>
      </div>
    </div>
  );
}

// ── Urgency breakdown ──────────────────────────────────────────────────────────
function UrgencyBreakdown({ data }) {
  const items = [
    { label: 'Not Urgent', value: data.total_non_urgent_users,      hex: C.success, text: 'text-success' },
    { label: 'Slightly',   value: data.total_slightly_urgent_users,  hex: C.warning, text: 'text-warning' },
    { label: 'Urgent',     value: data.total_extremely_urgent_users, hex: C.error,   text: 'text-error' },
    { label: 'Flexible',   value: data.total_flexible_users,         hex: C.info,    text: 'text-info' },
  ];
  const total = items.reduce((s, i) => s + Number(i.value), 0);
  const MIN_PX = 3; // minimum sliver for zero values

  return (
    <div className="bg-base-100 rounded-xl shadow-sm p-4 col-span-2 sm:col-span-3 lg:col-span-4">
      <div className="flex items-center gap-1.5 mb-3">
        <Sparkles size={12} className="text-base-content/30" />
        <span className="font-secondary text-[11px] text-base-content/50">Urgency Breakdown</span>
      </div>
      {/* Bar with guaranteed minimum slivers */}
      <div className="flex w-full h-2.5 rounded-full overflow-hidden gap-px mb-3 bg-base-300">
        {items.map(({ label, value, hex }) => {
          const pct = total > 0 ? (Number(value) / total) * 100 : 0;
          return (
            <div
              key={label}
              className="h-full transition-all duration-300 rounded-sm"
              style={{
                background: hex,
                flexGrow: pct,
                minWidth: `${MIN_PX}px`,
              }}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5">
        {items.map(({ label, value, hex, text }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: hex }} />
            <span className="font-secondary text-xs text-base-content/55">{label}</span>
            <span className={`font-primary text-xs font-bold ${text}`}>{fmt_num(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Ranked list ────────────────────────────────────────────────────────────────
function RankedList({ title, items, value_key, label_key, icon: Icon, show_flag = false }) {
  return (
    <div className="bg-base-100 rounded-xl shadow-sm p-4 col-span-2">
      <div className="flex items-center gap-1.5 mb-3">
        {Icon && <Icon size={12} className="text-base-content/30" />}
        <span className="font-secondary text-[11px] text-base-content/50">{title}</span>
      </div>
      {!items?.length ? (
        <span className="font-secondary text-xs text-base-content/30">No data</span>
      ) : (
        <ol className="flex flex-col gap-2">
          {items.slice(0, 8).map((item, i) => (
            <li key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-primary text-[10px] text-base-content/25 w-4 flex-shrink-0">
                  {i + 1}.
                </span>
                {show_flag && (
                  <span className="text-sm leading-none flex-shrink-0">
                    {flag_emoji(item[label_key])}
                  </span>
                )}
                <span className="font-secondary text-xs text-base-content/70 truncate">
                  {show_flag ? get_country_name(item[label_key]) : (item[label_key] || '—')}
                </span>
              </div>
              <span className="font-primary text-xs font-bold text-base-content flex-shrink-0">
                {fmt_num(item[value_key])}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main dashboard
// ─────────────────────────────────────────────────────────────────────────────
export default function AnalyticsDashboard({ data }) {
  const updated_at = new Date().toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <p className="font-secondary text-base-content/40">Could not load analytics data.</p>
      </div>
    );
  }

  const top_nat = data.most_common_nationality;

  return (
    <div className="min-h-screen bg-base-200 p-6 sm:p-8">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="mb-7">
        <div className="flex items-center gap-2.5 mb-1">
          <BarChart3 size={22} className="text-accent" />
          <h1 className="font-primary text-2xl font-extrabold text-base-content uppercase tracking-tight">
            Analytics
          </h1>
        </div>
        <p className="font-secondary text-sm text-base-content/40 mb-1">
          Platform-wide stats across users, listings, engagement, and compatibility.
        </p>
        <div className="flex items-center gap-1.5">
          <RefreshCw size={10} className="text-base-content/25" />
          <span className="font-secondary text-[10px] text-base-content/30">
            Last updated: {updated_at}
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — USER METRICS                                          */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section id="users" title="User Metrics" icon={Users}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

          <StatCard label="Total Users"     value={fmt_num(data.total_users)}                                icon={Users}      href="/admin/users"                                       raw_value={data.total_users} />
          <StatCard label="Onboarded"       value={fmt_num(data.total_number_of_onboarded_users)}            icon={UserCheck}  href="/admin/users?is_onboarded=true"                     raw_value={data.total_number_of_onboarded_users} />
          <StatCard label="Not Onboarded"   value={fmt_num(data.total_number_of_non_onboarded_users)}        icon={UserX}      href="/admin/users?is_onboarded=false"                    raw_value={data.total_number_of_non_onboarded_users} />
          <StatCard label="Verified"        value={fmt_num(data.total_number_of_verified_users)}             icon={ShieldCheck} href="/admin/users?verification_status=approved"         raw_value={data.total_number_of_verified_users} />

          <StatCard label="Pending Verify"  value={fmt_num(data.total_number_of_pending_verification_users)} icon={Clock}      href="/admin/users?verification_status=pending"           raw_value={data.total_number_of_pending_verification_users} />
          <StatCard label="Rejected"        value={fmt_num(data.total_number_of_rejected_verification_users)} icon={XCircle}   href="/admin/users?verification_status=rejected"          raw_value={data.total_number_of_rejected_verification_users} />
          <StatCard label="Blocked"         value={fmt_num(data.total_number_of_blocked_users)}              icon={Ban}        href="/admin/users?is_blocked=true"                       raw_value={data.total_number_of_blocked_users} />
          <StatCard label="Profile Hidden"  value={fmt_num(data.public_visibility_off)}                      icon={EyeOff}                                                               raw_value={data.public_visibility_off} />

          <StatCard label="Has House"       value={fmt_num(data.total_users_with_a_house)}                   icon={Home}       href="/admin/users?has_house=true"                        raw_value={data.total_users_with_a_house} />
          <StatCard label="New (7 Days)"    value={fmt_num(data.users_in_last_seven_days)}                   icon={TrendingUp}                                                           raw_value={data.users_in_last_seven_days} />
          <StatCard label="New (30 Days)"   value={fmt_num(data.users_in_last_30_days)}                      icon={Calendar}                                                             raw_value={data.users_in_last_30_days} />
          {/* Top Nationality — display country name + flag */}
          <div className="bg-base-100 rounded-xl shadow-sm p-4 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Globe size={12} className="text-base-content/30 flex-shrink-0" />
              <span className="font-secondary text-[11px] text-base-content/50 leading-none">Top Nationality</span>
            </div>
            <span className="font-primary text-base font-extrabold text-base-content leading-snug">
              {top_nat ? `${flag_emoji(top_nat)} ${get_country_name(top_nat)}` : '—'}
            </span>
          </div>

          {/* Gender donut */}
          <DonutCard
            title="Gender Split"
            a_val={data.total_male_users}   a_label="Male"   a_color={C.info}
            b_val={data.total_female_users} b_label="Female" b_color={C.accent}
            icon={Users}
          />

          {/* Urgency breakdown — full width */}
          <UrgencyBreakdown data={data} />

          {/* Ranked lists */}
          <RankedList title="Top Universities"       items={data.universities}       label_key="university" value_key="total" icon={GraduationCap} />
          <RankedList title="Preferred Locations"    items={data.preferred_locations} label_key="location"   value_key="total" icon={MapPin} />
          <RankedList title="Nationalities"          items={data.nationalities}       label_key="nationality" value_key="total" icon={Globe} show_flag />
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — LISTING METRICS                                       */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section id="listings" title="Listing Metrics" icon={Building2}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

          <StatCard label="Total Listings"   value={fmt_num(data.total_listings)}                              icon={Building2}   href="/admin/listings"                          raw_value={data.total_listings} />
          <StatCard label="Verified"         value={fmt_num(data.total_verified_listings)}                     icon={ShieldCheck} href="/admin/listings"                          raw_value={data.total_verified_listings} />
          <StatCard label="Avg Rent / Month" value={fmt_rwf(data.average_rent_per_month)}                      icon={Wallet}                                                      raw_value={data.average_rent_per_month} />
          <StatCard label="Avg Commission"   value={fmt_rwf(data.average_commission_fee)}                      icon={Wallet}                                                      raw_value={data.average_commission_fee} />

          <StatCard label="Avg Caution Fee"  value={fmt_rwf(data.average_caution_fee)}                         icon={Wallet}                                                      raw_value={data.average_caution_fee} />
          <StatCard label="New (7 Days)"     value={fmt_num(data.new_listings_in_last_7_days)}                  icon={TrendingUp}                                                  raw_value={data.new_listings_in_last_7_days} />
          <StatCard label="New (30 Days)"    value={fmt_num(data.new_listings_in_last_30_days)}                 icon={Calendar}                                                    raw_value={data.new_listings_in_last_30_days} />
          <StatCard label="With Reviews"     value={fmt_num(data.total_number_of_listings_with_a_review)}       icon={MessageSquare} href="/admin/listings"                       raw_value={data.total_number_of_listings_with_a_review} />

          <StatCard label="Without Reviews"  value={fmt_num(data.total_number_of_listings_without_a_review)}   icon={MessageSquare}                                               raw_value={data.total_number_of_listings_without_a_review} />
          <StatCard label="5★ Ratings"       value={fmt_num(data.total_number_of_listings_with_five_stars)}    icon={Star}                                                        raw_value={data.total_number_of_listings_with_five_stars} />
          <StatCard label="3–5★ Ratings"     value={fmt_num(data.listing_with_three_to_five_stars)}            icon={Star}                                                        raw_value={data.listing_with_three_to_five_stars} />
          <StatCard label="1–3★ Ratings"     value={fmt_num(data.listing_with_one_to_three_stars)}             icon={Star}                                                        raw_value={data.listing_with_one_to_three_stars} />

          {/* Furnished donut */}
          <DonutCard
            title="Furnished Split"
            a_val={data.total_furnished_listings}   a_label="Furnished"   a_color={C.success}
            b_val={data.total_unfurnished_listings} b_label="Unfurnished" b_color={C.muted}
            icon={Home}
          />
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — MATCHING & ENGAGEMENT                                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section id="engagement" title="Matching & Engagement" icon={Heart}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

          <HighlightCard
            label="Most Viewed Profile"
            value={data.most_viewed_profile}
            sub={`${fmt_num(data.most_viewed_profile_total_views)} views`}
            icon={Eye}
          />
          <HighlightCard
            label="Most Viewed Listing"
            value={data.most_viewed_listing}
            sub={`${fmt_num(data.most_viewed_listing_total_views)} views`}
            icon={Eye}
            href="/admin/listings"
          />
          <HighlightCard
            label="Most Saved Listing"
            value={data.most_saved_listing}
            icon={Bookmark}
            href="/admin/listings"
          />
          <HighlightCard
            label="Most Waitlisted Listing"
            value={data.most_waitlisted_listing}
            icon={ListOrdered}
            href="/admin/listings"
          />

          {/* Waitlist — col-span-2 to avoid orphan */}
          <div className="col-span-2">
            <StatCard
              label="Users on Waitlist"
              value={fmt_num(data.total_number_of_users_on_waitlist)}
              icon={Heart}
              raw_value={data.total_number_of_users_on_waitlist}
            />
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — COMPATIBILITY INSIGHTS                                */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section id="compatibility" title="Compatibility Insights" icon={Sparkles}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

          {/* Budget range — full width */}
          <BudgetRangeCard min_val={data.average_user_minimum_budget} max_val={data.average_user_maximum_budget} />

          {/* Sleep */}
          <DonutCard
            title="Sleep Schedule"
            a_val={data.total_early_birds} a_label="Early Birds" a_color={C.accent}
            b_val={data.total_night_owls}  b_label="Night Owls"  b_color={C.purple}
            icon={Sun}
          />

          {/* Smoking */}
          <DonutCard
            title="Smoking"
            a_val={data.total_smokers}     a_label="Smokers"     a_color={C.error}
            b_val={data.total_non_smokers} b_label="Non-Smokers" b_color={C.success}
            icon={Cigarette}
          />

          {/* Pets */}
          <DonutCard
            title="Pet Ownership"
            a_val={data.total_pet_owners}     a_label="Has Pet"  a_color={C.warning}
            b_val={data.total_non_pet_owners} b_label="No Pets"  b_color={C.muted}
            icon={PawPrint}
          />

          {/* Private room — each col-span-2 to avoid orphan row */}
          <div className="col-span-2">
            <StatCard
              label="Wants Private Room"
              value={fmt_num(data.prefers_private_room)}
              icon={DoorClosed}
              raw_value={data.prefers_private_room}
            />
          </div>
          <div className="col-span-2">
            <StatCard
              label="No Room Preference"
              value={fmt_num(data.does_not_prefer_private_room)}
              icon={DoorClosed}
              raw_value={data.does_not_prefer_private_room}
            />
          </div>
        </div>
      </Section>

    </div>
  );
}
