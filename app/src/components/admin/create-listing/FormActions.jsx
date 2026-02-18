import { Save, RotateCcw } from 'lucide-react';

export default function FormActions({ on_reset, isLoading }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 py-4">
      <button
        disabled = {isLoading}
        type="button"
        onClick={on_reset}
        className="btn btn-ghost rounded-field font-primary font-bold text-sm uppercase tracking-wide gap-2 w-full sm:w-auto"
      >
        <RotateCcw size={14} />
        {isLoading ? <span className="loading loading-spinner loading-xl"></span> : <span>Reset</span>}
      </button>

      <button
        disabled = {isLoading}
        type="submit"
        className="btn btn-secondary rounded-field font-primary font-bold text-sm uppercase tracking-wide gap-2 w-full sm:w-auto"
      >
        <Save size={14} />
        {isLoading ? <span className="loading loading-spinner loading-xl"></span> : <span>Create Listing</span>}
      </button>
    </div>
  );
}