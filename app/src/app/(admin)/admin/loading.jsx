export default function Loading() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Page header */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="skeleton h-10 w-72 rounded-field mb-3" />
          <div className="skeleton h-4 w-80 rounded-field" />
        </div>
      </div>

      {/* Filter bar */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-base-100 rounded-box shadow-sm p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="skeleton h-3 w-24 rounded-field" />
                <div className="skeleton h-10 w-full rounded-field" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-base-100 rounded-box shadow-sm overflow-hidden">
          {/* Table header row */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-base-200">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-3 rounded-field flex-1" />
            ))}
          </div>
          {/* Data rows */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-4 border-b border-base-200 last:border-0"
            >
              <div className="skeleton w-9 h-9 rounded-full flex-shrink-0" />
              <div className="skeleton h-4 rounded-field flex-1" />
              <div className="skeleton h-4 rounded-field flex-1" />
              <div className="skeleton h-6 w-20 rounded-field" />
              <div className="skeleton h-6 w-24 rounded-field" />
              <div className="flex gap-2">
                <div className="skeleton h-8 w-16 rounded-field" />
                <div className="skeleton h-8 w-16 rounded-field" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
