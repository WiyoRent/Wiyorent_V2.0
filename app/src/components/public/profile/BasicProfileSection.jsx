"use client"
import { User, Camera, Zap, CheckCircle2, Lock, Ban } from 'lucide-react';
import VerificationStatusBanner from '@/components/public/profile/VerificationStatusBanner';
import Image from 'next/image';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { useMemo } from 'react';

const UNIVERSITIES = [
  { value: 'University of Rwanda (UR)',                              label: 'University of Rwanda (UR)' },
  { value: 'African Leadership University (ALU)',                    label: 'African Leadership University (ALU)' },
  { value: 'Carnegie Mellon University Africa (CMU-Africa)',         label: 'Carnegie Mellon University Africa (CMU-Africa)' },
  { value: 'INES Ruhengeri',                                        label: 'INES Ruhengeri' },
  { value: 'KIM University',                                        label: 'KIM University' },
  { value: 'Adventist University of Central Africa (AUCA)',          label: 'Adventist University of Central Africa (AUCA)' },
  { value: 'Institut Catholique de Kabgayi (ICK)',                  label: 'Institut Catholique de Kabgayi (ICK)' },
  { value: 'Kepler College',                                        label: 'Kepler College' },
  { value: 'Rwanda Polytechnic',                                    label: 'Rwanda Polytechnic' },
  { value: 'Protestant Institute of Arts and Social Sciences (PIASS)', label: 'Protestant Institute of Arts and Social Sciences (PIASS)' },
  { value: 'University of Kigali (UoK)',                            label: 'University of Kigali (UoK)' },
  { value: 'Athena University',                                     label: 'Athena University' },
  { value: 'International University of East Africa (IUEA) - Kigali Campus', label: 'International University of East Africa (IUEA) - Kigali Campus' },
  { value: 'Jomo Kenyatta University - Kigali Campus',              label: 'Jomo Kenyatta University - Kigali Campus' },
];

const URGENCY_OPTIONS = [
  {
    value: 'not_urgent',
    label: 'Not Urgent',
    description: 'Just browsing for now',
    color: 'text-success',
    bg: 'bg-success/10 border-success/30',
    activeBg: 'bg-success text-success-content border-success',
    dot: 'bg-success',
  },
  {
    value: 'slightly_urgent',
    label: 'Slightly Urgent',
    description: 'Looking within a few weeks',
    color: 'text-warning',
    bg: 'bg-warning/10 border-warning/30',
    activeBg: 'bg-warning text-warning-content border-warning',
    dot: 'bg-warning',
  },
  {
    value: 'extremely_urgent',
    label: 'Extremely Urgent',
    description: 'Need a place ASAP',
    color: 'text-error',
    bg: 'bg-error/10 border-error/30',
    activeBg: 'bg-error text-error-content border-error',
    dot: 'bg-error',
  },
  {
    value: 'flexible',
    label: 'Flexible',
    description: 'Open to any timeline',
    color: 'text-info',
    bg: 'bg-info/10 border-info/30',
    activeBg: 'bg-info text-info-content border-info',
    dot: 'bg-info',
  },
];

