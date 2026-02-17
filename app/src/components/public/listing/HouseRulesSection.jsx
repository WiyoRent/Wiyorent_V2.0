import { ScrollText, CircleDot } from 'lucide-react';

export default function HouseRulesSection({ house_rules }) {
  if (!house_rules || house_rules.length === 0) return null;

  return (
    <section className="bg-base-100 rounded-box p-6 shadow-sm">
      <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest mb-5 flex items-center gap-3">
        <span className="w-1 h-5 bg-accent rounded-full inline-block" />
        House Rules
      </h2>

      <ul className="flex flex-col gap-2.5">
        {house_rules.map((rule, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CircleDot
              size={14}
              className="text-accent mt-0.5 flex-shrink-0"
            />
            <span className="font-secondary text-sm text-base-content/70 leading-snug">
              {rule}
            </span>
          </li>
        ))}
      </ul>

      {/* Acknowledgement banner */}
      <div className="mt-6 flex items-center gap-3 bg-accent/10 border border-accent/25 rounded-field px-4 py-3">
        <ScrollText size={16} className="text-accent flex-shrink-0" />
        <p className="font-secondary text-xs text-base-content/60 leading-snug">
          Please ensure you understand and agree to all house rules before booking.
        </p>
      </div>
    </section>
  );
}