import { PlusCircle } from 'lucide-react';

export default function FormHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-accent rounded-field flex items-center justify-center flex-shrink-0">
        <PlusCircle size={20} className="text-accent-content" />
      </div>
      <div>
        <h1 className="font-primary text-2xl font-extrabold text-base-content uppercase tracking-widest">
          New Listing
        </h1>
        <p className="font-secondary text-sm text-base-content/50">
          Fill in the details below to create a new property listing.
        </p>
      </div>
    </div>
  );
}