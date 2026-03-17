import { User, Calendar, BookOpen, GraduationCap } from 'lucide-react';
import ProfileRow from '@/components/public/housemate/ProfileRow';

export default function BasicProfileSection({ basic_profile }) {
  const { gender, age, program, year_of_study } = basic_profile || {};

  return (
    <section className="bg-base-100 rounded-box p-5 shadow-sm">
      <h2 className="font-primary text-sm font-extrabold text-base-content uppercase tracking-widest mb-4 flex items-center gap-3">
        <span className="w-1 h-5 bg-accent rounded-full inline-block" />
        Basic Profile
      </h2>

      <div>
        <ProfileRow icon={User}          label="Gender"        value={gender || ''} />
        <ProfileRow icon={Calendar}      label="Age"           value={`${age || ''} years old`} />
        <ProfileRow icon={BookOpen}      label="Program"       value={program || ""} />
        <ProfileRow icon={GraduationCap} label="Year of Study" value={year_of_study || ''} />
      </div>
    </section>
  );
}