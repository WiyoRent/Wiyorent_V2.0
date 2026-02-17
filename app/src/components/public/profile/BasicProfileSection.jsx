import { User, Upload } from 'lucide-react';

export default function BasicProfileSection({
  full_name,
  set_full_name,
  age,
  set_age,
  gender,
  set_gender,
  phone_number,
  set_phone_number,
  university_name,
  set_university_name,
  program,
  set_program,
  year_of_study,
  set_year_of_study,
  nationality,
  set_nationality,
}) {
  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Basic Profile Information
        </h2>
      </div>

      {/* Avatar upload placeholder */}
      <div className="mb-6 flex items-center gap-4">
        <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center border-2 border-dashed border-base-300">
          <User size={28} className="text-base-content/30" />
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline rounded-field font-secondary text-xs gap-2 border-base-content/20 hover:border-accent"
        >
          <Upload size={14} />
          Upload Photo
        </button>
      </div>

      {/* Form grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Full Name
            </span>
          </label>
          <br />
          <input
            type="text"
            value={full_name}
            onChange={(e) => set_full_name(e.target.value)}
            placeholder="John Doe"
            className="input input-bordered rounded-field font-secondary text-sm"
            required
          />
        </div>

        {/* Age */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Age
            </span>
          </label>
          <br />
          <input
            type="number"
            value={age}
            onChange={(e) => set_age(Number(e.target.value))}
            placeholder="21"
            min="18"
            max="50"
            className="input input-bordered rounded-field font-secondary text-sm"
            required
          />
        </div>

        {/* Gender */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Gender
            </span>
          </label>
          <br />
          <select
            value={gender}
            onChange={(e) => set_gender(e.target.value)}
            className="select select-bordered rounded-field font-secondary text-sm"
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Phone Number */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Phone Number
            </span>
          </label>
          <br />
          <input
            type="tel"
            value={phone_number}
            onChange={(e) => set_phone_number(e.target.value)}
            placeholder="+250788888888"
            className="input input-bordered rounded-field font-secondary text-sm"
            required
          />
        </div>

        {/* University */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              University
            </span>
          </label>
          <br />
          <input
            type="text"
            value={university_name}
            onChange={(e) => set_university_name(e.target.value)}
            placeholder="University of Rwanda"
            className="input input-bordered rounded-field font-secondary text-sm"
            required
          />
        </div>

        {/* Program */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Program
            </span>
          </label>
          <br />
          <input
            type="text"
            value={program}
            onChange={(e) => set_program(e.target.value)}
            placeholder="B.A. in Information Technology"
            className="input input-bordered rounded-field font-secondary text-sm"
            required
          />
        </div>

        {/* Year of Study */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Year of Study
            </span>
          </label>

          <br />
          <select
            value={year_of_study}
            onChange={(e) => set_year_of_study(e.target.value)}
            className="select select-bordered rounded-field font-secondary text-sm"
            required
          >
            <option value="">Select year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="5">5th Year</option>
            <option value="Graduate">Graduate</option>
          </select>
        </div>

        {/* Nationality */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Nationality
            </span>
          </label>
          <br />
          <input
            type="text"
            value={nationality}
            onChange={(e) => set_nationality(e.target.value)}
            placeholder="Rwandan"
            className="input input-bordered rounded-field font-secondary text-sm"
            required
          />
        </div>
      </div>
    </div>
  );
}