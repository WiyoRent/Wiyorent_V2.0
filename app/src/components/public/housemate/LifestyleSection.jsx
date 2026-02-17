import { Moon, Sparkles, MessageCircle, Languages } from 'lucide-react';

function LifestyleTile({ icon: Icon, label, value }) {
  return (
    <div className="bg-base-200 rounded-field p-3 flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-accent flex-shrink-0" />
        <span className="font-primary text-xs font-extrabold text-base-content/50 uppercase tracking-widest leading-none">
          {label}
        </span>
      </div>
      <span className="font-secondary text-sm font-semibold text-base-content leading-snug">
        {value}
      </span>
    </div>
  );
}

export default function LifestyleSection({ lifestyle }) {
  const { sleep_schedule, cleanliness, social_habits, languages } = lifestyle;

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
          value={sleep_schedule}
        />
        <LifestyleTile
          icon={Sparkles}
          label="Cleanliness"
          value={cleanliness}
        />
        <LifestyleTile
          icon={MessageCircle}
          label="Social Habits"
          value={social_habits}
        />
      </div>

      {/* Languages */}
      <div className="border-t border-base-200 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Languages size={14} className="text-accent" />
          <span className="font-primary text-xs font-extrabold text-base-content/50 uppercase tracking-widest">
            Languages
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <span
              key={lang}
              className="bg-accent/15 text-accent-content border border-accent/30 font-primary text-xs font-bold px-3 py-1 rounded-field uppercase tracking-wide"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}