import { Save, RotateCcw } from 'lucide-react';

export default function FormActions({ on_reset }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 py-4">
      <button
        type="button"
        onClick={on_reset}
        className="btn btn-ghost rounded-field font-primary font-bold text-sm uppercase tracking-wide gap-2 w-full sm:w-auto"
      >
        <RotateCcw size={14} />
        Reset Form
      </button>

      <button
        type="submit"
        className="btn btn-secondary rounded-field font-primary font-bold text-sm uppercase tracking-wide gap-2 w-full sm:w-auto"
      >
        <Save size={14} />
        Create Listing
      </button>
    </div>
  );
}