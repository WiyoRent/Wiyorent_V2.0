import { Info, ShieldCheck, Eye, EyeOff, Globe } from 'lucide-react';

const available_languages = [
  'English',
  'Kinyarwanda',
  'French',
  'Swahili',
  'Spanish',
  'Mandarin',
  'Arabic',
];

export default function PracticalInfoSection({
  preferred_method,
  set_preferred_method,
  languages,
  set_languages,
  is_profile_public,
  set_is_profile_public,
  is_verified,
}) {
  const toggle_language = (lang) => {
    if (languages.includes(lang)) {
      set_languages(languages.filter((l) => l !== lang));
    } else {
      set_languages([...languages, lang]);
    }
  };

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <Info size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Practical Information
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        {/* Contact Method Preference */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Contact Method Preference
            </span>
          </label>
          <br />
          <select
            value={preferred_method}
            onChange={(e) => set_preferred_method(e.target.value)}
            className="select select-bordered rounded-field font-secondary text-sm"
          >
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="In-App">In-App Messaging</option>
          </select>
          <br />
          <label className="label">
            <span className="label-text-alt font-secondary text-xs text-base-content/40">
              How would you like potential housemates to reach you?
            </span>
          </label>
        </div>

        {/* Languages Spoken */}
        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <Globe size={12} className="text-accent" />
              Languages Spoken
            </span>
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {available_languages.map((lang) => {
              const is_selected = languages.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggle_language(lang)}
                  className={`px-3 py-1.5 rounded-field font-primary text-xs font-bold uppercase tracking-wide border transition-all duration-150 ${
                    is_selected
                      ? 'bg-accent text-accent-content border-accent shadow-sm'
                      : 'bg-base-200 text-base-content/50 border-transparent hover:border-accent/40'
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Visibility Toggle */}
        <div className="border-t border-base-200 pt-5">
          <div className="flex items-center justify-between bg-base-200 rounded-field px-4 py-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {is_profile_public ? (
                  <Eye size={16} className="text-accent" />
                ) : (
                  <EyeOff size={16} className="text-base-content/40" />
                )}
                <span className="font-secondary text-sm font-semibold text-base-content">
                  List my profile publicly
                </span>
              </div>
              <span className="font-secondary text-xs text-base-content/45 leading-snug">
                {is_profile_public
                  ? 'Your profile is visible on the "Find Your Future Housemate" page'
                  : "Your profile is private and won't appear in search results"}
              </span>
            </div>
            <input
              type="checkbox"
              checked={is_profile_public}
              onChange={(e) => set_is_profile_public(e.target.checked)}
              className="toggle toggle-accent toggle-lg"
            />
          </div>
        </div>

        {/* Verification Status */}
        <div className="border-t border-base-200 pt-5">
          <label className="label mb-2">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Verification Status
            </span>
          </label>
          {is_verified ? (
            <div className="flex items-center gap-2 bg-success/10 border border-success/25 rounded-field px-4 py-3">
              <ShieldCheck size={18} className="text-success flex-shrink-0" />
              <div className="flex flex-col">
                <span className="font-primary text-sm font-bold text-success uppercase tracking-wide">
                  Verified
                </span>
                <span className="font-secondary text-xs text-success/70">
                  Your identity has been verified by WiyoRent
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-warning/10 border border-warning/25 rounded-field px-4 py-3">
              <Info size={18} className="text-warning flex-shrink-0" />
              <div className="flex flex-col">
                <span className="font-primary text-sm font-bold text-warning uppercase tracking-wide">
                  Not Verified
                </span>
                <span className="font-secondary text-xs text-warning/70">
                  Complete verification to increase trust with potential housemates
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}