import { Plus, Package } from 'lucide-react';

export default function PageHeader({ on_create }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
          <Package size={20} className="text-accent-content" />
        </div>
        <div>
          <h1 className="font-primary text-2xl font-extrabold text-base-content uppercase tracking-widest">
            Settlement Packages
          </h1>
          <p className="font-secondary text-sm text-base-content/50">
            Manage and configure relocation service packages.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={on_create}
        className="btn btn-accent rounded-field font-primary font-bold text-sm uppercase tracking-wide gap-2"
      >
        <Plus size={16} />
        Create New Package
      </button>
    </div>
  );
}