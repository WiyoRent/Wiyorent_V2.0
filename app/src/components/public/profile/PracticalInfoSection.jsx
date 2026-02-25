'use client';

import Image from 'next/image';
import { ShieldCheck, FileText } from 'lucide-react';

export default function PracticalInfoSection({ 
  preferred_method, 
  set_preferred_method, 
  is_profile_public, 
  set_is_profile_public,
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
                Admission Letter
              </span>
            </label>
            {typeof admission_letter === 'string' ? (
              <div className="relative rounded-field overflow-hidden border border-base-300 group h-40">
                <Image 
                  src={admission_letter} 
                  alt="Admission Letter" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a 
                    href={admission_letter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-xs btn-accent"
                  >
                    <FileText size={12} /> View
                  </a>
                </div>
                <div className="absolute top-2 right-2 badge badge-success badge-sm font-secondary">Uploaded</div>
              </div>
            ) : (
              <>
                <input 
                  type="file" 
                  accept=".png, .jpg"
                  onChange={(e) => set_admission_letter(e.target.files[0])}
                  className="file-input file-input-bordered file-input-accent w-full rounded-field font-secondary text-sm" 
                />
                <p className="mt-2 text-[10px] font-secondary text-base-content/40 italic">
                  Required to verify your student status at your university.
                </p>
              </>
            )}
          </div>

          {/* Passport / ID */}
          <div className="form-control w-full">
            <label className="label py-0 mb-2">
              <span className="label-text font-primary font-bold uppercase text-xs tracking-widest text-base-content/60">
                Passport or National ID
              </span>
            </label>
            {typeof passport_id === 'string' ? (
              <div className="relative rounded-field overflow-hidden border border-base-300 group h-40">
                <Image 
                  src={passport_id} 
                  alt="Passport / ID" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a 
                    href={passport_id} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-xs btn-accent"
                  >
                    <FileText size={12} /> View
                  </a>
                </div>
                <div className="absolute top-2 right-2 badge badge-success badge-sm font-secondary">Uploaded</div>
              </div>
            ) : (
              <>
                <input 
                  type="file" 
                  accept=".png, .jpg"
                  onChange={(e) => set_passport_id(e.target.files[0])}
                  className="file-input file-input-bordered file-input-accent w-full rounded-field font-secondary text-sm" 
                />
                <p className="mt-2 text-[10px] font-secondary text-base-content/40 italic">
                  Clear photo of your identity document for legal compliance.
                </p>
              </>
            )}
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
              <option>Whatsapp</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}