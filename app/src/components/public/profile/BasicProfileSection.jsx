"use client"

import { User, Upload, Zap } from 'lucide-react';
import Image from 'next/image';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { useMemo } from 'react';

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
    description: 'Looking within a few months',
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
];

export default function BasicProfileSection({
  full_name,
  set_full_name,
  avatar_url,
  set_avatar_url,
  age,
  set_age,
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
  // New
  urgency,
  set_urgency,
}) {

  const options = useMemo(() => countryList()?.getData(), [])

  const uploadProfilePicture = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const previewUrl = URL.createObjectURL(file)
    set_avatar_url({ file, previewUrl })
  }

  const displayProfilepic = (avatar) => {
    if (!avatar) {
      return <User size={16} className="text-accent-content" />
    } else if (typeof avatar == 'string') {
      return (
        <div className='object-contain border-2 border-accent relative w-20 h-20 rounded-full'>
          <Image className='rounded-full object-cover' alt='Your profile image' fill src={avatar || null} />
        </div>
      )
    } else {
      return (
        <div className='object-contain border-2 border-accent relative w-20 h-20 rounded-full'>
          <Image className='rounded-full' alt='Your profile image' fill src={avatar.previewUrl || null} />
        </div>
      )
    }
  }

  const handle_nationality = (selectedOption) => {
    if (!selectedOption) return;
    set_nationality(selectedOption.value);
  }

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Basic Profile Information
        </h2>
      </div>

      {/* Avatar upload */}
      <div className="mb-6 flex items-center gap-4">
        {displayProfilepic(avatar_url)}
        <label
          htmlFor='uploadPfp'
          className="btn btn-sm btn-outline rounded-field font-secondary text-xs gap-2 border-base-content/20 hover:border-accent"
        >
          <Upload size={14} />
          Upload Photo
        </label>
        <input accept='image/*' onChange={uploadProfilePicture} type="file" className='hidden' id="uploadPfp" />
      </div>

      {/* Form grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Full Name</span>
          </label>
          <br />
          <input
            type="text"
            value={full_name || ""}
            onChange={(e) => set_full_name(e.target.value)}
            placeholder="John Doe"
            className="input input-bordered rounded-field font-secondary text-sm"
            required
          />
        </div>

        {/* Age */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Age</span>
          </label>
          <br />
          <input
            type="number"
            value={age || ""}
            onChange={(e) => set_age(Number(e.target.value))}
            placeholder="21"
            min="18"
            max="50"
            className="input input-bordered rounded-field font-secondary text-sm"
            required
          />
        </div>

        {/* Gender */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Gender</span>
          </label>
          <br />
          <select
            value={gender || ""}
            onChange={(e) => set_gender(e.target.value)}
            className="select select-bordered rounded-field font-secondary text-sm"
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Phone Number */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Phone Number</span>
          </label>
          <br />
          <PhoneInputWithCountrySelect
            required
            placeholder="Enter phone number (+250 123 456 789)"
            value={phone_number || ""}
            onChange={set_phone_number}
            className='input'
            defaultCountry='RW'
          />
        </div>

        {/* University */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">University</span>
          </label>
          <br />
          <input
            type="text"
            value={university_name || ""}
            onChange={(e) => set_university_name(e.target.value)}
            placeholder="University of Rwanda"
            className="input input-bordered rounded-field font-secondary text-sm"
            required
          />
        </div>

        {/* Program */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Program</span>
          </label>
          <br />
          <input
            type="text"
            value={program || ""}
            onChange={(e) => set_program(e.target.value)}
            placeholder="B.A. in Information Technology"
            className="input input-bordered rounded-field font-secondary text-sm"
            required
          />
        </div>

        {/* Year of Study */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Year of Study</span>
          </label>
          <br />
          <select
            value={year_of_study || ""}
            onChange={(e) => set_year_of_study(e.target.value)}
            className="select select-bordered rounded-field font-secondary text-sm"
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

        {/* Nationality */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">Country Of Origin</span>
          </label>
          <br />
          <Select
            className='w-1/2'
            required
            options={options}
            value={options.find(obj => obj.value === nationality) || ""}
            onChange={handle_nationality}
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
                {/* Dot indicator */}
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