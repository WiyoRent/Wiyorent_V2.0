import { MessageSquare } from 'lucide-react';

const MAX_CHARS = 500;

export default function AboutMeSection({ about_me, set_about_me }) {
  const char_count = about_me.length;
  const remaining = MAX_CHARS - char_count;
  const is_over_limit = char_count > MAX_CHARS;

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <MessageSquare size={16} className="text-accent-content" />
        </div>
        <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest">
          About Me
        </h2>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
            Tell potential housemates about yourself
          </span>
          <span
            className={`label-text-alt font-secondary text-xs ${
              is_over_limit ? 'text-error font-bold' : 'text-base-content/40'
            }`}
          >
            {remaining} / {MAX_CHARS}
          </span>
        </label>
        <br />
        <textarea
          value={about_me}
          onChange={(e) => set_about_me(e.target.value)}
          placeholder="Hey! I'm [name], a [year]-year [program] student. I'm passionate about... Looking for..."
          rows={6}
          maxLength={MAX_CHARS}
          className={`w-full textarea textarea-bordered rounded-field font-secondary text-sm leading-relaxed resize-y ${
            is_over_limit ? 'textarea-error' : ''
          }`}
          required
        />
        <label className="label">
          <span className="label-text-alt font-secondary text-xs text-base-content/40">
            Share your hobbies, study habits, what you're looking for in a housemate, and what makes you a great flatmate
          </span>
        </label>
      </div>
    </div>
  );
}