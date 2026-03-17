'use client';

import { User, Phone } from 'lucide-react';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function LandlordSection({ landlord, set_landlord }) {
  const handle_change = (field, value) => {
    set_landlord({ ...landlord, [field]: value });
  };

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Landlord Info
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <User size={12} className="text-accent" />
              Full Name
            </span>
          </label>
          <input
            type="text"
            className="input input-bordered rounded-field font-secondary text-sm w-full"
            placeholder="e.g., WiyoRent Ltd"
            value={landlord.full_name}
            onChange={(e) => handle_change('full_name', e.target.value)}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <Phone size={12} className="text-accent" />
              Phone Number
            </span>
          </label>
          <PhoneInputWithCountrySelect
            placeholder="Enter phone number (+250 123 456 789)"
            value={landlord.phone_number}
            onChange={(val) => handle_change('phone_number', val || '')}
            className="input w-full"
            defaultCountry="RW"
          />
        </div>
      </div>
    </div>
  );
}