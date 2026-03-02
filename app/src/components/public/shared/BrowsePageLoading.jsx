// /components/public/shared/BrowsePageLoading.jsx
export default function BrowsePageLoading({ title_width = 'w-48' }) {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Header bar */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`skeleton h-12 ${title_width} rounded-field`} />
          <div className="skeleton h-4 w-40 rounded-field mt-3" />
        </div>
      </div>

      {/* Body */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-base-100 rounded-box shadow-sm p-6 flex flex-col gap-5">
              <div className="skeleton h-5 w-16 rounded-field" />
              {/* Price range */}
              <div className="flex flex-col gap-2">
                <div className="skeleton h-3 w-24 rounded-field" />
                <div className="skeleton h-8 w-full rounded-field" />
              </div>
              {/* Filter group */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="skeleton h-3 w-full rounded-field" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="skeleton h-7 w-24 rounded-field" />
                    ))}
                  </div>
                </div>
              ))}
              <div className="skeleton h-10 w-full rounded-field mt-2" />
            </div>
          </aside>

          {/* Card grid */}
          <div className="flex-1 min-w-0">
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
      </div>
    </div>
  );
}