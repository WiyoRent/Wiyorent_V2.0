export default function Loading() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Image Gallery ───────────────────────────────── */}
        <div className="skeleton w-full h-72 sm:h-96 rounded-box" />

        {/* ── Two-column layout ───────────────────────────── */}
        <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">

          {/* Left column */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">

            {/* ListingHeader */}
            <div className="bg-base-100 rounded-box shadow-sm p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="skeleton h-8 w-64 rounded-field" />
                <div className="skeleton h-6 w-20 rounded-field" />
                <div className="skeleton h-6 w-20 rounded-field" />
              </div>
              <div className="skeleton h-4 w-40 rounded-field" />
              <div className="flex gap-3 mt-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton h-8 w-24 rounded-field" />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-base-100 rounded-box shadow-sm p-6 flex flex-col gap-3">
              <div className="skeleton h-5 w-28 rounded-field" />
              <div className="skeleton h-3 w-full rounded-field" />
              <div className="skeleton h-3 w-full rounded-field" />
              <div className="skeleton h-3 w-4/5 rounded-field" />
              <div className="skeleton h-3 w-3/4 rounded-field" />
            </div>

            {/* Amenities */}
            <div className="bg-base-100 rounded-box shadow-sm p-6">
              <div className="skeleton h-5 w-24 rounded-field mb-4" />
              <div className="flex flex-wrap gap-3">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="skeleton h-9 w-24 rounded-field" />
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="bg-base-100 rounded-box shadow-sm p-6">
              <div className="skeleton h-5 w-28 rounded-field mb-4" />
              <div className="flex flex-col gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="skeleton w-4 h-4 rounded-full flex-shrink-0" />
                    <div className="skeleton h-3 w-56 rounded-field" />
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-base-100 rounded-box shadow-sm p-6">
              <div className="skeleton h-5 w-20 rounded-field mb-4" />
              <div className="flex items-center gap-4 mb-6">
                <div className="skeleton h-12 w-16 rounded-field" />
                <div className="flex flex-col gap-2">
                  <div className="skeleton h-3 w-32 rounded-field" />
                  <div className="skeleton h-3 w-24 rounded-field" />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="skeleton w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="skeleton h-4 w-32 rounded-field" />
                      <div className="skeleton h-3 w-full rounded-field" />
                      <div className="skeleton h-3 w-4/5 rounded-field" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right sticky sidebar */}
          <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <div className="bg-base-100 rounded-box shadow-sm p-6 flex flex-col gap-4">
              <div className="skeleton h-8 w-36 rounded-field" />
              <div className="skeleton h-3 w-28 rounded-field" />
              <div className="divider my-1" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="skeleton h-3 w-28 rounded-field" />
                  <div className="skeleton h-4 w-24 rounded-field" />
                </div>
              ))}
              <div className="divider my-1" />
              <div className="flex justify-between items-center">
                <div className="skeleton h-4 w-24 rounded-field" />
                <div className="skeleton h-6 w-32 rounded-field" />
              </div>
              <div className="skeleton h-12 w-full rounded-field mt-2" />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}