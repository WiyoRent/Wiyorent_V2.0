import {
  CalendarDays,
  Wallet,
  Home,
  Users,
  MapPin,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const format_rwf = (n) => `RWF ${new Intl.NumberFormat('rw-RW').format(n)}`;

function PrefRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-base-200 last:border-0">
      <div className="w-8 h-8 bg-base-200 rounded-field flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={15} className="text-accent" />
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <span className="font-secondary text-xs text-base-content/40 uppercase tracking-wide leading-none">
          {label}
        </span>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  );
}

function BooleanBadge({ value, true_label, false_label }) {
  return value ? (
    <span className="inline-flex items-center gap-1.5 text-success font-secondary text-sm font-semibold">
      <CheckCircle size={15} className="text-success" />
      {true_label}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-error font-secondary text-sm font-semibold">
      <XCircle size={15} className="text-error" />
      {false_label}
    </span>
  );
}

export default function HousingPreferencesSection({ preferences }) {
  const {
    move_in_date,
    budget,
    room_types,
    max_housemates,
    preferred_locations,
    is_furnished_preferred,
    allows_pets,
    is_smoker,
  } = preferences;

  const formatted_date = new Date(move_in_date).toLocaleDateString('en-RW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="bg-base-100 rounded-box p-5 shadow-sm">
      <h2 className="font-primary text-sm font-extrabold text-base-content uppercase tracking-widest mb-4 flex items-center gap-3">
        <span className="w-1 h-5 bg-accent rounded-full inline-block" />
        Housing Preferences
      </h2>

      <div>
        {/* Move-in date */}
        <PrefRow icon={CalendarDays} label="Move-in Date">
          <span className="font-secondary text-sm font-semibold text-base-content">
            {formatted_date}
          </span>
        </PrefRow>

        {/* Budget */}
        <PrefRow icon={Wallet} label="Budget Range">
          <span className="font-secondary text-sm font-semibold text-base-content">
            {format_rwf(budget.min)} – {format_rwf(budget.max)} / month
          </span>
        </PrefRow>

        {/* Room types */}
        <PrefRow icon={Home} label="Room Types">
          <div className="flex flex-wrap gap-1.5">
            {room_types.map((type) => (
              <span
                key={type}
                className="bg-base-200 text-base-content/65 font-secondary text-xs px-2.5 py-1 rounded-field"
              >
                {type}
              </span>
            ))}
          </div>
        </PrefRow>

        {/* Max housemates */}
        <PrefRow icon={Users} label="Max Housemates">
          <span className="font-secondary text-sm font-semibold text-base-content">
            Up to {max_housemates} people
          </span>
        </PrefRow>

        {/* Preferred locations */}
        <PrefRow icon={MapPin} label="Preferred Locations">
          <div className="flex flex-wrap gap-1.5">
            {preferred_locations.map((loc) => (
              <span
                key={loc}
                className="bg-accent text-accent-content font-primary text-xs font-bold px-2.5 py-0.5 rounded-field uppercase tracking-wide"
              >
                {loc}
              </span>
            ))}
          </div>
        </PrefRow>

        {/* Furnished */}
        <PrefRow icon={Home} label="Furnishing">
          <BooleanBadge
            value={is_furnished_preferred}
            true_label="Prefers Furnished"
            false_label="Unfurnished OK"
          />
        </PrefRow>

        {/* Pets */}
        <PrefRow icon={CheckCircle} label="Pets">
          <BooleanBadge
            value={allows_pets}
            true_label="Pet Friendly"
            false_label="No Pets"
          />
        </PrefRow>

        {/* Smoking */}
        <PrefRow icon={XCircle} label="Smoking">
          <BooleanBadge
            value={!is_smoker}
            true_label="Non-Smoker"
            false_label="Smoker"
          />
        </PrefRow>
      </div>
    </section>
  );
}