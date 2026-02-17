import {
  Wifi,
  UtensilsCrossed,
  Microwave,
  BlendingJar,
  ShieldCheck,
  Car,
  Droplets,
  Tv,
  Wind,
  Zap,
  Home,
  Flame,
  Dumbbell,
  WashingMachine,
} from 'lucide-react';

// Full amenity registry — add new entries here as backend grows
const amenity_registry = {
  wifi:        { icon: Wifi,            label: 'Wi-Fi' },
  stove:       { icon: UtensilsCrossed, label: 'Kitchen' },
  microwave:   { icon: Microwave,       label: 'Microwave' },
  security:    { icon: ShieldCheck,     label: 'Security' },
  parking:     { icon: Car,             label: 'Parking' },
  water_tank:  { icon: Droplets,        label: 'Water Tank' },
  tv:          { icon: Tv,              label: 'TV' },
  ac:          { icon: Wind,            label: 'A/C' },
  generator:   { icon: Zap,             label: 'Generator' },
  furnished:   { icon: Home,            label: 'Furnished' },
  gas:         { icon: Flame,           label: 'Gas' },
  gym:         { icon: Dumbbell,        label: 'Gym' },
  laundry:     { icon: WashingMachine,  label: 'Laundry' },
};

function AmenityTile({ amenity_key }) {
  const entry = amenity_registry[amenity_key] ?? {
    icon: Home,
    label: amenity_key.replace(/_/g, ' '),
  };
  const IconComponent = entry.icon;

  return (
    <div className="flex flex-col items-center gap-2 group">
      <div className="w-12 h-12 rounded-field bg-base-200 group-hover:bg-accent/10 flex items-center justify-center transition-colors duration-200">
        <IconComponent size={20} className="text-base-content/60 group-hover:text-accent transition-colors duration-200" />
      </div>
      <span className="font-secondary text-xs text-base-content/50 text-center leading-tight capitalize">
        {entry.label}
      </span>
    </div>
  );
}

export default function AmenitiesSection({ amenities }) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <section className="bg-base-100 rounded-box p-6 shadow-sm">
      <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest mb-5 flex items-center gap-3">
        <span className="w-1 h-5 bg-accent rounded-full inline-block" />
        Amenities
      </h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-4">
        {amenities.map((amenity) => (
          <AmenityTile key={amenity} amenity_key={amenity} />
        ))}
      </div>
    </section>
  );
}