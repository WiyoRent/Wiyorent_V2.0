import { User, Calendar, BookOpen, GraduationCap } from 'lucide-react';

function ProfileRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-base-200 last:border-0">
      <div className="w-8 h-8 bg-base-200 rounded-field flex items-center justify-center flex-shrink-0">
        <Icon size={15} className="text-accent" />
      </div>
      <div className="flex flex-col">
        <span className="font-secondary text-xs text-base-content/40 uppercase tracking-wide leading-none">
          {label}
        </span>
        <span className="font-secondary text-sm font-semibold text-base-content mt-0.5 leading-snug">
          {value}
        </span>
      </div>
    </div>
  );
}

export default function BasicProfileSection({ basic_profile }) {
  const { gender, age, program, year_of_study } = basic_profile;

  return (
    <section className="bg-base-100 rounded-box p-5 shadow-sm">
      <h2 className="font-primary text-sm font-extrabold text-base-content uppercase tracking-widest mb-4 flex items-center gap-3">
        <span className="w-1 h-5 bg-accent rounded-full inline-block" />
        Basic Profile
      </h2>

      <div>
        <ProfileRow icon={User}          label="Gender"        value={gender} />
        <ProfileRow icon={Calendar}      label="Age"           value={`${age} years old`} />
        <ProfileRow icon={BookOpen}      label="Program"       value={program} />
        <ProfileRow icon={GraduationCap} label="Year of Study" value={year_of_study} />
      </div>
    </section>
  );
}