import { Heart } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-base-200">

      {/* Page header */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            {/* Heart icon placeholder */}
            <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart size={22} className="text-error fill-error" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-9 w-44 rounded-field" />
              <div className="skeleton h-4 w-24 rounded-field" />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Tab switcher */}
        <div className="flex gap-2 mb-6">
          <div className="skeleton h-10 w-36 rounded-field" />
          <div className="skeleton h-10 w-36 rounded-field" />
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-base-100 rounded-box shadow-sm overflow-hidden">
              <div className="skeleton w-full h-48" />
              <div className="p-4 flex flex-col gap-3">
                <div className="skeleton h-5 w-3/4 rounded-field" />
                <div className="skeleton h-4 w-1/2 rounded-field" />
                <div className="flex gap-2">
                  <div className="skeleton h-6 w-16 rounded-field" />
                  <div className="skeleton h-6 w-16 rounded-field" />
                </div>
                <div className="skeleton h-8 w-full rounded-field mt-1" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}