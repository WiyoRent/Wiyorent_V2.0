import { Wifi, UtensilsCrossed, Microwave, Home } from 'lucide-react';

const amenity_icon_map = {
  wifi: Wifi,
  stove: UtensilsCrossed,
  microwave: Microwave,
  // blender was removed
};

const amenity_fallback_icon = Home;

export default function AmenityBadge({ amenity }) {
  const iconKey = amenity.toLowerCase();
  const IconComponent = amenity_icon_map[iconKey] || amenity_fallback_icon;

  return (
    <div
      className="w-8 h-8 rounded-field bg-base-300 flex items-center justify-center flex-shrink-0"
      title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
    >
      <IconComponent size={15} className="text-base-content/70" />
    </div>
  );
}
