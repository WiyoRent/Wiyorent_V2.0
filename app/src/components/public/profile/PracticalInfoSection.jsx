'use client';
import Image from 'next/image';
import { ShieldCheck, FileText, RefreshCw, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useCloudinaryUpload from '@/hooks/useCloudinaryUpload';

export default function PracticalInfoSection({ 
  preferred_method, 
  set_preferred_method, 
  is_profile_public, 
  set_is_profile_public,
  admission_letter,
  set_admission_letter,
  passport_id,
  set_passport_id,
  verification_status,
}) {
  const is_rejected = verification_status === 'rejected';

  // Per-document replace toggles — only relevant when is_rejected and doc is an existing URL
  const [replace_admission, set_replace_admission] = useState(false);
  const [replace_passport,  set_replace_passport]  = useState(false);

  const { upload, uploading } = useCloudinaryUpload();
  const [uploading_admission, set_uploading_admission] = useState(false);
  const [uploading_passport, set_uploading_passport] = useState(false);

  const handle_admission_change = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    set_uploading_admission(true);
    const secure_url = await upload(file, 'wiyorent/users/{userId}/documents');
    set_uploading_admission(false);
    if (secure_url) {
      set_admission_letter(secure_url);
      set_replace_admission(false);
    } else {
      toast.error('Failed to upload admission letter. Please try again.');
    }
    e.target.value = '';
  }

  const handle_passport_change = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    set_uploading_passport(true);
    const secure_url = await upload(file, 'wiyorent/users/{userId}/documents');
    set_uploading_passport(false);
    if (secure_url) {
      set_passport_id(secure_url);
      set_replace_passport(false);
    } else {
      toast.error('Failed to upload passport/ID. Please try again.');
    }
    e.target.value = '';
  }

  const show_admission_upload = typeof admission_letter !== 'string' || (is_rejected && replace_admission);
  const show_passport_upload  = typeof passport_id     !== 'string' || (is_rejected && replace_passport);

  return (
    <div className="bg-base-100 rounded-box p-6 shadow-sm border border-base-200">
      <h2 className="font-primary text-xl font-extrabold uppercase tracking-tight mb-6 flex items-center gap-2">
        <ShieldCheck className="text-accent" size={24} />
        Verification & Privacy
      </h2>

      {is_rejected && (
        <div className="mb-6 flex items-start gap-2 bg-error/10 border border-error/20 rounded-field px-4 py-3">
          <ShieldCheck size={14} className="text-error mt-0.5 flex-shrink-0" />
          <p className="font-secondary text-xs text-error/80">
            Your verification was not approved. Please review your profile details, make any necessary updates, and resubmit for review.
          </p>
        </div>
      )}

      <div className="space-y-8">
        {/* Document Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Admission Letter */}
          <div className="form-control w-full">
            <div className="flex items-center justify-between py-0 mb-2">
              <span className="label-text font-primary font-bold uppercase text-xs tracking-widest text-base-content/60">
                Admission Letter
              </span>
              {is_rejected && typeof admission_letter === 'string' && (
                <button
                  type="button"
                  onClick={() => {
                    set_replace_admission((v) => !v);
                    if (replace_admission) set_admission_letter(admission_letter); // revert to existing URL if cancelling
                  }}
                  className="btn btn-ghost btn-xs gap-1 font-primary font-bold uppercase tracking-wide text-error"
                >
                  <RefreshCw size={11} />
                  {replace_admission ? 'Cancel' : 'Replace'}
                </button>
              )}
            </div>

            {show_admission_upload ? (
              <>
                {uploading_admission ? (
                  <div className="flex items-center gap-2 h-12 px-4 bg-base-200 rounded-field border border-base-300">
                    <Loader2 size={16} className="text-accent animate-spin" />
                    <span className="font-secondary text-sm text-base-content/50">Uploading...</span>
                  </div>
                ) : (
                  <input
                    type="file"
                    accept=".png, .jpg"
                    onChange={handle_admission_change}
                    className="file-input file-input-bordered file-input-accent w-full rounded-field font-secondary text-sm"
                  />
                )}
                <p className="mt-2 font-secondary text-[10px] text-base-content/35 italic">
                  {is_rejected
                    ? 'Upload a new copy of your admission letter.'
                    : 'Required to verify your student status at your university.'}{' '}
                  <span className="not-italic text-base-content/30">· Compressed automatically</span>
                </p>
              </>
            ) : (
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
            )}
          </div>

          {/* Passport / ID */}
          <div className="form-control w-full">
            <div className="flex items-center justify-between py-0 mb-2">
              <span className="label-text font-primary font-bold uppercase text-xs tracking-widest text-base-content/60">
                Passport or National ID
              </span>
              {is_rejected && typeof passport_id === 'string' && (
                <button
                  type="button"
                  onClick={() => {
                    set_replace_passport((v) => !v);
                    if (replace_passport) set_passport_id(passport_id); // revert to existing URL if cancelling
                  }}
                  className="btn btn-ghost btn-xs gap-1 font-primary font-bold uppercase tracking-wide text-error"
                >
                  <RefreshCw size={11} />
                  {replace_passport ? 'Cancel' : 'Replace'}
                </button>
              )}
            </div>

            {show_passport_upload ? (
              <>
                {uploading_passport ? (
                  <div className="flex items-center gap-2 h-12 px-4 bg-base-200 rounded-field border border-base-300">
                    <Loader2 size={16} className="text-accent animate-spin" />
                    <span className="font-secondary text-sm text-base-content/50">Uploading...</span>
                  </div>
                ) : (
                  <input
                    type="file"
                    accept=".png, .jpg"
                    onChange={handle_passport_change}
                    className="file-input file-input-bordered file-input-accent w-full rounded-field font-secondary text-sm"
                  />
                )}
                <p className="mt-2 font-secondary text-[10px] text-base-content/35 italic">
                  {is_rejected
                    ? 'Upload a new copy of your passport or ID.'
                    : 'Clear photo of your identity document for legal compliance.'}{' '}
                  <span className="not-italic text-base-content/30">· Compressed automatically</span>
                </p>
              </>
            ) : (
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
              className="select select-bordered rounded-field font-secondary text-sm w-full"
              value={preferred_method}
              onChange={(e) => set_preferred_method(e.target.value)}
            >
              <option value={null} disabled>Select how people contact you</option>
              <option value='email'>Email</option>
              <option value='phone'>Whatsapp</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}