export default function BasicProfileSection({
  first_name,
  set_first_name,
  last_name,
  set_last_name,
  avatar_url,
  set_avatar_url,
  date_of_birth,
  set_date_of_birth,
  gender,
  set_gender,
  phone_number,
  set_phone_number,
  university_name,
  set_university_name,
  program,
  set_program,
  year_of_study,
  set_year_of_study,
  nationality,
  set_nationality,
  urgency,
  set_urgency,
  // Verification
  verification_status,
  admin_note,
  is_onboarded,
  is_blocked,
  is_blocked_reason,
}) {
  const options = useMemo(() => countryList()?.getData(), [])
  const is_approved = verification_status === 'approved'

  const uploadProfilePicture = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const previewUrl = URL.createObjectURL(file)
    set_avatar_url({ file, previewUrl })
  }

  const handle_nationality = (selectedOption) => {
    if (!selectedOption) return;
    set_nationality(selectedOption.value);
  }

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Basic Profile Information
        </h2>
      </div>

      {/* ── Avatar + verified badge row ─────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-5">
        {/* Avatar with camera overlay */}
        <label htmlFor="uploadPfp" className="relative w-24 h-24 rounded-full cursor-pointer group flex-shrink-0">
          {/* Base circle */}
          <div className="w-24 h-24 rounded-full border-2 border-accent bg-base-300 overflow-hidden flex items-center justify-center">
            {avatar_url ? (
              <Image
                className="rounded-full object-cover"
                alt="Your profile image"
                fill
                src={typeof avatar_url === 'string' ? avatar_url : avatar_url?.previewUrl}
              />
            ) : (
              <User size={36} className="text-base-content/30" />
            )}
          </div>
          {/* Camera overlay on hover */}
          <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Camera size={22} className="text-white" />
          </div>
        </label>
        <input accept="image/*" onChange={uploadProfilePicture} type="file" className="hidden" id="uploadPfp" />

        {/* Inline blocked / verified badge */}
        {is_onboarded && is_blocked && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error/10 border border-error/25 text-error font-secondary text-xs font-semibold">
            <Ban size={13} />
            Blocked
          </span>
        )}
        {is_onboarded && !is_blocked && verification_status === 'approved' && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/25 text-success font-secondary text-xs font-semibold">
            <CheckCircle2 size={13} />
            Verified
          </span>
        )}
      </div>

      {/* ── Verification status banner ─────────────────────────────────────── */}
      {is_onboarded && (is_blocked || verification_status !== 'approved') && (
        <VerificationStatusBanner verification_status={verification_status} admin_note={admin_note} is_blocked={is_blocked} is_blocked_reason={is_blocked_reason} />
      )}

      {/* Form grid — 2 cols on md+, single col on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* First Name */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1 text-[11px] font-secondary font-semibold uppercase tracking-wide text-base-content/50">
            First Name
            {is_approved && (
              <span className="tooltip tooltip-left" data-tip="Locked — contact support to change">
                <Lock size={10} className="text-success cursor-help" />
              </span>
            )}
          </label>
          <input
            type="text"
            value={first_name || ""}
            onChange={(e) => set_first_name(e.target.value)}
            placeholder="John"
            disabled={is_approved}
            className="input input-bordered rounded-field font-secondary text-sm w-full disabled:opacity-60 disabled:cursor-not-allowed"
            required
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1 text-[11px] font-secondary font-semibold uppercase tracking-wide text-base-content/50">
            Last Name
            {is_approved && (
              <span className="tooltip tooltip-left" data-tip="Locked — contact support to change">
                <Lock size={10} className="text-success cursor-help" />
              </span>
            )}
          </label>
          <input
            type="text"
            value={last_name || ""}
            onChange={(e) => set_last_name(e.target.value)}
            placeholder="Doe"
            disabled={is_approved}
            className="input input-bordered rounded-field font-secondary text-sm w-full disabled:opacity-60 disabled:cursor-not-allowed"
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-secondary font-semibold uppercase tracking-wide text-base-content/50">
            Date of Birth
          </label>
          <input
            type="date"
            value={date_of_birth ? date_of_birth.split('T')[0] : ''}
            onChange={(e) => set_date_of_birth(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="input input-bordered rounded-field font-secondary text-sm w-full"
            required
            disabled={is_approved}
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1 text-[11px] font-secondary font-semibold uppercase tracking-wide text-base-content/50">
            Gender
            {is_approved && (
              <span className="tooltip tooltip-left" data-tip="Locked — contact support to change">
                <Lock size={10} className="text-success cursor-help" />
              </span>
            )}
          </label>
          <select
            value={gender || ""}
            onChange={(e) => set_gender(e.target.value)}
            disabled={is_approved}
            className="select select-bordered rounded-field font-secondary text-sm w-full disabled:opacity-60 disabled:cursor-not-allowed"
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Phone Number — full width */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-[11px] font-secondary font-semibold uppercase tracking-wide text-base-content/50">
            Phone Number
          </label>
          <PhoneInputWithCountrySelect
            required
            placeholder="Enter phone number (+250 123 456 789)"
            value={phone_number || ""}
            onChange={set_phone_number}
            className="input w-full"
            defaultCountry="RW"
          />
        </div>

        {/* University */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-secondary font-semibold uppercase tracking-wide text-base-content/50">
            University
          </label>
          <Select
            className="w-full"
            required
            options={UNIVERSITIES}
            value={
              university_name
                ? (UNIVERSITIES.find(u => u.value === university_name) || { value: university_name, label: university_name })
                : null
            }
            onChange={(selected) => set_university_name(selected ? selected.value : '')}
            placeholder="Search university..."
            isClearable
          />
        </div>

        {/* Year of Study */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-secondary font-semibold uppercase tracking-wide text-base-content/50">
            Year of Study
          </label>
          <select
            value={year_of_study || ""}
            onChange={(e) => set_year_of_study(e.target.value)}
            className="select select-bordered rounded-field font-secondary text-sm w-full"
            required
          >
            <option value="">Select year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="5">5th Year</option>
            <option value="Graduate">Graduate</option>
          </select>
        </div>

        {/* Program — full width */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-[11px] font-secondary font-semibold uppercase tracking-wide text-base-content/50">
            Program
          </label>
          <input
            type="text"
            value={program || ""}
            onChange={(e) => set_program(e.target.value)}
            placeholder="B.A. in Information Technology"
            className="input input-bordered rounded-field font-secondary text-sm w-full"
            required
          />
        </div>

        {/* Country of Origin — full width */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="flex items-center gap-1 text-[11px] font-secondary font-semibold uppercase tracking-wide text-base-content/50">
            Country Of Origin
            {is_approved && (
              <span className="tooltip tooltip-left" data-tip="Locked — contact support to change">
                <Lock size={10} className="text-success cursor-help" />
              </span>
            )}
          </label>
          <Select
            className="w-full"
            required
            options={options}
            value={options?.find(obj => obj.value === nationality) || ""}
            onChange={handle_nationality}
            isDisabled={is_approved}
          />
        </div>

      </div>

      {/* ── Urgency ───────────────────────────────────────────────────────── */}
      <div className="mt-6 pt-6 border-t border-base-200">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={15} className="text-accent" />
          <span className="font-secondary text-xs font-semibold uppercase tracking-wide text-base-content">
            How urgently are you looking?
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {URGENCY_OPTIONS.map((option) => {
            const isActive = urgency === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => set_urgency(option.value)}
                className={`
                  flex items-start gap-3 p-3 rounded-field border-2 text-left transition-all duration-150
                  ${isActive ? option.activeBg : `bg-base-100 border-base-300 hover:${option.bg}`}
                `}
              >
                <span className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${isActive ? 'bg-current opacity-80' : option.dot}`} />
                <div>
                  <p className={`font-primary text-xs font-extrabold uppercase tracking-wide leading-tight ${isActive ? '' : option.color}`}>
                    {option.label}
                  </p>
                  <p className={`font-secondary text-xs mt-0.5 ${isActive ? 'opacity-80' : 'text-base-content/50'}`}>
                    {option.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}