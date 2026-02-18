'use client';

import { FileText, ShieldCheck, Upload } from 'lucide-react';

export default function PracticalInfoSection({ 
  preferred_method, 
  set_preferred_method, 
  languages, 
  set_languages, 
  is_profile_public, 
  set_is_profile_public,
  is_verified,
  admission_letter,
  set_admission_letter,
  passport_id,
  set_passport_id
}) {
  return (
    <div className="bg-base-100 rounded-box p-6 shadow-sm border border-base-200">
      <h2 className="font-primary text-xl font-extrabold uppercase tracking-tight mb-6 flex items-center gap-2">
        <ShieldCheck className="text-accent" size={24} />
        Verification & Privacy
      </h2>

      <div className="space-y-8">
        {/* Document Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admission Letter */}
          <div className="form-control w-full">
            <label className="label py-0 mb-2">
              <span className="label-text font-primary font-bold uppercase text-xs tracking-widest text-base-content/60">
                Admission Letter (PDF)
              </span>
            </label>
            <div className="relative">
              <input 
                type="file" 
                accept=".pdf"
                onChange={(e) => set_admission_letter(e.target.files[0])}
                className="file-input file-input-bordered file-input-accent w-full rounded-field font-secondary text-sm" 
              />
            </div>
            <p className="mt-2 text-[10px] font-secondary text-base-content/40 italic">
              Required to verify your student status at your university.
            </p>
          </div>

          {/* Passport / ID */}
          <div className="form-control w-full">
            <label className="label py-0 mb-2">
              <span className="label-text font-primary font-bold uppercase text-xs tracking-widest text-base-content/60">
                Passport or National ID (JPG/PNG)
              </span>
            </label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => set_passport_id(e.target.files[0])}
              className="file-input file-input-bordered file-input-accent w-full rounded-field font-secondary text-sm" 
            />
            <p className="mt-2 text-[10px] font-secondary text-base-content/40 italic">
              Clear photo of your identity document for legal compliance.
            </p>
          </div>
        </div>

        <div className="divider opacity-50"></div>

        {/* Visibility & Contact Method */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="flex items-center justify-between p-4 bg-base-200/50 rounded-xl">
            <div>
              <p className="font-primary font-bold uppercase text-xs tracking-widest">Public Visibility</p>
              <p className="font-secondary text-xs text-base-content/50">Allow others to find your profile</p>
            </div>
            <input 
              type="checkbox" 
              className="toggle toggle-accent" 
              checked={is_profile_public} 
              onChange={(e) => set_is_profile_public(e.target.checked)}
            />
          </div>

          <div className="form-control">
            <label className="label py-0 mb-2">
              <span className="label-text font-primary font-bold uppercase text-xs tracking-widest text-base-content/60">
                Preferred Contact Method
              </span>
            </label>
            <select 
              className="select select-bordered rounded-field font-secondary text-sm"
              value={preferred_method}
              onChange={(e) => set_preferred_method(e.target.value)}
            >
              <option>Email</option>
              <option>Phone</option>
              <option>WhatsApp</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}