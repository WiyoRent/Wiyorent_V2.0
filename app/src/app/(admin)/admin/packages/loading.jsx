export default function Loading() {
  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* PageHeader skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="skeleton w-10 h-10 rounded-field flex-shrink-0" />
            <div className="flex flex-col gap-2">
              <div className="skeleton h-6 w-56 rounded-field" />
              <div className="skeleton h-3 w-64 rounded-field" />
            </div>
          </div>
          <div className="skeleton h-10 w-44 rounded-field" />
        </div>

        {/* Package card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-base-100 rounded-box shadow-md border border-base-200 flex flex-col">
              <div className="p-8 flex-1 flex flex-col gap-4">
                {/* Name */}
                <div className="skeleton h-7 w-28 rounded-field" />
                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <div className="skeleton h-3 w-full rounded-field" />
                  <div className="skeleton h-3 w-4/5 rounded-field" />
                </div>
                {/* Price */}
                <div className="skeleton h-10 w-40 rounded-field mt-2" />
                {/* Inclusions */}
                <div className="flex flex-col gap-3 mt-2">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="skeleton w-4 h-4 rounded-full flex-shrink-0" />
                      <div className="skeleton h-3 flex-1 rounded-field" />
                    </div>
                  ))}
                </div>
              </div>
              {/* Footer buttons */}
              <div className="px-8 pb-8 flex flex-col gap-2">
                <div className="skeleton h-10 w-full rounded-md" />
                <div className="skeleton h-10 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
