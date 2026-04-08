import { Eye, Heart, Clock, ShieldCheck, EyeOff, Building2, Info } from 'lucide-react';

export default function StatusAnalyticsBar({ is_active, set_is_active, analytics, is_verified, is_a_wiyorent_house, set_is_a_wiyorent_house }) {
  return (
    <div className="bg-base-100 rounded-box shadow-sm p-5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Analytics */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Eye size={18} className="text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-primary text-xl font-extrabold text-base-content">
                {analytics?.number_of_views?.toLocaleString()}
              </span>
              <span className="font-secondary text-xs text-base-content/40 uppercase tracking-wide">
                Views
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
              <Heart size={18} className="text-error" />
            </div>
            <div className="flex flex-col">
              <span className="font-primary text-xl font-extrabold text-base-content">
                {analytics?.number_of_saves?.toLocaleString()}
              </span>
              <span className="font-secondary text-xs text-base-content/40 uppercase tracking-wide">
                Saves
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
              <Clock size={18} className="text-warning" />
            </div>
            <div className="flex flex-col">
              <span className="font-primary text-xl font-extrabold text-base-content">
                {analytics?.number_of_waitlists?.toLocaleString()}
              </span>
              <span className="font-secondary text-xs text-base-content/40 uppercase tracking-wide">
                Waitlist
              </span>
            </div>
          </div>

          {is_verified && (
            <div className="flex items-center gap-2 bg-success/10 border border-success/25 rounded-field px-3 py-2">
              <ShieldCheck size={16} className="text-success" />
              <span className="font-primary text-xs font-bold text-success uppercase tracking-wide">
                Verified
              </span>
            </div>
          )}
        </div>

        {/* WiyoRent House Toggle */}
        <div className="flex items-center justify-between bg-base-200 rounded-field px-4 py-3 w-full md:w-auto md:min-w-50 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-secondary text-sm font-semibold text-base-content">
              {is_a_wiyorent_house ? 'WiyoRent House' : 'Standard Listing'}
            </span>
            <div className="tooltip tooltip-bottom" data-tip="When enabled, tenants will see the service fee as waived on this listing.">
              <Info size={13} className="text-base-content/30 hover:text-base-content/60 transition-colors cursor-default" />
            </div>
          </div>
          <input
            type="checkbox"
            checked={is_a_wiyorent_house}
            onChange={(e) => set_is_a_wiyorent_house(e.target.checked)}
            className="toggle toggle-accent"
          />
        </div>

        {/* Visibility Toggle */}
        <div className="flex items-center justify-between bg-base-200 rounded-field px-4 py-3 w-full md:w-auto md:min-w-50">
          <div className="flex items-center gap-2">
            {is_active ? (
              <Eye size={16} className="text-success" />
            ) : (
              <EyeOff size={16} className="text-base-content/40" />
            )}
            <span className="font-secondary text-sm font-semibold text-base-content">
              {is_active ? 'Listing Active' : 'Listing Hidden'}
            </span>
          </div>
          <input
            type="checkbox"
            checked={is_active}
            onChange={(e) => set_is_active(e.target.checked)}
            className="toggle toggle-success"
          />
        </div>
      </div>
    </div>
  );
}