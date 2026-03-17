'use client';
import { Plus, X, Sparkles, FileText } from 'lucide-react';
import { useState } from 'react';

function TagManager({ label, icon: Icon, items, set_items, placeholder }) {
  const [input_value, set_input_value] = useState('');

  const handle_add = () => {
    if (input_value.trim() && !items.includes(input_value.trim())) {
      set_items([...items, input_value.trim()]);
      set_input_value('');
    }
  };

  const handle_remove = (item) => {
    set_items(items.filter((i) => i !== item));
  };

  const handle_key_press = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handle_add();
    }
  };

  return (
    <div>
      <label className="label">
        <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
          <Icon size={12} className="text-accent" />
          {label}
        </span>
      </label>

      {/* Tag Display */}
      <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] p-3 bg-base-200 rounded-field">
        {items.length === 0 ? (
          <span className="font-secondary text-sm text-base-content/30 italic">
            No {label.toLowerCase()} added yet
          </span>
        ) : (
          items.map((item, index) => (
            <span
              key={index}
              className="badge badge-accent badge-lg font-primary font-bold text-xs tracking-wide gap-2"
            >
              {item}
              <button
                type="button"
                onClick={() => handle_remove(item)}
                className="hover:text-error transition-colors"
                aria-label={`Remove ${item}`}
              >
                <X size={12} />
              </button>
            </span>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input_value}
          onChange={(e) => set_input_value(e.target.value)}
          onKeyPress={handle_key_press}
          placeholder={placeholder}
          className="input input-bordered rounded-field font-secondary text-sm flex-1"
        />
        <button
          type="button"
          onClick={handle_add}
          className="btn btn-accent rounded-field font-primary font-bold text-sm uppercase tracking-wide gap-2"
        >
          <Plus size={14} />
          Add
        </button>
      </div>
    </div>
  );
}

export default function AmenitiesRulesSection({ amenities, set_amenities, house_rules, set_house_rules }) {
  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <Sparkles size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          Amenities &amp; House Rules
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        <TagManager
          label="Amenities"
          icon={Sparkles}
          items={amenities}
          set_items={set_amenities}
          placeholder="e.g., wifi, parking, gym..."
        />

        <div className="border-t border-base-200" />

        <TagManager
          label="House Rules"
          icon={FileText}
          items={house_rules}
          set_items={set_house_rules}
          placeholder="e.g., No smoking, No pets..."
        />
      </div>
    </div>
  );
}