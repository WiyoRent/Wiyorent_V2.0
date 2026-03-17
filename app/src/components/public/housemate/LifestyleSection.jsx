import { Moon, Sparkles, MessageCircle } from 'lucide-react';
import LifestyleTile from '@/components/public/housemate/LifestyleTile';

export default function LifestyleSection({ lifestyle }) {
  const { sleep_schedule, cleanliness, social_habits } = lifestyle || {};

  return (
    <section className="bg-base-100 rounded-box p-5 shadow-sm">
      <h2 className="font-primary text-sm font-extrabold text-base-content uppercase tracking-widest mb-4 flex items-center gap-3">
        <span className="w-1 h-5 bg-accent rounded-full inline-block" />
        Lifestyle &amp; Personality
      </h2>

      {/* Traits grid */}
      <div className="grid grid-cols-1 gap-2.5 mb-4">
        <LifestyleTile
          icon={Moon}
          label="Sleep Schedule"
          value={sleep_schedule || ""}
        />
        <LifestyleTile
          icon={Sparkles}
          label="Cleanliness"
          value={cleanliness || ""}
        />
        <LifestyleTile
          icon={MessageCircle}
          label="Social Habits"
          value={social_habits || ""}
        />
      </div>

    </section>
  );
}