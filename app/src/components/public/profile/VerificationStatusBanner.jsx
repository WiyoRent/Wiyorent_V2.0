import { Clock, CheckCircle2, XCircle, ShieldCheck, Ban } from 'lucide-react';

const VERIFICATION_CONFIG = {
  blocked: {
    icon: Ban,
    label: 'Account Blocked',
    description: 'Your account has been suspended by the WiyoRent team. You cannot access housemate features while your account is suspended.',
    containerClass: 'bg-error/10 border-error/30',
    iconClass: 'text-error',
    labelClass: 'text-error',
    dotClass: 'bg-error',
  },
  pending: {
    icon: Clock,
    label: 'Verification Pending',
    description: 'Our team is currently reviewing your profile. This usually takes 24 hours.',
    containerClass: 'bg-warning/10 border-warning/30',
    iconClass: 'text-warning',
    labelClass: 'text-warning',
    dotClass: 'bg-warning animate-pulse',
  },
  approved: {
    icon: CheckCircle2,
    label: 'Profile Verified',
    description: 'Your profile has been verified. You now have full access to the platform.',
    containerClass: 'bg-success/10 border-success/30',
    iconClass: 'text-success',
    labelClass: 'text-success',
    dotClass: 'bg-success',
  },
  rejected: {
    icon: XCircle,
    label: 'Verification Rejected',
    description: 'Your profile could not be verified. Please review the note below and update your information.',
    containerClass: 'bg-error/10 border-error/30',
    iconClass: 'text-error',
    labelClass: 'text-error',
    dotClass: 'bg-error',
  },
};

export default function VerificationStatusBanner({ verification_status, admin_note, is_blocked, is_blocked_reason }) {
  const effective_status = is_blocked ? 'blocked' : verification_status;
  if (!effective_status) return null;

  const config = VERIFICATION_CONFIG[effective_status];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className={`mb-6 rounded-field border-2 p-4 ${config.containerClass}`}>
      <div className="flex items-start gap-3">
        {/* Icon + pulsing dot */}
        <div className="relative flex-shrink-0 mt-0.5">
          <Icon size={18} className={config.iconClass} />
          <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${config.dotClass}`} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Status header row */}
          <div className="flex items-center gap-2 flex-wrap">
            <ShieldCheck size={12} className="text-base-content/40" />
            <span className="font-secondary text-xs font-semibold uppercase tracking-widest text-base-content/50">
              Account Status
            </span>
          </div>

          <p className={`font-primary text-sm font-extrabold uppercase tracking-wide mt-0.5 ${config.labelClass}`}>
            {config.label}
          </p>
          <p className="font-secondary text-xs text-base-content/60 mt-1 leading-relaxed">
            {config.description}
          </p>

          {/* Admin note — shown on rejection */}
          {effective_status === 'rejected' && admin_note && (
            <div className="mt-3 pt-3 border-t border-error/20">
              <p className="font-secondary text-xs font-semibold uppercase tracking-wide text-error/70 mb-1">
                Note from WiyoRent Team
              </p>
              <p className="font-secondary text-xs text-base-content/70 leading-relaxed italic">
                "{admin_note}"
              </p>
            </div>
          )}
          {/* Block reason — shown when blocked */}
          {effective_status === 'blocked' && is_blocked_reason && (
            <div className="mt-3 pt-3 border-t border-error/20">
              <p className="font-secondary text-xs font-semibold uppercase tracking-wide text-error/70 mb-1">
                Note from WiyoRent Team
              </p>
              <p className="font-secondary text-xs text-base-content/70 leading-relaxed italic">
                "{is_blocked_reason}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
