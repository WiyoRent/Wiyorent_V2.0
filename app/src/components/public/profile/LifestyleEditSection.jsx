import { Sparkles, Moon, Sun, Music } from 'lucide-react';
import TileSelector from '@/components/public/profile/TileSelector';

export default function LifestyleEditSection({
  sleep_schedule,
  set_sleep_schedule,
  cleanliness,
  set_cleanliness,
  social_habits,
  set_social_habits
}) {
  const sleep_options = [
    { value: 'Early Bird', label: 'Early Bird', icon: Sun },
    { value: 'Night Owl', label: 'Night Owl', icon: Moon },
  ];

  const cleanliness_options = [
    { value: 'Tidy', label: 'Tidy', icon: Sparkles },
    { value: 'Moderate', label: 'Moderate', icon: null },
    { value: 'Relaxed', label: 'Relaxed', icon: null },
  ];

  const social_options = [
    { value: 'Social', label: 'Social', icon: Music },
    { value: 'Moderate', label: 'Moderate', icon: null },
    { value: 'Private', label: 'Private', icon: null },
  ];

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <Sparkles size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Lifestyle &amp; Personality
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        {/* Sleep Schedule */}
        <TileSelector
          label="Sleep Schedule"
          options={sleep_options}
          value={sleep_schedule}
          on_change={set_sleep_schedule}
        />

        {/* Cleanliness */}
        <TileSelector
          label="Cleanliness"
          options={cleanliness_options}
          value={cleanliness}
          on_change={set_cleanliness}
        />

        {/* Social Habits */}
        <TileSelector
          label="Social Habits"
          options={social_options}
          value={social_habits}
          on_change={set_social_habits}
        />

        
      </div>
    </div>
  );
}