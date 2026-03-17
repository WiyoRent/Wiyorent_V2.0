'use client';

import { UserCircle, Calendar } from 'lucide-react';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function LandlordAvailabilitySection({
  landlord_name,
  set_landlord_name,
  landlord_phone,
  set_landlord_phone,
  available_status,
  set_available_status,
  available_from,
  set_available_from,
}) {
  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <UserCircle size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Landlord &amp; Availability
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Landlord Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Landlord Name
            </span>
          </label>
          <br />
          <input
            type="text"
            value={landlord_name}
            onChange={(e) => set_landlord_name(e.target.value)}
            placeholder="WiyoRent Ltd"
            className="input input-bordered rounded-field font-secondary text-sm"
            required
          />
        </div>

        {/* Landlord Phone */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Landlord Phone
            </span>
          </label>
          <br />
          <PhoneInputWithCountrySelect
            placeholder="Enter phone number (+250 123 456 789)"
            value={landlord_phone}
            onChange={(val) => set_landlord_phone(val || '')}
            className="input w-full"
            defaultCountry="RW"
          />
        </div>

        {/* Available Status */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
              Availability Status
            </span>
          </label>
          <br />
          <select
            value={available_status}
            onChange={(e) => set_available_status(e.target.value)}
            className="select select-bordered rounded-field font-secondary text-sm"
          >
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Available From */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
              <Calendar size={12} className="text-accent" />
              Available From
            </span>
          </label>
          <br />
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={new Date(available_from).toISOString().split('T')[0]}
            onChange={(e) => set_available_from(e.target.value)}
            className="input input-bordered rounded-field font-secondary text-sm"
          />
        </div>
      </div>
    </div>
  );
}